---
id:id: add-admin

title: Promover admin do grupo
---

## Método

#### /add-admin

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Este método é reponsavel por promover participamentes do grupo à administradores, você pode provomover um ou mais participamente à administrador.

:::caution Atenção

No dia 4 de novembro de 2021 o whatsapp alterou a formato da criação de novos grupos, antes: "phone": "5511999999999-1623281429" agora: "phone": "120363019502650977-group"

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| groupId | string | ID/Fone do grupo |
| phones | array string | Array com os número(s) do(s) participante(s) a serem promovidos |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin

#### Body

```json

Forma antiga -
  {
    "groupId": "5511999999999-1623281429",
    "phones": ["5544999999999", "5544888888888"]
  }

  -------------------------------------------------

Forma nova -
  {
    "groupId": "120363019502650977-group",
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
