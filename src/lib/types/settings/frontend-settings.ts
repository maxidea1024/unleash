import type { IGanpaConfig } from '../options';

export const frontendSettingsKey = 'unleash.frontend';

export type FrontendSettings = Pick<IGanpaConfig, 'frontendApiOrigins'>;
