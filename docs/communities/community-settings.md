---
id: community-settings
title: Configurações da comunidade
---

## Método

#### /communities/settings

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings

### Header

|     Key      |                            Value                            |
| :----------: | :---------------------------------------------------------: |
| Client-Token | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Com essa API você consegue alterar as configurações de uma comunidade.

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| communityId | string | ID da comunidade que será alterado as configurações |
| whoCanAddNewGroups | string (admins ou all) | Configuração de quem pode adicionar novos grupos a essa comunidade. Somente administradores (admins) ou todos (all) |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings

#### Body

```json
{
  "communityId": "98372465382764532938",
  "whoCanAddNewGroups": "admins" | "all"
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

```json
{
  "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/community-settings.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
