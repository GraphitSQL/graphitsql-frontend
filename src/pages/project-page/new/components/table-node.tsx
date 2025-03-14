import { FC, memo, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { COLORS } from '@/common/constants';
import { LuKey, LuPlus } from 'react-icons/lu';
import { Button, Editable, EditableValueChangeDetails } from '@chakra-ui/react';
import { TableColumnMenu } from './table-column-menu';
import { generateColumn } from '../utils';

export const TableNode: FC<NodeProps> = memo(({ data, id }: any) => {
  const reactFlow = useReactFlow();

  const onValueCommit = useCallback(
    (value: string | boolean, colId: string, key: string) => {
      reactFlow.updateNodeData(
        id,
        {
          ...data,
          columns: data.columns.map((column: any) => {
            if (column.id === colId) {
              return { ...column, [key]: value };
            }
            return column;
          }),
        },
        { replace: true }
      );
    },
    [data.columns]
  );

  const onColumnDelete = useCallback(
    (colId: string) => {
      reactFlow.updateNodeData(
        id,
        {
          ...data,
          columns: [...data.columns].filter((column: any) => column.id !== colId),
        },
        { replace: true }
      );
    },
    [data.columns]
  );

  const onColumnAdd = useCallback(() => {
    reactFlow.updateNodeData(id, {
      ...data,
      columns: [...data.columns, generateColumn()],
    });
  }, [data.columns]);

  const handleChangeDbLabel = useCallback(
    (details: EditableValueChangeDetails) => {
      reactFlow.updateNodeData(id, { ...data, name: details.value }, { replace: true });
    },
    [data.columns]
  );

  return (
    <div className={'table'}>
      <Editable.Root
        className="table__name"
        style={{ backgroundColor: data.schemaColor, justifyContent: 'center' }}
        defaultValue={data.name}
        activationMode="dblclick"
        selectOnFocus={false}
        onValueCommit={handleChangeDbLabel}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>

      <div className="table__columns">
        {data.columns.map((column: any) => (
          <div key={column.id} className={'column-name'}>
            <Handle type={column.handleType} position={Position.Right} id={`${column.id}-right`} />

            {<Handle type={column.handleType} position={Position.Left} id={`${column.id}-left`} />}

            <div className="column-name__inner">
              <div className="column-name__name">
                {column.key && <LuKey color={COLORS.teal[600]} className="key-icon" />}
                <Editable.Root
                  defaultValue={column.name}
                  activationMode="dblclick"
                  selectOnFocus={false}
                  onValueCommit={(details) => onValueCommit(details.value, column.id, 'name')}
                >
                  <Editable.Preview />
                  <Editable.Input />
                </Editable.Root>
              </div>
              <div className="column-name__type">
                <div className="column-name__type-inner">
                  <Editable.Root
                    className="column-name__type"
                    defaultValue={column.type}
                    activationMode="dblclick"
                    selectOnFocus={false}
                    onValueCommit={(details) => onValueCommit(details.value, column.id, 'type')}
                  >
                    <Editable.Preview />
                    <Editable.Input />
                  </Editable.Root>

                  <TableColumnMenu
                    column={column}
                    onValueCommit={onValueCommit}
                    onColumnDelete={onColumnDelete}
                    key={`menu-${column.id}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="table__footer">
        <Button size={'xs'} variant={'surface'} onClick={onColumnAdd}>
          <LuPlus />
        </Button>
      </div>
    </div>
  );
});
