---
id: get-contacts
title: Get contacts
---

## Method

#### /contacts

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts

---

## Concept

This method is responsible for returning all of your Whatsapp contacts. Remember what was said in the introduction about contact numbers. In case you skipped this part, I suggest that you take a step back and read our introduction.

---

## Attributes

### Mandatory

| Attributes | Type | Description |
| :-- | :-: | :-- |
| page | integer | Used for pagination you have to inform here the contact page you want to search |
| pageSize | integer | Specifies the size of the contact return per page |

### Optionals

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts?page=1&pageSize=20

---

## Response

### 200

| Attributes | Type | Description |
| :-- | :-- | :-- |
| phone | string | Contacts phone |
| name | string | **First and last name** of the contact, it will only return filled in if you have the number in your contacts |
| short | string | Contact **name**, it will only return filled in if you have the number in your contacts |
| vname | string | Contact name if you have him as a contact |
| notify | string | Name entered in Whatsapp name settings |

Example 

```json
[
  {
    "name": "First contact's name and last name",
    "short": "First contact's name",
    "notify": "Name on Whatsapp",
    "vname": "Name on vcard",
    "phone": "559999999999"
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
