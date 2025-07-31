---
id: device
title: Cell phone data
---

## Method

#### /device

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/device

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for returning the information about the device/cell phone connected 

---

## Attributes 

```json
{
  "phone": "",
  "imgUrl": "",
  "about": "Olá! Eu estou usando o WhatsApp.",
  "name": "",
  "device": {
      "sessionName": "Z-API",
      "device_model": "Z-API"
  },
  "originalDevice": "iphone", "smbi", "android", "smba", 
  "sessionId": 175,
  "isBusiness": false
}
```

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/device.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
