---
id: tags
title: Buscar etiquetas
---

## Método

#### /tags

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/tags

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Nesse método você busca todas suas etiquetas cadastradas em seu whatsapp business.

:::important Importante
Este método está disponível apenas para dispositivos conectados a versão Multi-Devices do whatsapp.
:::

## Response

### 200

| Atributos    | Tipo    | Descrição                                        |
| :----------- | :------ | :----------------------------------------------- |
|  id    | string | id da etiqueta    |
| name   | string | Nome da etiqueta  |
| color  | string | identificador da cor da etiqueta  |


Exemplo

```json
[
    {
        "id": "1",
        "name": "Novo cliente",
        "color": 1
    },
    {
        "id": "2",
        "name": "Novo pedido",
        "color": 2
    },
    {
        "id": "3",
        "name": "Pagamento pendente",
        "color": 0
    },
    {
        "id": "4",
        "name": "Pago",
        "color": 3
    },
    {
        "id": "5",
        "name": "Pedido finalizado",
        "color": 5
    }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

