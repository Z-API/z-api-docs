---
id: button-status
title: Status dos Botões
---

:::tip
Comportamento dos botões no WhatsApp em diferentes cenários.
:::

---

## Introdução

Este tópico descreve o comportamento dos botões no WhatsApp em diferentes cenários. Os botões são uma forma de interação com o usuário para permitir a execução de ações específicas.

---

## Fatores decisivos:

#### Para o funcionamento dos botões no WhatsApp, são dois fatores decisivos:
- Se o WhatsApp que está sendo usado é business ou normal
- Se a mensagem está sendo enviada para chat normal ou para um grupo.


## Tipos de botões

#### Existem quatro tipos de botões no WhatsApp:

- Botão simples com texto
- Botão simples com imagem
- Lista de opções
- Botões de ações

---

## Comportamento dos botões:

 ### [Botão simples com texto:](https://developer.z-api.io/message/send-button-list)

- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Business para Chat Normal: **SUJEITO A PROBLEMAS**
- Enviando de WhatsApp Business para Grupo: **SUJEITO A PROBLEMAS**

### [Botão simples com imagem:](https://developer.z-api.io/message/send-button-list-image)

- Enviando de WhatsApp Normal para Chat Normal: **FUNCIONA**
- Enviando de WhatsApp Normal para Grupo: **FUNCIONA**
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

Em resumo, se você estiver usando o WhatsApp normal, os botões simples com imagem e texto funcionam 100%, tanto para chat normal quanto para grupos, além da lista de opções para chat normal. Se você estiver usando o WhatsApp Business, a única coisa que está funcionando é a lista de opções para chat normal, com problemas para grupos.
