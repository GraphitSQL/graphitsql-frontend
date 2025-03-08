import { Box, Button, For, HStack, Input, VStack, Text } from '@chakra-ui/react';
import { AccordionItem, AccordionItemContent, AccordionRoot, AccordionItemTrigger } from '@/common/components';
import { COLORS } from '@/common/constants';
import { Icons } from '@/common/assets/icons';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/common/components/ui/menu';

type TableAccordionProps = {
  addTableField: (arg: any) => void;
  updateNodeById: (id: string, data: any) => void;
  nodes: any[];
  updateTableScheme: (a: any, b: any, c: any) => void;
};
export const SidebarTables: React.FC<TableAccordionProps> = ({
  nodes,
  updateNodeById,
  addTableField,
  // deleteTableField,
  updateTableScheme,
}) => {
  return (
    <AccordionRoot collapsible>
      {nodes.map((item, index) => (
        <AccordionItem key={index} value={item.id} borderLeft={`3px solid ${item.data.color}`}>
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
              <For each={item.data.schema as Array<any>}>
                {(row) => (
                  <HStack key={row.id} gap={2}>
                    <Input
                      defaultValue={row.title as string}
                      placeholder="Название поля"
                      marginBottom={2}
                      onChange={(e) => updateTableScheme(item.id, row.id, { title: e.target.value })}
                    />
                    <Input
                      defaultValue={row.type as string}
                      placeholder="Тип данных"
                      marginBottom={2}
                      onChange={(e) =>
                        updateTableScheme(item.id, row.id, {
                          type: e.target.value,
                        })
                      }
                    />
                    <Button
                      size={'xs'}
                      fontFamily={'monospace'}
                      variant={'ghost'}
                      onClick={() =>
                        updateTableScheme(item.id, row.id, {
                          isNull: !row.isNull,
                        })
                      }
                    >
                      <Text color={row.isNull ? COLORS.teal[400] : 'white'}>N</Text>
                    </Button>
                    <Button
                      size={'xs'}
                      fontFamily={'monospace'}
                      variant={'ghost'}
                      onClick={() =>
                        updateTableScheme(item.id, row.id, {
                          isPK: !row.isPK,
                        })
                      }
                    >
                      <Icons.PrimaryKey color={row.isPK ? COLORS.teal[300] : 'white'} />
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
                          // onClick={() => deleteTableField(item, row.id)}
                        >
                          Удалить поле
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  </HStack>
                )}
              </For>
              <Button size={'xs'} variant={'surface'} fontSize={10} onClick={() => addTableField(item.id)}>
                Добавить поле
              </Button>
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
