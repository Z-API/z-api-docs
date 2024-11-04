---
id: report-contact
title: Denunciar contato
---

## Método

#### /contacts/{{phone}}/report

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contacts/{{phone}}/report

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Este método é responsável por denunciar um contato.

---

## Atributos

### Obrigatórios

| Atributos | Tipo   | Descrição                                    |
| :-------- | :----: | :------------------------------------------- |
| phone     | string | Número de telefone que você deseja denunciar |

---

## Request Params

#### URL exemplo

Method

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contacts/5544999999999/report

---

## Response

### 200

| Atributos | Tipo    | Descrição                                     |
| :-------- | :------ | :-------------------------------------------- |
| success   | boolean | Atributo de confirmação da ação (true, false) |
| error     | string  | Mensagem de erro, caso ocorra                 |

Exemplo

```json
{
  "success": true
}
```

### 400

```json
{
	"error": "Invalid phone"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/report-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
