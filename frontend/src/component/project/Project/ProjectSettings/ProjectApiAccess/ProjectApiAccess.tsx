import { useContext } from 'react';
import { PageContent } from 'component/common/PageContent/PageContent';
import { Alert } from '@mui/material';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import AccessContext from 'contexts/AccessContext';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { usePageTitle } from 'hooks/usePageTitle';
import { CreateProjectApiToken } from 'component/project/Project/ProjectSettings/ProjectApiAccess/CreateProjectApiToken';
import { Routes, Route } from 'react-router-dom';
import { ApiTokenTable } from 'component/common/ApiTokenTable/ApiTokenTable';
import { useProjectApiTokens } from 'hooks/api/getters/useProjectApiTokens/useProjectApiTokens';
import { CreateApiTokenButton } from 'component/common/ApiTokenTable/CreateApiTokenButton/CreateApiTokenButton';
import { useApiTokenTable } from 'component/common/ApiTokenTable/useApiTokenTable';
import { Search } from 'component/common/Search/Search';
import {
  CREATE_PROJECT_API_TOKEN,
  DELETE_PROJECT_API_TOKEN,
  READ_PROJECT_API_TOKEN,
} from '@server/types/permissions';
import { CopyApiTokenButton } from 'component/common/ApiTokenTable/CopyApiTokenButton/CopyApiTokenButton';
import { RemoveApiTokenButton } from 'component/common/ApiTokenTable/RemoveApiTokenButton/RemoveApiTokenButton';
import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import useProjectApiTokensApi from 'hooks/api/actions/useProjectApiTokensApi/useProjectApiTokensApi';
import { useProjectOverviewNameOrId } from 'hooks/api/getters/useProjectOverview/useProjectOverview';

export const ProjectApiAccess = () => {
  const projectId = useRequiredPathParam('projectId');
  const projectName = useProjectOverviewNameOrId(projectId);
  const { hasAccess } = useContext(AccessContext);
  const {
    tokens,
    loading,
    refetch: refetchProjectTokens,
  } = useProjectApiTokens(projectId);
  const { trackEvent } = usePlausibleTracker();
  const { deleteToken: deleteProjectToken } = useProjectApiTokensApi();

  usePageTitle(`Project api access – ${projectName}`);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
    setHiddenColumns,
    columns,
  } = useApiTokenTable(tokens, (props) => (
    <ActionCell>
      <CopyApiTokenButton
        token={props.row.original}
        permission={READ_PROJECT_API_TOKEN}
        project={projectId}
        track={() =>
          trackEvent('project_api_tokens', {
            props: { eventType: 'api_key_copied' },
          })
        }
      />
      <RemoveApiTokenButton
        token={props.row.original}
        permission={DELETE_PROJECT_API_TOKEN}
        project={projectId}
        onRemove={async () => {
          await deleteProjectToken(props.row.original.secret, projectId);
          trackEvent('project_api_tokens', {
            props: { eventType: 'api_key_deleted' },
          });
          refetchProjectTokens();
        }}
      />
    </ActionCell>
  ));

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <PageContent
        header={
          <PageHeader
            title={`API access (${rows.length})`}
            actions={
              <>
                <Search
                  initialValue={globalFilter}
                  onChange={setGlobalFilter}
                />
                <PageHeader.Divider />
                <CreateApiTokenButton
                  permission={CREATE_PROJECT_API_TOKEN}
                  path='create'
                  project={projectId}
                />
              </>
            }
          />
        }
      >
        {!hasAccess(READ_PROJECT_API_TOKEN, projectId) ? (
          <Alert severity='warning'>
            You need to have the correct permissions to read API tokens
          </Alert>
        ) : (
          <ApiTokenTable
            compact
            loading={loading}
            headerGroups={headerGroups}
            setHiddenColumns={setHiddenColumns}
            prepareRow={prepareRow}
            rows={rows}
            columns={columns}
            globalFilter={globalFilter}
          />
        )}
      </PageContent>

      <Routes>
        <Route path='create' element={<CreateProjectApiToken />} />
      </Routes>
    </div>
  );
};
