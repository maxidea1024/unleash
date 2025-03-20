export interface IGroupedClientMetrics {
  environment: string;
  timestamp: Date;
  yes: number;
  no: number;
}

export interface IToggleMetricsSummary {
  featureName: string;
  lastHourUsage: IGroupedClientMetrics[];
  seenApplications: string[];
}
