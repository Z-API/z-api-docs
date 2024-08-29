---
id: send-button-otp
title: Enviar botão OTP
---

## Método

#### /send-button-otp

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-otp

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

:::caution Atenção
Envios de botões atualmente se encontram disponíveis, para mais detalhes acesse o tópico [Funcionamento dos Botões](https://developer.z-api.io/tips/button-status)
:::

## Conceituação

Neste método você poderá enviar mensagens de texto com botão para copiar um valor.

![image](../../img/SendButtonOtp.jpeg)

---

## Atributos

### Obrigatórios

| Atributos   | Tipo          | Descrição |
| :----------:| :-----------: | :-------- |
| phone         | string        | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message       | string        | Texto a ser enviado  |
| code          | string        | Valor que será copiado quando o botão for clicado  |

### Opcionais
| Atributos   | Tipo          | Descrição |
| :----------:| :-----------: | :-------- |
| image       | string        | URL ou Base64 da imagem que irá acompanhar o botão |

---

## Request Body

```json
{
  "phone": "551199999999",
  "message": "Texto da mensagem",
  "code": "Valor a ser copiado"
}

{
  "phone": "551199999999",
  "message": "Texto da mensagem",
  "code": "Valor a ser copiado",
  "image": "URL da imagem"
}
```

---

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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-template-de-botão-otp)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-otp.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
