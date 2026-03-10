---
id: colecao-postman
title: Testando a API com Postman
sidebar_position: 2
---

# <Icon name="Plug" size="lg" /> Testando a API com a Coleção Postman

Para facilitar seus testes e desenvolvimento, o Z-API oferece uma **Coleção Postman**. Ele é um arquivo pré-configurado que contém todos os endpoints (as "funções") da nossa API, permitindo que você experimente cada um deles de forma visual, sem escrever uma única linha de código.

:::tip Ferramenta Essencial
A Coleção Postman é a maneira mais rápida e visual de testar todos os recursos do Z-API, sem precisar escrever código!
:::

---

## <Icon name="Info" size="md" /> O que é o Postman?

O [Postman](https://www.postman.com/) é uma ferramenta gratuita que ajuda desenvolvedores (e não desenvolvedores!) a interagir com APIs. Pense nele como um "navegador" para APIs: em vez de digitar um endereço web para ver uma página, você o usa para enviar requisições a um servidor e ver a resposta que ele retorna.

É a ferramenta perfeita para:

- <Icon name="CircleCheck" size="sm" /> **Testar** se sua instância está funcionando corretamente.
- <Icon name="BookOpen" size="sm" /> **Aprender** o que cada endpoint do Z-API faz.
- <Icon name="ShieldCheck" size="sm" /> **Validar** os dados que você precisa enviar em cada requisição.

---

## <Icon name="Package" size="md" /> Passo 1: Obtenha a Coleção

A maneira mais fácil de começar é usar a coleção oficial, que está sempre atualizada.

1. <Icon name="Globe" size="xs" /> Acesse a seção [**Coleção Postman**](/docs/tips/colecao-postman) nesta documentação.
2. <Icon name="MousePointerClick" size="xs" /> Siga as instruções para importar a coleção no Postman. A coleção inclui todos os endpoints do Z-API com exemplos prontos para uso.

:::info Importação Automática
A coleção já vem pré-configurada com todas as variáveis de ambiente necessárias. Você só precisará preencher suas credenciais!
:::

:::tip Sem Instalação Necessária
Se você não tem o Postman instalado, pode baixá-lo gratuitamente em [postman.com](https://www.postman.com/downloads/). A instalação é rápida e simples!
:::

---

## <Icon name="KeyRound" size="md" /> Passo 2: Configure suas Credenciais

Após importar a coleção, você precisa informar ao Postman quais são as suas credenciais para que ele possa se autenticar na sua conta.

1. <Icon name="Settings" size="xs" /> No Postman, na barra lateral esquerda, clique em **"Environments"**.
2. <Icon name="FolderPlus" size="xs" /> Você verá um novo ambiente chamado **"Z-API"**. Clique nele para abrir as variáveis.
3. <Icon name="Edit3" size="xs" /> Preencha os seguintes campos em **"Current Value"**:
   - <Icon name="IdCard" size="xs" /> `instanceId`: Cole aqui o ID da sua instância Z-API.
   - <Icon name="KeySquare" size="xs" /> `token`: Cole aqui o seu Token de acesso.

:::warning Não Esqueça de Salvar
Lembre-se de salvar suas alterações clicando no botão **"Save"** após preencher as credenciais!
:::

---

## <Icon name="Send" size="md" /> Passo 3: Faça sua Primeira Requisição

Com tudo configurado, você está pronto para testar.

1. <Icon name="Folders" size="xs" /> Na barra lateral, clique em **"Collections"** e expanda a coleção **"Z-API"**.
2. <Icon name="MessageSquare" size="xs" /> Navegue até a pasta **"Messages"** e clique na requisição **"Send Text"**.
3. <Icon name="FileText" size="xs" /> No painel principal, clique na aba **"Body"**. Você verá a estrutura da mensagem, com campos para `phone` e `message`.
4. <Icon name="Edit3" size="xs" /> Preencha o número de telefone do destinatário e a mensagem que deseja enviar.
5. <Icon name="Send" size="xs" /> Clique no botão **"Send"**.

:::success Sucesso!
Se tudo estiver correto, você receberá uma resposta com status `200 OK` e a mensagem será enviada para o seu telefone de teste! Agora você pode explorar e testar todas as outras funcionalidades do Z-API da mesma forma.
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos

Agora que você já testou a API com o Postman, explore mais:

- <Icon name="MessageSquare" size="sm" /> **[Tipos de Mensagens](/docs/messages/introducao)** - Aprenda a enviar imagens, vídeos e mensagens interativas
- <Icon name="Webhook" size="sm" /> **[Configurar Webhooks](/docs/webhooks/introducao)** - Receba notificações em tempo real
- <Icon name="ShieldAlert" size="sm" /> **[Boas Práticas](/docs/quick-start/bloqueios-e-banimentos)** - Evite bloqueios e use a API de forma segura
