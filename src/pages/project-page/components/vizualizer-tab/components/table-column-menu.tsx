import { FC } from 'react';
import { Box, Button, Separator, Switch } from '@chakra-ui/react';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '@/common/components/ui/menu';
import { Icons } from '@/common/assets/icons';
import { COLORS } from '@/common/constants';

type TableRowMenuProps = {
  column: any;
  onValueCommit: (value: string | boolean, colId: string, key: string) => void;
  onColumnDelete: (colId: string) => void;
};

export const TableColumnMenu: FC<TableRowMenuProps> = ({ column, onValueCommit, onColumnDelete }) => {
  return (
    <MenuRoot variant={'subtle'} unmountOnExit lazyMount size={'sm'}>
      <MenuTrigger asChild>
        <Button variant={'ghost'} size={'xs'} className="menu-button">
          <Box style={{ transform: 'rotate(90deg)' }}>
            <Icons.Dots color={COLORS.teal[100]} iconHeight={10} iconWidth={10} />
          </Box>
        </Button>
      </MenuTrigger>
      <MenuContent width={200} className="column-properties__content-container">
        <p className="column-properties__title">Свойства поля</p>
        <div className="column-properties__properties-container">
          <Switch.Root
            size={'xs'}
            defaultChecked={column.key}
            onCheckedChange={(e) => onValueCommit(e.checked, column.id, 'key')}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <p>Первичный ключ</p>
          </Switch.Root>
          <Switch.Root
            size={'xs'}
            defaultChecked={column.null}
            onCheckedChange={(e) => onValueCommit(e.checked, column.id, 'null')}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <p>NULL</p>
          </Switch.Root>
        </div>
        <Separator />
        <MenuItem
          value="delete field"
          onClick={() => onColumnDelete(column.id)}
          color="fg.error"
          _hover={{ bg: 'bg.error', color: 'fg.error' }}
        >
          Удалить поле
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
