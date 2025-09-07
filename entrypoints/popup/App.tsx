// --- Importações ---
import styled from '@emotion/styled'; // Para criar "styled components"

// --- Método 1: Styled Components API ---
// Criamos um componente React customizado que já carrega seus próprios estilos.
const PopupContainer = styled.div`
  background-color: #1f2937; /* Um cinza escuro */
  padding: 20px;
  width: 250px;
  height: 250px;
  color: white;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem; /* 20px */
  color: #60a5fa; /* Um azul claro */
  margin-top: 0;
`;

// --- Componente Principal ---
function App() {
  return (
    <PopupContainer>
      <Title>Teste com Emotion!</Title>
      <p>
        Este parágrafo usa a prop <strong>css</strong> para estilização local.
      </p>
    </PopupContainer>
  );
}

export default App;