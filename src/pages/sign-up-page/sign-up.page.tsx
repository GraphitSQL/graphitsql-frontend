import { Heading, HStack, Image, Text } from '@chakra-ui/react';
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from '../../common/components/ui/steps';
import { Container, FormContainer, ImageContainer } from './components';
import { BaseInfoStepContent,ResultStep,VerificationStep } from './components/steps-content';
import { useState } from 'react';

export const SignUpPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const handleChangeStep = (step: number) => {
    setStep(step);
  };
  return (
    <Container>
      <ImageContainer>
        <HStack alignItems={'center'} gap={2}>
          <Image srcSet="src/common/assets/LOGO.svg" width={65} />
          <Text fontSize={'xl'}>GraphitSQL</Text>
        </HStack>
        <Heading size={'4xl'}> Let's build something amazing today!</Heading>
        <Text>Join our community and start your journey with us.</Text>
      </ImageContainer>

      <FormContainer>
        <StepsRoot
          orientation="horizontal"
          defaultValue={step}
          step={step}
          count={2}
          width={'90%'}
          margin={'20px auto'}
        >
          <StepsList>
            <StepsItem
              index={0}
              title="Fill out the form"
              disableTrigger={true}
            />
            <StepsItem index={1} title="Verify email" disableTrigger={true} />
            <StepsItem index={2} title="Finish" disableTrigger={true} />
          </StepsList>
          <StepsContent index={0}>
            <BaseInfoStepContent handleChangeStep={handleChangeStep} />
          </StepsContent>
          <StepsContent index={1}>
            <VerificationStep handleChangeStep={handleChangeStep} step={step}/>
          </StepsContent>
          <StepsContent index={2}>
            <ResultStep />
          </StepsContent>
        </StepsRoot>
      </FormContainer>
    </Container>
  );
};
