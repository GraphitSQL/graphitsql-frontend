import { Badge, Button, EmptyState, Table, Text, VStack } from '@chakra-ui/react';
import { StyledIndicator, StyledTableBody, StyledTableHeader, StyledScrollArea } from './databases-table.styled';
import { Icons } from '../../../../common/assets/icons';
import { COLORS } from '../../../../common/constants';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../../common/components/ui/menu';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../../../common/routes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PreResolutionProject } from '@/api/projects/contracts';
import { InviteToProjectModal } from '@/common/components/modals';
import { useState } from 'react';
import { DialogRoot } from '@/common/components/ui/dialog';

type DatabaseTableProps = {
  items: Array<PreResolutionProject>;
  handleDeleteDatabase: (id: string) => void;
  fetchData: () => void;
  dbCount: number;
  searchValue: string;
};

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  items,
  handleDeleteDatabase,
  fetchData,
  dbCount,
  searchValue,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(undefined);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {items.length ? (
        <>
          <StyledScrollArea id="scrollableDiv">
            <InfiniteScroll
              dataLength={items.length}
              next={fetchData}
              hasMore={dbCount > items.length}
              loader={<h4>Загружаем данные...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <Table.Root size="lg" stickyHeader striped={true}>
                <StyledTableHeader>
                  <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>Название</Table.ColumnHeader>
                    <Table.ColumnHeader className="extended-proect-table-data">Дата создания</Table.ColumnHeader>
                    <Table.ColumnHeader className="extended-proect-table-data">Дата обновления</Table.ColumnHeader>
                    <Table.ColumnHeader className="extended-proect-table-data">Статус</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Настройки</Table.ColumnHeader>
                  </Table.Row>
                </StyledTableHeader>

                <StyledTableBody>
                  {items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell
                        cursor={'pointer'}
                        maxWidth={'3vw'}
                        overflow={'auto'}
                        onClick={() => navigate(Routing.projects.route(item.id))}
                      >
                        <Text>{item.title}</Text>
                      </Table.Cell>
                      <Table.Cell className="extended-proect-table-data">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell className="extended-proect-table-data">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </Table.Cell>
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
                              onClick={() => {
                                if (!item.isPublic) return;
                                setCurrentProject({
                                  ...item.createdBy,
                                  projectId: item.id,
                                });
                                onOpen();
                              }}
                            >
                              Поделиться
                            </MenuItem>

                            <MenuItem
                              value="delete"
                              color="fg.error"
                              _hover={{ bg: 'bg.error', color: 'fg.error' }}
                              onClick={() => handleDeleteDatabase(item.id)}
                            >
                              Удалить
                            </MenuItem>
                          </MenuContent>
                        </MenuRoot>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </StyledTableBody>
              </Table.Root>
            </InfiniteScroll>
          </StyledScrollArea>

          <DialogRoot
            open={open}
            closeOnInteractOutside={false}
            lazyMount
            unmountOnExit
            closeOnEscape={false}
            preventScroll={true}
          >
            {currentProject && (
              <InviteToProjectModal projectOwnerData={currentProject} handleModalVisibility={onClose} />
            )}
          </DialogRoot>
        </>
      ) : (
        <EmptyState.Root>
          <EmptyState.Content height={'50vh'}>
            <StyledIndicator>
              <Icons.Databases.DatabaseOff color={COLORS.teal[300]} />
            </StyledIndicator>
            <VStack textAlign="center">
              <EmptyState.Title>
                {searchValue ? 'Баз данных с таким названием не найдено' : 'Список баз данных пуст'}
              </EmptyState.Title>
              {!searchValue && (
                <EmptyState.Description>
                  Добавьте свою первую базу данных, нажав соответствующую кнопку в навигационной панели
                </EmptyState.Description>
              )}
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </>
  );
};
