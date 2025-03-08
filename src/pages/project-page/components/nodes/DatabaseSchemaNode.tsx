// import React, { ReactNode } from 'react';
// import { BaseNode } from '@/registry/components/base-node';
// import { TableBody, TableRow, TableCell } from '@/components/ui/table';

// /* DATABASE SCHEMA NODE HEADER ------------------------------------------------ */
// /**
//  * A container for the database schema node header.
//  */
// export type DatabaseSchemaNodeHeaderProps = {
//   children?: ReactNode;
// };

// export const DatabaseSchemaNodeHeader = ({ children }: DatabaseSchemaNodeHeaderProps) => {
//   return (
//     <h2 className="rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
//       {children}
//     </h2>
//   );
// };

// /* DATABASE SCHEMA NODE BODY -------------------------------------------------- */
// /**
//  * A container for the database schema node body that wraps the table.
//  */
// export type DatabaseSchemaNodeBodyProps = {
//   children?: ReactNode;
// };

// export const DatabaseSchemaNodeBody = ({ children }: DatabaseSchemaNodeBodyProps) => {
//   return (
//     <table className="border-spacing-10 overflow-visible">
//       <TableBody>{children}</TableBody>
//     </table>
//   );
// };

// /* DATABASE SCHEMA TABLE ROW -------------------------------------------------- */
// /**
//  * A wrapper for individual table rows in the database schema node.
//  */

// export type DatabaseSchemaTableRowProps = {
//   children: ReactNode;
//   className?: string;
// };

// export const DatabaseSchemaTableRow = ({ children, className }: DatabaseSchemaTableRowProps) => {
//   return <TableRow className={`relative text-xs ${className || ''}`}>{children}</TableRow>;
// };

// /* DATABASE SCHEMA TABLE CELL ------------------------------------------------- */
// /**
//  * A simplified table cell for the database schema node.
//  * Renders static content without additional dynamic props.
//  */
// export type DatabaseSchemaTableCellProps = {
//   className?: string;
//   children?: ReactNode;
// };

// export const DatabaseSchemaTableCell = ({ className, children }: DatabaseSchemaTableCellProps) => {
//   return <TableCell className={className}>{children}</TableCell>;
// };

// /* DATABASE SCHEMA NODE ------------------------------------------------------- */
// /**
//  * The main DatabaseSchemaNode component that wraps the header and body.
//  * It maps over the provided schema data to render rows and cells.
//  */
// export type DatabaseSchemaNodeProps = {
//   className?: string;
//   selected?: boolean;
//   children?: ReactNode;
// };

// export const DatabaseSchemaNode = ({ className, selected, children }: DatabaseSchemaNodeProps) => {
//   return (
//     <BaseNode className={className} selected={selected}>
//       {children}
//     </BaseNode>
//   );
// };

import { memo } from 'react';
import { Position } from '@xyflow/react';
import { LabeledHandle } from '@/components/labeled-handle';
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from '@/components/database-schema-node';
import { NodeWrapper } from './database-node.styled';
import { COLORS } from '@/common/constants';

export type DatabaseSchemaNodeData = {
  selected?: boolean;
  data: {
    label: string;
    color: string;
    schema: { title: string; type: string; id: string; isPK: boolean; isNull: boolean }[];
  };
};

const DatabaseSchemaDemo = memo(({ data, selected }: DatabaseSchemaNodeData) => {
  return (
    <NodeWrapper>
      <DatabaseSchemaNode className="p-0" selected={selected}>
        <DatabaseSchemaNodeHeader color={data.color}>{data.label}</DatabaseSchemaNodeHeader>
        <DatabaseSchemaNodeBody>
          {data.schema.map((entry) => (
            <DatabaseSchemaTableRow key={entry.id}>
              <DatabaseSchemaTableCell className="pl-0 pr-6 font-light">
                <LabeledHandle
                  id={entry.id}
                  title={entry.title}
                  type="target"
                  position={Position.Left}
                  style={{ background: COLORS.teal[600], width: 9, height: 9 }}
                  labelProps={{ isPK: entry.isPK }}
                />
              </DatabaseSchemaTableCell>
              <DatabaseSchemaTableCell className="pr-0 font-thin">
                <LabeledHandle
                  id={entry.id}
                  title={entry.type}
                  type="source"
                  position={Position.Right}
                  className="p-0"
                  handleClassName="p-0"
                  labelClassName="p-0 w-full pr-3 text-right"
                  style={{ background: COLORS.teal[600], width: 9, height: 9 }}
                  labelProps={{ color: 'orange' }}
                />
              </DatabaseSchemaTableCell>
            </DatabaseSchemaTableRow>
          ))}
        </DatabaseSchemaNodeBody>
      </DatabaseSchemaNode>
    </NodeWrapper>
  );
});

export default DatabaseSchemaDemo;
