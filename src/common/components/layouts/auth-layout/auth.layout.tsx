import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { COLORS, LocalStorageItem } from '../../../constants';
import { UserProfile } from './components/user-profile';
import { Routing } from '../../../routes';
import logoPath from '../../../assets/LOGO.svg';
import { useEffect, useState } from 'react';
import { toaster } from '../../ui/toaster';
import { getMe } from '@/api/users';
import { OutletContextProps, TUser } from '@/common/types/types';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  const fetchUser = async () => {
    const user = await getMe();
    setCurrentUser(user);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (
        !localStorage.getItem(LocalStorageItem.ACCESS_TOKEN) &&
        !localStorage.getItem(LocalStorageItem.REFRESH_TOKEN)
      ) {
        toaster.error({
          title: 'Сессия истекла',
          description: 'Пожалуйста, войдите снова',
        });
        navigate(Routing.signIn.route());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetchUser();
  }, [pathname]);

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
        background={COLORS.navy[700]}
      >
        <HStack cursor="pointer" alignItems={'center'} gap={2} onClick={() => navigate(Routing.home.route())}>
          <Image srcSet={logoPath} width={50} alt="logo" />
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
        {!!currentUser && <UserProfile currentUser={currentUser} />}
      </HStack>
      <Box
        padding={'1.5%'}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        height={'100%'}
        minHeight={0}
        overflow={'hidden'}
      >
        <Outlet context={{ currentUser, fetchUser } satisfies OutletContextProps} />
      </Box>
    </>
  );
};
