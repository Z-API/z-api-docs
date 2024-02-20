---
id: set-account-email
title: Cadastrar email na conta
---

## Método

#### /security/email

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para cadastrar um email na sua conta do WhatsApp. Esse email pode ser utilizado mais tarde para recuperação do código PIN de segurança da sua conta.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-- |
| email     | string | Email a ser cadastrado na sua conta do WhatsApp |

---

## Request Body

```json
{
    "email": "example@email.com"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Define se a requisição foi executada com sucesso |
| message     | string   | Em caso de sucesso, pode solicitar verificação do email (VERIFY_EMAIL). Sendo assim, um email será enviado para o endereço informado na requisição, contendo um código que deve ser usado na API de **[verificar email](./verify-email.md)** para concluir o cadastro. Em caso de falha, retorna uma mensagem a respeito do erro |


### Exemplo

```json
{
    "success": true,
    "message": "VERIFY_EMAIL"
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/set-account-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
