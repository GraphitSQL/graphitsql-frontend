import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageItem } from '@/common/constants';
import { Routing } from '@/common/routes';

export const ResultStep: React.FC = () => {
  const navigate = useNavigate();
  const handleGoToApp = () => {
    localStorage.removeItem(LocalStorageItem.FORGOT_PASSWORD_TOKEN);
    navigate(Routing.signIn.route());
  };

  return (
    <VStack gap={50} justifyContent={'center'} alignItems={'center'} paddingTop={10}>
      <VStack textAlign={'center'} gap={'10px'}>
        <Heading size={'5xl'} color="teal.500">
          Поздравляем!
        </Heading>
        <Text>Вы успешно сменили пароль</Text>
        <Text>Вернитесь на страницу входа и зайдите с новым паролем</Text>
      </VStack>
      <Button onClick={handleGoToApp}>Перейти на страницу входа</Button>
    </VStack>
  );
};
