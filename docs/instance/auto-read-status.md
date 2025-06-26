---
id: update-auto-read-status
title: Leitura automática de status
---

## Conceituação

Esse método ativa a leitura automática de todas as publicações de status recebidas pela API.

:::caution Atenção

Para que funcione você deve ter a [Leitura automática](./auto-read.md) habilitada.

:::

---

### Método

#### /update-auto-read-status

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

### Request Body

```json
{
  "value": true ou false
}
```

---

### Painel Administrativo

![img](../../img/auto-read-status.jpeg)

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