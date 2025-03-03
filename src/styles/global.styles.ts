import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    background-color:rgb(22, 23, 27);
  }
  body {
    color: white;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  [data-message*="React Flow Pro"] {
    display: none;
  }
`;
