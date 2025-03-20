import type EventEmitter from 'events';
import type { Logger, LogProvider } from '../logger';
import type { IFavoriteProject } from '../types/favorites';
import type {
  IFavoriteProjectKey,
  IFavoriteProjectsStore,
} from '../types/stores/favorite-projects';
import type { Db } from './db';

const TABLE = 'favorite_projects';

interface IFavoriteProjectRow {
  user_id: number;
  project: string;
  created_at: Date;
}

const rowToFavorite = (row: IFavoriteProjectRow) => {
  return {
    userId: row.user_id,
    project: row.project,
    createdAt: row.created_at,
  };
};

export class FavoriteProjectsStore implements IFavoriteProjectsStore {
  private readonly logger: Logger;
  private readonly eventBus: EventEmitter;
  private readonly db: Db;

  constructor(db: Db, eventBus: EventEmitter, getLogger: LogProvider) {
    this.logger = getLogger('favorite-projects-store.ts');

    this.db = db;
    this.eventBus = eventBus;
  }

  async addFavoriteProject({
    userId,
    project,
  }: IFavoriteProjectKey): Promise<IFavoriteProject> {
    const insertedProject = await this.db<IFavoriteProjectRow>(TABLE)
      .insert({ project, user_id: userId })
      .onConflict(['user_id', 'project'])
      .merge()
      .returning('*');

    return rowToFavorite(insertedProject[0]);
  }

  async delete({ userId, project }: IFavoriteProjectKey): Promise<void> {
    return this.db(TABLE)
      .where({ project, user_id: userId })
      .del();
  }

  async deleteAll(): Promise<void> {
    await this.db(TABLE).del();
  }

  destroy(): void { }

  async exists({ userId, project }: IFavoriteProjectKey): Promise<boolean> {
    const result = await this.db.raw(
      `SELECT EXISTS(SELECT 1 FROM ${TABLE} WHERE user_id = ? AND project = ?) AS present`,
      [userId, project],
    );
    const { present } = result.rows[0];
    return present;
  }

  async get({
    userId,
    project,
  }: IFavoriteProjectKey): Promise<IFavoriteProject> {
    const favorite = await this.db
      .table<IFavoriteProjectRow>(TABLE)
      .select()
      .where({ project, user_id: userId })
      .first();

    return rowToFavorite(favorite);
  }

  async getAll(): Promise<IFavoriteProject[]> {
    const groups = await this.db<IFavoriteProjectRow>(TABLE).select();
    return groups.map(rowToFavorite);
  }
}
