---
id: blockednumber
title: Bloqueios e Banimentos
---

:::caution Existe alguma possibilidade do WhatsApp bloquear meu número?

**SIM, A POSSIBILIDADE EXISTE, E É REAL.**

:::

---

## Introdução

### Boas práticas!

Criamos este tópico para compartilhar um pouco de tudo que aprendemos sobre boas práticas afim de evitar aborrecimentos com bloqueios e banimentos no WhatsApp.

Gostaríamos de iniciar fazendo a seguinte reflexão com você: É bem provável que você receba diariamente vários SMS com publicidades de lojas, promoções, operadoras de telefonia e por aí vai.
Agora pense, e pelo WhatsApp quantas mensagens deste tipo você recebe? Provavelmente nenhuma ou pouquíssimas não é mesmo? Mesmo assim caso você receba o WhatsApp permite você marcar como spam e até mesmo bloquear o contato.

# O WHATSAPP NÃO PERMITE SPAM!

O WhatsApp é muito rigoroso quando o assunto é envio de spam e por isso damos mais atenção para ele do que para o SMS. Por que deixamos vários SMS acumularem e não conseguimos deixar de olhar para o celular imediatamente ao receber um WhatsApp? Pois sabemos que recebemos um WhatsApp de algum contato conhecido e raramente recebemos promoções pelo mesmo.

---

## Quantas mensagens posso enviar?

Quantidade é algo importante sim, mas não é só sobre a quantidade enviada, o fator _PARA QUEM_ muitas vezes é o ponto chave.

Sempre em nossas conversas utilizamos o case de um dos nossos clientes mais antigos, que hoje envia mensagens promocionais pelo WhatsApp para mais de 80 mil pessoas diariamente e nunca teve seu número bloqueado. Quando o procuramos e indagamos sobre como ele conseguia tal façanha, ele gentilmente compartilhou a seguinte técnica:

1.	Fazer maturação do chip: Isso significa usar o número de telefone no WhatsApp de maneira normal antes de começar a enviar muitas mensagens através do Z-API.
2.	Interagir pelo celular ou WhatsApp Web antes de conectar na Z-API: Isso ajuda a mostrar para o WhatsApp que você é um usuário real e não um bot.
3.	Ter um texto que induza o usuário a responder as mensagens: Isso ajuda a mostrar para o WhatsApp que você está tendo conversas reais com as pessoas.
4.	Oferecer uma opção para o usuário não receber mais as mensagens caso não queira: Isso é importante para respeitar a privacidade dos usuários e evitar denúncias.
5.	Ter os dados do perfil preenchidos no WhatsApp: Isso ajuda a mostrar para o WhatsApp que você é um usuário legítimo.
6.	Ler o QR code após 24 horas de registrar no WhatsApp: Isso ajuda a confirmar que você é um usuário real.

Forma de envio:

- Primeiro: Para receber mensagem com promoções o destinatário precisa adicionar o número da empresa nos contatos e enviar uma mensagem dizendo "quero promoções". Esta simples ação diminui significantemente o risco de bloqueios, pois com o seu número na agenda e iniciando a conversa os botões de bloqueio e denúncia de spam não aparecem;

- Segundo: Ele personaliza as mensagens com dados do destinatário, para que todas mensagens não fiquem exatamente iguais;

- Terceiro: sempre dê uma opção para o destinatário deixar de receber as mensagens. Exemplo: "Digite 2 para não receber mais estas mensagens", com isso ele monitora os webhooks para retirar os números que não querem mais receber da lista de envios.


**Resumo**

- Evite enviar mensagens para quem não tem seu número nos contatos;

- Personalize as mensagens com informações do destinatário. Se não for possível, use atributos aleatórios para diferenciar cada mensagem;

- Tente convencer o destinatário a interagir com seu número, principalmente se você souber que ele não possui seu número na agenda;

- Ofereça a opção do destinatário não receber mais mensagens e monitore os webhooks para tratar essas interações.

:::warning Cuidado

Se 3% dos destinatários marcarem sua mensagem como spam seu número será banido!
