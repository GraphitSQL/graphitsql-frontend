import { COLORS } from '@/common/constants';
import styled from 'styled-components';

const Wrapper = styled.div<{ color?: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color || `${COLORS.teal[700]}`};
  border-radius: 50%;
  padding: 6px;
`;

type IconViewProps = {
  icon: React.ReactNode;
  color?: string;
};
export const IconView: React.FC<IconViewProps> = ({ color, icon }) => {
  return <Wrapper color={color}>{icon}</Wrapper>;
};
