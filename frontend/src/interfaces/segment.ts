import type { IConstraint } from './strategy';

export interface ISegment {
  id: number;
  name: string;
  description: string;
  project?: string;
  createdAt: string;
  createdBy: string;
  constraints: IConstraint[];
}

export type ISegmentPayload = Pick<
  ISegment,
  'name' | 'description' | 'constraints'
>;
