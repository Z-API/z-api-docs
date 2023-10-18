---
id: company-websites
title: Change Company Websites
---

## Method

#### /business/company-websites

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-websites

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to change the websites of the company.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

---

## Attributes

### Optional

| Attributes  |  Type     | Description         |
| :---------- | :-----:   | :------------------- |
| websites    | string[]  | Company's websites  |

## Request Body

```json
{
  "websites": ["https://example.com", "https://example2.org"]
}
```

:::warning
The company can have only 2 (two) registered websites. Sending more than two items in the request will result in an error.
:::

:::important URL Format
The format of the website URLs must be valid. Sending an invalid URL will result in an error. Guide for URL format: [URL Structure Guide](https://developers.google.com/search/docs/crawling-indexing/url-structure)
:::

:::tip Tip
To remove the websites, simply send the "websites" attribute as empty.
:::

---

## Response

### 201

| Attributes | Type    | Description                                  |
| :-------- | :------ | :------------------------------------------- |
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-websites.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
