---
id: send-button-list
title: Enviar texto com botões
---

## Método

#### /send-button-list

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list

---

## Conceituação

Neste método você poderá enviar mensagens de texto com botões de ação, o conteudo do botão ex: SIM / Não, poderão ser escolhidos pelo usuário e será utilizado como resposta da mensagem enviada junto com os botões.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto a ser enviado |
| buttonList | buttonList | Objeto do tipo botão |

### Button List

| Atributos |  Tipo  | Descrição                     |
| :-------- | :----: | :---------------------------- |
| buttons   | button | lista de botões a ser enviado |

### Button

| Atributos |  Tipo  | Descrição          |
| :-------- | :----: | :----------------- |
| label     | string | Texto para o botão |

### Opcionais Button

| Atributos |  Tipo  | Descrição              |
| :-------- | :----: | :--------------------- |
| id        | string | Identificador do botão |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Z-API é Bom ?",
  "buttonList": {
    "buttons": [
      {
        "id": "1",
        "label": "Ótimo"
      },
      {
        "id": "2",
        "label": "Excelênte"
      }
    ]
  }
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-list.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
