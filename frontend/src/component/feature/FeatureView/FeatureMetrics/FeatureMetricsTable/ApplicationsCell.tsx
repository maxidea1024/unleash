import { styled, Typography } from '@mui/material';
import { TooltipLink } from 'component/common/TooltipLink/TooltipLink';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

const StyledTag = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSizes.smallerBody,
}));

type FeatureTagCellProps = {
  row: {
    original: {
      appName: string;
      selectedApplications: string[];
    };
  };
};

export const ApplicationsCell = ({ row }: FeatureTagCellProps) => {
  if (
    row.original.selectedApplications &&
    row.original.selectedApplications.length > 1
  ) {
    return (
      <TextCell>
        <TooltipLink
          tooltip={
            <>
              {row.original.selectedApplications.map((appName) => (
                <StyledTag key={appName}>{appName}</StyledTag>
              ))}
            </>
          }
        >
          {row.original.appName}
        </TooltipLink>
      </TextCell>
    );
  }
  return <TextCell>{row.original.appName}</TextCell>;
};
