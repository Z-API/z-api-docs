---
id: send-video-status  
title: Sending video Status  
---

## Method

#### /send-video-status

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-video-status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for sending a video to your status. Remember that statuses disappear after 24 hours.

:::caution
The maximum size for videos in status is 10MB.
:::

---

## Attributes

### Required

| Attributes |  Type  | Description                    |
| :--------- | :----: | :----------------------------- |
| video      | String | Video link or its Base64       |

### Optional

| Attributes | Type   | Description                                |
| :--------- | :----: | :------------------------------------------ |
| caption    | string | Caption that will be sent along with the video in the status |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-video-status

#### Body

```json
{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
}

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
  "caption": "caption text"
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :--------- | :----- | :--------------- |
| zaapId     | string | ID in z-api      |
| messageId  | string | ID in WhatsApp   |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case, ensure that you are correctly following the method specification, i.e., check if you are sending a POST or GET request as specified at the beginning of this topic.

### 415

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-video-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
