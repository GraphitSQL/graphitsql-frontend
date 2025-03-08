import { Box } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledTitleContainer = styled(Box)`
  @media (max-width: 768px) {
    flex: 1;
    * {
      visibility: hidden;
    }
    p {
      display: none;
    }
  }
`;
