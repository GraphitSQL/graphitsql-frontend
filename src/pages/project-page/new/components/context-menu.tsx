import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

export default function ContextMenu({ top, left, right, bottom, id, ...props }: any) {
  const { updateEdge } = useReactFlow();

  const handleHasManyReversed = useCallback(() => {
    updateEdge(id, { markerEnd: 'hasManyReversed' });
  }, []);

  const handleHasOne = useCallback(() => {
    updateEdge(id, { markerEnd: 'hasOne' });
  }, []);

  return (
    <div style={{ top, left, right, bottom }} className="context-menu" {...props}>
      <button onClick={handleHasManyReversed}>1:M</button>
      <button onClick={handleHasOne}>1:1</button>
    </div>
  );
}
