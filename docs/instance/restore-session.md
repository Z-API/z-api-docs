---
id: restore-session
title: Restaurar sessão
---

## Método

#### /restore-session

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/restore-session

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Este método tenta restaurar a sua conexão com Whatsapp com base nas informações salvas na sessão do Z-API. Esta funcionalidade é indicada para casos onde o webhook de desconexão é enviado. Caso você receba um webhook de desconexão pode tentar reestabelecer a conexão utilizando este método.

---

## Response

### 200

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

## Code
