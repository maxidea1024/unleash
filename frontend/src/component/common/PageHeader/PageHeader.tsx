import type React from 'react';
import type { ReactNode } from 'react';
import classnames from 'classnames';
import {
  Divider,
  styled,
  type SxProps,
  type Theme,
  Typography,
  type TypographyProps,
} from '@mui/material';
import { usePageTitle } from 'hooks/usePageTitle';

const StyledDivider = styled(Divider)(({ theme }) => ({
  height: '100%',
  borderColor: theme.palette.divider,
  width: '1px',
  display: 'inline-block',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(0.5, 0),
  verticalAlign: 'middle',
}));

const StyledHeaderContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTopContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
}));

const StyledHeader = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(5),
}));

const StyledHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSizes.mainHeader,
  fontWeight: 'normal',
  lineHeight: theme.spacing(5),
}));

const StyledHeaderActions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

type PageHeaderProps = {
  title?: string;
  titleElement?: ReactNode;
  subtitle?: string;
  variant?: TypographyProps['variant'];
  loading?: boolean;
  actions?: ReactNode;
  className?: string;
  secondary?: boolean;
  children?: React.ReactNode;
};

const PageHeaderComponent = ({
  title,
  titleElement,
  actions,
  subtitle,
  variant,
  loading,
  className = '',
  secondary,
  children,
}: PageHeaderProps) => {
  usePageTitle(secondary ? '' : title);

  const headerClasses = classnames({ skeleton: loading });

  return (
    <StyledHeaderContainer>
      <StyledTopContainer>
        <StyledHeader className={classnames(headerClasses)} data-loading>
          <StyledHeaderTitle
            variant={variant || secondary ? 'h2' : 'h1'}
            className={classnames(className)}
          >
            {titleElement || title}
          </StyledHeaderTitle>
          {subtitle && <small>{subtitle}</small>}
        </StyledHeader>
        {Boolean(actions) && (
          <StyledHeaderActions>{actions}</StyledHeaderActions>
        )}
      </StyledTopContainer>
      {children}
    </StyledHeaderContainer>
  );
};

type PageHeaderDividerProps = {
  sx?: SxProps<Theme>;
};

const PageHeaderDivider = ({ sx }: PageHeaderDividerProps) => {
  return <StyledDivider orientation='vertical' variant='middle' sx={sx} />;
};

PageHeaderComponent.Divider = PageHeaderDivider;

export const PageHeader = PageHeaderComponent;
