---
id: introduction
title: Introdução
---

## Mas afinal o que é uma instância ?

Uma instância é uma conexão a partir de um número de telefone com conta no WhatsApp, que será responsável pelo envio e recebimento de mensagens. É possível criar várias instâncias para que você consiga ter vários números de WhatsApp conectado a sua conta.

Tecnicamente falando uma instância nada mais é do que uma máquina virtual (ou container) dentro da nossa infraestrutura de servidores, dedicada a prover um ambiente para conexão do seu número.

Cada instância só possui um número, caso precise conectar mais números será necessário criar mais instâncias. Mas uma instância não é presa a um único número, ou seja, você pode desconectar um número e conectar outro na mesma instância.

Para ajudar você a entender o funcionamento do Z-API, nosso serviço roda com base em um Whatsapp Web, e abstraímos os métodos permitindo que você manipule via API RestFul.

Para melhor tangibilizar, nos próximos tópicos vamos de forma ordenada te ajudar nos primeiros passos.

---

:::tip Curiosidade

É bacana você saber que toda vez que você cria uma instância nossos FlyBots responsáveis por orquestrar todo nosso Devops, inicia o processo de criação de um container com a Stack Z-API na Oracle Cloud. Sim! todos nossos serviços são nacionais e rodam na Oracle Cloud.
