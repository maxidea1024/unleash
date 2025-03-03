import type { FromSchema } from 'json-schema-to-ts';
import { ALL } from '../../types/models/api-token';
import { sdkContextSchema } from './sdk-context-schema';

export const playgroundRequestSchema = {
  $id: '#/components/schemas/playgroundRequestSchema',
  description: 'Data for the playground API to evaluate toggles',
  type: 'object',
  required: ['environment', 'context'],
  properties: {
    environment: {
      type: 'string',
      example: 'development',
      description: 'The environment to evaluate toggles in.',
    },
    projects: {
      description: 'A list of projects to check for toggles in.',
      oneOf: [
        {
          type: 'array',
          items: { type: 'string' },
          example: ['my-project'],
          description: 'A list of projects to check for toggles in.',
        },
        {
          type: 'string',
          enum: [ALL],
          description: 'Check toggles in all projects.',
        },
      ],
    },
    context: {
      $ref: sdkContextSchema.$id,
    },
  },
  components: {
    schemas: {
      sdkContextSchema,
    },
  },
} as const;

export type PlaygroundRequestSchema = FromSchema<
  typeof playgroundRequestSchema
>;
