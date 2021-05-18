---
id: blockednumber
title: Bloqueios e Banimentos
---

:::caution Existe possibilidade do Whatsapp bloquear meu número ?

**SIMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM**

:::

---

## Introdução

Criamos este tópico para compartilhar um pouco de tudo que aprendemos sobre boas práticas afim de evitar aborrecimentos com bloqueios e banimentos no Whatsapp.

Gostaria de iniciar fazendo a seguinte reflexão com você: provavelmente você recebe diariamente vários SMSs com publicidades de lojas, promoções, operadoras de telefonia e por aí vai. 
Agora pense: e pelo Whatsapp quantas mensagens deste tipo você recebe? Geralmente são poucas, não é mesmo? Caso você receba o Whatsapp permite você marcar como spam e até mesmo bloquear o contato.

# O WHATSAPP NÃO PERMITE SPAM!

O Whatsapp é muito rigoroso quando o assunto é envio de spam e por isso damos mais atenção para ele do que para o SMS. Por que deixamos vários SMSs acumularem e não consiguimos deixar de olhar para o celular imediatamente ao receber um Whatsapp? Pois sabemos que recebemos um Whatsapp de algum contato conhecido e raramente recebemos promoções pelo mesmo.

---

## Quantas mensagens posso enviar

Quantidade é algo importante sim, mas não é só sobre a quantidade enviada, o fator _PARA QUEM_ muitas vezes é o ponto chave.

Sempre em nossas conversas utilizamos o case de um dos nossos clientes mais antigos, que hoje envia mensagens promocionais pelo Whatsapp para mais de 80 mil pessoas diariamente e nunca teve seu número bloqueado. Quando o procuramos e indagamos sobre como ele conseguia tal façanha, ele gentilmente compartilhou a seguinte técnica:

- Primeiro: Para receber mensagem com promoções o destinatário precisa adicionar o número da empresa nos contatos e enviar uma mensagem dizendo "quero promoções". Esta simples ação diminui significantemente o risco de bloqueios, pois com o seu número na agenda e iniciando a conversa os botões de bloqueio e denúncia de spam não aparecem;

- Segundo: Ele personaliza as mensagens com dados do destinatário, para que todas mensagens não fiquem exatamente iguais;

- Terceiro: sempre dê uma opção para o destinatário deixar de receber as mensagens. Exemplo: "Digite 2 para não receber mais estas mensagens", com isso ele monitora os webhooks para retirar os números que não querem mais receber da lista de envios e

- Quarto: Ele faz disparos por listas de transmissão, pois em listas de transmissão só recebem as suas mensagens destinatário que possuem o seu número nos contatos, logo ele não vai ter a opção de bloquear ou marcar como spam.

**Resumo**

- Evite enviar mensagens para quem não tem seu número nos contatos;

- Personalize as mensagens com informações do destinatário. Se não for possível, use atributos aleatórios para diferenciar cada mensagem;

- Tente convencer o destinatário a interagir com seu número, principalmente se você souber que ele não possui seu número na agenda;

- Ofereça a opção do destinatário não receber mais mensagens e monitore os webhooks para tratar essas interações e

- Se for possível dispare por lista de transmissão. (Nosso serviço não tem acesso aos seus contatos, então não é possivel criar listas de transmissão pela nossa API :( )

:::warning Cuidado

Se 3% dos destinatários marcarem sua mensagem como spam seu número será banido!
