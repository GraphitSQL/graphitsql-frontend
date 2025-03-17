import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { COLORS, LocalStorageItem } from '../../../constants';
import { UserProfile } from './components/user-profile';
import { Routing } from '../../../routes';
import logoPath from '../../../assets/LOGO.svg';
import { useEffect, useMemo, useState } from 'react';
import { toaster } from '../../ui/toaster';
import { getMe } from '@/api/users';
import { OutletContextProps, TUser } from '@/common/types/types';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  const isAuth = useMemo(() => {
    return pathname && !!localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
  }, [pathname]);

  const fetchUser = async () => {
    if (isAuth) {
      try {
        const user = await getMe();
        setCurrentUser(user);
      } catch {
        localStorage.clear();
        navigate(Routing.home.route());
      }
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
        padding={'1.5% 1.5% 0.5% 1.5%'}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        height="90vh"
        overflow={'hidden'}
      >
        <Outlet context={{ currentUser, fetchUser } satisfies OutletContextProps} />
      </Box>
    </>
  );
};
