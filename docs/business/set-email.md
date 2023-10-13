---
id: company-email
title: Alterar email da empresa
---

## Método

#### /business/company-email

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível alterar o email de contato da empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

---

## Atributos

### Opcional

| Atributos   |  Tipo   | Descrição                                  |
| :---------- | :-----: | :----------------------------------------- |
| value       | string  | Email da empresa                           |

## Request Body

```json
{
  "value": "email@example.com"
}
```

:::important Formato do email
Lembrando que o campo enviado deve ser em um formato válido de email. Preencher esse valor com um texto que não esteja no formato de email resultará em um erro.
:::

:::tip Dica
Para remover o email basta enviar o atributo "value" como vazio
:::

---

## Response

### 201

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
