import type { IUnleashConfig } from '../options';

export const frontendSettingsKey = 'unleash.frontend';

export type FrontendSettings = Pick<IUnleashConfig, 'frontendApiOrigins'>;
