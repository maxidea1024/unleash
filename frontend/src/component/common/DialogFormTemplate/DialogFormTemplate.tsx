import type { FormEventHandler } from 'react';
import theme from 'themes/theme';
import {
  ConfigButtons,
  DescriptionContainer,
  NameContainer,
  StyledForm,
  StyledHeader,
  StyledInput,
  TopGrid,
  LimitContainer,
  FormActions,
  IconWrapper,
} from './DialogFormTemplate.styles';
import { Button } from '@mui/material';
import { CreateButton } from 'component/common/CreateButton/CreateButton';
import type { PermissionButtonProps } from 'component/common/PermissionButton/PermissionButton';
import type { IFeatureNamingType } from 'interfaces/project';
import { NamingPatternInfo } from './NamingPatternInfo';

type NamingPattern = IFeatureNamingType;

type DialogFormTemplateProps = {
  createButtonProps: PermissionButtonProps;
  description: string;
  errors: { [key: string]: string };
  handleSubmit: FormEventHandler<HTMLFormElement>;
  Icon: React.ReactNode;
  Limit?: React.ReactNode;
  name: string;
  onClose: () => void;
  configButtons: React.ReactNode;
  resource: string;
  setDescription: (newDescription: string) => void;
  setName: (newName: string) => void;
  validateName?: () => void;
  namingPattern?: NamingPattern;
};

export const DialogFormTemplate = ({
  Limit,
  handleSubmit,
  name,
  namingPattern,
  setName,
  description,
  setDescription,
  errors,
  Icon,
  resource,
  onClose,
  configButtons,
  createButtonProps,
  validateName = () => {},
}: DialogFormTemplateProps) => {
  const displayNamingPattern = Boolean(namingPattern?.pattern);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TopGrid>
        <IconWrapper>{Icon}</IconWrapper>
        <StyledHeader variant='h2'>Create {resource}</StyledHeader>
        <NameContainer>
          <StyledInput
            label={`${resource} name`}
            aria-required
            aria-details={
              displayNamingPattern ? 'naming-pattern-info' : undefined
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            errorText={errors.name}
            onBlur={validateName}
            onFocus={() => {
              delete errors.name;
            }}
            autoFocus
            InputProps={{
              style: { fontSize: theme.typography.h1.fontSize },
            }}
            InputLabelProps={{
              style: { fontSize: theme.typography.h1.fontSize },
            }}
            data-testid='FORM_NAME_INPUT'
            size='medium'
          />

          {displayNamingPattern && (
            <NamingPatternInfo naming={namingPattern!} />
          )}
        </NameContainer>
        <DescriptionContainer>
          <StyledInput
            size='medium'
            className='description'
            label='Description (optional)'
            multiline
            maxRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              style: { fontSize: theme.typography.h2.fontSize },
            }}
            InputLabelProps={{
              style: { fontSize: theme.typography.h2.fontSize },
            }}
            data-testid='FORM_DESCRIPTION_INPUT'
          />
        </DescriptionContainer>
      </TopGrid>

      <ConfigButtons>{configButtons}</ConfigButtons>

      <LimitContainer>{Limit}</LimitContainer>
      <FormActions>
        <Button onClick={onClose}>Cancel</Button>
        <CreateButton
          data-testid='FORM_CREATE_BUTTON'
          name={resource}
          {...createButtonProps}
        />
      </FormActions>
    </StyledForm>
  );
};
