import type { EventSchema } from 'openapi';

export interface IIntegrationEvent {
  id: string;
  integrationId: number;
  createdAt: string;
  state: 'success' | 'failed' | 'successWithErrors';
  stateDetails: string;
  event: EventSchema;
  details: Record<string, unknown>;
}

export interface IIntegrationEvents {
  integrationEvents: IIntegrationEvent[];
}
