---
id: get-disallowed-contacts
title: Listar contatos não permitidos
---

## Método

#### /privacy/disallowed-contacts

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/disallowed-contacts?type=ESCOPO_DO_BLOQUEIO

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível listar as os contatos que estão na lista de não permitidos (blacklist) para certas interações com sua conta.

---

## Atributos

### Obrigatório

| Atributos   |  Tipo   | Descrição                                                   |
| :---------- | :-----: | :---------------------------------------------------------- |
| type        | string  | Escopo do bloqueio (lastSeen, photo, description, groupAdd) |

String (type)

Escopo do bloqueio. Valores aceitos:
 - lastSeen (Visto por último)
 - photo (Visualizar foto do perfil)
 - description (Visualizar recado)
 - groupAdd (Permissão de adicionar em grupos)

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/disallowed-contacts?type=lastSeen

---

## Response

### 200

| Atributos          | Tipo          | Descrição                          |
| :---------------   | :------------ | :--------------------------------- |
| disallowedContacts | array string  | Fone de cada contato da blacklist  |

Exemplo

```json
{
    "disallowedContacts": [
        "554411111111",
        "554422222222"
    ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/disallowed-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
