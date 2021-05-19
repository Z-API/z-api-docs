---
id: introduction
title: Introdução
---

### Conceituação

Primeiramente você precisa entender sobre as mensagens é que elas podem ser enviadas para um contato, um grupo ou lista de transmissão.

No tópico "contatos" vou voltar a relatar sobre isso, mas é importante você também saber que para o Whatsapp tudo é um chat seja um contato, grupo ou uma lista de transmissão.

Para enviar qualquer mensagem ele precisa de ID do chat, sendo eles:
- Para contatos é o próprio número;
- Para grupos é a concatenação do número do fundador do grupo com um timestamp e
- Para listas de transmissão é a concatenação da string 'broadcast' com o timestamp.

Esses IDs são todos retornados pelo método get/chats que você irá conhecer um pouco mais a frente.

Dica: Você pode formatar seus textos, enviando caracteres de formatação e deixar sua mensagem mais elegante.
