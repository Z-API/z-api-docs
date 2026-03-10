---
id: funcionamento-botoes
title: Funcionamento dos Botões
sidebar_position: 3
---

# <Icon name="MousePointerClick" size="lg" /> Funcionamento dos Botões

Guia sobre o comportamento atual dos botões no WhatsApp e fatores que influenciam seu funcionamento.

---

## Introdução

Nas últimas semanas as mensagens contendo botões estão sofrendo uma instabilidade em seu funcionamento.

**É importante lembrar que isso não se trata de um problema exclusivo do Z-API.**

Este tópico descreve como está o comportamento dos botões no WhatsApp em diferentes cenários.

---

:::danger Atenção

Essa documentação foi atualizada no dia 27/08/2024 então os fatos sobre o funcionamento dos botões estão baseados na realidade deste dia. Importante lembrar que a cada atualização do WhatsApp os botões podem sofrer alterações.

:::

---

## Fatores Decisivos

Para o funcionamento dos botões no WhatsApp, são dois fatores decisivos:

- Se o WhatsApp que está disparando a mensagem é business ou normal
- Se a mensagem está sendo enviada para chat normal ou para um grupo
- Aceitar os termos de uso dos botões

---

## Aceite dos Termos de Uso dos Botões

Para utilizar a funcionalidade dos botões, é necessário que você aceite os termos de uso, reconhecendo que está ciente de que futuras atualizações do WhatsApp podem causar instabilidades nessa funcionalidade.

![Termos de Uso dos Botões](/img/buttons-terms.jpeg)

---

## Tipos de Botões

Existem sete tipos de botões no WhatsApp:

- Botão simples com texto ([`/send-button-list`](/docs/messages/botoes))
- Botão simples com imagem ([`/send-button-list-image`](/docs/messages/botoes-imagem))
- Botão simples com vídeo ([`/send-button-list-video`](/docs/messages/botoes-video))
- Lista de opções ([`/send-option-list`](/docs/messages/lista-opcoes))
- Botões de ações ([`/send-button-actions`](/docs/messages/texto-botoes-acao))
- Botão de cópia ([`/send-button-otp`](/docs/messages/botao-otp))
- Botão PIX ([`/send-button-pix`](/docs/messages/botao-pix))

---

## Comportamento dos Botões

### Botão Simples com Texto

- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Botão Simples com Imagem

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Botão Simples com Vídeo

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Lista de Opções

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Botões de Ações

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Botão de Cópia (OTP)

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

### Botão de Chave PIX

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **FUNCIONA**

---

## Resumo

Em resumo, o uso dos recursos de botões no WhatsApp está sujeito a problemas. Tanto para o WhatsApp normal quanto para o WhatsApp Business, há dificuldades no envio desses tipos de botões em chats normais e grupos. Lista de opções para chat normal funcionam. Se você estiver usando o WhatsApp Business, a única coisa que está funcionando é a lista de opções para chat normal, com problemas para grupos.

---

## Próximos Passos

- [Botões](/docs/messages/botoes) - Documentação completa de botões
- [Botão OTP](/docs/messages/botao-otp) - Botão para copiar códigos
- [Botão PIX](/docs/messages/botao-pix) - Botão para pagamentos PIX

