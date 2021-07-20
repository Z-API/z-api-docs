---
id:id: update-group-settings
title: Configurações do grupo
---

## Método

#### /update-group-settings

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings

## Conceituação

Este método permite você alterar as preferências do grupo.

:::attention Atenção Somente administradores podem alterar as preferências do grupo :::

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição        |
| :-------- | :----: | :--------------- |
| phone     | string | ID/Fone do grupo |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| adminOnlyMessage | boolean | Somente administrador podem enviar mensagens no grupo |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/adminOnlyMessage

#### Body

```json
{
  "groupId": "5511999999999-1623281429",
  "adminOnlyMessage": true
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

```json
{
  "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/adminOnlyMessage.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
