/**
 * Plugin para gerar arquivo JSON com metadados de todos os posts do blog
 * Permite que BlogPostPage acesse todos os posts para encontrar relacionados
 */

const fs = require('fs');
const path = require('path');

function generateBlogMetadataPlugin(context, options) {
  return {
    name: 'generate-blog-metadata',
    async loadContent() {
      return null;
    },
    async contentLoaded({content, actions}) {
    },
    async postBuild({outDir}) {

    },
  };
}

module.exports = generateBlogMetadataPlugin;
