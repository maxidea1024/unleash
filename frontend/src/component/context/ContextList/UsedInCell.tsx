import type { FC } from 'react';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import theme from 'themes/theme';
import { Box } from '@mui/material';
import type { IUnleashContextDefinition } from 'interfaces/context';

type UsedInCellProps = {
  original: IUnleashContextDefinition;
};

export const UsedInCell: FC<UsedInCellProps> = ({ original }) => {
  const projectText = original.usedInProjects === 1 ? 'project' : 'projects';
  const flagsText = original.usedInFeatures === 1 ? 'flag' : 'flags';
  return (
    <TextCell
      sx={{
        color:
          original.usedInProjects === 0 && original.usedInFeatures === 0
            ? theme.palette.text.disabled
            : 'inherit',
      }}
    >
      <Box>
        {original.usedInProjects} {projectText}
      </Box>
      <Box>
        {original.usedInFeatures} feature {flagsText}
      </Box>
    </TextCell>
  );
};
