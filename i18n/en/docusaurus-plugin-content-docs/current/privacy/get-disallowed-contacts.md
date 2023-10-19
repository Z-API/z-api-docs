---
id: get-disallowed-contacts
title: List Disallowed Contacts
---

## Method

#### /privacy/disallowed-contacts

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/disallowed-contacts?type=BLOCK_SCOPE

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to list the contacts that are on the disallowed list (blacklist) for certain interactions with your account.

---

## Attributes

### Required

| Attributes   |  Type   | Description                               |
| :---------- | :-----: | :------------------------------------------ |
| type        | string  | Block scope (lastSeen, photo, description, groupAdd) |

String (type)

Block scope. Accepted values:
 - lastSeen (Last Seen)
 - photo (View profile photo)
 - description (View status message)
 - groupAdd (Group join permission)

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/disallowed-contacts?type=lastSeen

---

## Response

### 200

| Attributes          | Type          | Description                            |
| :---------------   | :------------ | :--------------------------------------- |
| disallowedContacts | array string  | Phone number of each contact in the blacklist |

Example

```json
{
    "disallowedContacts": [
        "554411111111",
        "554422222222"
    ]
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/disallowed-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
