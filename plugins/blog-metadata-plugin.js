/**
 * Plugin para gerar arquivo JSON com metadados de todos os posts do blog
 * Isso permite que o BlogPostPage acesse todos os posts para encontrar relacionados
 */

const fs = require('fs');
const path = require('path');

function blogMetadataPlugin(context, options) {
  return {
    name: 'blog-metadata-plugin',
    async loadContent() {
      return null;
    },
    async contentLoaded({content, actions}) {
    },
  };
}

module.exports = blogMetadataPlugin;
