---
id:id: metadata-group

title: Metadata do Grupo
---

## Método

#### /group-metadata

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-metadata

## Conceituação

Este método retorna o metadata do grupo com todas informações do grupo e de seus partipantes.

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição        |
| :-------- | :----: | :--------------- |
| groupId   | string | ID/Fone do grupo |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Params

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-metadata/{phone}

---

## Response

### 200

| Atributos    | Tipo         | Descrição                             |
| :----------- | :----------- | :------------------------------------ |
| phone        | string       | ID/Fone do Grupo                      |
| owner        | string       | Numero do criador do grupo            |
| subject      | string       | Nome do grupo                         |
| creation     | timestamp    | Timestamp da data de criação do grupo |
| participants | array string | com dados dos participantes           |

Array String (participants)

| Atributos    | Tipo   | Descrição                                         |
| :----------- | :----- | :------------------------------------------------ |
| phone        | string | Fone do participante                              |
| isAdmin      | string | Indica se o participante é administrador do grupo |
| isSuperAdmin | string | Indica se é o criador do grupo                    |
| short        | string | Nome curto do participante                        |
| name         | string | Nome do participante                              |

**Exemplo**

```json
{
  "phone": "5511999999999-1623281429",
  "owner": "5511999999999",
  "subject": "Meu grupo no Z-API",
  "creation": 1588721491000,
  "participants": [
    {"phone": "5511888888888", "isAdmin": false, "isSuperAdmin": false},
    {
      "phone": "5511777777777",
      "isAdmin": true,
      "isSuperAdmin": false,
      "short": "ZAPIs",
      "name": "ZAPIs Boys"
    }
  ],
  "subjectTime": 1617805323000,
  "subjectOwner": "554497050785"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/group-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
