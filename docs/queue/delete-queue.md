---
id: delete-queue
title: Apagando uma Fila
---

## Método

#### /queue

`DELETE` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue

## Conceituação

Este método é reponsavel por DELETAR todas mensagens que estão em sua fila aguardando para ser processada.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`DELETE` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue

---

## Response

### 200

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-queue.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
