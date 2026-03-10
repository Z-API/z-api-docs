---
id: introducao
title: Comunidades
sidebar_position: 1
---

# <Icon name="LayoutGrid" size="lg" /> Comunidades

Gerencie comunidades do WhatsApp através da API do Z-API. Crie comunidades, vincule grupos e organize conversas relacionadas em uma estrutura hierárquica.

:::tip Organização Hierárquica
Comunidades permitem organizar múltiplos grupos relacionados em uma estrutura hierárquica, facilitando o gerenciamento e comunicação em larga escala!
:::

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

O WhatsApp agora oferece a funcionalidade de Comunidades, que permite aos usuários agrupar grupos ao redor de um assunto ou interesse em comum. É uma maneira fácil de conectar com outras pessoas que compartilham dos mesmos objetivos e ideias.

Para exemplificar como funciona a estrutura de comunidades, veja a imagem abaixo:

<img src="https://raw.githubusercontent.com/Z-API/z-api-docs/main/img/communities.png" alt="Estrutura de Comunidades" />

**Observações:**

1. <Icon name="PlusCircle" size="xs" /> Ao criar uma comunidade, é criado um grupo padrão (grupo de avisos) com o mesmo nome da comunidade.
2. <Icon name="MessageSquare" size="xs" /> Este grupo representa sua comunidade inteira e é usado para enviar mensagens para todos.
3. <Icon name="Users" size="xs" /> Cada novo grupo vinculado à comunidade, todos participantes farão parte do grupo padrão (grupo de avisos).
4. <Icon name="UserMinus" size="xs" /> Ao desvincular um grupo, todos participantes dele são removidos do grupo padrão (grupo de avisos).

Como pode ser visto acima, toda comunidade possui um **"Grupo de avisos"**. Neste grupo apenas administradores podem enviar mensagens. Utilize ele sempre que quiser enviar algo para toda comunidade.

:::info Capacidade das Comunidades
Cada comunidade pode ter até 50 grupos, e o(s) administrador(es) das comunidades poderão disparar mensagens para até 5 mil pessoas de uma única vez através do grupo de avisos.
:::

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis {#operacoes}

### <Icon name="LayoutGrid" size="sm" /> Gerenciamento de Comunidades

- <Icon name="PlusCircle" size="xs" /> **[Criar Comunidade](/docs/communities/criar)** - Crie uma nova comunidade do WhatsApp
- <Icon name="List" size="xs" /> **[Listar Comunidades](/docs/communities/listar)** - Liste todas as comunidades da sua instância
- <Icon name="FileText" size="xs" /> **[Metadata da Comunidade](/docs/communities/metadata)** - Obtenha informações detalhadas sobre uma comunidade
- <Icon name="XSquare" size="xs" /> **[Desativar Comunidade](/docs/communities/desativar)** - Desative uma comunidade existente

### <Icon name="Settings" size="sm" /> Configurações

- <Icon name="Settings" size="xs" /> **[Configurações da Comunidade](/docs/communities/configuracoes)** - Alterar configurações como quem pode adicionar grupos
- <Icon name="Edit3" size="xs" /> **[Alterar Descrição](/docs/communities/alterar-descricao)** - Alterar a descrição da comunidade
- <Icon name="Link" size="xs" /> **[Redefinir Link de Convite](/docs/communities/redefinir-link)** - Gerar um novo link de convite

### <Icon name="Folders" size="sm" /> Gerenciamento de Grupos

- <Icon name="Link" size="xs" /> **[Vincular Grupos](/docs/communities/vincular-grupos)** - Adicione grupos existentes a uma comunidade
- <Icon name="Unlink" size="xs" /> **[Desvincular Grupos](/docs/communities/desvincular-grupos)** - Remova grupos de uma comunidade

### <Icon name="Users" size="sm" /> Gerenciamento de Participantes

- <Icon name="UserPlus" size="xs" /> **[Adicionar Participantes](/docs/communities/adicionar-participantes)** - Adicione novos participantes à comunidade
- <Icon name="UserMinus" size="xs" /> **[Remover Participantes](/docs/communities/remover-participantes)** - Remova participantes da comunidade
- <Icon name="UserRoundCog" size="xs" /> **[Promover Admin](/docs/communities/promover-admin)** - Promova participantes a administradores
- <Icon name="UserX" size="xs" /> **[Remover Admin](/docs/communities/remover-admin)** - Remova administradores da comunidade

---

## <Icon name="BookOpen" size="md" /> Conceitos Importantes {#conceitos}

### <Icon name="LayoutGrid" size="sm" /> Comunidade

Uma comunidade é uma estrutura organizacional que agrupa múltiplos grupos relacionados. Administradores podem gerenciar a comunidade e os grupos vinculados, enquanto participantes podem interagir dentro dos grupos.

### <Icon name="BellRing" size="sm" /> Grupo de Avisos

Toda comunidade possui um grupo de avisos criado automaticamente. Este grupo:
- <Icon name="Tag" size="xs" /> Tem o mesmo nome da comunidade
- <Icon name="MessageSquare" size="xs" /> Permite que administradores enviem mensagens para todos os participantes
- <Icon name="Users" size="xs" /> Todos os participantes dos grupos vinculados são automaticamente adicionados a este grupo

:::tip Grupo de Avisos
O grupo de avisos é criado automaticamente e permite que administradores enviem mensagens para toda a comunidade de uma vez!
:::

### <Icon name="Folders" size="sm" /> Grupos Vinculados

Grupos podem ser vinculados a uma comunidade para organização. Grupos vinculados mantêm sua funcionalidade independente, mas são organizados sob a estrutura da comunidade.

---

## <Icon name="HelpCircle" size="md" /> Perguntas Frequentes {#faq}

### Como faço para criar uma nova comunidade?

Primeiro é importante verificar se o aplicativo do WhatsApp do seu celular já está compatível com as comunidades. Caso não esteja, aguarde a atualização do aplicativo para sua conta. Agora, caso já tenha acesso a comunidades, veja a documentação de como [criar comunidade via API](/docs/communities/criar).

### Consigo listar as comunidades que faço parte?

Sim, o Z-API disponibiliza os métodos para que você consiga saber quais comunidades você faz parte. Veja a documentação de como [listar suas comunidades](/docs/communities/listar).

### Consigo vincular e desvincular grupos a uma comunidade?

Com certeza! O Z-API te entrega outras duas APIs para que você consiga gerenciar os grupos de uma comunidade. Veja como [vincular grupos](/docs/communities/vincular-grupos) ou [desvincular grupos](/docs/communities/desvincular-grupos) de uma comunidade.

### Como enviar mensagem para toda comunidade?

Como dito acima, a comunidade em si serve apenas para agrupar seus grupos e dar uma experiência e visão de todos os grupos da comunidade aos usuários. **Você pode sim enviar mensagem para toda comunidade**, mas para isso é utilizado o **Grupo de avisos**. Como o grupo de avisos se trata de um grupo como qualquer outro, basta você possuir o **phone** do grupo e utilizar as APIs de envio de mensagem normalmente, assim como outros grupos comuns.

### Como consigo pegar o grupo de avisos?

Existem 3 formas de se pegar o grupo de anúncio:
- A primeira é na [criação da comunidade](/docs/communities/criar), que ao criar a comunidade já te retorna as informações do grupo de avisos.
- A segunda é pela API de [listar chats](/docs/chats/pegar-chats), nela você pode diferenciar grupos normais de grupos de anúncios. O atributo **isGroup** estará como verdadeiro sempre que se tratar de um grupo normal e o atributo **isGroupAnnouncement** estará verdadeiro quando for um grupo de avisos.
- A terceira e última opção é pela API de [metadata da comunidade](/docs/communities/metadata), ela te retorna informações sobre a comunidade baseado no ID dela, retornando informações como nome da comunidade e seus grupos vinculados.

### Posso desativar uma comunidade?

Sim, você pode [desativar uma Comunidade](/docs/communities/desativar) no WhatsApp, o que resultará na desconexão de todos os grupos relacionados a ela. É importante ressaltar que desativar a Comunidade não excluirá seus grupos, mas sim os removerá da Comunidade em questão.

### Como adicionar ou remover pessoas da comunidade?

Como comentado anteriormente, a comunidade em si é apenas o que agrupa seus grupos. O que de fato é utilizado são os grupos de anúncios. Então, caso queira gerar o link de convite, adicionar e remover pessoas, promover como administradoras etc., tudo será feito através do grupo de avisos utilizando as APIs que você já conhece.

---

## <Icon name="AlertTriangle" size="md" /> Limitações {#limitacoes}

Esteja ciente destas limitações ao usar comunidades:

- <Icon name="List" size="sm" /> **Máximo de 50 grupos** por comunidade
- <Icon name="Shield" size="sm" /> **Apenas administradores** podem gerenciar comunidades
- <Icon name="PlusCircle" size="sm" /> **Grupos devem ser criados** antes de serem vinculados a uma comunidade
- <Icon name="Lock" size="sm" /> **Grupo de avisos** não pode ser desvinculado da comunidade
- <Icon name="CheckSquare" size="sm" /> **Mínimo de 1 grupo comum** vinculado (além do grupo de avisos)

:::warning Limitações Importantes
Respeite os limites de comunidades para garantir o funcionamento correto. Lembre-se: máximo de 50 grupos por comunidade!
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos {#proximos-passos}

- <Icon name="PlusCircle" size="sm" /> [Criar sua primeira comunidade](/docs/communities/criar)
- <Icon name="Link" size="sm" /> [Vincular grupos](/docs/communities/vincular-grupos)
- <Icon name="UserRoundCog" size="sm" /> [Gerenciar administradores](/docs/communities/promover-admin)
- <Icon name="Settings" size="sm" /> [Configurar a comunidade](/docs/communities/configuracoes)