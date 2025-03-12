import { styled } from '@mui/material';
import type { EventSchema } from 'openapi';

const StyledJsonListItem = styled('li')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.neutral.light,
  borderRadius: theme.shape.borderRadiusLarge,
  fontSize: theme.fontSizes.smallBody,

  '& code': {
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    lineHeight: '100%',
  },
}));

type EventJsonProps = {
  entry: EventSchema;
};

const EventJson = ({ entry }: EventJsonProps) => {
  const localEventData = JSON.parse(JSON.stringify(entry));
  delete localEventData.description;
  delete localEventData.name;
  delete localEventData.diffs;

  const prettyPrinted = JSON.stringify(localEventData, null, 2);

  return (
    <StyledJsonListItem>
      <div>
        <code>{prettyPrinted}</code>
      </div>
    </StyledJsonListItem>
  );
};

export default EventJson;
