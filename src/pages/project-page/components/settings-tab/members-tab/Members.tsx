import { deleteProjectMemberRequest, getProjectMembersListRequest } from '@/api/projects';
import { ProjectMember } from '@/api/projects/contracts';
import { toaster } from '@/common/components/ui/toaster';
import { Box, Button, Heading, HStack, Spinner, VStack, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProjectmemberCard } from './components/UserCard';
import { useNavigate } from 'react-router-dom';
import { Routing } from '@/common/routes';
import { DialogRoot } from '@/common/components/ui/dialog';
import { InviteToProjectModal } from '@/common/components/modals';
import { LuPlus } from 'react-icons/lu';

type ProjectSettingsMembersTabProps = {
  projectId: string;
};

export const ProjectSettingsMembersTab: React.FC<ProjectSettingsMembersTabProps> = ({ projectId }) => {
  const [projectMembers, setProjectMembers] = useState<ProjectMember[] | null>(null);
  const [membersCount, setMembersCount] = useState(0);
  const [isPublicProject, setIsPublicProject] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = async (skip?: number, take?: number) => {
    try {
      const res = await getProjectMembersListRequest({
        skip: skip ?? 0,
        take: take ?? 50,
        projectId: projectId,
      });
      const { count, members, isPublicProject } = res;
      setMembersCount(count);
      setProjectMembers(members);
      setIsPublicProject(isPublicProject);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка при получении данных об участниках проекта',
        description: e?.message,
      });
    }
  };

  const handleFetchMore = async (take?: number) => {
    try {
      if (!projectMembers) {
        return;
      }
      const res = await getProjectMembersListRequest({
        skip: projectMembers.length,
        take: take ?? 10,
        projectId: projectId,
      });
      const { count, members } = res;
      setMembersCount(count);
      setProjectMembers((prev) => [...(prev ?? []), ...members]);
    } catch (e: any) {
      toaster.error({
        title: 'Ошибка при получении данных об участниках проекта',
        description: e?.message,
      });
    }
  };

  const handleDeleteMember = async (memberId: string, isSelfDeletion: boolean) => {
    try {
      if (!projectMembers) return;

      const visibleProjects = projectMembers.length;
      const res = await deleteProjectMemberRequest(projectId, memberId);

      if (res !== 'OK') {
        throw new Error('Не удалось удалить участника');
      }

      if (isSelfDeletion) {
        navigate(Routing.home.route());
        toaster.success({
          title: 'Вы покинули проект',
          removeDelay: 2000,
        });
        return;
      }

      toaster.create({
        title: 'Участник удален',
        type: 'info',
      });
      await fetchData(0, visibleProjects - 1);
    } catch (e: any) {
      console.error(e);
      toaster.create({
        title: 'Ошибка при удалении участника проекта',
        description: e?.message,
        type: 'error',
      });
    }
  };

  const projectOwner = useMemo(() => {
    if (!projectMembers) return null;

    const owner = projectMembers.find((el) => el.isOwner);

    return {
      id: owner?.id || '',
      displayName: owner?.displayName ?? 'Undefined',
      avatarColor: owner?.avatarColor || '',
      projectId,
    };
  }, [projectMembers]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <VStack gap={'20px'} alignItems={'flex-start'} width={'100%'}>
        <HStack alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Box>
            <Heading size={'2xl'}>Участники</Heading>
            <Text color={'fg.muted'}>Всего: {membersCount}</Text>
          </Box>
          <Button onClick={onOpen} size={'sm'} disabled={!isPublicProject}>
            <LuPlus />
          </Button>
        </HStack>
        <Box id="members-scroll-area" width={'100%'}>
          {projectMembers ? (
            <InfiniteScroll
              dataLength={projectMembers?.length ?? 0}
              next={handleFetchMore}
              hasMore={membersCount > Number(projectMembers?.length)}
              loader={<h4>Загружаем данные...</h4>}
              scrollableTarget="members-scroll-area"
            >
              {projectMembers.map((member) => (
                <ProjectmemberCard member={member} key={member.id} handleDeleteMember={handleDeleteMember} />
              ))}
            </InfiniteScroll>
          ) : (
            <Spinner />
          )}
        </Box>
      </VStack>
      {isPublicProject && (
        <DialogRoot
          open={open}
          closeOnInteractOutside={false}
          lazyMount
          unmountOnExit
          closeOnEscape={false}
          preventScroll={true}
        >
          {projectOwner && (
            <InviteToProjectModal projectOwnerData={projectOwner} handleModalVisibility={onClose} isOpen={open} />
          )}
        </DialogRoot>
      )}
    </>
  );
};
