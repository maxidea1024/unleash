/**
 * Interface representing an application in the Unleash system
 */
export interface IApplication {
  /** Name of the application */
  appName: string;
  /** Color used for application UI representation */
  color: string;
  /** Timestamp when the application was created */
  createdAt: string;
  /** Description of the application */
  description: string;
  /** Icon identifier for the application */
  icon: string;
  /** List of application instances */
  instances: [];
  /** Object containing related links */
  links: object;
  /** Array of feature toggles seen by this application */
  seenToggles: [];
  /** Array of strategies used by this application */
  strategies: [];
  /** URL where the application is hosted */
  url: string;
}
