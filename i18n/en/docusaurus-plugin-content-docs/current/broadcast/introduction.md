---
id: introduction
title: Introduction
---

:::warning the web application Limitation
Since this feature is **not available on the web application**, **Z-API currently does not support sending messages via broadcast lists**. This is a limitation imposed by the web application platform itself.
:::


## Transmission list 

As mentioned earlier, the application treats everything as a chat, and broadcast lists are no different. Just like groups, you can identify your broadcast lists using the **get /chats** method.

Broadcast lists have an identifier (ID/Phone) with the suffix -broadcast, for example: **1624901640-broadcast**.

Furthermore, unlike groups, interactions originating from broadcast lists occur individually. That is, when a recipient replies to a message sent via a broadcast list, this reply will be received as an individual conversation, allowing direct interaction with the contact.
