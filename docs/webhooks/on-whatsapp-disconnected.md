---
id: on-whatsapp-disconnected
title: Ao desconectar
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
| momment | integer | Momento em que a instância foi desconectada do número. |
| error | string | Descrição do erro. |
| disconnected | boolean | Indicação se a instância está conectada com o número ou não. |
| type | string | Tipo do evento da instância, nesse caso será "DisconnectedCallback". |

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
