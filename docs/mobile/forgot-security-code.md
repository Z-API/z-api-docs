---
id: forgot-security-code
title: Recuperação de código PIN
---

## Método

#### /mobile/recovery-pin-code

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para solicitar email para recuperação do código PIN da sua conta. Esse será útil caso você tenha configurado a verificação em duas etapas no WhatsApp e não se lembre mais desse código. Dessa forma, o WhatsApp enviará um link para redefinição de código PIN no email que você vinculou à sua conta do WhatsApp.

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Retorna true caso o email para recuperação tenha sido enviado |


### Exemplo

```json
{
    "success": true
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/forgot-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
