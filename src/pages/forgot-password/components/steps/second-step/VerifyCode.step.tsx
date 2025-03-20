import { Field } from '@/common/components/ui';
import { toaster } from '@/common/components/ui/toaster';
import { COLORS } from '@/common/constants';
// import { LocalStorageItem } from '@/common/constants';
import { ForgotPasswordBaseForm } from '@/pages/forgot-password/forgot-password.styled';
import { Button, Heading, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type VerifyCodeProps = {
  handleChangeStep: (step: number) => void;
  step: number;
};

export const VerifyCodeStep: React.FC<VerifyCodeProps> = ({ handleChangeStep, step }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    code: string;
  }>();

  const [timer, setTimer] = useState(30);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      // const { accessToken, refreshToken } = await verifyEmailAddress(data);
      // window.localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
      // window.localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);
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
      // const newToken = await resendVerificationCodeRequest();
      // window.localStorage.setItem(LocalStorageItem.FORGOT_PASSWORD_TOKEN, newToken);
    } catch (e: any) {
      console.error(e);
      toaster.error({
        title: e.message || 'Ошибка при отправке кода',
      });
    }
  };

  useEffect(() => {
    if (step === 1 && timer > 0) {
      const resendCodeTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(resendCodeTimer);
    }
  }, [step, timer]);

  return (
    <>
      <Heading>Введите код подтверждения</Heading>
      <Text color={COLORS.teal[200]} fontSize={'sm'}>
        Мы отправили вам 4-значный код на ваш адрес электронной почты. Введите код ниже, чтобы подтвердить адрес
        электронной почты.
      </Text>
      <ForgotPasswordBaseForm name="forgot-password-verification-step-form" onSubmit={onSubmit}>
        <Field label="Код подтверждения" invalid={!!errors.code} errorText={errors.code?.message}>
          <Input
            placeholder="Введите код подтверждения"
            {...register('code', {
              required: 'Код подтверждения обязателен',
              maxLength: {
                value: 4,
                message: 'Длина кода - 4 символа',
              },
            })}
          />
        </Field>

        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Подтвердить
        </Button>

        <Button
          onClick={() => {
            resendVerificationCode();
          }}
          disabled={timer !== 0 || isSubmitting}
          variant={'plain'}
        >
          Запросить снова {timer > 0 ? `через ${timer}` : ''}
        </Button>
      </ForgotPasswordBaseForm>
    </>
  );
};
