---
id: update-notify-sent-by-me
title: Atualizar notificar enviadas por mim
---

## Conceituação

Esse endpoint serve para você habilitar a opção de receber mensagens enviadas por você através do webhook.

:::caution Atenção

Para que funcione você deve ter configurado um webhook para o evento [Ao receber](./on-message-received.md).

:::

---

## Atualizando o Wehbook

### API

#### /update-notify-sent-by-me

`PUT` <https://api.z-api.io/instances/{id}/token/{token}/update-notify-sent-by-me>

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

### Request Body

#### Obrigatórios

| Atributos               |  Tipo  | Descrição                      |
| :--------               | :----: | :----------------------------- |
| notifySentByMe | boolean | Ativar webhook de mensagens recebidas e enviadas por mim |

```json
{
  "notifySentByMe": true
}
```

## Retorno do endpoint

### 200

```json
{
    "value": boolean
}
```