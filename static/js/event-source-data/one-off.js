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
										coordinates: ['-71.4637792', '42.9926758']
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
			},
			{
				name: 'Trident Booksellers & Cafe',
				id: 'trident-bookstore',
				className: 'trident-bookstore',
				events: async function (fetchInfo, successCallback, failureCallback) {
					var base_url = 'https://www.tridentbookscafe.com';
					var response = await fetch(Utils.useCorsProxy(`${base_url}/event`));
					var html = await response.text();
					var doc = Utils.domparser.parseFromString(html, 'text/html');
					var events = [];
					
					doc.querySelectorAll('table.full:not(.mobile-view) .view-item-event_calendar').forEach(function ( el ) {
						var date = el.querySelector('.date-display-single').textContent
						var [month, day, year, junk1, start_time, junk2, end_time] = date.replaceAll("/", ' ').split(' ');
						var t24s = Utils.convert12To24HourTime(start_time);						
						if (end_time) {					
							var t24e = Utils.convert12To24HourTime(end_time);
						}
						events.push({
							title: el.querySelector('a').textContent,
							start: new Date(`${month} ${day} ${year} ${t24s}`),
							end: t24e ? new Date(`${month} ${day} ${year} ${t24e}`) : false,
							url: `${base_url}${el.querySelector('a').getAttribute('href')}`,
							extendedProps: {
								 image: el.querySelector('img').getAttribute('src'),
								 location: {
									geoJSON: {
										type: 'Point',
										coordinates: ['-71.0866747', '42.3483070']
									},
									eventVenue: {
										name: 'Trident Booksellers & Cafe',
										address: {
											streetAddress: '338 Newbury St',
											addressLocality: 'Boston',
											addressRegion: 'MA',
											postalCode: '02115',
											addressCountry: 'United States'
										},
										geo: {
											latitude: '42.3483070', 
											longitude: '-71.0866747'
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
