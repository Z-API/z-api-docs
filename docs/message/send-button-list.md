---
id: send-button-list
title: Enviar texto com botões
---

## Método

#### /send-button-list

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---
:::danger Atenção
Envios de botões atualmente se encontram indisponíveis, para mais detalhes acesse o tópico [Funcionamento dos Botões](https://developer.z-api.io/tips/button-status)
:::


## Conceituação

Neste método você poderá enviar mensagens de texto com botões de ação, o conteudo do botão ex: SIM / Não, poderão ser escolhidos pelo usuário e será utilizado como resposta da mensagem enviada junto com os botões.


![image](../../img/send-button-list.jpeg)

---

## Atributos

### Obrigatórios

| Atributos  | Tipo       | Descrição |
| :-------   | :-------:  | :------   |
| phone      | string     | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message    | string     | Texto a ser enviado  |
| buttonList | buttonList | Objeto do tipo botão |

:::important

 O atributo "message" não pode ser enviado vazio!
:::

### Opcionais

| Atributos    | Tipo   | Descrição |
| :---------   | :----: | :-------- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |


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
        "label": "Excelente"
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto-lista-de-botão)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-list.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
