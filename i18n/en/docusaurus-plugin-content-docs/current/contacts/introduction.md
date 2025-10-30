---
id: introduction
title: Introduction
---

### Concept 

In this topic you will understand a little more about what the Z-API can do when it comes to contacts. We have divided this approach into some topics listed below to better explain.

- For WhatsApp every contact is simply a chat, it might seem bold to say but that’s how they treat what we call contacts. It uses the number of your contact only as an identifier for the chat as mentioned in other topics. So what is the difference between get-chats and get-contacts? Get-chats will bring every contact with which you have maintained a conversation with or have an open chat with. Get-chats will return all of the contacts that have accounts on WhatsApp plus the contacts that are participating in the same groups as your number.

- Everything the Z-API can do regarding contacts is the same as what WhatsApp Web can do, that is, almost nothing, it is not possible to add a contact, not even rename it or even delete. Basically, what you need to understand is that WhatsApp Web cannot manipulate your phone's address book, so neither can the **Z-API**.


:::caution About contacts

The method that returns contacts can make you a little confused because it should probably return a larger number of contacts than the amount you have in your contacts list, this is because you probably participate in groups, the get-contacts method will return all contacts that are in the groups you join.

:::
