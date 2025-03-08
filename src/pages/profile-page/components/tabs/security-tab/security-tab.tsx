import { Button, VStack, Text, Box, Heading, HStack } from '@chakra-ui/react';
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
import { changePasswordRequest } from '@/api/auth';
import { toaster } from '@/common/components/ui/toaster';
import { COLORS } from '@/common/constants';
import { deleteAccountRequest } from '@/api/users';
import { useNavigate } from 'react-router-dom';
import { Routing } from '@/common/routes';

export const SecuritySettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ password: string; confirmPassword: string }>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { password } = data;
      await changePasswordRequest({ newPassword: password });
      reset();
      toaster.success({
        title: 'Пароль успешно обновлен',
      });
    } catch (e: any) {
      toaster.error({
        title: 'Невозможно обновить пароль',
        description: e?.message || 'Unexpected error',
      });
    }
  });

  const onDelete = async () => {
    await deleteAccountRequest();
    localStorage.clear();
    navigate(Routing.signIn.route());
  };

  return (
    <>
      <VStack padding={'10px'} alignItems={'center'}>
        <ChangePasswordForm name="change-password-form" onSubmit={onSubmit}>
          <Field label="Новый пароль" invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              placeholder="Введите новый пароль"
              {...register('password', {
                required: 'Пароль не может быть пустым',
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
            label="Подтвердите пароль"
            invalid={!!errors.confirmPassword}
            errorText={errors.confirmPassword?.message}
          >
            <PasswordInput
              placeholder="Подтверждение пароля"
              {...register('confirmPassword', {
                required: 'Пожалуйста, подтвердите пароль',
                validate: (value) => value === getValues('password') || 'Пароли не совпадают',
              })}
            />
          </Field>

          <Button type="submit" size={'lg'} disabled={isSubmitting}>
            Сменить пароль
          </Button>
        </ChangePasswordForm>

        <Box w="85%" paddingTop={7} borderTop={`1px solid ${COLORS.gray[800]}`}>
          <Heading>Удаление аккаунта</Heading>
          <HStack justifyContent={'space-between'} gap={30} marginTop={5}>
            <Text
              fontSize={{
                base: 'xs',
                sm: 'xs',
                md: 'md',
              }}
            >
              Удаление вашего аккаунта необратимо. После того, как вы продолжите, все ваши данные будут удалены навсегда
              и не могут быть восстановлены.
            </Text>

            <DialogRoot placement="center" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button
                  variant="solid"
                  colorPalette="red"
                  size={{
                    base: 'md',
                    sm: 'xs',
                    md: 'md',
                  }}
                >
                  Удалить аккаунт
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Подтвердите свое решение</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Text>
                    Удаление вашего аккаунта необратимо. После того, как вы продолжите, все ваши данные будут навсегда
                    удалены и не могут быть восстановлены.
                  </Text>
                  <Heading size={'sm'} margin={'15px 0'}>
                    Нужна помощь?
                  </Heading>
                  <Text fontSize={'xs'}>
                    Если у вас возникли вопросы или вам нужна помощь, пожалуйста, свяжитесь с нашей службой поддержки,
                    прежде чем продолжить.{' '}
                  </Text>
                </DialogBody>
                <DialogFooter>
                  <Button colorPalette="red" onClick={onDelete}>
                    Удалить аккаунт
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </HStack>
        </Box>
      </VStack>
    </>
  );
};
