import { Badge, Button, Table, Text } from '@chakra-ui/react';
import { MOCK_ITEMS } from '../../../../tmp/mocks/mock-databases-items.mock';
import { StyledTableBody, StyledTableHeader } from './databases-table.styled';
import { Icons } from '../../../../common/assets/icons';
import { COLORS } from '../../../../common/constants';

export const DatabaseTable: React.FC = () => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height={'70vh'}>
      <Table.Root size="lg" stickyHeader striped={true}>
        <StyledTableHeader>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Database Name</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader>Updated At</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Settings</Table.ColumnHeader>
          </Table.Row>
        </StyledTableHeader>

        <StyledTableBody>
          {MOCK_ITEMS.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell maxWidth={'3vw'} overflow={'scroll'}>
                {item.databaseName}
              </Table.Cell>
              <Table.Cell>
                {new Date(item.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(item.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <Badge
                  colorPalette={item.status === 'private' ? 'orange' : 'green'}
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
                <Button variant={'ghost'}>
                  <Icons.Dots color={COLORS.teal[400]} />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </StyledTableBody>
      </Table.Root>
    </Table.ScrollArea>
  );
};
