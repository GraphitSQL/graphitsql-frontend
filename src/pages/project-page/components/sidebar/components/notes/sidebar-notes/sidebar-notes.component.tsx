import { ProjectNote } from '@/pages/project-page/types';
import { Box, Button, For, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Note } from './note.component';
import { toaster } from '@/common/components/ui/toaster';

type SidebarNotes = {
  notes: ProjectNote[];
  setNotes: React.Dispatch<React.SetStateAction<ProjectNote[]>>;
};
export const SidebarNotes: React.FC<SidebarNotes> = ({ notes, setNotes }) => {
  const [inputText, setInputText] = useState('');

  const addNote = () => {
    if (!inputText.trim()) {
      toaster.error({
        title: 'Заметка не может быть пустой',
      });
      return;
    }
    const note: ProjectNote = {
      id: (notes.length + 1).toString(),
      createdBy: {
        firstName: 'John',
        lastName: 'Doe',
        avatarColor: 'yellow',
      },
      text: inputText,
      isResolved: false,
    };

    setNotes((prev) => [note, ...prev]);
    setInputText('');
  };

  const deleteNote = async (noteId: string) => {
    try {
      await new Promise<string | null>((resolve, reject) => {
        setTimeout(() => {
          console.log(noteId);
          if (noteId === '2') {
            console.log('jj');
            reject(null);
            return;
          }
          resolve('done');
        }, 1000);
      });
      setNotes((els) => els.filter((el) => el.id !== noteId));
      return 'deleted';
    } catch {
      return null;
    }
  };

  const updateNote = (noteId: string, data: Partial<Omit<ProjectNote, 'id' | 'createdBy'>>) => {
    setNotes((prevItems) =>
      prevItems.map((item) =>
        item.id === noteId
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );
  };

  return (
    <Box maxHeight={'60vh'} minHeight="50vh" overflow={'auto'} padding={'0 8px'}>
      <HStack gap={1} marginBottom={'10px'}>
        <Input placeholder="Введите текст заметки" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <Button onClick={addNote} size={'sm'}>
          Добавить заметку
        </Button>
      </HStack>
      <For each={notes}>
        {(note) => <Note note={note} key={note.id} deleteNote={deleteNote} updateNote={updateNote} />}
      </For>
    </Box>
  );
};
