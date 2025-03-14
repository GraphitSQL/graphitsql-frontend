import { Heading, HStack, Image, Text } from '@chakra-ui/react';
import { StepsContent, StepsItem, StepsList, StepsRoot } from '../../common/components/ui/steps';
import logoPath from '../../common/assets/LOGO.svg';
import { Container, FormContainer, ImageContainer } from './components';
import { BaseInfoStepContent, ResultStep, VerificationStep } from './components/steps-content';
import { useState } from 'react';

export const SignUpPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };
  return (
    <Container>
      <ImageContainer>
        <HStack alignItems={'center'} gap={3}>
          <Image srcSet={logoPath} width={65} alt="logo" />
        </HStack>
        <Heading size={'xl'}> Ваши идеи, наши сервис — идеальное сочетание!</Heading>
        <Text>Присоединяйтесь к нашему сообществу и начните свое путешествие вместе с нами</Text>
      </ImageContainer>

      <FormContainer>
        <StepsRoot
          orientation="horizontal"
          defaultValue={step}
          step={step}
          count={2}
          width={'90%'}
          margin={'20px auto'}
          size={'sm'}
        >
          <StepsList>
            <StepsItem index={0} title="Заполни форму" disableTrigger={true} />
            <StepsItem index={1} title="Подтверди email" disableTrigger={true} />
            <StepsItem index={2} title="Готово" disableTrigger={true} />
          </StepsList>
          <StepsContent index={0}>
            <BaseInfoStepContent handleChangeStep={handleChangeStep} />
          </StepsContent>
          <StepsContent index={1}>
            <VerificationStep handleChangeStep={handleChangeStep} step={step} />
          </StepsContent>
          <StepsContent index={2}>
            <ResultStep />
          </StepsContent>
        </StepsRoot>
      </FormContainer>
    </Container>
  );
};
