---
id: captcha-confirm
title: Responder captcha
---

## Método

#### /mobile/respond-captcha

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para responder ao captcha necessário para envio do código de confirmação. Esse método somente se faz necessário se a API de **[solicitar código](./request-code.md)** responder com o atributo "captcha", que por sua vez, contém o base64 da imagem com o captcha.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :-: | :-- |
| captcha   | string | Código captcha para confirmação. Esse captcha é exibido na imagem retonada na solicitação do código de confirmação. |

---

## Request Body

```json
{
    "captcha": "123456"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Retorna true caso o captcha tenha sido respondido corretamente. Sendo assim, aguarde o recebimento do código de confirmação e utilize-o na API de **[confirmar código](./confirm-code.md)** |


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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/captcha-confirm.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
