import { sha256 } from 'js-sha256';
import type { Logger } from '../../logger';
import type { IGanpaConfig } from '../../types/options';
import type {
  IClientInstanceStore,
  IClientMetricsStoreV2,
  IEventStore,
  IFeatureStrategiesReadModel,
  ITrafficDataUsageStore,
  IGanpaStores,
} from '../../types/stores';
import type { IContextFieldStore } from '../../types/stores/context-field-store';
import type { IEnvironmentStore } from '../project-environments/environment-store-type';
import type { IFeatureToggleStore } from '../feature-toggle/types/feature-toggle-store-type';
import type { IGroupStore } from '../../types/stores/group-store';
import type { IProjectStore } from '../../features/project/project-store-type';
import type { IStrategyStore } from '../../types/stores/strategy-store';
import type { IUserStore } from '../../types/stores/user-store';
import type { ISegmentStore } from '../segment/segment-store-type';
import type { IRoleStore } from '../../types/stores/role-store';
import type VersionService from '../../services/version-service';
import type { ISettingStore } from '../../types/stores/settings-store';
import {
  FEATURES_EXPORTED,
  FEATURES_IMPORTED,
  type IApiTokenStore,
  type IFlagResolver,
} from '../../types';
import { CUSTOM_ROOT_ROLE_TYPE } from '../../util';
import type { GetActiveUsers } from './getActiveUsers';
import type { IProjectModeCount } from '../project/project-store';
import type { GetProductionChanges } from './getProductionChanges';
import { format } from 'date-fns';
import type { GetLicensedUsers } from './getLicensedUsers';

export type TimeRange = 'allTime' | '30d' | '7d';

export interface InstanceStats {
  instanceId: string;
  timestamp: Date;
  versionOSS: string;
  versionEnterprise?: string;
  users: number;
  serviceAccounts: number;
  apiTokens: Map<string, number>;
  featureToggles: number;
  archivedFeatureToggles: number;
  projects: IProjectModeCount[];
  contextFields: number;
  roles: number;
  customRootRoles: number;
  customRootRolesInUse: number;
  featureExports: number;
  featureImports: number;
  groups: number;
  environments: number;
  segments: number;
  strategies: number;
  SAMLenabled: boolean;
  OIDCenabled: boolean;
  clientApps: { range: TimeRange; count: number }[];
  activeUsers: Awaited<ReturnType<GetActiveUsers>>;
  licensedUsers: Awaited<ReturnType<GetLicensedUsers>>;
  productionChanges: Awaited<ReturnType<GetProductionChanges>>;
  previousDayMetricsBucketsCount: {
    enabledCount: number;
    variantCount: number;
  };
  maxEnvironmentStrategies: number;
  maxConstraints: number;
  maxConstraintValues: number;
}

export type InstanceStatsSigned = Omit<InstanceStats, 'projects'> & {
  projects: number;
  sum: string;
};

export class InstanceStatsService {
  private readonly logger: Logger;
  private readonly strategyStore: IStrategyStore;
  private readonly userStore: IUserStore;
  private readonly featureToggleStore: IFeatureToggleStore;
  private readonly contextFieldStore: IContextFieldStore;
  private readonly projectStore: IProjectStore;
  private readonly groupStore: IGroupStore;
  private readonly environmentStore: IEnvironmentStore;
  private readonly segmentStore: ISegmentStore;
  private readonly roleStore: IRoleStore;
  private readonly eventStore: IEventStore;
  private readonly apiTokenStore: IApiTokenStore;
  private readonly versionService: VersionService;
  private readonly settingStore: ISettingStore;
  private readonly clientInstanceStore: IClientInstanceStore;
  private readonly clientMetricsStore: IClientMetricsStoreV2;
  private readonly flagResolver: IFlagResolver;
  private appCount?: Partial<{ [key in TimeRange]: number }>;
  getActiveUsers: GetActiveUsers;
  getLicencedUsers: GetLicensedUsers;
  getProductionChanges: GetProductionChanges;
  private featureStrategiesReadModel: IFeatureStrategiesReadModel;
  private trafficDataUsageStore: ITrafficDataUsageStore;

  constructor(
    {
      featureToggleStore,
      userStore,
      projectStore,
      environmentStore,
      strategyStore,
      contextFieldStore,
      groupStore,
      segmentStore,
      roleStore,
      settingStore,
      clientInstanceStore,
      eventStore,
      apiTokenStore,
      clientMetricsStoreV2,
      featureStrategiesReadModel,
      trafficDataUsageStore,
    }: Pick<
      IGanpaStores,
      | 'featureToggleStore'
      | 'userStore'
      | 'projectStore'
      | 'environmentStore'
      | 'strategyStore'
      | 'contextFieldStore'
      | 'groupStore'
      | 'segmentStore'
      | 'roleStore'
      | 'settingStore'
      | 'clientInstanceStore'
      | 'eventStore'
      | 'apiTokenStore'
      | 'clientMetricsStoreV2'
      | 'featureStrategiesReadModel'
      | 'trafficDataUsageStore'
    >,
    {
      getLogger,
      flagResolver,
    }: Pick<IGanpaConfig, 'getLogger' | 'flagResolver'>,
    versionService: VersionService,
    getActiveUsers: GetActiveUsers,
    getProductionChanges: GetProductionChanges,
    getLicencedUsers: GetLicensedUsers,
  ) {
    this.logger = getLogger('stats-service.ts');

    this.strategyStore = strategyStore;
    this.userStore = userStore;
    this.featureToggleStore = featureToggleStore;
    this.environmentStore = environmentStore;
    this.projectStore = projectStore;
    this.groupStore = groupStore;
    this.contextFieldStore = contextFieldStore;
    this.segmentStore = segmentStore;
    this.roleStore = roleStore;
    this.versionService = versionService;
    this.settingStore = settingStore;
    this.eventStore = eventStore;
    this.clientInstanceStore = clientInstanceStore;
    this.getActiveUsers = getActiveUsers;
    this.getLicencedUsers = getLicencedUsers;
    this.getProductionChanges = getProductionChanges;
    this.apiTokenStore = apiTokenStore;
    this.clientMetricsStore = clientMetricsStoreV2;
    this.flagResolver = flagResolver;
    this.featureStrategiesReadModel = featureStrategiesReadModel;
    this.trafficDataUsageStore = trafficDataUsageStore;
  }

  getProjectModeCount(): Promise<IProjectModeCount[]> {
    return this.projectStore.getProjectModeCounts();
  }

  getToggleCount(): Promise<number> {
    return this.featureToggleStore.count({
      archived: false,
    });
  }

  getArchivedToggleCount(): Promise<number> {
    return this.featureToggleStore.count({
      archived: true,
    });
  }

  async hasOIDC(): Promise<boolean> {
    const settings = await this.settingStore.get<{ enabled: boolean }>(
      'unleash.enterprise.auth.oidc',
    );

    return settings?.enabled || false;
  }

  async hasSAML(): Promise<boolean> {
    const settings = await this.settingStore.get<{ enabled: boolean }>(
      'unleash.enterprise.auth.saml',
    );

    return settings?.enabled || false;
  }

  async hasPasswordAuth(): Promise<boolean> {
    const settings = await this.settingStore.get<{ disabled: boolean }>(
      'unleash.auth.simple',
    );

    return (
      typeof settings?.disabled === 'undefined' || settings.disabled === false
    );
  }

  async hasSCIM(): Promise<boolean> {
    const settings = await this.settingStore.get<{ enabled: boolean }>('scim');

    return settings?.enabled || false;
  }

  async getStats(): Promise<InstanceStats> {
    const versionInfo = await this.versionService.getVersionInfo();
    const [
      featureToggles,
      archivedFeatureToggles,
      users,
      serviceAccounts,
      apiTokens,
      activeUsers,
      licensedUsers,
      projects,
      contextFields,
      groups,
      roles,
      customRootRoles,
      customRootRolesInUse,
      environments,
      segments,
      strategies,
      SAMLenabled,
      OIDCenabled,
      passwordAuthEnabled,
      SCIMenabled,
      clientApps,
      featureExports,
      featureImports,
      productionChanges,
      previousDayMetricsBucketsCount,
      maxEnvironmentStrategies,
      maxConstraintValues,
      maxConstraints,
    ] = await Promise.all([
      this.getToggleCount(),
      this.getArchivedToggleCount(),
      this.getRegisteredUsers(),
      this.countServiceAccounts(),
      this.countApiTokensByType(),
      this.getActiveUsers(),
      this.getLicencedUsers(),
      this.getProjectModeCount(),
      this.contextFieldCount(),
      this.groupCount(),
      this.roleCount(),
      this.customRolesCount(),
      this.customRolesCountInUse(),
      this.environmentCount(),
      this.segmentCount(),
      this.strategiesCount(),
      this.hasSAML(),
      this.hasOIDC(),
      this.hasPasswordAuth(),
      this.hasSCIM(),
      this.appCount ? this.appCount : this.getLabeledAppCounts(),
      this.eventStore.deprecatedFilteredCount({
        type: FEATURES_EXPORTED,
      }),
      this.eventStore.deprecatedFilteredCount({
        type: FEATURES_IMPORTED,
      }),
      this.getProductionChanges(),
      this.countPreviousDayHourlyMetricsBuckets(),
      this.featureStrategiesReadModel.getMaxFeatureEnvironmentStrategies(),
      this.featureStrategiesReadModel.getMaxConstraintValues(),
      this.featureStrategiesReadModel.getMaxConstraintsPerStrategy(),
    ]);

    return {
      timestamp: new Date(),
      instanceId: versionInfo.instanceId,
      versionOSS: versionInfo.current.oss,
      versionEnterprise: versionInfo.current.enterprise,
      users,
      serviceAccounts,
      apiTokens,
      activeUsers,
      licensedUsers,
      featureToggles,
      archivedFeatureToggles,
      projects,
      contextFields,
      roles,
      customRootRoles,
      customRootRolesInUse,
      groups,
      environments,
      segments,
      strategies,
      SAMLenabled,
      OIDCenabled,
      clientApps: Object.entries(clientApps).map(([range, count]) => ({
        range: range as TimeRange,
        count,
      })),
      featureExports,
      featureImports,
      productionChanges,
      previousDayMetricsBucketsCount,
      maxEnvironmentStrategies: maxEnvironmentStrategies?.count ?? 0,
      maxConstraintValues: maxConstraintValues?.count ?? 0,
      maxConstraints: maxConstraints?.count ?? 0,
    };
  }

  groupCount(): Promise<number> {
    return this.groupStore.count();
  }

  roleCount(): Promise<number> {
    return this.roleStore.count();
  }

  customRolesCount(): Promise<number> {
    return this.roleStore.filteredCount({ type: CUSTOM_ROOT_ROLE_TYPE });
  }

  customRolesCountInUse(): Promise<number> {
    return this.roleStore.filteredCountInUse({
      type: CUSTOM_ROOT_ROLE_TYPE,
    });
  }

  segmentCount(): Promise<number> {
    return this.segmentStore.count();
  }

  contextFieldCount(): Promise<number> {
    return this.contextFieldStore.count();
  }

  strategiesCount(): Promise<number> {
    return this.strategyStore.count();
  }

  environmentCount(): Promise<number> {
    return this.environmentStore.count();
  }

  countPreviousDayHourlyMetricsBuckets(): Promise<{
    enabledCount: number;
    variantCount: number;
  }> {
    return this.clientMetricsStore.countPreviousDayHourlyMetricsBuckets();
  }

  countApiTokensByType(): Promise<Map<string, number>> {
    return this.apiTokenStore.countByType();
  }

  getRegisteredUsers(): Promise<number> {
    return this.userStore.count();
  }

  countServiceAccounts(): Promise<number> {
    return this.userStore.countServiceAccounts();
  }

  async getCurrentTrafficData(): Promise<number> {
    const traffic =
      await this.trafficDataUsageStore.getTrafficDataUsageForPeriod(
        format(new Date(), 'yyyy-MM'),
      );

    const counts = traffic.map((item) => item.count);
    return counts.reduce((total, current) => total + current, 0);
  }

  async getLabeledAppCounts(): Promise<
    Partial<{ [key in TimeRange]: number }>
  > {
    const [t7d, t30d, allTime] = await Promise.all([
      this.clientInstanceStore.getDistinctApplicationsCount(7),
      this.clientInstanceStore.getDistinctApplicationsCount(30),
      this.clientInstanceStore.getDistinctApplicationsCount(),
    ]);
    this.appCount = {
      '7d': t7d,
      '30d': t30d,
      allTime,
    };
    return this.appCount;
  }

  getAppCountSnapshot(range: TimeRange): number | undefined {
    return this.appCount?.[range];
  }

  async getSignedStats(): Promise<InstanceStatsSigned> {
    const instanceStats = await this.getStats();
    const totalProjects = instanceStats.projects
      .map((p) => p.count)
      .reduce((a, b) => a + b, 0);

    const sum = sha256(
      `${instanceStats.instanceId}${instanceStats.users}${instanceStats.featureToggles}${totalProjects}${instanceStats.roles}${instanceStats.groups}${instanceStats.environments}${instanceStats.segments}`,
    );
    return { ...instanceStats, sum, projects: totalProjects };
  }
}
