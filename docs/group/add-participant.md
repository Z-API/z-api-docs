---
id:id: add-participant

title: Adicionar Participantes
---

## Método

#### /add-participant

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant

## Conceituação

Este método é reponsável por adicionar novos participantes ao grupo.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| groupId | string | ID/Fone do grupo |
| phones | array string | Array com os numero(s) do(s) participante(s) a serem adicionados |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant

#### Body

```json
{
  "groupId": "5511999999999-1623281429",
  "phones": ["5544999999999", "5544888888888"]
}
```

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| value | boolean | true caso tenha tenha dado certo e false em caso de falha |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
