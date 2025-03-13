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
} from '@xyflow/react';
import { randomColor } from '@chakra-ui/theme-tools';
import { useCallback, useEffect, useState } from 'react';
import { Markers } from './components';
import { Box, Button } from '@chakra-ui/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './config';
import { COLORS } from '@/common/constants';
import { useParams } from 'react-router-dom';
import './Style';

type FlowProps = {
  currentDatabase: {
    nodes: any[];
    edges: any[];
  };
};

const Flow: React.FC<FlowProps> = ({ currentDatabase }) => {
  const { id: projectId } = useParams();
  const reactFlow = useReactFlow();

  const [nodes, setNodes] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => {
        console.log(params);
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

  const onNodesChange = useCallback((changes: NodeChange<any>[]) => {
    console.log(changes);
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
    <Box style={{ width: '100vw', height: '87dvh' }}>
      <Markers />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setRfInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 2 }}
        onlyRenderVisibleElements
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Controls style={{ color: COLORS.teal[600] }} orientation="horizontal" position="bottom-right" />
        <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
        <Panel position="top-right" style={{ padding: '20px', display: 'flex', gap: 5 }}>
          <Button onClick={onSave} disabled={!hasUnsavedChanges}>
            Сохранить
          </Button>
          <Button onClick={handleAddNode}>Добавить таблицу</Button>
        </Panel>
      </ReactFlow>
    </Box>
  );
};

export default Flow;
