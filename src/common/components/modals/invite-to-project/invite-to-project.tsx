import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { PreResolutionListProject } from '@/api/projects/contracts';
import { Box, Heading, HStack, Portal, Separator, Text, Clipboard, IconButton, VStack, Input } from '@chakra-ui/react';
import { Field, UserAvatar } from '../../ui';
import { UserName } from './invite-to-project.styled';
import { LuCheck, LuEarth, LuLink } from 'react-icons/lu';
import { IconView } from '@/common/assets';
import { COLORS } from '@/common/constants';
import { useEffect, useState } from 'react';
import { generateInvitationLinkRequest } from '@/api/projects';
import { toaster } from '../../ui/toaster';

type InviteToProjectModalProps = {
  projectOwnerData: PreResolutionListProject['createdBy'] & {
    projectId: string;
  };
  handleModalVisibility: () => void;
};

export const InviteToProjectModal: React.FC<InviteToProjectModalProps> = ({
  projectOwnerData,
  handleModalVisibility,
}) => {
  const [invitationLink, setInvitationLink] = useState<string>('');

  const handleGetInvitationLink = async () => {
    try {
      const link = await generateInvitationLinkRequest(projectOwnerData.projectId);
      setInvitationLink(link);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка при формировании ссылки',
        description: e?.message,
      });
    }
  };

  useEffect(() => {
    handleGetInvitationLink();
  }, [projectOwnerData.projectId]);

  return (
    <Portal>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Управление доступом</DialogTitle>
        </DialogHeader>
        <DialogBody pb="8">
          <HStack gap={3} marginBottom={5}>
            <UserAvatar
              bgColor={projectOwnerData?.avatarColor ?? 'gray'}
              fallback={projectOwnerData?.displayName ?? 'Undefined'}
              size={'xl'}
            />
            <VStack align={'flex-start'} gap={0}>
              <UserName>{projectOwnerData?.displayName ?? 'DELETED USER'}</UserName>
              <Text fontSize={'10px'}>Создатель</Text>
            </VStack>
          </HStack>
          <Separator />
          <Box padding={'10px 0'}>
            <HStack justifyContent={'space-between'}>
              <Heading size={'md'}> Настройки ссылок</Heading>
              <Clipboard.Root value={invitationLink}>
                <Clipboard.Trigger asChild>
                  <IconButton variant={'ghost'} size={'xs'} disabled={!invitationLink}>
                    <Clipboard.Indicator copied={<LuCheck />}>
                      <LuLink />
                    </Clipboard.Indicator>
                  </IconButton>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
            <HStack align={'start'} marginTop={3} gap={5}>
              <IconView icon={<LuEarth size={25} color={COLORS.teal[200]} />} />
              <VStack gap={0} align={'start'}>
                <Heading size={'sm'}>Доступно всем, у кого есть ссылка</Heading>
                <Text fontSize={'smaller'}>Пригласите друзей в проект, отправив им ссылку ниже</Text>
                <Field helperText="Обратите внимание, ссылка действительна в течении 100 дней" marginTop={4}>
                  <Input
                    readOnly
                    variant={'subtle'}
                    bg={COLORS.teal[700]}
                    border={'border.muted'}
                    value={invitationLink}
                    placeholder="Генерируем ссылку..."
                  />
                </Field>
              </VStack>
            </HStack>
          </Box>
        </DialogBody>
        <DialogCloseTrigger onClick={handleModalVisibility} />
      </DialogContent>
    </Portal>
  );
};
