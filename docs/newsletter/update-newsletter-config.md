---
id: update-newsletter-config
title: Atualizar configurações do canal
---

## Método

#### /newsletter/settings/{newsletterId}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por alterar as configurações de um canal.

---

## Atributos

### Obrigatórios

| Atributos       |  Tipo  | Descrição                                                |
| :-------------- | :----: | :------------------------------------------------------- |
| id              | string | ID do canal. Enviado no PATH da requisição (EX: newsletter/settings/999999999999999999@newsletter) |
| reactionCodes   | string | Define a restrição de reações nas mensagens (basic, all) |

(string) reactionCodes

| Valores |  Tipo  | Descrição                                 |
| :------ | :----: | :---------------------------------------- |
| basic   | string | Permite apenas o envio de reações básicas |
| all     | string | Permite o envio de qualquer reação        |


---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter

#### Body

```json
{
  "reactionCodes": "basic | all"
}
```

:::warning

O id do canal sempre deve conter o sufixo "@newsletter", pois esse é o padrão utilizado pelo próprio Whatsapp.

:::

---

## Response

### 201

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-newsletter-config.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
