import { Field } from '@/common/components';
import { COLORS } from '@/common/constants';
import { Button, FieldHelperText, Heading, HStack, Loader, Textarea, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { LuChevronDown, LuChevronUp, LuPlus } from 'react-icons/lu';
import InfiniteScroll from 'react-infinite-scroll-component';

import './style.css';
import { NoteCard } from './components/NoteCard';
import { toaster } from '@/common/components/ui/toaster';
import { createNoteRequest, deleteNoteRequest, getNoteListRequest, updateNoteRequest } from '@/api/notes';
import { useParams } from 'react-router-dom';
import { UpdateNoteOptions } from '@/api/notes/contracts';
export const Notes: React.FC = () => {
  const [noteText, setNoteText] = useState('');
  const nandleNoteText = useCallback((e: any) => {
    setNoteText(e.target.value);
  }, []);
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

  const handleAddNote = async () => {
    if (!notes) return;
    if (!noteText.trim()) {
      toaster.error({
        title: 'Заметка не может быть пустой',
      });
      return;
    }
    try {
      await createNoteRequest({
        noteText,
        projectId: projectId ?? '',
        isResolved: false,
      });
      setNoteText('');

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
          <Field
            label="Текст заметки"
            required
            width={'100%'}
            paddingRight={'15px'}
            flexGrow={1}
            invalid={noteText.length > 600}
          >
            <Textarea
              autoresize
              placeholder="Начните печатать ... "
              value={noteText}
              variant="subtle"
              border={`1px solid ${COLORS.gray[700]}`}
              onChange={nandleNoteText}
              maxH={'10dvh'}
            />
            <FieldHelperText>
              доступно {600 - noteText.length}/{600} символов
            </FieldHelperText>
            <Button marginLeft={'auto'} size={'sm'} marginTop={'10px'} onClick={handleAddNote}>
              <LuPlus />
              Создать
            </Button>
          </Field>

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
