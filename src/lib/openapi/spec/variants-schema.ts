import { variantSchema } from './variant-schema';
import type { FromSchema } from 'json-schema-to-ts';
import { overrideSchema } from './override-schema';

export const variantsSchema = {
  $id: '#/components/schemas/variantsSchema',
  type: 'array',
  description: 'A list of variants',
  items: {
    $ref: '#/components/schemas/variantSchema',
  },
  components: {
    schemas: {
      variantSchema,
      overrideSchema,
    },
  },
} as const;

export type VariantsSchema = FromSchema<typeof variantsSchema>;
