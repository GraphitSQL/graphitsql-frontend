import { Field } from '@/common/components';
import { toaster } from '@/common/components/ui/toaster';
import { COLORS } from '@/common/constants';
import { Link as RouterLink } from 'react-router-dom';
// import { LocalStorageItem } from '@/common/constants';
import { ForgotPasswordBaseForm } from '@/pages/forgot-password/forgot-password.styled';
import { Button, Heading, Input, Link, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Routing } from '@/common/routes';

type EnterEmailProps = {
  handleChangeStep: (step: number) => void;
};

export const EnterEmailStep: React.FC<EnterEmailProps> = ({ handleChangeStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    email: string;
  }>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);
      // const forgotPasswordToken = await getTokenForRegistration(data);
      // localStorage.setItem(LocalStorageItem.FORGOT_PASSWORD_TOKEN, forgotPasswordToken);
      handleChangeStep(1);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка данных',
        description: e?.message,
      });
    }
  });
  return (
    <>
      <Heading marginBottom={'10px'}>Восстановление пароля</Heading>
      <Text fontSize={'15px'}>
        Если вы забыли свой пароль, мы здесь, чтобы помочь. Процесс восстановления прост и занимает всего несколько
        минут.
      </Text>
      <br />
      <Text fontSize={'15px'} color={COLORS.teal[200]}>
        Прежде всего, введите электронную почту, на которую зарегестрирован аккаунт. Без нее восстановить пароль не
        получится
      </Text>
      <ForgotPasswordBaseForm name="forgot-password-check-user-form" onSubmit={onSubmit}>
        <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
          <Input
            placeholder="Введите адрес электронной почты"
            {...register('email', {
              required: 'Это поле обязательно',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Неверный формат',
              },
            })}
          />
        </Field>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Далее
        </Button>
      </ForgotPasswordBaseForm>
      <Link
        as={RouterLink}
        variant="underline"
        // @ts-expect-error chakra typings
        to={Routing.signIn.route()}
        color={'fg.muted'}
        fontSize={'13px'}
        textAlign={'center'}
        marginTop={'20px'}
        display={'block'}
      >
        На страницу входа
      </Link>
    </>
  );
};
