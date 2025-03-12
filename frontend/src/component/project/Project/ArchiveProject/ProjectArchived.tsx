import { Link } from 'react-router-dom';

type ProjectArchivedProps = {
  name: string;
};

export const ProjectArchived = ({ name }: ProjectArchivedProps) => {
  return (
    <p>
      The project <strong>{name}</strong> has been archived. You can find it on
      the <Link to={`/projects-archive`}>archive page for projects</Link>.
    </p>
  );
};
