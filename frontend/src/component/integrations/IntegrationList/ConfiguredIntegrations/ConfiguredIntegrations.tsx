import type { AddonSchema, AddonTypeSchema } from 'openapi';
import useLoading from 'hooks/useLoading';
import { StyledCardsGrid } from '../IntegrationList.styles';
import { IntegrationCard } from '../IntegrationCard/IntegrationCard';
import { Typography, styled } from '@mui/material';
import { useSignalEndpoints } from 'hooks/api/getters/useSignalEndpoints/useSignalEndpoints';
import { useUiFlag } from 'hooks/useUiFlag';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';

const StyledConfiguredSection = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(8),
}));

type ConfiguredIntegrationsProps = {
  loading: boolean;
  addons: AddonSchema[];
  providers: AddonTypeSchema[];
};

export const ConfiguredIntegrations = ({
  loading,
  addons,
  providers,
}: ConfiguredIntegrationsProps) => {
  const { signalEndpoints } = useSignalEndpoints();
  const signalsEnabled = useUiFlag('signals');
  const { isEnterprise } = useUiConfig();

  const ref = useLoading(loading || false);

  return (
    <StyledConfiguredSection>
      <div>
        <Typography component='h3' variant='h2'>
          Configured integrations
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          These are the integrations that are currently configured for your
          Ganpa instance.
        </Typography>
      </div>
      <StyledCardsGrid ref={ref}>
        {addons
          ?.sort(({ id: a }, { id: b }) => a - b)
          .map((addon) => {
            const { id, enabled, provider, description } = addon;
            const providerConfig = providers.find(
              (item) => item.name === provider,
            );

            return (
              <IntegrationCard
                key={`${id}-${provider}-${enabled}`}
                addon={addon}
                icon={provider}
                title={providerConfig?.displayName || provider}
                isEnabled={enabled}
                description={description || ''}
                link={`/integrations/edit/${id}`}
                configureActionText='Open'
              />
            );
          })}
        {isEnterprise() && signalsEnabled && signalEndpoints.length > 0 && (
          <IntegrationCard
            variant='stacked'
            icon='signals'
            title='Signals'
            description={`${signalEndpoints.length} signal endpoint${signalEndpoints.length === 1 ? '' : 's'} configured`}
            link='/integrations/signals'
            configureActionText='View signal endpoints'
          />
        )}
      </StyledCardsGrid>
    </StyledConfiguredSection>
  );
};
