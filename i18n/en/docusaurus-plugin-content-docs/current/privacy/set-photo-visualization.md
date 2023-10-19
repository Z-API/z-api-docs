---
id: set-photo-visualization
title: Profile Photo Visibility
---

## Method

#### /privacy/photo

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/photo

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, you can configure who can see your profile photo.

---

## Attributes

### Required

| Attributes            |  Type   | Description                                                     |
| :------------------- | :-----: | :-------------------------------------------------------------- |
| visualizationType    | string  | Visibility scope (ALL, NONE, CONTACTS, CONTACT_BLACKLIST) |

String (visualizationType)

Visibility scope. Accepted values:
 - ALL (Everyone can see)
 - NONE (No one can see)
 - CONTACTS (Only my contacts)
 - CONTACT_BLACKLIST (Only my contacts, except...)

### Optional

| Attributes            |  Type         | Description                                              |
| :------------------- | :-----------: | :----------------------------------------------------- |
| contactsBlacklist    | array object  | Contacts to be added or removed from the blacklist. Must be sent when "visualizationType" is "CONTACT_BLACKLIST" |

Array Object (contactsBlacklist)

| Attributes |  Type   | Description                                                                            |
| :-------- | :-----: | :----------------------------------------------------------------------------------- |
| action    | string  | Action to be taken for the contact; add or remove from the blacklist (add, remove) |
| phone     | string  | Contact's phone number                                                                |


## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/privacy/photo

**Example**

```json
{
    "visualizationType": "ALL"
}
```

```json
{
    "visualizationType": "CONTACT_BLACKLIST",
    "contactsBlacklist": [
        { "action": "add", "phone": "554411111111" },
        { "action": "remove", "phone": "554422222222" }
    ]
}
```

:::important Important
It is important to note that the blacklist (list of disallowed contacts) is different for each privacy setting. In other words, the blacklist for "last seen" is not the same as the one for the "profile photo," and so on for all settings that accept the blacklist.
:::

:::tip Tip
It is **not necessary** to resend the "contactsBlacklist" attribute with already added contacts. This parameter is only for **changes to the blacklist**.
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-photo.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
