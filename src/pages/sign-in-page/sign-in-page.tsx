import { Container, FormContainer, ImageContainer, SignInForm, SubmitButton } from './components';
import { useLottie } from 'lottie-react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { LOTTIES } from '../../common/assets/lotties';
import { Heading, Input, Text, Link, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Field, PasswordInput } from '../../common/components/ui';
import { Routing } from '../../common/routes';
import { logIn } from '@/api/auth';
import { LoginRequest } from '@/api/auth/contracts';
import { toaster } from '@/common/components/ui/toaster';
import { LocalStorageItem } from '@/common/constants';
import { useMemo } from 'react';

export const SignInPage: React.FC = () => {
  const signInBackground = useLottie({
    animationData: LOTTIES.signInPicture,
    loop: true,
    style: {
      height: '80vh',
      marginTop: '10%',
    },
  }).View;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    return location.state?.prevPath;
  }, [location.state]);

  const onSubmit = handleSubmit(async (data: LoginRequest) => {
    try {
      const { accessToken, refreshToken } = await logIn(data);
      window.localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);
      const path = from ?? Routing.home.route();

      navigate(path);
    } catch (error: any) {
      toaster.error({
        title: error?.message || 'Unexpected error',
      });
    }
  });

  return (
    <Container>
      <ImageContainer>{signInBackground}</ImageContainer>
      <FormContainer>
        <Heading size={'3xl'}>Добро пожаловать в GraphitSQL</Heading>
        <SignInForm name="sign-in-form" onSubmit={onSubmit}>
          <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
            <Input
              placeholder="Введите адрес электронной почты"
              {...register('email', {
                required: 'Поле обязательно',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Неверный вормат',
                },
              })}
            />
          </Field>

          <Field label="Пароль" invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              placeholder="Введите пароль"
              {...register('password', {
                required: 'Поле обязательно',
              })}
            />
          </Field>

          <VStack width="100%" alignItems={'flex-end'}>
            <Link
              as={RouterLink}
              variant="underline"
              // @ts-expect-error chakra typings
              to={Routing.forgotPassword.route()}
              color={'fg.muted'}
              fontSize={'13px'}
            >
              Забыл пароль
            </Link>
            <SubmitButton type="submit" width={'100%'}>
              Войти
            </SubmitButton>
          </VStack>
        </SignInForm>
        <Text>
          Еще нет аккаунта? {/* @ts-expect-error chakra typings */}
          <Link as={RouterLink} variant="underline" to={Routing.signUp.route()}>
            Зарегистрироваться
          </Link>
        </Text>
      </FormContainer>
    </Container>
  );
};
