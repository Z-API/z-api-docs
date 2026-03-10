---
id: bloqueios-e-banimentos
sidebar_position: 1
title: Blocks and Bans
---
# <Icon name="ShieldAlert" size="lg" /> Locks and Bans

A complete guide on best practices to avoid locks and bans in WhatsApp.

---

:::caution Is there any possibility of WhatsApp blocking my number?

**YES, THE POSSIBILITY EXISTS AND IT IS REAL.**

:::

---

## Introduction

### Best Practices!

We created this topic to share a bit of everything we've learned about best practices to avoid troubles with blocks and bans in WhatsApp.

Let's start by reflecting with you: It is very likely that you receive several SMS daily with store advertisements, promotions, telecom operators, and so on. Now think, how many messages of this type do you receive via WhatsApp? Probably none or very few, right? Even so, if you receive one, WhatsApp allows you to mark it as spam and even block the contact.

## WHATSAPP DOES NOT ALLOW SPAM!

WhatsApp is very strict when it comes to sending spam, which is why we pay more attention to it than to SMS. Why do we let several SMS accumulate and not be able to look at our phone immediately upon receiving a WhatsApp? Because we know that we receive a WhatsApp from a known contact and rarely receive promotions via the same.

---

## How many messages can I send?

Quantity is important, but it's not just about the number of messages sent; the **TO WHOM** factor often is the key point.

In our conversations, we always use the case of one of our oldest clients, who today sends promotional messages to over 80,000 people daily via WhatsApp and has never had their number blocked. When we contacted them and asked how they achieved this feat, they kindly shared the following technique:

1. **Do chip maturation**: This means using the phone number on WhatsApp in a normal way before starting to send many messages through the Z-API.
2. **Interact via mobile or WhatsApp Web before connecting to the Z-API**: This helps show WhatsApp that you are a real user and not a bot.
3. **Have a text that prompts the user to respond to the messages**: This helps show WhatsApp that you are having real conversations with people.
4. **Offer an option for the user not to receive more messages if they don't want to**: This is important to respect users' privacy and avoid complaints.
5. **Fill in the profile data on WhatsApp**: This helps show WhatsApp that you are a legitimate user.
6. **Read the QR code after 24 hours of registering on WhatsApp**: This helps confirm that you are a real user.

### Sending Method:

- **First**: The recipient must add the company's number to their contacts and send a message saying "I want promotions." This simple action significantly reduces the risk of being blocked, as with your number in the address book and starting the conversation, the block and spam report buttons do not appear;

- **Second**: He personalizes the messages with data from the recipient, so that all messages are not exactly the same;

- **Third**: Always give an option for the recipient to stop receiving messages. Example: "Type 2 to no longer receive these messages," with this he monitors the webhooks to remove numbers that do not want to receive from the sending list.

---

## Summary

- Avoid sending messages to those who don't have your number in their contacts;

- Personalize messages with recipient information. If not possible, use random attributes to differentiate each message;

- Try to convince the recipient to interact with your number, especially if you know they do not have your number in their address book;

- Offer an option for the recipient not to receive more messages and monitor webhooks to handle these interactions.

:::warning Caution

If 3% of recipients mark your message as spam, your number will be banned!

:::

---

## Next Steps

- [Locks and Bans (2025)](/docs/tips/bloqueios-e-banimentos-2025) - Updated version with new insights
- [Stability with Z-API](/docs/tips/estabilidade) - Tips to maintain a stable connection