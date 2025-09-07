import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    // Adicione a permissão aqui:
    permissions: [
      "tabs",
      "storage" // Boa ideia manter, vamos precisar dela para salvar o ID da aba de música.
    ],
    // ... outras configurações do manifesto ...
  },
});