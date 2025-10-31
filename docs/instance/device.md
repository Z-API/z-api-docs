---
id: device
title: Dados do celular
---

## Método

#### /device

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/device

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Este método é responsável por retornar informações sobre o device/celular conectado

---

## Atributos

```json
{
  "phone": "",
  "imgUrl": "",
  "about": "Recado do perfil do contato",
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
