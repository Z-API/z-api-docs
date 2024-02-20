---
id: get-has-security-code
title: Verificar se possui código PIN
---

## Método

#### /security/two-fa-code

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para buscar se sua conta possui um código PIN de segurança cadastrado.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Define se a requisição foi executada com sucesso  |
| hasCode     | boolean  | Define se a conta possui um código PIN cadastrado |

### Exemplo

```json
{
    "success": true,
    "hasCode": true
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-has-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
