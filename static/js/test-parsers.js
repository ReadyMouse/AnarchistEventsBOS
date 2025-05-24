/**
 * Test file to verify Luma event source parsing logic with actual HTML.
 */
import Luma from './event-sources/luma.js';

// Test direct fetch first
async function testDirectFetch() {
    console.log("Testing direct fetch of lu.ma page...");
    try {
        const corsProxy = 'https://corsproxy.io/?';
        const url = `${corsProxy}${encodeURIComponent('https://lu.ma/bostoncreatoreconomy')}`;
        console.log("Fetching via CORS proxy:", url);
        
        const response = await fetch(url);
        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));
        const text = await response.text();
        console.log("Response text preview:", text.substring(0, 500));
    } catch (error) {
        console.error("Direct fetch error:", error);
    }
}

// Test Luma parser with actual HTML
async function testLumaParser() {
    console.log("Testing Luma parser with actual lu.ma page...");
    
    try {
        // First try fetch with CORS proxy
        const corsProxy = 'https://corsproxy.io/?';
        const url = `${corsProxy}${encodeURIComponent('https://lu.ma/bostoncreatoreconomy')}`;
        console.log("Fetching via CORS proxy:", url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log("Successfully fetched HTML, length:", html.length);
        
        // Now try the parser
        const luma = new Luma({ 
            url: "https://lu.ma/bostoncreatoreconomy",
            useCorsProxy: true,
            successCallback: (events) => {
                console.log("Parsed events from actual HTML:", events);
            },
            failureCallback: (error) => {
                console.error("Error testing Luma parser:", error);
            }
        });
    } catch (error) {
        console.error("Error testing Luma parser:", error);
    }
}

// Make test functions available globally
window.testLumaParser = {
    test: testLumaParser,
    testDirect: testDirectFetch
}; 