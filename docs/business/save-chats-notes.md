---
id: chats-notes
title: Atribuir anotações a um chat
---

## Método

#### /chats/{phone}/notes

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/notes

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível atribuir notas a um chat no whatsapp business

:::important Importante
Este método está disponível apenas para dispositivos conectados a versão Multi-Devices do whatsapp. 
:::

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição             |
| :-------- | :----: | :-------------------- |
| notes     | string | Texto da anotação     |

## Request Body

```json
{
  "notes": "anotação"
}
```

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---
