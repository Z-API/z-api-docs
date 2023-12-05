---
id: set-privacy-online
title: Visualização de online
---

## Método

#### /privacy/online

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/online

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível configurar quem pode ver quando você estiver online.

---

## Atributos

### Obrigatório

| Atributos            |  Tipo   | Descrição                                                       |
| :------------------- | :-----: | :-------------------------------------------------------------- |
| visualizationType    | string  | Escopo de visualização (ALL, SAME_LAST_SEEN) |

String (visualizationType)

Escopo de visualização. Valores aceitos:
 - ALL (Todos podem ver)
 - SAME_LAST_SEEN (Mesma configuração utilizada no "visto por último")

## Request Body

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online

**Exemplo**

```json
{
    "visualizationType": "ALL"
}
```

---

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-online.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
