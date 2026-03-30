---
id: criar-instancia
title: Criar instância (Partner API)
sidebar_position: 1
---

# Criar instância (on-demand)

Crie uma nova instância on-demand para um cliente através da Partner API.

## Endpoint

- **Método**: `POST`
- **URL**: `https://api.z-api.io/instances/integrator/on-demand`

> **Status:** conforme resposta oficial de produto, esta rota é a utilizada para criação de instâncias on-demand e está disponível para parceiros em produção.

### Headers

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| Client-Token | string | Sim | Token de autenticação do parceiro |
| Content-Type | string | Sim | Deve ser `application/json` |

## Corpo da requisição

### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | string | Sim | Nome da instância a ser criada |

### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `sessionName` | string | Não | Atributo para alterar o nome da sessão no whatsapp (em aparelhos conectados) |
| `deliveryCallbackUrl` | string | Não | EndPoint do webhook de mensagens entregues - delivery |
| `receivedCallbackUrl` | string | Não | EndPoint do webhook de mensagens recebidas - receive |
| `receivedAndDeliveryCallbackUrl` | string | Não | EndPoint do webhook de mensagens recebidas e enviadas por mim - receive |
| `presenceChatCallbackUrl` | string | Não | EndPoint do webhook de status do chat - PresenceChat |
| `disconnectedCallbackUrl` | string | Não | EndPoint do webhook de desconexão ou perca de comunicação - disconnected |
| `connectedCallbackUrl` | string | Não | EndPoint do webhook de conexão - connected |
| `messageStatusCallbackUrl` | string | Não | EndPoint do webhook de status da mensagem |
| `callRejectAuto` | boolean | Não | Se `true`, rejeita automaticamente chamadas recebidas |
| `callRejectMessage` | string | Não | Mensagem após rejeitar uma chamada automáticamente |
| `autoReadMessage` | boolean | Não | Leitura automática das mensagens |
| `autoReadStatus` | boolean | Não | Leitura automática dos status |
| `isDevice` | boolean | Não | Define se a instância será mobile ou web, se `true`, a instância será mobile |
| `businessDevice` | boolean | Não | Escolha entre a versão empresarial ou normal do WhatsApp |
| `disableEnqueueWhenDisconnected` | boolean | Não | Habilita/desabilita enfileiramento de mensagem na hora de criar a instância |

### Exemplo de Request Body

```json
{
    "name": "Instancia Z-API - 9292812",
    "sessionName": "Testes testes",
    "deliveryCallbackUrl": "https://meuwebhook.com.br/delivery",
    "receivedCallbackUrl": "https://meuwebhook.com.br/receive",
    "receivedAndDeliveryCallbackUrl": "https://meuwebhook.com.br/receivedanddelivery",
    "disconnectedCallbackUrl": "https://meuwebhook.com.br/disconnected",
    "connectedCallbackUrl": "https://meuwebhook.com.br/connected",
    "presenceChatCallbackUrl": "https://meuwebhook.com.br/presenceChat",
    "messageStatusCallbackUrl": "https://meuwebhook.com.br/status",
    "callRejectAuto": false,
    "callRejectMessage": "Teste de mensagem ao rejeitar",
    "autoReadMessage": false,
    "autoReadStatus": false,
    "isDevice": false,
    "businessDevice": false,
    "disableEnqueueWhenDisconnected": true
}
```

## Resposta

### 200 OK

A resposta inclui os dados da instância criada:

```json
{
  "id": "8823XWIE982KII99012K2L",
  "token": "8900LS009W0011000PPIPIP0091200LCKAOOOE009919",
  "due": "329000002121"
}
```

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `id` | string | ID da instância criada |
| `token` | string | TOKEN da instância criada |
| `due` | timestamp | Data de validade da instância |

### Erros comuns

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| 400 | Parâmetros inválidos | Verifique se `name` e `sessionName` estão presentes |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 409 | Instância já existe | Verifique se o `sessionName` já está em uso |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |
