---
id: send-call
title: Fazer ligação
---

## Método

#### /send-call

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-call

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Neste método você enviar uma ligação a um número que possua conta no aplicativo, seja ele seu contato ou não.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| callDuration | number | Aqui você define por quanto tempo você quer que a ligação dure, por padrão a ligação terá duração de 5 segundos, mas você pode aumentar até 15 segundos |
| callAudioUrl | string | Link do áudio (bitrate 16k) |

:::caution Atenção

O atributo **callAudioUrl** está disponível apenas para contas que possuem a funcionalidade de chamadas habilitada.

:::

---

## Request Body

```json
{
  "phone": "5511999999999",
  "callDuration": 5
}
```

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| zaapId | string | id no z-api |
| messageId | string | id no aplicativo |
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-call.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
