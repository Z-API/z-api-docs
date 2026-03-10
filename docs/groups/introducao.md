---
id: introducao
title: Grupos
sidebar_position: 1
---

# <Icon name="Users" size="lg" /> Gerenciamento de Grupos

Esta seção documenta a API de grupos do Z-API, que permite gerenciar grupos do WhatsApp de forma completa e programática. Aqui você aprenderá a criar grupos, gerenciar participantes, configurar administradores e controlar todas as funcionalidades relacionadas a grupos através de endpoints RESTful.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para fornecer conhecimento completo sobre gerenciamento de grupos:

- **Conceitos fundamentais**: Entendendo a estrutura de grupos no WhatsApp e identificadores únicos
- **Criação e configuração**: Criar grupos e definir configurações iniciais
- **Gerenciamento de participantes**: Adicionar, remover e aprovar membros
- **Administração**: Promover e gerenciar administradores
- **Configurações avançadas**: Personalizar nome, imagem e opções do grupo
- **Boas práticas**: Recomendações para gerenciamento eficiente e seguro

## <Icon name="Target" size="md" /> Visão Geral e Contexto

### <Icon name="Info" size="sm" /> O Que é a API de Grupos

A API de grupos do Z-API oferece controle programático completo sobre grupos do WhatsApp. Através de endpoints RESTful, você pode realizar operações que normalmente seriam feitas manualmente através da interface do aplicativo.

**Por que gerenciar grupos programaticamente?**

- **Automação de processos**: Criar grupos em massa para eventos, campanhas ou organizações
- **Gerenciamento de membros**: Adicionar ou remover participantes automaticamente baseado em regras de negócio
- **Moderação automatizada**: Implementar sistemas de aprovação e moderação de participantes
- **Sincronização**: Manter grupos sincronizados com sistemas externos (CRMs, plataformas de gestão)
- **Configuração em escala**: Atualizar configurações de múltiplos grupos simultaneamente
- **Integração com workflows**: Incorporar gerenciamento de grupos em fluxos de trabalho automatizados

### <Icon name="ListChecks" size="sm" /> Capacidades da API

A API de grupos permite realizar as seguintes operações essenciais:

- **Criação**: Criar novos grupos personalizados com nome e participantes iniciais
- **Busca**: Encontrar grupos por nome ou critérios específicos
- **Configuração**: Atualizar nome, imagem e outras configurações do grupo
- **Participantes**: Adicionar, remover, aprovar e rejeitar membros
- **Administração**: Promover e remover administradores
- **Metadados**: Recuperar informações detalhadas sobre grupos
- **Configurações avançadas**: Controlar opções como quem pode enviar mensagens, alterar configurações, etc.

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis

A API de grupos oferece os seguintes endpoints, cada um documentado em sua própria página:

### <Icon name="Search" size="sm" /> Operações de Consulta

- **[Buscar grupos](/docs/groups/buscar)**: Encontre grupos por nome ou critérios específicos. Útil para localizar grupos existentes antes de realizar operações.

- **[Obter metadata](/docs/groups/metadata)**: Recupere informações detalhadas sobre um grupo específico, incluindo participantes, administradores, configurações e outros metadados.

### <Icon name="PlusCircle" size="sm" /> Operações de Criação e Modificação

- **[Criar grupo](/docs/groups/criar)**: Crie um novo grupo do WhatsApp com nome e participantes iniciais. Fundamental para automação de criação de grupos.

- **[Atualizar nome](/docs/groups/atualizar-nome)**: Altere o nome de um grupo existente. Útil para renomear grupos baseado em eventos ou atualizações.

- **[Atualizar imagem](/docs/groups/atualizar-imagem)**: Altere a imagem do grupo. Ideal para personalização visual e branding.

### <Icon name="Users" size="sm" /> Operações de Participantes

- **[Adicionar participantes](/docs/groups/adicionar-participantes)**: Adicione membros a um grupo. Essencial para gerenciamento de membros em massa.

- **[Remover participantes](/docs/groups/remover-participantes)**: Remova membros de um grupo. Útil para limpeza periódica ou remoção baseada em regras.

- **[Aprovar participantes](/docs/groups/aprovar-participantes)**: Aprove solicitações de participação em grupos com aprovação obrigatória. Fundamental para moderação.

- **[Rejeitar participantes](/docs/groups/rejeitar-participantes)**: Rejeite solicitações de participação. Essencial para sistemas de moderação automatizados.

### <Icon name="UserRoundCog" size="sm" /> Operações de Administração

- **[Promover admin](/docs/groups/promover-admin)**: Torne um membro administrador do grupo. Necessário para delegar responsabilidades de moderação.

- **[Remover admin](/docs/groups/remover-admin)**: Remova privilégios de administrador de um membro. Útil para gestão de permissões.

### <Icon name="Settings" size="sm" /> Operações de Configuração

- **[Configurações do grupo](/docs/groups/configuracoes)**: Configure opções avançadas do grupo, como quem pode enviar mensagens, alterar configurações, etc.

---

## <Icon name="BookOpen" size="md" /> Conceitos Fundamentais

### <Icon name="IdCard" size="sm" /> Identificador de Grupo (ID)

**Formato do ID:**

Cada grupo possui um identificador único no formato `120363019502650977-group` ou similar. Este ID é essencial para todas as operações da API relacionadas a grupos específicos.

**Estrutura do ID:**

- **Formato geral**: `[número]-group`
- **Exemplo**: `120363019502650977-group`
- **Uso**: Sempre use este ID para referenciar grupos em requisições da API

**Como obter o ID de um grupo:**

- Através do endpoint de busca de grupos
- Através do endpoint de metadata do grupo
- Através de webhooks quando eventos de grupo ocorrem
- Através da listagem de chats (grupos aparecem como chats do tipo grupo)

**Importante:**

O ID do grupo é imutável e único. Armazene este identificador se precisar referenciar o grupo posteriormente, pois ele não muda mesmo se o nome do grupo for alterado.

:::note ID/FONE DE GRUPOS
Para melhor frisar, pense que o id/fone do grupo é o número de quem criou concatenado com um timestamp algo parecido com `551199999999-1623275280`.
:::

:::warning ATENÇÃO
No dia 4 de novembro de 2021 o whatsapp alterou o formato da criação de novos grupos, antes: `"phone": "551199999999-1623281429"` agora: `"phone": "120363019502650977-group"`.
:::

:::info Identificador Único e Imutável
Cada grupo possui um ID único que deve ser usado em todas as operações da API relacionadas a esse grupo específico. Este ID permanece constante mesmo se o nome ou outras configurações do grupo forem alteradas.
:::

### <Icon name="Users" size="sm" /> Gerenciamento de Participantes

**Conceito de participantes:**

Participantes são os membros de um grupo. Cada participante pode ter diferentes níveis de permissão, desde membro comum até administrador.

**Operações disponíveis:**

- **Adicionar membros**: Incluir novos participantes no grupo (requer que você seja administrador)
- **Remover membros**: Excluir participantes do grupo (requer que você seja administrador)
- **Aprovar solicitações**: Em grupos com aprovação obrigatória, aprovar pedidos de entrada
- **Rejeitar solicitações**: Negar pedidos de participação em grupos com aprovação obrigatória

**Limitações importantes:**

- Grupos podem ter até 1024 participantes (limite do WhatsApp)
- Apenas administradores podem adicionar ou remover membros
- O criador do grupo sempre mantém privilégios especiais

### <Icon name="Shield" size="sm" /> Sistema de Administração

**Hierarquia de permissões:**

Grupos do WhatsApp possuem uma hierarquia de permissões:

1. **Criador do grupo**: Permissões máximas, não pode ser removido
2. **Administradores**: Permissões elevadas para gerenciar o grupo
3. **Membros**: Permissões básicas de participação

**Permissões de administradores:**

Administradores têm acesso a funcionalidades especiais:

- **Gerenciamento de participantes**: Adicionar e remover membros
- **Configurações do grupo**: Alterar nome, imagem e outras configurações
- **Moderação**: Aprovar ou rejeitar solicitações de participação
- **Gestão de administradores**: Promover outros membros a administradores (com limitações)
- **Remoção de administradores**: Remover privilégios de outros administradores (exceto o criador)

**Boas práticas:**

- Limite o número de administradores ao necessário
- Use sistemas de moderação automatizados com cuidado
- Implemente logs de ações administrativas para auditoria
- Estabeleça políticas claras sobre quando promover administradores

:::warning Responsabilidade de Administradores
Administradores têm controle significativo sobre grupos. Use essas permissões com responsabilidade e implemente sistemas de auditoria para rastrear ações administrativas importantes.
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos

Agora que você compreende os conceitos fundamentais da API de grupos, siga estes caminhos de aprendizado:

### <Icon name="PlayCircle" size="sm" /> Para Iniciantes

1. **[Criar seu primeiro grupo](/docs/groups/criar)**: Aprenda a criar grupos programaticamente
2. **[Gerenciar participantes](/docs/groups/adicionar-participantes)**: Compreenda como adicionar e remover membros
3. **[Obter informações de grupos](/docs/groups/metadata)**: Aprenda a recuperar dados sobre grupos

### <Icon name="Code2" size="sm" /> Para Pessoas Desenvolvedoras

1. **[Configurar administradores](/docs/groups/promover-admin)**: Implemente sistemas de gestão de permissões
2. **[Moderação automatizada](/docs/groups/aprovar-participantes)**: Crie sistemas de aprovação de participantes
3. **[Configurações avançadas](/docs/groups/configuracoes)**: Controle opções detalhadas de grupos

### <Icon name="Target" size="sm" /> Casos de Uso Comuns

- **Criação de grupos para eventos**: Automatize criação de grupos para webinars, cursos ou eventos
- **Gerenciamento de comunidades**: Mantenha grupos de comunidade organizados e moderados
- **Sincronização com CRMs**: Sincronize grupos com sistemas de gestão de relacionamento
- **Sistemas de moderação**: Implemente aprovação automática baseada em regras

Cada página de operação inclui exemplos completos de código, estruturas de requisição/resposta e casos de uso práticos. Comece com operações simples e expanda conforme sua necessidade cresce.
