---
id: introducao
sidebar_position: 1
title: Cellphone
---
# <Icon name="Smartphone" size="lg" /> Mobile

Use the Z-API API to register and manage mobile numbers on WhatsApp. Verify availability, confirm numbers, and configure additional security with email and a PIN code.

:::tip Registration of Numbers
The Mobile API allows you to programmatically register new numbers on WhatsApp, automating the entire verification and configuration process!
:::

---

## <Icon name="Info" size="md" /> Overview

The Mobile section provides functionalities for registering and managing mobile phone numbers on WhatsApp. Use these operations to verify if a number is available, confirm numbers through SMS codes, and set up account recovery methods.

---

## <Icon name="ListChecks" size="md" /> Main Operations

Manage mobile numbers with these operations:

- <Icon name="CircleCheck" size="xs" /> [Check Availability](/docs/mobile/verificar-disponibilidade)
- <Icon name="MessageSquare" size="xs" /> [Request Code](/docs/mobile/solicitar-codigo)
- <Icon name="KeyRound" size="xs" /> [Confirm Code](/docs/mobile/confirmar-codigo)
- <Icon name="MailPlus" size="xs" /> [Register Email](/docs/mobile/cadastrar-email)
- <Icon name="Lock" size="xs" /> [Register PIN Code](/docs/mobile/cadastrar-codigo-pin)

## <Icon name="ListTree" size="md" /> Registration Flow

Follow these steps to register a new number:

1. <Icon name="CircleCheck" size="xs" /> **Check Availability** - Confirm that the number is available on WhatsApp
2. <Icon name="MessageSquare" size="xs" /> **Request Code** - Request a confirmation code via SMS
3. <Icon name="Shield" size="xs" /> **Respond to CAPTCHA** (when required) - Send the returned CAPTCHA response
4. <Icon name="KeyRound" size="xs" /> **Confirm Code** - Enter the received code to validate the number
5. <Icon name="Settings" size="xs" /> **Set Security** (optional) - Register email and PIN code for recovery

:::info Canonical Flow
The recommended flow is exactly as described above. Follow the correct order to ensure successful registration!
:::

---

## <Icon name="RotateCcw" size="md" /> Account Recovery

If you lose access to your account, use these recovery options:

- <Icon name="Lock" size="sm" /> Use PIN code recovery if you set up a PIN
- <Icon name="MailPlus" size="sm" /> Use the registered email to recover access
- <Icon name="ShieldBan" size="sm" /> Request unbanning if your account was blocked

---

## <Icon name="AlertTriangle" size="md" /> Limitations and Requirements

- <Icon name="CircleCheck" size="sm" /> **Endpoint Availability**: according to official responses, the **Mobile API endpoints are 100% operational** in production.
- <Icon name="ListTree" size="sm" /> **Canonical Flow**: the recommended flow is exactly as described above (check availability → request code → respond to CAPTCHA, when present → confirm code). There are no alternative flows supported.
- <Icon name="Timer" size="sm" /> **Rate Limiting**: there are currently no additional specific limits for Mobile API beyond the platform's general policies.

:::warning Important
The endpoints described in `/security/*` under the official documentation are **security routes of the Z-API panel** and **do not belong to the Mobile API**. Use them only in the context of the panel, not as part of the number registration flow via Mobile API.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

- <Icon name="CircleCheck" size="sm" /> [Check Number Availability](/docs/mobile/verificar-disponibilidade)
- <Icon name="MessageSquare" size="sm" /> [Register New Number](/docs/mobile/solicitar-codigo)
- <Icon name="Lock" size="sm" /> [Set Security](/docs/mobile/cadastrar-codigo-pin)