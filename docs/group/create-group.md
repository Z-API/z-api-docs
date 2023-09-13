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

Assim como no Whatsapp Web você vai precisar adicionar ao menos um contato para conseguir criar um grupo.

:::

:::warning
 Você não deve passar o número conectado ao Z-API que é responsável pela criação do grupo no array de números que vão compor o grupo.

:::

:::tip Novo atributo

Recentemente, o WhatsApp implementou uma validação para verificar se o número de telefone conectado à API possui o contato do cliente salvo. No entanto, a Z-API desenvolveu uma solução para contornar essa validação, introduzindo um novo recurso chamado **"autoInvite"**. Agora, quando uma solicitação é enviada para adicionar 10 clientes a um grupo e apenas 5 deles são adicionados com sucesso, a API envia convites privados para os cinco clientes que não foram adicionados. Esses convites permitem que eles entrem no grupo, mesmo que seus números de telefone não estejam salvos como contatos.

:::
---

## Atributos

### Obrigatórios

| Atributos |     Tipo     | Descrição                                         |
| :-------- | :----------: | :------------------------------------------------ |
| autoInvite|   boolean    | true ou false (Envia link de convite do grupo no privado) |  
| groupName |    string    | Nome do grupo a ser criado                        |
| phones    | array string | Array com os números a serem adicionados no grupo |

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
  "autoInvite": true,
  "groupName": "Grupo Z-API",
  "phones": ["5544999999999", "5544888888888"]
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

Forma antiga -
  {
    "phone": "5511999999999-1623281429",
    "invitationLink": "https://chat.whatsapp.com/DCaqftVlS6dHWtlvfd3hUa"
  }

------------------------------------------------

Forma nova
  {
    "phone": "120363019502650977-group",
    "invitationLink": "https://chat.whatsapp.com/GONwbGGDkLe8BifUWwLgct"
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
