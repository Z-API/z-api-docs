---
id: business-hours
title: Alterar horário de funcionamento
---

## Método

#### /business/hours

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/hours

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível alterar o horário de funcionamento da empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

---

## Atributos

### Obrigatório

| Atributos   |  Tipo     | Descrição                                    |
| :---------- | :-----:   | :------------------------------------------- |
| timezone    | string    | Local do fuso horário                        |

### Opcionais

| Atributos   |  Tipo     | Descrição                                                       |
| :---------- | :-----:   | :-------------------------------------------------------------- |
| mode        | string    | Modo de funcionamento (specificHours, open24h, appointmentOnly) |
| days        | array object  | Dias da semana em que a empresa funciona                        |

Object (days)

| Atributos   |  Tipo     | Descrição                                                                      |
| :---------- | :-----:   | :----------------------------------------------------------------------------- |
| dayOfWeek   | string    | Dia da semana (SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY) |
| openTime    | string    | Hora de abertura (formato hh:mm)                                               |
| closeTime   | string    | Hora de fechamento (formato hh:mm)                                             |


## Request Body

```json
{
  "timezone": "America/Sao_Paulo",
  "days": [
    {
      "dayOfWeek": "MONDAY",
      "openTime": "08:00",
      "closeTime": "12:00"
    },
    {
      "dayOfWeek": "MONDAY",
      "openTime": "14:00",
      "closeTime": "18:00"
    }
  ],
  "mode": "specificHours"
}
```

:::tip Dica
Para definir todos os dias como "fechado", basta enviar o atributo "days" como vazio
:::

---

## Response

### 201

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/business-hours.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
