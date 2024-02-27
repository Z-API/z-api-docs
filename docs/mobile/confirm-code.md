---
id: confirm-code
title: Confirmar código
---

## Método

#### /mobile/confirm-registration-code

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para confirmar o código que você recebeu. Para utilizar esse método, você precisa concluir as etapas de registro anteriores, que envolvem verificar a disponibilidade de registro do número e solicitar o código de confirmação. Após recebido o código, você pode utilizar essa rota para realizar a confirmação e conexão do número à instância mobile.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-- |
| code      | string | Código de confirmação |

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

| Atributos            | Tipo     | Descrição |
| :------------------- | :------  | :-------- |
| success              | boolean  | Retorna true caso o código tenha sido confirmado corretamente. Feito isso, a instância estará conectada |
| confirmSecurityCode  | boolean  | Retorna true se for necessário a confirmação do código de verificação em duas etapas |


### Exemplo

```json
{
    "success": true
}
```

```json
{
    "success": false,
    "confirmSecurityCode": true
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/confirm-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
