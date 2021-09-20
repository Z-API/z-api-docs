---
id: on-message-send
title: Ao enviar
---

## Método

#### /

`PUT` https://

## Conceituação

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

## Exemplos

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Número de telefone de destino da mensagem. |
| customId | string | Identificador provido pelo usuário para controle de mensagem utilizando seus próprios IDs. |
| zaapId | string | Identificador da mensagem na conversa. |
| type | string | Tipo do evento da instância, nesse caso será "DeliveryCallback". |

---

## Request Body

#### URL

`PUT` https://

#### Body

```json
{}
```

---

## Response

### 200

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-delivery.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
