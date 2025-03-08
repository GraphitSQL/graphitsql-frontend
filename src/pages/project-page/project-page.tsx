import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  NodeChange,
  Connection,
  ConnectionMode,
  Panel,
  Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { COLORS } from '@/common/constants';
import { Box, Button, Loader } from '@chakra-ui/react';

import { TableNode, TableRowNode } from './components/nodes';
import { SidebarPanel } from './components/sidebar/sidebar';

import { PreResolutionNode, TTableNodeData, TTableRowNodeData } from './types';
import CustomEdge from './components/edges/bidirectional-edge';
import { toaster } from '@/common/components/ui/toaster';
import { useParams } from 'react-router-dom';

const nodeTypes = { custom: TableRowNode, table: TableNode };
const edgeTypes = {
  custom: CustomEdge,
};

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [nodes, setNodes] = useNodesState<PreResolutionNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodesChange = useCallback(
    (changes: NodeChange<PreResolutionNode>[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      setHasUnsavedChanges(true);
    },
    [setNodes]
  );

  const handleAddNode = (newNodes: PreResolutionNode[]) => {
    setNodes((nodes) => [...nodes, ...newNodes]);
  };

  const updateNodeById = (id: string, data: Partial<TTableNodeData> | Partial<TTableRowNodeData>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setNodes((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              data: {
                ...item.data,
                ...data,
              },
            }
          : item
      )
    );
  };

  const clearWorkSpace = () => {
    setNodes([]);
    setEdges([]);
    toaster.success({
      title: 'Готово',
      description: 'Данные удалены',
    });
    setHasUnsavedChanges(true);
  };

  const removeNode = (nodeId: string) => {
    setNodes((els) => els.filter((el) => el.id !== nodeId));
    setHasUnsavedChanges(true);
  };

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

      if (!savedFlow) return;

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
              updateNodeById={updateNodeById}
              clearWorkSpace={clearWorkSpace}
              removeNode={removeNode}
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
