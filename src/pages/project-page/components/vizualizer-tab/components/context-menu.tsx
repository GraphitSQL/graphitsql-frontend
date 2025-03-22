import { useReactFlow, Edge } from '@xyflow/react';
import { useCallback } from 'react';
import { useYjs } from '@/common/providers/YjsProvider';

export default function ContextMenu({ top, left, right, bottom, id, ...props }: any) {
  const { updateEdge } = useReactFlow();
  const { doc } = useYjs();

  const updateEdgeWithYjs = useCallback(
    (markerEnd: string) => {
      if (!doc) {
        // Fallback to direct update if Yjs is not available
        updateEdge(id, { markerEnd });
        return;
      }

      const sharedEdges = doc.getArray<Edge>('edges');
      const edges = sharedEdges.toArray();
      const edgeIndex = edges.findIndex((edge: Edge) => edge.id === id);

      if (edgeIndex >= 0) {
        doc.transact(() => {
          const updatedEdge = { ...(edges[edgeIndex] as object), markerEnd };
          sharedEdges.delete(edgeIndex, 1);
          sharedEdges.insert(edgeIndex, [updatedEdge as Edge]);
        });
      }
    },
    [doc, id, updateEdge]
  );

  const handleHasManyReversed = useCallback(() => {
    updateEdgeWithYjs('hasManyReversed');
  }, [updateEdgeWithYjs]);

  const handleHasOne = useCallback(() => {
    updateEdgeWithYjs('hasOne');
  }, [updateEdgeWithYjs]);

  return (
    <div style={{ top, left, right, bottom }} className="context-menu" {...props}>
      <button onClick={handleHasManyReversed}>1:M</button>
      <button onClick={handleHasOne}>1:1</button>
    </div>
  );
}
