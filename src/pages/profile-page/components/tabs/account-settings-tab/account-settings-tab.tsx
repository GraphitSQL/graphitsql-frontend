import { Button, Grid, HStack, Input, parseColor, Spinner, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
  Field,
} from '@/common/components';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContextProps, TUser } from '@/common/types';
import { toaster } from '@/common/components/ui/toaster';
import { updateProfileRequest } from '@/api/users';

export const AccountSettings: React.FC = () => {
  const { currentUser, fetchUser } = useOutletContext<OutletContextProps>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<TUser>({
    defaultValues: useMemo(() => {
      return currentUser ?? {};
    }, [currentUser]),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!Object.keys(touchedFields).length) {
        throw new Error('Изменения не найдены');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...payload } = data;
      await updateProfileRequest(payload);
      await fetchUser();
      reset(undefined, { keepValues: true });
      toaster.success({
        title: 'Изменения сохранены',
      });
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка при обновлении данных',
        description: e?.message || 'Unexpected error',
      });
    }
  });

  return (
    <>
      <VStack padding={'10px'}>
        {currentUser ? (
          <>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              gap="10"
              width={'80%'}
              marginBottom={'5%'}
            >
              <Field label="Адрес электронной почты" invalid={!!errors.email} errorText={errors.email?.message}>
                <Input
                  key={currentUser.email}
                  defaultValue={currentUser.email}
                  size={'lg'}
                  placeholder="Введите адрес электронной почты"
                  {...register('email', {
                    required: 'Поле email не может быть пустым',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный формат email',
                    },
                  })}
                />
              </Field>
              <Field label="Имя пользователя" invalid={!!errors.displayName} errorText={errors.displayName?.message}>
                <Input
                  key={currentUser.displayName}
                  defaultValue={currentUser.displayName}
                  size={'lg'}
                  placeholder="Введите имя пользователя"
                  {...register('displayName', {
                    required: 'Поле username не может быть пустым',
                    maxLength: {
                      value: 250,
                      message: 'Максимальная длина поля - 250 символов',
                    },
                  })}
                />
              </Field>
              <Field label="Цвет аватара" invalid={!!errors.avatarColor} errorText={errors.avatarColor?.message}>
                <Controller
                  name="avatarColor"
                  control={control}
                  render={({ field }) => {
                    return (
                      <ColorPickerRoot
                        size={'lg'}
                        name={field.name}
                        format="rgba"
                        minW={'100%'}
                        defaultValue={parseColor(currentUser.avatarColor)}
                        onValueChange={(e) => {
                          field.onChange(e.valueAsString);
                          field.onBlur();
                        }}
                      >
                        <ColorPickerControl>
                          <ColorPickerInput />
                          <ColorPickerTrigger />
                        </ColorPickerControl>
                        <ColorPickerContent>
                          <ColorPickerArea />
                          <HStack>
                            <ColorPickerEyeDropper />
                            <ColorPickerSliders />
                          </HStack>
                        </ColorPickerContent>
                      </ColorPickerRoot>
                    );
                  }}
                />
              </Field>
              <Field label="О себе" invalid={!!errors.about} errorText={errors.about?.message}>
                <Input
                  key={currentUser.about}
                  defaultValue={currentUser.about}
                  placeholder="Расскажите нам немного о себе :)"
                  size={'lg'}
                  {...register('about', {
                    maxLength: {
                      value: 300,
                      message: 'Максимальная длина поля - 300 символов',
                    },
                  })}
                />
              </Field>
            </Grid>
            <Button
              onClick={onSubmit}
              disabled={!Object.keys(touchedFields).length || isSubmitting}
              size={'lg'}
              margin={'auto'}
            >
              Сохранить изменения
            </Button>
          </>
        ) : (
          <Spinner />
        )}
      </VStack>
    </>
  );
};
