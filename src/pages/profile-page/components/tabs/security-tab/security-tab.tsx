import {
  Button,
  Separator,
  VStack,
  Text,
  Box,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { ChangePasswordForm } from './security-tab.styled';
import { useForm } from 'react-hook-form';
import { Field, PasswordInput } from '../../../../../common/components';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../../../../../common/components/ui/dialog';

export const SecuritySettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <VStack padding={'10px'} alignItems={'center'}>
        <ChangePasswordForm name="change-password-form" onSubmit={onSubmit}>
          <Field
            label="New Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              placeholder="Enter your new password"
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

          <Button type="submit" size={'lg'}>
            Submit
          </Button>
        </ChangePasswordForm>

        <Separator />
        <Box w="85%">
          <Heading>Delete account</Heading>
          <HStack justifyContent={'space-between'} gap={'20px'}>
            <Text
              fontSize={{
                base: 'xs',
                sm: 'xs',
                md: 'md',
              }}
            >
              Deleting your account is irreversible. Once you proceed, all your
              data will be permanently removed and cannot be recovered.
            </Text>
            <DialogRoot placement="center" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  colorPalette="red"
                  size={{
                    base: 'md',
                    sm: 'xs',
                    md: 'md',
                  }}
                >
                  Delete account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm your decision</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Text>
                    Deleting your account is irreversible. Once you proceed, all
                    your data will be permanently removed and cannot be
                    recovered.
                  </Text>
                  <Heading size={'sm'} margin={'15px 0'}>
                    Need help?
                  </Heading>
                  <Text fontSize={'xs'}>
                    If you have any questions or need assistance, please contact
                    our support team before proceeding.
                  </Text>
                </DialogBody>
                <DialogFooter>
                  <Button colorPalette="red">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </HStack>
        </Box>
      </VStack>
    </>
  );
};
