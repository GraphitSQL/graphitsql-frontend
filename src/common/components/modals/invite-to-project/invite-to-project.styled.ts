import styled from 'styled-components';
import { Text } from '@chakra-ui/react';

export const UserName = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10vw;
  font-size: 14px;
  font-weight: bold;
`;
