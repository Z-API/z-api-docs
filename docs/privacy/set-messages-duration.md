---
id: set-messages-duration
title: Duração das mensagens
---

## Método

#### /privacy/messages-duration

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/messages-duration?value=VALOR_DA_DURAÇÃO

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível configurar mensagens temporárias para **novas conversas individuais**, definindo uma duração. Não afeta conversas já existentes.

---

## Atributos

### Obrigatório

| Atributos |  Tipo   | Descrição                                                             |
| :-------- | :-----: | :-------------------------------------------------------------------- |
| value     | string  | Tempo da duração das mensagens (days90, days7, hours24, disable) |

String (value) valores aceitos:
 - days90 (Define a duração das mensagens para 90 dias)
 - days7 (Define a duração das mensagens para 7 dias)
 - hours24 (Define a duração das mensagens para 24 horas)
 - disable (Desativa a expiração das mensagens)

---

## Request Params

#### URL exemplo

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-set-messages-duration.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
