import { useState } from 'react';
import { Sidebar, ToggleButton } from './sidebar.styled';
import { randomColor } from '@chakra-ui/theme-tools';
import { PreResolutionNode } from '../../types';
import { SidebarTables, TableSectionHeader } from './components/tables';
import { AccordionItem, AccordionItemContent, AccordionRoot } from '@/common/components';
import { SidebarNoteSection } from './components/notes';

type SidebarPanelProps = {
  handleAddNode: (arg: any[]) => any;
  updateNodeData: (id: string, data: any) => any;
  nodes: PreResolutionNode[];
  clearWorkSpace: () => any;
  removeNode: (arg: string) => void;
  getNode: any;
};

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  handleAddNode,
  nodes,
  updateNodeData,
  clearWorkSpace,
  // removeNode,
  getNode,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const addTableNode = () => {
    // const newNode: PreResolutionNode = {
    //   id: `${Date.now()}`,
    //   type: 'table',
    //   data: {
    //     label: `table - ${nodes.length + 1}`,
    //     childrenCount: 0,
    //     color: randomColor(),
    //   },
    //   zIndex: nodes.length + 1,
    // position: {
    //   x: (Math.random() - 0.5) * 150,
    //   y: (Math.random() - 0.5) * 150,
    // },
    // };
    const newNode = {
      id: `${Date.now()}`,
      position: {
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
      },
      type: 'databaseSchema',
      data: {
        label: `table - ${nodes.length + 1}`,
        color: randomColor(),
        schema: [{ id: `${Date.now()}`, title: 'id', type: 'uuid', isNull: false, isPK: true }],
      },
    };
    handleAddNode([newNode]);
  };

  const addTableField = (parentId: string) => {
    const tableNode = getNode(parentId);
    console.log('tableNode', tableNode, parentId);
    const tableSchema = [
      ...tableNode.data.schema,
      { id: `${Date.now()}`, title: 'id', type: 'uuid', isNull: false, isPK: true },
    ];
    updateNodeData(parentId, { schema: tableSchema });
  };

  const updateTableScheme = (parentId: string, fieldId: string, data: any) => {
    console.log('paentId', parentId, fieldId, data);
    const tableNode = getNode(parentId);

    console.info('tableNode', tableNode);
    const tableSchema = [...tableNode.data.schema].map((el) => {
      if (el.id === fieldId) {
        return { ...el, ...data };
      }

      return el;
    });
    updateNodeData(parentId, { schema: tableSchema });
  };

  // const deleteTableField = (parent: TTableNode, fieldId: string) => {
  //   removeNode(fieldId);
  // };

  return (
    <Sidebar isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar} size={'xs'}>
        {isOpen ? '<<' : '>>'}
      </ToggleButton>
      <AccordionRoot collapsible defaultValue={['tables', 'notes']}>
        <AccordionItem key={'tables-item'} value={'tables'}>
          <TableSectionHeader addTableNode={addTableNode} clearWorkSpace={clearWorkSpace} />

          <AccordionItemContent maxHeight={'65vh'} overflow={'auto'}>
            <SidebarTables
              nodes={nodes}
              addTableField={addTableField}
              updateNodeById={updateNodeData}
              updateTableScheme={updateTableScheme}
              // deleteTableField={() => {
              //   console.log('deleted');
              // }}
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
