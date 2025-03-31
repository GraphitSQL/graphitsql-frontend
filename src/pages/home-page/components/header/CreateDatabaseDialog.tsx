import { FC, memo, useCallback, useState } from 'react';

import { Button } from '@chakra-ui/react';

import { DialogRoot, DialogTrigger } from '@/common/components/ui/dialog';
import { CreateDatabaseModal } from '@/common/components/modals';
import { CreateProjectRequest, CreateProjectResponse } from '@/api/projects/contracts';
import { createProjectRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';

type TCreateDatabaseDialogProps = {
  onAddDatabase: (data: CreateProjectResponse) => void;
  disabled?: boolean;
};

const CreateDatabaseDialog: FC<TCreateDatabaseDialogProps> = ({ onAddDatabase, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddDatabase = useCallback(
    async (data: CreateProjectRequest) => {
      try {
        const newProject = await createProjectRequest(data);
        onAddDatabase(newProject);
      } catch (e: any) {
        toaster.create({
          title: 'Ошибка при создании базы данных',
          description: e?.message,
          type: 'error',
        });
      }
    },
    [onAddDatabase]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <DialogRoot lazyMount unmountOnExit restoreFocus={false} open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button variant="surface" borderRadius={30} disabled={disabled}>
          Создать
        </Button>
      </DialogTrigger>
      <CreateDatabaseModal onCreate={handleAddDatabase} handleCreateDatabaseModalVisibility={toggleOpen} />
    </DialogRoot>
  );
};

export default memo(CreateDatabaseDialog);
