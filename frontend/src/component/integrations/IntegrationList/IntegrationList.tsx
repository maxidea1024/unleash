import useAddons from 'hooks/api/getters/useAddons/useAddons';
import { AvailableIntegrations } from './AvailableIntegrations/AvailableIntegrations';
import { ConfiguredIntegrations } from './ConfiguredIntegrations/ConfiguredIntegrations';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { useSignalEndpoints } from 'hooks/api/getters/useSignalEndpoints/useSignalEndpoints';

export const IntegrationList = () => {
  const { signalEndpoints } = useSignalEndpoints();
  const { providers, addons, loading } = useAddons();

  return (
    <PageContent
      header={<PageHeader title='Integrations' />}
      isLoading={loading}
    >
      {(addons.length > 0 || signalEndpoints.length > 0) && (
        <ConfiguredIntegrations
          addons={addons}
          providers={providers}
          loading={loading}
        />
      )}
      <AvailableIntegrations providers={providers} />
    </PageContent>
  );
};
