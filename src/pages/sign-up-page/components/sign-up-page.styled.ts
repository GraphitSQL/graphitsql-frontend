import styled from 'styled-components';
import { COLORS } from '../../../common/constants';
import { Button } from '@chakra-ui/react';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: space-between;
  gap: 30px;
`;

export const ImageContainer = styled.div`
  background-color: ${COLORS.teal[700]};
  flex: 1;
  padding: 25px;

  h2 {
    color: ${COLORS.teal[50]};
    font-weight: 900;
    font-size: 3.3em;
    line-height: 1.5;
  }

  div {
    p {
      color: ${COLORS.teal[50]};
    }
    margin-bottom: 25%;
  }

  p {
    color: ${COLORS.gray[900]};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  flex: 2;
  height: 100%;
  padding: 30px 10px;
  @media (max-width: 768px) {
    .chakra-steps__title {
      display: none;
    }
    width: 100%;
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 18px;
    }
  }
`;

export const SubmitButton = styled(Button)`
  padding: 20px 0;
  margin: 10px auto;
  font-weight: bold;
  width: 70%;

  &:hover {
    opacity: 0.9;
  }
`;
