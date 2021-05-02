---
id: qrcode
title: Pegar QRCode
---

### Introdução

Sim ! Assim como no Whatsapp Web você vai precisar ler um Qrcode para conectar-se ao Z-API.

Existem 2 formas que você pode utilizar para realizar esta leitura, a primeira delas você pode conectar-se através do nosso painel admin e na outra você pode disponibilizar a experiência dentro da sua propria aplicação.

Para quem optar por implementar dentro da sua aplicação temos 2 metodos disponveis para que você consiga pegar o QRCode.

### Pegando QRCode - bytes

Este metodo retorna os bytes do QRCode para que você possa renderizar em um componente do tipo QRCode compativel com sua linguagem de programação.

### Pegando QRCode - Imagem

Este metodo retorna uma imagem do tipo base64 para que você possa renderizar em um compoente do tipo Imagem compativel com sua linguagem e programação.

:::note

Se você optou por implementar a leitura do QRCode em sua aplicação você precisa saber que o Whatsapp invalida o QRCode a cada 20 segundos.

Caso você chame o metodo e já esteja conectado o retorno será de que você ja esta conectado.

**Recomendações:**

- Crie um metodo randon com intervalos entre 10 e 20 segundos para chamar a API para pegar o novo QRCode.
- Caso o usuário não leia o QRCode após 3 chamadas interrompa o fluxo e adicione um botão solicitação a interação do usuário novamente afim de evitar a chama excessiva desnecessário a API do whatsapp.
