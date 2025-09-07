import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 1. Importe o componente Global e o helper css do Emotion
import { Global, css } from '@emotion/react';

// 2. Defina seus estilos globais
const globalStyles = css`
  /* Reset de box-sizing e configuração de fonte base */
  * {
    box-sizing: border-box;
  }

  html {
    /* Define a base de cálculo: 1rem = 10px */
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    /* Define o tamanho de fonte padrão do corpo para 16px (1.6 * 10px) */
    font-size: 1.6rem;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
);
