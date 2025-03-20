import type { Request } from 'express';
import type EventEmitter from 'events';
import type * as https from 'https';
import type * as http from 'http';
import type User from './user';
import type { IAuditUser, IUser } from './user';
import type { IGanpaConfig } from './options';
import type { IUnleashStores } from './stores';
import type { IGanpaServices } from './services';

export interface AuthedRequest extends Request {
  user: User;
}

export interface IGanpa {
  app: any;
  config: IGanpaConfig;
  eventBus: EventEmitter;
  stores: IUnleashStores;
  server?: http.Server | https.Server;
  services: IGanpaServices;
  stop: () => Promise<void>;
  version: string;
}

export const SYSTEM_USER: Omit<IUser, 'email'> = {
  id: -1337,
  imageUrl: '',
  isAPI: false,
  name: 'Ganpa System',
  permissions: [],
  username: 'ganpa_system_user',
};

export const ADMIN_TOKEN_USER: Omit<IUser, 'email'> = {
  id: -42,
  imageUrl: '',
  isAPI: true,
  name: 'Ganpa Admin Token',
  permissions: [],
  username: 'ganpa_admin_token',
};

export const SYSTEM_USER_AUDIT: IAuditUser = {
  id: SYSTEM_USER.id,
  username: SYSTEM_USER.username!,
  ip: '',
};

export const TEST_AUDIT_USER: IAuditUser = {
  id: -9999,
  username: 'test@example.com',
  ip: '999.999.999.999',
};

export const SYSTEM_USER_ID: number = SYSTEM_USER.id;
