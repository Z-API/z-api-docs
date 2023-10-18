---
id: company-websites
title: Alterar websites da empresa
---

## Método

#### /business/company-websites

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-websites

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível alterar os websites da empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

---

## Atributos

### Opcional

| Atributos   |  Tipo     | Descrição                                    |
| :---------- | :-----:   | :----------------------------------------- |
| websites    | string[]  | Websites da empresa                        |

## Request Body

```json
{
  "websites": ["https://example.com", "https://example2.org"]
}
```

:::warning
A empresa pode ter apenas 2 (dois) websites registrados. Enviar mais do que dois itens na requisição resultará em um erro.
:::

:::important Formato da url dos sites
O formato da url dos sites deve ser uma url válida. Enviar uma url inválida, resultará em um erro. Guia para formato de urls: https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=pt-br
:::

:::tip Dica
Para remover o endereço basta enviar o atributo "websites" como vazio
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-websites.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
