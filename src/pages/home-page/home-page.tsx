import {
  Box,
  Heading,
  HStack,
  Text,
  Button,
  Input,
  Loader,
} from '@chakra-ui/react';
import { COLORS } from '../../common/constants';
import { DatabaseTable } from './components/table/databases-table';
import { InputGroup } from '../../common/components/ui/input-group';
import { Icons } from '../../common/assets/icons';
import { MOCK_ITEMS } from '../../tmp/mocks/mock-databases-items.mock';
import { useEffect, useState } from 'react';
import React from 'react';
import { DialogRoot, DialogTrigger } from '../../common/components/ui/dialog';
import { CreateDatabaseModel } from '../../common/components/modals';

export const HomePage: React.FC = () => {
  const [databases, setDatabases] = useState<
    Array<Record<string, string | number>> | undefined
  >(undefined);
  const [openCreateDatabaseModal, setOpenCreateDatabaseModal] = useState(false);

  const mockFetchData = async () => {
    const res = await new Promise<Array<Record<string, string | number>>>(
      (resolve) => {
        setTimeout(() => {
          resolve(MOCK_ITEMS);
        }, 3000);
      }
    );
    setDatabases(res);
  };

  const handleAddDatabase = async (data: Record<string, string | number>) => {
    if (databases) {
      const newItem = {
        id: Math.floor(Math.random() * 1000000),
        createdAt: new Date('2025-01-01').toISOString(),
        updatedAt: new Date('2025-02-01').toISOString(),
        ...data,
      };
      const updatedDatabases = await new Promise<
        Array<Record<string, string | number>>
      >((resolve) => {
        setTimeout(() => {
          resolve([newItem, ...databases]);
        }, 3000);
      });
      setDatabases(updatedDatabases);
    }
  };

  const handleCreateDatabaseModalVisibility = (isOpen: boolean) => {
    setOpenCreateDatabaseModal(isOpen);
  };

  useEffect(() => {
    mockFetchData();
  }, []);

  return (
    <>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'30px'}
      >
        <Box>
          <Heading size={'3xl'}>Database list</Heading>
          {databases && (
            <Text color={COLORS.gray[600]}>{databases.length} databases</Text>
          )}
        </Box>
        <HStack>
          <InputGroup
            flex="3"
            endElement={<Icons.Search color={COLORS.teal[400]} />}
          >
            <Input
              placeholder="Search"
              borderRadius={30}
              bg={COLORS.navy[900]}
              disabled={!databases?.length}
            />
          </InputGroup>
          <DialogRoot
            lazyMount
            unmountOnExit
            open={openCreateDatabaseModal}
            onOpenChange={(e) => handleCreateDatabaseModalVisibility(e.open)}
          >
            <DialogTrigger asChild>
              <Button variant="surface" borderRadius={30} disabled={!databases}>
                New database
              </Button>
            </DialogTrigger>
            <CreateDatabaseModel
              onCreate={handleAddDatabase}
              handleCreateDatabaseModalVisibility={
                handleCreateDatabaseModalVisibility
              }
            />
          </DialogRoot>
        </HStack>
      </HStack>
      {databases ? <DatabaseTable items={databases} /> : <Loader />}
    </>
  );
};
