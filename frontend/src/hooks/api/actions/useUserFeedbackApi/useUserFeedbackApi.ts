import type { ProvideFeedbackSchema } from '../../../../openapi';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';

const DEFAULT_GANPA_FEEDBACK_ENDPOINT = 'https://app.unleash-hosted.com/hosted/feedback';

export const useUserFeedbackApi = () => {
  const { uiConfig } = useUiConfig();

  const addFeedback = async (feedbackSchema: ProvideFeedbackSchema) => {
    await fetch(uiConfig.feedbackUriPath || DEFAULT_GANPA_FEEDBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackSchema),
    });
  };

  return {
    addFeedback,
  };
};
