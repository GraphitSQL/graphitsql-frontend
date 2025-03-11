import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignUpForm } from './first-step.styled';
import { Checkbox, Field, PasswordInput } from '../../../../../common/components';
import { Box, Heading, Input, Link, Loader, Text } from '@chakra-ui/react';
import { SubmitButton } from '../../sign-up-page.styled';
import { Routing } from '../../../../../common/routes';
import { GetTokenForRegistrationRequest } from '@/api/auth/contracts';
import { randomColor } from '@chakra-ui/theme-tools';
import { getTokenForRegistration } from '@/api/auth';
import { LocalStorageItem } from '@/common/constants';

type FirstStepContentProps = {
  handleChangeStep: (step: number) => void;
};

export const BaseInfoStepContent: React.FC<FirstStepContentProps> = ({ handleChangeStep }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>();

  const onSubmit = handleSubmit(async (data) => {
    const payload: GetTokenForRegistrationRequest = {
      email: data.email,
      password: data.password,
      userName: data.username,
      avatarColor: randomColor({ colors: ['#0F6B6B', '#8A5B0A', '#5D2BC2'] }),
    };
    const registrationToken = await getTokenForRegistration(payload);
    localStorage.setItem(LocalStorageItem.TOKEN_FOR_REGISTRATION, registrationToken);
    handleChangeStep(1);
  });

  return (
    <>
      <SignUpForm name="sign-up-form-basic-form" onSubmit={onSubmit}>
        <Box marginBottom={'20px'}>
          <Heading size={'3xl'}>Приключения начинаются здесь!</Heading>
          <Text fontSize={'xs'}>Сделайте свою работу легкой и увлекательной</Text>
        </Box>
        <Field label="Имя пользователя" invalid={!!errors.username} errorText={errors.username?.message}>
          <Input
            placeholder="Введите имя пользователя"
            autoComplete="off"
            {...register('username', {
              required: 'Это поле обязательно',
              maxLength: {
                value: 250,
                message: 'Макимальная длина поля - 250 символов',
              },
            })}
          />
        </Field>

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

        <Checkbox
          {...register('acceptTerms', {
            required: 'Вы должны принять условия Пользовательского Соглашения',
          })}
          errorText={errors.acceptTerms?.message}
        >
          Я принимаю условия {/* @ts-expect-error chakra typings */}
          <Link as={RouterLink} to={Routing.terms.route()} target="_blank">
            Пользовательского Соглашения
          </Link>
        </Checkbox>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {!isSubmitting ? 'Подтвердить' : <Loader />}
        </SubmitButton>
      </SignUpForm>
      <Text textAlign={'center'}>
        Уже есть аккаунт? {/* @ts-expect-error chakra typings */}
        <Link variant="underline" as={RouterLink} to={Routing.signIn.route()}>
          Войти
        </Link>
      </Text>
    </>
  );
};
