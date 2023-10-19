---
id: set-last-seen
title: Visto por último
---

## Método

#### /privacy/last-seen

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/last-seen

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível configurar quem pode ver seu "visto por último".

---

## Atributos

### Obrigatório

| Atributos            |  Tipo   | Descrição                                                       |
| :------------------- | :-----: | :-------------------------------------------------------------- |
| visualizationType    | string  | Escopo de visualização (ALL, NONE, CONTACTS, CONTACT_BLACKLIST) |

String (visualizationType)

Escopo de visualização. Valores aceitos:
 - ALL (Todos podem ver)
 - NONE (Ninguém pode ver)
 - CONTACTS (Apenas meus contatos)
 - CONTACT_BLACKLIST (Apenas meus contatos, exceto...)

### Opcional

| Atributos            |  Tipo         | Descrição                                              |
| :------------------- | :-----------: | :----------------------------------------------------- |
| contactsBlacklist    | array object  | Contatos a serem adicionados ou removidos da blacklist. Deve ser enviado quando o "visualizationType" for "CONTACT_BLACKLIST" |

Array Object (contactsBlacklist)

| Atributos |  Tipo   | Descrição                                                                            |
| :-------- | :-----: | :----------------------------------------------------------------------------------- |
| action    | string  | Ação a ser realizada para o contato; adicionar ou remover da blacklist (add, remove) |
| phone     | string  | Número do contato                                                                    |


## Request Body

**Método**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen

**Exemplo**

```json
{
    "visualizationType": "ALL"
}
```

```json
{
    "visualizationType": "CONTACT_BLACKLIST",
    "contactsBlacklist": [
        { "action": "add", "phone": "554411111111" },
        { "action": "remove", "phone": "554422222222" }
    ]
}
```

:::important Importante
É importante destacar que a blacklist (lista de contatos não permitidos) é diferente para cada configuração de privacidade, isto é, a blacklist de "visto por último" não é a mesma da "foto do perfil", e assim para todas a configurações que aceitam a blacklist.
:::

:::tip Dica
**Não** é necessário reenviar o atributo "contactsBlacklist" com os contatos já adicionados. Esse parâmetro é somente para **alterações na blacklist**.
:::

---

## Response

### 200

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-last-seen.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
