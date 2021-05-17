---
id: restore-session
title: Restaurar sessão
---

## Método

#### /restore-session

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/restore-session

---

## Conceituação

Este método tenta restaurar a sua conexão com Whatsapp com base na informações salvas na sessão do Z-API, esta funcionalidade é indicada para casos onde o webhook de desconexão é enviado. Caso você recebe um webhook de desconexão pode tentar reestabelecer/recuperar a conexão utilizando este método.

---

## Code
