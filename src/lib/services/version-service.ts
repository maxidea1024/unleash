import fetch from 'make-fetch-happen';
import type {
  IContextFieldStore,
  IEnvironmentStore,
  IEventStore,
  IFeatureStrategiesStore,
  IFeatureToggleStore,
  IGroupStore,
  IProjectStore,
  IRoleStore,
  ISegmentStore,
  IUnleashStores,
  IUserStore,
} from '../types/stores';
import type { IUnleashConfig } from '../types/options';
import version from '../util/version';
import type { Logger } from '../logger';
import type { ISettingStore } from '../types/stores/settings-store';
import type { IStrategyStore } from '../types';
import { FEATURES_EXPORTED, FEATURES_IMPORTED } from '../types';
import { CUSTOM_ROOT_ROLE_TYPE } from '../util';
import type { GetActiveUsers } from '../features/instance-stats/getActiveUsers';
import type { GetProductionChanges } from '../features/instance-stats/getProductionChanges';

export interface IVersionInfo {
  oss: string;
  enterprise?: string;
}

export interface IVersionHolder {
  current: IVersionInfo;
  latest: Partial<IVersionInfo>;
  isLatest: boolean;
  instanceId: string;
}

export interface IVersionResponse {
  versions: IVersionInfo;
  latest: boolean;
}

export interface IFeatureUsageInfo {
  instanceId: string;
  versionOSS: string;
  versionEnterprise?: string;
  users: number;
  featureToggles: number;
  projects: number;
  contextFields: number;
  roles: number;
  customRootRoles: number;
  featureExports: number;
  featureImports: number;
  groups: number;
  environments: number;
  segments: number;
  strategies: number;
  SAMLenabled: boolean;
  OIDCenabled: boolean;
  customStrategies: number;
  customStrategiesInUse: number;
  activeUsers30: number;
  activeUsers60: number;
  activeUsers90: number;
  productionChanges30: number;
  productionChanges60: number;
  productionChanges90: number;
  postgresVersion: string;
}

export default class VersionService {
  private readonly logger: Logger;
  private readonly settingStore: ISettingStore;
  private readonly strategyStore: IStrategyStore;
  private readonly userStore: IUserStore;
  private readonly featureToggleStore: IFeatureToggleStore;
  private readonly projectStore: IProjectStore;
  private readonly environmentStore: IEnvironmentStore;
  private readonly contextFieldStore: IContextFieldStore;
  private readonly groupStore: IGroupStore;
  private readonly roleStore: IRoleStore;
  private readonly segmentStore: ISegmentStore;
  private readonly eventStore: IEventStore;
  private readonly featureStrategiesStore: IFeatureStrategiesStore;
  private readonly getActiveUsers: GetActiveUsers;
  private readonly getProductionChanges: GetProductionChanges;
  private readonly current: IVersionInfo;
  private latest?: IVersionInfo;
  private readonly enabled: boolean;
  private readonly telemetryEnabled: boolean;
  private readonly versionCheckUrl?: string;
  private instanceId?: string;
  private isLatest: boolean;
  private readonly timer: NodeJS.Timeout;

  constructor(
    {
      settingStore,
      strategyStore,
      userStore,
      featureToggleStore,
      projectStore,
      environmentStore,
      contextFieldStore,
      groupStore,
      roleStore,
      segmentStore,
      eventStore,
      featureStrategiesStore,
    }: Pick<
      IUnleashStores,
      | 'settingStore'
      | 'strategyStore'
      | 'userStore'
      | 'featureToggleStore'
      | 'projectStore'
      | 'environmentStore'
      | 'contextFieldStore'
      | 'groupStore'
      | 'roleStore'
      | 'segmentStore'
      | 'eventStore'
      | 'featureStrategiesStore'
    >,
    {
      getLogger,
      versionCheck,
      enterpriseVersion,
      telemetry,
    }: Pick<
      IUnleashConfig,
      'getLogger' | 'versionCheck' | 'enterpriseVersion' | 'telemetry'
    >,
    getActiveUsers: GetActiveUsers,
    getProductionChanges: GetProductionChanges,
  ) {
    this.logger = getLogger('version-service.ts');

    this.settingStore = settingStore;
    this.strategyStore = strategyStore;
    this.userStore = userStore;
    this.featureToggleStore = featureToggleStore;
    this.projectStore = projectStore;
    this.environmentStore = environmentStore;
    this.contextFieldStore = contextFieldStore;
    this.groupStore = groupStore;
    this.roleStore = roleStore;
    this.segmentStore = segmentStore;
    this.eventStore = eventStore;
    this.getActiveUsers = getActiveUsers;
    this.getProductionChanges = getProductionChanges;
    this.featureStrategiesStore = featureStrategiesStore;
    this.current = {
      oss: version,
      enterprise: enterpriseVersion || '',
    };
    this.enabled = versionCheck.enable || false;
    this.telemetryEnabled = telemetry;
    this.versionCheckUrl = versionCheck.url;
    this.isLatest = true;
  }

  private async readInstanceId(): Promise<string | undefined> {
    try {
      const { id } = (await this.settingStore.get<{ id: string }>(
        'instanceInfo',
      )) ?? { id: undefined };
      return id;
    } catch (e) {
      this.logger.warn('Could not find instanceInfo', e);
    }
  }

  async getInstanceId() {
    if (!this.instanceId) {
      this.instanceId = await this.readInstanceId();
    }

    return this.instanceId;
  }

  async checkLatestVersion(): Promise<void> {
    const instanceId = await this.getInstanceId();
    this.logger.debug(
      `Checking for newest version for instanceId=${instanceId}`,
    );
    if (!this.enabled) {
      return;
    }

    try {
      const versionPayload: any = {
        versions: this.current,
        instanceId: instanceId,
      };

      if (this.telemetryEnabled) {
        versionPayload.featureInfo = await this.getFeatureUsageInfo();
      }

      if (this.versionCheckUrl) {
        const res = await fetch(this.versionCheckUrl, {
          method: 'POST',
          body: JSON.stringify(versionPayload),
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = (await res.json()) as IVersionResponse;
          this.latest = {
            oss: data.versions.oss,
            enterprise: data.versions.enterprise,
          };
          this.isLatest = data.latest;
        } else {
          this.logger.info(
            `Could not check newest version. Status: ${res.status}`,
          );
        }
      } else {
        this.logger.info('Had no URL to check newest version');
      }
    } catch (e) {
      this.logger.info('Could not check newest version', e);
    }
  }

  async getFeatureUsageInfo(): Promise<IFeatureUsageInfo> {
    const [
      featureToggles,
      users,
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
      featureExports,
      featureImports,
      userActive,
      productionChanges,
      postgresVersion,
    ] = await Promise.all([
      this.featureToggleStore.count({
        archived: false,
      }),
      this.userStore.count(),
      this.projectStore.count(),
      this.contextFieldStore.count(),
      this.groupStore.count(),
      this.roleStore.count(),
      this.roleStore.filteredCount({
        type: CUSTOM_ROOT_ROLE_TYPE,
      }),
      this.roleStore.filteredCountInUse({ type: CUSTOM_ROOT_ROLE_TYPE }),
      this.environmentStore.count(),
      this.segmentStore.count(),
      this.strategyStore.count(),
      this.hasSAML(),
      this.hasOIDC(),
      this.eventStore.deprecatedFilteredCount({
        type: FEATURES_EXPORTED,
      }),
      this.eventStore.deprecatedFilteredCount({
        type: FEATURES_IMPORTED,
      }),
      this.userStats(),
      this.productionChanges(),
      this.postgresVersion(),
    ]);
    const versionInfo = await this.getVersionInfo();
    const customStrategies = await this.strategyStore.getEditableStrategies();
    const customStrategiesInUse =
      await this.featureStrategiesStore.getCustomStrategiesInUseCount();
    const featureInfo = {
      featureToggles,
      users,
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
      featureExports,
      featureImports,
      customStrategies: customStrategies.length,
      customStrategiesInUse: customStrategiesInUse,
      instanceId: versionInfo.instanceId,
      versionOSS: versionInfo.current.oss,
      versionEnterprise: versionInfo.current.enterprise,
      activeUsers30: userActive.last30,
      activeUsers60: userActive.last60,
      activeUsers90: userActive.last90,
      productionChanges30: productionChanges.last30,
      productionChanges60: productionChanges.last60,
      productionChanges90: productionChanges.last90,
      postgresVersion,
    };
    return featureInfo;
  }

  async userStats(): Promise<{
    last30: number;
    last60: number;
    last90: number;
  }> {
    const { last30, last60, last90 } = await this.getActiveUsers();
    return { last30, last60, last90 };
  }

  async productionChanges(): Promise<{
    last30: number;
    last60: number;
    last90: number;
  }> {
    return this.getProductionChanges();
  }

  async postgresVersion(): Promise<string> {
    return this.settingStore.postgresVersion();
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

  async getVersionInfo(): Promise<IVersionHolder> {
    const instanceId = await this.getInstanceId();
    return {
      current: this.current,
      latest: this.latest || {},
      isLatest: this.isLatest,
      instanceId: instanceId || 'unresolved-instance-id',
    };
  }
}
