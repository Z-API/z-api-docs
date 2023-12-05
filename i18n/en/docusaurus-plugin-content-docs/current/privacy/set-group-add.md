---
id: set-group-add-permission
title: Group Addition Permission
---

## Method

#### /privacy/group-add

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/group-add

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to configure who can add you to groups.

---

## Attributes

### Required

| Attributes         |  Type   | Description                                   |
| :------ | :-----: | :-------------------------------------------------------- |
| type    | string  | Permission scope (ALL, CONTACTS, CONTACT_BLACKLIST) |

String (type)

Permission scope. Accepted values:
 - ALL (Everyone can add)
 - CONTACTS (Only my contacts)
 - CONTACT_BLACKLIST (Only my contacts, except...)

### Optional

| Attributes            |  Type         | Description                                    |
| :------------------- | :-----------: | :----------------------------------------------------- |
| contactsBlacklist    | array object  | Contacts to be added or removed from the blacklist. Should be sent when "type" is "CONTACT_BLACKLIST" |

Array Object (contactsBlacklist)

| Attributes |  Type   | Description                                            |
| :-------- | :-----: | :----------------------------------------------------------------------------------- |
| action    | string  | Action to be taken for the contact; add or remove from the blacklist (add, remove) |
| phone     | string  | Contact's phone number                                |


## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/privacy/group-add

**Example**

```json
{
    "type": "ALL"
}
```

```json
{
    "type": "CONTACT_BLACKLIST",
    "contactsBlacklist": [
        { "action": "add", "phone": "554411111111" },
        { "action": "remove", "phone": "554422222222" }
    ]
}
```

:::important Important
It is essential to highlight that the blacklist (list of disallowed contacts) is different for each privacy configuration, meaning that the blacklist for "last seen" is not the same as that for "profile photo," and so on for all configurations that accept the blacklist.
:::

:::tip Tip
You do **not** need to resend the "contactsBlacklist" attribute with contacts already added. This parameter is only for **changes in the blacklist**.
:::

---

## Response

### 200

| Attributes | Type    | Description                            |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true if successful, false in case of failure |

Example

```json
{
    "success": true
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-group-add.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
