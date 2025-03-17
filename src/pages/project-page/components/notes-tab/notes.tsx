import { Field } from '@/common/components';
import { COLORS } from '@/common/constants';
import { MOCK_NOTES } from '@/tmp/mocks/mock-notes.mock';
import { Button, Heading, HStack, Textarea, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { LuChevronDown, LuChevronUp, LuPlus } from 'react-icons/lu';
import InfiniteScroll from 'react-infinite-scroll-component';

import './style.css';
import { NoteCard } from './components/NoteCard';
import { toaster } from '@/common/components/ui/toaster';
export const Notes: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const nandleNoteText = useCallback((e: any) => {
    setNoteText(e.target.value);
  }, []);
  const [notes, setNotes] = useState<any[] | null>(null);
  const [notesCount, setNotesCount] = useState(0);
  const [sortASC, setSortASC] = useState(true);

  const handleUpdateNote = ({ noteId, key, value }: { noteId: string; value: boolean | string; key: string }) => {
    setNotes((prev) =>
      (prev ?? []).map((el) => {
        if (el.id === noteId) {
          return { ...el, [key]: value };
        }
        return el;
      })
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => (prev ?? []).filter((el) => el.id !== noteId));
  };

  const handleAddNote = () => {
    if (!notes) return;
    if (!noteText.trim()) {
      toaster.error({
        title: 'Заметка не может быть пустой',
      });
      return;
    }
    const mockNote = {
      id: `${notes?.length} - note`,
      createdBy: {
        displayName: 'Me Lol',
        avatarColor: 'hotpink',
      },
      text: noteText,
      isResolved: false,
      createdAt: new Date('2025-02-04'),
    };
    const notesArray = [...notes];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sortASC ? notesArray.push(mockNote) : notesArray.unshift(mockNote);
    setNotes(notesArray);
    setNotesCount((prev) => prev + 1);
  };

  const handleSortDirection = () => {
    setSortASC((prev) => !prev);
  };

  useEffect(() => {
    setNotes(MOCK_NOTES);
    setNotesCount(MOCK_NOTES.length);
  }, []);

  return (
    <>
      <Field label="Текст заметки" required width={'100%'} paddingRight={'15px'} flexGrow={1}>
        <Textarea
          autoresize
          placeholder="Начните печатать ... "
          value={noteText}
          variant="subtle"
          border={`1px solid ${COLORS.gray[700]}`}
          onChange={nandleNoteText}
          maxH={'10dvh'}
        />

        <Button marginLeft={'auto'} size={'sm'} marginTop={'10px'} onClick={handleAddNote}>
          <LuPlus />
          Создать
        </Button>
      </Field>

      <VStack flexGrow={1} align={'start'} width={'100%'} gap={5} marginTop={'20px'} height={'100%'} minHeight={0}>
        <HStack gap={'5px'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} paddingRight={'15px'}>
          <Heading>Заметки: {notesCount}</Heading>
          <Button size={'xs'} variant={'plain'} onClick={handleSortDirection}>
            Сначала{' '}
            {sortASC ? (
              <>
                старые <LuChevronDown />
              </>
            ) : (
              <>
                новые <LuChevronUp />
              </>
            )}
          </Button>
        </HStack>
        {notes && (
          <InfiniteScroll
            className="notes__scroll-area"
            dataLength={notes.length ?? 0}
            next={() => console.log('fetch more')}
            hasMore={notes.length ? notesCount > notes?.length : false}
            loader={<h4>Загружаем данные...</h4>}
          >
            {notes.map((note) => (
              <NoteCard
                note={note}
                key={note.id}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
              />
            ))}
          </InfiniteScroll>
        )}
      </VStack>
    </>
  );
};
