import { useForm } from 'react-hook-form';
import { VerificationForm, VerifyButton } from './second-step.styled';
import { Button, Heading, Input, Loader, Text } from '@chakra-ui/react';
import { Field } from '../../../../../common/components';
import { useEffect, useState } from 'react';
import { toaster } from '../../../../../common/components/ui/toaster';
import { COLORS, LocalStorageItem } from '../../../../../common/constants';
import { resendVerificationCodeRequest, verifyEmailAddress } from '@/api/auth';
import { RegisterRequest } from '@/api/auth/contracts';

type VerificationProps = {
  handleChangeStep: (step: number) => void;
  step: number;
};
export const VerificationStep: React.FC<VerificationProps> = ({ handleChangeStep, step }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>();

  const [timer, setTimer] = useState(30);

  const onSubmit = handleSubmit(async (data: RegisterRequest) => {
    try {
      const { accessToken, refreshToken } = await verifyEmailAddress(data);
      window.localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);
      handleChangeStep(2);
    } catch (e: any) {
      toaster.error({
        title: e.message || 'Что-то пошло не так',
      });
    }
  });

  const resendVerificationCode = async () => {
    try {
      setTimer(30);
      const newToken = await resendVerificationCodeRequest();
      window.localStorage.setItem(LocalStorageItem.TOKEN_FOR_REGISTRATION, newToken);
    } catch (e: any) {
      console.error(e);
      toaster.error({
        title: e.message || 'Ошибка при отправке кода',
      });
    }
  };

  useEffect(() => {
    if (step === 1 && timer > 0) {
      const resendCodeTimer = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(resendCodeTimer);
    }
  }, [timer, step]);

  return (
    <>
      <VerificationForm name="verification-form" onSubmit={onSubmit}>
        <Heading size={'3xl'}>Подтвердите адрес электронной почты</Heading>
        <Text color={COLORS.teal[200]} fontSize={'sm'}>
          Мы отправили вам 4-значный код на ваш адрес электронной почты. Введите код ниже, чтобы подтвердить адрес
          электронной почты.
        </Text>
        <Field label="Код подтверждения" invalid={!!errors.code} errorText={errors.code?.message}>
          <Input
            placeholder="Введите код подтверждения"
            {...register('code', {
              required: 'Код подтверждения обязателен',
            })}
          />
        </Field>

        <VerifyButton type="submit" disabled={isSubmitting}>
          {!isSubmitting ? 'Подтвердить' : <Loader />}
        </VerifyButton>

        <Button
          onClick={() => {
            resendVerificationCode();
          }}
          disabled={timer !== 0 || isSubmitting}
          variant={'plain'}
        >
          Запросить снова {timer > 0 ? `через ${timer}` : ''}
        </Button>
      </VerificationForm>
    </>
  );
};
