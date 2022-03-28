/**
 * Utility module to support the calendar's WordPress Tribe
 * Events Calendar sources.
 *
 * @see https://theeventscalendar.com/
 */
import { corsbase } from './calendar.js';

export const WordPressTribeEventsCalendarSources = [
    {
        name: 'GoMag',
        id: 'gomag',
        className: 'gomag',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new WordPressTribeEvents({
                url: corsbase + '/http://gomag.com/wp-json/tribe/events/v1/events?per_page=50&geoloc=true&geoloc_lat=40.7127837&geoloc_lng=-74.00594130000002',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        },
        color: '#ed008c'
    },
    {
        name: 'WOW Cafe Theatre',
        id: 'wow-cafe-theatre',
        className: 'wow-cafe-theatre',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new WordPressTribeEvents({
                url: 'https://www.wowcafe.org/wp-json/tribe/events/v1/events',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    }
];

export default function WordPressTribeEvents (optionsObj) {
    var url = new URL(optionsObj.url);
    var url_start_date = optionsObj.fetchInfo.start.toISOString().replace(/T.*/, ' 00:00:00');
    var url_end_date = optionsObj.fetchInfo.end.toISOString().replace(/T.*/, ' 00:00:00');
    url.searchParams.set('start_date', url_start_date);
    url.searchParams.set('end_date', url_end_date);

    return this.fetch(url).then((wp) => {
        optionsObj.successCallback(wp.parse().events.map(
            this.toFullCalendarEventObject.bind(this)
        ));
    });
};

WordPressTribeEvents.prototype.fetch = async function (url) {
    this.url = url;
    var response = await fetch(url);
    var json = await response.json();
    this.json = json;
    return this;
};

WordPressTribeEvents.prototype.parse = function () {
    this.events = this.json.events;
    return this;
};

WordPressTribeEvents.prototype.toFullCalendarEventObject = function (e) {
    return {
        title: e.title,
        start: new Date(e.utc_start_date + 'Z'),
        end: new Date(e.utc_end_date + 'Z'),
        url: e.url
    };
}
