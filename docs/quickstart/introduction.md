---
id: introduction
title: Introdução
slug: /
---

## Z-API - Asas para sua imaginação!

**Z-API** foi desenvolvido por **programadores para programadores**, por isso prezamos pela simplicidade e objetividade de tudo que nos propomos a fazer, sendo assim chega de conversa fiada e ** Let's Bora !**

---

## Mas o que é Z-API?

Você provavelmente já deve saber, mas vamos reafirmar!

**Z-API** é um serviço RestFul que provê uma API que permite que você interaja com seu Whatsapp através uma API simples e intuitiva, além de webhooks para te avisar sobre interações com seu número.

:::important Importante

O Z-API utiliza o mesmo canal de comunicação utilizado pelo whatsapp web para disponibilizar as APIs. Caso você utilize a versão comum do Whatsapp, **NÃO** será possível você utilizar o whasapp web junto com Z-API.

Recentemente o Whatsapp lançou a funcionalidade de múltiplos dispositivos, isso **permite** que você conecte até **4** dispositivos no seu Whatsapp. Caso essa opção **esteja ativada** em seu celular, você poderá utilizar o whatsapp web juntamente com Z-API, sem a necessidade de manter o telefone conectado a internet a todo momento.

:::

---

## Quem pode utilizar Z-API?

Não temos restrições quanto a utilização, mas geralmente são 2 públicos bem distintos que utilizam nossos serviços. São eles:

- Programadores com conhecimentos em API's RestFul. Se você não é, mas conhece alguém com estas competências, já serve :)

- Utilizadores de soluções de terceiros que permitam integração com Z-API

---

## Tá bom! Mas o que dá para fazer com ele?

De forma bem direta, tudo que você faz com Whatsapp Web você poderá fazer utilizando nosso serviço. Para isso basta ler o QRcode do Z-API e utilizar nosso serviço!

---

## Tecnicamente, como funciona o fluxo de envio?

Para exemplificar, segue os passos de envio de uma mensagem de texto simples:

1. Você envia via API uma mensagem para o Z-API;

2. O Z-API adiciona em uma fila e te retorna o ID da mensagem;

3. Sua instância processa a fila enviando para o WhatsApp;

4. Seu Webhook de delivery é chamado quando sua mensagem for enviada;

5. Assim que o destinatário receber a mensagem, o Webhook de message-status é chamado informando RECEIVED e

6. Por fim quando o destinatário ler a mensagem o messages-status é chamado informando READ

---

## Limites

Iniciei por este tópico porque é bem comum as pessoas perguntarem sobre quais os limites de envios com Z-API. Nós **NÃO TEMOS LIMITE** para número de mensagens enviadas! Mas é importante você entender que esta utilizando uma sessão do Whatsapp Web, então o padrão de utilização precisa ser compatível, além disso sempre recomendamos que você leia atentamente as políticas estabelecidas pelo proprio Whatsapp em sua pagina oficial https://www.whatsapp.com/legal.

---

:::note **NÃO ARMAZENAMOS MENSAGENS !**

Todas as mensagens enviadas para nossa API serão encaminhadas para uma fila de mensageria e após o envio as mesmas são apagadas.

:::

:::important Lembre-se

O Facebook tem comportamentos diferentes para cada uma das versões do Whatsapp, nossa API disponibiliza métodos compativeis com a versão WEB.

:::

:::caution Ponto de Atenção

Muito cuidado! Não se esqueça que uma vez conectado seu número ao nosso serviço você não conseguirá mais utilizar o mesmo número no Whatsapp Web. Esta limitação é temporária, tendo em vista que o Whatsapp já está divulgando uma nova funcionalidade que permitirá mais de um Whatsapp Web conectados simultaneamente.
