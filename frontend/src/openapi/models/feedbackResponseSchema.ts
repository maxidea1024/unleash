/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * User feedback information about a particular feedback item.
 */
export interface FeedbackResponseSchema {
  /** The name of the feedback session */
  feedbackId?: string;
  /**
   * When this feedback was given
   * @nullable
   */
  given?: string | null;
  /** `true` if the user has asked never to see this feedback questionnaire again. */
  neverShow?: boolean;
  /** The ID of the user that gave the feedback. */
  userId?: number;
}
