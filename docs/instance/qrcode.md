---
id: qrcode
title: Pegar QRCode
---

## Método

#### /qr-code

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/qr-code

Pegando QRCode - bytes

Este método retorna os bytes do QRCode para que você possa renderizar em um componente do tipo QRCode compatível com sua linguagem de programação.

#### /qr-code/image

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/qr-code/image

Pegando QRCode - Imagem

Este método retorna uma imagem do tipo base64 para que você possa renderizar em um compoente do tipo Imagem compativel com sua linguagem e programação.

---

## Conceituação

Sim ! Como no Whatsapp Web você vai precisar ler um QRCode para conectar-se ao Z-API.

Existem 2 formas que você pode utilizar para realizar esta leitura que são: - Se conectar através do nosso painel admin - Disponibilizar a experiência dentro da sua própria aplicação através dos metodos desta sessão.

Você pode optar por um dos 2 métodos disponíveis para pegar o QRCode do Whatsapp conforme exemplo abaixo.

---

## Atributos

| Atributos     | Tipo | Descrição |
| :------------ | :--: | :-------- |
| Sem Atributos |      |           |

---

## Code

---

:::note

Se você optou por implementar a leitura do QRCode em sua aplicação, você precisa saber que o Whatsapp invalida o QRCode a cada 20 segundos.

Caso você chame o metodo e já esteja conectado o retorno será de que você já esta conectado.

Uma vez conectado você ja pode começar a utilizar os metodos Z-API para manipular seu WhatsApp.

:::

:::important

**Recomendações:**

- Crie um metodo randon com intervalos entre 10 e 20 segundos para chamar a API e pegar o novo QRCode.
- Caso o usuário não leia o QRCode após 3 chamadas interrompa o fluxo e adicione um botão solicitando a interação do usuário (EX: Tentar novamente) afim de evitar a chamadas excessiva desnecessárias a API do Whatsapp. :::
