import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/common/components/ui/menu';
import { Icons } from '@/common/assets/icons';
import { Checkbox, UserAvatar } from '@/common/components';
import { COLORS } from '@/common/constants';
import { Button, Text, Card, HStack, Stack, CheckboxCheckedChangeDetails } from '@chakra-ui/react';

type NoteCardProps = {
  note: any;
  handleUpdateNote: (args: { noteId: string; value: boolean | string; key: string }) => void;
  handleDeleteNote: (id: string) => void;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, handleUpdateNote, handleDeleteNote }) => {
  const handleNotesResolve = (e: CheckboxCheckedChangeDetails) => {
    handleUpdateNote({ noteId: note.id, key: 'isResolved', value: e.checked });
  };
  return (
    <Card.Root
      key={note.id}
      variant={'outline'}
      className={`card-root__custom ${note.isResolved ? 'card-root__custom-resolved' : ''}`}
    >
      <Card.Body>
        <HStack justifyContent={'space-between'} align="start">
          <HStack mb="6" gap="3">
            <UserAvatar
              bgColor={note.createdBy.avatarColor ?? 'gray'}
              fallback={note.createdBy.displayName ?? 'Undefined'}
              size={'sm'}
            />
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {note.createdBy.displayName}
              </Text>
              <Text color="fg.muted" textStyle="xs">
                {new Date(note.createdAt).toLocaleDateString()}
              </Text>
            </Stack>
          </HStack>
          <MenuRoot variant={'solid'} unmountOnExit lazyMount size={'sm'}>
            <MenuTrigger asChild>
              <Button variant={'ghost'} size={'xs'} className="menu-button">
                <Icons.Dots color={COLORS.teal[400]} iconHeight={10} iconWidth={10} />
              </Button>
            </MenuTrigger>
            <MenuContent width={200}>
              <MenuItem value="resolve" closeOnSelect={false} _hover={{ bg: 'inherit', color: 'inherit' }}>
                <Checkbox size={'sm'} onCheckedChange={handleNotesResolve} checked={note.isResolved} /> Отметить как
                решенную
              </MenuItem>
              <MenuItem
                value="delete"
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                marginTop={'10px'}
                onClick={() => handleDeleteNote(note.id)}
              >
                Удалить заметку
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
        <Card.Description color={'fg'}>{note.text}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};
