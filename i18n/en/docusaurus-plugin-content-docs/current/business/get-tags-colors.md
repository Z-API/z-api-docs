---
id: tags-colors
title: Tags colors
---

## Method

#### /business/tags/colors

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/tags/colors

### Header

|     Key      |                         Value                          |
| :----------: | :----------------------------------------------------: |
| Client-Token | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method allows you to list available tags colors.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

## Response

### 200

| Attributes      | Type   | Description          |
| :-------------- | :----- | :------------------- |
| {{COLOR_INDEX}} | string | Hexadecimal of color |

Example

```json
{
  "0": "#FF9485",
  "1": "#64C4FF",
  "2": "#FFD429"
}
```

:::tip Tip
Colors may vary between different platforms (Android/iPhone).
:::

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-tags-colors.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
