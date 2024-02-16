---
id: introduction
title: Introdução
---

### Conceituação

Neste tópico você vai conhecer todos os métodos disponiveis para registrar um número em uma instância mobile.

**O que são instâncias mobile?** As instâncias mobile são basicamente como se fossem o seu celular! Ao invés de ser conectada como um "dispositivo" secundário - como o caso da instância web - elas são o dispositivo primário. Isso quer dizer que, além de você conectar um número a essa instância, poderá também conectar outros dispositivos - como web e desktop - a partir dela! Incrível né?!

Além disso, existem diversas **vantagens** em conectar seu número a uma instância mobile. Uma delas seria que as chances de **banimento** são consideravelmente reduzidas, pois estamos tratando de um dispositivo primário. Isso não quer dizer necessáriamente que não existam banimentos para esse tipo de conexão. Eles podem sim ocorrer, porém a **probabilidade é muito menor** comparado a uma instância web.

Agora que você já entendeu e viu as vantagens da instância mobile, **bora codar**!


### Passos para conectar um número

Comece verificando a disponibilidade do seu número para o registro em um novo dispositivo primário. A partir dessa API você pode consultar se o número está banido, se é possível solicitar o código de confirmação via sms, chamada de voz ou pelo celular atualmente conectado. Para mais detalhes, acesse a sessão abaixo:

- [Verificar disponibilidade de registro](./registration-available)

Se o número não estiver banido e algum dos métodos para envio do código de confirmação estiver disponível (sms, chamada de voz ou aplicativo do celular) basta utilizar o endpoint a seguir para solicitar o envio do mesmo:

- [Solicitar código de confirmação](./request-code)

Em alguns casos, após a solicitação do código é requerido responder a um **captcha** para prosseguir com a confirmação do código. Nesse caso, o base64 da imagem do captcha é retornado na API anterior a essa - **Solicitar código de confirmação**. Utilize a seguinte API para realizar a confirmação desse captcha.

- [Verificação de captcha](./captcha-confirm)

Após verficado captcha - se esse tiver sido o seu caso - podemos seguir para a confirmação do código que foi enviado a você pelo método escolhido.

- [Confirmar código](./confirm-code)

Ufa! Se você seguiu esse passo a passo, já deve estar conectado a uma instância mobile! Agora é só dar **Asas para sua imaginação!**

:::tip Dica
Lembrando que, as demais API's relacionadas ao WhatsApp - como de envio de mensagens e interações na conta - funcionam da mesma forma como para as instâncias web. Ou seja, os métodos são totalmente compatíveis entre instâncias.
:::
