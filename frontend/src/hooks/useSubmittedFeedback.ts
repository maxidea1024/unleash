import { createLocalStorage } from '../utils/createLocalStorage';

export type IFeedbackCategory =
  | 'search'
  | 'insights'
  | 'applicationOverview'
  | 'newProjectOverview'
  | 'signals';

export const useUserSubmittedFeedback = (category: IFeedbackCategory) => {
  const key = `ganpa-userSubmittedFeedback:${category}`;

  const { value: hasSubmittedFeedback, setValue: setHasSubmittedFeedback } =
    createLocalStorage<Boolean>(key, false);
  return {
    hasSubmittedFeedback,
    setHasSubmittedFeedback,
  };
};
