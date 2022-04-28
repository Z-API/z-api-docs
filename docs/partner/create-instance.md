---
id: create-instance
title: Criando uma instância
---

## Método

#### /on-demand

`POST` https://api.z-api.io/instances/integrator/on-demand

---

## Conceituação

Método utilizado para criar uma instância vinculada a sua conta.

:::tip Dica

Você não precisa necessáriamente assinar a instância neste momento pois você tem 2 dias de para utilizar como trial.

:::

:::caution Atenção

**Exclusão de instância**

Caso você não realize a assinatura em até 2 dias nosso devops vai automaticamente excluir a maquina conectada a instância. Então em casos de não assinaturas não precisa se preocupar :)

:::

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                      |
| :-------- | :----: | :----------------------------- |
| name      | string | Nome da instância a ser criada |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| sessionName | string | Atributo para alterar o nome da sessão no whatsapp (em aparelhos conectados) |
| deliveryCallbackUrl | string | EndPoint do webhook de mensagens entregues - delivery |
| receivedCallbackUrl | string | EndPoint do webhook de mensagens recebidas - receive |
| disconnectedCallbackUrl | string | EndPoint do webhook de desconexão ou perca de comunicação - disconnected |
| connectedCallbackUrl | string | EndPoint do webhook de conexão - connected |
| messageStatusCallbackUrl | string | EndPoint do webhook de Status |

---

## Request Body

**Método**

`POST` https://api.z-api.io/instances/integrator/on-demand

**Exemplo**

```json
{
  "name": "Instancia Z-API - 9292812",
  "sessionName": "Testes testes",
  "deliveryCallbackUrl": "https://meuwebhook.com.br/delivery",
  "receivedCallbackUrl": "https://meuwebhook.com.br/receive",
  "disconnectedCallbackUrl": "https://meuwebhook.com.br/disconnected",
  "connectedCallbackUrl": "https://meuwebhook.com.br/connected",
  "messageStatusCallbackUrl": "https://meuwebhook.com.br/status"
}
```

---

## Response

### 201

| Atributos | Tipo      | Descrição                     |
| :-------- | :-------- | :---------------------------- |
| id        | string    | ID da instância criada        |
| token     | string    | TOKEN da instância criada     |
| due       | timestamp | Data de validade da instância |

**Exemplo**

```json
{
    "id": "8823XWIE982KII99012K2L"
    "token": "8900LS009W0011OOOPPIPIP00912OOLCKAOOOE009919"
    "due": "329000002121"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
