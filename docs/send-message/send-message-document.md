---
id: send-message-document
title: Enviar documentos
---

## Método

#### /send-document/{extension}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-document/ **{extension}**

> **Não se esqueça!** Você precisa informar o parâmetro **{extension}** com a extensão do aquivo que deseja enviar ! Teóricamente este método deve suportar todos tipos de documentos, desde que eles estejam dentro das politícas de tamanho de aquivos do Whatsaspp (para saber mais sobre estes limites [clique aqui]).

[clique aqui]: https://developers.facebook.com/docs/whatsapp/api/media/#post-processing

---

## Conceituação

Método responsavel por enviar documentos aos seus contatos ele é simples e objetivo.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| document | string | Link do documento ou seu Base64 |

### Opcionais

| Atributos |  Tipo  | Descrição         |
| :-------- | :----: | :---------------- |
| fileName  | String | Nome do documento |

---

## Request Body

```json
{
  "phone": "5544999999999",
  "document": "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
  "fileName": "Meu PDF"
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

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-document.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
