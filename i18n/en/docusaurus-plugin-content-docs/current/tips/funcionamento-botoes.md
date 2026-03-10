---
id: funcionamento-botoes
sidebar_position: 3
title: Button Operation
---
# <Icon name="MousePointerClick" size="lg" /> Button Operation

Guide on the current behavior of buttons in WhatsApp and factors that influence their operation.

---

## Introduction

In recent weeks, messages containing buttons have been experiencing instability in their functionality.

**It is important to remember that this is not a problem exclusive to Z-API.**

This topic describes how button behavior is currently handled in different scenarios in WhatsApp.

---

:::danger Attention

This documentation was updated on 27/08/2024 so the facts about button operation are based on reality as of this date. It is important to remember that with each WhatsApp update, buttons may undergo changes.

:::

---

## Decisive Factors

For button functionality in WhatsApp, there are two decisive factors:

- Whether the WhatsApp sending the message is business or normal
- Whether the message is being sent to a regular chat or a group
- Acceptance of the button terms of use

---

## Acceptance of Button Terms of Use

To utilize the button functionality, you must accept the terms of use, recognizing that future WhatsApp updates may cause instabilities in this functionality.

![Button Terms of Use](/img/buttons-terms.jpeg)

---

## Types of Buttons

There are seven types of buttons in WhatsApp:

- Simple text button ([`/send-button-list`](/docs/messages/botoes))
- Simple image button ([`/send-button-list-image`](/docs/messages/botoes-image))
- Simple video button ([`/send-button-list-video`](/docs/messages/botoes-video))
- Options list ([`/send-option-list`](/docs/messages/lista-opcoes))
- Action buttons ([`/send-button-actions`](/docs/messages/texto-botoes-acao))
- Copy button ([`/send-button-otp`](/docs/messages/botao-otp))
- Pix button ([`/send-button-pix`](/docs/messages/botao-pix))

---

## Button Behavior

### Simple Text Button

- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Simple Image Button

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Simple Video Button

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Options List

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Action Buttons

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Copy Button (OTP)

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

### Pix Button

- Sending from Normal WhatsApp to Regular Chat: **WORKS**
- Sending from Normal WhatsApp to Group: **WORKS**
- Sending from Business WhatsApp to Regular Chat: **WORKS**
- Sending from Business WhatsApp to Group: **WORKS**

---

## Summary

In summary, the use of button features in WhatsApp is subject to problems. Whether it is normal WhatsApp or business WhatsApp, there are difficulties in sending these types of buttons in regular chats and groups. Options lists for regular chats work. If you are using business WhatsApp, the only thing that works is options lists for regular chats, with issues for groups.

---

## Next Steps

- [Buttons](/docs/messages/botoes) - Complete button documentation
- [OTP Button](/docs/messages/botao-otp) - Button for copying codes
- [Pix Button](/docs/messages/botao-pix) - Button for Pix payments