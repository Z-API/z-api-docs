---
id: unsubscribe-instance
title: Cancelando uma instância
---

## Método

#### /cancel

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel

---

## Conceituação

Método utilizado para cancelar uma instância.

:::caution Atenção

A partir do momento em que você assina uma instância a mesma ficará disponível para utilização por 30 dias mesmo que você a cancele antes deste período finalizar, ou seja, caso você cancele hoje, mas o vencimento dela será em 10 dias, a mesma ficará disponível por mais 30 dias até finalizar o cancelamento.

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

**Método**

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel

---

## Response

### 201

OK

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unsubscribe-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
