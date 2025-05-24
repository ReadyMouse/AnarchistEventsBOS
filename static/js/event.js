export default class FullCalendarEvent {
    constructor (props) {
        return Object.assign({
            title: null,
            start: null,
            end: null,
            url: null,
            // In general, these should sort of match the Schema.org
            // schema for an Event object to fill in FullCalendar event
            // object definition that is not already accounted for.
            extendedProps: {
                description: null,
                image: null,
                location: {
                    geoJSON: {
                        type: 'Point',
                        coordinates: [null, null] // Longitude, Latitude
                    },
                    // Should be Schema.org EventVenue, type of Place.
                    // https://schema.org/EventVenue
                    eventVenue: {
                        name: null,
                        description: null,
                        url: null,
                        logo: null,
                        address: {
                            streetAddress: null,
                            addressLocality: null,
                            addressRegion: null,
                            postalCode: null,
                            addressCountry: null
                        },
                        geo: {
                            latitude: null,
                            longitude: null
                        },
                        hasMap: null
                    }
                }
            },
            raw: null // Raw information from original source.
        }, props); // Whatever we pass in should override.
    }; 

    /**
     * Translates a Schema.org Event type (or more specific type)
     * to a FullCalendar event object.
     *
     * @param {Object} item JSON-formatted Schema.org Event object.
     */
    static fromSchemaDotOrg (item) {
        // If we have a `geo` object, format it to geoJSON.
        var geoJSON = (item.location?.geo) ? {
            type: "Point",
            coordinates: [
                item.location.geo.longitude,
                item.location.geo.latitude
            ]
        } : null; // Otherwise, set it to null;

        return {
            title: item.name || 'Untitled Event',
            start: item.startDate ? new Date(item.startDate) : null,
            end: item.endDate ? new Date(item.endDate) : null,
            url: item.url || '',
            extendedProps: {
                description: item.description || null,
                image: item.image || null,
                location: item.location ? {
                    geoJSON: geoJSON,
                    eventVenue: {
                        name: item.location.name || null,
                        address: {
                            streetAddress: item.location.streetAddress || null,
                            addressLocality: item.location.addressLocality || null,
                            addressRegion: item.location.addressRegion || null,
                            postalCode: item.location.postalCode || null,
                            addressCountry: item.location.addressCountry || null
                        },
                        geo: item.location.geo || null
                    }
                } : null
            }
        };
    }
};
