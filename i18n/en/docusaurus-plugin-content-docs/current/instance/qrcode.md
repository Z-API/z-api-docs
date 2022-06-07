---
id: qrcode
title: Get QRCode
---

## Method

#### /qr-code

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/qr-code

Getting QRCode - bytes

This method returns the bytes of the QR code. You can render this in a component of the type QR code that is compatible with the language that you use to program.

#### /qr-code/image

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/qr-code/image

Getting QRCode - Image

This method returns an image of the type base64. You can render this in a component of the type image that is compatible with the language that you use to program.

---

## Concept

Yes! Just like on WhatsApp Web you will need to read a QR code to connect to Z-API.

There are two ways that you can do the reading of the QR code. They are:

- Connect through our admin panel or
- Make this experience available within your own application using the methods described in this section.

You can opt for one of the methods available to read WhatsApps Qr code, as shown below: 

---

## Attributes 

| Attributes    | Type | Description |
| :------------ | :--: | :---------- |
| no Attributes |      |             |

---

## Code

---

:::note

If you opted to implement the Qr code reading feature in your app, you need to know that WhatsApp invalidades the Qr code every 20 seconds.

In case you call on this method and it is already connected it will not allow you to connect again.

Once you care connected you can start using Z-API’s methods to manipulate WhatsApp 
:::

:::important

**Recommendations:**

- Create a method with intervals of 10 to 20 seconds to call the API and get a new Qr code.
- If the user does not read the Qr code after 3 calls, stop the flow and add a button to request its interaction to avoid unnecessary calls to the WhatsApp API. If the user does not read the QRCode after 3 calls, stop the flow and add a button requesting its interaction to avoid unnecessary calls to the WhatsApp API.
:::
