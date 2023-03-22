---
id: introduction
title: Introdução
---

### Conceituação

Primeiramente, o que você precisa entender sobre as mensagens é que elas podem ser enviadas para um contato, um grupo ou lista de transmissão.

No tópico "contatos" vou voltar a relatar sobre isso, mas é importante você também saber que para o Whatsapp tudo é um chat, seja um contato, grupo ou uma lista de transmissão.

Para enviar qualquer mensagem ele precisa de ID do chat, sendo eles:

- Para contatos é o próprio número;
- Para grupos é a concatenação do número do fundador do grupo com um timestamp e
- Para listas de transmissão é a concatenação da string 'broadcast' com o timestamp.

Esses IDs são todos retornados pelo método get/chats, que você irá conhecer um pouco mais a frente.

Falando em ID, recomendamos fortemente que você armazene em sua aplicação o messageId que nosso response irá retornar, conforme imagem abaixo, pois caso precise responder, marcar ou mesmo deletar uma mensagem, você precisará informar o messageId como atributo no método.

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68" // salve este ID
}
```

:::tip Dica

Você pode formatar seus textos, enviando caracteres de formatação e deixar sua mensagem mais elegante.

:::
