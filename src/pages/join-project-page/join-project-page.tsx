import { useLocation, useNavigate, useParams } from 'react-router';
import { Routing } from '@/common/routes';
import { useEffect } from 'react';
import { LocalStorageItem } from '@/common/constants';
import { Box, Spinner } from '@chakra-ui/react';
import { joinToProjectRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';

const JoinProjectPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token: token } = useParams();

  const handleProjectInvitation = async (projectToken: string) => {
    try {
      const projectId = await joinToProjectRequest(projectToken);
      if (!projectId) {
        throw new Error('Неожиданная ошибка сервера');
      }
      navigate(Routing.projects.route(projectId));
    } catch (e: any) {
      toaster.error({
        title: 'Не удалось присоединиться к проекту',
        description: e?.message,
      });
    }
  };

  useEffect(() => {
    if (token) {
      const isAuth = pathname && !!localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
      if (!isAuth) {
        navigate(Routing.signIn.route(), { state: { prevPath: pathname } });
        return;
      }
      handleProjectInvitation(token);
    }
  }, [token]);

  return (
    <Box height={'90vh'} margin={'auto'}>
      <Spinner size={'lg'} />
    </Box>
  );
};

export default JoinProjectPage;
