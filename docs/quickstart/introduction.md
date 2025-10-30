---
id: introduction
title: Introdução
slug: /
---

## Z-API - Asas para sua imaginação!

**Z-API** foi desenvolvido por **programadores para programadores**, por isso prezamos pela simplicidade e objetividade de tudo que nos propomos a fazer, sendo assim chega de conversa fiada e ** Let's Bora!**

---

## Mas o que é Z-API?

Você provavelmente já deve saber, mas vamos reafirmar!

**Z-API** é um serviço RestFul que provê uma API que permite que você interaja com seu WhatsApp através de uma API simples e intuitiva, além de webhooks para te avisar sobre interações com seu número.

:::important Importante

O Z-API reafirma que não é destinada para prática de SPAM e envio de mensagens indesejadas ou qualquer ação que viole os termos de serviço do WhatsApp.

Utilize a API com sabedoria criando funcionalidades que gere valor aos seus clientes e aos usuários do WhatsApp.

:::

---

## Quem pode utilizar Z-API?

Não temos restrições quanto a utilização, mas geralmente são 2 públicos bem distintos que utilizam nossos serviços. São eles:

- Programadores com conhecimentos em API's RestFul. Se você não é, mas conhece alguém com estas competências, já serve :)

- Utilizadores de soluções de terceiros que permitam integração com Z-API

---

## Tá bom! Mas o que dá para fazer com ele?

De forma bem direta, tudo que você faz com WhatsApp Web você poderá fazer utilizando nosso serviço. Para isso basta ler o QRcode do Z-API e utilizar nosso serviço!

---

## Tecnicamente, como funciona o fluxo de envio?

Para exemplificar, segue os passos de envio de uma mensagem de texto simples:

1. Você envia via API uma mensagem para o Z-API;

2. O Z-API adiciona em uma fila e te retorna o ID da mensagem;

3. Sua instância processa a fila enviando para o WhatsApp;

4. Seu Webhook de delivery é chamado quando a mensagem é processada, te avisando que foi enviada ou que houve falha.

5. Assim que o destinatário receber a mensagem, o Webhook de message-status é chamado informando RECEIVED.

6. Por fim quando o destinatário ler a mensagem o messages-status é chamado informando READ

---

## Limites

Iniciei por este tópico porque é bem comum as pessoas perguntarem sobre quais os limites de envios com Z-API. Nós **NÃO TEMOS LIMITE** para número de mensagens enviadas! Mas é importante você entender que esta utilizando uma sessão do WhatsApp Web, então o padrão de utilização precisa ser compatível, além disso sempre recomendamos que você leia atentamente as políticas estabelecidas pelo proprio WhatsApp em sua pagina oficial https://www.whatsapp.com/legal.

---

:::note **NÃO ARMAZENAMOS MENSAGENS!**

Todas as mensagens enviadas para nossa API serão encaminhadas para uma fila de mensageria e após o envio as mesmas são apagadas.

:::

:::important Lembre-se

O Facebook tem comportamentos diferentes para cada uma das versões do WhatsApp, nossa API disponibiliza métodos compativeis com a versão WEB.

:::
