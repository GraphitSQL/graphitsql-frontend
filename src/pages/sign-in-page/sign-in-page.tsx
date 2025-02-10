import {
  Container,
  FormContainer,
  ImageContainer,
  SignInForm,
  SubmitButton,
} from './components';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import { LOTTIES } from '../../common/assets/lotties';
import { Heading, Input, Text, Link } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Field, PasswordInput } from '../../common/components/ui';
import { Routing } from '../../common/routes';

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
  } = useForm<{ email: string; password: string }>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    navigate(Routing.home.route());
  });

  return (
    <Container>
      <ImageContainer>{signInBackground}</ImageContainer>
      <FormContainer>
        <Heading size={'3xl'}>Welcome to GraphitSQL</Heading>
        <SignInForm name="sign-in-form" onSubmit={onSubmit}>
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </Field>

          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
          </Field>

          <SubmitButton type="submit">Submit</SubmitButton>
        </SignInForm>
        <Text>
          Do not have an account?{' '}
          <Link variant="underline" href={Routing.signUp.route()}>
            Register now
          </Link>
        </Text>
      </FormContainer>
    </Container>
  );
};
