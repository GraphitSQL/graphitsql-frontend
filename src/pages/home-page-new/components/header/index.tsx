import { ChangeEvent, FC, useCallback } from 'react';
import { memo, useEffect, useState } from 'react';

import { HStack, Input } from '@chakra-ui/react';

import { CreateProjectResponse } from '@/api/projects/contracts';

import { COLORS } from '@/common/constants';
import useDebounce from '@/common/hooks/useDebounce';

import { InputGroup } from '@/common/components/ui/input-group';
import { Icons } from '@/common/assets/icons';
import CreateDatabaseDialog from './CreateDatabaseDialog';
import DatabasesInfo from './DatabasesInfo';

type THeaderProps = {
  dbCount: number;
  noDatabases: boolean;
  onDebouncedSearchChange?: (search: string) => void;
  onSearchChange?: (search: string) => void;
  onAddDatabase: (database: CreateProjectResponse) => void;
};

const Header: FC<THeaderProps> = ({ dbCount, noDatabases, onDebouncedSearchChange, onSearchChange, onAddDatabase }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebounceSearch] = useDebounce(search, 1000);

  useEffect(() => {
    onSearchChange?.(search);
  }, [search]);

  useEffect(() => {
    onDebouncedSearchChange?.(debouncedSearch);
  }, [debouncedSearch]);

  const onSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleAddDatabase = useCallback(
    (data: CreateProjectResponse) => {
      setSearch('');
      setDebounceSearch('');
      onAddDatabase(data);
    },
    [onAddDatabase, setDebounceSearch]
  );

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} marginBottom={'30px'}>
      <DatabasesInfo dbCount={dbCount} noDatabases={noDatabases} withSearch={!!search} />
      <HStack>
        <InputGroup flex="3" endElement={<Icons.Search color={COLORS.teal[400]} />}>
          <Input
            value={search}
            placeholder="Поиск..."
            borderRadius={30}
            bg={COLORS.navy[900]}
            disabled={!dbCount && !search}
            onChange={onSearchInputChange}
          />
        </InputGroup>
        <CreateDatabaseDialog onAddDatabase={handleAddDatabase} disabled={noDatabases} />
      </HStack>
    </HStack>
  );
};

export default memo(Header);
