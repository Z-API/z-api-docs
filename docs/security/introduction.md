---
id: introduction
title: ID e Token
---

## O que é e para que serve?

Não é difícil imaginar que para comunicação entre API’s vamos precisar estabelecer um protocolo de segurança entre as partes, ou seja entre o Z-API e sua aplicação, todas as interações com nossa API precisará ser autenticada por um ID e um token.

Ao obter seu ID e Token você já pode começar a enviar mensagens, para isso você precisa compor a URL com as sus informações.

Por exemplo: https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

Observe que as informações de ID e Token compõem a URL de integração.

---

## Como consigo meu id e token?

Logo após você criar sua conta no Z-API você vai precisar criar uma instância e esta possui um ID e um token para identificá-la. Estas 2 informações juntas serão responsáveis em garantir a segurança da comunicação entre sua aplicação e a nossa. Para visualizar o ID e o token da sua instância basta acessar a instância no painel de administrador e clicar em editar, lá você encontra todos os dados referente a instância. Lembrando que você pode ter várias instâncias, mas cada uma delas tem seu próprio ID e token.

---

:::warning

Nunca compartilhe o seu ID e token com ninguém, qualquer pessoa com essa informação pode mandar mensagens em seu nome. Recomendamos também que a chamada para nossa API **NUNCA** seja feita pelo frontend e sim pelo servidor, para que não deixe suas informações expostas.
