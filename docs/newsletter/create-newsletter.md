---
id: create-newsletter
title: Criando canais
---

## Método

#### /create-newsletter

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por criar um canal. Infelizmente não é possivel criar o canal com imagem, mas você pode logo após a criação utilizar-se do método update-newsletter-picture que esta nesta mesma sessão.


## Atributos

### Obrigatórios

| Atributos | Tipo      | Descrição      |
| :-------- | :-------: | :------------- |
|  name     |  string   |  Nome do canal |

### Opcionais

| Atributos   | Tipo   | Descrição           |
| :---------- | :----: | :--------          |
| description | string | Descrição do canal |

---


## Request Body

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter

**Exemplo**

```json
{
  "name": "Nome do canal",
  "description": "Descrição do canal",
}
```

---


## Response

### 201

| Atributos      | Tipo   | Descrição                 |
| :------------- | :----- | :------------------------ |
| id             | string | ID do canal          |

**Exemplo**

```json

  {
    "id": "999999999999999999@newsletter",
  }

```

:::tip

O id retornado sempre conterá o sufixo "@newsletter", padrão utilizado pelo próprio Whatsapp. Ele deve ser utilizado no mesmo formato nas requisições que recebem o id como parâmetro.

:::

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
