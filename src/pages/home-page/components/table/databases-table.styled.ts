import { EmptyState, Table } from '@chakra-ui/react';
import styled from 'styled-components';
import { COLORS } from '../../../../common/constants';

export const StyledTableBody = styled(Table.Body)`
  tr:nth-child(even) {
    background-color: ${COLORS.navy[900]};
  }
`;

export const StyledTableHeader = styled(Table.Header)`
  th {
    color: ${COLORS.teal[400]};
    font-weight: 600;
    background-color: ${COLORS.navy[900]};
  }
`;

export const StyledIndicator = styled(EmptyState.Indicator)`
  svg {
    width: 6em;
    height: 6em;
  }
`;
