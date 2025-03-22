import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useParams } from 'react-router-dom';

interface YjsProviderContextType {
  doc: Y.Doc | null;
  provider: WebsocketProvider | null;
  isConnected: boolean;
  awareness: any | null;
  roomName: string;
}

const YjsProviderContext = createContext<YjsProviderContextType>({
  doc: null,
  provider: null,
  isConnected: false,
  awareness: null,
  roomName: '',
});

interface YjsProviderProps {
  children: ReactNode;
}

export const YjsProvider: React.FC<YjsProviderProps> = ({ children }) => {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [awareness, setAwareness] = useState<any | null>(null);
  const { id: projectId } = useParams();
  const roomName = `graphitsql-erd-${projectId}`;

  useEffect(() => {
    if (!projectId) return;

    const yDoc = new Y.Doc();
    // Connect to WebSocket server (adjust URL as needed)
    const wsProvider = new WebsocketProvider('ws://localhost:1234', roomName, yDoc, { connect: true });

    wsProvider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    setDoc(yDoc);
    setProvider(wsProvider);
    setAwareness(wsProvider.awareness);

    return () => {
      wsProvider.disconnect();
      yDoc.destroy();
    };
  }, [projectId, roomName]);

  return (
    <YjsProviderContext.Provider value={{ doc, provider, isConnected, awareness, roomName }}>
      {children}
    </YjsProviderContext.Provider>
  );
};

export const useYjs = () => useContext(YjsProviderContext);
