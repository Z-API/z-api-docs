---
id: company-description
title: Alterar descrição da empresa
---

## Método

#### /business/company-description

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-description

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível alterar a descrição da empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

---

## Atributos

### Opcional

| Atributos   |  Tipo   | Descrição                                      |
| :---------- | :-----: | :--------------------------------------------- |
| value       | string  | Descrição da empresa                           |

## Request Body

```json
{
  "value": "Texto da descrição"
}
```

:::tip Dica
Para remover a descrição basta enviar o atributo "value" como vazio
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-description.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
