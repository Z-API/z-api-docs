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

Os campos aceitos (por exemplo, identificador da instância, plano, ciclo de cobrança) devem seguir exatamente o schema descrito nesta página. Consulte a seção [**API de Partners**](/docs/partners/assinar-instancia) para detalhes.

## Resposta

A resposta confirma a ativação da assinatura para a instância e retorna os dados atualizados (plano, status, datas de início/fim, etc.). Consulte esta documentação para o formato completo e exemplos de uso.
