---
id: introduction
title: Introdução
---

:::warning Limitação do aplicativo web
Devido a esse recurso **não estar disponível no aplicativo web**, a **Z-API atualmente não oferece suporte ao envio de mensagens via listas de transmissão**. Essa é uma limitação da própria plataforma do aplicativo web.
:::

## Lista de transmissão

Como já mencionado anteriormente, para o aplicativo tudo é tratado como um chat, e com as listas de transmissão não é diferente. Assim como nos grupos, é possível identificar suas listas de transmissão através do método **get /chats**.

As listas de transmissão possuem um identificador (ID/Fone) com o sufixo -broadcast, como por exemplo: **1624901640-broadcast**.

Além disso, diferente dos grupos, as interações originadas de listas de transmissão ocorrem de forma individual. Ou seja, quando um destinatário responde a uma mensagem enviada por lista de transmissão, essa resposta será recebida como uma conversa individual, permitindo interação direta com o contato.

