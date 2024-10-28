---
id: remove-contacts
title: Remover Contatos
---

## Método

#### /contacts/remove

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contac/remove

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsavel por remover os contatos do Whatsapp da sua lista de contatos no celular.

---

:::caution Sobre Esse recurso
O método para remover contatos da lista do WhatsApp só funcionará para contas que já receberam a atualização necessária. Certifique-se de que sua conta **do Whatsapp** tenha recebido a atualização antes de utilizar este recurso. Caso contrário, a operação não será concluída com sucesso.
:::


---

## Request Body

```json
[
  "554499999999",
  "554499998888"
]
```

## Response

### 200

| Atributos | Tipo  | Descrição |
| :-- | :-- | :--   |
| success | boolean |  |
| errors  | array   |  |


Exemplo

```json
{
    "success": true,
    "errors": []
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
