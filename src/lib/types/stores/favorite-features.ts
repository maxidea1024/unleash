import type { IFavoriteFeature } from '../favorites';
import type { IStore } from './store';

export interface IFavoriteFeatureKey {
  userId: number;
  feature: string;
}

export interface IFavoriteFeaturesStore extends IStore<IFavoriteFeature, IFavoriteFeatureKey> {
  addFavoriteFeature(favorite: IFavoriteFeatureKey): Promise<IFavoriteFeature>;
}
