---
id: list-instances
title: Listando instâncias
---

## Método

#### /instances

`GET` <https://api.z-api.io/instances>

---

## Conceituação

Método utilizado para listar todas as instâncias criadas.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| page | integer | Utilizado para paginação você de informar aqui a pagina de chats que quer buscar |
| pageSize | integer | Especifica o tamanho do retorno de chats por pagina |

### Opcionais

| Atributos |  Tipo  | Descrição                         |
| :-------- | :----: | :-------------------------------- |
| query     | number | Busca pelo nome e id da instancia |

---

## Request Body

**Método**

`GET` <https://api.z-api.io/instances/>

**Exemplo**

#### Query params

| key   |          value          | description |
| :---- | :---------------------: | :---------- |
| query | 51505050505050051418164 |             |

```json
{
  "pageSize": 1,
  "page": 1
}
```

---

## Response

### 201

| Atributos | Tipo      | Descrição                     |
| :-------- | :-------- | :---------------------------- |
| id        | string    | ID da instância criada        |
| token     | string    | TOKEN da instância criada     |
| due       | timestamp | Data de validade da instância |

**Exemplo**

```json
{
  "total": 1,
  "totalPage": 1,
  "pageSize": 1,
  "page": 1,
  "content": [
    {
      "token": "",
      "tenant": "",
      "created": "",
      "due": 1648565999675,
      "paymentStatus": "",
      "deliveryCallbackUrl": "",
      "receivedCallbackUrl": "",
      "disconnectedCallbackUrl": "",
      "messageStatusCallbackUrl": "",
      "receivedAndDeliveryCallbackUrl": "",
      "presenceChatCallbackUrl": "",
      "connectedCallbackUrl": "",
      "receivedStatusCallbackUrl": "",
      "phoneConnected": false,
      "whatsappConnected": false,
      "name": "",
      "id": ""
    }
  ]
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-instances.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
