---
id: status
title: Status da instância
---
## Conceituação

Este método te permite descobrir se sua instância está ou não conectada a uma conta de Whatsapp.

---

## Método

#### /Status

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---


## Atributos

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| connected | boolean | Indica se seu número está conectado ao Z-API |
| error | string | Informa detalhes caso algum dos atributos não esteja true - 'You are already connected.' - 'You need to restore the session.' - 'You are not connected.' |
| smartphoneConnected | boolean | Indica se o celular está conectado à internet |

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/instance-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
