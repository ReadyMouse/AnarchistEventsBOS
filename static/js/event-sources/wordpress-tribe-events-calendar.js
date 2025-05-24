/**
 * Utility module to support the calendar's WordPress Tribe
 * Events Calendar sources.
 *
 * @see https://theeventscalendar.com/
 */
import { useCorsProxy } from '../utils.js';
import FullCalendarEvent from '../event.js';

export default function WordPressTribeEvents (optionsObj) {
    this.events = [];
    this.url = new URL(optionsObj.url);
    this.useCorsProxy = optionsObj.useCorsProxy;

    // Set up initial HTTP query.
    var url = this.url;
    var url_start_date = optionsObj.fetchInfo.start.toISOString().replace(/T.*/, ' 00:00:00');
    var url_end_date = optionsObj.fetchInfo.end.toISOString().replace(/T.*/, ' 00:00:00');
    url.searchParams.set('start_date', url_start_date);
    url.searchParams.set('end_date', url_end_date);

    return this.fetchAll(url).then((wp) => {
        optionsObj.successCallback(wp.events.map(
            this.toFullCalendarEventObject.bind(this)
        ));
    });
};

/**
 * Fetches all pages in a paginated collection and stores them in the
 * the object's `events` member array.
 */
WordPressTribeEvents.prototype.fetchAll = async function (url) {
    await this.fetch(url);
    this.parse();
    while (this.json && this.json.next_rest_url) {
        await this.fetch(new URL(this.json.next_rest_url));
        this.parse();
    }
    return this;
};

WordPressTribeEvents.prototype.fetch = async function (url) {
    try {
        const proxiedUrl = this.useCorsProxy ? useCorsProxy(url) : url;
        const response = await fetch(proxiedUrl);
        
        if (!response.ok) {
            console.error(`WordPress Tribe Events API error: ${response.status} ${response.statusText}`);
            this.json = { events: [] };
            return this;
        }
        
        try {
            this.json = await response.json();
        } catch (e) {
            console.error('Failed to parse WordPress Tribe Events response:', e);
            this.json = { events: [] };
        }
    } catch (error) {
        console.error('Error fetching WordPress Tribe Events:', error);
        this.json = { events: [] };
    }
    return this;
};

WordPressTribeEvents.prototype.parse = function () {
    if (this.json && Array.isArray(this.json.events)) {
        this.events = this.events.concat(this.json.events);
    }
    return this;
};

WordPressTribeEvents.prototype.toFullCalendarEventObject = function (e) {
    if (!e) return null;
    
    var geoJSON = (e.venue && e.venue.geo_lat && e.venue.geo_lng)
        ? {
            type: "Point",
            coordinates: [e.venue.geo_lng, e.venue.geo_lat]
        }
        : null;

    var location = e.venue ? {
        geoJSON: geoJSON,
        eventVenue: {
            name: e.venue.venue || '',
            address: {
                streetAddress: e.venue.address || '',
                addressLocality: e.venue.city || '',
                postalCode: e.venue.zip || '',
                addressCountry: e.venue.country || ''
            },
            geo: {
                latitude: e.venue.geo_lat || null,
                longitude: e.venue.geo_lng || null
            }
        }
    } : null;

    return new FullCalendarEvent({
        title: e.title || 'Untitled Event',
        start: e.utc_start_date ? new Date(e.utc_start_date + 'Z') : null,
        end: e.utc_end_date ? new Date(e.utc_end_date + 'Z') : null,
        url: e.url || '',
        extendedProps: {
            description: e.description || '',
            image: e.image && e.image.url ? e.image.url : null,
            location: location
        }
    });
};
