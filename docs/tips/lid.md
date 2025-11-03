---
id: lid
title: Lid
---

## Introdução

O `@lid` (Linked ID) é um _identificador único e privado_ criado pelo WhatsApp para representar contatos sem expor diretamente o número de telefone.
Essa mudança faz parte das _atualizações de privacidade_ do WhatsApp, permitindo que o usuário oculte seu número em determinados contextos.

Em alguns casos, o WhatsApp está enviando o `@lid` como identificação primária do usuário, mesmo que ele não tenha ativado nenhuma opção para esconder o número.

---

### Diferença entre `@lid` e `phone`

O WhatsApp pode retornar os identificadores de contato de diferentes formas, dependendo do tipo de conversa, grupo ou configuração de privacidade:

* `phone`: Pode conter o número real (`"554499999999"`) ou o próprio `@lid` (`"81896604192873@lid"`).

* `chatLid`: É o identificador único mais estável, mas pode vir como `null`.

Quando `chatLid` é `null`, o campo `phone` pode conter o `@lid` em vez do número.

O comportamento de retorno é definido exclusivamente pelo WhatsApp e pode mudar a qualquer momento.

---

### Exemplo de Webhook

Nos webhooks da Z-API, o WhatsApp pode retornar o identificador do contato de diferentes formas, dependendo do tipo de interação e das configurações de privacidade do usuário.

#### Exemplo – Retorno completo com número e `@lid`:

```json
{
  "chatLid": "81896604192873@lid",
  "phone": "554499999999"
}
```

#### Exemplo – Retorno apenas com o `@lid`:

```json
{
  "chatLid": null,
  "phone": "65998849469@lid"
}
```

Em alguns casos, o `"chatLid"` pode vir como `null`, e o campo `"phone"` pode conter o próprio `@lid`.
Essa variação ocorre porque, por vezes, a Z-API não possui o telefone de quem está enviando a mensagem, pois apenas o `@lid` é informado pelo WhatsApp.

---

### Envio de mensagens usando o `@lid`

É possível _enviar mensagens diretamente para um `@lid`_, substituindo o número de telefone no corpo da requisição:

```json
{
  "phone": "81896604192873@lid",
  "message": "Olá! Essa mensagem foi enviada usando o identificador @lid."
}
```

O envio funciona normalmente, pois o `@lid` _já é suportado_ pela API da Z-API na maioria dos endpoints.

---

### Boas práticas de implementação

* Priorize o uso de `@lid` para identificar contatos — esse atributo tende a ser o mais estável.
* Evite depender apenas de `phone`, pois ele pode conter o número ou o próprio `@lid`.
* Armazene e relacione o `@lid` em sua base de dados para manter consistência.

---

### Conversão de `@lid` para número

Não é possível converter um `@lid` em número de telefone (`phone`).
Essa limitação existe _por motivos de privacidade definidos pelo WhatsApp_.
Permitir essa conversão invalidaria o propósito do recurso de ocultação de número.

O mapeamento direto entre `@lid` e `phone` _não é disponibilizado pelo WhatsApp nem pela Z-API_.

---

### Conversão de número (`phone`) para `@lid`

Por outro lado, é possível obter o `@lid` correspondente a um número de telefone utilizando o método ["Número com Whatsapp ?"](https://developer.z-api.io/contacts/get-iswhatsapp).

Esse endpoint permite verificar se um número possui conta no WhatsApp e, quando aplicável, retorna também o _identificador `@lid`_ associado a esse número.

---

### Importante

* Essa mudança é _nativa do WhatsApp_, e a Z-API apenas repassa as informações conforme recebidas.
* O comportamento de retorno (`@lid` ou `phone`) pode variar.
* O atributo `chatLid` já está implementado nos webhooks da Z-API e pode ser usado tanto para identificar quanto para enviar mensagens normalmente.
* O `@lid` é uma medida que está sendo implementada pelo próprio WhatsApp; as mudanças estão sendo aplicadas gradualmente e ele ainda não está completamente implementado, por isso o comportamento pode ser inconsistente.