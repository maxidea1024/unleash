import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { styled, useMediaQuery, useTheme } from '@mui/material';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Search } from 'component/common/Search/Search';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { TablePlaceholder, VirtualizedTable } from 'component/common/Table';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { TimeAgoCell } from 'component/common/Table/cells/TimeAgoCell/TimeAgoCell';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import { UPDATE_PROJECT } from 'component/providers/AccessProvider/permissions';
import { useSearch } from 'hooks/useSearch';
import type { IGroup, IGroupUser } from 'interfaces/group';
import { type FC, useState } from 'react';
import {
  type SortingRule,
  useFlexLayout,
  useSortBy,
  useTable,
} from 'react-table';
import { sortTypes } from 'utils/sortTypes';
import { useConditionallyHiddenColumns } from 'hooks/useConditionallyHiddenColumns';

const StyledPageContent = styled(PageContent)(({ theme }) => ({
  height: '100vh',
  overflow: 'auto',
  padding: theme.spacing(7.5, 6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2),
  },
  '& .header': {
    padding: theme.spacing(0, 0, 2, 0),
  },
  '& .body': {
    padding: theme.spacing(3, 0, 0, 0),
  },
  borderRadius: `${theme.spacing(1.5, 0, 0, 1.5)} !important`,
}));

const StyledTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& > span': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.fontSizes.bodySize,
  },
}));

const defaultSort: SortingRule<string> = { id: 'joinedAt', desc: true };

const columns = [
  {
    Header: 'Avatar',
    accessor: 'imageUrl',
    Cell: ({ row: { original: user } }: any) => (
      <TextCell>
        <UserAvatar user={user} />
      </TextCell>
    ),
    maxWidth: 85,
    disableSortBy: true,
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: (row: IGroupUser) => row.name || '',
    Cell: ({ value, row: { original: row } }: any) => (
      <HighlightCell value={value} subtitle={row.email || row.username} />
    ),
    minWidth: 100,
    searchable: true,
  },
  {
    id: 'joined',
    Header: 'Joined',
    accessor: 'joinedAt',
    Cell: DateCell,
    maxWidth: 150,
  },
  {
    id: 'lastLogin',
    Header: 'Last login',
    accessor: (row: IGroupUser) => row.seenAt || '',
    Cell: ({ row: { original: user } }: any) => (
      <TimeAgoCell
        value={user.seenAt}
        emptyText='Never'
        title={(date) => `Last login: ${date}`}
      />
    ),
    maxWidth: 150,
  },
  // Always hidden -- for search
  {
    accessor: (row: IGroupUser) => row.username || '',
    Header: 'Username',
    searchable: true,
  },
  // Always hidden -- for search
  {
    accessor: (row: IGroupUser) => row.email || '',
    Header: 'Email',
    searchable: true,
  },
];

const hiddenColumnsSmall = ['imageUrl', 'name', 'joined', 'lastLogin'];

type ProjectGroupViewProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group: IGroup;
  projectId: string;
  subtitle: React.ReactNode;
  onEdit: () => void;
  onRemove: () => void;
};

export const ProjectGroupView = ({
  open,
  setOpen,
  group,
  projectId,
  subtitle,
  onEdit,
  onRemove,
}: ProjectGroupViewProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [initialState] = useState(() => ({
    sortBy: [
      {
        id: defaultSort.id,
        desc: defaultSort.desc,
      },
    ],
    hiddenColumns: ['Username', 'Email'],
  }));
  const [searchValue, setSearchValue] = useState('');

  const { data, getSearchText, getSearchContext } = useSearch(
    columns,
    searchValue,
    group?.users ?? [],
  );

  const { headerGroups, rows, prepareRow, setHiddenColumns } = useTable(
    {
      columns: columns as any[],
      data,
      initialState,
      sortTypes,
      autoResetHiddenColumns: false,
      autoResetSortBy: false,
      disableSortRemove: true,
      disableMultiSort: true,
    },
    useSortBy,
    useFlexLayout,
  );

  useConditionallyHiddenColumns(
    [
      {
        condition: isSmallScreen,
        columns: hiddenColumnsSmall,
      },
    ],
    setHiddenColumns,
    columns,
  );

  return (
    <SidebarModal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      label={group?.name || 'Group'}
    >
      <StyledPageContent
        header={
          <PageHeader
            secondary
            titleElement={
              <StyledTitle>
                {group?.name} (
                {rows.length < data.length
                  ? `${rows.length} of ${data.length}`
                  : data.length}
                )<span>{subtitle}</span>
              </StyledTitle>
            }
            actions={
              <>
                {!isSmallScreen && (
                  <>
                    <Search
                      initialValue={searchValue}
                      onChange={setSearchValue}
                      hasFilters
                      getSearchContext={getSearchContext}
                    />
                    <PageHeader.Divider />
                  </>
                )}
                <PermissionIconButton
                  permission={UPDATE_PROJECT}
                  projectId={projectId}
                  tooltipProps={{
                    title: 'Edit group access',
                  }}
                  onClick={onEdit}
                >
                  <Edit />
                </PermissionIconButton>
                <PermissionIconButton
                  permission={UPDATE_PROJECT}
                  projectId={projectId}
                  tooltipProps={{
                    title: 'Remove group access',
                  }}
                  onClick={onRemove}
                >
                  <Delete />
                </PermissionIconButton>
              </>
            }
          >
            {isSmallScreen && (
              <Search
                initialValue={searchValue}
                onChange={setSearchValue}
                hasFilters
                getSearchContext={getSearchContext}
              />
            )}
          </PageHeader>
        }
      >
        <SearchHighlightProvider value={getSearchText(searchValue)}>
          <VirtualizedTable
            rows={rows}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
          />
        </SearchHighlightProvider>
        {rows.length === 0 &&
          (searchValue?.length > 0 ? (
            <TablePlaceholder>
              No users found matching &ldquo;{searchValue}&rdquo; in this group.
            </TablePlaceholder>
          ) : (
            <TablePlaceholder>
              This group is empty. Get started by adding a user to the group.
            </TablePlaceholder>
          ))}
      </StyledPageContent>
    </SidebarModal>
  );
};
