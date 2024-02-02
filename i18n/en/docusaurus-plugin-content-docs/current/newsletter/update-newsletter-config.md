---
id: update-newsletter-config
title: Update newsletter settings
---

## Método

#### /newsletter/settings/{newsletterId}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

This method is responsible to update newsletter settings.

---

## Atributos

### Obrigatórios

| Atributos       |  Tipo  | Descrição                                                |
| :-------------- | :----: | :------------------------------------------------------- |
| id              | string | Newsletter ID. Sent in request PATH (EX: newsletter/settings/999999999999999999@newsletter) |
| reactionCodes   | string | Sets the restriction of reactions on messages (basic, all) |

(string) reactionCodes

| Valores |  Tipo  | Descrição                   |
| :------ | :----: | :-------------------------- |
| basic   | string | Allows only basic reactions |
| all     | string | Allows all reactions        |


---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter

#### Body

```json
{
  "reactionCodes": "basic | all"
}
```

:::warning

The newsletter ID must always contain the suffix "@newsletter" as this is the standard used by WhatsApp itself.

:::

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, false in case of failure |

Example

```json
{
  "value": true
}
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST, PUT, or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-newsletter-config.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
