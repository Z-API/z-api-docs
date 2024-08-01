---
id: edit-tag
title: Edit tag
---

## Method

#### /business/edit-tag/{{TAG_ID}}

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{TAG_ID}}

### Header

|     Key      |                         Value                          |
| :----------: | :----------------------------------------------------: |
| Client-Token | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method allows you to edit a tag.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

## Attributes

### Required

| Attributes |  Type  | Description  |
| :--------- | :----: | :----------- |
| name       | string | New tag name |

### Optional

| Attributes | Type | Description |
| :-- | :-- | :-- |
| color | number | Key (index) of the new desired color. This value must be set according to the available colors, which can be found **[in this API](./get-tags-colors.md)** |

## Request Params

#### URL example

Method

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{TAG_ID}}

## Request Body

```json
{
  "name": "Tag Name"
}

{
  "name": "Tag Name",
  "color": 2
}
```

## Response

### 200

| Attributes | Type    | Description                         |
| :--------- | :------ | :---------------------------------- |
| success    | boolean | true if successful, false otherwise |

Example

```json
{
  "success": true
}
```

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-tag.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
