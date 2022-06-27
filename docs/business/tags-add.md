---
id: tags-add
title: Atribuir etiquetas a um chat
---

## Método

#### /chats/{phone}/tags/{tag}/add

`PUT` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/add

---

## Condeituação

Através deste método, é possível atribuir uma etiqueta a um chat no whatsapp business

:::important
Este método está disponível apenas para dispositivos conectados a versão Multi-Devices do whatsapp. 
:::

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

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---
