import { COLORS } from '@/common/constants';
import { Box, Heading } from '@chakra-ui/react';
import type { Node, NodeProps } from '@xyflow/react';

export type TableNodeProps = Node<
  { label: string; childrenCount: number; color: string },
  'label' | 'childrenCount'
>;

export const TableNode: React.FC<NodeProps<TableNodeProps>> = ({ data }) => {
  return (
    <Box
      style={{
        width: 360,
        height: Math.max(data.childrenCount * 50 + 50, 140),
        backgroundColor: COLORS.gray[800],
        borderRadius: 10,
        border: `1px solid ${COLORS.gray[700]}`,
      }}
    >
      <Box
        backgroundColor={data.color}
        height="50px"
        w="100%"
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottom: `1px solid ${COLORS.gray[700]}`,
          padding: '10px',
        }}
      >
        <Heading
          size="lg"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          maxWidth="300px"
          title={data.label}
        >
          {data.label}
        </Heading>
      </Box>
    </Box>
  );
};
