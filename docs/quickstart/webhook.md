---
id: webhook
title: Webhook
---

## O que é e para que serve?

Segundo o Google, Webhook é um recurso usado na internet para que uma aplicação se comunique com outra, fornecendo dados em tempo real sempre que um evento acontecer. Desta forma os dois sistemas realizam trocas de informações sem que nenhuma ação externa precise ser realizada.

Então se você está se integrando com o _Z-API_ e precisa receber informações pelo Whatsapp, é necessário prover estes end-points na sua aplicação para conseguirmos te avisar sobre tudo que acontece no seu Whatsapp. Ou seja, toda vez que o número conectado receber uma interação, vamos fazer uma requisição com o método POST para a URL configurada previamente. (Para cada requisição há um corpo em JSON específico)

Atualmente temos 4 webhooks, são eles:

> Você não precisa configurar todos, mas quanto mais controle você possuir sobre sua instância mais vai conseguir extrair recursos e desenvolver negócios com _Z-API_

---

## Ao Enviar

    Utilizado para te passar

---

## Ao Receber

---

## Ao desconectar

---

## Ao receber status de mensagem

> Você não precisa configurar todos, mas quanto mais controle você possuir sobre sua instância mais vai conseguir extrair recursos e desenvolver negócios com _Z-API_

---

Como configurar meu Webhook?

Acesse nosso painel admin, vá em opções e escolha "editar instância".

![img](../../img/EditInstance.jpg)

:::important

Nunca compartilhe o seu ID e token com ninguém.
