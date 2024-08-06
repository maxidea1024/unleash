/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { EventSchema } from './eventSchema';

/**
 * A list of events that have been registered by the system
 */
export interface EventSearchResponseSchema {
    /** The list of events */
    events: EventSchema[];
    /**
     * The total count of events
     * @minimum 0
     */
    total: number;
}