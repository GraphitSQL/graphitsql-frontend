import { PreResolutionProject } from '@/api/projects/contracts';
import { useEffect, useState } from 'react';
import {
  Editable,
  IconButton,
  Spinner,
  DataList,
  Heading,
  Text,
  HStack,
  Separator,
  Box,
  Button,
  EditableValueChangeDetails,
} from '@chakra-ui/react';
import { LuCheck, LuPencilLine, LuX } from 'react-icons/lu';
import { UserAvatar } from '@/common/components';
import { DialogRoot, DialogTrigger } from '@/common/components/ui/dialog';
import { DeleteProjectModal } from '@/common/components/modals';
import { deleteProjectRequest, getProjectRequest, updateProjectRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { Routing } from '@/common/routes';

type ProjectSettingsMainSettingTabProps = {
  projectId: string;
};

export const ProjectSettingsMainSettingTab: React.FC<ProjectSettingsMainSettingTabProps> = ({ projectId }) => {
  const [projectData, setProjectData] = useState<PreResolutionProject | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const navigate = useNavigate();

  const handleGetProject = async () => {
    try {
      const res = await getProjectRequest(projectId);
      if (!res) {
        throw new Error('Ошибка сервера');
      }
      setProjectData(res);
      setProjectTitle(res?.title ?? '');
    } catch (e: any) {
      toaster.error({
        title: 'Мы не смогли получить данные о проекте',
        description: e.message,
      });
    }
  };
  const handleDeleteProject = async () => {
    try {
      const res = await deleteProjectRequest(projectId);
      if (!res) {
        throw new Error('Ошибка сервера');
      }
      toaster.success({
        title: 'Проект удален',
        removeDelay: 2000,
      });
      navigate(Routing.home.route());
    } catch (e: any) {
      toaster.error({
        title: 'Не удалось удалить проект',
        description: e?.message,
      });
    }
  };
  const handleChangeProjectTitle = async () => {
    const prevTitle = projectData?.title ?? '';

    try {
      const res = await updateProjectRequest({
        payload: {
          title: projectTitle,
        },
        params: {
          id: projectId,
        },
      });
      if (!res) {
        throw new Error('Не удалось обновить');
      }
      toaster.success({
        title: 'Название успешно обновлено',
      });
    } catch (e: any) {
      setProjectTitle(prevTitle);
      toaster.error({
        title: 'Ошибка при обновлении названия проекта',
        description: e?.message,
      });
    }
  };
  const handleSetProjectTitle = (e: EditableValueChangeDetails) => {
    setProjectTitle(e.value);
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  return (
    <>
      {projectData ? (
        <>
          <Heading size={'2xl'} marginBottom={'15px'}>
            О проекте
          </Heading>
          <DataList.Root orientation="horizontal" variant={'bold'} width={'100%'} padding={'0px 20px 20px 0px'}>
            <DataList.Item gap={10}>
              <DataList.ItemLabel>Название проекта </DataList.ItemLabel>
              <DataList.ItemValue>
                <>
                  <Editable.Root
                    defaultValue={projectTitle}
                    onValueCommit={handleChangeProjectTitle}
                    onValueChange={handleSetProjectTitle}
                  >
                    <Editable.Preview />
                    <Editable.Input />
                    <Editable.Control>
                      <Editable.EditTrigger asChild>
                        <IconButton variant="ghost" size="xs">
                          <LuPencilLine />
                        </IconButton>
                      </Editable.EditTrigger>
                      <Editable.CancelTrigger asChild>
                        <IconButton variant="outline" size="xs">
                          <LuX />
                        </IconButton>
                      </Editable.CancelTrigger>
                      <Editable.SubmitTrigger asChild>
                        <IconButton variant="outline" size="xs">
                          <LuCheck />
                        </IconButton>
                      </Editable.SubmitTrigger>
                    </Editable.Control>
                  </Editable.Root>
                </>
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item gap={10}>
              <DataList.ItemLabel>Создатель </DataList.ItemLabel>
              <DataList.ItemValue>
                <HStack maxW="500px">
                  <UserAvatar
                    bgColor={projectData.createdBy?.avatarColor}
                    fallback={projectData.createdBy?.displayName}
                    size={'xs'}
                  />
                  <Text fontWeight="medium" truncate>
                    {projectData.createdBy?.displayName}
                  </Text>
                </HStack>
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item gap={10}>
              <DataList.ItemLabel>Тип видимости </DataList.ItemLabel>
              <DataList.ItemValue>{projectData.isPublic ? 'Открытый' : 'Закрытый'}</DataList.ItemValue>
            </DataList.Item>

            <DataList.Item gap={10}>
              <DataList.ItemLabel>Дата создания</DataList.ItemLabel>
              <DataList.ItemValue>{new Date(projectData.createdAt).toLocaleDateString()}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>

          <Separator />
          <Box padding={'20px 20px 20px 0px'}>
            <Heading size={'2xl'} marginBottom={'15px'} color={'fg.error'}>
              Опасная зона
            </Heading>

            <Text fontWeight={'bold'}>Удаление проекта</Text>
            <HStack justifyContent={'space-between'} gap={30} marginTop={5}>
              <Box maxW={'700px'}>
                <Text
                  fontSize={{
                    base: 'xs',
                    sm: 'xs',
                    md: 'md',
                  }}
                >
                  Удаление проекта необратимо. После того, как вы продолжите, все ваши данные будут удалены навсегда и
                  не могут быть восстановлены.
                </Text>
              </Box>

              <DialogRoot
                unmountOnExit
                placement="center"
                motionPreset="slide-in-bottom"
                closeOnInteractOutside={false}
                closeOnEscape={false}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="solid"
                    colorPalette="red"
                    size={{
                      base: 'md',
                      sm: 'xs',
                      md: 'md',
                    }}
                  >
                    Удалить проект
                  </Button>
                </DialogTrigger>
                <DeleteProjectModal onDeleteAction={handleDeleteProject} />
              </DialogRoot>
            </HStack>
          </Box>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
