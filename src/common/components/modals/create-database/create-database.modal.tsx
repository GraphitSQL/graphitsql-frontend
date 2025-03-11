import { Button, createListCollection, Input, Spinner } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { useForm } from 'react-hook-form';
import { FormContainer } from './create-database.styled';
import { Field, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '../../ui';
import { useRef } from 'react';

type CreateDatabaseModelProps = {
  onCreate: (data: Record<string, string>) => Promise<void>;
  handleCreateDatabaseModalVisibility: (arg: boolean) => void;
};

const databaseTypes = createListCollection({
  items: [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
  ],
});

export const CreateDatabaseModel: React.FC<CreateDatabaseModelProps> = ({
  onCreate,
  handleCreateDatabaseModalVisibility,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ databaseName: string; status?: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = handleSubmit(async (data) => {
    await onCreate(data);
    reset();
    handleCreateDatabaseModalVisibility(false);
  });

  return (
    <DialogContent ref={contentRef}>
      <DialogHeader>
        <DialogTitle>Создать новый проект базы данных</DialogTitle>
      </DialogHeader>
      <DialogBody pb="8">
        <FormContainer name="create-database" onSubmit={onSubmit}>
          <Field label="Название базы данных" invalid={!!errors.databaseName} errorText={errors.databaseName?.message}>
            <Input
              placeholder="Введите название вашей базы данных"
              {...register('databaseName', {
                required: 'Поле не может быть пустым',
                maxLength: 30,
              })}
            />
          </Field>
          <Field
            label="Тип видимости"
            invalid={!!errors.status}
            errorText={errors.status?.message}
            helperText="Обратите внимание: после установки изменить его будет невозможно."
          >
            <SelectRoot
              collection={databaseTypes}
              {...register('status', {
                required: 'Тип обязателен',
              })}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Установите тип видимости для проекта" />
              </SelectTrigger>
              <SelectContent portalRef={contentRef}>
                {databaseTypes.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
        </FormContainer>
      </DialogBody>
      <DialogFooter>
        <Button colorPalette="teal" type="submit" onClick={onSubmit} disabled={isSubmitting}>
          Создать {isSubmitting && <Spinner />}
        </Button>
      </DialogFooter>
      <DialogCloseTrigger onClick={() => handleCreateDatabaseModalVisibility(false)} />
    </DialogContent>
  );
};
