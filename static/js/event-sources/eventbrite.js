/**
 * Utility module to support the calendar's EventBrite
 * event sources.
 */
import { useCorsProxy, domparser } from '../utils.js';
import FullCalendarEvent from '../event.js';

export default function EventBrite ( optionsObj ) {
    this.url = new URL(optionsObj.url);

    return this.fetch(this.url).then( ( eb ) => {
        optionsObj.successCallback(eb.parse().events);
    });
};

EventBrite.prototype.fetch = async function (url) {
    var response = await fetch(useCorsProxy(url));
    var json = []
    try {
        var html = await response.text();
        var doc = domparser.parseFromString(html, 'text/html');
        var scripts = doc.querySelectorAll('script[type="application/ld+json"]');
        for (let script of scripts) {
            try {
                let data = JSON.parse(script.innerText);
                if (Array.isArray(data)) {
                    json = json.concat(data);
                } else {
                    json.push(data);
                }
            } catch (e) {
                console.warn('Failed to parse JSON-LD script:', e);
            }
        }
    }
    catch (e) {
        console.error('Failed to fetch or parse EventBrite page:', e);
    }
    this.json = json;
    return this;
};

/**
 * @TODO Parse individual occurrences instead of treating as one long event.
 */
EventBrite.prototype.parse = function () {
    this.events = Array.isArray(this.json) ? this.json.map(FullCalendarEvent.fromSchemaDotOrg) : [];
    return this;
};
