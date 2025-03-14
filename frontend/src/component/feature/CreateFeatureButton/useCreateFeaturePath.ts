import { useDefaultProjectId } from 'hooks/api/getters/useDefaultProject/useDefaultProjectId';
import { getCreateTogglePath } from 'utils/routePathHelpers';

type UseCreateFeaturePathOutput = {
  path: string;
  projectId: string;
};

export const useCreateFeaturePath = (filter: {
  query?: string;
  project: string;
}): UseCreateFeaturePathOutput | undefined => {
  const defaultProjectId = useDefaultProjectId();

  const projectId =
    filter.project === '*' || !filter.project
      ? defaultProjectId
      : filter.project;

  if (!projectId) {
    return undefined;
  }

  return {
    path: getCreateTogglePath(projectId),
    projectId,
  };
};
