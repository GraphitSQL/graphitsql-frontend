import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useYjs } from '@/common/providers/YjsProvider';

type User = {
  name: string;
  color: string;
};

type AwarenessState = {
  user: User;
};

export const CollaborativeUsers: React.FC = () => {
  const { awareness } = useYjs();
  const [users, setUsers] = useState<Record<number, AwarenessState>>({});

  useEffect(() => {
    if (!awareness) return;

    const updateUsers = () => {
      const states = awareness.getStates() as Map<number, AwarenessState>;
      const usersObj: Record<number, AwarenessState> = {};

      states.forEach((state, clientId) => {
        if (state.user) {
          usersObj[clientId] = state;
        }
      });

      setUsers(usersObj);
    };

    awareness.on('change', updateUsers);
    updateUsers(); // Initial call

    return () => {
      awareness.off('change', updateUsers);
    };
  }, [awareness]);

  if (Object.keys(users).length <= 1) return null;

  return (
    <Flex direction="row" gap={1}>
      {Object.entries(users).map(([clientId, state]) => (
        <div
          key={clientId}
          title={state.user.name}
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: state.user.color,
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {state.user.name.charAt(0).toUpperCase()}
        </div>
      ))}
    </Flex>
  );
};
