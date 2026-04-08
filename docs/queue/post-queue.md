---
id: post-queue
title: Fila
---

## Método

#### /queue

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Este método é responsável por retornar mensagens da fila aguardando processamento.

---

## Body

### Opcionais

| Atributos   | Tipo    | Descrição |
| :---------- | :--:    | :-------- |
| pageSize    | integer | Quantidade de mensagens retornadas por requisição. O valor padrão é **20** |
| pagingState | string  | Cursor da página. Quando não informado, retorna a primeira página |

---

## Request Body

### Exemplo

**Para buscar a primeira página:**

```json
{}
```

**Para buscar a próxima página:**

```json
{
  "pageSize": 20,
  "pagingState": "eyJidWNrZXQiOjI5MzQsInBhZ2VTdGF0ZSI6IjAw..."
}
```

---

## Response

### 200

| Atributos   | Tipo    | Descrição |
| :---------- | :------ | :-------- |
| messages    | array   | Lista de mensagens da fila |
| pagingState | string  | Cursor para próxima página |
| hasMore     | boolean | Indica se existem mais páginas |

---

### Array Messages

| Atributos    | Tipo      | Descrição |
| :----------- | :-------- | :-------- |
| _id          | string    | ID da mensagem no Z-API |
| DelayMessage | integer   | Tempo entre envios |
| Message      | string    | Texto da mensagem |
| InstanceId   | string    | ID da instância |
| Phone        | string    | Número ou grupo |
| ZaapId       | string    | ID da mensagem |
| DelayTyping  | integer   | Tempo do "digitando..." |
| MessageId    | string    | ID da mensagem |
| Created      | timestamp | Data em epoch |
| CreatedAt    | string    | Data formatada |
| Beta         | boolean   | Indica uso de beta |
| IsTrial      | boolean   | Indica trial |

---

## Exemplo

```json
{
  "messages": [
    {
      "DelayMessage": -1,
      "Message": "Mensagem teste",
      "InstanceId": "3E98XXXXXXXXXXXXXXXXXXXF5DDF",
      "CreatedAt": "2026-03-31T14:40:31.776+00:00",
      "ZaapId": "019D44XXXXXXXXXXXXXXXXX68DA6",
      "DelayTyping": 0,
      "Created": 1774968031776,
      "Beta": false,
      "IsTrial": false,
      "Phone": "120XXXXXXXXXXX305-group",
      "_id": "019D44XXXXXXXXXXXXXXXXX68DA6",
      "MessageId": "ECFXXXXXXXXXXXXXX39"
    }
  ],
  "pagingState": "eyJi...",
  "hasMore": true
}
```

---

## Paginação

- Caso não envie `pagingState`, a primeira página será retornada automaticamente
- Caso não informe `pageSize`, o valor padrão de **20 mensagens** será utilizado
- Utilize o `pagingState` retornado para buscar as próximas páginas
- Quando `hasMore` for `false`, não existem mais mensagens disponíveis

---
