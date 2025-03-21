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
    height: 100%;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  [data-message*="React Flow Pro"] {
    display: none;
  }

  pre {
    font-family: 'Open Sans', sans-serif;
  }
`;
