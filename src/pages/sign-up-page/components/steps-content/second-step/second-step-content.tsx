import { useForm } from 'react-hook-form';
import { VerificationForm, VerifyButton } from './second-step.styled';
import { Button, Heading, Input, Text } from '@chakra-ui/react';
import { Field } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { toaster } from '../../../../../common/components/ui/toaster';
import { COLORS } from '../../../../../common/constants';

type VerificationProps = {
  handleChangeStep: (step: number) => void;
};
export const VerificationStep: React.FC<VerificationProps> = ({
  handleChangeStep,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ verificationCode: string }>();

  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [timer, setTimer] = useState(30);

  const onSubmit = handleSubmit((data) => {
    console.log('data', data);
    setIsValidating(true);
    const signUpToken = localStorage.getItem('signUpToken');
    const isVerified = signUpToken === getValues('verificationCode');

    if (isVerified) {
      handleChangeStep(2);
    } else {
      setIsValidating(false);
      toaster.create({
        title: 'Verification failed',
        description: 'Make sure you enter a valid code',
        type: 'error',
      });
    }
  });

  const resendVerificationCode = () => {
    console.log('qweqweqewee resend');
    setTimer(30);
  };

  useEffect(() => {
    if (timer > 0) {
      const qwe = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(qwe);
    }
  }, [timer]);

  return (
    <>
      <VerificationForm name="verification-form" onSubmit={onSubmit}>
        <Heading size={'3xl'}>Verify your email address</Heading>
        <Text color={COLORS.teal[200]} fontSize={'sm'}>
          We emailed you a 6-digit code to your email. Enter the code below to
          confirm email address.
        </Text>
        <Field
          label="Verification Code"
          invalid={!!errors.verificationCode}
          errorText={errors.verificationCode?.message}
        >
          <Input
            placeholder="Enter the verification code"
            {...register('verificationCode', {
              required: 'Verification code is required',
            })}
          />
        </Field>

        <VerifyButton type="submit" disabled={isValidating}>
          Verify
        </VerifyButton>

        <Button
          onClick={() => {
            resendVerificationCode();
          }}
          disabled={timer !== 0}
          variant={'plain'}
        >
          Resend verify code {timer > 0 ? `in ${timer}` : ''}
        </Button>
      </VerificationForm>
    </>
  );
};
