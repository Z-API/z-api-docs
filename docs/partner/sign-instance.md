---
id: sign-instance
title: Assinando uma instância
---

## Método

#### /subscription

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription

---

## Conceituação

Método utilizado para assinar uma instância.

:::caution Atenção

Você só conseguirá assinar instâncias criadas via API com este método.

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/{SEU_TOKEN}/integrator/on-demand/subscription

---

## Response

### 201

OK

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/sign-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
