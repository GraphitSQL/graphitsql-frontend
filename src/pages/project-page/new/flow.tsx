import {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlow,
  NodeChange,
  ConnectionMode,
  BackgroundVariant,
  Panel,
  addEdge,
  Connection,
  applyNodeChanges,
  ConnectionLineType,
  useReactFlow,
  type Edge,
  OnEdgesChange,
  applyEdgeChanges,
} from '@xyflow/react';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Markers } from './components';
import { Box, Button } from '@chakra-ui/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './config';
import { COLORS } from '@/common/constants';
import { useParams } from 'react-router-dom';
import './Style';
import ContextMenu from './components/context-menu';
import { generateNode } from './utils';

type FlowProps = {
  currentDatabase: {
    nodes: any[];
    edges: any[];
  };
};

const Flow: React.FC<FlowProps> = ({ currentDatabase }) => {
  const { id: projectId } = useParams();
  const reactFlow = useReactFlow();
  const ref = useRef<any>(null);

  const [nodes, setNodes] = useNodesState<any>([]);
  const [edges, setEdges] = useEdgesState<any>([]);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [menu, setMenu] = useState<any>(null);

  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    // Attach the contextmenu event listener to disable it globally
    document.addEventListener('contextmenu', handleContextMenu);

    // Clean up the event listener on component unmount
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
    (params: Connection) =>
      setEdges((eds) => {
        return addEdge(params, eds);
      }),
    []
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(`${projectId}`, JSON.stringify(flow));
      setHasUnsavedChanges(false);
    }
  }, [rfInstance]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => {
        setHasUnsavedChanges(true);
        return applyEdgeChanges(changes, eds);
      }),
    []
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodesChange = useCallback((changes: NodeChange<any>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
    setHasUnsavedChanges(true);
  }, []);

  const handleAddNode = useCallback(() => {
    const table = generateNode();
    reactFlow.addNodes([table]);
  }, []);

  useEffect(() => {
    setNodes(currentDatabase.nodes);
    setEdges(currentDatabase.edges);
  }, [currentDatabase.edges, currentDatabase.nodes]);

  return (
    <Box height={'80dvh'}>
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
        fitViewOptions={{ padding: 2 }}
        onlyRenderVisibleElements
        edgesReconnectable={false}
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
        <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
        {menu && <ContextMenu {...menu} />}
        <Panel position="top-right" style={{ paddingRight: '20px', display: 'flex', gap: 5 }}>
          <Button onClick={onSave} disabled={!hasUnsavedChanges} variant={'surface'} size={'xs'}>
            Сохранить
          </Button>
          <Button onClick={handleAddNode} size={'xs'}>
            Добавить таблицу
          </Button>
        </Panel>
      </ReactFlow>
    </Box>
  );
};

export default Flow;
