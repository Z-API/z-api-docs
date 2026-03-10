/**
 * Plugin Docusaurus para melhorias de acessibilidade
 * 
 * Registra client module para adicionar aria-labels automaticamente
 */

function accessibilityPlugin(_context, _options) {
  return {
    name: 'accessibility-plugin',
    getClientModules() {
      return [require.resolve('./accessibility.ts')];
    },
  };
}

module.exports = accessibilityPlugin;

