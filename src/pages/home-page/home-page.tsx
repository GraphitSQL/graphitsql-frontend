import { Loader } from '@chakra-ui/react';
import { DatabaseTable } from './components/table/databases-table';
import { useCallback, useState } from 'react';
import React from 'react';
import { toaster } from '../../common/components/ui/toaster';
import { getProjectListRequest } from '@/api/projects';
import { CreateProjectResponse, PreResolutionProject } from '@/api/projects/contracts';
import Header from './components/header';

export const HomePage: React.FC = () => {
  const [databases, setDatabases] = useState<PreResolutionProject[] | undefined>(undefined);
  const [dbCount, setDbCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const fetchData = useCallback(
    async (props?: { skip?: number; take?: number; search?: string }) => {
      const { search, skip, take } = props ?? {};
      try {
        const res = await getProjectListRequest({
          skip: skip ?? 0,
          take: take ?? 50,
          search: search ?? searchValue,
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
    },
    [searchValue]
  );

  const handleFetchMore = useCallback(async () => {
    try {
      const skip = databases?.length ?? 0;
      const res = await getProjectListRequest({
        skip,
        take: 10,
        ...(searchValue && { search: searchValue }),
      });
      const { count, projects } = res;
      setDbCount(count);
      setDatabases((prev) => [...(prev ?? []), ...projects]);
    } catch (e: any) {
      toaster.create({
        title: 'Ошибка при получении данных',
        description: e?.message,
        type: 'error',
      });
    }
  }, [searchValue, databases?.length]);

  const handleAddDatabase = async (data: CreateProjectResponse) => {
    try {
      const databasesData = databases ? [...databases] : [];

      databasesData.unshift(data);
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

  const onDebouncedSearchChange = useCallback(
    (searchString: string) => {
      fetchData({ search: searchString });
      setSearchValue(searchString);
    },
    [fetchData]
  );

  return (
    <>
      <Header
        dbCount={dbCount}
        noDatabases={!databases}
        onAddDatabase={handleAddDatabase}
        onDebouncedSearchChange={onDebouncedSearchChange}
      />
      {databases ? (
        <DatabaseTable
          items={databases}
          fetchMore={handleFetchMore}
          fetchData={fetchData}
          dbCount={dbCount}
          searchValue={searchValue}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
