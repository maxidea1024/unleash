import type { IConstraint } from 'interfaces/strategy';

import { ConstraintAccordionEdit } from './ConstraintAccordionEdit/ConstraintAccordionEdit';
import { ConstraintAccordionView } from './ConstraintAccordionView/ConstraintAccordionView';

export type ConstraintAccordionProps = {
  compact: boolean;
  editing: boolean;
  constraint: IConstraint;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAutoSave?: (constraint: IConstraint) => void;
  onSave?: (constraint: IConstraint) => void;
};

export const NewConstraintAccordion = ({
  constraint,
  compact = false,
  editing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
  onAutoSave,
}: ConstraintAccordionProps) => {
  if (!constraint) return null;

  return Boolean(editing && onSave) ? (
    <ConstraintAccordionEdit
      constraint={constraint}
      onCancel={onCancel}
      onSave={onSave!}
      onDelete={onDelete}
      onAutoSave={onAutoSave!}
      compact={compact}
    />
  ) : (
    <ConstraintAccordionView
      constraint={constraint}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};
