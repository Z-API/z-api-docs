---
id: atualizar-instancia
title: Atualizando a assinatura de uma instância
---

## Endpoint

- **Método**: `PUT`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription/update`

## Conceituação

Método utilizado para atualizar uma instância existente para o modelo com suporte a chamadas (ligações).

## Atributos

### Obrigatórios

| Atributos  | Tipo    | Descrição                                                                 |
| :--------- | :-----: | :------------------------------------------------------------------------ |
| withCalls  | boolean | Deve ser enviado como "true" para habilitar chamadas na instância         |

:::caution Atenção

O atributo **withCalls** é obrigatório e aceita apenas o valor **true**.
Não é possível realizar downgrade da assinatura (remover chamadas). Caso deseje voltar para o modelo sem chamadas, será necessário cancelar a assinatura atual e realizar uma nova contratação.
Este recurso está disponível apenas para contas que possuem a funcionalidade de chamadas habilitada.

:::

## Request Params

**Método**

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/integrator/on-demand/subscription/update

## Request Body

```json
{
  "withCalls": true
}
```

## Response

### 201

OK

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST, GET ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---