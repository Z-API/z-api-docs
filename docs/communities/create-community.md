---
id: create-community
title: Criar comunidade
---

## Método

#### /create-group

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Antes de utilizar esse recurso, é importante verificar se o aplicativo do Whatsapp no seu celular já possui compatibilidade com as comunidades, caso já esteja disponível você pode utilizar essa API para criar novas comunidades.

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                           |
| :-------- | :----: | :---------------------------------- |
| name      | string | Nome da comunidade que deseja criar |

### Opcionais

| Atributos   |  Tipo  | Descrição               |
| :---------- | :----: | :---------------------- |
| description | string | Descrição da comunidade |

## Request Body

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities

**Exemplo**

```json
{
  "name": "Minha primeira Comunidade"
}
```

## Response

### 200

| Atributos | Tipo            | Descrição                  |
| :-------- | :-------------- | :------------------------- |
| id        | string          | ID da comunidade criada    |
| subGroups | array[subgroup] | Lista de grupos vinculados |

Exemplo

```json
{
  "id": "98372465382764532938",
  "subGroups": [
    {
      "name": "Minha primeira Comunidade",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-community.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
