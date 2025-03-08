import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  // applyNodeChanges,
  // NodeChange,
  Connection,
  ConnectionMode,
  Panel,
  Edge,
  useReactFlow,
  ConnectionLineType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { COLORS } from '@/common/constants';
import { Box, Button, Loader } from '@chakra-ui/react';

// import { TableNode, TableRowNode } from './components/nodes';
import { SidebarPanel } from './components/sidebar/sidebar';

// import { PreResolutionNode } from './types';
import CustomEdge from './components/edges/bidirectional-edge';
// import { toaster } from '@/common/components/ui/toaster';
import { useParams } from 'react-router-dom';
import DatabaseSchemaDemo from './components/nodes/DatabaseSchemaNode';

const nodeTypes = {
  // custom: TableRowNode,
  // table: TableNode,
  databaseSchema: DatabaseSchemaDemo,
};
const edgeTypes = {
  custom: CustomEdge,
};

const defaultNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'databaseSchema',
    data: {
      label: 'Products',
      color: 'green',
      schema: [
        { id: 'p-1', title: 'id', type: 'uuid', isNull: false, isPK: true },
        { id: 'p-2', title: 'name', type: 'varchar', isNull: false, isPK: false },
        { id: 'p-3', title: 'description', type: 'varchar', isNull: true, isPK: false },
        { id: 'p-4', title: 'warehouse_id', type: 'uuid', isNull: false, isPK: false },
        { id: 'p-5', title: 'supplier_id', type: 'uuid', isNull: false, isPK: false },
        { id: 'p-6', title: 'price', type: 'money', isNull: false, isPK: false },
        { id: 'p-7', title: 'quantity', type: 'int4', isNull: false, isPK: false },
      ],
    },
  },
  {
    id: '2',
    position: { x: 350, y: -100 },
    type: 'databaseSchema',
    data: {
      label: 'Warehouses',
      color: 'red',
      schema: [
        { id: 'w-7', title: 'id', type: 'uuid', isNull: false, isPK: true },
        { id: 'w-1', title: 'name', type: 'varchar', isNull: false, isPK: false },
        { id: 'w-2', title: 'address', type: 'varchar', isNull: false, isPK: false },
        { id: 'w-3', title: 'capacity', type: 'int4', isNull: false, isPK: false },
      ],
    },
  },
  {
    id: '3',
    position: { x: 350, y: 200 },
    type: 'databaseSchema',
    data: {
      label: 'Suppliers',
      color: 'blue',
      schema: [
        { id: 's-1', title: 'id', type: 'uuid', isNull: false, isPK: true },
        { id: 's-2', title: 'name', type: 'varchar', isNull: false, isPK: false },
        { id: 's-3', title: 'description', type: 'varchar', isNull: true, isPK: false },
        { id: 's-4', title: 'country', type: 'varchar', isNull: false, isPK: false },
      ],
    },
  },
];

const defaultEdges: Edge[] = [
  {
    id: 'products-warehouses',
    source: '1',
    target: '2',
    sourceHandle: 'p-4',
    targetHandle: 'w-1',
  },
  {
    id: 'products-suppliers',
    source: '1',
    target: '3',
    sourceHandle: 'p-1',
    targetHandle: 's-1',
  },
];

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const reactFlow = useReactFlow();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [onNodesChange]);

  const handleAddNode = (newNodes: any[]) => {
    reactFlow.addNodes(newNodes);
  };

  const updateNodeData = (id: string, data: any) => {
    reactFlow.updateNodeData(id, data);
  };

  const clearWorkSpace = () => {
    setNodes([]);
    setEdges([]);
    // toaster.success({
    //   title: 'Готово',
    //   description: 'Данные удалены',
    // });
    // setHasUnsavedChanges(true);
  };

  // const removeNode = (nodeId: string) => {
  //   setNodes((els) => els.filter((el) => el.id !== nodeId));
  //   setHasUnsavedChanges(true);
  // };

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(`${projectId}`, JSON.stringify(flow));
      setHasUnsavedChanges(false);
    }
  }, [rfInstance]);

  const handleFetchData = useCallback(() => {
    const restoreFlow = async () => {
      const savedFlow = await new Promise<string | null>((resolve) => {
        setTimeout(() => {
          resolve(localStorage.getItem(`${projectId}`));
        }, 3000);
      });

      if (!savedFlow) {
        setNodes(defaultNodes);
        setEdges(defaultEdges);
        return;
      }

      const flow = JSON.parse(savedFlow);

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
    setIsLoading(false);
  }, [setNodes]);

  useEffect(() => {
    if (projectId) handleFetchData();
  }, [projectId]);

  return (
    <Box display={'flex'} position={'relative'}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <SidebarPanel
              handleAddNode={handleAddNode}
              nodes={nodes}
              updateNodeData={updateNodeData}
              clearWorkSpace={clearWorkSpace}
              removeNode={() => undefined}
              getNode={reactFlow.getNode}
            />
          </Box>
          <Box style={{ width: '100vw', height: '87vh' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onInit={setRfInstance}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onDelete={(e) => console.log('ff', e)}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
              fitViewOptions={{ padding: 2 }}
              defaultEdgeOptions={{
                // animated: true,
                type: 'smoothstep',
              }}
              connectionLineType={ConnectionLineType.SmoothStep}
            >
              <Controls style={{ color: COLORS.teal[600] }} orientation="horizontal" position="bottom-right" />
              <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
              <Panel position="top-right">
                <Button onClick={onSave} disabled={!hasUnsavedChanges}>
                  Сохранить
                </Button>
              </Panel>
            </ReactFlow>
          </Box>
        </>
      )}
    </Box>
  );
};
