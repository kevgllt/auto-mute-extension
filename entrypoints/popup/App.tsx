// entrypoints/popup/App.tsx

/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { browser } from 'wxt/browser';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { TabDisplayList } from '../../components/ui/TabDisplayList';

type TabData = chrome.tabs.Tab;

const PopupContainer = styled.div`
  padding: 16px;
  width: 720px;
  min-height: 200px;
  font-family: sans-serif;
`;

function App() {
  const [tabList, setTabList] = useState<TabData[]>([]);
  // --- Novo Estado ---
  // Armazena o ID da aba de música selecionada pelo usuário
  const [musicTabId, setMusicTabId] = useState<number | null>(null);

  // --- Atualização do useEffect ---
  // Agora busca as abas E a configuração salva no storage.
  useEffect(() => {
    const loadData = async () => {
      // Busca as abas abertas
      const allTabsPromise = browser.tabs.query({});
      // Busca o ID salvo no storage
      const storagePromise = browser.storage.local.get('musicTabId');

      const [allTabs, storageResult] = await Promise.all([allTabsPromise, storagePromise]);

      setTabList(allTabs);
      if (storageResult.musicTabId) {
        setMusicTabId(storageResult.musicTabId);
      }
    };

    loadData();
  }, []);

  // --- Lógica para Definir a Aba de Música ---
  const handleSetMusicTab = async (tabId: number) => {
    // Salva a escolha no armazenamento persistente da extensão
    await browser.storage.local.set({ musicTabId: tabId });
    // Atualiza o estado local para refletir a mudança imediatamente na UI
    setMusicTabId(tabId);
    console.log(`Aba de música definida com ID: ${tabId}`);
  };

  // Funções handleMuteAll e handleUnmuteAll (mantidas da etapa anterior)
  const handleMuteAll = async () => { /* ... código anterior ... */ };
  const handleUnmuteAll = async () => { /* ... código anterior ... */ };

  return (
    <PopupContainer>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <Button variant="contained" color="error" onClick={handleMuteAll}>
          Mutar Todas
        </Button>
        <Button variant="contained" color="success" onClick={handleUnmuteAll}>
          Desmutar Todas
        </Button>
      </Stack>

      <h2>Abas Abertas</h2>
      {/* --- Passando as novas props para o componente de lista --- */}
      <TabDisplayList
        tabs={tabList}
        selectedTabId={musicTabId}
        onSelectTab={handleSetMusicTab}
      />
    </PopupContainer>
  );
}

export default App;