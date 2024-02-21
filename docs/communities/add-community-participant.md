---
id: add-community-participant
title: Adicionar participantes
---

## Método

#### /add-participant

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsável por adicionar novos participantes a comunidade.

:::tip Novo atributo

Recentemente, o WhatsApp implementou uma validação para verificar se o número de telefone conectado à API possui o contato do cliente salvo. No entanto, a Z-API desenvolveu uma solução para contornar essa validação, introduzindo um novo recurso chamado **"autoInvite"**. Agora, quando uma solicitação é enviada para adicionar 10 clientes a um grupo e apenas 5 deles são adicionados com sucesso, a API envia convites privados para os cinco clientes que não foram adicionados. Esses convites permitem que eles entrem na comunidade, mesmo que seus números de telefone não estejam salvos como contatos.

:::

---

## Atributos

### Obrigatórios

| Atributos   | Tipo  | Descrição |
| :---------- | :---: | :-- |
| autoInvite  | boolean | Envia link de convite da comunidade no privado |
| communityId | string | ID/Fone da comunidade. Pode ser obtido na API de **[Listar comunidades](./list-communities.md)** |
| phones      | array string | Array com os número(s) do(s) participante(s) a serem adicionados |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant

#### Body

```json
  {
  "autoInvite": true,
  "communityId": "120363019502650977",
  "phones": ["5544999999999", "5544888888888"]
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-community-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
