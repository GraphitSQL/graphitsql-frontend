import { useForm } from 'react-hook-form';
import { SignUpForm } from './first-step.styled';
import {
  Checkbox,
  Field,
  PasswordInput,
} from '../../../../../common/components';
import { Box, Heading, Input, Link, Text } from '@chakra-ui/react';
import { SubmitButton } from '../../sign-up-page.styled';
import { Routing } from '../../../../../common/routes';
import { MOCK_SIGN_UP_CODE } from '../../../../../tmp/mocks/mock-sign-up-token.mock';

type FirstStepContentProps = {
  handleChangeStep: (step: number) => void;
};

export const BaseInfoStepContent: React.FC<FirstStepContentProps> = ({
  handleChangeStep,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    localStorage.setItem('signUpToken', MOCK_SIGN_UP_CODE);
    handleChangeStep(1);
  });

  return (
    <>
      <SignUpForm name="sign-up-form-basic-form" onSubmit={onSubmit}>
        <Box marginBottom={'20px'}>
          <Heading size={'3xl'}>Adventures starts here!</Heading>
          <Text fontSize={'xs'}>Make your work easy and fun</Text>
        </Box>
        <Field
          label="Username"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            placeholder="Enter your username"
            autoComplete='off'
            {...register('username', {
              required: 'Username is required',
              maxLength: {
                value: 30,
                message: 'Max length for username is 30 symbols',
              },
            })}
          />
        </Field>

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
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
                message:
                  'Password must include at least one uppercase letter, one lowercase letter, one number and one special character',
              },
            })}
          />
        </Field>

        <Field
          label="Confirm Password"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
        >
          <PasswordInput
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
          />
        </Field>

        <Checkbox
          {...register('acceptTerms', {
            required: 'You must accept the terms',
          })}
          errorText={errors.acceptTerms?.message}
        >
          I accept the{' '}
          <Link href={'src/common/assets/terms/terms.pdf'} target="_blank">
            terms and conditions
          </Link>
        </Checkbox>

        <SubmitButton type="submit">Submit</SubmitButton>
      </SignUpForm>
      <Text textAlign={'center'}>
        Already have an account?{' '}
        <Link variant="underline" href={Routing.signIn.route()}>
          Sign in
        </Link>
      </Text>
    </>
  );
};
