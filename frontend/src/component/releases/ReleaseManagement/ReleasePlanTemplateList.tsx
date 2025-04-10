import { Grid } from '@mui/material';
import { ReleasePlanTemplateCard } from './ReleasePlanTemplateCard';
import type { IReleasePlanTemplate } from 'interfaces/releasePlans';

type TemplateListProps = {
  templates: IReleasePlanTemplate[];
};

export const ReleasePlanTemplateList = ({ templates }: TemplateListProps) => {
  return (
    <>
      {templates.map((template) => (
        <Grid key={template.id} item xs={6} md={4}>
          <ReleasePlanTemplateCard template={template} />
        </Grid>
      ))}
    </>
  );
};
