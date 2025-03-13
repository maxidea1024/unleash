import { createRef, useLayoutEffect } from 'react';

/**
 * When there is a selector [data-loading=true]
 * A hook that adds or removes the skeleton class to indicate loading status
 * (Adds skeleton class when loading, removes it 10ms after loading completes)
 */
const useLoading = <T extends HTMLElement = HTMLDivElement>(
  loading: boolean,
  selector = '[data-loading=true]',
) => {
  const ref = createRef<T>();

  useLayoutEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(selector);

      elements.forEach((element) => {
        if (loading) {
          element.classList.add('skeleton');
        } else {
          setTimeout(() => element.classList.remove('skeleton'), 10);
        }
      });
    }
  }, [loading, selector, ref]);

  return ref;
};

export default useLoading;
