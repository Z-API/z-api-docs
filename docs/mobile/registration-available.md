---
id: registration-available
title: Verificar disponibilidade de registro
---

## Método

#### /mobile/registration-available

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para verificar disponibilidade de registro de um número. Este método é obrigatóriamente **precedente** ao método de solicitar o envio do código, pois além de buscar as informções sobre a disponibilidade, também realiza um setup de onboarding do número no WhatsApp. Através dessa API você também pode ver os métodos disponíveis para solicitação do código de confirmação, além de saber se o número está banido ou não.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| ddi | string | DDI do número |
| phone | string | Número de telefone que você deseja registrar. Deve incluir apenas o **número com DDD** (Ex: 4499999999), sem formatação ou máscara |

---

## Request Body

```json
{
    "ddi": "55",
    "phone": "4499999999"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| available   | boolean  | Retorna true caso o número esteja disponível para registro. Se a resposta for false, não será possível avançar para a próxima etapa do registro |
| blocked     | boolean  | Define se o número está banido ou bloqueado por algum outro motivo. Se esse for o seu caso, utilize o atributo **appealToken** para solicitar o desbanimento |
| appealToken | string | No caso do número estar banido, esse atributo será retornado contendo um token para **[solicitação de desbanimento](./request-unbanning)** |
| smsWaitSeconds   | number | Tempo que deve ser aguardado para solicitação de **sms**. Caso o valor seja 0, significa que a solicitação já pode ser enviada para este método |
| voiceWaitSeconds | number | Tempo que deve ser aguardado para solicitação de **chamada de voz**. Mesmo objetivo do **smsWaitSeconds** |
| waOldWaitSeconds | number | Tempo que deve ser aguardado para solicitação de **pop-up no aplicativo do celular**. Mesmo objetivo do **smsWaitSeconds**. **Atenção**: não utilize esse método se você não tem acesso ao celular onde o número está atualmente vinculado. Este método é útil para agilizar o processo de confirmação do código, sem ter que esperar o recebimento de um SMS ou chamada de voz, porém necessita que você tenha o dispositivo em mãos e com o aplicativo do WhatsApp aberto. |
| waOldEligible | boolean | Define se o método de solicitação do código via **pop-up no aplicativo do celular** está disponível. |
| reason | string | Em caso de erro, esse atributo diz a razão pela qual o erro aconteceu |


### Exemplo

#### Caso de número disponível

```json
{
    "available": true,
    "smsWaitSeconds": 0,
    "voiceWaitSeconds": 0,
    "waOldWaitSeconds": 0,
    "waOldEligible": true
}
```

#### Caso de número banido

```json
{
    "available": false,
    "blocked": true,
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s"
}
```

:::warning Atenção
Existem alguns cenários onde o número é impedido de ser conectado até mesmo no aplicativo oficial do WhatsApp. Nesse caso, a API de verificar disponibilidade do número não é capaz de identificar isso, e acaba sendo retornado que o número está bloqueado somente no momento de solicitar o código. Infelizmente, até o momento não há nada que possamos fazer a esse respeito, pois, diferente do banimento padrão, não é disponibilizado um token (appealToken) para realizar uma solicitação de desbanimento.
:::

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/registration-available.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
