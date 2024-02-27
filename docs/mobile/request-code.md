---
id: request-code
title: Solicitar código de confirmação
---

## Método

#### /mobile/request-registration-code

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para solicitar o envio do código de confirmação. Para executar esse método, é necessário que antes você **[verifique se o número está disponível](./registration-available.md)** para ser registrado. Sem antes fazer essa verificação, não será possível solicitar o código.

:::tip Atenção
Não se esqueça que o número de telefone que você deve enviar nesta requisição é o mesmo que você verificou na **[API anterior](./registration-available.md)**. Pois lembrando, verificar se o número está disponível é obrigatório para poder solicitar o código de confirmação.
:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :-: | :-- |
| ddi       | string | DDI do número |
| phone     | string | Número de telefone que você deseja registrar. Deve incluir apenas o **número com DDD** (Ex: 4499999999), sem formatação ou máscara |
| method    | string | Define o método de envio do código. SMS, chamada de voz ou pop-up no aplicativo do WhatsApp. (sms, voice, wa_old) |

---

## Request Body

```json
{
    "ddi": "55",
    "phone": "4499999999",
    "method": "sms | voice | wa_old"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Retorna true caso a solicitação do código tenha sido enviada com sucesso. Confira se recebeu o código e utilize-o na API de **[confirmar código](./confirm-code.md)** |
| captcha     | string   | Base64 de imagem com código captcha. No caso de receber esse atributo, você precisará confirmar esse código na API de **[confirmar captcha](./captcha-confirm.md)** para que o código seja de fato enviado. Após confirmação do captcha, não é necessário solicitar o código novamente, apenas aguardar o seu recebimento. |
| blocked     | boolean  | Define se o número está banido ou não |
| retryAfter  | string | Tempo em segundos que deve ser aguardado para nova solicitação do código |
| smsWaitSeconds   | number | Tempo que deve ser aguardado para solicitação de **sms**. Caso o valor seja 0, significa que a solicitação já pode ser enviada para este método |
| voiceWaitSeconds | number | Tempo que deve ser aguardado para solicitação de **chamada de voz**. Mesmo objetivo do **smsWaitSeconds** |
| waOldWaitSeconds | number | Tempo que deve ser aguardado para solicitação de **pop-up no aplicativo do celular**. Mesmo objetivo do **smsWaitSeconds**. **Atenção**: não utilize esse método se você não tem acesso ao celular onde o número está atualmente vinculado. Este método é útil para agilizar o processo de confirmação do código, sem ter que esperar o recebimento de um SMS ou chamada de voz, porém necessita que você tenha o dispositivo em mãos e com o aplicativo do WhatsApp aberto. |
| method | string | Método de envio do código |


### Exemplo

#### Caso de sucesso

```json
{
    "success": true,
    "retryAfter": 165,
    "smsWaitSeconds": 125,
    "voiceWaitSeconds": 125,
    "waOldWaitSeconds": 125,
    "method": "sms"
}
```

#### Caso de número banido

```json
{
    "success": false,
    "blocked": true
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/request-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
