import { ResponseError } from 'utils/apiUtils';

const handleErrorResponses = (target: string) => async (res: Response) => {
  if (!res.ok) {
    const errorMessage = await parseErrorResponse(res);
    throw new ResponseError(target, res.status, errorMessage);
  }

  return res;
};

const parseErrorResponse = async (res: Response): Promise<unknown> => {
  try {
    return await res.json();
  } catch {
    return res.statusText;
  }
};

export default handleErrorResponses;
