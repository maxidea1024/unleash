import {
  FeatureEvaluator,
  type FeatureEvaluatorConfig,
} from './feature-evaluator';
import { Variant } from './variant';
import { Context } from './context';
import type { ClientFeaturesResponse } from './feature';
import InMemStorageProvider from './repository/storage-provider-in-mem';

// exports
export { Strategy } from './strategy';
export { Context, Variant, FeatureEvaluator, InMemStorageProvider };
export type { ClientFeaturesResponse, FeatureEvaluatorConfig };
