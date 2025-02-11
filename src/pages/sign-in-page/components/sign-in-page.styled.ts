import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import { COLORS } from '../../../common/constants';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 50% 0;
  }
`;

export const ImageContainer = styled.div`
  background-color: ${COLORS.teal[700]};
  display: block;
  flex: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
  margin: auto;
  padding: 20px;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 20px 0;
`;

export const SubmitButton = styled(Button)`
  padding: 10px;
  margin-top: 10px;
  font-weight: bold;
  &:hover {
    opacity: 0.9;
  }
`;
