---
id: call-token
title: Gerar token para chamadas
---

## Método

#### /call-token

`GET` https://api.z-api.io/instances/{id}/token/{token}/call-token

## Conceituação

Método utilizado para gerar um token efêmero para autenticação na SDK de chamadas da Z-API.

Este token é temporário e válido para apenas uma única conexão. Caso a aplicação seja reiniciada, será necessário gerar um novo token.

---

## Integração com SDK

Este endpoint deve ser utilizado em conjunto com a SDK oficial de chamadas:

https://www.npmjs.com/package/@z-api/call

Na documentação da SDK, consulte a seção "Exemplo de backend (Node.js)" para entender como utilizar este endpoint corretamente na geração do token.

:::caution Atenção

Este endpoint deve ser utilizado no **backend**, e não no frontend onde a SDK será instanciada.
Manter a requisição no backend evita exposição do client-token e previne possíveis problemas de segurança ou vazamento do token.

:::

## Request Params

**Método**

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/call-token

## Request Body

Este endpoint não requer body.

## Response

### 200

Retorna um token efêmero para autenticação na SDK.

| Atributos | Tipo   | Descrição                          |
| :-------- | :----: | :-------------------------------- |
| token     | string | Token efêmero gerado               |

**Exemplo:**

```json
{
  "token": "ek-gKrx0dpG27s1YyoU3i3AEwF1d0JiTcq1_GKc1TsyEmY"
}
```

### 405

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja, verifique se você enviou o GET conforme especificado no início deste tópico.

### 415

Caso você receba um erro 415, certifique-se de adicionar nos headers da requisição o "Content-Type" adequado, geralmente "application/json".

---