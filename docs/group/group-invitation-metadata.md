---
id:id: group-invitation-metadata

title: Metadata do Grupo por Convite
---

## Método

#### /group-invitation-metadata

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group-invitation-metadata?url=url-do-grupo

## Conceituação

Este método retorna o metadata do grupo com todas informações do grupo e de seus partipantes.

:::caution Atenção

No dia 4 de novembro de 2021 o whatsapp alterou a formato da criação de novos grupos, antes: "phone": "5511999999999-1623281429" agora: "phone": "120363019502650977-group"

:::

---

## Response

### 200

| Atributos    | Tipo         | Descrição                             |
| :----------- | :----------- | :------------------------------------ |
| phone        | string       | ID/Fone do Grupo                      |
| owner        | string       | Número do criador do grupo            |
| subject      | string       | Nome do grupo                         |
| description  | string       | Descrição do grupo                    |
| creation     | timestamp    | Timestamp da data de criação do grupo |
| invitationLink    | url         | Link de convite do grupo              |
| contactsCount     | number      | Número de contatos presente no grupo  |
| participantsCount | number      | Número de participantes no grupo      |
| participants      | array string| com dados dos participantes           |

Array String (participants)

| Atributos    | Tipo   | Descrição                                         |
| :----------- | :----- | :------------------------------------------------ |
| phone        | string | Número do participante                            |
| isAdmin      | string | Indica se o participante é administrador do grupo |
| isSuperAdmin | string | Indica se é o criador do grupo                    |
| subjectTime  | timestamp | Data de criação do grupo                    |
| subjectOwner | string | Número do criador do grupo                     |


<!-- | short        | string | Nome curto do participante                        |
| name         | string | Nome do participante                              | -->

**Exemplo**

```json

  {
    "phone": "120363019502650977-group",
    "owner": "5511888888888",
    "subject": "Meu grupo no Z-API",
    "description": "descrição do grupo",
    "creation": 1588721491000,
    "invitationLink": "https://chat.whatsapp.com/KNmcL17DqVA0sqkQ5LLA5",
    "contactsCount": 1,
    "participantsCount": 1,
    "participants": [
      {
        "phone": "5511888888888",
        "isAdmin": false,
        "isSuperAdmin": true
      },
      {
        "phone": "5511777777777",
        "isAdmin": false,
        "isSuperAdmin": false
      }
    ],
    "subjectTime": 1617805323000,
    "subjectOwner": "5511888888888"
}

```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-group-invitation-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
