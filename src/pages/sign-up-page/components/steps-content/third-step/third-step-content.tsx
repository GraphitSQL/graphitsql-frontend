import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../../../../common/routes';
import { StepsCompletedContent } from '../../../../../common/components/ui/steps';
import { LocalStorageItem } from '@/common/constants';

export const ResultStep: React.FC = () => {
  const navigate = useNavigate();
  const handleGoToApp = () => {
    localStorage.removeItem(LocalStorageItem.TOKEN_FOR_REGISTRATION)
    navigate(Routing.home.route())
  }

  return (
    <StepsCompletedContent>
      <VStack gap={30} height={'30vh'} justifyContent={'center'}>
        <Box textAlign={'center'}>
          <Heading size={'5xl'} color="teal.500">
            Congratulations!
          </Heading>
          <Text>You have successfully registered.</Text>
        </Box>
        <Button onClick={handleGoToApp}>
          Go to App
        </Button>
      </VStack>
    </StepsCompletedContent>
  );
};
