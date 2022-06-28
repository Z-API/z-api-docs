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
    "imgUrl": "",
    "name": "",
    "device": {
        "sessionName": "Z-API",
        "device_model": "Z-API"
    },
    "sessionId": 66,
    "isBusiness": true
}
```

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/device.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
