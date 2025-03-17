import type { IConstraint } from 'interfaces/strategy';
import { SegmentFormStepOne } from './SegmentFormStepOne';
import { SegmentFormStepTwo } from './SegmentFormStepTwo';
import type React from 'react';
import { useState } from 'react';
import { SegmentFormStepList } from 'component/segments/SegmentFormStepList';
import { styled } from '@mui/material';

export type SegmentFormStep = 1 | 2;
export type SegmentFormMode = 'create' | 'edit';

type SegmentFormProps = {
  name: string;
  description: string;
  project?: string;
  constraints: IConstraint[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setProject: React.Dispatch<React.SetStateAction<string | undefined>>;
  setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
  handleSubmit: (e: any) => void;
  errors: { [key: string]: string };
  clearErrors: () => void;
  mode: SegmentFormMode;
  children?: React.ReactNode;
};

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

export const SegmentForm = ({
  children,
  name,
  description,
  project,
  constraints,
  setName,
  setDescription,
  setProject,
  setConstraints,
  handleSubmit,
  errors,
  clearErrors,
  mode,
}: SegmentFormProps) => {
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState<SegmentFormStep>(1);

  return (
    <>
      <SegmentFormStepList total={totalSteps} current={currentStep} />
      <StyledForm onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <SegmentFormStepOne
            name={name}
            description={description}
            project={project}
            setName={setName}
            setDescription={setDescription}
            setProject={setProject}
            errors={errors}
            clearErrors={clearErrors}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && (
          <SegmentFormStepTwo
            project={project}
            constraints={constraints}
            setConstraints={setConstraints}
            setCurrentStep={setCurrentStep}
            mode={mode}
          >
            {children}
          </SegmentFormStepTwo>
        )}
      </StyledForm>
    </>
  );
};
