import { ReactNode } from 'react';
import { BaseNode } from '@/components/base-node';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Box, Heading } from '@chakra-ui/react';
import { COLORS } from '@/common/constants';

/* DATABASE SCHEMA NODE HEADER ------------------------------------------------ */
/**
 * A container for the database schema node header.
 */
export type DatabaseSchemaNodeHeaderProps = {
  children?: ReactNode;
  color?: string;
};

export const DatabaseSchemaNodeHeader = ({ children, color = 'teal' }: DatabaseSchemaNodeHeaderProps) => {
  return (
    <Box
      backgroundColor={color}
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottom: `1px solid ${COLORS.gray[700]}`,
        padding: '10px',
      }}
    >
      <Heading size="lg" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="300px">
        {children}
      </Heading>
    </Box>
    // <h2 className="rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
    //
    // </h2>
  );
};

/* DATABASE SCHEMA NODE BODY -------------------------------------------------- */
/**
 * A container for the database schema node body that wraps the table.
 */
export type DatabaseSchemaNodeBodyProps = {
  children?: ReactNode;
};

export const DatabaseSchemaNodeBody = ({ children }: DatabaseSchemaNodeBodyProps) => {
  return (
    <table className="border-spacing-10 overflow-visible" width={'100%'}>
      <TableBody>{children}</TableBody>
    </table>
  );
};

/* DATABASE SCHEMA TABLE ROW -------------------------------------------------- */
/**
 * A wrapper for individual table rows in the database schema node.
 */

export type DatabaseSchemaTableRowProps = {
  children: ReactNode;
  className?: string;
};

export const DatabaseSchemaTableRow = ({ children, className }: DatabaseSchemaTableRowProps) => {
  return <TableRow className={`relative text-xs ${className || ''}`}>{children}</TableRow>;
};

/* DATABASE SCHEMA TABLE CELL ------------------------------------------------- */
/**
 * A simplified table cell for the database schema node.
 * Renders static content without additional dynamic props.
 */
export type DatabaseSchemaTableCellProps = {
  className?: string;
  children?: ReactNode;
};

export const DatabaseSchemaTableCell = ({ className, children }: DatabaseSchemaTableCellProps) => {
  return <TableCell className={className}>{children}</TableCell>;
};

/* DATABASE SCHEMA NODE ------------------------------------------------------- */
/**
 * The main DatabaseSchemaNode component that wraps the header and body.
 * It maps over the provided schema data to render rows and cells.
 */
export type DatabaseSchemaNodeProps = {
  className?: string;
  selected?: boolean;
  children?: ReactNode;
};

export const DatabaseSchemaNode = ({ className, selected, children }: DatabaseSchemaNodeProps) => {
  return (
    <BaseNode
      className={className}
      selected={selected}
      style={{
        backgroundColor: COLORS.gray[800],
        borderRadius: 10,
        border: `1px solid ${COLORS.gray[700]}`,
      }}
    >
      {children}
    </BaseNode>
  );
};
