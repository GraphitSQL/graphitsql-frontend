import {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlow,
  Node,
  NodeChange,
  ConnectionMode,
  BackgroundVariant,
  Panel,
  addEdge,
  Connection,
  applyNodeChanges,
  ConnectionLineType,
  useReactFlow,
  Edge,
  OnEdgesChange,
  applyEdgeChanges,
  useStoreApi,
  MiniMap,
} from '@xyflow/react';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Markers } from './config';
import { Box, Button } from '@chakra-ui/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './config';
import { COLORS } from '@/common/constants';
import { useParams } from 'react-router-dom';
import './Style';
import ContextMenu from './components/context-menu';
import { generateNode } from './utils';
import { updateProjectDataRequest } from '@/api/projects';
import { toaster } from '@/common/components/ui/toaster';
import { useYjs } from '@/common/providers/YjsProvider';
import { CollaborativeUsers } from './components/collaborative-users';

type CollaborativeFlowProps = {
  currentDatabase: {
    nodes: any[];
    edges: any[];
  };
};

const CollaborativeFlow: React.FC<CollaborativeFlowProps> = ({ currentDatabase }) => {
  const { id: projectId } = useParams();
  const reactFlow = useReactFlow();
  const store = useStoreApi();
  const ref = useRef<any>(null);

  const [nodes, setNodes] = useNodesState<any>([]);
  const [edges, setEdges] = useEdgesState<any>([]);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [menu, setMenu] = useState<any>(null);

  // Get the Yjs document and awareness from the provider
  const { doc, awareness, isConnected } = useYjs();

  // Set up Yjs shared types when the document is available
  useEffect(() => {
    if (!doc) return;

    // Create shared types for nodes and edges
    const sharedNodes = doc.getArray<Node>('nodes');
    const sharedEdges = doc.getArray<Edge>('edges');

    // Initialize with initial data if shared arrays are empty
    if (sharedNodes.length === 0 && currentDatabase.nodes.length > 0) {
      doc.transact(() => {
        currentDatabase.nodes.forEach((node) => {
          sharedNodes.push([node]);
        });
      });
    }

    if (sharedEdges.length === 0 && currentDatabase.edges.length > 0) {
      doc.transact(() => {
        currentDatabase.edges.forEach((edge) => {
          sharedEdges.push([edge]);
        });
      });
    }

    // Function to update nodes from Yjs
    const updateNodesFromYjs = () => {
      const yNodes = sharedNodes.toArray();
      setNodes(yNodes.map((node) => ({ ...node, dragHandle: '.table__name' })));
    };

    // Function to update edges from Yjs
    const updateEdgesFromYjs = () => {
      const yEdges = sharedEdges.toArray();
      setEdges(yEdges);
    };

    // Listen for changes on the shared types
    sharedNodes.observe(updateNodesFromYjs);
    sharedEdges.observe(updateEdgesFromYjs);

    // Initial update
    updateNodesFromYjs();
    updateEdgesFromYjs();

    // Set awareness state with user info
    if (awareness) {
      const uniqueColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      awareness.setLocalState({
        user: {
          name: 'User',
          color: uniqueColor,
        },
      });
    }

    return () => {
      sharedNodes.unobserve(updateNodesFromYjs);
      sharedEdges.unobserve(updateEdgesFromYjs);
    };
  }, [doc, currentDatabase.nodes, currentDatabase.edges, awareness]);

  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const onEdgeContextMenu = useCallback(
    (event: any, edge: Edge) => {
      // Prevent native context menu from showing
      event.preventDefault();

      const pane = ref?.current?.getBoundingClientRect();

      let newTop = event.clientY - pane.top;
      let newLeft = event.clientX - pane.left;

      if (newTop > pane.height) newTop = pane.height;
      if (newLeft > pane.width) newLeft = pane.width;
      setMenu({
        id: edge.id,
        markerEnd: edge.markerEnd,
        top: newTop,
        left: newLeft,
      });
    },
    [setMenu]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (!doc) return;

      const sharedEdges = doc.getArray<any>('edges');
      const newEdge = addEdge(params, []);

      doc.transact(() => {
        sharedEdges.push(newEdge);
      });

      setHasUnsavedChanges(true);
    },
    [doc]
  );

  const onSave = useCallback(() => {
    if (rfInstance && projectId && nodes.length > 0) {
      updateProjectDataRequest({
        projectId,
        payloadData: {
          nodes: nodes.map((el: any) => ({ ...el, projectId })),
          edges: edges.map((el: any) => ({ ...el, projectId })),
        },
      })
        .then((data) => {
          if (data) {
            toaster.success({
              title: 'Изменения сохранены',
            });
            setHasUnsavedChanges(false);
          }
        })
        .catch((e) => {
          toaster.error({
            title: 'Ошибка при сохранении данных',
            description: e?.message ?? 'Непредвиденная ошибка',
          });
          setHasUnsavedChanges(true);
        });
    }
  }, [rfInstance, nodes, edges, projectId]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      if (!doc) return;

      const sharedEdges = doc.getArray<any>('edges');
      const newEdges = applyEdgeChanges(changes, edges);

      doc.transact(() => {
        sharedEdges.delete(0, sharedEdges.length);
        newEdges.forEach((edge) => {
          sharedEdges.push([edge]);
        });
      });

      setHasUnsavedChanges(true);
    },
    [edges, doc]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodesChange = useCallback(
    (changes: NodeChange<any>[]) => {
      if (!doc) return;

      const sharedNodes = doc.getArray<any>('nodes');
      const newNodes = applyNodeChanges(changes, nodes);

      doc.transact(() => {
        sharedNodes.delete(0, sharedNodes.length);
        newNodes.forEach((node) => {
          sharedNodes.push([node]);
        });
      });

      setHasUnsavedChanges(true);
    },
    [nodes, doc]
  );

  const handleAddNode = useCallback(() => {
    if (!doc) return;

    const { domNode } = store.getState();
    const boundingRect = domNode?.getBoundingClientRect();

    if (boundingRect) {
      const center = reactFlow.screenToFlowPosition({
        x: boundingRect.x + boundingRect.width / 2,
        y: boundingRect.y + boundingRect.height / 2,
      });

      const newNode = generateNode({ x: center.x - 200, y: center.y - 200 });
      const sharedNodes = doc.getArray<any>('nodes');

      doc.transact(() => {
        sharedNodes.push([newNode]);
      });

      setHasUnsavedChanges(true);
    }
  }, [doc, reactFlow, store]);

  return (
    <Box height={'80dvh'} width={'100%'}>
      <Markers />
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onInit={setRfInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeContextMenu={onEdgeContextMenu}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        snapToGrid={true}
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        selectNodesOnDrag={false}
        nodeDragThreshold={5}
        edgesReconnectable={false}
        fitViewOptions={{ padding: 2 }}
        onlyRenderVisibleElements
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Controls
          style={{ color: COLORS.teal[600], padding: '20px' }}
          orientation="horizontal"
          position="bottom-right"
        />
        <MiniMap bgColor="teal" offsetScale={5} style={{ width: 100, height: 100 }} position="bottom-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        {menu && <ContextMenu {...menu} />}
        <Panel position="top-right" style={{ paddingRight: '20px', display: 'flex', gap: 5 }}>
          <Button onClick={onSave} disabled={!hasUnsavedChanges} variant={'surface'} size={'xs'}>
            Сохранить
          </Button>
          <Button onClick={handleAddNode} size={'xs'}>
            Добавить таблицу
          </Button>
        </Panel>
        <Panel position="top-left" style={{ paddingLeft: '20px' }}>
          <Box padding="2px 6px" bg={isConnected ? 'green.200' : 'red.200'} fontSize="xs" borderRadius="sm">
            {isConnected ? 'Подключен к серверу' : 'Не подключен к серверу'}
          </Box>
          <CollaborativeUsers />
        </Panel>
      </ReactFlow>
    </Box>
  );
};

export default CollaborativeFlow;
