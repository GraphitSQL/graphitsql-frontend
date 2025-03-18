import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

type DeleteProjectModalProps = {
  onDeleteAction: () => Promise<void>;
};

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ onDeleteAction }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmitDeletion = async () => {
    try {
      setSubmitted(true);
      await onDeleteAction();
    } catch {
      setSubmitted(false);
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Подтвердите свое решение</DialogTitle>
        <DialogCloseTrigger disabled={submitted} />
      </DialogHeader>
      <DialogBody>
        <Text>
          Удаление проекта необратимо. После того, как вы продолжите, все ваши данные будут навсегда удалены и не могут
          быть восстановлены.
        </Text>
        <Heading size={'sm'} margin={'15px 0'}>
          Нужна помощь?
        </Heading>
        <Text fontSize={'xs'}>
          Если у вас возникли вопросы или вам нужна помощь, пожалуйста, свяжитесь с нашей службой поддержки, прежде чем
          продолжить.
        </Text>
      </DialogBody>
      <DialogFooter>
        <Button colorPalette="red" onClick={handleSubmitDeletion} loading={submitted}>
          Удалить проект
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
