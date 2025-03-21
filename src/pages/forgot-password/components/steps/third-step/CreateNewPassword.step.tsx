import { setNewPasswordRequest } from '@/api/auth';
import { Field, PasswordInput } from '@/common/components';
import { toaster } from '@/common/components/ui/toaster';
import { LocalStorageItem } from '@/common/constants';
import { ForgotPasswordBaseForm } from '@/pages/forgot-password/forgot-password.styled';
import { Button, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type CreateNewPasswordProps = {
  handleChangeStep: (step: number) => void;
};

export const CreateNewPasswordStep: React.FC<CreateNewPasswordProps> = ({ handleChangeStep }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        newPassword: data.password,
      };

      const res = await setNewPasswordRequest(payload);

      if (!res) {
        throw new Error('Что-то пошло не так');
      }
      localStorage.removeItem(LocalStorageItem.FORGOT_PASSWORD_TOKEN);
      handleChangeStep(3);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка данных',
        description: e?.message,
      });
    }
  });

  return (
    <>
      <Heading>Придумайте новый пароль</Heading>
      <ForgotPasswordBaseForm name="forgot-password-create-new-password-step-form" onSubmit={onSubmit}>
        <Field label="Пароль" invalid={!!errors.password} errorText={errors.password?.message}>
          <PasswordInput
            placeholder="Введите пароль"
            {...register('password', {
              required: 'Это поле обязательно',
              minLength: {
                value: 8,
                message: 'Минимальная длина пароля - 8 символов',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
                message:
                  'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
              },
            })}
          />
        </Field>

        <Field
          label="Подтверждение пароля"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
        >
          <PasswordInput
            placeholder="Подтвердите пароль"
            {...register('confirmPassword', {
              required: 'Пожалуйста, подтвердите пароль',
              validate: (value) => value === getValues('password') || 'Пароли не совпадают',
            })}
          />
        </Field>

        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Подтвердить
        </Button>
      </ForgotPasswordBaseForm>
    </>
  );
};
