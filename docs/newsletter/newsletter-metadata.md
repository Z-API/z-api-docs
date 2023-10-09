---
id: newsletter-metadata
title: Metadata do canal
---

## Método

#### /newsletter/metadata

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método retorna o metadata do canal com todas as informações do canal e de sua visualização.

---

## Atributos

### Obrigatórios

| Atributos   |  Tipo  | Descrição   |
| :---------  | :----: | :---------- |
| id          | string | ID do canal |


---

## Request Params

#### URL

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletterId}

:::warning

O id do canal sempre deve conter o sufixo "@newsletter", pois esse é o padrão utilizado pelo próprio Whatsapp.

:::

---

## Response

### 200

| Atributos          | Tipo        | Descrição                                                    |
| :----------------- | :---------- | :----------------------------------------------------------- |
| id                 | string      | ID do canal                                                  |
| creationTime       | timestamp   | Timestamp da data de criação do grupo                        |
| state              | string      | Estado do canal (ACTIVE, NON_EXISTING)                       |
| name               | string      | Nome do canal                                                |
| description        | string      | Descrição do canal                                           |
| subscribersCount   | string      | Contagem do número de seguidores do canal                    |
| inviteLink         | string      | Link de convite do canal                                     |
| verification       | string      | Indica se o canal é verificado ou não (VERIFIED, UNVERIFIED) |
| picture            | string      | Url da imagem do canal                                       |
| preview            | string      | Url de preview da imagem do canal                            |
| viewMetadata       | object      | Objeto com informações de visualização                       |

Object (viewMetadata)

| Atributos | Tipo    | Descrição                                                           |
| :-------- | :------ | :------------------------------------------------------------------ |
| mute      | string  | Indica se o canal esta mutado ou não (ON, OFF)                      |
| role      | string  | Indica se é o proprietário ou seguidor do canal (OWNER, SUBSCRIBER) |


**Exemplo**

```json
  {
    "id": "999999999999999999@newsletter",
    "creationTime": "1695643504",
    "state": "ACTIVE",
    "name": "Z-API",
    "description": "Canal oficial Z-API",
    "subscribersCount": "123",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a",
    "verification": "VERIFIED",
    "picture": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?ccb=11-4&oh=01_AdS-Wk3RSfXmtEqDA4-LTFaZQILXZSprywV8EwNoZPOaGw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "preview": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdRltWYOZftf0cnm-GNw5RRGoxQ53nJR9zzxxot_N7JQCw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "viewMetadata": {
      "mute": "OFF",
      "role": "OWNER"
    }
  }

```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

<!-- 
## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-newsletter-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
