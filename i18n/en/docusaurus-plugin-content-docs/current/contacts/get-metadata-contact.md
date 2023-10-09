---
id: get-metadata-contact
title: Get contact metadata
---

## Método

#### /contacts/{phone}

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/{phone}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept
This method is responsible for returning all of you contact’s metadata 

:::tip Tip about contact's image 


If you intend to store your contact's image, please note that we always return in get-contacts the attribute with imgUrl with it for you, but it is important to remember that it is only available for 48 hours. After this period the image link is deleted by Whatsapp itself . We suggest that if you need to update your contact's image, you use the next method in this documentation, **get-profile-picture**.

:::

---

## Attributes

### Required 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Telephone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask  |

### Optionals

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/5511999999999

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
| imgUrl | string | Contact photo URL **Whatsapp deletes after 48h** |

Example 

```json
{
  "name": "Contact's first and last name",
  "phone": "551199999999",
  "notify": "Contact's name on Whatsapp",
  "short": "Contact's name",
  "imgUrl": "Contact's photo URL  "
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.
### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-metadata-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
