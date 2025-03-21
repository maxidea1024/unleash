import type { Request, Response } from 'express';
import Controller from '../../routes/controller';
import {
  CREATE_TAG_TYPE,
  DELETE_TAG_TYPE,
  NONE,
  UPDATE_TAG_TYPE,
} from '../../types/permissions';
import type { IGanpaConfig } from '../../types/options';
import type { IGanpaServices } from '../../types/services';
import type TagTypeService from './tag-type-service';
import type { Logger } from '../../logger';
import type { IAuthRequest } from '../../routes/ganpa-types';
import { createRequestSchema } from '../../openapi/util/create-request-schema';
import {
  createResponseSchema,
  resourceCreatedResponseSchema,
} from '../../openapi/util/create-response-schema';
import type { TagTypesSchema } from '../../openapi/spec/tag-types-schema';
import {
  validateTagTypeSchema,
  type ValidateTagTypeSchema,
} from '../../openapi/spec/validate-tag-type-schema';
import type { TagTypeSchema } from '../../openapi/spec/tag-type-schema';
import type { UpdateTagTypeSchema } from '../../openapi/spec/update-tag-type-schema';
import type { OpenApiService } from '../../services/openapi-service';
import {
  emptyResponse,
  getStandardResponses,
} from '../../openapi/util/standard-responses';
import type { WithTransactional } from '../../db/transaction';

const version = 1;

export default class TagTypeController extends Controller {
  private readonly logger: Logger;
  private readonly tagTypeService: WithTransactional<TagTypeService>;
  private readonly openApiService: OpenApiService;

  constructor(
    config: IGanpaConfig,
    {
      transactionalTagTypeService,
      openApiService,
    }: Pick<IGanpaServices, 'transactionalTagTypeService' | 'openApiService'>,
  ) {
    super(config);

    this.logger = config.getLogger('tag-type.ts');

    this.tagTypeService = transactionalTagTypeService;
    this.openApiService = openApiService;

    this.route({
      method: 'get',
      path: '',
      handler: this.getTagTypes,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'getTagTypes',
          summary: 'Get all tag types',
          description: 'Get a list of all available tag types.',
          responses: {
            200: createResponseSchema('tagTypesSchema'),
            ...getStandardResponses(401, 403),
          },
        }),
      ],
    });

    this.route({
      method: 'post',
      path: '',
      handler: this.createTagType,
      permission: CREATE_TAG_TYPE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'createTagType',
          summary: 'Create a tag type',
          description: 'Create a new tag type.',
          responses: {
            201: resourceCreatedResponseSchema('tagTypeSchema'),
            ...getStandardResponses(400, 401, 403, 409, 415),
          },
          requestBody: createRequestSchema('tagTypeSchema'),
        }),
      ],
    });

    this.route({
      method: 'post',
      path: '/validate',
      handler: this.validateTagType,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'validateTagType',
          summary: 'Validate a tag type',
          description:
            'Validates whether if the body of the request is a valid tag and whether the a tag type with that name already exists or not. If a tag type with the same name exists, this operation will return a 409 status code.',
          responses: {
            200: createResponseSchema('validateTagTypeSchema'),
            ...getStandardResponses(400, 401, 403, 409, 415),
          },
          requestBody: createRequestSchema('tagTypeSchema'),
        }),
      ],
    });

    this.route({
      method: 'get',
      path: '/:name',
      handler: this.getTagType,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'getTagType',
          summary: 'Get a tag type',
          description: 'Get a tag type by name.',
          responses: {
            200: createResponseSchema('tagTypeSchema'),
            ...getStandardResponses(401, 403),
          },
        }),
      ],
    });

    this.route({
      method: 'put',
      path: '/:name',
      handler: this.updateTagType,
      permission: UPDATE_TAG_TYPE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'updateTagType',
          summary: 'Update a tag type',
          description: 'Update the configuration for the specified tag type.',
          responses: {
            200: emptyResponse,
            ...getStandardResponses(400, 401, 403, 415),
          },
          requestBody: createRequestSchema('updateTagTypeSchema'),
        }),
      ],
    });

    this.route({
      method: 'delete',
      path: '/:name',
      handler: this.deleteTagType,
      acceptAnyContentType: true,
      permission: DELETE_TAG_TYPE,
      middleware: [
        openApiService.validPath({
          tags: ['Tags'],
          operationId: 'deleteTagType',
          summary: 'Delete a tag type',
          description:
            'Deletes a tag type. If any features have tags of this type, those tags will be deleted.',
          responses: {
            200: emptyResponse,
            ...getStandardResponses(401, 403),
          },
        }),
      ],
    });
  }

  async getTagTypes(_: Request, res: Response<TagTypesSchema>): Promise<void> {
    const tagTypes = await this.tagTypeService.getAll();
    res.json({ version, tagTypes });
  }

  async validateTagType(
    req: Request<unknown, unknown, TagTypeSchema>,
    res: Response<ValidateTagTypeSchema>,
  ): Promise<void> {
    await this.tagTypeService.validate(req.body);

    this.openApiService.respondWithValidation(
      200,
      res,
      validateTagTypeSchema.$id,
      {
        valid: true,
        tagType: req.body,
      },
    );
  }

  async createTagType(
    req: IAuthRequest<unknown, unknown, TagTypeSchema>,
    res: Response,
  ): Promise<void> {
    const tagType = await this.tagTypeService.transactional((service) =>
      service.createTagType(req.body, req.audit),
    );
    res
      .status(201)
      .header('location', `tag-types/${tagType.name}`)
      .json(tagType);
  }

  async updateTagType(
    req: IAuthRequest<{ name: string }, unknown, UpdateTagTypeSchema>,
    res: Response,
  ): Promise<void> {
    const { description, icon } = req.body;
    const { name } = req.params;

    await this.tagTypeService.transactional((service) =>
      service.updateTagType({ name, description, icon }, req.audit),
    );
    res.status(200).end();
  }

  async getTagType(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    const tagType = await this.tagTypeService.getTagType(name);
    res.json({ version, tagType });
  }

  async deleteTagType(req: IAuthRequest, res: Response): Promise<void> {
    const { name } = req.params;

    await this.tagTypeService.transactional((service) =>
      service.deleteTagType(name, req.audit),
    );
    res.status(200).end();
  }
}
