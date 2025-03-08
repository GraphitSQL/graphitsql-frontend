import { Box, Button, Text, HStack, type SwitchCheckedChangeDetails } from '@chakra-ui/react';
import { UserName } from '../../../sidebar.styled';
import { COLORS } from '@/common/constants';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/common/components/ui/menu';
import { Icons } from '@/common/assets/icons';
import { Checkbox, UserAvatar } from '@/common/components';
import { ProjectNote } from '@/pages/project-page/types';
import { useState } from 'react';
import { toaster } from '@/common/components/ui/toaster';

type NoteProps = {
  note: ProjectNote;
  deleteNote: (noteId: string) => Promise<string | null>;
  updateNote: (noteId: string, data: Partial<Omit<ProjectNote, 'id' | 'createdBy'>>) => void;
};
export const Note: React.FC<NoteProps> = ({ note, deleteNote, updateNote }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleDeleteNote = async (noteId: string) => {
    setIsDisabled(true);
    const isDeleted = await deleteNote(noteId);

    if (!isDeleted) {
      toaster.error({
        title: 'Ошибка при удалении заметки',
      });
      setIsDisabled(false);
    }
  };
  const handleResolveNote = (checkboxDetails: SwitchCheckedChangeDetails) => {
    updateNote(note.id, { isResolved: checkboxDetails.checked });
  };

  return (
    <Box
      backgroundColor={note.isResolved ? COLORS.teal[900] : 'inherit'}
      padding={'10px'}
      borderTop={`1px solid ${COLORS.navy[600]}`}
      pointerEvents={isDisabled ? 'none' : 'initial'}
    >
      <HStack alignItems={'center'} justifyContent={'space-between'} marginBottom={'10px'}>
        <HStack>
          <UserAvatar
            bgColor={note.createdBy.avatarColor}
            fallback={`${note.createdBy.firstName} ${note.createdBy.lastName}`}
          />
          <UserName title={`${note.createdBy.firstName} ${note.createdBy.lastName}`}>
            {note.createdBy.firstName} {note.createdBy.lastName}
          </UserName>
        </HStack>
        <HStack>
          <MenuRoot variant={'solid'}>
            <MenuTrigger asChild>
              <Button variant={'ghost'} size={'xs'}>
                <Icons.Dots color={COLORS.teal[400]} />
              </Button>
            </MenuTrigger>
            <MenuContent width={200}>
              <MenuItem value="delete-notes" onClick={() => handleDeleteNote(note.id)}>
                Удалить
              </MenuItem>
            </MenuContent>
          </MenuRoot>
          <Checkbox checked={note.isResolved} size={'sm'} onCheckedChange={handleResolveNote} />
        </HStack>
      </HStack>
      <Text fontSize={10}>{note.text}</Text>
    </Box>
  );
};
