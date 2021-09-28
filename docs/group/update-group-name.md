---
id: update-group-name
title: Atualizar nome do grupo
---

## Método

#### /update-group-name

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name

---

## Conceituação

Este método é reponsavel alterar o nome de um grupo já existente.

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                  |
| :-------- | :----: | :------------------------- |
| groupId   | string | ID/Fone do grupo           |
| groupName | string | Nome do grupo a ser criado |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name

#### Body

```json
{
  "groupId": "5511999999999-1623281429",
  "groupName": "Mudou o nome Meu grupo no Z-API"
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

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

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-group-name.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
