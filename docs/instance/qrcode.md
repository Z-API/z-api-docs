---
id: qrcode
title: Pegar QRCode
---

## Método

#### /qr-code

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/qr-code

Pegando QRCode - bytes

Este método retorna os bytes do QRCode. Você poderá renderizar em um componente do tipo QRCode compatível com sua linguagem de programação.

#### /qr-code/image

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/qr-code/image

Pegando QRCode - Imagem

Este método retorna uma imagem do tipo base64. Você poderá renderizar em um componente do tipo imagem compatível com sua linguagem de programação.

---

## Conceituação

Sim! Como no Whatsapp Web você vai precisar ler um QRCode para conectar-se ao Z-API.

Existem 2 formas que você pode utilizar para realizar esta leitura. São elas:

- Se conectar através do nosso painel de administrador ou
- Disponibilizar a experiência dentro da sua própria aplicação através dos métodos descritos nesta sessão.

Você pode optar por um dos métodos disponíveis para ler o QRCode do Whatsapp, conforme exemplo abaixo:

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

Caso você chame o método e já esteja conectado ele não permitirá que você conecte novamente.

Uma vez conectado você já pode começar a utilizar os métodos Z-API para manipular seu WhatsApp.

:::

:::important

**Recomendações:**

- Crie um método com intervalos entre 10 e 20 segundos para chamar a API e pegar o novo QRCode.
- Caso o usuário não leia o QRCode após 3 chamadas, interrompa o fluxo e adicione um botão solicitando interação do mesmo para evitar chamadas desnecessárias para a API do Whatsapp. :::
