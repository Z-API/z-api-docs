---
id: update-community-photo
title: Atualizar imagem da comunidade
---

## Método

#### /update-community-photo

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-photo

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável alterar a imagem de uma comunidade já existente.


---

## Atributos

### Obrigatórios

| Atributos     |  Tipo  | Descrição                  |
| :------------ | :----: |:---------------------------|
| communityId   | string | ID da comunidade           |
| communityPhoto| string | Url ou Base64 da imagem    |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-photo

#### Body

```json
{
  "communityId": "string",
  "communityPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

::::tip Enviar imagem Base64

Se você tem duvidas em como enviar uma imagem Base64 acesse o tópico mensagens "Enviar Imagem", lá você vai encontrar tudo que precisa saber sobre envio neste formato.

::::

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "value": true
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-community-photo.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>