/**
 * Utility module to support the calendar's lu.ma
 * event sources.
 */
import FullCalendarEvent from '../event.js';

export default function Luma(optionsObj) {
    this.calendarId = optionsObj.id;

    return this.fetch().then((luma) => {
        optionsObj.successCallback(luma.parse().events);
    }).catch(error => {
        console.error('Error in Luma event source:', error);
        optionsObj.failureCallback?.(error);
    });
}

Luma.prototype.fetch = async function() {
    try {
        const apiUrl = `https://api.lu.ma/calendar/get-items?calendar_api_id=${this.calendarId}&pagination_limit=20&period=future`;
        
        console.log('Fetching events from:', apiUrl);
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://lu.ma',
                'Referer': 'https://lu.ma/'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Events data:', data);

        // Store the events in the instance
        this.json = {
            events: data.entries || []
        };
        
    } catch (error) {
        console.error('Error fetching lu.ma events:', error);
        this.json = { events: [] };
    }
    return this;
};

Luma.prototype.parse = function() {
    // Transform lu.ma event format to FullCalendar event format
    this.events = (this.json.events || []).map(entry => {
        try {
            const event = entry.event;
            console.log('Processing event:', event);
            
            return new FullCalendarEvent({
                title: event.name || 'Untitled Event',
                start: event.start_at ? new Date(event.start_at) : null,
                end: event.end_at ? new Date(event.end_at) : null,
                url: `https://lu.ma/${event.url}` || '',
                description: event.description || '',
                location: event.geo_address_info?.full_address || event.geo_address_info?.city_state || '',
                extendedProps: {
                    organizer: event.calendar?.name || '',
                    coverImage: event.cover_url || null,
                    hosts: event.hosts?.map(host => host.name).join(', ') || '',
                    guestCount: entry.guest_count || 0,
                    ticketInfo: entry.ticket_info || {},
                    timezone: event.timezone || 'UTC'
                }
            });
        } catch (error) {
            console.error('Error parsing lu.ma event:', error);
            return null;
        }
    }).filter(Boolean); // Remove any null events from failed parsing

    return this;
}; 