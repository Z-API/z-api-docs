---
id: tags-remove
title: Remover etiquetas de um chat
---

## Método

#### /chats/{phone}/tags/{tag}/remove

`PUT` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/remove

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível remover as etiquetas de um chat no whatsapp business

:::important Importante
Este método está disponível apenas para dispositivos conectados a versão Multi-Devices do whatsapp.
:::

## Response

### 200

| Atributos    | Tipo    | Descrição                                        |
| :----------- | :------ | :----------------------------------------------- |
|    value     | boolean | true caso tenha dado certo e false em caso de falha |


Exemplo

```json
{
    "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

