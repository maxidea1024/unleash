import { createContext } from 'react';
import type { IFeedbackCategory } from 'hooks/useSubmittedFeedback';

export type FeedbackMode = 'automatic' | 'manual';

export interface IFeedbackContext {
  feedbackData: IFeedbackData | undefined;
  openFeedback: (
    data: IFeedbackData,
    mode: FeedbackMode,
    variant?: string,
  ) => void;
  closeFeedback: () => void;
  showFeedback: boolean;
  setShowFeedback: (visible: boolean) => void;
  feedbackMode: FeedbackMode | undefined;
}

interface IFeedbackText {
  title: string;
  positiveLabel: string;
  areasForImprovementsLabel: string;
}

export interface IFeedbackData extends IFeedbackText {
  category: IFeedbackCategory;
}

export const FeedbackContext = createContext<IFeedbackContext | undefined>(
  undefined,
);
