import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';

type VariantsTooltipProps = {
  variants: string[];
};

export const VariantsTooltip = ({ variants }: VariantsTooltipProps) => {
  if (variants.length === 1 && variants[0].length < 20) {
    return <span>{variants[0]}</span>;
  }

  return (
    <TooltipLink
      tooltip={
        <>
          {variants.map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </>
      }
    >
      {variants.length === 1 ? '1 variant' : `${variants.length} variants`}
    </TooltipLink>
  );
};
