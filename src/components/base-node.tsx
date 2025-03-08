import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { Box } from '@chakra-ui/react';

export const BaseNode = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { selected?: boolean }>(
  ({ className, selected, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(
        'relative rounded-md border bg-card p-5 text-card-foreground',
        className,
        selected ? 'border-muted-foreground shadow-lg' : '',
        'hover:ring-1'
      )}
      tabIndex={0}
      {...props}
    />
  )
);

BaseNode.displayName = 'BaseNode';
