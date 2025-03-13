import { Icons } from '@/common/assets/icons';
import { AccordionItemTrigger } from '@/common/components';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/common/components/ui/menu';
import { COLORS } from '@/common/constants';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { LuChevronsUpDown } from 'react-icons/lu';

type NoteSectionHeaderProps = {
  handleDeleteNotes: () => void;
};

export const NoteSectionHeader: React.FC<NoteSectionHeaderProps> = ({ handleDeleteNotes }) => {
  return (
    <HStack
      boxShadow="sm"
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'20px 10px'}
      borderBottom={`1px solid ${COLORS.gray[800]}`}
    >
      <AccordionItemTrigger>
        <HStack cursor={'pointer'}>
          <LuChevronsUpDown color={COLORS.teal[400]} />
          <Text>Заметки</Text>
        </HStack>
      </AccordionItemTrigger>
      <HStack gap={1}>
        <MenuRoot variant={'solid'}>
          <MenuTrigger asChild>
            <Button variant={'ghost'} size={'xs'}>
              <Box style={{ transform: 'rotate(90deg)' }}>
                <Icons.Dots color={COLORS.teal[400]} />
              </Box>
            </Button>
          </MenuTrigger>
          <MenuContent width={200}>
            <MenuItem value="delete-notes" onClick={handleDeleteNotes}>
              Удалить все
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </HStack>
    </HStack>
  );
};
