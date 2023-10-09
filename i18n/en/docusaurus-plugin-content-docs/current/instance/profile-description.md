---
id: profile-description
title: Update profile description
---

## Method

#### /profile-description

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/profile-description

---

## Concept

This method is responsible for changing your profile description on WhatsApp.

---

## Attributes

### Required

| Attributes  |  Type  | Description              |
| :--------- | :----: | :--------------------- |
|   value    | string |   Profile description  |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |

---

## Request Body

#### Body

```json
{
  "value": "Profile description"
}
```

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, false in case of failure |

Example

```json
{
  "value": true
}
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

---
