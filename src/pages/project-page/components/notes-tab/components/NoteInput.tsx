import { Field } from '@/common/components';
import { toaster } from '@/common/components/ui/toaster';
import { COLORS } from '@/common/constants';
import { Button, FieldHelperText, Textarea } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

type NoteInputProps = {
  onNoteAdd: (arg: string) => Promise<void>;
};

export const NoteInput: React.FC<NoteInputProps> = ({ onNoteAdd }) => {
  const [noteText, setNoteText] = useState('');
  const handleNoteText = useCallback((e: any) => {
    setNoteText(e.target.value);
  }, []);

  const handleCreateNote = async () => {
    if (!noteText.trim()) {
      toaster.error({
        title: 'Заметка не может быть пустой',
      });
      return;
    }
    await onNoteAdd(noteText);
    setNoteText('');
  };

  return (
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
        onChange={handleNoteText}
        maxH={'10dvh'}
      />
      <FieldHelperText>
        доступно {600 - noteText.length}/{600} символов
      </FieldHelperText>
      <Button marginLeft={'auto'} size={'sm'} marginTop={'10px'} onClick={handleCreateNote}>
        <LuPlus />
        Создать
      </Button>
    </Field>
  );
};
