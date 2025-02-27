import {
  PreResolutionNode,
  TTableNode,
  TTableRowNode,
} from '@/pages/project-page/types';
import {
  Box,
  Button,
  For,
  HStack,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionRoot,
  AccordionItemTrigger,
} from '@/common/components';
import { COLORS } from '@/common/constants';
import { Icons } from '@/common/assets/icons';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/common/components/ui/menu';

type TableAccordionProps = {
  addTableField: (arg: TTableNode) => void;
  updateNodeById: (
    id: string,
    data: Partial<PreResolutionNode['data']>
  ) => void;
  nodes: PreResolutionNode[];
  deleteTableField: (parent: TTableNode, fieldId: string) => void;
};
export const SidebarTables: React.FC<TableAccordionProps> = ({
  nodes,
  updateNodeById,
  addTableField,
  deleteTableField,
}) => {
  return (
    <AccordionRoot collapsible>
      {nodes
        .filter((el): el is TTableNode => el.type === 'table')
        .map((item, index) => (
          <AccordionItem
            key={index}
            value={item.id}
            borderLeft={`3px solid ${item.data.color}`}
          >
            <HStack padding={'10px 5px'}>
              <Input
                flex={2}
                variant="subtle"
                cursor="pointer"
                defaultValue={item.data.label}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateNodeById(item.id, { label: e.target.value });
                }}
              />
              <AccordionItemTrigger flex={1} />
            </HStack>
            <AccordionItemContent>
              <VStack alignItems={'end'} padding={'0 5px'}>
                <For
                  each={nodes.filter(
                    (row): row is TTableRowNode => row.parentId === item.id
                  )}
                >
                  {(row) => (
                    <HStack key={row.id} gap={2}>
                      <Input
                        defaultValue={row.data.label as string}
                        placeholder="Enter field name"
                        marginBottom={2}
                        onChange={(e) =>
                          updateNodeById(row.id, { label: e.target.value })
                        }
                      />
                      <Input
                        defaultValue={row.data.dataType as string}
                        placeholder="Enter datatype"
                        marginBottom={2}
                        onChange={(e) =>
                          updateNodeById(row.id, {
                            dataType: e.target.value,
                          })
                        }
                      />
                      <Button
                        size={'xs'}
                        fontFamily={'monospace'}
                        variant={'ghost'}
                        onClick={() =>
                          updateNodeById(row.id, {
                            isNull: !row.data.isNull,
                          })
                        }
                      >
                        <Text
                          color={row.data.isNull ? COLORS.teal[400] : 'white'}
                        >
                          N
                        </Text>
                      </Button>
                      <Button
                        size={'xs'}
                        fontFamily={'monospace'}
                        variant={'ghost'}
                        onClick={() =>
                          updateNodeById(row.id, {
                            isPK: !row.data.isPK,
                          })
                        }
                      >
                        <Icons.PrimaryKey
                          color={row.data.isPK ? COLORS.teal[300] : 'white'}
                        />
                      </Button>
                      <MenuRoot variant={'solid'}>
                        <MenuTrigger asChild>
                          <Button variant={'ghost'} size={'xs'}>
                            <Box style={{ transform: 'rotate(90deg)' }}>
                              <Icons.Dots color={COLORS.teal[100]} />
                            </Box>
                          </Button>
                        </MenuTrigger>
                        <MenuContent width={200}>
                          <MenuItem
                            value="profile"
                            onClick={() => deleteTableField(item, row.id)}
                          >
                            Delete field
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </HStack>
                  )}
                </For>
                <Button
                  size={'xs'}
                  variant={'surface'}
                  fontSize={10}
                  onClick={() => addTableField(item)}
                >
                  Add field
                </Button>
              </VStack>
            </AccordionItemContent>
          </AccordionItem>
        ))}
    </AccordionRoot>
  );
};
