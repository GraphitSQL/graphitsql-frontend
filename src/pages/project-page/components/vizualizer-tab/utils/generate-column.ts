import { v4 as uuidv4 } from 'uuid';

export function generateColumn() {
  return {
    id: uuidv4(),
    name: 'column_name',
    type: 'datatype',
  };
}
