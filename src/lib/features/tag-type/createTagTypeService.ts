import type { Db } from '../../db/db';
import type { IGanpaConfig } from '../../types';
import TagTypeService from './tag-type-service';
import TagTypeStore from './tag-type-store';
import FakeTagTypeStore from './fake-tag-type-store';
import {
  createEventsService,
  createFakeEventsService,
} from '../events/createEventsService';

export const createTagTypeService =
  (config: IGanpaConfig) =>
    (db: Db): TagTypeService => {
      const { getLogger, eventBus } = config;
      const eventService = createEventsService(db, config);
      const tagTypeStore = new TagTypeStore(db, eventBus, getLogger);
      return new TagTypeService({ tagTypeStore }, config, eventService);
    };

export const createFakeTagTypeService = (
  config: IGanpaConfig,
): TagTypeService => {
  const eventService = createFakeEventsService(config);
  const tagTypeStore = new FakeTagTypeStore();

  return new TagTypeService({ tagTypeStore }, config, eventService);
};
