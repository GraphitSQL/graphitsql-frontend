import { Tabs } from '@chakra-ui/react';
import { AccountSettings, SecuritySettings } from './components/tabs';

export const PofilePage: React.FC = () => {
  return (
    <>
      <Tabs.Root lazyMount defaultValue="tab-1">
        <Tabs.List>
          <Tabs.Trigger value="tab-1">Account settings</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">Login & Security</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          <AccountSettings />
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          <SecuritySettings />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
