---
id: introduction
title: Introdução
---

## O que é e para que serve?

Segundo o Google, Webhook é um recurso usado na internet para que uma aplicação se comunique com outra, fornecendo dados em tempo real sempre que um evento acontecer. Desta forma os dois sistemas realizam trocas de informações sem que nenhuma ação externa precise ser realizada.

Então se você está se integrando com o Z-API e precisa receber informações pelo Whatsapp, é necessário prover estes end-points na sua aplicação para conseguirmos te avisar sobre tudo que acontece no seu Whatsapp. Ou seja, toda vez que o número conectado receber uma interação, vamos fazer uma requisição com o método POST para a URL configurada previamente. (Para cada requisição há um corpo em JSON específico)

---

## Nossos webhooks

- Ao enviar

  Webhook responsável por te retorar os dados de envio

- Ao receber

  Webhook responsável por te retornar os dados de recebimento

- Ao desconectar

  Webhook responsável por te retornar os dados de desconexão

- Receber status

  Webhook responsável por te retornar os dados do status da mensagem

---

:::tip Dica

- Não deixe de ler nossa sessão dicas, lá você vai encontrar alguns tópicos de como melhorar sua conexão com Z-API e ter mais qualidade no serviço.

- Você não precisa configurar todos webhookds, mas quanto mais controle você possuir sobre sua instância mais vai conseguir extrair recursos e desenvolver negócios com Z-API

:::
