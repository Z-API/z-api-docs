---
id: introduction
title: Introduction
---

## Queue 

Z-API provides its users with a queuing system that works only for messages sent through our API. This queue plays an important role in our architecture, which is to organize and order messages until they are delivered to WhatsApp. This feature is also very useful for those situations where the cell phone connected to the Z-API goes through some instability or has no internet connection. If this occurs, that is, if the cell phone is offline for a period, as soon as you reconnect the messages will be sent to the recipient normally.

:::tip Sending time 

Our queue works with sending time alternating between one message and another in order to simulate human behavior, this interval is in a random default range between 1~3 seconds per message

If you want to increase the delay of messages, you can pass the delayMessage attribute in the body of the request. To find out how look at [Send-message](../message/send-message-text#opcionais)


:::

## Recommendation 

We recommend that before connecting you always check if there are any pending messages sent in the queue, if you do notify your user and ask him to decide whether or not to send these messages that are in the queue. Imagine that maybe the messages in the queue may no longer make sense to be sent, so it is important to notify the user and give him this decision.

Whenever you connect to Z-API it will automatically execute the queue and fire off any messages that are pending, so be very careful! 

You can delete a queue via API or better yet through the Z-API admin panel.

:::tip Limit queue 

Z-API allows up to 1000 messages for a disconnected cell phone in its queue before it starts rejecting new messages to the queue.

:::
