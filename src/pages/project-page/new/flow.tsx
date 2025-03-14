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
  // type Node,
  type Edge,
  OnEdgesChange,
  applyEdgeChanges,
} from '@xyflow/react';
import { randomColor } from '@chakra-ui/theme-tools';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Markers } from './components';
import { Button } from '@chakra-ui/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './config';
import { COLORS } from '@/common/constants';
import { useParams } from 'react-router-dom';
import './Style';
import ContextMenu from './components/context-menu';

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

  const onEdgeContextMenu = useCallback(
    (event: any, edge: Edge) => {
      // Prevent native context menu from showing
      event.preventDefault();
      console.log(edge);

      const pane = ref?.current?.getBoundingClientRect();
      setMenu({
        id: edge.id,
        markerEnd: edge.markerEnd,
        top: event.clientY < pane.height - 200 && event.clientY - 100,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
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
    const mockNode = {
      id: `${Date.now()}`,
      data: {
        name: 'new_table',
        columns: [
          {
            id: `${Date.now()}`,
            name: 'id',
            description: 'Unique identifier.',
            key: true,
            type: 'integer',
          },
        ],
        schemaColor: randomColor(),
      },
      position: {
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
      },
      type: 'table',
    };
    reactFlow.addNodes([mockNode]);
  }, []);

  useEffect(() => {
    setNodes(currentDatabase.nodes);
    setEdges(currentDatabase.edges);
  }, [currentDatabase.edges, currentDatabase.nodes]);

  return (
    <>
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
        <Panel position="top-right" style={{ padding: '20px', display: 'flex', gap: 5 }}>
          <Button onClick={onSave} disabled={!hasUnsavedChanges} variant={'surface'}>
            Сохранить
          </Button>
          <Button onClick={handleAddNode}>Добавить таблицу</Button>
        </Panel>
      </ReactFlow>
    </>
  );
};

export default Flow;
