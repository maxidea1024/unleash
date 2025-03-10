import type React from 'react';
import { Box, styled, TextField } from '@mui/material';
import { StyledAvatar } from './StyledAvatar';
import type { IUser } from 'interfaces/user';

const AddCommentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

type AddCommentFieldProps = {
  user: IUser | undefined;
  commentText: string;
  onTypeComment: (text: string) => void;
  children?: React.ReactNode;
};

export const AddCommentField = ({
  user,
  commentText,
  onTypeComment,
  children,
}: AddCommentFieldProps) => (
  <>
    <AddCommentWrapper>
      <StyledAvatar user={user} />
      <TextField
        variant='outlined'
        placeholder='Add your comment here'
        fullWidth
        multiline
        minRows={2}
        onChange={(e) => onTypeComment(e.target.value)}
        value={commentText}
      />
    </AddCommentWrapper>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</Box>
  </>
);
