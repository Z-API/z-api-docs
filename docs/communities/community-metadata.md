---
id: community-metadata
title: Metadata da comunidade
---

## Método

#### /communities-metadata/{communityId}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/{idDaComunidade}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método retorna o metadata da comunidade, como nome, descrição e grupos que estão vinculados a ela.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Params

#### URL

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/{idDaComunidade}

---

## Response

### 200

| Atributos   | Tipo           | Descrição                  |
| :---------- | :------------- | :------------------------- |
| name        | string         | Nome da comunidade         |
| id          | string         | ID da comunidade           |
| description | string         | Descrição da comunidade    |
| subGroups   | array subgroup | lista de grupos vinculados |

Array (subGroups)

| Atributos           | Tipo    | Descrição                                |
| :------------------ | :------ | :--------------------------------------- |
| name                | string  | Nome do sub grupo                        |
| phone               | string  | Telefone do sub grupo                    |
| isGroupAnnouncement | boolean | Informe se é um grupo de avisos ou comum |

**Exemplo**

```json
{
  "name": "Minha primeira Comunidade",
  "id": "98372465382764532938",
  "description": "Uma descrição da comunidade",
  "subGroups": [
    {
      "phone": "Minha primeira Comunidade",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    },
    {
      "phone": "Outro grupo",
      "phone": "1203634230225498-group",
      "isGroupAnnouncement": false
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/community-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
