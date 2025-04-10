import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import type { IEnvironment } from 'interfaces/environments';
import { Badge } from 'component/common/Badge/Badge';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { styled, Typography } from '@mui/material';
import { HtmlTooltip } from 'component/common/HtmlTooltip/HtmlTooltip';

const StyledTooltipTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.fontSizes.smallerBody,
}));

const StyledTooltipDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSizes.smallerBody,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

type EnvironmentNameCellProps = {
  environment: IEnvironment;
};

export const EnvironmentNameCell = ({
  environment,
}: EnvironmentNameCellProps) => {
  const { searchQuery } = useSearchHighlightContext();

  return (
    <TextCell
      sx={(theme) => ({
        [theme.breakpoints.up('sm')]: {
          minWidth: '350px',
        },
      })}
    >
      <Highlighter search={searchQuery}>{environment.name}</Highlighter>
      {environment.protected && (
        <StyledBadge color='success'>Predefined</StyledBadge>
      )}
      {!environment.enabled && (
        <HtmlTooltip
          maxWidth='270px'
          title={
            <>
              <StyledTooltipTitle>Deprecated environment</StyledTooltipTitle>
              <StyledTooltipDescription>
                This environment is not auto-enabled for new projects. The
                project owner will need to manually enable it in the project.
              </StyledTooltipDescription>
            </>
          }
          describeChild
          arrow
        >
          <StyledBadge color='neutral'>Deprecated</StyledBadge>
        </HtmlTooltip>
      )}
    </TextCell>
  );
};
