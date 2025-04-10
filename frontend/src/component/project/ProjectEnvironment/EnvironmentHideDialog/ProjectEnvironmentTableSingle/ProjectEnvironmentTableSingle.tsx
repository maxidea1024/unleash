import { styled, TableBody, TableRow } from '@mui/material';
import type { IProjectEnvironment } from 'interfaces/environments';
import { useTable } from 'react-table';
import { SortableTableHeader, Table, TableCell } from 'component/common/Table';
import { EnvironmentIconCell } from 'component/environments/EnvironmentTable/EnvironmentIconCell/EnvironmentIconCell';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { useMemo } from 'react';

const StyledTable = styled(Table)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledToggleWarning = styled('p', {
  shouldForwardProp: (prop) => prop !== 'warning',
})<{ warning?: boolean }>(({ theme, warning }) => ({
  color: warning ? theme.palette.error.dark : theme.palette.text.primary,
  textAlign: 'center',
}));

type ProjectEnvironmentTableSingleProps = {
  environment: IProjectEnvironment;
  warnEnabledToggles?: boolean;
};

export const ProjectEnvironmentTableSingle = ({
  environment,
  warnEnabledToggles,
}: ProjectEnvironmentTableSingleProps) => {
  const COLUMNS = useMemo(
    () => [
      {
        id: 'Icon',
        width: '1%',
        Cell: ({
          row: { original },
        }: {
          row: { original: IProjectEnvironment };
        }) => <EnvironmentIconCell environment={original} />,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: TextCell,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: TextCell,
      },
      {
        Header: 'Toggles enabled',
        accessor: 'projectEnabledToggleCount',
        Cell: ({ value }: { value: number }) => (
          <TextCell>
            <StyledToggleWarning warning={value > 0}>
              {value === 1 ? '1 toggle' : `${value} toggles`}
            </StyledToggleWarning>
          </TextCell>
        ),
        align: 'center',
      },
    ],
    [warnEnabledToggles],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: COLUMNS as any,
      data: [environment],
      disableSortBy: true,
    });

  return (
    <StyledTable {...getTableProps()} rowHeight='compact'>
      <SortableTableHeader headerGroups={headerGroups as any} />
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
    </StyledTable>
  );
};
