---
id: send-message-audio
title: Send audio 
---

## Method 

#### /send-audio

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-audio

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept 

Method responsible for sending audios to your chats, you can work with two types of audios which are: 

 - By link, where you have an audio hosted somewhere on the internet and it sends the audio’s link 

 - By Base64. If you have opted for this option you will need to have a method on your website to convert the audio to Base64.

### Sizes and formats

WhatsApp limits the sizes of files and its politics constantly changes and because of that we always recommend that you verify directly on WhatsApp’s website.

In this [link]  you can find everything that you need to know about formatting and file sizing.

[link]: https://developers.facebook.com/docs/whatsapp/api/media

![image](../../../../../img/send-audio-waveform.jpeg)

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask  |
| audio | string | audio’s link or its Base64 |

### Opcionais

| Attributes | Type | Description |
| :-- | :-: | :-- |
| messageId | String | Attribute used to answer a chat message. All you have to do is add the messageID of the message that you want to respond to this attribute |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs. |
| viewOnce | boolean | Defines wether it will be a view once message or not |
| async | boolean | If enabled, the request will immediately respond with success, and the file processing will be performed in the background. The sending process can be tracked through [delivery webhook](/webhooks/on-message-send). |
| waveform | boolean | Defines if the audio will be sent with waveform |

---

## Request Body

**Sending using URL**
```json
{
  "phone": "5511999999999",
  "audio": "https://tuningmania.com.br/autosom/mp3/75%20~%2079%20Hz.MP3",
  "viewOnce": false,
  "waveform": true
}
```

**Sending using Base64**
```json
{
  "phone": "5511999999999",
  "audio": "data:audio/mpeg;base64,SUQzAwAAAAAAbVRYWFgAAAAgAAAARW5jb2RlZCBieQBMQU1FIGluIEZMIFN0dWRpblZCBieQBMQU1yAyMFRYWFgAAAAbAAAAQlBN",
  "viewOnce": false,
  "waveform": true
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |

Exxample 

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link for webhooks response (upon receiving)

[Webhook](../webhooks/on-message-received#audio-feedback-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-audio.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
