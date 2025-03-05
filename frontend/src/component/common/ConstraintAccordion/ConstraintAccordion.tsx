import type { IConstraint } from 'interfaces/strategy';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { ConstraintAccordionEdit } from './ConstraintAccordionEdit/ConstraintAccordionEdit';
import { ConstraintAccordionView } from './ConstraintAccordionView/ConstraintAccordionView';

type ConstraintAccordionProps = {
  compact: boolean;
  editing: boolean;
  constraint: IConstraint;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (constraint: IConstraint) => void;
};

export const ConstraintAccordion = ({
  constraint,
  compact = false,
  editing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
}: ConstraintAccordionProps) => {
  if (!constraint) {
    return null;
  }

  return (
    <ConditionallyRender
      condition={Boolean(editing && onSave)}
      show={
        <ConstraintAccordionEdit
          constraint={constraint}
          onCancel={onCancel}
          onSave={onSave!}
          onDelete={onDelete}
          compact={compact}
        />
      }
      elseShow={
        <ConstraintAccordionView
          constraint={constraint}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      }
    />
  );
};
