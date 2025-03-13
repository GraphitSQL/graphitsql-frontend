import { useState, FC, memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { COLORS } from '@/common/constants';
import { LuKey } from 'react-icons/lu';
import { Editable, EditableValueChangeDetails } from '@chakra-ui/react';

export const TableNode: FC<NodeProps> = memo(({ data, id }: any) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const reactFlow = useReactFlow();

  const columnClass = ({ selectedColumn, columnName }: { selectedColumn: string; columnName: string }) => {
    const classes = ['column-name'];

    if (selectedColumn === columnName) {
      classes.push('column-name--selected');
    }

    return classes.join(' ');
  };

  const onValueCommit = (details: EditableValueChangeDetails, colId: string) => {
    const node = reactFlow.getNode(id);
    console.log('nodee', node, colId);
    reactFlow.updateNodeData(id, {
      ...data,
      columns: data.columns.map((column: any) => {
        if (column.id === colId) {
          return { ...column, name: details.value };
        }
        return column;
      }),
    });
  };

  return (
    <div className={'table'}>
      <div className="table__name" style={{ backgroundColor: data.schemaColor }}>
        {data.name}
      </div>

      <div className="table__columns">
        {data.columns.map((column: any, index: any) => (
          <div
            key={index}
            className={columnClass({ selectedColumn, columnName: column.name })}
            onMouseEnter={() => {
              setSelectedColumn(column.name);
            }}
            onMouseLeave={() => setSelectedColumn('')}
          >
            <Handle type={column.handleType} position={Position.Right} id={`${column.id}-right`} />

            {<Handle type={column.handleType} position={Position.Left} id={`${column.id}-left`} />}

            <div className="column-name__inner">
              <div className="column-name__name">
                {column.key && <LuKey color={COLORS.teal[600]} className="key-icon" />}
                <Editable.Root
                  defaultValue={column.name}
                  activationMode="dblclick"
                  selectOnFocus={false}
                  onValueCommit={(details) => onValueCommit(details, column.id)}
                >
                  <Editable.Preview />
                  <Editable.Input />
                </Editable.Root>
              </div>
              <div className="column-name__type">{column.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
