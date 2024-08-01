---
id: available-categories
title: Listar categorias
---

## Método

#### /business/available-categories?query={{STRING_DE_BUSCA (opcional)}}

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/available-categories

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível listar as categorias disponíveis para atribuir a empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

---

## Atributos

### Opcionais

| Atributos | Tipo   | Descrição |
| :-------- | :----: | :-------- |
| query     | string | Parâmetro de pesquisa de categorias. Exemplo: "tecnologia" |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories?query=tecnologia

## Response

### 200

| Atributos   | Tipo    | Descrição                                                                 |
| :--------   | :------ | :------------------------------------------------------------------------ |
| displayName | string  | Nome da categorias a ser exibido                                          |
| id          | string  | Identificador da categoria. Deve ser enviado na requisição de atribuir categorias a empresa |
| label       | (Opcional) string  | Também pode ser informado na requisição de atribuir categorias a empresa  |

Exemplo

```json
[
  {
    "displayName": "Outras empresas",
    "label": "OTHER_COMPANIES",
    "id": "629412378414563"
  },
  {
    "displayName": "Serviço automotivo",
    "id": "1223524174334504"
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/available-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
