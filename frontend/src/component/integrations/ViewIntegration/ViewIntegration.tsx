import { useParams } from 'react-router-dom';
import NotFound from 'component/common/NotFound/NotFound';
import { JiraIntegration } from './JiraIntegration/JiraIntegration';
import { EdgeIntegration } from './EdgeIntegration/EdgeIntegration';

export const ViewIntegration = () => {
  const { providerId } = useParams<{ providerId: string }>();

  if (providerId === 'jira') {
    return <JiraIntegration />;
  }

  if (providerId === 'edge') {
    return <EdgeIntegration />;
  }

  return <NotFound />;
};
