import { Badge, Button, Table, Text } from '@chakra-ui/react';
import { Icons } from '../../../../common/assets/icons';
import { COLORS } from '../../../../common/constants';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../../common/components/ui/menu';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../../../common/routes';
import { PreResolutionProject } from '@/api/projects/contracts';
import { InviteToProjectModal } from '@/common/components/modals';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { DialogRoot } from '@/common/components/ui/dialog';
import { deleteProjectRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';

type TDatabaseTableRowProps = {
  item: PreResolutionProject;
  onDelete?: () => void;
};

const DatabaseTableRow: FC<TDatabaseTableRowProps> = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const currentProject = useMemo(() => {
    return { avatarColor: '', displayName: '', id: '', ...item.createdBy, projectId: item.id };
  }, [item]);

  const handleOpenInviteClick = useCallback(() => {
    if (!item.isPublic) {
      return;
    }
    setIsInviteModalOpen(true);
  }, [item.isPublic]);

  const handleCloseInviteClick = useCallback(() => {
    setIsInviteModalOpen(false);
  }, []);

  const handleDeleteProject = useCallback(async () => {
    try {
      const res = await deleteProjectRequest(item.id);

      if (res !== 'OK') {
        throw new Error('База данных не была удалена');
      }

      toaster.create({
        title: 'База данных удалена',
        type: 'info',
      });
      onDelete?.();
    } catch (e: any) {
      console.error(e);
      toaster.create({
        title: 'Ошибка при удалении базы данных',
        description: e?.message,
        type: 'error',
      });
    }
  }, [item.id, onDelete]);

  return (
    <>
      <Table.Row key={item.id}>
        <Table.Cell
          cursor={'pointer'}
          maxWidth={'3vw'}
          overflow={'auto'}
          onClick={() => navigate(Routing.projects.route(item.id))}
        >
          <Text>{item.title}</Text>
        </Table.Cell>
        <Table.Cell className="extended-proect-table-data">{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell className="extended-proect-table-data">{new Date(item.updatedAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell className="extended-proect-table-data">
          <Badge
            colorPalette={item.isPublic ? 'green' : 'orange'}
            size={'lg'}
            borderRadius={30}
            variant={'surface'}
            padding={'5px 10px'}
            textAlign={'center'}
          >
            <Icons.Dot color={item.isPublic ? 'green' : 'orange'} />
            <Text fontSize={'1.1em'} margin={'0 auto'}>
              {item.isPublic ? 'Открытый' : 'Приватный'}
            </Text>
          </Badge>
        </Table.Cell>

        <Table.Cell textAlign="end">
          <MenuRoot variant="solid">
            <MenuTrigger asChild>
              <Button variant={'ghost'}>
                <Icons.Dots color={COLORS.teal[400]} />
              </Button>
            </MenuTrigger>
            <MenuContent width={200} bg={COLORS.navy[900]}>
              <MenuItem value="edit" onClick={() => navigate(Routing.projects.route(item.id))}>
                Редактировать
              </MenuItem>

              <MenuItem
                value="invite"
                disabled={!item.isPublic}
                title={item.isPublic ? undefined : 'Нельзя поделиться приватным проектом'}
                onClick={handleOpenInviteClick}
              >
                Поделиться
              </MenuItem>

              <MenuItem
                value="delete"
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                onClick={handleDeleteProject}
              >
                Удалить
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Table.Cell>
      </Table.Row>
      {item.isPublic && (
        <DialogRoot
          open={isInviteModalOpen}
          closeOnInteractOutside={false}
          lazyMount
          unmountOnExit
          closeOnEscape={false}
          preventScroll={true}
        >
          <InviteToProjectModal
            projectOwnerData={currentProject}
            handleModalVisibility={handleCloseInviteClick}
            isOpen={isInviteModalOpen}
          />
        </DialogRoot>
      )}
    </>
  );
};

export default memo(DatabaseTableRow);
