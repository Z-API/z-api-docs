---
id: request-unbanning
title: Solicitar desbanimento
---

## Método

#### /mobile/request-unbanning

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método utilizado para solicitar desbanimento de um número.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| appealToken | string | Token para desbanimento de um número em específico |
| description | string | Descrição a ser enviada para análise do WhatsApp   |

---

## Request Body

```json
{
    "appealToken": "Ae1CIGl4Mq7kQ09OQzUnnCx2mTPHxZCjPesdRc8Z1lNFV9d6gvtd5LDW0r7ukVAgtMOP2AxckQM6QeyVp7bL0RbbVac6GQUtMd4tYAZsPOwSIQKlVIoTZs2akgcRd-jvhLKh32roOd0KFPg7hAaYURpIuDXhkaZ_gLJLhmzADNp3lxUNdsIg10q92w",
    "description": "Estava conversando normalmente e fui banido"
}
```

---

## Response

### 200

| Atributos   | Tipo     | Descrição |
| :--------   | :------  | :-------- |
| success     | boolean  | Retorna true caso a solicitação tenha ocorrido com sucesso |
| status      | string   | Status da solicitação do desbanimento (IN_REVIEW, UNBANNED) |

### Exemplo

```json
{
    "success": true,
    "status": "IN_REVIEW | UNBANNED"
}
```

### 400

Requisição inválida. Verifique se os dados que você está enviando estão de acordo com o documentado acima.

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/request-unbanning.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
