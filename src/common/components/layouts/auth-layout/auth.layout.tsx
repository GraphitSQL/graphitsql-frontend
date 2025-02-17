import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { COLORS } from '../../../constants';
import { UserProfile } from './components/user-profile';
import { Routing } from '../../../routes';

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <HStack
        as="nav"
        boxShadow="sm"
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'15px 20px'}
        borderBottom={`1px solid ${COLORS.gray[800]}`}
      >
        <HStack
          cursor="pointer"
          alignItems={'center'}
          gap={2}
          onClick={() => navigate(Routing.home.route())}
        >
          <Image srcSet="src/common/assets/LOGO.svg" width={50} />
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Graphit
            <span
              style={{
                color: `${COLORS.teal[400]}`,
              }}
            >
              SQL
            </span>
          </Text>
        </HStack>
        <UserProfile />
      </HStack>
      <Box padding={'1.5%'}>
        <Outlet />
      </Box>
    </>
  );
};
