---
id: send-option-list
title: Enviar lista de opções
---

## Método

#### /send-option-list

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-option-list

---

## Conceituação

Neste método você poderá enviar mensagens de texto com uma lista de opções, onde o usuário poderá selecionar uma das opções enviadas.

![image](../../img/send-option-list.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto a ser enviado |
| optionList | optionList | Configuração da lista |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

### Option List

| Atributos   |  Tipo  | Descrição                       |
| :---------- | :----: | :------------------------------ |
| title       | string | Titulo da listagem              |
| buttonLabel | string | Texto do botao que abre a lista |
| options     | option | Litas de opções                 |

### Option

| Atributos   |  Tipo  | Descrição          |
| :---------- | :----: | :----------------- |
| description | string | Descrição da opção |
| title       | string | Titulo da opção    |

### Opcionais Button

| Atributos |  Tipo  | Descrição              |
| :-------- | :----: | :--------------------- |
| id        | string | Identificador da opção |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Selecione e melhor opção:",
  "optionList": {
    "title": "Opções disponíveis",
    "buttonLabel": "Abrir lista de opções",
    "options": [
      {
        "id": "1",
        "description": "Z-API Asas para sua imaginação",
        "title": "Z-API"
      },
      {
        "id": "2",
        "description": "Não funcionam",
        "title": "Outros"
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto-lista-de-opcão)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-option-list.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
