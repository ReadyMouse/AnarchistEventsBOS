---
layout: none
---
/**
 * Simplistic and "good enough" helper functions, mostly for dealing
 * with common one-off event source type issues.
 */
export const domparser = new DOMParser();

const corsbase = '{{ site.cors_proxy_base_url | default: "https://cors.anarchism.nyc"}}';

/**
 * Changes a URL so that it will be retrieved through a CORS proxy.
 *
 * @param {URL|String} url The URL to modify.
 * @return {URL} The URL, with the CORS proxy endpoint prepended.
 */
export function useCorsProxy ( url ) {
    return new URL(`${corsbase}/${url.toString()}`);
}

/**
 * Simplistically converts a 12-hour time format string to a 24-hour time.
 *
 * @param str {String} The 12-hour formatted time string, e.g., `"8:00 am"`.
 * @return {String} The 24-hour formatted time string, e.g., `"20:00"`.
 */
export function convert12To24HourTime (str) {
    if (!str) return '00:00';
    
    try {
        var h, m;
        const timeMatch = str.match(/^(\d?\d):(\d\d)/);
        if (!timeMatch) return '00:00';
        
        [h, m] = timeMatch.slice(1);
        
        if (str.match(/ ?am$/i)) {
            if (h === '12') {
                h = '00';
            }
        } else if (str.match(/ ?pm$/i)) {
            h = (parseInt(h) + 12).toString();
            if (h === '24') {
                h = '12';
            }
        }
        
        return `${h.padStart(2, '0')}:${m}`;
    } catch (error) {
        console.error('Error converting time:', error);
        return '00:00';
    }
}
