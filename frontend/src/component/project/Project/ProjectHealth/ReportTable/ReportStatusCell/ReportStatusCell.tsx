import type { ReactElement, FC } from 'react';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import Check from '@mui/icons-material/Check';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import { styled } from '@mui/material';
import type { IReportTableRow } from 'component/project/Project/ProjectHealth/ReportTable/ReportTable';

const StyledTextPotentiallyStale = styled('span')(({ theme }) => ({
  display: 'flex',
  gap: '1ch',
  alignItems: 'center',
  color: theme.palette.warning.dark,
  '& svg': { color: theme.palette.warning.main },
}));

const StyledTextHealthy = styled('span')(({ theme }) => ({
  display: 'flex',
  gap: '1ch',
  alignItems: 'center',
  color: theme.palette.success.dark,
  '& svg': { color: theme.palette.success.main },
}));

interface IReportStatusCellProps {
  row: {
    original: IReportTableRow;
  };
}

export const ReportStatusCell: FC<IReportStatusCellProps> = ({
  row,
}): ReactElement => {
  if (row.original.status === 'potentially-stale') {
    return (
      <TextCell>
        <StyledTextPotentiallyStale>
          <ReportProblemOutlined />
          <span>Potentially stale</span>
        </StyledTextPotentiallyStale>
      </TextCell>
    );
  }

  return (
    <TextCell>
      <StyledTextHealthy>
        <Check />
        <span>Healthy</span>
      </StyledTextHealthy>
    </TextCell>
  );
};
