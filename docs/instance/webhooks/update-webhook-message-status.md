---
id:id: update-webhook-message-status

title: Atualiza webhook status mensagem
---

## Método

#### /update-webhook-receive

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-message-status

## Conceituação

O Z-API oferece dentro das configurações da instância no painel admin o apontamento de webhooks para que ele possa notificar você sobre interações com seus chats/contatos. Este método é reponsavel por atualizar/adicionar esta informação via API, com ele você pode configurar os webhooks sem a necessidade de acessar o admin Z-API.

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                         |
| :-------- | :----: | :-------------------------------- |
| value     | string | Webhook/EndPoint da sua aplicação |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-message-status

#### Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status"
}
```

---

## Response

### 200

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-message-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
