import type React from 'react';
import { type CSSProperties, useEffect, useState, useRef } from 'react';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

type AnimateOnMountProps = {
  mounted: boolean;
  enter: CSSProperties;
  start: CSSProperties;
  leave?: CSSProperties;
  onStart?: () => void;
  onEnd?: () => void;
  children?: React.ReactNode;
};

const AnimateOnMount = ({
  mounted,
  enter,
  start,
  leave,
  children,
  onStart,
  onEnd,
}: AnimateOnMountProps) => {
  const [show, setShow] = useState(mounted);
  const [styles, setStyles] = useState<CSSProperties>({});
  const mountedRef = useRef<null | boolean>(null);

  useEffect(() => {
    if (mountedRef.current !== mounted || mountedRef === null) {
      if (mounted) {
        setShow(true);
        onStart?.();
        setTimeout(() => {
          setStyles(enter);
        }, 50);
      } else {
        if (!leave) {
          setShow(false);
        }
        setStyles(leave || {});
      }
    }
  }, [mounted, enter, onStart, leave]);

  const onTransitionEnd = () => {
    if (!mounted) {
      setShow(false);
      onEnd?.();
    }
  };

  return (
    <ConditionallyRender
      condition={show}
      show={
        <div onTransitionEnd={onTransitionEnd} style={{ ...start, ...styles }}>
          {children}
        </div>
      }
    />
  );
};

export default AnimateOnMount;
