import Luma from './event-sources/luma.js';

// Test configuration
const testConfig = {
    url: 'https://lu.ma/NEAR-community',
    successCallback: (events) => {
        console.log('Successfully fetched events:', events);
        console.log('Number of events:', events.length);
        // Log the first event in detail
        if (events.length > 0) {
            console.log('First event details:', JSON.stringify(events[0], null, 2));
        }
    },
    failureCallback: (error) => {
        console.error('Failed to fetch events:', error);
    }
};

// Run the test
console.log('Testing Luma event source...');
new Luma(testConfig).catch(error => {
    console.error('Test failed:', error);
}); 