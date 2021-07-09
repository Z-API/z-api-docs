---
id: device
title: Dados do celular
---

## Método

#### /Status

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/device

---

## Conceituação

Este método é responsável por retornar informações sobre o device/celular conectado

---

## Atributos

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

<iframe src="//api.apiembed.com/?source=https://rawcdn.githack.com/Z-API/z-api-docs/15e8d4dc8e2ad7a112d534cc731a1c6961f1be7a/json-examples/device.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
