---
id: edit-tag
title: Editar etiqueta
---

## Método

#### /business/edit-tag/{{ID_DA_ETIQUETA}}

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{ID_DA_ETIQUETA}}

### Header

|     Key      |                            Value                            |
| :----------: | :---------------------------------------------------------: |
| Client-Token | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Através deste método, é possível editar uma etiqueta.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp.
:::

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição             |
| :-------- | :----: | :-------------------- |
| name      | string | Novo nome da etiqueta |

### Opcional

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| color | number | Chave (index) da nova cor desejada. Esse valor deve ser definido de acordo com as cores disponíveis, as quais podem ser encontradas **[nessa API](./get-tags-colors.md)** |

## Request Params

#### URL exemplo

Method

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{ID_DA_ETIQUETA}}

## Request Body

```json
{
  "name": "Nome da etiqueta"
}

{
  "name": "Nome da etiqueta",
  "color": 2
}
```

## Response

### 200

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-tag.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
