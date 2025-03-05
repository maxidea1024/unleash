import { useGroup } from 'hooks/api/getters/useGroup/useGroup';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { EditGroup } from './EditGroup';

export const EditGroupContainer = () => {
  const groupId = Number(useRequiredPathParam('groupId'));
  const { group, refetchGroup } = useGroup(groupId);

  if (!group) {
    return null;
  }

  return (
    <EditGroup group={group} groupId={groupId} refetchGroup={refetchGroup} />
  );
};
