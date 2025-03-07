import { styled } from '@mui/material';
import type { PropsWithChildren, ReactNode } from 'react';

const Container = styled('article')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: 'flex',
  gap: theme.spacing(3),
  flexDirection: 'column',
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
  fontSize: theme.spacing(1.75),
  fontWeight: 'bold',
}));

type ActionBoxProps = {
  title?: string | ReactNode;
};

export const ActionBox = ({
  title,
  children,
}: PropsWithChildren<ActionBoxProps>) => {
  return (
    <Container>
      {title ? <TitleContainer>{title}</TitleContainer> : null}

      {children}
    </Container>
  );
};
