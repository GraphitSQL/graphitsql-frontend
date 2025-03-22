import { ReactFlowProvider } from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '@chakra-ui/react';
import { LuSettings2, LuStickyNote, LuWorkflow } from 'react-icons/lu';
import { getProjectDataRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';
import { Notes } from './notes-tab/notes';
import { SettingsContent } from './settings-tab/Settings';
import { YjsProvider } from '@/common/providers/YjsProvider';
import CollaborativeFlow from './vizualizer-tab/collaborative-flow';

const Workspace: React.FC = () => {
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
          nodes: savedFlow?.data?.nodes.map((el) => ({ ...el, dragHandle: '.table__name' })) ?? [],
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
    <Tabs.Root lazyMount defaultValue="tab-erd" variant={'outline'} unmountOnExit>
      <Tabs.List>
        <Tabs.Trigger value="tab-erd">
          <LuWorkflow />
          ERD
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-notes">
          <LuStickyNote />
          Заметки
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-settings">
          <LuSettings2 />
          Настройки
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab-erd">
        <YjsProvider>
          <ReactFlowProvider>
            {databasesLoaded && <CollaborativeFlow currentDatabase={currentDatabase} />}
          </ReactFlowProvider>
        </YjsProvider>
      </Tabs.Content>
      <Tabs.Content value="tab-notes">
        <Notes />
      </Tabs.Content>
      <Tabs.Content value="tab-settings">
        <SettingsContent />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Workspace;
