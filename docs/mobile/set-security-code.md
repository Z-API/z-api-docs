---
id: set-security-code
title: Cadastrar código PIN
---

## Método

#### /security/two-fa-code

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para cadastrar um código PIN de segurança na sua conta do WhatsApp.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-- |
| code      | string | Código PIN de segurança a ser cadastrado na conta |

---

## Request Body

```json
{
    "code": "123456"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Define se a requisição foi executada com sucesso |


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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/set-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
