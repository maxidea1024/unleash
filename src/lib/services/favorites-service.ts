import type { IGanpaConfig } from '../types/options';
import type { IFavoriteProjectsStore, IGanpaStores } from '../types/stores';
import type { Logger } from '../logger';
import type { IFavoriteFeaturesStore } from '../types/stores/favorite-features';
import type { IFavoriteFeature, IFavoriteProject } from '../types/favorites';
import {
  FeatureFavoritedEvent,
  FeatureUnfavoritedEvent,
  type IAuditUser,
  ProjectFavoritedEvent,
  ProjectUnfavoritedEvent,
} from '../types';
import type { IUser } from '../types/user';
import type { IFavoriteProjectKey } from '../types/stores/favorite-projects';
import type EventService from '../features/events/event-service';

export interface IFavoriteFeatureProps {
  feature: string;
  user: IUser;
}

export interface IFavoriteProjectProps {
  project: string;
  user: IUser;
}

export class FavoritesService {
  private readonly config: IGanpaConfig;
  private readonly favoriteFeaturesStore: IFavoriteFeaturesStore;
  private readonly favoriteProjectsStore: IFavoriteProjectsStore;
  private readonly eventService: EventService;
  private readonly logger: Logger;

  constructor(
    {
      favoriteFeaturesStore,
      favoriteProjectsStore,
    }: Pick<IGanpaStores, 'favoriteFeaturesStore' | 'favoriteProjectsStore'>,
    config: IGanpaConfig,
    eventService: EventService,
  ) {
    this.logger = config.getLogger('favorites-service.ts');

    this.config = config;
    this.favoriteFeaturesStore = favoriteFeaturesStore;
    this.favoriteProjectsStore = favoriteProjectsStore;
    this.eventService = eventService;
  }

  async favoriteFeature(
    { feature, user }: IFavoriteFeatureProps,
    auditUser: IAuditUser,
  ): Promise<IFavoriteFeature> {
    const data = await this.favoriteFeaturesStore.addFavoriteFeature({
      feature: feature,
      userId: user.id,
    });

    await this.eventService.storeEvent(
      new FeatureFavoritedEvent({
        featureName: feature,
        data: {
          feature,
        },
        auditUser,
      }),
    );

    return data;
  }

  async unfavoriteFeature(
    { feature, user }: IFavoriteFeatureProps,
    auditUser: IAuditUser,
  ): Promise<void> {
    await this.favoriteFeaturesStore.delete({
      feature: feature,
      userId: user.id,
    });

    await this.eventService.storeEvent(
      new FeatureUnfavoritedEvent({
        featureName: feature,
        data: {
          feature,
        },
        auditUser,
      }),
    );
  }

  async favoriteProject(
    { project, user }: IFavoriteProjectProps,
    auditUser: IAuditUser,
  ): Promise<IFavoriteProject> {
    const data = this.favoriteProjectsStore.addFavoriteProject({
      project,
      userId: user.id,
    });

    await this.eventService.storeEvent(
      new ProjectFavoritedEvent({
        data: {
          project,
        },
        project,
        auditUser,
      }),
    );

    return data;
  }

  async unfavoriteProject(
    { project, user }: IFavoriteProjectProps,
    auditUser: IAuditUser,
  ): Promise<void> {
    await this.favoriteProjectsStore.delete({
      project: project,
      userId: user.id,
    });

    await this.eventService.storeEvent(
      new ProjectUnfavoritedEvent({
        data: {
          project,
        },
        project,
        auditUser,
      }),
    );
  }

  async isFavoriteProject(favorite: IFavoriteProjectKey): Promise<boolean> {
    if (favorite.userId) {
      return await this.favoriteProjectsStore.exists(favorite);
    }

    return false;
  }
}
