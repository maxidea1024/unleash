import { FeedbackComponentWrapper } from './FeedbackComponent';
import {
  FeedbackContext,
  type IFeedbackData,
  type FeedbackMode,
} from './FeedbackContext';
import { useState } from 'react';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';

type FeedbackProviderProps = {
  children?: React.ReactNode;
};

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [feedbackData, setFeedbackData] = useState<IFeedbackData | undefined>();
  const { trackEvent } = usePlausibleTracker();

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode | undefined>();
  const openFeedback = (
    data: IFeedbackData,
    mode: FeedbackMode,
    variant: string = '',
  ) => {
    setFeedbackData(data);
    setShowFeedback(true);
    setFeedbackMode(mode);

    trackEvent('feedback', {
      props: {
        eventType: `feedback opened - ${data.category}`,
        category: data.category,
        variant: variant,
      },
    });
  };

  const closeFeedback = () => {
    trackEvent('feedback', {
      props: {
        eventType: `feedback closed - ${feedbackData?.category}`,
        category: feedbackData?.category || 'unknown',
      },
    });
    setFeedbackData(undefined);
    setShowFeedback(false);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbackData,
        openFeedback,
        closeFeedback,
        showFeedback,
        setShowFeedback,
        feedbackMode,
      }}
    >
      {children}
      <FeedbackComponentWrapper />
    </FeedbackContext.Provider>
  );
};
