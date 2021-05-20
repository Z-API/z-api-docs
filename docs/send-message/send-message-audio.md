---
id: send-message-audio
title: Enviar áudio
---

## Método

#### /send-audio

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-audio

---

## Conceituação

Método responsavel por enviar audios para os seus chats, você pode trabalhar com as audios de 2 formas que são:

Por Link, onde você temum audio hospedado em algum lugar da internet e envia apenas o link da mesma.

Por Base64, se você optar por esta opção precisará ter em sua aplicação um método para converter o audio em Base64.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| audio | string | Link do audio ou seu Base64 |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

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

---
