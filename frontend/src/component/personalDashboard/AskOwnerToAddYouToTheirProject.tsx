import { ActionBox } from './ActionBox';
import { NeutralCircleContainer } from './SharedComponents';
import type { PersonalDashboardSchemaProjectOwnersItem } from 'openapi';
import { AvatarGroupFromOwners } from 'component/common/AvatarGroupFromOwners/AvatarGroupFromOwners';

type AskOwnerToAddYouToTheirProjectProps = {
  owners: PersonalDashboardSchemaProjectOwnersItem[];
};

export const AskOwnerToAddYouToTheirProject = ({
  owners,
}: AskOwnerToAddYouToTheirProjectProps) => {
  return (
    <ActionBox
      title={
        <>
          <NeutralCircleContainer>2</NeutralCircleContainer>
          Ask a project owner to add you to their project
        </>
      }
    >
      {owners.length ? (
        <>
          <p>Project owners in Ganpa:</p>
          <AvatarGroupFromOwners users={owners} avatarLimit={9} />
        </>
      ) : (
        <p>There are no project owners in Ganpa to ask for access.</p>
      )}
    </ActionBox>
  );
};
