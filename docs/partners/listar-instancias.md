---
id: listar-instancias
title: Listar instâncias
sidebar_position: 4
---

# Listar instâncias

Liste todas as instâncias gerenciadas pela sua conta de parceiro.

## Endpoint

- **Método**: `GET`
- **URL**: `https://api.z-api.io/instances`

> **Status:** a rota de listagem de instâncias está em produção e os parâmetros de consulta (filtros, paginação) devem ser usados conforme descrito nesta documentação.

### Headers

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| Client-Token | string | Sim | Token de autenticação do parceiro |

## Parâmetros de Query Obrigatórios

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `page` | integer | Utilizado para paginação. Informe aqui a página de instâncias que quer buscar. |
| `pageSize` | integer | Especifica o tamanho do retorno de instâncias por página. |

## Parâmetros de Query Opcionais

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `query` | number | Busca pelo nome e id da instância. |
| `middleware` | string | Busca pelo tipo da instância: `web` ou `mobile`. Ao não enviar esse parâmetro, todas as instâncias são retornadas. |

### Exemplo de Requisição

```http
GET https://api.z-api.io/instances?page=1&pageSize=10
```

## Resposta

### 200 OK

A resposta retorna uma coleção de instâncias com seus metadados:

```json
{
  "total": 1,
  "totalPage": 1,
  "pageSize": 1,
  "page": 1,
  "content": [
    {
      "token": "a1b2c3d4e5",
      "tenant": "client-tenant-id",
      "created": "2024-01-15T10:30:00Z",
      "due": 1705323600000,
      "paymentStatus": "paid",
      "deliveryCallbackUrl": "https://webhook.site/...",
      "receivedCallbackUrl": "https://webhook.site/...",
      "disconnectedCallbackUrl": "https://webhook.site/...",
      "messageStatusCallbackUrl": "https://webhook.site/...",
      "receivedAndDeliveryCallbackUrl": "https://webhook.site/...",
      "presenceChatCallbackUrl": "https://webhook.site/...",
      "connectedCallbackUrl": "https://webhook.site/...",
      "receivedStatusCallbackUrl": "https://webhook.site/...",
      "phoneConnected": false,
      "whatsappConnected": false,
      "middleware": "web",
      "name": "Minha Instância",
      "id": "3C3F8E5F4A2B1C9D"
    }
  ]
}
```

### Campos da Resposta

#### Paginação e Totais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `total` | number | Total de instâncias encontradas |
| `totalPage` | number | Total de páginas disponíveis |
| `pageSize` | number | Quantidade de resultados por página |
| `page` | number | Página atual |
| `content` | array | Lista de instâncias da página atual |

#### Objeto `content` (Instância)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único da instância |
| `name` | string | Nome da instância |
| `token` | string | Token de segurança da instância |
| `middleware` | string | Tipo da instância (`web` ou `mobile`) |
| `created` | string | Data de criação |
| `due` | number | Timestamp da data de vencimento |
| `paymentStatus` | string | Status do pagamento |
| `phoneConnected` | boolean | Indica se o telefone está conectado |
| `whatsappConnected` | boolean | Indica se a sessão do WhatsApp está conectada |
| `tenant` | string | Identificador do tenant |
| `*CallbackUrl` | string | URLs de callback configuradas (webhook) |

### Erros comuns

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| 401 | Token inválido | Verifique o header `Client-Token` |
| 400 | Parâmetros inválidos | Verifique os parâmetros de query |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |
