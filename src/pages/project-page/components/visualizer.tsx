import { ReactFlowProvider } from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Flow from './flow';
import { Tabs } from '@chakra-ui/react';
import { LuStickyNote, LuWorkflow } from 'react-icons/lu';
import { getProjectDataRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';

const Visualizer: React.FC = () => {
  const [currentDatabase, setCurrentDatabase] = useState<any>({
    nodes: [],
    edges: [],
  });
  const [databasesLoaded, setDatabasesLoaded] = useState(false);
  const { id: projectId } = useParams();

  const handleFetchData = useCallback(async () => {
    const restoreFlow = async () => {
      try {
        const savedFlow = await getProjectDataRequest(projectId!);
        if (!savedFlow) {
          throw new Error('Данные не найдены');
        }
        setCurrentDatabase({
          nodes: savedFlow?.data?.nodes ?? [],
          edges: savedFlow?.data?.edges ?? [],
        });
        if (savedFlow.isScratch) {
          toaster.create({
            type: 'info',
            title: 'Проeкт пуст',
            description: 'Давайте добавим первую таблицу. Для этого нажмите на кнопку Добавить на рабочей области',
          });
        }
      } catch (e: any) {
        toaster.error({
          title: 'Не удалось загрузить данные',
          description: e?.message || 'Непредвиденная ошибка',
        });
        throw new Error('доступ запрещен');
      }
    };

    if (projectId) {
      await restoreFlow();
      setDatabasesLoaded(true);
    }
  }, [projectId]);

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <Tabs.Root lazyMount defaultValue="tab-erd" variant={'outline'}>
      <Tabs.List>
        <Tabs.Trigger value="tab-erd">
          <LuWorkflow />
          ERD
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-notes">
          <LuStickyNote />
          Заметки
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab-erd">
        <ReactFlowProvider>{databasesLoaded && <Flow currentDatabase={currentDatabase} />}</ReactFlowProvider>
      </Tabs.Content>
      <Tabs.Content value="tab-notes">
        <>WORK IN PROGRES!!!</>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Visualizer;
