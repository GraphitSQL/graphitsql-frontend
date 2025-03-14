import { Box, HStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../ui/menu';
import { Icons } from '../../../../assets/icons';
import { Routing, windowOpen } from '../../../../routes';
import { UserName } from './user-profile.styled';
import { TUser } from '@/common/types/types';
import { LocalStorageItem } from '@/common/constants';
import { logoutRequest } from '@/api/auth';
import { toaster } from '@/common/components/ui/toaster';
import { UserAvatar } from '@/common/components/ui';

type TUserProfileProps = {
  currentUser: TUser;
};

export const UserProfile: React.FC<TUserProfileProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem(LocalStorageItem.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageItem.REFRESH_TOKEN);
      navigate(Routing.signIn.route());
    } catch (e: unknown) {
      console.error(e);
      toaster.error({
        title: 'Unable to logout',
        description: 'Try again later',
      });
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={'10px'}>
      <HStack>
        <UserAvatar bgColor={currentUser.avatarColor} fallback={currentUser.displayName} />
        <UserName title={currentUser.displayName}>{currentUser.displayName}</UserName>
      </HStack>

      <MenuRoot variant={'solid'}>
        <MenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icons.ChevronDown />
          </Button>
        </MenuTrigger>
        <MenuContent width={200}>
          <MenuItem value="profile" onClick={() => navigate(Routing.profile.route())}>
            Мой профиль
          </MenuItem>
          <MenuItem value="terms" onClick={() => windowOpen(Routing.terms.route(), '_blank')}>
            Условия пользования
          </MenuItem>
          <MenuItem value="logout" color="fg.error" _hover={{ bg: 'bg.error', color: 'fg.error' }} onClick={onLogout}>
            Выйти из аккаунта
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};
