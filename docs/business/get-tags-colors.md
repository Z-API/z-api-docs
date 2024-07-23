---
id: tags-colors
title: Cores de etiquetas
---

## Método

#### /business/tags/colors

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/tags/colors

### Header

|     Key      |                            Value                            |
| :----------: | :---------------------------------------------------------: |
| Client-Token | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Através deste método, é possível listar as cores de etiquetas disponíveis.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp.
:::

## Response

### 200

| Atributos         | Tipo   | Descrição          |
| :---------------- | :----- | :----------------- |
| {{INDICE_DA_COR}} | string | Hexadecimal da cor |

Exemplo

```json
{
  "0": "#FF9485",
  "1": "#64C4FF",
  "2": "#FFD429"
}
```

:::tip Dica
As cores podem variar entre diferentes plataformas (Android / IPhone)
:::

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-tags-colors.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
