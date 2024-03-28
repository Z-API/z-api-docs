---
id: accept-newsletter-admin-invite
title: Aceitar convite de admin do canal
---

## Método

#### /newsletter/accept-admin-invite/{newsletterId}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por aceitar um convite para ser administrador de um canal. Esse convite, é uma mensagem que você tanto pode **[enviar](../newsletter/send-newsletter-admin-invite.md)** quanto receber através do **[webhook de mensagem recebida](../webhooks/on-message-received#exemplo-de-retorno-de-convite-admin-de-canal)**.


## Atributos

### Obrigatórios

| Atributos | Tipo      | Descrição      |
| :-------- | :-------: | :------------- |
|  newsletterId     |  string   | Id do canal o qual pertence o convite |

---


## Request

**Exemplo**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter

---


## Response

### 201

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/accept-newsletter-admin-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
