import { LinkCell } from 'component/common/Table/cells/LinkCell/LinkCell';

type FeatureNameCellProps = {
  row: {
    original: {
      name?: string | null;
      description?: string | null;
      project?: string | null;
    };
  };
};

export const FeatureNameCell = ({ row }: FeatureNameCellProps) => (
  <LinkCell
    title={row.original.name || ''}
    subtitle={row.original.description || ''}
    to={
      row.original.project && row.original.name
        ? `/projects/${row.original.project}/features/${row.original.name}`
        : undefined
    }
  />
);
