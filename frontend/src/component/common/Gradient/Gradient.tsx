import type React from 'react';

type GradientProps = {
  from: string;
  to: string;
  style?: object;
  className?: string;
  children?: React.ReactNode;
};

const Gradient = ({ children, from, to, style, ...rest }: GradientProps) => {
  return (
    <div
      style={{
        background: `linear-gradient(${from}, ${to})`,
        height: '100%',
        width: '100%',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Gradient;
