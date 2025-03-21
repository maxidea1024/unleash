import {
  Table,
  SortableTableHeader,
  TableBody,
  TableCell,
  TableRow,
  TablePlaceholder,
} from 'component/common/Table';
import { PageContent } from 'component/common/PageContent/PageContent';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { useMemo } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { sortTypes } from 'utils/sortTypes';
import { Box, IconButton, styled, Typography } from '@mui/material';
import FileDownload from '@mui/icons-material/FileDownload';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2.5),
  fontSize: theme.fontSizes.mainHeader,
}));

const columns = [
  {
    Header: 'Amount',
    accessor: 'amountFormatted',
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableGlobalFilter: true,
  },
  {
    Header: 'Created date',
    accessor: 'created',
    Cell: DateCell,
    disableGlobalFilter: true,
  },
  {
    Header: 'Due date',
    accessor: 'dueDate',
    Cell: DateCell,
    disableGlobalFilter: true,
  },
  {
    Header: 'Download',
    accessor: 'invoicePDF',
    align: 'center',
    Cell: ({ value }: { value: string }) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} data-loading>
        <IconButton href={value}>
          <FileDownload />
        </IconButton>
      </Box>
    ),
    width: 100,
    disableGlobalFilter: true,
    disableSortBy: true,
  },
];

type BillingHistoryProps = {
  data: Record<string, any>[];
  isLoading?: boolean;
};

export const BillingHistory = ({
  data,
  isLoading = false,
}: BillingHistoryProps) => {
  const initialState = useMemo(
    () => ({
      sortBy: [{ id: 'created', desc: true }],
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState,
        sortTypes,
        autoResetGlobalFilter: false,
        disableSortRemove: true,
        defaultColumn: {
          Cell: TextCell,
        },
      },
      useGlobalFilter,
      useSortBy,
    );

  return (
    <PageContent isLoading={isLoading} disablePadding>
      <StyledTitle>Payment history</StyledTitle>
      <Table {...getTableProps()}>
        <SortableTableHeader headerGroups={headerGroups} />
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <TableRow hover key={key} {...rowProps}>
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps();

                  return (
                    <TableCell key={key} {...cellProps}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {rows.length === 0 && (
        <TablePlaceholder>No invoices to show.</TablePlaceholder>
      )}
    </PageContent>
  );
};
