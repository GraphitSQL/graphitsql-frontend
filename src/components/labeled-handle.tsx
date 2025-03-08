import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { HandleProps } from '@xyflow/react';

import { BaseHandle } from '@/components/base-handle';
import { COLORS } from '@/common/constants';
import { Icons } from '@/common/assets/icons';

const flexDirections = {
  top: 'flex-col',
  right: 'flex-row-reverse justify-end',
  bottom: 'flex-col-reverse justify-end',
  left: 'flex-row',
};

export const LabeledHandle = forwardRef<
  HTMLDivElement,
  HandleProps &
    HTMLAttributes<HTMLDivElement> & {
      title: string;
      handleClassName?: string;
      labelClassName?: string;
      labelProps?: {
        isPK?: boolean;
        color?: string;
      };
    }
>(({ className, labelClassName, handleClassName, title, position, labelProps, ...props }, ref) => (
  <div
    ref={ref}
    title={title}
    style={{ padding: '10px', borderTop: `1px solid ${COLORS.gray[700]}`, gap: '5px' }}
    className={cn('relative flex items-center', flexDirections[position], className)}
  >
    {labelProps?.isPK && <Icons.PrimaryKey color={COLORS.teal[600]} iconWidth={18} iconHeight={18} />}
    <BaseHandle position={position} className={handleClassName} {...props} />
    <label className={cn('px-3 text-foreground', labelClassName)} style={{ color: labelProps?.color }}>
      {title}
    </label>
  </div>
));

LabeledHandle.displayName = 'LabeledHandle';
