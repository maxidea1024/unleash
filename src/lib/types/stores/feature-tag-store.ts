import type { ITag } from '../model';
import type { IStore } from './store';

export interface IFeatureTag {
  featureName: string;
  tagType: string;
  tagValue: string;
  createdByUserId?: number;
}

export interface IFeatureTagInsert
  extends Omit<IFeatureTag, 'created_by_user_id'> {
  createdByUserId: number;
}

export interface IFeatureAndTag {
  featureName: string;
  tag: ITag;
}

export interface IFeatureTagStore extends IStore<IFeatureTag, IFeatureTag> {
  getAllTagsForFeature(featureName: string): Promise<ITag[]>;
  getAllFeaturesForTag(tagValue: string): Promise<string[]>;
  getAllByFeatures(features: string[]): Promise<IFeatureTag[]>;
  tagFeature(
    featureName: string,
    tag: ITag,
    createdByUserId: number,
  ): Promise<ITag>;
  tagFeatures(featureTags: IFeatureTagInsert[]): Promise<IFeatureAndTag[]>;
  untagFeature(featureName: string, tag: ITag): Promise<void>;
  untagFeatures(
    featureTags: Omit<IFeatureTag, 'createdByUserId'>[],
  ): Promise<void>;
}
