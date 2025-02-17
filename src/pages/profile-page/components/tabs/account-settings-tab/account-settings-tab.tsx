import {
  Button,
  Grid,
  HStack,
  Input,
  parseColor,
  Spinner,
  VStack,
} from '@chakra-ui/react';
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
} from '../../../../../common/components';
import { useEffect, useMemo, useState } from 'react';

type ProfileFields = {
  email: string;
  username: string;
  avatarColor: string;
  about: string;
};

export const AccountSettings: React.FC = () => {
  const [userData, setUserData] = useState<ProfileFields | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<ProfileFields>({
    defaultValues: useMemo(() => {
      return userData ?? {};
    }, [userData]),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const fetchUserData = async () => {
    const data = await new Promise<ProfileFields>((resolve) => {
      setTimeout(() => {
        resolve({
          username: 'John Fafafa',
          about: 'I am cooool',
          avatarColor: 'rgba(176, 62, 138, 1)',
          email: 'qwe@qwe.com',
        });
      }, 1000);
    });
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <VStack padding={'10px'}>
        {userData ? (
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
              <Field
                label="Email"
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  defaultValue={userData.email}
                  size={'lg'}
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email cannot be empty',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                />
              </Field>
              <Field
                label="Username"
                invalid={!!errors.username}
                errorText={errors.username?.message}
              >
                <Input
                  defaultValue={userData.username}
                  size={'lg'}
                  placeholder="Enter your username"
                  {...register('username', {
                    required: 'Username cannot be empty',
                    maxLength: {
                      value: 30,
                      message: 'Max length for username is 30 symbols',
                    },
                  })}
                />
              </Field>
              <Field
                label="Avatar Color"
                invalid={!!errors.avatarColor}
                errorText={errors.avatarColor?.message}
              >
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
                        defaultValue={parseColor(userData.avatarColor)}
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
              <Field
                label="About"
                invalid={!!errors.about}
                errorText={errors.about?.message}
              >
                <Input
                  defaultValue={userData.about}
                  placeholder="Tell us about yourself :)"
                  size={'lg'}
                  {...register('about', {
                    maxLength: {
                      value: 120,
                      message: 'Max length for about section is 120 symbols',
                    },
                  })}
                />
              </Field>
            </Grid>
            <Button
              onClick={onSubmit}
              disabled={!Object.keys(touchedFields).length}
              size={'lg'}
              margin={'auto'}
            >
              Update profile
            </Button>
          </>
        ) : (
          <Spinner />
        )}
      </VStack>
    </>
  );
};
