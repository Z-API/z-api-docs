---
id: get-invitation-link
title: Obter link de convite do grupo
---

## Método

#### /group-invitation-link/{groupId}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-link/{groupId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método permite que você obtenha o link de convite de um grupo.

:::caution Atenção

No dia 4 de novembro de 2021 o whatsapp alterou a formato da criação de novos grupos, antes: "phone": "5511999999999-1623281429" agora: "phone": "120363019502650977-group"

:::

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição        |
| :-------- | :----: | :--------------- |
| groupId   | string | ID/Fone do grupo |

---

## Request url

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-link/120363019502650977-group

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| invitationLink     | string | Novo link de convite |

**Exemplo**

```json
{
  "phone": "120363019502650977-group",
  "invitationLink": "https://chat.whatsapp.com/C1adgkdEGki7554BWDdMkd"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/group-invitation-link.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
