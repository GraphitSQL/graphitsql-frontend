import { Button } from '@chakra-ui/react';
import styled from 'styled-components';

export const VerificationForm = styled.form`
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VerifyButton = styled(Button)`
  padding: 20px 0;
  margin: 20px auto;
  font-weight: bold;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;
