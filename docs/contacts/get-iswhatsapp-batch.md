---
id: get-iswhatsapp-batch
title: Validar números em lote
---

## Método

#### /phone-exists-batch

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists-batch

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Diferente do método anterior que valida individualmente se um número possui WhatsApp através de uma requisição GET, essa API oferece uma verificação em lote.

:::caution Atenção
Limite por Requisição: O número máximo de validações em lote por requisição é de 50 mil números.
:::

:::important Importante
Este método continua a ser a escolha ideal quando você precisa verificar se um número possui WhatsApp, especialmente útil para a validação de formulários. No entanto, é crucial observar que não é recomendado utilizar esta API para verificar a existência do número antes de enviar uma mensagem. O Z-API já realiza essa validação automaticamente a cada mensagem enviada, e o uso duplicado deste método pode resultar em problemas. 
:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo  | Descrição |
| :------   | :-:   | :------   |
|  phones   | array | Números de telefone a ser validados, formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

---

## Request Params

#### URL exemplo

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists-batch


```json
{
  "phones": ["554499999999","554488888888"]
}
```

---

## Response

### 200

| Atributos   | Tipo    | Descrição |
| :------     | :----   | :------   |
| exists      | boolean | true para caso exista e false para casos onde o número não tenha WhatsApp |
| inputPhone  | string  | Número enviado na requisição, podendo conter ou não o nono dígito.|
| outputPhone | string  | Número formatado de acordo com a resposta do WhatsApp, refletindo o cadastro no WhatsApp e incluindo o nono dígito, se houver. |
| lid | string  | Identificador único e privado criado pelo WhatsApp para representar contatos sem expor diretamente o número de telefone |
 
Exemplo

```json
[
    {
        "exists": true,
        "inputPhone": "554499999999",
        "outputPhone": "554499999999",
        "lid": "999999999999999@lid"
    },
    {
        "exists": false,
        "inputPhone": "554488888888",
        "outputPhone": "554488888888",
        "lid": null

    }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-iswhatsapp-batch.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
