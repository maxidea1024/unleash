import { Typography, useTheme } from '@mui/material';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import type { IReportTableRow } from 'component/project/Project/ProjectHealth/ReportTable/ReportTable';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

type ReportExpiredCellProps = {
  row: {
    original: IReportTableRow;
  };
};

export const ReportExpiredCell = ({ row }: ReportExpiredCellProps) => {
  const theme = useTheme();

  if (row.original.expiredAt) {
    return <DateCell value={row.original.expiredAt} />;
  }

  return (
    <TextCell>
      <Typography variant='body2' color={theme.palette.text.secondary}>
        N/A
      </Typography>
    </TextCell>
  );
};
