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
import { CreateProjectRequest } from '@/api/projects/contracts';

type CreateDatabaseModalProps = {
  onCreate: (data: CreateProjectRequest) => Promise<void>;
  handleCreateDatabaseModalVisibility: (arg: boolean) => void;
};

const databaseTypes = createListCollection({
  items: [
    { label: 'Открытый', value: 'public' },
    { label: 'Приватный', value: 'private' },
  ],
});

export const CreateDatabaseModal: React.FC<CreateDatabaseModalProps> = ({
  onCreate,
  handleCreateDatabaseModalVisibility,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, defaultValues },
  } = useForm<{ databaseName: string; type: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = handleSubmit(async (data) => {
    await onCreate({
      title: data.databaseName,
      isPublic: data.type === 'public',
    });
    reset({
      ...defaultValues,
      databaseName: '',
    });
    handleCloseModal();
  });

  const handleCloseModal = () => {
    handleCreateDatabaseModalVisibility(false);
  };

  return (
    <DialogContent ref={contentRef}>
      <DialogHeader>
        <DialogTitle>Создать новый проект базы данных</DialogTitle>
      </DialogHeader>
      <DialogBody pb="8">
        <FormContainer name="create-database" onSubmit={onSubmit}>
          <Field label="Название базы данных" invalid={!!errors.databaseName} errorText={errors.databaseName?.message}>
            <Input
              autoComplete="off"
              placeholder="Введите название вашей базы данных"
              {...register('databaseName', {
                required: 'Поле не может быть пустым',
                maxLength: 30,
              })}
            />
          </Field>
          <Field
            label="Тип видимости"
            invalid={!!errors.type}
            errorText={errors.type?.message}
            helperText="Обратите внимание: после установки изменить его будет невозможно."
          >
            <SelectRoot
              collection={databaseTypes}
              {...register('type', {
                required: 'Тип обязателен',
              })}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Установите тип видимости для проекта" />
              </SelectTrigger>
              <SelectContent portalRef={contentRef}>
                {databaseTypes.items.map((type) => (
                  <SelectItem item={type} key={type.label}>
                    {type.label}
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
      <DialogCloseTrigger onClick={handleCloseModal} />
    </DialogContent>
  );
};

export default CreateDatabaseModal;
