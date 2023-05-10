---
id: update-auto-read-message
title: Leitura automática
---

## Conceituação

Esse método ativa a leitura automática de todas as mensagens recebidas pela API.

---

### Método

#### /update-auto-read-message

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-message

#### Request Body

```json
{
  "value": true ou false
}
```

---

### Painel Administrativo

![img](../../img/auto-read.jpeg)

---

## Response

### 200

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