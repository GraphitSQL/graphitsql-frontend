import { mockEdges, mockNodes } from '@/tmp/mocks/schemas';
import { ReactFlowProvider } from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Flow from './flow';

const Visualizer: React.FC = () => {
  const [currentDatabase, setCurrentDatabase] = useState<any>({
    nodes: [],
    edges: [],
  });
  const [databasesLoaded, setDatabasesLoaded] = useState(false);
  const { id: projectId } = useParams();

  const handleFetchData = useCallback(() => {
    const restoreFlow = async () => {
      const savedFlow = await new Promise<string | null>((resolve) => {
        setTimeout(() => {
          resolve(localStorage.getItem(`${projectId}`));
        }, 1000);
      });

      if (!savedFlow) {
        setCurrentDatabase({
          nodes: mockNodes,
          edges: mockEdges,
        });
        return;
      }

      const flow = JSON.parse(savedFlow);

      if (flow) {
        setCurrentDatabase({
          nodes: flow.nodes,
          edges: flow.edges,
        });
      }
    };

    restoreFlow();
    setDatabasesLoaded(false);
  }, []);

  useEffect(() => {
    handleFetchData();
    setDatabasesLoaded(true);
  }, []);

  return <ReactFlowProvider>{databasesLoaded && <Flow currentDatabase={currentDatabase} />}</ReactFlowProvider>;
};

export default Visualizer;
