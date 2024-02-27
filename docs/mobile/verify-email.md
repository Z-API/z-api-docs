---
id: verify-account-email
title: Verificar email da conta
---

## Método

#### /security/verify-email

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para realizar verificação do email da conta. Você pode cadastrar um email na sua conta do WhatsApp através da API de **[Cadastrar email na conta](./set-account-email.md)**.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## Atributos

### Obrigatórios

| Atributos         | Tipo | Descrição |
| :---------------- | :--: | :-- |
| verificationCode  | string | Código de verificação enviado para o email que foi cadastrado na conta |

---

## Request Body

```json
{
    "verificationCode": "123456"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/verify-account-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
