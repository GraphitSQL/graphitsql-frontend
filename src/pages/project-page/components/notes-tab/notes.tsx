import { Button, Heading, HStack, Loader, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import InfiniteScroll from 'react-infinite-scroll-component';

import './style.css';
import { NoteCard } from './components/NoteCard';
import { toaster } from '@/common/components/ui/toaster';
import { createNoteRequest, deleteNoteRequest, getNoteListRequest, updateNoteRequest } from '@/api/notes';
import { useParams } from 'react-router-dom';
import { UpdateNoteOptions } from '@/api/notes/contracts';
import { NoteInput } from './components/NoteInput';
export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[] | null>(null);
  const [notesCount, setNotesCount] = useState(0);
  const [sortASC, setSortASC] = useState(false);
  const { id: projectId } = useParams();

  const fetchData = async (skip?: number, take?: number) => {
    try {
      const res = await getNoteListRequest({
        skip: skip ?? 0,
        take: take ?? 5,
        direction: sortASC ? 'ASC' : 'DESC',
        projectId: projectId ?? '',
      });
      const { count, notes } = res;
      setNotesCount(count);
      setNotes(notes);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка при получении данных',
        description: e?.message,
      });
    }
  };

  const handleFetchMore = useCallback(
    async (take?: number) => {
      try {
        if (!notes) {
          return;
        }
        const prevNotes = notes ?? [];
        const res = await getNoteListRequest({
          skip: notes.length,
          take: take ?? 10,
          direction: sortASC ? 'ASC' : 'DESC',
          projectId: projectId ?? '',
        });
        const { count, notes: fetchedNotes } = res;
        setNotesCount(count);
        setNotes([...prevNotes, ...fetchedNotes]);
      } catch (e: any) {
        toaster.error({
          title: 'Ошибка при получении данных',
          description: e?.message,
        });
      }
    },
    [sortASC, notes]
  );

  const handleUpdateNote = async ({
    noteId,
    key,
    value,
  }: {
    noteId: string;
    value: boolean | string;
    key: keyof UpdateNoteOptions;
  }) => {
    setNotes((prev) =>
      (prev ?? []).map((el) => {
        if (el.id === noteId) {
          return { ...el, [key]: value };
        }
        return el;
      })
    );
    await updateNoteRequest<UpdateNoteOptions>({
      payload: {
        [key]: value,
      },
      params: {
        projectId: projectId ?? '',
        id: noteId,
      },
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!notes) return;

    const currentNotes = [...notes];
    setNotes((prev) => (prev ?? []).filter((el) => el.id !== noteId));

    try {
      const res = await deleteNoteRequest(noteId);

      if (res !== 'OK') {
        setNotes(currentNotes);
        throw new Error('Заметка не была удалена');
      }
      toaster.create({
        title: 'Заметка удалена',
        type: 'info',
      });
      await fetchData(0, notes.length + 1);
    } catch {
      toaster.error({
        title: 'Не удалось удалить заметку',
      });
      setNotes(currentNotes);
    }
  };

  const handleAddNote = async (text: string) => {
    if (!notes) return;
    try {
      await createNoteRequest({
        noteText: text,
        projectId: projectId ?? '',
        isResolved: false,
      });

      await fetchData(0, notes.length + 1);
    } catch (e: any) {
      toaster.error({
        title: 'Не удалось создать заметку',
        description: e?.message,
      });
    }
  };

  const handleSortDirection = async () => {
    setSortASC((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [sortASC]);

  return (
    <>
      {notes ? (
        <>
          <NoteInput onNoteAdd={handleAddNote} />
          <VStack flexGrow={1} align={'start'} width={'100%'} gap={5} marginTop={'20px'} height={'100%'} minHeight={0}>
            <HStack
              gap={'5px'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
              paddingRight={'15px'}
            >
              <Heading>Заметки: {notesCount}</Heading>
              <Button size={'xs'} variant={'plain'} onClick={handleSortDirection}>
                Сначала{' '}
                {sortASC ? (
                  <>
                    старые <LuChevronUp />
                  </>
                ) : (
                  <>
                    новые <LuChevronDown />
                  </>
                )}
              </Button>
            </HStack>
            {notes.length ? (
              <div id="test" className="notes__scroll-area">
                <InfiniteScroll
                  dataLength={notes.length ?? 0}
                  next={handleFetchMore}
                  hasMore={notes.length ? notesCount > notes?.length : false}
                  loader={<h4>Загружаем данные...</h4>}
                  // scrollThreshold={0.5}
                  scrollableTarget="test"
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
              </div>
            ) : (
              <>Заметок не найдено</>
            )}
          </VStack>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
