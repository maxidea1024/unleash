import { useEffect, useMemo, useState } from 'react';
import { useGroups } from 'hooks/api/getters/useGroups/useGroups';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { IGroup } from 'interfaces/group';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { Search } from 'component/common/Search/Search';
import { Grid, useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { TablePlaceholder } from 'component/common/Table';
import { GroupCard } from './GroupCard/GroupCard';
import { GroupEmpty } from './GroupEmpty/GroupEmpty';
import ResponsiveButton from 'component/common/ResponsiveButton/ResponsiveButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import Add from '@mui/icons-material/Add';
import { NAVIGATE_TO_CREATE_GROUP } from 'utils/testIds';
import { EditGroupUsers } from '../Group/EditGroupUsers/EditGroupUsers';
import { RemoveGroup } from '../RemoveGroup/RemoveGroup';

type PageQueryType = Partial<Record<'search', string>>;

const groupsSearch = (group: IGroup, searchValue: string) => {
  const search = searchValue.toLowerCase();
  const users = {
    names: group.users?.map((user) => user.name?.toLowerCase() || ''),
    usernames: group.users?.map((user) => user.username?.toLowerCase() || ''),
    emails: group.users?.map((user) => user.email?.toLowerCase() || ''),
  };
  return (
    group.name.toLowerCase().includes(search) ||
    group.description?.toLowerCase().includes(search) ||
    users.names?.some((name) => name.includes(search)) ||
    users.usernames?.some((username) => username.includes(search)) ||
    users.emails?.some((email) => email.includes(search))
  );
};

export const GroupsList = () => {
  const navigate = useNavigate();
  const [editUsersOpen, setEditUsersOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<IGroup | undefined>(undefined);
  const { groups = [], loading } = useGroups();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || '',
  );

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const tableState: PageQueryType = {};
    if (searchValue) {
      tableState.search = searchValue;
    }

    setSearchParams(tableState, {
      replace: true,
    });
  }, [searchValue, setSearchParams]);

  const data = useMemo(() => {
    const sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));
    return searchValue
      ? sortedGroups.filter((group) => groupsSearch(group, searchValue))
      : sortedGroups;
  }, [groups, searchValue]);

  const onEditUsers = (group: IGroup) => {
    setActiveGroup(group);
    setEditUsersOpen(true);
  };

  const onRemoveGroup = (group: IGroup) => {
    setActiveGroup(group);
    setRemoveOpen(true);
  };

  return (
    <PageContent
      isLoading={loading}
      header={
        <PageHeader
          title={`Groups (${data.length})`}
          actions={
            <>
              {!isSmallScreen && (
                <>
                  <Search
                    initialValue={searchValue}
                    onChange={setSearchValue}
                  />
                  <PageHeader.Divider />
                </>
              )}
              <ResponsiveButton
                onClick={() => navigate('/admin/groups/create-group')}
                maxWidth='700px'
                Icon={Add}
                permission={ADMIN}
                data-testid={NAVIGATE_TO_CREATE_GROUP}
              >
                New group
              </ResponsiveButton>
            </>
          }
        >
          {isSmallScreen && (
            <Search initialValue={searchValue} onChange={setSearchValue} />
          )}
        </PageHeader>
      }
    >
      <SearchHighlightProvider value={searchValue}>
        <Grid container spacing={2}>
          {data.map((group) => (
            <Grid key={group.id} item xs={12} md={6}>
              <GroupCard
                group={group}
                onEditUsers={onEditUsers}
                onRemoveGroup={onRemoveGroup}
              />
            </Grid>
          ))}
        </Grid>
      </SearchHighlightProvider>
      {!loading && data.length === 0 && (
        searchValue?.length > 0 ? (
          <TablePlaceholder>
            No groups found matching &ldquo;{searchValue}&rdquo;
          </TablePlaceholder>
        ) : (
          <GroupEmpty />
        )
      )}

      {activeGroup && (
        <EditGroupUsers
          open={editUsersOpen}
          setOpen={setEditUsersOpen}
          group={activeGroup}
        />
      )}

      {activeGroup && (
        <RemoveGroup
          open={removeOpen}
          setOpen={setRemoveOpen}
          group={activeGroup}
        />
      )}
    </PageContent>
  );
};
