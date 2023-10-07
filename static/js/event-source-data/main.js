/**
 * This file contains the actual list of event sources used by a
 * given instance of this site.
 */

/**
 * The `MainEventSourceData` constant is the main data
 * structure for sourcing event information. It's
 * a nested structure that looks like this:
 *
 * ```javascript
 * [
 *     {
 *         sourceType: 'Constructor', // Name of default export from event source plugin.
 *         options: {
 *             // Various options to set on the event source itself.
 *             // For details, see
 *             //     https://fullcalendar.io/docs/event-source-object#options
 *         },
 *         // List of individual sources that require the given Constructor:
 *         sources: [
 *             // Different values here, usually at a minimum:
 *             {
 *                 name: 'Source name',
 *                 id: 'source-name-for-html-id',
 *                 className: 'source-name-for-html-class',
 *                 url: 'https://example.com/blah.ical'
 *             }
 *         ]
 *     }
 * ]
 * ```
 */
const MainEventSourceData = [
    {
        sourceType: 'EventBrite',
        options: {
            color: 'red'
        },
        sources: [
            {
                name: 'Skip the Small Talk',
                id: 'skip-the-small-talk',
                className: 'skip-the-small-talk',
                url: 'https://www.eventbrite.com/o/adhoc-presents-new-york-17573655465'
            },
            {
                name: 'Queerlective',
                id: 'queerlective',
                className: 'queerlective',
                url: 'https://www.eventbrite.com/o/queerlective-69609236513'
            },
            {
                name: 'Femme Bar',
                id: 'femme',
                className: 'femme',
                url: 'https://www.eventbrite.com/o/femme-64949605833'
            },
            {
                name: 'Imbibe',
                id: 'imbibe',
                className: 'imbibe',
                url: 'https://www.eventbrite.com/o/imbibe-49756614173'
            },
            {
                name: 'Starlight Square',
                id: 'starlight',
                className: 'starlight',
                url: 'https://www.eventbrite.com/o/starlight-square-31300867995'
            },
        ]
    },
    {
        sourceType: 'GoogleCalendar',
        options: {
            color: 'gray'
        },
        sources: [
        ]
    },
    {
        sourceType: 'WordPressTribeEvents',
        options: {
            color: 'blue'
        },
        sources: [
            {
                name: 'Mill No. 5',
                id: 'mill-no-5',
                className: 'mill-no-5',
                url: 'https://millno5.com/wp-json/tribe/events/v1/events?per_page=50'
            }
        ]
    },
    {
        sourceType: 'ModernEventsCalendarEvents',
        options: {},
        sources: [
            {
                name: 'Club Cafe',
                id: 'club-cafe',
                className: 'club-cafe',
                url: 'https://www.clubcafe.com/full-calendar/',
                useCorsProxy: true
            }
        ]
    }
];

export default MainEventSourceData;
