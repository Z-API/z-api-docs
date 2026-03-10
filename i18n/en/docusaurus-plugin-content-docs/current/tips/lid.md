---
id: lid
title: Lid
---
## Introduction

The `@lid` (Linked ID) is a _unique and private identifier_ created by WhatsApp to represent contacts without directly exposing the phone number.
This change is part of the _WhatsApp privacy updates_, allowing users to hide their number in certain contexts.

In some cases, WhatsApp may send the `@lid` as the primary user identifier even if they have not enabled any option to hide the number.

---

### Difference between `@lid` and `phone`

WhatsApp may return contact identifiers in different ways depending on the type of conversation, group or privacy settings:

* `phone`: May contain the real number (`"554499999999"`) or the very own `@lid` (`"999999999999999@lid"`).

* `chatLid`: Is the most stable unique identifier, but may come as `null`.

When `chatLid` is `null`, the field `phone` may contain the `@lid` instead of the number.

The return behavior is defined exclusively by WhatsApp and can change at any time.

---

### Example of Webhook

In Z-API webhooks, WhatsApp may return the contact identifier in different ways depending on the type of interaction and the user's privacy settings.

#### Example – Full Return with Number and `@lid`:

```json
{
  "chatLid": "999999999999999@lid",
  "phone": "554499999999"
}
```

#### Example – Return Only with the `@lid`:

```json
{
  "chatLid": null,
  "phone": "65998849469@lid"
}
```

In some cases, the `"chatLid"` may come as `null`, and the field `"phone"` may contain the very own `@lid`. 
This variation occurs because, sometimes, Z-API does not have the sender's phone number as only the `@lid` is provided by WhatsApp.

---

### Sending Messages Using the `@lid`

It is possible to _send messages directly to a `@lid`_, replacing the phone number in the request body_:

```json
{
  "phone": "999999999999999@lid",
  "message": "Olá! Essa mensagem foi enviada usando o identificador @lid."
}
```

The sending works normally as the `@lid` is _already supported_ by Z-API in most endpoints.

---

### Best Practices for Implementation

* Prioritize using `@lid` to identify contacts — this attribute tends to be the most stable.
* Avoid relying solely on `phone`, as it may contain the number or the very own `@lid`.
* Store and relate the `@lid` in your database to maintain consistency.

---

### Converting `@lid` to Number

It is not possible to convert a `@lid` into a phone number (`phone`). 
This limitation exists _for privacy reasons defined by WhatsApp_. 
Allowing such conversion would invalidate the purpose of the number hiding feature.

The direct mapping between `@lid` and `phone` _is not provided by WhatsApp or Z-API_.

---

### Converting Number (`phone`) to `@lid`

On the other hand, it is possible to obtain the corresponding `@lid` for a phone number using the [**Verify WhatsApp Number**](/docs/contacts/numero-whatsapp) endpoint.

This endpoint allows verifying if a number has a WhatsApp account and, when applicable, also returns the _identifier `@lid` associated with that number_.

---

### Important

* This change is _native to WhatsApp_, and Z-API only relays the information as received.
* The return behavior (`@lid` or `phone`) may vary.
* The attribute `chatLid` is already implemented in Z-API webhooks and can be used for both identification and normal message sending.
* The `@lid` is a measure being implemented by WhatsApp itself; the changes are being applied gradually, and it is not yet fully implemented, so the behavior may be inconsistent.