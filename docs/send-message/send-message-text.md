---
id: send-message-text
title: Enviar texto simples
---

## Método

#### /send-text

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

## Conceituação

Neste método você poderá enviar textos simples mas, você pode incrementá-los utilizando a formatação de texto e emojis, por exemplo. Caso você ainda não saiba como fazer isso, clique nos links abaixo e siga as instruções:

- Como [formatar fontes] no Whatsapp

- Onde [copiar emojis]

[formatar textos no whatsapp]: https://faq.whatsapp.com/general/chats/how-to-format-your-messages/?lang=pt_br
[copiar emojis]: https://fsymbols.com/pt/emoji/

:::tip Sobre emojis

O que você precisa saber é que ele é um caractere ASCII normal, então você poderá criar sua própria galeria de emojis.

Para fazer o teste basta copiar um emoji e colar em seu texto! Você pode utilizar este aqui 🤪 se quiser.

:::

---

## Atributos

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto a ser enviado |

---

## Code

---

## Atributos
