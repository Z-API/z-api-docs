---
id: mention-group 
title: Mencionar grupo
---

## Método

#### /send-text

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por fazer a menção de grupos relacionados a uma comunidade. As menções só podem ser feitas em grupos dentro de uma comunidade, e os grupos mencionados devem pertencer à mesma comunidade.

![image](../../img/mention-group.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo   | Descrição |
| :--       | :-:    | :-- |
| phone     | string | ID do grupo onde os grupos serão mencionados |
| message   | string | Texto a ser enviado. Deve conter o @ com o id do grupo |
| groupMentioned | GroupMentioned[] | List de objetos com os dados do grupo a ser mencionado |

### GroupMentioned

| Atributos |  Tipo  | Descrição                     |
| :-------- | :----: | :---------------------------- |
| phone     | string | ID do grupo que será mencioando |
| subject   | string | Nome do grupo                   |


### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

---

## Request Body

```json
{
  "phone": "5511999999999-group",
  "message": "Welcome to *Z-API group* @1203634230225498-group",
  "groupMentioned": [
    {
      "phone": "1203634230225498-group",
      "subject": "Z-API subgroup"
    }
  ]
}
```

---

:::tip
Também é possível mencionar participantes na mensagem juntamente com a menção dos grupos
:::

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |
| id | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
