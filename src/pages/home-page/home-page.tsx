import { Box, Heading, HStack, Text, Button, Input } from '@chakra-ui/react';
import { COLORS } from '../../common/constants';
import { DatabaseTable } from './components/table/databases-table';
import { InputGroup } from '../../common/components/ui/input-group';
import { Icons } from '../../common/assets/icons';

export const HomePage: React.FC = () => {
  return (
    <>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'30px'}
      >
        <Box>
          <Heading size={'3xl'}>Database list</Heading>
          <Text color={COLORS.gray[600]}>15 databases</Text>
        </Box>
        <HStack>
          <InputGroup
            flex="3"
            endElement={<Icons.Search color={COLORS.teal[400]} />}
          >
            <Input placeholder="Search" borderRadius={30} />
          </InputGroup>
          <Button variant="surface" borderRadius={30}>
            New diagramm
          </Button>
        </HStack>
      </HStack>

      <DatabaseTable />
    </>
  );
};
