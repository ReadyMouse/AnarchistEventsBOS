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
            /*{
                name: 'Skip the Small Talk',
                id: 'skip-the-small-talk',
                className: 'skip-the-small-talk',
                url: 'https://www.eventbrite.com/o/skip-the-small-talk-10841599652'
            },*/
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
            {
                name: 'LGBTQ Night Life - Events',
                id: 'lgbtq-night-life',
                className: 'lgbtq-night-life',
                url: 'https://www.eventbrite.com/o/lgbtq-nightlife-events-33774307717'
            },
			{
                name: 'Frolic',
                id: 'frolic',
                className: 'frolic',
                url: 'https://www.eventbrite.com/o/frolic-17820919280'
            }
        ]
    },
    {
        sourceType: 'GoogleCalendar',
        options: {
            color: 'gray'
        },
        sources: [
            {
                name: 'Queers on Wheels (roller)',
                id: 'queers-on-wheels-roller',
                className: 'queers-on-wheels-roller',
                url: 'https://calendar.google.com/calendar/ical/0da41c0bb3bb9066f7c20d59285bf1b8780462f3001dbc9ae2f6f461839330f9%40group.calendar.google.com/public/basic.ics'
            },
			{
                name: 'Friendly to Anarchism.BOS',
                id: 'friendly-to',
                className: 'friendly-to',
                url: 'https://calendar.google.com/calendar/ical/f99add0f125468e94ed1852665a37befae2169dbff40bcad887a84a27efc6f85%40group.calendar.google.com/public/basic.ics'
            }
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
    },
	{
		sourceType: 'Tockify',
        options: {},
        sources: [
            {
                name: 'Midway Cafe',
                id: 'midway-cafe',
                className: 'midway-cafe',
                url: 'https://tockify.com/api/ngevent?max=100&calname=midwaycafejp&start-inclusive=true&longForm=true&showAll=true',
            }
		]
	}
];

export default MainEventSourceData;
