---
id: introduction
title: Introduction
---

### Concept

Firstly you need to understand about the messages and how they can be sent to a contact, a group or a transmission list. 

In the topic “contacts” we will talk about this again however, it is also important for you to know that for WhatsApp everything is a chat whether it is a contact, group or transmission list.

To send any type of message you need a chat ID, the ids being:

- For contacts it is your own number.
- For groups it is the concatenation of the group founder with a timestamp.
- For transmission lists it is the concatenation of the string “broadcast” with the timestamp.

These IDs are all returned by the method get/chats which you will learn about a little further ahead. 

Talking about IDs, we strongly recommend that you store in your application the messageID that our response will return as shown in the image below. If the need arises to responde, mark or even delete a message you will need to inform your messageID as an attribute in the method.

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68" // Save this ID
}
```

:::tip Tip

If you need to format your texts, you can do so by sending formatting texts to make your messages more elegant.

:::
