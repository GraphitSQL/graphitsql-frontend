import { type Node } from '@xyflow/react';

export type TTableNodeData = {
  label: string;
  childrenCount: number;
  color: string;
};

export type TTableRowNodeData = {
  label: string;
  dataType: string;
  isNull: boolean;
  isPK: boolean;
};

export type TTableNode = Node<TTableNodeData>;
export type TTableRowNode = Node<TTableRowNodeData>;

export type PreResolutionNode = TTableNode | TTableRowNode;
export type Nodes = PreResolutionNode[];

export type ProjectNote = {
  id: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatarColor: string;
  };
  text: string;
  isResolved: boolean;
};
