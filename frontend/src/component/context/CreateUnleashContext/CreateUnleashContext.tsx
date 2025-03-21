import { CreateButton } from 'component/common/CreateButton/CreateButton';
import FormTemplate from 'component/common/FormTemplate/FormTemplate';
import { useContextForm } from '../hooks/useContextForm';
import { ContextForm } from '../ContextForm/ContextForm';
import { CREATE_CONTEXT_FIELD } from 'component/providers/AccessProvider/permissions';
import useContextsApi from 'hooks/api/actions/useContextsApi/useContextsApi';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import useGanpaContext from 'hooks/api/getters/useGanpaContext/useGanpaContext';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';

type CreateContextProps = {
  onSubmit: () => void;
  onCancel: () => void;
  modal?: boolean;
};

export const CreateUnleashContext = ({
  onSubmit,
  onCancel,
  modal,
}: CreateContextProps) => {
  const { setToastData, setToastApiError } = useToast();
  const { uiConfig } = useUiConfig();
  const {
    contextName,
    contextDesc,
    legalValues,
    stickiness,
    setContextName,
    setContextDesc,
    setLegalValues,
    setStickiness,
    getContextPayload,
    validateContext,
    clearErrors,
    setErrors,
    errors,
  } = useContextForm();
  const { createContext, loading } = useContextsApi();
  const { refetch: refetchUnleashContext } = useGanpaContext();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const validName = await validateContext();

    if (validName) {
      const payload = getContextPayload();
      try {
        await createContext(payload);

        refetchUnleashContext();

        setToastData({
          title: 'Context created',
          confetti: true,
          type: 'success',
        });

        onSubmit();
      } catch (error: unknown) {
        setToastApiError(formatUnknownError(error));
      }
    }
  };

  const formatApiCode = () => {
    return `curl --location --request POST '${uiConfig.unleashUrl}/api/admin/context' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getContextPayload(), undefined, 2)}'`;
  };

  return (
    <FormTemplate
      loading={loading}
      title='Create context'
      description='Context fields are a basic building block used in Ganpa to control roll-out.
            They can be used together with strategy constraints as part of the activation strategy evaluation.'
      documentationLink='https://docs.getunleash.io/reference/unleash-context#custom-context-fields'
      documentationLinkLabel='Context fields documentation'
      formatApiCode={formatApiCode}
      modal={modal}
    >
      <ContextForm
        errors={errors}
        handleSubmit={handleSubmit}
        onCancel={onCancel}
        contextName={contextName}
        setContextName={setContextName}
        contextDesc={contextDesc}
        setContextDesc={setContextDesc}
        legalValues={legalValues}
        setLegalValues={setLegalValues}
        stickiness={stickiness}
        setStickiness={setStickiness}
        mode='Create'
        validateContext={validateContext}
        setErrors={setErrors}
        clearErrors={clearErrors}
      >
        <CreateButton name='context' permission={CREATE_CONTEXT_FIELD} />
      </ContextForm>
    </FormTemplate>
  );
};
