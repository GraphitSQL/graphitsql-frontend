import { Nodes } from '@/pages/project-page/types';

export const MOCK_INIT_NODES: Nodes = [
  {
    id: 'A',
    type: 'table',
    data: { label: 'users', childrenCount: 3, color: 'teal' },
    position: { x: 70, y: 70 },
  },
  {
    id: 'B',
    type: 'custom',
    data: { label: 'id', dataType: 'int', isNull: false, isPK: true },
    position: { x: 0, y: 50 },
    parentId: 'A',
    extent: 'parent',
    draggable: false,
  },
  {
    id: 'C',
    data: {
      label: 'name',
      dataType: 'varchar(200)',
      isNull: false,
      isPK: false,
    },
    position: { x: 0, y: 100 },
    parentId: 'A',
    extent: 'parent',
    type: 'custom',
    draggable: false,
  },
  {
    id: 'C1',
    data: { label: 'email', dataType: 'text', isNull: true, isPK: false },
    position: { x: 0, y: 150 },
    parentId: 'A',
    extent: 'parent',
    type: 'custom',
    draggable: false,
  },
  {
    id: 'D',
    type: 'table',
    data: {
      label: 'posts',
      childrenCount: 2,
      color: 'hotpink',
    },
    position: { x: 570, y: 230 },
  },
  {
    id: 'E1',
    data: { label: 'id', dataType: 'int', isNull: false, isPK: true },
    position: { x: 0, y: 50 },
    parentId: 'D',
    extent: 'parent',
    type: 'custom',
    draggable: false,
  },
  {
    id: 'E',
    data: { label: 'userId', dataType: 'int', isNull: false, isPK: false },
    position: { x: 0, y: 100 },
    parentId: 'D',
    extent: 'parent',
    type: 'custom',
    draggable: false,
  },
];

export const MOCK_INIT_EDGES = [
  {
    id: 'b-c',
    source: 'B',
    target: 'E',
    type: 'custom',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
];
