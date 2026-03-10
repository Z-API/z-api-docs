/**
 * Configuração de setup para testes
 *
 * Este arquivo é executado antes de cada teste.
 * Configura o ambiente de testes e mocks necessários.
 */
import '@testing-library/jest-dom';
import React from 'react';
// Mock do Docusaurus
jest.mock('@docusaurus/Link', () => {
    return function MockLink({ to, children, ...props }) {
        return React.createElement('a', { href: to, ...props }, children);
    };
});
jest.mock('@docusaurus/useDocusaurusContext', () => ({
    __esModule: true,
    default: () => ({
        siteConfig: {
            title: 'Z-API Central',
            tagline: 'Documentação completa da API Z-API',
        },
    }),
}));
jest.mock('@theme/Heading', () => ({
    __esModule: true,
    default: ({ as: Component = 'h1', children, ...props }) => {
        const Tag = Component;
        return React.createElement(Tag, props, children);
    },
}));
jest.mock('@theme/Layout', () => ({
    __esModule: true,
    default: ({ children, ...props }) => {
        return React.createElement('div', { 'data-testid': 'layout', ...props }, children);
    },
}));
