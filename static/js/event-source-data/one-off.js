/**
 * Temporary(?) file for storing any "one off" event sources. These
 * are effectively custom parsers that don't have their own JavaScript
 * Module themselves.
 *
 * TODO: Still need to figure out how to generalize these so that they
 *       can be used as proper event sources?
 */
import * as Utils from '../utils.js';
import { default as FullCalendarEvent } from '../event.js';
const OneOffEventSources = [
	{
		sourceType: 'one-off',
		options: {},
		sources: [
			{
				name: 'Hop Knot NH',
				id: 'hop-knot-nh',
				className: 'hop-knot-nh',
				events: async function (fetchInfo, successCallback, failureCallback) {
					var response = await fetch(Utils.useCorsProxy('https://hopknotnh.com/?post_type=hop-knot-events'));
					var html = await response.text();
					var doc = Utils.domparser.parseFromString(html, 'text/html');
					var events = [];
					doc.querySelectorAll('article.hop-knot-events').forEach(function ( el ) {
						var [month, day, time, meridian] = el.querySelector('.hke-datetime')
							.textContent.replaceAll("\n", ' ').trim().split(' ');
						var t24 = Utils.convert12To24HourTime(`${time} ${meridian}`);
						events.push({
							title: el.querySelector('.entry-title').textContent,
							start: new Date(`${month} ${day} ${new Date().getFullYear()} ${t24}`),
							url: el.querySelector('[rel="bookmark"]').getAttribute('href'),
							extendedProps: {
								description: el.querySelector('.entry-summary p')?.textContent,
								location: {
									geoJSON: {
										type: 'Point',
										coordinates: ['42.9926758', '-71.4637792']
									},
									eventVenue: {
										name: 'Hop Knot NH',
										address: {
											streetAddress: '1000 Elm Street',
											addressLocality: 'Manchester',
											addressRegion: 'NH',
											postalCode: '03101',
											addressCountry: 'United States'
										},
										geo: {
											latitude: '42.9926758',
											longitude: '-71.4637792'
										}
									}
								}
							}
						});
					});
					successCallback(events);
				}
			}
		]
	}
];
export default OneOffEventSources;
