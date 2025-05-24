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
						try {
							var date = el.querySelector('.date-display-single')?.textContent;
							if (!date) return;

							// Split the date string and clean it up
							var parts = date.replaceAll("/", ' ').split(' ').filter(Boolean);
							if (parts.length < 3) return;

							var [month, day, year] = parts;
							var start_time = parts[4] || '00:00';
							var end_time = parts[6] || null;

							// Convert times to 24-hour format
							var t24s = Utils.convert12To24HourTime(start_time);
							var t24e = end_time ? Utils.convert12To24HourTime(end_time) : null;

							// Create date objects
							var startDate = new Date(`${month} ${day} ${year} ${t24s}`);
							var endDate = t24e ? new Date(`${month} ${day} ${year} ${t24e}`) : null;

							// Validate dates
							if (isNaN(startDate.getTime())) return;

							events.push({
								title: el.querySelector('a')?.textContent || 'Untitled Event',
								start: startDate,
								end: endDate && !isNaN(endDate.getTime()) ? endDate : null,
								url: `${base_url}${el.querySelector('a')?.getAttribute('href') || ''}`,
								extendedProps: {
									image: el.querySelector('img')?.getAttribute('src') || null,
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
						} catch (error) {
							console.error('Error parsing Trident event:', error);
						}
					});
					successCallback(events);
				}
			}
		]
	}
];
export default OneOffEventSources;
