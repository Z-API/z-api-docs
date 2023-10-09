---
id: send-call
title: Make a call
---

## Método

#### /send-call

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-call

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Conceituação

In this method you send a call to a number that has whatsapp, whether it is your contact or not.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Recipient telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT only send numbers without formatting or a mask |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| callDuration | number | Here you define how long you want the call to last, by default the call will last 5 seconds, but you can increase it up to 15 seconds |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "callDuration": 5
}
```

---

## Response

### 200

| Attributes | Type   | Description    |
| :--------- | :----- | :------------- |
| zaapId     | string | id on z-api    |
| messageId  | string | id on whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link for webhooks response (upon receiving)
[Webhook](../webhooks/on-message-received)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-call.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
