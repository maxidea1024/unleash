import NotFoundError from '../error/notfound-error';
import type { Logger } from '../logger';
import {
  FEATURE_TAGGED,
  FEATURE_UNTAGGED,
  FeatureTaggedEvent,
  TAG_CREATED,
} from '../types/events';
import type { IGanpaConfig } from '../types/options';
import type { IFeatureToggleStore, IGanpaStores } from '../types/stores';
import { tagSchema } from './tag-schema';
import type {
  IFeatureTag,
  IFeatureTagInsert,
  IFeatureTagStore,
} from '../types/stores/feature-tag-store';
import type { ITagStore } from '../types/stores/tag-store';
import type { ITag } from '../types/model';
import { BadDataError, FOREIGN_KEY_VIOLATION } from '../../lib/error';
import type EventService from '../features/events/event-service';
import type { IAuditUser } from '../types';

export default class FeatureTagService {
  private readonly tagStore: ITagStore;
  private readonly featureTagStore: IFeatureTagStore;
  private readonly featureToggleStore: IFeatureToggleStore;
  private readonly eventService: EventService;
  private readonly logger: Logger;

  constructor(
    {
      tagStore,
      featureTagStore,
      featureToggleStore,
    }: Pick<
      IGanpaStores,
      'tagStore' | 'featureTagStore' | 'featureToggleStore'
    >,
    { getLogger }: Pick<IGanpaConfig, 'getLogger'>,
    eventService: EventService,
  ) {
    this.logger = getLogger('feature-tag-service.ts');

    this.tagStore = tagStore;
    this.featureTagStore = featureTagStore;
    this.featureToggleStore = featureToggleStore;
    this.eventService = eventService;
  }

  async listTags(featureName: string): Promise<ITag[]> {
    return this.featureTagStore.getAllTagsForFeature(featureName);
  }

  async listFeatures(tagValue: string): Promise<string[]> {
    return this.featureTagStore.getAllFeaturesForTag(tagValue);
  }

  // TODO: add project Id
  async addTag(
    featureName: string,
    tag: ITag,
    auditUser: IAuditUser,
  ): Promise<ITag> {
    const featureToggle = await this.featureToggleStore.get(featureName);
    const validatedTag = await tagSchema.validateAsync(tag);
    await this.createTagIfNeeded(validatedTag, auditUser);
    await this.featureTagStore.tagFeature(
      featureName,
      validatedTag,
      auditUser.id,
    );

    await this.eventService.storeEvent(
      new FeatureTaggedEvent({
        featureName,
        project: featureToggle.project,
        data: validatedTag,
        auditUser,
      }),
    );
    return validatedTag;
  }

  async updateTags(
    featureNames: string[],
    addedTags: ITag[],
    removedTags: ITag[],
    auditUser: IAuditUser,
  ): Promise<void> {
    const featureToggles =
      await this.featureToggleStore.getAllByNames(featureNames);
    await Promise.all(
      addedTags.map((tag) => this.createTagIfNeeded(tag, auditUser)),
    );
    const createdFeatureTags: IFeatureTagInsert[] = featureNames.flatMap(
      (featureName) =>
        addedTags.map((addedTag) => ({
          featureName,
          tagType: addedTag.type,
          tagValue: addedTag.value,
          createdByUserId: auditUser.id,
        })),
    );

    await this.featureTagStore.tagFeatures(createdFeatureTags);

    const removedFeatureTags: Omit<IFeatureTag, 'createdByUserId'>[] =
      featureNames.flatMap((featureName) =>
        removedTags.map((addedTag) => ({
          featureName,
          tagType: addedTag.type,
          tagValue: addedTag.value,
        })),
      );

    await this.featureTagStore.untagFeatures(removedFeatureTags);

    const creationEvents = featureToggles.flatMap((featureToggle) =>
      addedTags.map((addedTag) => ({
        type: FEATURE_TAGGED,
        createdBy: auditUser.username,
        featureName: featureToggle.name,
        project: featureToggle.project,
        data: addedTag,
        createdByUserId: auditUser.id,
        ip: auditUser.ip,
      })),
    );

    const removalEvents = featureToggles.flatMap((featureToggle) =>
      removedTags.map((removedTag) => ({
        type: FEATURE_UNTAGGED,
        featureName: featureToggle.name,
        project: featureToggle.project,
        preData: removedTag,
        createdBy: auditUser.username,
        createdByUserId: auditUser.id,
        ip: auditUser.ip,
      })),
    );

    await this.eventService.storeEvents([...creationEvents, ...removalEvents]);
  }

  async createTagIfNeeded(tag: ITag, auditUser: IAuditUser): Promise<void> {
    try {
      await this.tagStore.getTag(tag.type, tag.value);
    } catch (error) {
      if (error instanceof NotFoundError) {
        try {
          await this.tagStore.createTag(tag);

          await this.eventService.storeEvent({
            type: TAG_CREATED,
            createdBy: auditUser.username,
            createdByUserId: auditUser.id,
            ip: auditUser.ip,
            data: tag,
          });
        } catch (error2) {
          if (error2.code === FOREIGN_KEY_VIOLATION) {
            throw new BadDataError(`Tag type '${tag.type}' does not exist`);
          }
        }
      }
    }
  }

  // TODO: add project Id
  async removeTag(
    featureName: string,
    tag: ITag,
    auditUser: IAuditUser,
  ): Promise<void> {
    const featureToggle = await this.featureToggleStore.get(featureName);
    const tags = await this.featureTagStore.getAllTagsForFeature(featureName);
    await this.featureTagStore.untagFeature(featureName, tag);
    await this.eventService.storeEvent({
      type: FEATURE_UNTAGGED,
      createdBy: auditUser.username,
      createdByUserId: auditUser.id,
      ip: auditUser.ip,
      featureName,
      project: featureToggle.project,
      preData: tag,
      tags,
    });
  }
}
