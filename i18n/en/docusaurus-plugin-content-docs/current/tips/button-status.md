---
id: button-status
title: Button status
---

## Introduction

In recent weeks, messages containing buttons have been experiencing instability in their operation.

**It's important to remember that this is not an issue exclusive to Z-API..**

This topic describes the behavior of buttons on WhatsApp in different scenarios.

---

:::danger Attention
This documentation was updated on August 27, 2024, so the facts about button functionality are based on the reality of that day. It's important to remember that with each WhatsApp update, button behavior may undergo changes.
:::

## Decisive factors:

#### For the operation of buttons on WhatsApp, there are two decisive factors:

- Whether the WhatsApp sending the message is business or regular.
- Whether the message is being sent to an individual chat or a group.
- Accept the terms of use of the buttons

## Accept the terms of use of the buttons

To use the button functionality, you must accept the terms of use, acknowledging that you are aware that future WhatsApp updates may cause instabilities in this functionality.

![img](../../../../../img/buttons-terms.jpeg)

## Types of buttons

#### There are four types of buttons on WhatsApp:

- Simple text button (/send-button-list)
- Simple image button (/send-button-list-image)
- Simple video button (/send-button-list-video)
- List of options (/send-option-list)
- Action buttons (/send-button-actions)
- Button OTP (/send-button-otp)

---

## Comportamento dos botões:

### [Simple text button:](https://developer.z-api.io/message/send-button-list)

- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

### [Simple image button:](https://developer.z-api.io/message/send-button-list-image)

- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

### [Simple video button:](https://developer.z-api.io/message/send-button-list-video)

- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

### [List of options:](https://developer.z-api.io/message/send-option-list)

- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

### [Action buttons:](https://developer.z-api.io/message/send-option-list)

- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

### [Buttons OTP:](https://developer.z-api.io/message/send-button-otp)

- Sending from Normal WhatsApp to Individual Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from WhatsApp Business to Individual Chat: **WORKS**
- Sending from WhatsApp Business to Group: **WORKS**

## Resume

In summary, the use of buttons on WhatsApp is subject to issues. Both for regular WhatsApp and WhatsApp Business, there are difficulties in sending these types of buttons in normal chats and groups. List of options for individual chats work. If you are using WhatsApp Business, the only thing that is working is the list of options for individual chats, with issues in groups..
