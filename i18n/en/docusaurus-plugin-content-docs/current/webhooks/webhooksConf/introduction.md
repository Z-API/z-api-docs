---
id: introduction
title: Introduction
---
## What is a Webhook and for What Purpose?

According to Google, a Webhook is a resource used on the internet to enable one application to communicate with another by providing real-time data whenever an event occurs. In this way, the two systems can exchange information without any external action needing to be performed.

So if you are integrating with the _Z-API_ and need to receive information via WhatsApp, it is necessary to provide these endpoints in your application so that we can notify you about everything that happens on your WhatsApp. That is, every time the connected number receives an interaction, we will make a POST request to the previously configured URL. (For each request, there is a specific JSON body)

The _Z-API_ offers within the settings of the instance in the admin panel the pointing of webhooks so it can notify you about interactions with your chats/contatos, updates on your messages, and changes in the state of your instance.

### Our Webhooks

#### Delivery

Responsible for notifying you that your message was delivered to WhatsApp, but this does not necessarily mean that your contact received it. For information about receipt and reading, you will need to observe the status webhook.

#### Receive

This webhook will be called every time someone interacts with your number on WhatsApp.

#### Status

This method will notify you of all status changes that your message has undergone, whether it was received, read, responded to, or deleted. In other words, a single message can go through several statuses and have the same status more than once, such as being responded to.

#### Disconnected

This webhook will be called whenever our service detects any unavailability in communication, whether from your phone with WhatsApp or even from the connection between your phone and the Z-API.

:::tip Tips

- Don't forget to read our tips section, where you can find some topics on how to improve your connection with _Z-API_ and have better quality in the service.
- You don't need to configure all webhooks, but the more control you have over your instance, the more you will be able to extract resources and develop businesses with _Z-API_.

:::