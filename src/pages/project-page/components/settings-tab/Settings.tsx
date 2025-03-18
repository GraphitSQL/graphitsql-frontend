import { Tabs } from '@chakra-ui/react';
import { ProjectSettingsMainSettingTab } from './main-tab/MainSettings';
import { useParams } from 'react-router-dom';

export const SettingsContent: React.FC = () => {
  const { id: projectId } = useParams();

  return (
    <Tabs.Root lazyMount defaultValue="project-settings-tab-main-settings" variant="subtle" orientation="vertical">
      <Tabs.List>
        <Tabs.Trigger value="project-settings-tab-main-settings">Основное</Tabs.Trigger>
        <Tabs.Trigger value="project-settings-tab-team-members">Участники</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="project-settings-tab-main-settings" width={'100%'}>
        {projectId && <ProjectSettingsMainSettingTab projectId={projectId} />}
      </Tabs.Content>
      <Tabs.Content value="project-settings-tab-team-members">
        <>Team</>
      </Tabs.Content>
    </Tabs.Root>
  );
};
