import { Icons } from '@/common/assets/icons';
import { COLORS } from '@/common/constants';
import { HStack, Text } from '@chakra-ui/react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';

export type TableRowNodeProps = Node<
  {
    label: string;
    dataType: string;
    isNull: boolean;
    isPK: boolean;
  },
  'label' | 'dataType' | 'isNull' | 'isPK'
>;

export const TableRowNode: React.FC<NodeProps<TableRowNodeProps>> = ({ data }) => {
  return (
    <HStack
      alignItems={'center'}
      style={{
        padding: '5px 10px',
        borderTop: `1px solid ${COLORS.gray[700]}`,
        width: 360,
        height: '50px',
      }}
    >
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ background: COLORS.teal[600], width: 9, height: 9 }}
      />
      <HStack fontFamily={'monospace'} gap={7} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
        <HStack>
          {data.isPK && <Icons.PrimaryKey color={COLORS.teal[600]} iconWidth={12} iconHeight={12} />}
          <Text>{data.label}</Text>
        </HStack>
        <Text color={'orange'}>
          {data.dataType}
          {data.dataType && data.isNull && '?'}
        </Text>
      </HStack>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: COLORS.teal[600], width: 9, height: 9 }}
        id="right"
      />
    </HStack>
  );
};
