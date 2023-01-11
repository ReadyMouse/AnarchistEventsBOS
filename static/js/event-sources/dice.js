/**
 * Utility module to support the calendar's Squarespace
 * event sources.
 */
import FullCalendarEvent from '../event.js';

export const DiceEventSources = [
    {
        name: "C'mon Everybody",
        id: 'cmon-everybody',
        className: 'cmon-everybody',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.cmoneverybody.com/events
                url: 'https://events-api.dice.fm/v1/events?page%5Bsize%5D=24&types=linkout,event&filter%5Bvenues%5D%5B%5D=C%27mon%20Everybody&filter%5Bvenues%5D%5B%5D=Cmon%20Everybody',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                    'x-api-key': 'PyghT2k59li4oGXIef8t4Git2vRl58H7WAuUJGpd'
                }
            });
        }
    },
    {
        name: 'Our Wicked Lady',
        id: 'our-wicked-lady',
        className: 'our-wicked-lady',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.ourwickedlady.com/
                url: 'https://events-api.dice.fm/v1/events?page[size]=24&types=linkout,event&filter[promoters][]=Our%20Wicked%20Lady%20LLC',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': 'vgtVSu5LGc3TMBuE36FwF1hn26kkt6xi5ThPJrqg'
                }
            });
        }
    },
    {
        name: 'Purgatory BK',
        id: 'purgatory-bk',
        className: 'purgatory-bk',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.purgatorybk.com/events
                url: 'https://events-api.dice.fm/v1/events?page%5Bsize%5D=24&types=linkout,event&filter%5Bvenues%5D%5B%5D=purgatory&filter%5Bvenues%5D%5B%5D=Purgatory&filter%5Bvenues%5D%5B%5D=Purgatory%20Events%20LLC',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': 'VKEBoWiYzJ9uJ8tjR15aD6lL4RnUz8hb4kIYYxFA'
                }
            });
        }
    },
    {
        name: 'Saint Vitus',
        id: 'saint-vitus',
        className: 'saint-vitus',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.saintvitusbar.com/events
                url: 'https://events-api.dice.fm/v1/events?page[size]=24&types=linkout,event&filter[promoters][]=Saint%20Vitus%20LLC%20(dba%20Saint%20Vitus%20Bar)',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': '1RsJ9u1HnFaj5F5hqFD7F9Idwsqi0o4z7QMQ2uGw'
                }
            });
        }
    },
    {
        name: 'The Brooklyn Monarch',
        id: 'the-brooklyn-monarch',
        className: 'the-brooklyn-monarch',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.thebrooklynmonarch.com/shows
                url: 'https://events-api.dice.fm/v1/events?page[size]=24&types=linkout,event&filter[venues][]=The%20Brooklyn%20Monarch',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': 'IC6oEVsHlf1eZRkq5Oeuc9XszjvuJCw76K8NSeip'
                }
            });
        }
    },
    {
        name: 'The Sultan Room',
        id: 'the-sultan-room',
        className: 'the-sultan-room',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://thesultanroom.com/
                url: 'https://events-api.dice.fm/v1/events?page[size]=24&types=linkout,event&filter[venues][]=The%20Sultan%20Room&filter[venues][]=The%20Turk%27s%20Inn&filter[venues][]=The%20Sultan%20Room%20Rooftop&filter[promoters][]=Varun%20Kataria%20dba%20Turks%20Group%20LLC',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': 'j3UZPWFkiQ2UFTppf79rFatRpao3ol7l5PWjmTE9'
                }
            });
        }
    },
    {
        name: 'Union Pool',
        id: 'union-pool',
        className: 'union-pool',
        events: async function (fetchInfo, successCallback, failureCallback) {
            await new Dice({
                // Pulled from https://www.union-pool.com/calendar
                url: 'https://events-api.dice.fm/v1/events?page%5Bsize%5D=24&types=linkout,event&filter%5Bpromoters%5D%5B%5D=Loop%20De%20Lou%20Production%20Corp%20dba%20Union%20Pool&filter%5Bflags%5D%5B%5D=going_ahead&filter%5Bflags%5D%5B%5D=postponed&filter%5Bflags%5D%5B%5D=rescheduled',
                fetchInfo: fetchInfo,
                successCallback: successCallback,
                failureCallback: failureCallback,
                headers: {
                   'x-api-key': '7rU0bJyVtM5s3vDdYNiuQ4UtDo6pAnmH1QgXsI7E'
                }
            });
        }
    }
];

export default function Dice (optionsObj) {
    var url = optionsObj.url;
    this.requestHeaders = optionsObj.headers;
    return this.fetch(url).then((dice_events) => {
        optionsObj.successCallback(dice_events.parse().events.map(
            this.toFullCalendarEventObject.bind(this)
        ));
    });
}

Dice.prototype.fetch = async function (url) {
    this.url = url;
    var response = await fetch(url, {
        headers: this.requestHeaders
    });
    var json = {};
    try {
        var json = await response.json();
    } catch (e) {
        console.error(e);
    }
    this.json = json;
    return this;
}

Dice.prototype.parse = function () {
    this.events = this.json.data;
    return this;
}

Dice.prototype.toFullCalendarEventObject = function (e) {
    return new FullCalendarEvent({
        title: e.name,
        start: e.date,
        end: e.date_end,
        url: e.url,
        extendedProps: {
            description: e.raw_description,
            image: e?.event_images?.square,
            location: {
                geoJSON: {
                    type: "Point",
                    coordinates: [e.location.lng, e.location.lat]
                },
                eventVenue: {
                    name: e.venue,
                    address: {
                        streetAddress: e.location.street,
                        addressLocality: e.location.city,
                        addressRegion: e.location.state,
                        postalCode: e.location.zip,
                        addressCountry: e.location.country
                    },
                    geo: {
                        latitude: e.location.lat,
                        longitude: e.location.lng
                    }
                }
            }
        }
    });
}
