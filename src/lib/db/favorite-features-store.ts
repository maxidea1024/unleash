import type EventEmitter from 'events';
import type { IFavoriteFeaturesStore } from '../types';
import type { Logger, LogProvider } from '../logger';
import type { IFavoriteFeatureKey } from '../types/stores/favorite-features';
import type { IFavoriteFeature } from '../types/favorites';
import type { Db } from './db';

const TABLE = 'favorite_features';

interface IFavoriteFeatureRow {
  user_id: number;
  feature: string;
  created_at: Date;
}

const rowToFavorite = (row: IFavoriteFeatureRow) => {
  return {
    userId: row.user_id,
    feature: row.feature,
    createdAt: row.created_at,
  };
};

export class FavoriteFeaturesStore implements IFavoriteFeaturesStore {
  private readonly logger: Logger;
  private readonly eventBus: EventEmitter;
  private readonly db: Db;

  constructor(db: Db, eventBus: EventEmitter, getLogger: LogProvider) {
    this.logger = getLogger('favorite-features-store.ts');

    this.db = db;
    this.eventBus = eventBus;
  }

  async addFavoriteFeature({
    userId,
    feature,
  }: IFavoriteFeatureKey): Promise<IFavoriteFeature> {
    const insertedFeature = await this.db<IFavoriteFeatureRow>(TABLE)
      .insert({ feature, user_id: userId })
      .onConflict(['user_id', 'feature'])
      .merge()
      .returning('*');

    return rowToFavorite(insertedFeature[0]);
  }

  async delete({ userId, feature }: IFavoriteFeatureKey): Promise<void> {
    return this.db(TABLE)
      .where({ feature, user_id: userId })
      .del();
  }

  async deleteAll(): Promise<void> {
    await this.db(TABLE).del();
  }

  destroy(): void { }

  async exists({ userId, feature }: IFavoriteFeatureKey): Promise<boolean> {
    const result = await this.db.raw(
      `SELECT EXISTS (SELECT 1 FROM ${TABLE} WHERE user_id = ? AND feature = ?) AS present`,
      [userId, feature],
    );
    const { present } = result.rows[0];
    return present;
  }

  async get({
    userId,
    feature,
  }: IFavoriteFeatureKey): Promise<IFavoriteFeature> {
    const favorite = await this.db
      .table<IFavoriteFeatureRow>(TABLE)
      .select()
      .where({ feature, user_id: userId })
      .first();

    return rowToFavorite(favorite);
  }

  async getAll(): Promise<IFavoriteFeature[]> {
    const groups = await this.db<IFavoriteFeatureRow>(TABLE).select();
    return groups.map(rowToFavorite);
  }
}
