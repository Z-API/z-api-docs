---
id: create-tag
title: Criar nova etiqueta
---

## Método

#### /business/create-tag

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/create-tag

### Header

|     Key      |                            Value                            |
| :----------: | :---------------------------------------------------------: |
| Client-Token | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Através deste método, é possível criar uma nova etiqueta. Quando você cria uma etiqueta, ela fica disponível para ser utilizada ao atribuí-la em um chat.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp.
:::

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição        |
| :-------- | :----: | :--------------- |
| name      | string | Nome da etiqueta |

### Opcional

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| color | number | Chave (index) da cor desejada. Esse valor deve ser definido de acordo com as cores disponíveis, as quais podem ser encontradas **[nessa API](./get-tags-colors.md)** |

## Request Body

```json
{
  "name": "Nome da etiqueta"
}

{
  "name": "Nome da etiqueta",
  "color": 1
}
```

## Response

### 200

| Atributos | Tipo   | Descrição                     |
| :-------- | :----- | :---------------------------- |
| id        | string | Id da etiqueta que foi criada |

Exemplo

```json
{
  "id": "10"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-tag.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
