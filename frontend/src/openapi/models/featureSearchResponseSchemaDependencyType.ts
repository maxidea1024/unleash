/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The type of dependency. 'parent' means that the feature is a parent feature, 'child' means that the feature is a child feature.
 * @nullable
 */
export type FeatureSearchResponseSchemaDependencyType =
  | (typeof FeatureSearchResponseSchemaDependencyType)[keyof typeof FeatureSearchResponseSchemaDependencyType]
  | null;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FeatureSearchResponseSchemaDependencyType = {
  parent: 'parent',
  child: 'child',
} as const;
