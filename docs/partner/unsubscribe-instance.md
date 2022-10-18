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

A partir do momento que você assina uma instância a mesma ficará disponivel para utilização por 30 dias, mesmo que você a cancele antes deste periodo ou seja caso você cancelo hoje mas seu vencimento vai ser em 10 dias, a mesma ficará disponivel por mais 10 dias.

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

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja, verifique se você enviou o POST ou GET conforme especificado no início deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unsubscribe-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
