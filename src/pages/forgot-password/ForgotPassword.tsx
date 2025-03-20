import { StepsContent, StepsItem, StepsList, StepsRoot } from '@/common/components/ui/steps';
import { useState } from 'react';
import { EnterEmailStep } from './components/steps/first-step/EnterEmail.step';
import { CreateNewPasswordStep, ResultStep, VerifyCodeStep } from './components';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState<number>(0);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };
  return (
    <>
      <StepsRoot
        orientation="horizontal"
        defaultValue={step}
        step={step}
        count={2}
        width={'90%'}
        margin={'0 auto'}
        padding={'20px 10px'}
        size={'sm'}
        height={'100%'}
      >
        <StepsList marginBottom={'40px'}>
          <StepsItem index={0} disableTrigger={true} />
          <StepsItem index={1} disableTrigger={true} />
          <StepsItem index={2} disableTrigger={true} />
          <StepsItem index={3} disableTrigger={true} />
        </StepsList>
        <StepsContent index={0}>
          <EnterEmailStep handleChangeStep={handleChangeStep} />
        </StepsContent>
        <StepsContent index={1}>
          <VerifyCodeStep handleChangeStep={handleChangeStep} step={step} />
        </StepsContent>
        <StepsContent index={2}>{<CreateNewPasswordStep handleChangeStep={handleChangeStep} />}</StepsContent>
        <StepsContent index={3}>{<ResultStep />}</StepsContent>
      </StepsRoot>
    </>
  );
};
