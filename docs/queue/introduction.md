---
id: introduction
title: Introdução
---

## Fila

O Z-API disponibiliza a seus usuários um sistema de fila que funciona unicamente para as mensagens envidas através da nossa API. Esta fila exerce um importante papel em nossa arquitetura que é o de organizar e ordenar as mensagens até que as mesmas sejam entregues ao Whatsapp. Este recurso também é muito útil para aquelas situaçoes onde o celular conectado ao Z-API passa por algumas instabilidade ou fique fora da internet. Caso isso ocorra, ou seja, se o celular fica por um periodo fora ar, assim que você voltar a conectar as mensagens serão enviadas ao destinatário normalmente.

:::tip Tempo de envio

Nossa fila trabalha com tempo de envio alternado entre uma mensagem e outra afim de simular o comportamento humano este intervalo fica em um range default randômico entre 1~3 segundos por mensagem.

Caso queria aumentar o delay das mensagens, você pode passar o atributo delayMessage no body da requisição. Para saber como veja em [Send-message](../message/send-message-text#opcionais)

:::

## Recomendação

Recomendamos que sempre antes se conectar você verifique se existem mensagens pendêntes de envio na fila, caso tenha avise seu usuário e solicite a ele a decisão de enviar ou não enviar mais estas mensagens que estão na fila. Imagine que talvez as mensagens na fila possam já não fazer mais sentido para serem enviadas, então é importente notificar o usuário e dar esta decisão a ele.

Sempre que você se conectar ao Z-API ele vai automaticamente executar a fila disparar as mensagens da fila caso tenha. Então muito cuidado!

Você pode apagar uma fila via API ou ainda pelo painel admin do Z-API.

:::tip Limite da Fila

O Z-API permite até 1000 mensagens para celulares descontectados em sua fila antes de começar a rejeitar novas mensagens para fila.

:::
