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
import {
  Field,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../ui';
import { useRef, useState } from 'react';

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
    formState: { errors },
  } = useForm<{ databaseName: string; status?: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsCreating(true);
    console.log(data);
    await onCreate(data);
    setIsCreating(false);
    reset();
    handleCreateDatabaseModalVisibility(false);
  });

  return (
    <DialogContent ref={contentRef}>
      <DialogHeader>
        <DialogTitle>Create new database project</DialogTitle>
      </DialogHeader>
      <DialogBody pb="8">
        <FormContainer name="create-database" onSubmit={onSubmit}>
          <Field
            label="Database Name"
            invalid={!!errors.databaseName}
            errorText={errors.databaseName?.message}
          >
            <Input
              placeholder="Enter database name"
              {...register('databaseName', {
                required: 'Name is required',
                maxLength: 30,
              })}
            />
          </Field>
          <Field
            label="Database Visibility Type"
            invalid={!!errors.status}
            errorText={errors.status?.message}
            helperText="Note, once set - it cannot be changed"
          >
            <SelectRoot
              collection={databaseTypes}
              {...register('status', {
                required: 'Type is required',
              })}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select database visibility type" />
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
        <Button colorPalette="teal" type="submit" onClick={onSubmit}>
          Create {isCreating && <Spinner />}
        </Button>
      </DialogFooter>
      <DialogCloseTrigger
        onClick={() => handleCreateDatabaseModalVisibility(false)}
      />
    </DialogContent>
  );
};
