import type { ReactNode } from 'react';
import classnames from 'classnames';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { Paper, type PaperProps, styled } from '@mui/material';
import { useStyles } from './PageContent.styles';
import useLoading from 'hooks/useLoading';

type PageContentProps = PaperProps & {
  header?: ReactNode;
  isLoading?: boolean;
  /**
   * @deprecated fix feature event log and remove
   */
  disablePadding?: boolean;
  /**
   * @deprecated fix feature event log and remove
   */
  disableBorder?: boolean;
  disableLoading?: boolean;
  bodyClass?: string;
  headerClass?: string;
  withTabs?: boolean;
};

const StyledHeader = styled('div')(({ theme }) => ({
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  borderBottomColor: theme.palette.divider,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadiusLarge,
  boxShadow: 'none',
}));

type PageContentLoadingProps = {
  isLoading: boolean;
  children?: ReactNode;
};

const PageContentLoading = ({
  children,
  isLoading,
}: PageContentLoadingProps) => {
  const ref = useLoading(isLoading);

  return (
    <div ref={ref} aria-busy={isLoading} aria-live='polite'>
      {children}
    </div>
  );
};

export const PageContent = ({
  children,
  header,
  disablePadding = false,
  disableBorder = false,
  bodyClass = '',
  headerClass = '',
  isLoading = false,
  disableLoading = false,
  className,
  withTabs,
  ...rest
}: PageContentProps) => {
  const { classes: styles } = useStyles();

  const headerClasses = classnames(
    'header',
    headerClass || styles.headerPadding,
    {
      [styles.paddingDisabled]: disablePadding,
      [styles.borderDisabled]: disableBorder,
      [styles.withTabs]: withTabs,
    },
  );

  const bodyClasses = classnames(
    'body',
    bodyClass ? bodyClass : styles.bodyContainer,
    {
      [styles.paddingDisabled]: disablePadding,
      [styles.borderDisabled]: disableBorder,
    },
  );

  const paperProps = disableBorder ? { elevation: 0 } : {};

  const content = (
    <StyledPaper {...rest} {...paperProps} className={classnames(className)}>
      {Boolean(header) && (
        <StyledHeader className={headerClasses}>
          {typeof header === 'string' ? (
            <PageHeader title={header as string} />
          ) : (
            header
          )}
        </StyledHeader>
      )}
      <div className={bodyClasses}>{children}</div>
    </StyledPaper>
  );

  if (disableLoading) {
    return <div>{content}</div>;
  }

  return (
    <PageContentLoading isLoading={isLoading}>{content}</PageContentLoading>
  );
};
