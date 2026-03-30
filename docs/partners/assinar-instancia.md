---
id: assinar-instancia
title: Assinar instância
sidebar_position: 2
---

# Assinar instância

Ative a assinatura de uma instância criada via Partner API.

## Endpoint

- **Método**: `POST`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription`

> **Status:** a rota de assinatura de instância está em produção e deve ser utilizada conforme especificado nesta documentação.

## Corpo da requisição

### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `withCalls` | boolean | Não | Define se a instância será criada com suporte a chamadas (ligações) |

:::caution Atenção

O atributo **withCalls** é opcional. Caso não seja enviado, a requisição continuará funcionando normalmente com o comportamento padrão. Este recurso está disponível apenas para contas que possuem a funcionalidade de chamadas habilitada.

:::

### Exemplo de Request Body

```json
{
    "withCalls": true
}
```

## Resposta

Retorna o status `200 OK`, indicando que a requisição foi processada com sucesso. Nenhum conteúdo é retornado no corpo da resposta.