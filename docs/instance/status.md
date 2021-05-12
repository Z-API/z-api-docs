---
id: status
title: Status da instância
---

## /status

#### \* Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/status

Este método é responsavel por lhe passar informações sobre a saúde da sua instância no Z-API, para uma boa qualidade de envio e recebimento é preciso tomar os seguinte cuidados:

- Configure os webhooks no Z-API para receber notificações sobre mudanças no status da sua instância.

- Desabilite a otimização de bateria do celular conectado mesmo que seja um emulador (exemplo para Android https://youtu.be/Z1baLLXyvTM).

- Monitore os atributos deste método.

#### \* Atributos

| Atributos | Tipo | Descrição |
| --- | :-: | :-- |
| connected | boolean | Indica se seu numero esta conectado ao Z-API |
| session | boolean | Indica se sua instância tem um token ativo no WhatsApp |
| error | string | Informa detalhes caso algum dos atributos não esteja true - 'You are already connected.' - 'You need to restore the session.' - 'You are not connected.' |
| smartphoneConnected | boolean | Indica se o celular esta conectado a internet |

### \* Exemplo

## Code

JavaScript

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

Phyton

```python
s = "Python syntax highlighting"
print(s)
```
