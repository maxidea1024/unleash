import AttachMoneyRounded from '@mui/icons-material/AttachMoneyRounded';
import { styled, Tooltip } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

const StyledMonetizationOn = styled(AttachMoneyRounded)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '1.5rem',
  backgroundColor: '#F1F0FC',
  borderRadius: theme.shape.borderRadiusLarge,
}));

type UserTypeCellProps = {
  value: boolean;
};

export const UserTypeCell = ({ value }: UserTypeCellProps) => {
  return (
    <TextCell>
      <ConditionallyRender
        condition={value}
        show={
          <Tooltip title='Paid user' arrow>
            <StyledMonetizationOn />
          </Tooltip>
        }
        elseShow='Included'
      />
    </TextCell>
  );
};
