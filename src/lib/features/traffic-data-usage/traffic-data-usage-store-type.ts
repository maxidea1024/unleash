import type { IStore } from '../../types/stores/store';

export type IStatTrafficUsage = {
  day: Date;
  trafficGroup: string;
  statusCodeSeries: number;
  count: number;
};

export interface IStatTrafficUsageKey {
  day: Date;
  trafficGroup: string;
  statusCodeSeries: number;
}

export interface ITrafficDataUsageStore
  extends IStore<IStatTrafficUsage, IStatTrafficUsageKey> {
  upsert(trafficDataUsage: IStatTrafficUsage): Promise<void>;
  getTrafficDataUsageForPeriod(period: string): Promise<IStatTrafficUsage[]>;
}
