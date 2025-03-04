import type { FC } from 'react';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { getLocalizedDateString } from '../../../util';

type DateCellProps = {
  value?: Date | string | null;
  getValue?: () => Date | string | null | undefined;
};

// `getValue is for new @tanstack/react-table (v8), `value` is for legacy react-table (v7)
export const DateCell: FC<DateCellProps> = ({ value, getValue }) => {
  const input = value || getValue?.() || null;
  const { locationSettings } = useLocationSettings();
  const date = getLocalizedDateString(input, locationSettings.locale);

  return <TextCell lineClamp={1}>{date}</TextCell>;
};
