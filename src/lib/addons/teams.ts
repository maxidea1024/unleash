import Addon from './addon';

import teamsDefinition from './teams-definition';
import { type IAddonConfig, serializeDates } from '../types';
import {
  type FeatureEventFormatter,
  FeatureEventFormatterMd,
} from './feature-event-formatter-md';
import type { IEvent } from '../types/events';
import type { IntegrationEventState } from '../features/integration-events/integration-events-store';

interface ITeamsParameters {
  url: string;
  customHeaders?: string;
}

export default class TeamsAddon extends Addon {
  private readonly msgFormatter: FeatureEventFormatter;

  constructor(args: IAddonConfig) {
    super(teamsDefinition, args);

    this.msgFormatter = new FeatureEventFormatterMd({
      unleashUrl: args.unleashUrl,
    });
  }

  async handleEvent(
    event: IEvent,
    parameters: ITeamsParameters,
    integrationId: number,
  ): Promise<void> {
    let state: IntegrationEventState = 'success';
    const stateDetails: string[] = [];

    const { url, customHeaders } = parameters;
    const { createdBy } = event;
    const { text, url: featureLink } = this.msgFormatter.format(event);

    const body = {
      themeColor: '0076D7',
      summary: 'Message',
      sections: [
        {
          activityTitle: text,
          activitySubtitle: 'Unleash notification update',
          facts: [
            {
              name: 'User',
              value: createdBy,
            },
            {
              name: 'Action',
              value: event.type,
            },
          ],
        },
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Go to feature',
          targets: [
            {
              os: 'default',
              uri: featureLink,
            },
          ],
        },
      ],
    };

    let extraHeaders = {};
    if (typeof customHeaders === 'string' && customHeaders.length > 1) {
      try {
        extraHeaders = JSON.parse(customHeaders);
      } catch (e) {
        state = 'successWithErrors';
        const badHeadersMessage =
          'Could not parse the JSON in the customHeaders parameter.';
        stateDetails.push(badHeadersMessage);
        this.logger.warn(badHeadersMessage);
      }
    }

    const requestOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...extraHeaders },
      body: JSON.stringify(body),
    };
    const res = await this.fetchRetry(url, requestOpts);

    this.logger.info(`Handled event "${event.type}".`);

    if (res.ok) {
      const successMessage = `Teams webhook request was successful with status code: ${res.status}.`;
      stateDetails.push(successMessage);
      this.logger.info(successMessage);
    } else {
      state = 'failed';
      const failedMessage = `Teams webhook request failed with status code: ${res.status}.`;
      stateDetails.push(failedMessage);
      this.logger.warn(failedMessage);
    }

    this.registerEvent({
      integrationId,
      state,
      stateDetails: stateDetails.join('\n'),
      event: serializeDates(event),
      details: {
        url,
        body,
      },
    });
  }
}
