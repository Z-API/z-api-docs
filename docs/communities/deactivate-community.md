---
id: deactivate-community
title: Desativar comunidade
---

## Método

#### /queue

`DELETE` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/{idDaComunidade}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Este método é reponsavel por desativar uma comunidade.

Quando uma comunidade é desativada resultará na desconexão de todos os grupos relacionados a ela. É importante ressaltar que desativar a Comunidade não excluirá seus grupos, mas sim os removerá da Comunidade em questão.

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

`DELETE` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/{idDaComunidade}

---

## Response

### 200

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/deactivate-community.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
