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
This documentation was updated on May 10, 2023, so the facts about button functionality are based on the reality of that day. It's important to remember that with each WhatsApp update, button behavior may undergo changes.
:::

## Decisive factors:

#### For the operation of buttons on WhatsApp, there are two decisive factors:

- Whether the WhatsApp sending the message is business or regular.
- Whether the message is being sent to an individual chat or a group.

## Types of buttons

#### There are four types of buttons on WhatsApp:

- Simple text button (/send-button-list)
- Simple image button (/send-button-list-image)
- List of options (/send-option-list)
- Action buttons (/send-button-actions)

---

## Comportamento dos botões:

### [Simple text button:](https://developer.z-api.io/message/send-button-list)

- Sending from Normal WhatsApp to Group: **SUBJECT TO ISSUES**
- Sending from Normal WhatsApp to Individual Chat: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Individual Chat: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Group: **SUBJECT TO ISSUES**

### [Simple image button:](https://developer.z-api.io/message/send-button-list-image)

- Sending from Normal WhatsApp to Individual Chat: **SUBJECT TO ISSUES**
- Sending from Normal WhatsApp to Group: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Individual Chat: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Group: **SUBJECT TO ISSUES**

### [List of options:](https://developer.z-api.io/message/send-option-list)

- Sending from Normal WhatsApp to Individual Chat: **FUNCIONA**
- Sending from Normal WhatsApp to Group: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Individual Chat: **FUNCIONA**
- Sending from WhatsApp Business to Group: **SUBJECT TO ISSUES**

### [Action buttons:](https://developer.z-api.io/message/send-option-list)

- Sending from Normal WhatsApp to Individual Chat: **SUBJECT TO ISSUES**
- Sending from Normal WhatsApp to Group: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Individual Chat: **SUBJECT TO ISSUES**
- Sending from WhatsApp Business to Group: **SUBJECT TO ISSUES**

## Resume

In summary, the use of simple buttons with image and text resources on WhatsApp is subject to issues. Both for regular WhatsApp and WhatsApp Business, there are difficulties in sending these types of buttons in normal chats and groups. List of options for individual chats work. If you are using WhatsApp Business, the only thing that is working is the list of options for individual chats, with issues in groups..
