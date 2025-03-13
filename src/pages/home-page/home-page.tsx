import { Heading, HStack, Text, Button, Input, Loader } from '@chakra-ui/react';
import { COLORS } from '../../common/constants';
import { DatabaseTable } from './components/table/databases-table';
import { InputGroup } from '../../common/components/ui/input-group';
import { Icons } from '../../common/assets/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import { DialogRoot, DialogTrigger } from '../../common/components/ui/dialog';
import { CreateDatabaseModel } from '../../common/components/modals';
import { toaster } from '../../common/components/ui/toaster';
import { StyledTitleContainer } from './components/home-page.styled';
import { createProjectRequest, deleteProjectRequest, getProjectListRequest } from '@/api/projects';
import { CreateProjectRequest, PreResolutionListProject } from '@/api/projects/contracts';
import useDebounce from '@/common/hooks/useDebounce';

export const HomePage: React.FC = () => {
  const [databases, setDatabases] = useState<PreResolutionListProject[] | undefined>(undefined);
  const [dbCount, setDbCount] = useState(0);
  const [openCreateDatabaseModal, setOpenCreateDatabaseModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [debouncedSearchValues, setDebouncedValue] = useDebounce(searchValue, 1000);

  const mockFetchData = async (skip?: number, take?: number, search?: string) => {
    try {
      const res = await getProjectListRequest({
        skip: skip ?? 0,
        take: take ?? 50,
        search: search ?? debouncedSearchValues,
      });
      const { count, projects } = res;
      setDbCount(count);
      setDatabases(projects);
    } catch (e: any) {
      toaster.create({
        title: 'Ошибка при получении данных',
        description: e?.message,
        type: 'error',
      });
    }
  };

  const handleFetchMore = async () => {
    try {
      const prevDbs = databases ?? [];
      const res = await getProjectListRequest({
        skip: prevDbs.length,
        take: 10,
        ...(debouncedSearchValues && { search: debouncedSearchValues }),
      });
      const { count, projects } = res;
      setDbCount(count);
      setDatabases([...prevDbs, ...projects]);
    } catch (e: any) {
      toaster.create({
        title: 'Ошибка при получении данных',
        description: e?.message,
        type: 'error',
      });
    }
  };

  const handleAddDatabase = async (data: CreateProjectRequest) => {
    try {
      const databasesData = databases ? [...databases] : [];
      const newProject = await createProjectRequest(data);
      if (debouncedSearchValues) {
        setSearchValue('');
        setDebouncedValue('');
        return;
      }
      databasesData.unshift(newProject);
      setDatabases(databasesData);
      setDbCount((prev) => prev + 1);
    } catch (e: any) {
      toaster.create({
        title: 'Ошибка при создании базы данных',
        description: e?.message,
        type: 'error',
      });
    }
  };

  const handleDeleteDatabase = async (databaseId: string) => {
    try {
      if (databases) {
        const visibleDbCount = databases.length;
        setDatabases((els) => els?.filter((el) => el.id !== databaseId));
        setDbCount((prev) => prev - 1);
        const res = await deleteProjectRequest(databaseId);

        if (res !== 'OK') {
          mockFetchData(visibleDbCount, visibleDbCount);
          throw new Error('База данных не была удалена');
        }

        toaster.create({
          title: 'База данных удалена',
          type: 'info',
        });
        const { projects } = await getProjectListRequest({ skip: visibleDbCount - 1, take: 1 });
        setDatabases((prev: any) => [...prev, ...projects]);
      }
    } catch (e: any) {
      console.error(e);
      toaster.create({
        title: 'Ошибка при удалении базы данных',
        description: e?.message,
        type: 'error',
      });
    }
  };

  const handleCreateDatabaseModalVisibility = (isOpen: boolean) => {
    setOpenCreateDatabaseModal(isOpen);
  };

  useEffect(() => {
    mockFetchData();
  }, [debouncedSearchValues]);

  return (
    <>
      <HStack justifyContent={'space-between'} alignItems={'center'} marginBottom={'30px'}>
        <StyledTitleContainer>
          <Heading size={'3xl'}>Список баз даных</Heading>
          {databases && (
            <Text color={COLORS.gray[600]}>
              Всего {debouncedSearchValues && 'найдено'} баз: {dbCount}
            </Text>
          )}
        </StyledTitleContainer>
        <HStack>
          <InputGroup flex="3" endElement={<Icons.Search color={COLORS.teal[400]} />}>
            <Input
              value={searchValue}
              placeholder="Поиск..."
              borderRadius={30}
              bg={COLORS.navy[900]}
              disabled={!databases?.length && !searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </InputGroup>
          <DialogRoot
            lazyMount
            unmountOnExit
            restoreFocus={false}
            open={openCreateDatabaseModal}
            onOpenChange={(e) => handleCreateDatabaseModalVisibility(e.open)}
          >
            <DialogTrigger asChild>
              <Button variant="surface" borderRadius={30} disabled={!databases}>
                Создать
              </Button>
            </DialogTrigger>
            <CreateDatabaseModel
              onCreate={handleAddDatabase}
              handleCreateDatabaseModalVisibility={handleCreateDatabaseModalVisibility}
            />
          </DialogRoot>
        </HStack>
      </HStack>
      {databases ? (
        <DatabaseTable
          items={databases}
          handleDeleteDatabase={handleDeleteDatabase}
          fetchData={handleFetchMore}
          dbCount={dbCount}
          searchValue={debouncedSearchValues}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
