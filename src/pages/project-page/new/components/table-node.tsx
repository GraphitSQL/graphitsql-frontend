import { FC, memo, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { COLORS } from '@/common/constants';
import { LuKey } from 'react-icons/lu';
import { Editable, EditableValueChangeDetails } from '@chakra-ui/react';

export const TableNode: FC<NodeProps> = memo(({ data, id }: any) => {
  const reactFlow = useReactFlow();

  const onValueCommit = useCallback((details: EditableValueChangeDetails, colId: string, key: string) => {
    reactFlow.updateNodeData(id, {
      ...data,
      columns: data.columns.map((column: any) => {
        if (column.id === colId) {
          return { ...column, [key]: details.value };
        }
        return column;
      }),
    });
  }, []);

  const handleChangeDbLabel = useCallback((details: EditableValueChangeDetails) => {
    reactFlow.updateNodeData(id, { ...data, name: details.value });
  }, []);

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
                  onValueCommit={(details) => onValueCommit(details, column.id, 'name')}
                >
                  <Editable.Preview />
                  <Editable.Input />
                </Editable.Root>
              </div>
              <div className="column-name__type">
                <Editable.Root
                  defaultValue={column.type}
                  activationMode="dblclick"
                  selectOnFocus={false}
                  onValueCommit={(details) => onValueCommit(details, column.id, 'type')}
                >
                  <Editable.Preview />
                  <Editable.Input />
                </Editable.Root>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
