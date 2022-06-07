---
id: device
title: Cell phone data
---

## Method

#### /Status

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/device

---

## Concept

This method is responsible for returning the information about the device/cell phone connected 

---

## Attributes 

```json
{
  "phone": "",
  "imgUrl": null,
  "device": {
    "wa_version": "2.21.10.16",
    "mcc": "724",
    "mnc": "039",
    "os_version": "7.1.2",
    "device_manufacturer": "samsung",
    "device_model": "SM-N975F",
    "osbuildnumber": "samsung-user 7.1.2 20171130.276299 release-keys",
    "platform": "smba"
  }
}
```

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/device.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
