import type { Logger } from '../../../logger';
import type { IGanpaConfig } from '../../../server-impl';
import type { IClientMetricsEnv } from '../client-metrics/client-metrics-store-v2-type';
import type { ILastSeenStore } from './types/last-seen-store-type';
import type { IGanpaStores } from '../../../types';

export type LastSeenInput = {
  featureName: string;
  environment: string;
};

export class LastSeenService {
  private readonly logger: Logger;
  private readonly lastSeenStore: ILastSeenStore;
  private lastSeenToggles: Map<String, LastSeenInput> = new Map();

  constructor(
    { lastSeenStore }: Pick<IGanpaStores, 'lastSeenStore'>,
    config: IGanpaConfig,
  ) {
    this.logger = config.getLogger('last-seen-service.ts');

    this.lastSeenStore = lastSeenStore;
  }

  async store(): Promise<number> {
    const count = this.lastSeenToggles.size;
    if (count > 0) {
      const lastSeenToggles = Array.from(this.lastSeenToggles.values()).filter(
        (lastSeen) => lastSeen.featureName.length <= 255,
      );
      if (lastSeenToggles.length < this.lastSeenToggles.size) {
        this.logger.warn(
          `Toggles with long names ${JSON.stringify(
            Array.from(this.lastSeenToggles.values())
              .filter((lastSeen) => lastSeen.featureName.length > 255)
              .map((lastSeen) => lastSeen.featureName),
          )}`,
        );
      }
      this.logger.debug(
        `Updating last seen for ${lastSeenToggles.length} toggles`,
      );
      this.lastSeenToggles = new Map<String, LastSeenInput>();

      await this.lastSeenStore.setLastSeen(lastSeenToggles);
    }
    return count;
  }

  updateLastSeen(clientMetrics: IClientMetricsEnv[]): void {
    clientMetrics
      .filter(
        (clientMetric) =>
          !this.lastSeenToggles.has(
            `${clientMetric.featureName}:${clientMetric.environment}`,
          ),
      )
      .filter((clientMetric) => clientMetric.yes > 0 || clientMetric.no > 0)
      .forEach((clientMetric) => {
        const key = `${clientMetric.featureName}:${clientMetric.environment}`;
        this.lastSeenToggles.set(key, {
          featureName: clientMetric.featureName,
          environment: clientMetric.environment,
        });
      });
  }

  async cleanLastSeen() {
    await this.lastSeenStore.cleanLastSeen();
  }
}
