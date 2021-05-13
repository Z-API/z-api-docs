---
id: introduction
title: Introdução
---

### Conceituação

#### Mas afinal o que é uma instância ?

Uma instância nada mais é do que uma máquina virtual (em nossa infra-estutura chamamos de containers) dentro da nossa infraestrutura de servidores dedicada a prover um ambiente para conexão com seu número a nosso serviço.

De forma mais lúdica ou abstrata explicando, podemos dizer que uma instância é como uma garagem para 1 carro caso você tenha mais de um carro precisará de mais garagens.

Para ajudar você a pensar sobre o funcionamento geral do Z-API é interessante você pensar que nosso serviço roda com base em um whatsapp Web, e que abstrairmos os métodos disponibilizados por ele de forma simples permitimos que você manipule via API RestFul.

Para melhor tangibilizar nos próximos tópicos vamos de forma ordenada te direcionar em seus primeiros passos.

:::tip

Curiosidade: É bacana você saber que toda vez que você cria uma instância um nossos FlyBots que são responsáveis por orquestrar nosso Devops iniciam o processo de criação de um container com a Stack Z-API na AWS Brasil, sim todos nossos serviços nacionais rodam na AWS Brasil.
