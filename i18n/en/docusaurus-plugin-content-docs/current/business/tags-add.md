---
id: tags-add
title: Assigning labels to a chat.
---

## Method

#### /chats/{phone}/tags/{tag}/add

`PUT` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/add

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Through this method, it is possible to assign a label to a chat in WhatsApp Business.

:::important Importante
This method is only available for devices connected to the Multi-Devices version of WhatsApp.
:::

## Response

### 200

| Attributes| Type    | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, and false if there is a failure |

Exemplo

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a PUT or POST as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---
