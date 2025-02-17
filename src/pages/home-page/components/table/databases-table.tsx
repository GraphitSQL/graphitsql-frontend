import {
  Badge,
  Button,
  EmptyState,
  Link,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  StyledIndicator,
  StyledTableBody,
  StyledTableHeader,
} from './databases-table.styled';
import { Icons } from '../../../../common/assets/icons';
import { COLORS } from '../../../../common/constants';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '../../../../common/components/ui/menu';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../../../common/routes';

type DatabaseTableProps = {
  items: Array<Record<string, string | number>>;
  handleDeleteDatabase: (id: number) => void;
};

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  items,
  handleDeleteDatabase,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {items.length ? (
        <Table.ScrollArea borderWidth="1px" rounded="md" height={'70vh'}>
          <Table.Root size="lg" stickyHeader striped={true}>
            <StyledTableHeader>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>Database Name</Table.ColumnHeader>
                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                <Table.ColumnHeader>Updated At</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Settings
                </Table.ColumnHeader>
              </Table.Row>
            </StyledTableHeader>

            <StyledTableBody>
              {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell maxWidth={'3vw'} overflow={'scroll'}>
                    <Link
                      variant="plain"
                      color={'white'}
                      href={Routing.projects.route(item.id)}
                    >
                      {item.databaseName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        item.status === 'private' ? 'orange' : 'green'
                      }
                      size={'lg'}
                      borderRadius={30}
                      variant={'surface'}
                      padding={'5px 7px'}
                      width={20}
                      textAlign={'center'}
                    >
                      <Icons.Dot
                        color={item.status === 'private' ? 'orange' : 'green'}
                      />
                      <Text fontSize={'1.1em'} margin={'0 auto'}>
                        {item.status}
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
                        <MenuItem
                          value="edit"
                          onClick={() =>
                            navigate(Routing.projects.route(item.id))
                          }
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          value="delete"
                          color="fg.error"
                          _hover={{ bg: 'bg.error', color: 'fg.error' }}
                          onClick={() => handleDeleteDatabase(Number(item.id))}
                        >
                          Delete
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  </Table.Cell>
                </Table.Row>
              ))}
            </StyledTableBody>
          </Table.Root>
        </Table.ScrollArea>
      ) : (
        <EmptyState.Root>
          <EmptyState.Content height={'50vh'}>
            <StyledIndicator>
              <Icons.Databases.DatabaseOff color={COLORS.teal[300]} />
            </StyledIndicator>
            <VStack textAlign="center">
              <EmptyState.Title>Your database list is empty</EmptyState.Title>
              <EmptyState.Description>
                Add your first database by clicking the following button on nav
                bar
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </>
  );
};
