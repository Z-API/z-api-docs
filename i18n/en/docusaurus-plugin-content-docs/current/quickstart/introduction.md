---
id: introduction
title: Introduction
slug: /
---

## Z-API - Wings for your imagination! 

**Z-API** was developed for **programmers by programmers**, this is why we value the simplicity and objectivity of everything we proposed to do. Enough small talk and **let's dive in!**

---

## What is Z-API?

You probably already know but let's go over it!


**Z-API** is a RestFul service that provides an API that allows you to interact with whatsapp through a simple and intuitive API as well as webhooks to alert you of interactions with your number.


:::important Important


Z-API utilizes the same channel of communication used by whatsapp web to make the APIs accessible . In case you use a common version of whatsapp, it **won't** be possible to make use of our Z-API with whatsapp web.

Recently, WhatsApp launched a functionality that **allows** you to use multiple devices, this allows you to connect up to **4** devices on the same number. In case this option **is enabled** on your device, you will be able to take advantage of our Z-API coupled with WhatsApp without having to keep your device connected to the internet at every moment.



:::

---

## Who can use Z-API?

While we don't have restrictions on how it is used, we normally have two very distinct groups that use our services. They are:


- Programmers that have knowledge and understanding of RestFul APIs. If that is not you, but you know someone with this knowledge, that will work as well :)

- Users who use third party solutions that allow Z-API integration.

---

## Enough! What are we able to do with it??

To be straight forward, everything that you are able to do with WhatsApp you will be able to do while using our service. To do this all you have to do is read the Z-API QRcode and get straight to it!

---

## Technically, how does the flow of delivery work? 

For an example, follow the steps of sending simple text:

1. You send a message via API straight to Z-API;

2. Z-API then adds you to a queue and returns a message ID;

3. Your instance will process your queue and send it to WhatsApp.

4. Your webhook of delivery is called when your message is sent 

5. As soon as the recipient receives the message, the webhook os message-status is called informing RECEIVED and..

6. Finally, when the recipient reads the message the message-status is called informing READ



---

## Limits

Start with this topic because it is very common for people to ask about what the limits of delivery are with Z-API. we **DON'T HAVE LIMITS** for number of messages sent! However, it is important that you understand you are using a WhatsApp web session. Therefore, the pattern of usage needs to be compatible. Furthermore, we always recommend that you intently read the politics established by Whatsapp web on their official website https://www.whatsapp.com/legal. 


---

:::note **WE DON'T STORE MESSAGES!**

All of the messages sent to our API will be forwarded to a queue of messages and after it has been sent they will be deleted.

:::

:::important Remember 

Facebook behaves differently with each version of WhatsApp web, our API makes available methods compatible with the WEB versions. 

:::

:::caution Point of attention 

Be cautious! Don't forget once you connect your number with our service you won't be able to use the same number on WhatsApp web. This limitation is only temporary, keeping in mind that WhatsApp is already unveiling a new functionality that will allow more than one instance connected simultaneously. 


