import type { PersonalDashboardSchemaAdminsItem } from 'openapi';
import { YourAdmins } from './YourAdmins';
import { ActionBox } from './ActionBox';

export const DataError = ({ project }: { project: string }) => {
  return (
    <ActionBox title={`Couldn't fetch data for project "${project}".`}>
      <p>
        The API request to get data for this project returned with an error.
      </p>
      <p>
        This may be due to an intermittent error or it may be due to issues with
        the project's id ("{project}"). You can try reloading to see if that
        helps.
      </p>
    </ActionBox>
  );
};

type ContactAdminsProps = {
  admins: PersonalDashboardSchemaAdminsItem[];
};

export const ContactAdmins = ({ admins }: ContactAdminsProps) => {
  return (
    <ActionBox title='Consider contacting one of your Ganpa admins for help.'>
      <YourAdmins admins={admins} />
    </ActionBox>
  );
};
