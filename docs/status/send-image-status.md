---
id: send-image-status
title: Enviando imagem status
---

## Método

#### /send-image-status

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Método responsavel por enviar uma imagem para seu status, lembre-se que os status somem após 24 horas.

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                    |
| :-------- | :----: | :--------------------------- |
| image     | String | Link da imagem ou seu Base64 |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status

#### Body

```json
{
  "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

:::tip Enviar imagem Base64

Se você tem duvidas em como enviar uma imagem Base64 acesse o tópico mensagens "Enviar Imagem", lá você vai encontrar tudo que precisa saber sobre envio neste formato.

:::

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-image-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
