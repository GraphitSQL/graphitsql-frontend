import { Box, Avatar, HStack, Image, Text, Button } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { COLORS } from '../../../constants';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../ui/menu';
import { Icons } from '../../../assets/icons';
import { Routing } from '../../../routes';

const UserProfile = () => {
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

        <Text
          marginLeft="3"
          color="white"
          title=" jfewjbfjhbhj bjdhebjvhfdjbej jjdb 345cdbcjhbdhjsbc"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '10vw',
          }}
        >
          jfewjbfjhbhj bjdhebjvhfdjbej jjdb 345cdbcjhbdhjsbc
        </Text>
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

export const AuthLayout = () => {
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
        <HStack alignItems={'center'} gap={2}>
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
