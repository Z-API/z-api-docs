---
id: restart
title: Reiniciar instância
---

## Método

#### /restart

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/restart

---

## Conceituação

Se você como todo bom Dev pulou a introdução e ainda não tem bem claro o conceito de instância, sugiro fortemente que você dê um passo atrás e leia a introdução deste tópico.

Pronto, agora que você já sabe o que é uma instância fica bem mais fácil de explicar :)

Este método basicamente é o botão "Reiniciar" do seu sistema operacional ou seja, como todo usuário expert, em casos onde tudo parece dar errado tente control+alt+del ou reinicia!

---

## Response

### 200

```json
{
  "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

---

:::note

Não! Você não precisa ler o QRCode se reiniciar a sua instância.
