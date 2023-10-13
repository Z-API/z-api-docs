---
id: available-categories
title: Listar categorias
---

## Método

#### /business/available-categories

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

## Response

### 200

| Atributos   | Tipo    | Descrição                                                                 |
| :--------   | :------ | :--------------------------------------------------                       |
| displayName | string  | Nome da categorias a ser exibido                                          |
| label       | string  | Valor que deve ser enviado na requisição de atribuir categorias a empresa |

Exemplo

```json
[
  {
    "displayName": "Outras empresas",
    "label": "OTHER_COMPANIES"
  },
  {
    "displayName": "Serviço automotivo",
    "label": "AUTOMOTIVE_SERVICE"
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
