---
id: profile
title: Pegar dados da conta business
---

## Método

#### /business/profile

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone={phone}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Esse método é responsável por retornar as informações da conta business do contato

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone da conta business no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Métodos

**Método**

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone=5511999999999

#### Query params

| key         |    value     | description |
| :---------- | :----------: | :---------- |
| phone       |     5511999999999       |             |

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| description | string | **Descrição** da empresa |
| address | string | **Endereço Físico** da empresa |
| email | string | **Email** da empresa |
| websites | array string | URLs dos websites da empresa |
| categories | array string | Dados das categorias |
| businessHours | array string | Dados do horário de funcionamento da empresa |
| hasCoverPhoto | boolean | Se possui foto de capa |

Array String (categories)

| Atributos    | Tipo   | Descrição                                         |
| :----------- | :----- | :------------------------------------------------ |
| displayName        | string | Nome da categoria                              |
| label      | string | Label da categoria |
| id | string | Id da categoria                    |

Array String (businessHours)

| Atributos    | Tipo   | Descrição                                         |
| :----------- | :----- | :------------------------------------------------ |
| timezones        | string | Fuso Horário                              |
| days      | array string | Dados de funcionamento dos dias |
| mode | string | Tipo do horário de funcionamento                    |

Array String (days)

| Atributos    | Tipo   | Descrição                                         |
| :----------- | :----- | :------------------------------------------------ |
| dayOfWeek        | string | Dia na semana                              |
| openTime      | string | Horário de abertura |
| closeTime | string | Horário de fechamento                    |

Exemplo

```json
{
    "description": "Z API - Asas para sua imaginação",
    "address": "Maringá",
    "email": "zapi@example.com",
    "websites": [
        "https://www.z-api.io"
    ],
    "categories": [
        {
            "displayName": "Outras empresas",
            "label": "OTHER_COMPANIES",
            "id": "629412378414563"
        }
    ],
    "businessHours": {
        "timezone": "America/Sao_Paulo",
        "days": [
            {
                "dayOfWeek": "MONDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "TUESDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "WEDNESDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "THURSDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "FRIDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            }
        ],
        "mode": "specificHours"
    },
    "hasCoverPhoto": false
}
```

### 405

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja, verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---