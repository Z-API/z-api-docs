---
id: introduction
title: Introdução
---

### Conceituação

Agora com Z-API você pode fazer ligações para qualquer número, no momento não é possivel enviar um áudio durante a chamada. Essa funcionalidade chamamos de "chamar atenção", sabe lembra do cutucar no facebook?

Com essa API você dar um toque e aguardar até 15 segundos e desligar a ligação.

Com os webhooks de mensagem recebida, você pode observar as notificações e saber se a pessoa atendeu ou rejeitou a ligação.

:::caution Sobre chamadas

Ligações utilizam o mesmo canal de comunicação que as mensagens, então a fila é pausada para que não seja enviada outra mensagem ao mesmo tempo que estiver ligando para alguém.

:::
