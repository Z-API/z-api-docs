---
id: send-message-link
title: Enviar link
---

## Método

#### /send-text

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-link

---

## Conceituação

Método responsavel por enviar um link aos seus contatos, muito utilzado para compartilhar links para que os usuários sejam direcionados a um site.

:::tip Sobre links

É importante você saber que o link só fica clicavel caso o destinatário ja tenha seu telefone nos contatos, ou se o mesmo iniciar uma conversa com vocë.

:::

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto sobre seu link. **Não esqueça de informar o mesmo valor do linkURL no final deste texto.** |
| image | string | Link da imagem |
| linkUrl | string | Url do seu link |
| title | string | Titulo para o link |
| linkDescription | string | descrição do link |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | String | Atributo utilizado para responder uma mensagem do chat, basta adicionar o messageId da mensagem que queira responder neste atributo |

---

## Request Body

```json
{
  "phone": "5511999998888",
  "message": "Aqui você coloca um texto sobre o site, atenção esse texto preciso ter o link que será enviado no final da mensagem! Assim: https://z-api.io",
  "image": "https://firebasestorage.googleapis.com/v0/b/zaap-messenger-web.appspot.com/o/logo.png?alt=media",
  "linkUrl": "https://z-api.io",
  "title": "Z-API",
  "linkDescription": "Integração com o whatsapp"
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-link.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
