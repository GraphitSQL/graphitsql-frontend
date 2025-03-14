import { v4 as uuidv4 } from 'uuid';
import { randomColor } from '@chakra-ui/theme-tools';

export function generateNode() {
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
      schemaColor: randomColor(),
    },
    position: {
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
    },
    type: 'table',
  };
}
