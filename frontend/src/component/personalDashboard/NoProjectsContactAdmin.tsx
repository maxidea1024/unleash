import { ActionBox } from './ActionBox';
import { YourAdmins } from './YourAdmins';
import { NeutralCircleContainer } from './SharedComponents';
import type { PersonalDashboardSchemaAdminsItem } from 'openapi';

type NoProjectsContactAdminProps = {
  admins: PersonalDashboardSchemaAdminsItem[];
};

export const NoProjectsContactAdmin = ({
  admins,
}: NoProjectsContactAdminProps) => {
  return (
    <ActionBox
      title={
        <>
          <NeutralCircleContainer>1</NeutralCircleContainer>
          Contact Ganpa admin
        </>
      }
    >
      <YourAdmins admins={admins} />
    </ActionBox>
  );
};
