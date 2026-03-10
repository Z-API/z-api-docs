---
id: introducao
title: Privacidade
sidebar_position: 1
---

# <Icon name="Lock" size="lg" /> Privacidade

Gerencie configurações de privacidade do WhatsApp através da API do Z-API. Controle quem pode ver suas informações, status e mensagens.

:::tip Controle Total
A API de privacidade permite controlar programaticamente todas as configurações de privacidade do WhatsApp, desde visualização de perfil até confirmações de leitura!
:::

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Neste tópico você vai conhecer todos os métodos disponíveis para configurações de privacidade.

As **configurações de privacidade** do WhatsApp são um conjunto de opções e recursos que permitem aos usuários controlar quem pode acessar suas informações pessoais e interagir com eles no aplicativo de mensagens. Essas configurações visam proteger a privacidade dos usuários e oferecer controle sobre o compartilhamento de informações. Os principais elementos das configurações de privacidade incluem a possibilidade de definir quem pode ver sua **foto de perfil**, informações de **visto por último** e **confirmar a leitura de mensagens**.

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis {#operacoes}

Gerencie suas configurações de privacidade com estas operações:

### <Icon name="Eye" size="sm" /> Configurações de Visualização

- <Icon name="CheckCheck" size="xs" /> **[Confirmações de Leitura](/docs/privacy/confirmacoes-leitura)** - Configure as confirmações de leitura de mensagens
- <Icon name="Circle" size="xs" /> **[Visualização de Online](/docs/privacy/visualizacao-online)** - Configure quem pode ver quando você estiver online
- <Icon name="Clock" size="xs" /> **[Visto por Último](/docs/privacy/visto-por-ultimo)** - Configure quem pode ver seu "visto por último"
- <Icon name="Image" size="xs" /> **[Visualização da Foto do Perfil](/docs/privacy/visualizacao-foto-perfil)** - Configure quem pode ver sua foto de perfil
- <Icon name="TextQuote" size="xs" /> **[Visualização do Recado](/docs/privacy/visualizacao-recado)** - Configure quem pode ver o recado do seu perfil

### <Icon name="MessageSquare" size="sm" /> Configurações de Mensagens e Grupos

- <Icon name="Timer" size="xs" /> **[Duração das Mensagens](/docs/privacy/duracao-mensagens)** - Configure mensagens temporárias para novas conversas
- <Icon name="Users" size="xs" /> **[Permissão para Adicionar em Grupos](/docs/privacy/permissao-adicionar-grupos)** - Configure quem pode te adicionar em grupos

### <Icon name="Settings" size="sm" /> Gerenciamento

- <Icon name="List" size="xs" /> **[Listar Contatos Não Permitidos](/docs/privacy/contatos-nao-permitidos)** - Liste contatos na blacklist de cada configuração

---

## <Icon name="BookOpen" size="md" /> Conceitos Importantes {#conceitos}

### <Icon name="Shield" size="sm" /> Níveis de Privacidade

O WhatsApp oferece diferentes níveis de privacidade para cada tipo de informação:

- <Icon name="Globe" size="xs" /> **Todos** (`ALL`) - Qualquer pessoa pode ver a informação
- <Icon name="Contact" size="xs" /> **Meus contatos** (`CONTACTS`) - Apenas seus contatos podem ver
- <Icon name="Lock" size="xs" /> **Ninguém** (`NONE`) - Ninguém pode ver a informação
- <Icon name="Ban" size="xs" /> **Meus contatos, exceto...** (`CONTACT_BLACKLIST`) - Apenas seus contatos podem ver, exceto os que você adicionar à blacklist

:::info Níveis de Controle
Cada nível de privacidade oferece um grau diferente de controle sobre quem pode ver suas informações. Escolha o nível que melhor se adequa às suas necessidades!
:::

### <Icon name="Ban" size="sm" /> Blacklist

A blacklist (lista de contatos não permitidos) permite excluir contatos específicos de certas configurações de privacidade. **Importante**: Cada configuração de privacidade tem sua própria blacklist independente.

### <Icon name="CheckCheck" size="sm" /> Confirmações de Leitura

As confirmações de leitura (duas marcas azuis) podem ser controladas através das configurações de privacidade. Você pode escolher se deseja enviar e receber confirmações de leitura.

---

## <Icon name="CircleCheck" size="md" /> Status e Limitações {#status}

- <Icon name="CircleCheck" size="sm" /> **Disponibilidade**: De acordo com as respostas oficiais do produto, **todos os 8 endpoints de privacidade estão em produção e operacionais**
- <Icon name="ShieldCheck" size="sm" /> **Estabilidade**: Não há endpoints de Privacy API marcados como beta ou experimentais neste momento
- <Icon name="KeyRound" size="sm" /> **Autenticação**: Os endpoints seguem o padrão de autenticação do Z-API (uso de token da instância via header)
- <Icon name="Timer" size="sm" /> **Rate limiting**: Não há limites adicionais específicos de Privacy API além das políticas gerais de uso da plataforma

:::success API Completa
Todos os endpoints de privacidade estão em produção e prontos para uso, oferecendo controle completo sobre suas configurações de privacidade!
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos {#proximos-passos}

- <Icon name="CheckCheck" size="sm" /> [Configurar Confirmações de Leitura](/docs/privacy/confirmacoes-leitura) - Controlar marcações de leitura
- <Icon name="Circle" size="sm" /> [Configurar Visualização de Online](/docs/privacy/visualizacao-online) - Controlar visibilidade online
- <Icon name="Clock" size="sm" /> [Configurar Visto por Último](/docs/privacy/visto-por-ultimo) - Controlar privacidade de visto por último
- <Icon name="Image" size="sm" /> [Configurar Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Controlar privacidade de foto de perfil
