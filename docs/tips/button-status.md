---
id: button-status
title: Funcionamento dos Botões
---

## Introdução

Nas ultimas semanas as mensagens contendo botões estão sofrendo uma instabilidade em seu funcionamento.

**É importante lembrar que isso não se trata de um problema exclusivo da Z-API.**

Este tópico descreve como está o comportamento dos botões no WhatsApp em diferentes cenários.

---

:::danger Atenção

Essa documentação foi atualizada no dia 10/05/2023 então os fatos sobre o funcionamento dos botões estão baseados na realidade deste dia. Importante lembrar que a cada atualização do whatsapp os botões podem sofrer alterações.

:::

## Fatores decisivos:

#### Para o funcionamento dos botões no WhatsApp, são dois fatores decisivos:

- Se o WhatsApp que está disparando a mensagem é business ou normal
- Se a mensagem está sendo enviada para chat normal ou para um grupo.

## Tipos de botões

#### Existem quatro tipos de botões no WhatsApp:

- Botão simples com texto (/send-button-list)
- Botão simples com imagem (/send-button-list-image)
- Lista de opções (/send-option-list)
- Botões de ações (/send-option-list)

---

## Comportamento dos botões:

### [Botão simples com texto:](https://developer.z-api.io/message/send-button-list)

- Enviando de WhatsApp Normal para Grupo: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Normal para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Grupo: **SUJEITO A PROBLEMAS**

### [Botão simples com imagem:](https://developer.z-api.io/message/send-button-list-image)

- Enviando de WhatsApp Normal para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Normal para Grupo: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Grupo: **SUJEITO A PROBLEMAS**

### [Lista de opções:](https://developer.z-api.io/message/send-option-list)

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Grupo: **SUJEITO A PROBLEMAS**

### [Botões de ações:](https://developer.z-api.io/message/send-option-list)

- Enviando de WhatsApp Normal para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Normal para Grupo: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Grupo: **SUJEITO A PROBLEMAS**

## Resumo

Em resumo, o uso dos recursos de botões simples com imagem e texto no WhatsApp está sujeito a problemas. Tanto para o WhatsApp normal quanto para o WhatsApp Business, há dificuldades no envio desses tipos de botões em chats normais e grupos. Lista de opções para chat normal funcionam. Se você estiver usando o WhatsApp Business, a única coisa que está funcionando é a lista de opções para chat normal, com problemas para grupos.
