---
id: send-button-actions
title: Enviar texto com botões de ação
---

## Método

#### /send-button-actions

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

:::caution Atenção
Envios de botões atualmente se encontram disponíveis, porém possui alguns fatores decisivos para o funcionamento. Para mais detalhes acesse o tópico [Funcionamento dos Botões](https://developer.z-api.io/tips/button-status)
:::

## Conceituação

Neste método você poderá enviar mensagens de texto com botões de ação, você conseguirá redirecionar para links, fazer chamadas, e também dar respostas padrões.

---

## Atributos

### Obrigatórios

| Atributos   | Tipo          | Descrição |
| :----------:| :-----------: | :-------- |
| phone         | string        | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message       | string        | Texto a ser enviado  |
| buttonActions | buttonActions[] | Array de objetos do tipo buttonActions |

### buttonActions

| Atributos |  Tipo  | Descrição                     |
| :-------- | :----: | :---------------------------- |
| type      | string | Tipos de botão a ser enviados (CALL, URL, REPLY) |
| phone     | string | Número atribuído ao botão caso seja do tipo CALL |
| url       | string | Link atribuído ao botão caso seja do tipo URL.   |
| label     | string | Texto para o botão |

:::tip Dica:
 O WhatsApp possui um link específico para copiar textos, passando esse link no atributo url, o seu botão passa a ser um botão de copiar (https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otpseucodigo)
:::

### Opcionais Button

| Atributos |  Tipo  | Descrição                    |
| :-------- | :----: | :---------------------       |
| id        | string | Identificador do botão       |

### Opcionais
| Atributos    | Tipo   | Descrição |
| :---------   | :----: | :-------- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |
| title     | string | Caso queira enviar um título |
| footer    | string | Caso queira enviar um rodapé |

---

:::tip Observação
Atualmente, ao enviar os três tipos de botões simultaneamente, o WhatsApp Web gera um erro, o que também ocorre ao utilizar a própria API da Meta. Uma alternativa é enviar apenas os botões do tipo CALL e URL juntos, e sempre enviar o botão do tipo REPLY separadamente.
:::

## Request Body

```json
{
    "phone": "551199999999",
    "message": "uma mensagem",
    "title": "se quiser vincular um titulo",
    "footer": "se quiser vincular um rodape top",
    "buttonActions": [
        {
            "id": "1",
            "type": "CALL",
            "phone": "554498398733",
            "label": "Fale conosco"
        },
        {
            "id": "2",
            "type": "URL",
            "url": "https://z-api.io",
            "label": "Visite nosso site"
        }
    ]
}
```

```json
{
    "phone": "551199999999",
    "message": "uma mensagem",
    "title": "se quiser vincular um titulo",
    "footer": "se quiser vincular um rodape top",
    "buttonActions": [
        {
            "id": "3",
            "type": "REPLY",
            "label": "Falar com atendente"
        }
    ]
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-actions.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
