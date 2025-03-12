import { COLORS } from '@/common/constants';
import { Button, Text } from '@chakra-ui/react';
import styled from 'styled-components';

export const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 300px;
  height: 88vh;
  background-color: ${COLORS.gray[900]};
  border: 1px solid ${COLORS.gray[700]};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: none;
  box-shadow: 2px 0 5px rgba(38, 38, 38, 0.3);
  position: absolute;
  bottom: 0;
  z-index: 1000;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-99%')});
  transition: transform 0.3s ease;
`;

export const ToggleButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 305px;
  z-index: 1001;
`;

export const UserName = styled(Text)`
  margin-left: 3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10vw;
  font-size: 12px;
  font-weight: bold;
`;
