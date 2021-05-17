---
id: introduction
title: Introdução
---

## Z-API - Asas para sua imaginação !

**Z-API** foi desenvolvido por **programadores para programadores**, por isso prezamos pela simplicidade e objetividade de tudo que nos propomos a fazer, sendo assim chega de conversa fiada e ** Let's Bora !**

---

## Mas o que é Z-API

Você provavelmente já deve saber, mas vamos reafirmar !

**Z-API** é um serviço RestFul que provê uma API que permite que você interaja com seu whatsapp através uma API (padrão RestFul) simples e intuitiva e também alguns webhooks para te avisar sobre interações com seu número.

---

## Quem pode utilizar Z-API

Não temos restrições quanto a utilização mas temos 2 publicos bem distintos que normalmente utilizam nossos serviços que são:

- Programadores com conhecimentos em API's RestFul. Se você não é mas conhece alguém com estas competências já serve :)

- Utilizadores de soluções de terceiros que permitam integração com Z-API

---

## Tá bom ! mas o que dá para fazer com ele ?

De forma bem direta você basicamente tudo que você faz com Whatsapp Web você poderá fazer utilizando nosso serviço, basta ler o qrcode para conectar seu número Whastaspp ao nosso serviço e pronto !

---

## Técnicamente como funciona o fluxo de envio ?

Para exemplificar de forma simples segue os passos de envio de uma mensagem de texto simples.

1. você envia via api uma mensagem para o z-api

2. z-api adiciona em uma fila e te retorna o id da mensagem

3. Sua instância processa a fila enviando para o WhatsApp

4. Seu webhook de delivery é chamado quando sua mensagem for enviada

5. Assim que o destinatário recebe a mensagem, o webhook de message-status é chamado informando RECEIVED

6. Assim que o destinatário ler a mensagem o messages-status é chamado informando READ

---

:::note **NÃO ARMAZENAMOS MENSAGENS !**

Todas mensagens que você enviar pela nossa API é encaminhada para uma fila de mensageria e após o envio as mesmas são apagadas.

:::

:::important Lembre-se

O Facebook tem versões e comportamentos diferente para cada uma das versão que disponibiliza do Whatsapp, nossa API disponibiliza métodos compativeis com a versão WEB.

:::

:::caution Ponto de Atenção

Muito cuidado não se esqueça que uma vez conectado seu número com Whatsapp ao nosso serviço você não conseguirá mais utilizar o mesmo numero no whatsapp web, esta limitação é temporária tendo em vista o próprio whatsapp já está divulgando uma nova funcionalidade que permitirá mais de um whatsapp web conectado ao mesmo tempo.
