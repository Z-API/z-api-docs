---
id: lid
title: Lid
---

## Introduction

The `@lid` (Linked ID) is a _unique and private identifier_ created by WhatsApp to represent contacts without directly exposing the phone number.
This change is part of WhatsApp's _privacy updates_, allowing users to hide their number in certain contexts.

In some cases, WhatsApp is sending the `@lid` as the user's primary identification, even if they have not enabled any option to hide their number.

---

### Difference between `@lid` and `phone`

WhatsApp can return contact identifiers in different ways, depending on the type of conversation, group, or privacy settings:

* `phone`: Can contain the actual number (`"554499999999"`) or the `@lid` itself (`"999999999999999@lid"`).

* `chatLid`: Is the most stable unique identifier, but may come as `null`.

When `chatLid` is `null`, the `phone` field may contain the `@lid` instead of the number.

The return behavior is defined exclusively by WhatsApp and may change at any time.

---

### Webhook Example

In Z-API webhooks, WhatsApp can return the contact identifier in different ways, depending on the type of interaction and the user's privacy settings.

#### Example – Complete return with number and `@lid`:

```json
{
  "chatLid": "999999999999999@lid",
  "phone": "554499999999"
}
```

#### Example – Return with `@lid` only:

```json
{
  "chatLid": null,
  "phone": "65998849469@lid"
}
```

In some cases, `"chatLid"` may come as `null`, and the `"phone"` field may contain the `@lid` itself.
This variation occurs because sometimes Z-API does not have the phone number of the message sender, as only the `@lid` is provided by WhatsApp.

---

### Sending messages using `@lid`

It is possible to _send messages directly to an `@lid`_, replacing the phone number in the request body:

```json
{
  "phone": "999999999999999@lid",
  "message": "Hello! This message was sent using the @lid identifier."
}
```

Sending works normally, as `@lid` _is already supported_ by the Z-API in most endpoints.

---

### Implementation Best Practices

* Prioritize the use of `@lid` to identify contacts — this attribute tends to be the most stable.

* Avoid relying solely on `phone`, as it may contain the number or the `@lid` itself.

* Store and relate the `@lid` in your database to maintain consistency.

---

### Converting `@lid` to Number

It is not possible to convert an `@lid` to a phone number (`phone`).
This limitation exists _for privacy reasons defined by WhatsApp_.
Allowing this conversion would invalidate the purpose of the number hiding feature.

Direct mapping between `@lid` and `phone` _is not provided by WhatsApp or Z-API_.

---

### Converting Number (`phone`) to `@lid`

On the other hand, it is possible to obtain the `@lid` corresponding to a phone number using the ["Is WhatsApp Number?"](https://developer.z-api.io/contacts/get-iswhatsapp) method.

This endpoint allows you to check if a number has a WhatsApp account and, when applicable, also returns the `@lid` identifier associated with that number.

---

### Important

* This change is _native to WhatsApp_, and Z-API only forwards the information as received.

* The return behavior (`@lid` or `phone`) may vary.

* The `chatLid` attribute is already implemented in Z-API webhooks and can be used both to identify and send messages normally.

* The `@lid` is a measure being implemented by WhatsApp itself; changes are being applied gradually and it is not yet fully implemented, so behavior may be inconsistent.