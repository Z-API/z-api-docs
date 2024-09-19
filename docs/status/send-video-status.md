---
id: send-video-status
title: Enviando video status
---

## Método

#### /send-video-status

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método responsável por enviar um video para seu status, lembre-se que os status somem após 24 horas.

:::caution
O tamanho máximo para videos nos status é de 10mb
:::

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                    |
| :-------- | :----: | :--------------------------- |
| video     | String | Link do video ou seu Base64 |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|  caption  | string | Legenda que irá junto com o vídeo para o status |

---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status

#### Body

```json
{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
}

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
  "caption": "texto da legenda"
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-video-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
