import { ProjectMember } from '@/api/projects/contracts';
import { UserAvatar } from '@/common/components';
import { OutletContextProps } from '@/common/types';
import { Button, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '@/common/components/ui/menu';
import { Icons } from '@/common/assets/icons';
import { COLORS } from '@/common/constants';
import { useCallback } from 'react';

type ProjectmemberCardProps = {
  member: ProjectMember;
  handleDeleteMember: (memberId: string, isSelfDeletion: boolean) => Promise<void>;
};
export const ProjectmemberCard: React.FC<ProjectmemberCardProps> = ({ member, handleDeleteMember }) => {
  const { currentUser } = useOutletContext<OutletContextProps>();
  const onDelete = useCallback(async () => {
    const isSelfDeletion = member.userId === currentUser?.id;
    await handleDeleteMember(member.id, isSelfDeletion);
  }, [member.id]);
  return (
    <HStack width={'100%'} justifyContent={'space-between'} marginBottom={'30px'}>
      <HStack maxW={'400px'}>
        <UserAvatar size={'lg'} fallback={member.displayName} bgColor={member.avatarColor} />
        <VStack gap={'5px'} alignItems={'flex-start'}>
          <Text fontWeight="medium" truncate>
            {member.displayName}
          </Text>
          <Tag.Root colorPalette={member.isOwner ? 'green' : 'gray'}>
            <Tag.Label>{member.isOwner ? 'Создатель проекта' : 'Участник'}</Tag.Label>
          </Tag.Root>
        </VStack>
      </HStack>

      <MenuRoot variant="solid">
        <MenuTrigger asChild>
          <Button variant={'ghost'}>
            <Icons.Dots color={COLORS.teal[400]} />
          </Button>
        </MenuTrigger>
        <MenuContent width={200} bg={COLORS.navy[900]}>
          <MenuItem value="delete" color="fg.error" _hover={{ bg: 'bg.error', color: 'fg.error' }} onClick={onDelete}>
            {currentUser?.id === member.userId ? 'Покинуть проект' : 'Удалить'}
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </HStack>
  );
};
