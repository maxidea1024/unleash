import type { IFavoriteProject } from '../favorites';
import type { IStore } from './store';

export interface IFavoriteProjectKey {
  userId: number;
  project: string;
}

export interface IFavoriteProjectsStore
  extends IStore<IFavoriteProject, IFavoriteProjectKey> {
  addFavoriteProject(favorite: IFavoriteProjectKey): Promise<IFavoriteProject>;
}
