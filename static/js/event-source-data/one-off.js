/**
 * Temporary(?) file for storing any "one off" event sources. These
 * are effectively custom parsers that don't have their own JavaScript
 * Module themselves.
 *
 * TODO: Still need to figure out how to generalize these so that they
 *       can be used as proper event sources?
 */
import * as Utils from '../utils.js';
import { default as FullCalendarEvent } from '../event.js';
const OneOffEventSources = [
];
export default OneOffEventSources;
