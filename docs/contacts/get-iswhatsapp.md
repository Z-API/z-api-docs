---
id: get-iswhatsapp
title: Número com Whatsapp ?
---

## Método

#### /phone-exists

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método retorna se o número tem ou não Whatsapp.

:::important Importante

Utilize essa API sempre que quiser verificar se um número possui Whatsapp, geralmente para validação de formulários.
Não utilize essa API caso queira fazer uma verificação antes de enviar uma mensagem, pois o Z-API já valida a existência do número a cada mensagem enviada.
A utilização desse método para esse fim, pode gerar problemas, visto que a verificação ficaria duplicada. 
Z-API não foi desenvolvido para dissiminação de spam para contatos que você não conhece, utilize com sabedoria!

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists/5511999999999

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| exists | boolean | true para caso exista e false para casos onde o número não tenha Whatsapp |

Exemplo

```json
[
  {
    "exists": "true ou false"
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-iswhatsapp.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
