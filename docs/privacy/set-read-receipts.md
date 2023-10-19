---
id: set-read-receipts
title: Confirmações de leitura
---

## Método

#### /privacy/read-receipts

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/read-receipts?value=VALOR_DA_CONFIGURAÇÃO

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível configurar as confirmações de leitura de mensagens (não aplicável a grupos).

---

## Atributos

### Obrigatório

| Atributos |  Tipo   | Descrição                                                             |
| :-------- | :-----: | :-------------------------------------------------------------------- |
| value     | string  | Habilitar ou desabilitar as confirmações de leitura (enable, disable) |

String (value) valores aceitos:
 - enable (Habilita as confirmações de leitura)
 - disable (Desabilita as confirmações de leitura)

---

## Request Params

#### URL exemplo

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable

:::important Importante
Ao **desabilitar as confirmações de leitura**, você também não pode ver se suas mensagens foram lidas.
:::

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
    "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-set-read-receipts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
