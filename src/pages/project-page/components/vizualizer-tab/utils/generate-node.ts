import { v4 as uuidv4 } from 'uuid';
import { randomColor } from '@chakra-ui/theme-tools';
import { getContrastingTextColor } from './text';

export function generateNode({ x, y }: { x?: number; y?: number }) {
  const tableSchemaColor = randomColor();
  const tableColor = getContrastingTextColor(tableSchemaColor);
  return {
    id: uuidv4(),
    data: {
      name: 'new_table',
      columns: [
        {
          id: uuidv4(),
          name: 'id',
          description: 'Unique identifier.',
          key: true,
          type: 'integer',
        },
      ],
      appearance: {
        schemaColor: tableSchemaColor,
        color: tableColor,
      },
    },
    position: {
      x: x ?? (Math.random() - 0.5) * 150,
      y: y ?? (Math.random() - 0.5) * 150,
    },
    type: 'table',
  };
}
