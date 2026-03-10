---
id: introducao
title: Status
sidebar_position: 1
---

# <Icon name="CircleDashed" size="lg" /> Gerenciamento de Status

Esta seção documenta a API de status do Z-API, que permite criar e gerenciar status (stories) do WhatsApp de forma programática. Aqui você aprenderá a publicar status de texto, imagem e vídeo, além de responder a status de outros usuários através de endpoints RESTful.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para fornecer conhecimento completo sobre gerenciamento de status:

- **Conceitos fundamentais**: Entendendo o que são status e como funcionam
- **Tipos de status**: Texto, imagem e vídeo
- **Publicação programática**: Criar e publicar status através da API
- **Interação com status**: Responder a status de outros usuários
- **Limitações e boas práticas**: Entendendo restrições e recomendações

## <Icon name="Target" size="md" /> Visão Geral e Contexto

### <Icon name="Info" size="sm" /> O Que São Status

Status são mensagens temporárias do WhatsApp que desaparecem automaticamente após 24 horas. Funcionam de forma similar ao recurso Stories de outras plataformas de redes sociais, permitindo compartilhar atualizações rápidas, conteúdo visual e informações temporárias com seus contatos.

**Características principais:**

- **Temporários**: Desaparecem automaticamente após 24 horas
- **Visibilidade**: Visíveis para todos os seus contatos (ou lista personalizada)
- **Múltiplos formatos**: Suportam texto, imagem e vídeo
- **Engajamento**: Permitem interação através de respostas
- **Tempo real**: Ideal para compartilhar atualizações imediatas

**Por que usar status programaticamente?**

- **Automação de marketing**: Publicar promoções e ofertas automaticamente
- **Atualizações de negócio**: Compartilhar novidades e informações importantes
- **Engajamento**: Manter contatos informados sobre atividades
- **Conteúdo visual**: Compartilhar imagens e vídeos de forma temporária
- **Integração com sistemas**: Publicar status baseado em eventos de sistemas externos

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis

A API de status oferece os seguintes endpoints, cada um documentado em sua própria página:

### <Icon name="Send" size="sm" /> Operações de Publicação

- **[Enviar status de texto](/docs/status/enviando-texto)**: Publique um status apenas com texto formatado. Ideal para mensagens curtas e diretas.

- **[Enviar status de imagem](/docs/status/enviando-imagem)**: Publique um status com imagem e legenda opcional. Perfeito para conteúdo visual e marketing.

- **[Enviar status de vídeo](/docs/status/enviando-video)**: Publique um status com vídeo e legenda opcional. Ideal para demonstrações e conteúdo dinâmico.

### <Icon name="Reply" size="sm" /> Operações de Interação

- **[Responder status](/docs/status/responder-texto)**: Responda a um status de outro usuário. Permite interação e engajamento com status de contatos.

---

## <Icon name="BookOpen" size="md" /> Conceitos Fundamentais

### <Icon name="CircleDashed" size="sm" /> Ciclo de Vida de um Status

**Publicação:**

Quando você publica um status, ele fica imediatamente visível para seus contatos (ou lista personalizada, se configurado).

**Visibilidade:**

Status são visíveis por 24 horas a partir do momento da publicação. Durante este período, contatos podem visualizar e interagir com o status.

**Expiração:**

Após 24 horas, o status é automaticamente removido pelo WhatsApp. Esta remoção é permanente e não pode ser revertida.

**Importante:**

Uma vez que um status expira, ele não pode ser recuperado. Se precisar manter o conteúdo, certifique-se de ter uma cópia antes da expiração.

### <Icon name="List" size="sm" /> Tipos de Status Disponíveis

O WhatsApp suporta três tipos principais de status, cada um com características específicas:

**Status de Texto:**

Status contendo apenas texto formatado. Ideal para mensagens curtas, citações ou atualizações rápidas.

**Características:**
- Suporta formatação básica (negrito, itálico)
- Sem limite de caracteres específico (mas recomenda-se manter conciso)
- Carregamento instantâneo
- Compatível com todos os dispositivos

**Status de Imagem:**

Status contendo uma imagem com legenda opcional. Perfeito para conteúdo visual, promoções e informações gráficas.

**Características:**
- Formatos suportados: JPG, JPEG, PNG, WEBP
- Tamanho máximo: 16MB (recomendado: < 5MB para melhor performance)
- Legenda opcional para contexto adicional
- Alta taxa de engajamento

**Status de Vídeo:**

Status contendo um vídeo com legenda opcional. Ideal para demonstrações, tutoriais e conteúdo dinâmico.

**Características:**
- Formatos suportados: MP4, 3GP
- Duração máxima: 16 segundos
- Tamanho máximo: 16MB
- Legenda opcional para contexto
- Alto potencial de engajamento

---

## <Icon name="AlertTriangle" size="md" /> Limitações e Restrições

É fundamental compreender as limitações do sistema de status para implementar soluções robustas e evitar problemas.

### <Icon name="Timer" size="sm" /> Limitações Temporais

**Expiração automática:**

Status expiram automaticamente após exatamente 24 horas a partir do momento da publicação. Esta é uma limitação do WhatsApp e não pode ser alterada.

**Limite diário:**

Você pode publicar no máximo **30 status por dia**. Este limite é aplicado por conta do WhatsApp e não pode ser aumentado.

**Implicações práticas:**

- Planeje sua estratégia de publicação considerando o limite diário
- Priorize conteúdo mais importante se precisar publicar múltiplos status
- Implemente sistemas de fila se precisar publicar mais de 30 status
- Monitore o número de status publicados para evitar atingir o limite

### <Icon name="Video" size="sm" /> Limitações de Mídia

**Vídeos:**

- **Duração máxima**: 16 segundos
- **Tamanho máximo**: 16MB
- **Formatos suportados**: MP4, 3GP

**Imagens:**

- **Tamanho máximo**: 16MB
- **Formatos suportados**: JPG, JPEG, PNG, WEBP
- **Recomendação**: Use imagens menores que 5MB para melhor performance

**Boas práticas:**

- Otimize mídia antes de publicar para reduzir tamanho
- Use compressão de vídeo para manter qualidade dentro do limite de 16 segundos
- Teste formatos e tamanhos antes de publicar em produção
- Implemente validação de tamanho e duração antes de enviar

:::warning Respeite os Limites
Respeitar os limites de status é essencial para evitar erros e bloqueios. Sempre valide conteúdo antes de publicar: máximo de 30 status por dia, vídeos com até 16 segundos, e mídia dentro dos limites de tamanho. Implemente validações e sistemas de fila para gerenciar publicações dentro dessas restrições.
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos

Agora que você compreende os conceitos fundamentais da API de status, siga estes caminhos de aprendizado:

### <Icon name="PlayCircle" size="sm" /> Para Iniciantes

1. **[Enviar seu primeiro status](/docs/status/enviando-texto)**: Aprenda a publicar status de texto
2. **[Criar status com mídia](/docs/status/enviando-imagem)**: Compreenda como publicar imagens e vídeos
3. **[Interagir com status](/docs/status/responder-texto)**: Aprenda a responder status de outros usuários

### <Icon name="Code2" size="sm" /> Para Pessoas Desenvolvedoras

1. **Automação de publicação**: Implemente sistemas que publicam status automaticamente
2. **Validação de conteúdo**: Crie validações para garantir que conteúdo está dentro dos limites
3. **Sistemas de fila**: Implemente filas para gerenciar publicações dentro do limite diário

### <Icon name="Target" size="sm" /> Casos de Uso Comuns

- **Marketing automatizado**: Publicar promoções e ofertas automaticamente
- **Atualizações de negócio**: Compartilhar novidades e informações importantes
- **Conteúdo visual**: Compartilhar imagens e vídeos de forma temporária
- **Engajamento**: Manter contatos informados sobre atividades

Cada página de operação inclui exemplos completos de código, estruturas de requisição/resposta e casos de uso práticos. Comece com operações simples e expanda conforme sua necessidade cresce.
