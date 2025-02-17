import { Box, Avatar, HStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../ui/menu';
import { Icons } from '../../../../assets/icons';
import { Routing } from '../../../../routes';
import { UserName } from './user-profile.styled';

export const UserProfile = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={'10px'}
    >
      <HStack>
        <Avatar.Root colorPalette={'yellow'}>
          <Avatar.Fallback name="John Doe" />
        </Avatar.Root>
        <UserName title=" jfewjbfjhbhj bjdhebjvhfdjbej jjdb 345cdbcjhbdhjsbc">
          jfewjbfjhbhj bjdhebjvhfdjbej jjdb 345cdbcjhbdhjsbc
        </UserName>
      </HStack>

      <MenuRoot variant={'solid'}>
        <MenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icons.ChevronDown />
          </Button>
        </MenuTrigger>
        <MenuContent width={200}>
          <MenuItem value="profile">Profile</MenuItem>
          <MenuItem
            value="terms"
            onClick={() => window.open('src/common/assets/terms/terms.pdf')}
          >
            Terms & Conditions
          </MenuItem>
          <MenuItem
            value="logout"
            color="fg.error"
            _hover={{ bg: 'bg.error', color: 'fg.error' }}
            onClick={() => navigate(Routing.signIn.route())}
          >
            Log out
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};
