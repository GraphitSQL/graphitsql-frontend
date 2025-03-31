import { EmptyState, Table, VStack } from '@chakra-ui/react';
import { StyledIndicator, StyledTableBody, StyledTableHeader, StyledScrollArea } from './databases-table.styled';
import { Icons } from '../../../../common/assets/icons';
import { COLORS } from '../../../../common/constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PreResolutionProject } from '@/api/projects/contracts';
import { useCallback } from 'react';
import DatabaseTableRow from './database-table-row';

type DatabaseTableProps = {
  items: Array<PreResolutionProject>;
  fetchData: () => void;
  fetchMore: () => void;
  dbCount: number;
  searchValue: string;
};

export const DatabaseTable: React.FC<DatabaseTableProps> = ({ items, fetchData, fetchMore, dbCount, searchValue }) => {
  const onDelete = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {items.length ? (
        <StyledScrollArea id="scrollableDiv">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMore}
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
                  <DatabaseTableRow key={item.id} item={item} onDelete={onDelete} />
                ))}
              </StyledTableBody>
            </Table.Root>
          </InfiniteScroll>
        </StyledScrollArea>
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
