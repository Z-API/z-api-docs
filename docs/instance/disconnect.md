---
id: disconnect
title: Desconectar
---

## Conceituação

Este método desconecta seu número do Z-API.

Mas não se preocupe, para conectar novamente bastar ler o QRCode :)

---

## Método

#### /disconnect

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/disconnect

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |

---

## Code

---

:::important Não se esqueça!

Uma vez desconectado todos os metodos da API ficam indisponíveis e os webhooks deixam de ser enviados.

:::
