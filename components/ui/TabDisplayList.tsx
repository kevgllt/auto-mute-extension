// components/ui/TabDisplayList.tsx

import React from 'react';
// Importações do Material-UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button'; // Importar o botão
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Ícone para a aba selecionada
import TabIcon from '@mui/icons-material/Tab';

// Definimos o tipo de dados que este componente espera receber (props)
interface TabData {
  id?: number;
  title?: string;
  url?: string;
}

// Novas propriedades: o ID da aba selecionada e a função para selecionar uma nova aba
interface TabDisplayListProps {
  tabs: TabData[];
  selectedTabId: number | null;
  onSelectTab: (id: number) => void;
}

export function TabDisplayList({ tabs, selectedTabId, onSelectTab }: TabDisplayListProps) {
  return (
    <List dense>
      {tabs.map((tab) => {
        // Verifica se esta aba da iteração é a que está selecionada globalmente
        const isSelected = tab.id === selectedTabId;

        return (
          <ListItem
            key={tab.id}
            // Adiciona um destaque visual se a aba estiver selecionada
            sx={{ backgroundColor: isSelected ? '#dcfce7' : 'transparent' }}
            // Adiciona o botão de ação no final do item da lista
            secondaryAction={
              <Button
                variant={isSelected ? "contained" : "outlined"}
                size="small"
                onClick={() => onSelectTab(tab.id!)} // O '!' assume que tab.id sempre existirá aqui
                disabled={isSelected}
              >
                {isSelected ? 'Alvo' : 'Definir'}
              </Button>
            }
          >
            <ListItemIcon>
              {/* Muda o ícone se for a aba selecionada */}
              {isSelected ? <MusicNoteIcon color="success" /> : <TabIcon />}
            </ListItemIcon>
            <ListItemText
              primary={tab.title || 'Aba sem título'}
              secondary={`ID: ${tab.id}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}