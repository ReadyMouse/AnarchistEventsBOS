/**
 * Utility module to support the calendar's lu.ma
 * event sources.
 */
import { useCorsProxy, domparser } from '../utils.js';
import FullCalendarEvent from '../event.js';

export default function Luma(optionsObj) {
    this.url = new URL(optionsObj.url);
    this.useCorsProxy = optionsObj.useCorsProxy;

    return this.fetch(this.url).then((luma) => {
        optionsObj.successCallback(luma.parse().events);
    }).catch(error => {
        console.error('Error in Luma event source:', error);
        optionsObj.failureCallback?.(error);
    });
}

Luma.prototype.fetch = async function(url) {
    try {
        // First, fetch the calendar page to get the API ID
        let proxiedUrl;
        if (this.useCorsProxy) {
            // Use the CORS proxy from the config
            const corsProxy = window.CORS_PROXY_BASE_URL || 'https://cors.anarchism.nyc/';
            // Ensure the CORS proxy URL ends with a slash
            const baseUrl = corsProxy.endsWith('/') ? corsProxy : `${corsProxy}/`;
            // Use encodeURIComponent to properly encode the URL
            proxiedUrl = new URL(encodeURIComponent(url.toString()), baseUrl);
        } else {
            proxiedUrl = url;
        }
        
        console.log('Fetching calendar page:', proxiedUrl.toString());
        const response = await fetch(proxiedUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const doc = domparser.parseFromString(html, 'text/html');
        
        // Get the calendar data from the JSON script tag
        const eventData = doc.querySelector('script[type="application/json"]');
        if (!eventData) {
            throw new Error('No event data found in lu.ma response');
        }

        const parsedData = JSON.parse(eventData.innerText);
        console.log('Full parsed data structure:', JSON.stringify(parsedData, null, 2));
        
        // Extract calendar data from the Next.js data structure
        const calendarData = parsedData?.props?.pageProps?.initialData?.data?.calendar;
        if (!calendarData) {
            throw new Error('No calendar data found in response');
        }

        console.log('Calendar data structure:', JSON.stringify(calendarData, null, 2));

        // Get the API ID from the calendar data
        const apiId = calendarData.api_id;
        if (!apiId) {
            throw new Error('No API ID found in calendar data');
        }

        // Now fetch the events using the API ID
        const eventsUrl = `https://lu.ma/api/v1/calendars/${apiId}/events`;
        let proxiedEventsUrl;
        if (this.useCorsProxy) {
            // Use the CORS proxy from the config
            const corsProxy = window.CORS_PROXY_BASE_URL || 'https://cors.anarchism.nyc/';
            // Ensure the CORS proxy URL ends with a slash
            const baseUrl = corsProxy.endsWith('/') ? corsProxy : `${corsProxy}/`;
            // Use encodeURIComponent to properly encode the URL
            proxiedEventsUrl = new URL(encodeURIComponent(eventsUrl), baseUrl);
        } else {
            proxiedEventsUrl = new URL(eventsUrl);
        }
        
        console.log('Fetching events from:', proxiedEventsUrl.toString());
        const eventsResponse = await fetch(proxiedEventsUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://lu.ma',
                'Referer': 'https://lu.ma/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            mode: 'cors',
            credentials: 'omit'
        });
        
        if (!eventsResponse.ok) {
            const errorText = await eventsResponse.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        console.log('Events data:', eventsData);

        // Store the events in the instance
        this.json = {
            events: eventsData.events || []
        };
        
    } catch (error) {
        console.error('Error fetching lu.ma events:', error);
        this.json = { events: [] };
    }
    return this;
};

Luma.prototype.parse = function() {
    // Transform lu.ma event format to FullCalendar event format
    this.events = (this.json.events || []).map(event => {
        try {
            console.log('Processing event:', event);
            return new FullCalendarEvent({
                title: event.title || 'Untitled Event',
                start: event.start_time ? new Date(event.start_time) : null,
                end: event.end_time ? new Date(event.end_time) : null,
                url: event.url || '',
                description: event.description || '',
                location: event.location?.name || '',
                extendedProps: {
                    organizer: event.organizer?.name || '',
                    coverImage: event.cover_image_url || null,
                    // Add any other relevant metadata
                }
            });
        } catch (error) {
            console.error('Error parsing lu.ma event:', error);
            return null;
        }
    }).filter(Boolean); // Remove any null events from failed parsing

    return this;
}; 