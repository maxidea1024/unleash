import memoizee from 'memoizee';
import type { IAuditUser, IUnleashConfig } from '../../types';
import type { Logger } from '../../logger';
import type SettingService from '../../services/setting-service';
import { maintenanceSettingsKey } from '../../types/settings/maintenance-settings';
import type { MaintenanceSchema } from '../../openapi/spec/maintenance-schema';
import { minutesToMilliseconds } from 'date-fns';

export interface IMaintenanceStatus {
  isMaintenanceMode(): Promise<boolean>;
}

export default class MaintenanceService implements IMaintenanceStatus {
  private readonly config: IUnleashConfig;
  private readonly logger: Logger;
  private readonly settingService: SettingService;
  private readonly resolveMaintenance: () => Promise<boolean>;

  constructor(config: IUnleashConfig, settingService: SettingService) {
    this.logger = config.getLogger('maintenance-service.ts');

    this.config = config;
    this.settingService = settingService;
    this.resolveMaintenance = memoizee(async () => (await this.getMaintenanceSetting()).enabled, {
      promise: true,
      maxAge: minutesToMilliseconds(1),
    });
  }

  async isMaintenanceMode(): Promise<boolean> {
    try {
      return this.config.flagResolver.isEnabled('maintenanceMode') || (await this.resolveMaintenance());
    } catch (e) {
      this.logger.warn('Error checking maintenance mode', e);
      return false;
    }
  }

  async getMaintenanceSetting(): Promise<MaintenanceSchema> {
    return this.settingService.getWithDefault(maintenanceSettingsKey, {
      enabled: false,
    });
  }

  async toggleMaintenanceMode(setting: MaintenanceSchema, auditUser: IAuditUser): Promise<void> {
    //@ts-ignore
    this.resolveMaintenance.clear();
    return this.settingService.insert(maintenanceSettingsKey, setting, auditUser, false);
  }
}
