---
id: send-button-pix
title: Enviar botão PIX
---

## Método

#### /send-button-pix

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-pix

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

:::caution Atenção
Envios de botões atualmente se encontram disponíveis, porém possui alguns fatores decisivos para o funcionamento. Para mais detalhes acesse o tópico [Funcionamento dos Botões](https://developer.z-api.io/tips/button-status)
:::

## Conceituação

Neste método você poderá enviar mensagens de chave pix com botão para copiar.

![image](../../img/SendingMessagePixButton.jpeg)

---

## Atributos

### Obrigatórios

| Atributos   | Tipo          | Descrição |
| :----------:| :-----------: | :-------- |
| phone         | string        | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| pixKey        | string        | Chave pix  |
| type          | string        | Tipo da chave pix (CPF, CNPJ, PHONE, EMAIL, EVP)  |

### Opcionais

| Atributos   | Tipo          | Descrição |
| :----------:| :-----------: | :-------- |
| merchantName         | string        | Título a ser exibido no botão (caso seja enviado vazio o título padrão será 'Pix') |

---

## Request Body

```json
{
  "phone": "551199999999",
  "pixKey": "chave pix",
  "type": "EVP"
}
```

---

:::warning Observação
No whatsapp web, as mensagens de pix recebidas não alteram o estado do chat, ou seja, o chat não é marcado como não lido e também não vai para o topo da lista de chats. Contudo, a mensagem é renderizada normalmente. Isso se trata de um bug do próprio whatsapp web.
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-botão-de-chave-pix)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-pix.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
