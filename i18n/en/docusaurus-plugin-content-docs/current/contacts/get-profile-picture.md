---
id: get-profile-picture
title: Get contact profile picture 
---

## Method 

#### /profile-picture

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/profile-picture

---

## Concept

This method is responsible for returning a url with your contacts picture updated.

As already stated in the previous topic please **Remember**    

If you intend to store your contact's image, please note that we always return in get-contacts the attribute with imgUrl with it for you, but it is important to remember that it is only available for 48 hours, after this period the image link is deleted by Whatsapp itself . We suggest that if you need to update your contact's image, you use the next method in this documentation, **get-profile-picture**.


---

## Attributes

### Mandatory 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | telephone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask  |

### Opcionais

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/profile-picture?phone=551199999999

---

## Response

### 200

| Attributes | Type   | Description                 |
| :-------- | :----- | :------------------------ |
| link      | string | Url with the contact’s picture|

Example 

```json
[
  {
    "link": "Url with the contact’s picture"
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-profile-picture.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
