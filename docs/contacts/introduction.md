---
id: introduction
title: Introdução
---

### Conceituação

Neste tópico você vai entender um pouco mais sobre o que o **Z-API** pode fazer quando o assunto é contato, dividimos esta abordagem em alguns tópicos abaixo listados para melhor lhe explicar:

- Para o WhatsApp todo contato é simplesmente um Chat ! Parece ousado de se dizer mas é assim que ele trata o que chamamos de contato, ele utiliza o número do seu contato apenas como identificador para o chat conforme ja dito em outros tópicos. Mas então qual a diferença entre get-chats e get-contacts ? O get-chats vai trazer todos contatos aos quais você ja manteve uma conversa ou seja tem um chat aberto com ele, o get-contacts vai retornar todos os seus contatos que tenham conta no WhatsApp somado aos contatos que participam de grupos com o seu número.

- Tudo que o Z-API pode fazer quanto a contatos é o mesmo que o WhatsApp Web pode fazer ou seja, quase nada, não é possivel adicionar um contato, nem mesmo renomear ou mesmo excluir, basicamente o que você precisa entender é que o WhatsApp Web nao consegue manipular a agenda de contatos do seu celular, logo o **Z-API** também não.

:::caution Sobre contatos

O metodo que retorna contatos pode te deixar um pouco confuso pois provavelmente ele deve retornar um número maior de contatos do que a quantidade que você tem em sua agenda, isso ocorre porque você provavelmente participa de grupos, o método get-contacts vai retornar todos os contatos que estão nos grupos que você participa.

:::
