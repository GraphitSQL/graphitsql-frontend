import { FC, memo, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow, Node } from '@xyflow/react';
import { COLORS } from '@/common/constants';
import { LuKey, LuPlus } from 'react-icons/lu';
import { Button, Editable, EditableValueChangeDetails } from '@chakra-ui/react';
import { TableColumnMenu } from './table-column-menu';
import { generateColumn } from '../utils';
import { useYjs } from '@/common/providers/YjsProvider';

export const TableNode: FC<NodeProps> = memo(({ data, id, dragging }: any) => {
  const reactFlow = useReactFlow();
  const { doc } = useYjs();

  const updateNodeWithYjs = useCallback(
    (newData: any) => {
      if (!doc) {
        // Fallback to direct update if Yjs is not available
        reactFlow.updateNodeData(id, newData, { replace: true });
        return;
      }

      const sharedNodes = doc.getArray<Node>('nodes');
      const nodes = sharedNodes.toArray();
      const nodeIndex = nodes.findIndex((node: Node) => node.id === id);

      if (nodeIndex >= 0) {
        doc.transact(() => {
          const currentNode = nodes[nodeIndex] as any;
          const updatedNode = {
            ...currentNode,
            data: {
              ...currentNode.data,
              ...newData,
            },
          };
          sharedNodes.delete(nodeIndex, 1);
          sharedNodes.insert(nodeIndex, [updatedNode as Node]);
        });
      }
    },
    [doc, id, reactFlow]
  );

  const onValueCommit = useCallback(
    (value: string | boolean, colId: string, key: string) => {
      const updatedData = {
        ...data,
        columns: data.columns.map((column: any) => {
          if (column.id === colId) {
            return { ...column, [key]: value };
          }
          return column;
        }),
      };

      updateNodeWithYjs(updatedData);
    },
    [data, updateNodeWithYjs]
  );

  const onColumnDelete = useCallback(
    (colId: string) => {
      const updatedData = {
        ...data,
        columns: [...data.columns].filter((column: any) => column.id !== colId),
      };

      updateNodeWithYjs(updatedData);
    },
    [data, updateNodeWithYjs]
  );

  const onColumnAdd = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      const newColumn = generateColumn();

      const updatedData = {
        ...data,
        columns: [...data.columns, newColumn],
      };

      updateNodeWithYjs(updatedData);
    },
    [data, updateNodeWithYjs]
  );

  const handleChangeDbLabel = useCallback(
    (details: EditableValueChangeDetails) => {
      updateNodeWithYjs({ ...data, name: details.value });
    },
    [data, updateNodeWithYjs]
  );

  return (
    <div className={'table'}>
      <Editable.Root
        className="table__name"
        style={{
          backgroundColor: data.appearance?.schemaColor,
          justifyContent: 'center',
          color: data.appearance?.color,
        }}
        defaultValue={data.name}
        activationMode="dblclick"
        selectOnFocus={false}
        onValueCommit={handleChangeDbLabel}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>

      <div className="table__columns nodrag">
        {data.columns.map((column: any) => (
          <div key={column.id} className={'column-name'}>
            <Handle type={column.handleType} position={Position.Right} id={`${column.id}-right`} />

            {<Handle type={column.handleType} position={Position.Left} id={`${column.id}-left`} />}

            {!dragging && (
              <div className={'column-name__inner'}>
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
            )}
          </div>
        ))}
      </div>

      <div className="table__footer nodrag">
        <Button size={'xs'} variant={'surface'} onClick={onColumnAdd}>
          <LuPlus />
        </Button>
      </div>
    </div>
  );
});
