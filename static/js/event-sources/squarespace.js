/**
 * Utility module to support the calendar's Squarespace
 * event sources.
 */
import { corsbase } from '../calendar.js';

export const SquarespaceEventSources = [
    {
        name: '3 Dollar Bill',
        id: 'three-dollar-bill',
        className: 'three-dollar-bill',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.3dollarbillbk.com/rsvp?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Black Flamingo',
        id: 'black-flamingo',
        className: 'black-flamingo',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.blackflamingonyc.com/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Cherry on Top',
        id: 'cherry-on-top',
        className: 'cherry-on-top',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.cherryontopnyc.com/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Club Cumming',
        id: 'club-cumming',
        className: 'club-cumming',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://clubcummingnyc.com/schedule?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Hot Rabbit',
        id: 'hot-rabbit',
        className: 'hot-rabbit',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.hotrabbit.com/new-events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Market Hotel',
        id: 'market-hotel',
        className: 'market-hotel',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.markethotel.org/calendar?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Nowhere Bar',
        id: 'nowhere-bar',
        className: 'nowhere-bar',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.nowherebarnyc.com/new-events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Talon Bar',
        id: 'talon-bar',
        className: 'talon-bar',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.talonbar.com/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'The Nest Brooklyn',
        id: 'the-nest-brooklyn',
        className: 'the-nest-brooklyn',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.thenestbrooklyn.com/event-calender?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'The Q NYC',
        id: 'the-q-nyc',
        className: 'the-q-nyc',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://theqnyc.com/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'The Taillor Group',
        id: 'the-taillor-group',
        className: 'the-taillor-group',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.taillors.com/calendar?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'The Tank',
        id: 'the-tank',
        className: 'the-tank',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://thetanknyc.org/calendar-1/?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Trans Pecos',
        id: 'trans-pecos',
        className: 'trans-pecos',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.thetranspecos.com/cal?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Wandering Barman',
        id: 'wandering-barman',
        className: 'wandering-barman',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.wanderingbarman.com/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    },
    {
        name: 'Wonderville',
        id: 'wonderville',
        className: 'wonderville',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Squarespace({
                url: 'https://www.wonderville.nyc/events?format=json',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback
            });
        }
    }
];

export default function Squarespace (optionsObj) {
    var url = new URL(optionsObj.url);
    // TODO: Fetch next month's events, but only after a view change.
//    var url_start_date = (optionsObj.fetchInfo.start.getMonth() + 1).toString().padStart(2, '0')
//        + '-' + optionsObj.fetchInfo.start.getFullYear();
//    url.searchParams.set('month', url_start_date);

    return this.fetch(url).then((ss) => {
        optionsObj.successCallback(ss.parse().events.map(
            this.toFullCalendarEventObject.bind(this)
        ));
    })
};

Squarespace.prototype.fetch = async function (url) {
    this.url = url;
    var response = await fetch(corsbase + '/' + url);
    var json = {};
    try {
        var json = await response.json();
    }
    catch (e) {
        console.error(e);
    }
    this.json = json;
    return this;
};

Squarespace.prototype.parse = function () {
    this.events = this.json.upcoming || this.json.items;
    return this;
};

Squarespace.prototype.toFullCalendarEventObject = function (e) {
    return {
        title: e.title,
        start: e.startDate,
        end: e.endDate,
        url: new URL(this.url).origin + e.fullUrl
    }
}
