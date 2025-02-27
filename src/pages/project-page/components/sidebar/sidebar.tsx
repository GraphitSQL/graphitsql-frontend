import { useState } from 'react';
import { Sidebar, ToggleButton } from './sidebar.styled';
import { randomColor } from '@chakra-ui/theme-tools';
import { PreResolutionNode, TTableNode, TTableRowNode } from '../../types';
import { SidebarTables, TableSectionHeader } from './components/tables';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionRoot,
} from '@/common/components';
import { SidebarNoteSection } from './components/notes';

type SidebarPanelProps = {
  handleAddNode: (arg: PreResolutionNode[]) => void;
  updateNodeById: (
    id: string,
    data: Partial<PreResolutionNode['data']>
  ) => void;
  nodes: PreResolutionNode[];
  clearWorkSpace: () => void;
  removeNode: (arg: string) => void;
};
export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  handleAddNode,
  nodes,
  updateNodeById,
  clearWorkSpace,
  removeNode,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const addTableNode = () => {
    const newNode: PreResolutionNode = {
      id: `${Date.now()}`,
      type: 'table',
      data: {
        label: `table - ${nodes.length + 1}`,
        childrenCount: 0,
        color: randomColor(),
      },
      zIndex: nodes.length + 1,
      position: {
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
      },
    };
    handleAddNode([newNode]);
  };
  const addTableField = (parent: TTableNode) => {
    const field: TTableRowNode = {
      id: `${Date.now()}`,
      type: 'custom',
      data: {
        label: '',
        dataType: '',
        isNull: true,
        isPK: false,
      },
      position: { x: 0, y: (parent.data.childrenCount + 1) * 50 },
      extent: 'parent',
      draggable: false,
      parentId: parent.id,
      focusable: false,
      deletable: false,
    };
    updateNodeById(parent.id, { childrenCount: parent.data.childrenCount + 1 });
    handleAddNode([field]);
  };
  const deleteTableField = (parent: TTableNode, fieldId: string) => {
    removeNode(fieldId);
    updateNodeById(parent.id, { childrenCount: parent.data.childrenCount - 1 });
  };

  return (
    <Sidebar isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar} size={'xs'}>
        {isOpen ? '<<' : '>>'}
      </ToggleButton>
      <AccordionRoot collapsible defaultValue={['tables', 'notes']}>
        <AccordionItem key={'tables-item'} value={'tables'}>
          <TableSectionHeader
            addTableNode={addTableNode}
            clearWorkSpace={clearWorkSpace}
          />

          <AccordionItemContent maxHeight={'65vh'} overflow={'auto'}>
            <SidebarTables
              nodes={nodes}
              addTableField={addTableField}
              updateNodeById={updateNodeById}
              deleteTableField={deleteTableField}
            />
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem key={'notes-item'} value={'notes'}>
          <SidebarNoteSection />
        </AccordionItem>
      </AccordionRoot>
    </Sidebar>
  );
};
