---
id: get-metadata-contact
title: Pegar metadata do contato
---

## Método

#### /contacts/{phone}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contacts/{phone}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por retornar as informações do metadata do contato.

:::tip Dica sobre imagem do contato

Se você pretente armazenar a imagem do seu contato observe que sempre retornamos no get-contacts o atribucom imgUrl com ela para você, porém é importante lembrar que esta fica disponivel por apenas **48 horas**, após este periodo o link da imagem é excluido pelo próprio WhatsApp. Sugerimos que caso precise atualizar a imagem do seu contato você utilize o proximo método desta documentação, o **get-profile-picture**.

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contacts/5511999999999

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| phone | string | Phone do contato |
| name | string | **Nome e sobrenome** do contato, só vai retornar preenchido caso você tenha o número em seus contatos |
| short | string | **Nome** do contato, só vai retornar preenchido caso você tenha o número em seus contatos |
| vname | string | Nome do Vcard do contato, caso ele tenha |
| notify | string | Nome informado nas configurações de nome do WhatsApp |
| imgUrl | string | URL da foto do contato **o WhatsApp apaga após 48h** |
| about | string | Recado do perfil do contato |

Exemplo

```json
{
  "name": "Nome e sobrenome do contato",
  "phone": "551199999999",
  "notify": "Nome do contado no WhatsApp",
  "short": "Nome do contato",
  "imgUrl": "url da foto do contato ",
  "about": "Olá! Eu estou usando o WhatsApp."
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-metadata-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
