---
id: me
title: Dados da instância
---
## Conceituação

Este método te permite obter os dados da sua instância.

---

## Método

#### /me

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/me

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Response

### 200

| Atributos                 | Tipo      | Descrição                                                                    |
| :------------------------ | :------   | :--------------------------------------------------------------------------- |
| id                        | string    | Id da instância                                                              |
| token                     | string    | Token da instância                                                           |
| name                      | string    | Nome da instância                                                            |
| due                       | number    | Timestamp com a data de vencimento da instância (unix timestamp)             |
| connected                 | boolean   | Define se a instância está conectada                                         |
| paymentStatus             | string    | Define o status de pagamento da instância                                    |
| created                   | Date      | Data de criação da instância                                                 |
| connectedCallbackUrl      | string    | Url do webhook de conexão                                                    |
| deliveryCallbackUrl       | string    | Url do webhook de envio de mensagem                                          |
| disconnectedCallbackUrl   | string    | Url do webhook de desconexão                                                 |
| messageStatusCallbackUrl  | string    | Url do webhook de status da mensagem                                         |
| presenceChatCallbackUrl   | string    | Url do webhook de presença do chat                                           |
| receivedCallbackUrl       | string    | Url do webhook de recebimento                                                |
| receiveCallbackSentByMe   | boolean   | Define se irá receber webhook das mensagens enviadas pela própria instância  |
| callRejectAuto            | boolean   | Define se irá rejeitar uma chamada recebida automaticamente                  |
| callRejectMessage         | string    | Mensagem a ser enviada quando rejeitar uma chamada                           |
| autoReadMessage           | boolean   | Define se irá marcar as mensagens recebidas como lidas automaticamente       |
| initialDataCallbackUrl    | string    | Url do webhook de dados iniciais após conexão                                |

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/instance-me.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
