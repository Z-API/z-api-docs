---
id: status
title: Instance status
---

## Method

#### /Status

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/status

---

## Concept

This method is responsible for giving you information about the health of your instance on Z-API. For good quality sending and receiving it is necessary to take the following precautions:

- Configure your webhooks on Z-API to receive notifications about changes on the status of your instance. 

- Disable battery optimization of the cell phone that is connected, even if it is just an emulator (example for android https://youtu.be/Z1baLLXyvTM).    

- Monitor the attributes of this method.

---

## Attributes 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| connected | boolean | Indicates if your number is connected to Z-API |
| error | string | nforms details if any of the attributes is not true.   - 'You are already connected.' - 'You need to restore the session.' - 'You are not connected.' |
| smartphoneConnected | boolean | Indicates if the phone is connected to the internet |

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/instance-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
