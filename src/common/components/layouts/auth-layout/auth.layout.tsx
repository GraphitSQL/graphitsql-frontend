import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { COLORS, LocalStorageItem } from '../../../constants';
import { UserProfile } from './components/user-profile';
import { Routing } from '../../../routes';
import logoPath from '../../../assets/LOGO.svg';
import { useEffect, useMemo, useState } from 'react';
import { toaster } from '../../ui/toaster';
import { getMe } from '@/api/users';
import { TUser } from '@/common/types/types';
import { refreshAccessToken } from '@/api/auth';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  const isAuth = useMemo(() => {
    const basePath = pathname.split('/')[1];
    if (!Routing[basePath]) {
      navigate(Routing.home.route());
      return;
    }
    return (
      pathname &&
      Routing[basePath].isAuth &&
      !!localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)
    );
  }, [pathname, refreshAccessToken]);

  const fetchUser = async () => {
    if (isAuth) {
      const user = await getMe();
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      toaster.error({
        title: 'Unauthorized',
      });
      navigate(Routing.signIn.route());
      return;
    }
    fetchUser();
  }, [isAuth, navigate]);

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
          <Image srcSet={logoPath} width={50} />
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
      <Box padding={'1.5% 1.5% 0 1.5%'}>
        <Outlet />
      </Box>
    </>
  );
};
