---
id: introducao
title: Chats
sidebar_position: 1
---

# <Icon name="MessageCircle" size="lg" /> Gerenciamento de Chats

Esta seção documenta a API de chats do Z-API, que permite gerenciar todas as suas conversas e chats do WhatsApp de forma programática. Aqui você aprenderá a organizar conversas, controlar estados de leitura, arquivar chats e gerenciar notificações através de endpoints RESTful.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para fornecer conhecimento completo sobre gerenciamento de chats:

- **Conceitos fundamentais**: Entendendo tipos de chat e estados disponíveis
- **Listagem e consulta**: Obter informações sobre chats e conversas
- **Organização**: Arquivar, fixar e organizar chats
- **Controle de leitura**: Marcar mensagens como lidas
- **Gerenciamento de notificações**: Silenciar e controlar alertas
- **Limpeza e exclusão**: Limpar histórico e deletar conversas
- **Boas práticas**: Recomendações para organização eficiente

## <Icon name="Target" size="md" /> Visão Geral e Contexto

### <Icon name="Info" size="sm" /> O Que é a API de Chats

A API de chats do Z-API oferece controle programático completo sobre suas conversas do WhatsApp. Através de endpoints RESTful, você pode realizar operações de organização e gerenciamento que normalmente seriam feitas manualmente através da interface do aplicativo.

**Por que gerenciar chats programaticamente?**

- **Organização automatizada**: Arquivar chats antigos ou inativos automaticamente
- **Priorização**: Fixar chats importantes para acesso rápido
- **Controle de notificações**: Silenciar chats específicos baseado em regras
- **Gestão de leitura**: Marcar mensagens como lidas para manter organização
- **Limpeza periódica**: Limpar ou deletar conversas antigas automaticamente
- **Integração com sistemas**: Sincronizar estado de chats com sistemas externos
- **Automação de workflows**: Incorporar gerenciamento de chats em fluxos automatizados

### <Icon name="ListChecks" size="sm" /> Capacidades da API

A API de chats permite realizar as seguintes operações essenciais:

- **Listagem**: Obter todos os chats da sua instância com filtros e paginação
- **Metadados**: Recuperar informações detalhadas sobre chats específicos
- **Leitura**: Marcar mensagens como lidas para atualizar status
- **Arquivamento**: Arquivar e desarquivar conversas para organização
- **Fixação**: Fixar chats importantes no topo da lista
- **Notificações**: Silenciar ou ativar notificações de chats específicos
- **Limpeza**: Limpar histórico de mensagens de um chat
- **Exclusão**: Deletar conversas permanentemente
- **Expiração**: Configurar mensagens temporárias (disappearing messages)

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis

A API de chats oferece os seguintes endpoints, cada um documentado em sua própria página:

### <Icon name="List" size="sm" /> Operações de Consulta

- **[Obter chats](/docs/chats/pegar)**: Liste todos os chats da sua instância com opções de filtro e paginação. Fundamental para obter visão geral de todas as conversas.

- **[Obter metadata](/docs/chats/metadata)**: Recupere informações detalhadas sobre um chat específico, incluindo tipo, participantes, última mensagem e outros metadados.

### <Icon name="CheckCheck" size="sm" /> Operações de Leitura

- **[Marcar como lido](/docs/chats/ler)**: Marque mensagens de um chat como lidas. Essencial para manter organização e indicar que mensagens foram processadas.

### <Icon name="Archive" size="sm" /> Operações de Organização

- **[Arquivar chat](/docs/chats/arquivar)**: Arquivar ou desarquivar um chat. Útil para organizar conversas e ocultar chats inativos da lista principal.

- **[Fixar chat](/docs/chats/fixar)**: Fixar ou desafixar um chat no topo da lista. Ideal para manter acesso rápido a conversas importantes.

### <Icon name="BellOff" size="sm" /> Operações de Notificações

- **[Silenciar chat](/docs/chats/mutar)**: Mutar ou desmutar notificações de um chat. Essencial para controlar interrupções e focar em conversas prioritárias.

### <Icon name="Trash2" size="sm" /> Operações de Limpeza

- **[Limpar chat](/docs/chats/limpar)**: Limpe todas as mensagens de um chat sem deletar a conversa. Útil para manter privacidade e organização.

- **[Deletar chat](/docs/chats/deletar)**: Excluir permanentemente um chat. Use com cuidado, pois esta ação é irreversível.

### <Icon name="Timer" size="sm" /> Operações de Configuração

- **[Expiração do chat](/docs/chats/expiracao)**: Configure mensagens temporárias (disappearing messages) que são automaticamente excluídas após um período.

---

## <Icon name="BookOpen" size="md" /> Conceitos Fundamentais

### <Icon name="MessageSquare" size="sm" /> Tipos de Chat

O WhatsApp suporta diferentes tipos de conversas, cada uma com características específicas:

**Chat Individual:**

Conversa direta com um contato específico. Este é o tipo mais comum de chat, usado para comunicação um-a-um.

**Características:**
- Comunicação privada entre dois participantes
- Suporta todos os tipos de mídia
- Notificações padrão do WhatsApp
- Pode ser arquivado, fixado ou silenciado

**Chat de Grupo:**

Conversa com múltiplos participantes. Grupos podem ter até 1024 membros e incluem funcionalidades de administração.

**Características:**
- Múltiplos participantes simultâneos
- Sistema de administradores
- Configurações específicas de grupo
- Notificações podem ser personalizadas

**Chat de Comunidade:**

Conversa dentro de uma comunidade do WhatsApp. Comunidades podem conter múltiplos grupos vinculados.

**Características:**
- Parte de uma estrutura de comunidade maior
- Pode ter grupos aninhados
- Funcionalidades específicas de comunidades
- Gerenciamento centralizado

**Chat de Canal:**

Conversa em canal de broadcast. Canais são unidirecionais, onde apenas administradores podem enviar mensagens.

**Características:**
- Comunicação unidirecional
- Ideal para anúncios e notícias
- Suporta grandes números de assinantes
- Funcionalidades específicas de broadcast

:::info Tipos Específicos Requerem Operações Específicas
Cada tipo de chat tem características e limitações específicas. Certifique-se de usar as operações corretas para cada tipo e verifique a documentação específica quando necessário.
:::

### <Icon name="CircleDashed" size="sm" /> Estados de Chat

Os chats podem estar em diferentes estados que afetam sua visibilidade, organização e comportamento:

**Estado: Não Lido**

Chats com mensagens não lidas aparecem destacados na lista e geram notificações (se não estiverem silenciados).

**Características:**
- Indicador visual de mensagens não lidas
- Contador de mensagens não lidas
- Prioridade na lista de chats
- Gera notificações por padrão

**Estado: Arquivado**

Chats arquivados são ocultos da lista principal mas permanecem acessíveis através de uma seção separada.

**Características:**
- Não aparecem na lista principal
- Acessíveis através de seção de arquivados
- Podem ser desarquivados a qualquer momento
- Útil para organização de conversas antigas ou inativas

**Estado: Fixado**

Chats fixados aparecem sempre no topo da lista, independentemente de atividade recente.

**Características:**
- Sempre visíveis no topo da lista
- Máximo de 3 chats fixados simultaneamente
- Ideal para conversas prioritárias
- Mantém acesso rápido a chats importantes

**Estado: Silenciado**

Chats silenciados não geram notificações, mas continuam aparecendo normalmente na lista.

**Características:**
- Notificações desativadas
- Ainda aparecem na lista
- Útil para reduzir interrupções
- Pode ser combinado com outros estados

**Estados combinados:**

É possível combinar múltiplos estados. Por exemplo, um chat pode estar fixado e silenciado simultaneamente, mantendo acesso rápido sem notificações.

:::tip Estratégia de Organização
Use os estados de chat estrategicamente: arquive chats antigos ou inativos, fixe conversas prioritárias para acesso rápido, e silencie chats que não requerem atenção imediata. Esta organização melhora significativamente a eficiência no gerenciamento de múltiplas conversas.
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos

Agora que você compreende os conceitos fundamentais da API de chats, siga estes caminhos de aprendizado:

### <Icon name="PlayCircle" size="sm" /> Para Iniciantes

1. **[Listar seus chats](/docs/chats/pegar)**: Aprenda a obter lista de todas as conversas
2. **[Gerenciar leitura](/docs/chats/ler)**: Compreenda como marcar mensagens como lidas
3. **[Organizar chats](/docs/chats/arquivar)**: Aprenda a arquivar e fixar conversas

### <Icon name="Code2" size="sm" /> Para Pessoas Desenvolvedoras

1. **[Obter metadados](/docs/chats/metadata)**: Implemente sistemas de análise de conversas
2. **[Automação de organização](/docs/chats/fixar)**: Crie sistemas que organizam chats automaticamente
3. **[Gestão de notificações](/docs/chats/mutar)**: Implemente controle inteligente de notificações

### <Icon name="Target" size="sm" /> Casos de Uso Comuns

- **Organização automática**: Arquivar chats inativos após período determinado
- **Priorização inteligente**: Fixar chats baseado em regras de negócio
- **Gestão de notificações**: Silenciar chats em horários específicos
- **Limpeza periódica**: Limpar ou deletar conversas antigas automaticamente
- **Sincronização com CRMs**: Manter estado de chats sincronizado com sistemas externos

Cada página de operação inclui exemplos completos de código, estruturas de requisição/resposta e casos de uso práticos. Comece com operações simples e expanda conforme sua necessidade cresce.
