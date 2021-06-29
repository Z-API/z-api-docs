---
id: introduction
title: Introdução
---

## Fila

O Z-API disponibiliza a seus usuários um sistema de fila que funcionad unicamente para as mensagens envidas através da nossa API. Esta fila exerce um importante papel em nossa arquitetura que é o de organizar e ordenar as mensagens até que as mesmas sejam entregues ao Whatsapp. Este recurso também é muito útil para aquelas situaçoes onde o celular conectado ao Z-API passa por algumas instabilidade ou fique fora da internet. Caso isso ocorra, ou seja que o celular fica por um periodo fora ar assim que você voltar a conectar as mensagens serão enviadas ao destinatário.

## Recomendação

Recomendamos que sempre antes conectar você verifique se existem mensagens pendêntes de envio na fila e avise seu usuário caso exista mensagens na fila para ser enviada e solicite a ele a decisão de enviar ou não enivar mais esta fila. Imagine que as mensagens na fila podem já não fazer mais sentido para serem enviadas, então é importente notificar o usuário de dar esta decisão a ele

Sempre que você se conectar ao Z-API ele vai automaticamente executar a fila disparar as mensagens da fila caso tenho. Você pode apagar uma fila via API ou ainda pelo painel admin do Z-API.

:::tip Limite da Fila

O Z-API permite até 1000 mensagens em sua fila antes de começar a rejeitar novas mensagens para fila.

:::
