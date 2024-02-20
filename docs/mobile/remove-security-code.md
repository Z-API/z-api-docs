---
id: remove-security-code
title: Remover código PIN
---

## Método

#### /security/two-fa-code/remove

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para remover o código PIN de segurança da conta.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Define se a requisição foi executada com sucesso |
| message     | string   | Em caso de falha, retorna uma mensagem a respeito do erro |


### Exemplo

```json
{
    "success": true
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
