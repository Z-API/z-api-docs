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
| `sessionName` | string | Sim | Nome da sessão da instância |

### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `deliveryCallbackUrl` | string | Não | URL de callback para notificações de entrega de mensagens |
| `receivedCallbackUrl` | string | Não | URL de callback para notificações de mensagens recebidas |
| `receivedAndDeliveryCallbackUrl` | string | Não | URL de callback unificada para mensagens recebidas e entregues |
| `disconnectedCallbackUrl` | string | Não | URL de callback para notificações de desconexão |
| `connectedCallbackUrl` | string | Não | URL de callback para notificações de conexão |
| `messageStatusCallbackUrl` | string | Não | URL de callback para atualizações de status de mensagens |
| `callRejectAuto` | boolean | Não | Se `true`, rejeita automaticamente chamadas recebidas |
| `isDevice` | boolean | Não | Indica se a instância é um dispositivo físico |
| `businessDevice` | boolean | Não | Indica se a instância é um dispositivo de negócios (WhatsApp Business) |
| `disableEnqueueWhenDisconnected` | boolean | Não | Esse parâmetro habilita/desabilita enfileiramento de mensagem na hora de criar a instância. |

### Exemplo de Request Body

```json
{
  "name": "Meu cliente X",
  "sessionName": "cliente-x-session",
  "deliveryCallbackUrl": "https://meuservidor.com/webhooks/delivery",
  "receivedCallbackUrl": "https://meuservidor.com/webhooks/received",
  "receivedAndDeliveryCallbackUrl": "https://meuservidor.com/webhooks/unified",
  "disconnectedCallbackUrl": "https://meuservidor.com/webhooks/disconnected",
  "connectedCallbackUrl": "https://meuservidor.com/webhooks/connected",
  "messageStatusCallbackUrl": "https://meuservidor.com/webhooks/status",
  "callRejectAuto": false,
  "isDevice": false,
  "businessDevice": true
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
