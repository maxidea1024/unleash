import useAPI from '../useApi/useApi';

const useContextsApi = () => {
  const { makeRequest, createRequest, errors, loading } = useAPI({
    propagateErrors: true,
  });

  const URI = 'api/admin/context';

  const validateContextName = async (name: string) => {
    const path = `${URI}/validate`;
    const req = createRequest(path, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    const res = makeRequest(req.caller, req.id);
    return res;
  };

  // @ts-expect-error
  const createContext = async (payload: IContext) => {
    const path = URI;
    const req = createRequest(path, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await makeRequest(req.caller, req.id);
    return res;
  };

  // @ts-expect-error
  const updateContext = async (context: IContext) => {
    const path = `${URI}/${context.name}`;
    const req = createRequest(path, {
      method: 'PUT',
      body: JSON.stringify(context),
    });

    const res = await makeRequest(req.caller, req.id);
    return res;
  };

  const removeContext = async (contextName: string) => {
    const path = `${URI}/${contextName}`;
    const req = createRequest(path, { method: 'DELETE' });

    const res = await makeRequest(req.caller, req.id);
    return res;
  };

  return {
    createContext,
    validateContextName,
    updateContext,
    removeContext,
    errors,
    loading,
  };
};

export default useContextsApi;
