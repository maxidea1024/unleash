import type { IGanpaStores } from '../types/stores';
import type { IGanpaConfig } from '../types/options';
import type { Logger } from '../logger';
import type { ISession, ISessionStore } from '../types/stores/session-store';
import { compareDesc } from 'date-fns';

export default class SessionService {
  private readonly logger: Logger;
  private readonly sessionStore: ISessionStore;

  constructor(
    {
      sessionStore
    }: Pick<IGanpaStores, 'sessionStore'>,
    {
      getLogger
    }: Pick<IGanpaConfig, 'getLogger'>,
  ) {
    this.logger = getLogger('session-service.ts');

    this.sessionStore = sessionStore;
  }

  async getActiveSessions(): Promise<ISession[]> {
    return this.sessionStore.getActiveSessions();
  }

  async getSessionsForUser(userId: number): Promise<ISession[]> {
    return this.sessionStore.getSessionsForUser(userId);
  }

  async getSession(sid: string): Promise<ISession> {
    return this.sessionStore.get(sid);
  }

  async deleteSessionsForUser(userId: number): Promise<void> {
    return this.sessionStore.deleteSessionsForUser(userId);
  }

  async deleteStaleSessionsForUser(
    userId: number,
    maxSessions: number,
  ): Promise<number> {
    const userSessions: ISession[] =
      await this.sessionStore.getSessionsForUser(userId);
    const newestFirst = userSessions.sort((a, b) =>
      compareDesc(a.createdAt, b.createdAt),
    );
    const sessionsToDelete = newestFirst.slice(maxSessions);
    await Promise.all(
      sessionsToDelete.map((session) => this.sessionStore.delete(session.sid)),
    );
    return sessionsToDelete.length;
  }

  async deleteSession(sid: string): Promise<void> {
    return this.sessionStore.delete(sid);
  }

  async insertSession({
    sid,
    sess,
  }: Pick<ISession, 'sid' | 'sess'>): Promise<ISession> {
    return this.sessionStore.insertSession({ sid, sess });
  }

  async getSessionsCount() {
    return Object.fromEntries(
      (await this.sessionStore.getSessionsCount()).map(({ userId, count }) => [
        userId,
        count,
      ]),
    );
  }
}
