/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    localeConfigs: {
      pt: {
        label: 'Português',
      },
      en: {
        label: 'English',
      },
    },
  },
  title: 'Z-API Docs',
  tagline: 'Documentação completa da API',
  url: 'https://developer.z-api.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://www.z-api.io/wp-content/themes/z-api/favicon.png',
  organizationName: 'Z-API',
  projectName: 'z-api-docs',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Z-API Logo',
        src:
          'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Learn',
    //       items: [
    //         {
    //           label: 'Style Guide',
    //           to: 'docs/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: 'blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Legal',
    //       // Please do not remove the privacy and terms, it's a legal requirement.
    //       items: [
    //         {
    //           label: 'Privacy',
    //           href: 'https://opensource.facebook.com/legal/privacy/',
    //         },
    //         {
    //           label: 'Terms',
    //           href: 'https://opensource.facebook.com/legal/terms/',
    //         },
    //         {
    //           label: 'Data Policy',
    //           href: 'https://opensource.facebook.com/legal/data-policy/',
    //         },
    //         {
    //           label: 'Cookie Policy',
    //           href: 'https://opensource.facebook.com/legal/cookie-policy/',
    //         },
    //       ],
    //     },
    //   ],
    //   logo: {
    //     alt: 'Z-API Docs',
    //     src:
    //       'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
    //     href: 'https://opensource.facebook.com',
    //   },
    //   // Please do not remove the credits, help to publicize Docusaurus :)
    //   copyright: `Copyright © ${new Date().getFullYear()} Z-API.`,
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Z-API/z-api-docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
