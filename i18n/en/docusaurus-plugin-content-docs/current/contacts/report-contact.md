---
id: report-contact
title: Report Contact
---

## Method

#### /contacts/{{phone}}/report

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/{{phone}}/report

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for reporting a contact.

---

## Attributes

### Required

| Attribute | Type   | Description                                    |
| :-------- | :----: | :------------------------------------------- |
| phone     | string | Phone number you want to report               |

---

## Request Params

#### Example URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/5544999999999/report

---

## Response

### 200

| Attribute | Type    | Description                                     |
| :-------- | :------ | :-------------------------------------------- |
| success   | boolean | Action confirmation attribute (true, false)    |
| error     | string  | Error message, if any                          |

Example

```json
{
  "success": true
}
```

### 400

```json
{
	"error": "Invalid phone"
}
```

### 405

In this case, make sure you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request for the object you are sending, most commonly "application/json."

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/report-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
