import { browser } from 'wxt/browser';

// O WXT espera que exportemos defineBackground como padrão.
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

   // <<< COLOQUE TODO O CÓDIGO AQUI DENTRO >>>

  console.log('Script de background carregado. Monitorando áudio...');

  /**
   * Função principal que avalia o estado de todas as abas e decide se
   * a aba de música deve ser mutada ou desmutada.
   */
  async function reevaluateMuteState() {
    // 1. Obter o ID da aba de música alvo.
    const storageData = await browser.storage.local.get('musicTabId');
    const musicTabId = storageData.musicTabId as number | undefined;

    if (!musicTabId) return;

    // 2. Verificar se a aba de música ainda existe.
    try {
      await browser.tabs.get(musicTabId);
    } catch (error) {
      await browser.storage.local.remove('musicTabId');
      return;
    }

    // 3. Encontrar todas as abas que estão tocando áudio ATIVAMENTE.
    const allAudibleTabs = await browser.tabs.query({ audible: true });

    // 4. Lógica de decisão: Existe alguma *outra* aba tocando áudio?
    const otherAudioSourcePlaying = allAudibleTabs.some(
      (tab) => tab.id !== musicTabId
    );

    // 5. Aplicar o mudo ou desmudo na aba de música.
    if (otherAudioSourcePlaying) {
      await browser.tabs.update(musicTabId, { muted: true });
    } else {
      await browser.tabs.update(musicTabId, { muted: false });
    }
  }

  // --- Gatilhos de Eventos ---
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.audible !== undefined) {
      reevaluateMuteState();
    }
  });

  browser.tabs.onRemoved.addListener(() => {
    reevaluateMuteState();
  });

  browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && changes.musicTabId) {
          reevaluateMuteState();
      }
  });

});



