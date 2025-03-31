import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

export const UserName = styled(Text)`
  margin-left: 3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10vw;

  @media (max-width: 768px) {
    display: none;
  }
`;
