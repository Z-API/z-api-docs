---
id: cancelar-instancia
title: Cancelar instância
sidebar_position: 3
---

# Cancelar instância

Cancele a assinatura de uma instância gerenciada pela Partner API.

:::warning Atenção
A partir do momento em que você assina uma instância a mesma ficará disponível para utilização por 30 dias mesmo que você a cancele antes deste período finalizar, ou seja, caso você cancele hoje, mas o vencimento dela será em 10 dias, a mesma ficará disponível por mais 30 dias até finalizar o cancelamento.
:::

## Endpoint

- **Método**: `POST`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel`

> **Status:** a rota de cancelamento de instância está disponível em produção e utiliza o método **POST** (não `DELETE`).

## Corpo da requisição

O corpo da requisição deve identificar a instância cuja assinatura será cancelada (por exemplo, via `instanceId`). Consulte a seção [**API de Partners**](/docs/partners/cancelar-instancia) para o schema completo.

## Resposta

A resposta indica se o cancelamento da assinatura foi bem-sucedido e retorna os dados atualizados da instância. Consulte esta documentação para detalhes de campos e exemplos.
