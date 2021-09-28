---
id: create-group
title: Criando grupos
---

## Método

#### /create-group

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

---

## Conceituação

Este método é reponsavel por criar um grupo com seus respectivos participantes. Infelizmente não é possivel criar o grupo com imagem, mas você pode logo após a criação utilizar-se do método Update-group-photo que esta nesta mesma sessão.

:::tip Dica

Assim como no WhastWeb você vai precisar adicionar ao menos um contato para conseguir criar um grupo.

:::

---

## Atributos

### Obrigatórios

| Atributos |     Tipo     | Descrição                                         |
| :-------- | :----------: | :------------------------------------------------ |
| groupName |    string    | Nome do grupo a ser criado                        |
| phones    | array string | Array com os numeros a serem adicionados no grupo |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

**Exemplo**

```json
{
  "groupName": "Meu grupo no Z-API",
  "phones": ["5511999999999", "5511888888888"]
}
```

---

## Response

### 200

| Atributos      | Tipo   | Descrição                 |
| :------------- | :----- | :------------------------ |
| phone          | string | ID/Fone do grupo          |
| invitationLink | string | link para entrar no grupo |

**Exemplo**

```json
{
  "phone": "5511999999999-1623281429",
  "invitationLink": "https://chat.whatsapp.com/DCaqftVlS6dHWtlvfd3hUa"
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-group.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
