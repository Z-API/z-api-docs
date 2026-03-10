---
id: introducao
title: Contatos
sidebar_position: 1
---

# <Icon name="Contact" size="lg" /> Gerenciamento de Contatos

Esta seção documenta a API de contatos do Z-API, que permite gerenciar sua lista de contatos do WhatsApp de forma programática e automatizada. Aqui você aprenderá a adicionar, remover, validar e obter informações sobre contatos através de endpoints RESTful.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para fornecer conhecimento completo sobre gerenciamento de contatos:

- **Conceitos fundamentais**: Entendendo a estrutura de contatos no WhatsApp e no Z-API
- **Operações básicas**: Adicionar, remover e listar contatos
- **Validação de números**: Verificar se números estão registrados no WhatsApp
- **Obtenção de informações**: Recuperar metadados e fotos de perfil
- **Gerenciamento de bloqueios**: Controlar quem pode enviar mensagens
- **Boas práticas**: Recomendações para operações eficientes e seguras

## <Icon name="Target" size="md" /> Visão Geral e Contexto

### <Icon name="Info" size="sm" /> O Que é a API de Contatos

A API de contatos do Z-API oferece controle programático completo sobre sua lista de contatos do WhatsApp. Através de endpoints RESTful, você pode realizar operações que normalmente seriam feitas manualmente através da interface do aplicativo.

**Por que gerenciar contatos programaticamente?**

- **Automação de processos**: Adicionar contatos em massa de sistemas externos (CRMs, planilhas, bancos de dados)
- **Validação prévia**: Verificar se números estão no WhatsApp antes de enviar mensagens, melhorando taxas de entrega
- **Sincronização**: Manter sua lista de contatos sincronizada com outros sistemas
- **Gestão de bloqueios**: Implementar sistemas automáticos de moderação e controle de spam
- **Enriquecimento de dados**: Obter informações adicionais sobre contatos (foto, nome, status)

### <Icon name="ListChecks" size="sm" /> Capacidades da API

A API de contatos permite realizar as seguintes operações essenciais:

- **Listagem**: Obter todos os contatos da sua instância
- **Adição**: Adicionar novos contatos à sua agenda
- **Remoção**: Remover contatos que não são mais necessários
- **Validação**: Verificar se números estão registrados no WhatsApp
- **Validação em lote**: Validar múltiplos números simultaneamente
- **Metadados**: Recuperar informações detalhadas sobre contatos
- **Fotos de perfil**: Obter imagens de perfil dos contatos
- **Bloqueios**: Gerenciar lista de contatos bloqueados
- **Denúncias**: Reportar contatos por comportamento inadequado

---

## <Icon name="ListChecks" size="md" /> Operações Disponíveis

A API de contatos oferece os seguintes endpoints, cada um documentado em sua própria página:

### <Icon name="List" size="sm" /> Operações de Consulta

- **[Obter contatos](/docs/contacts/pegar-contatos)**: Liste todos os contatos da sua instância do WhatsApp. Útil para sincronização, backup ou análise de sua lista de contatos.

- **[Obter metadata](/docs/contacts/metadata)**: Recupere informações detalhadas sobre um contato específico, incluindo nome, status, última vez visto e outros metadados disponíveis.

- **[Obter imagem](/docs/contacts/imagem)**: Recupere a foto de perfil de um contato. Útil para enriquecer interfaces ou sistemas de identificação visual.

### <Icon name="UserPlus" size="sm" /> Operações de Modificação

- **[Adicionar contato](/docs/contacts/adicionar)**: Adicione um novo contato à sua agenda do WhatsApp. Essencial para importar contatos de sistemas externos ou criar contatos programaticamente.

- **[Remover contato](/docs/contacts/remover)**: Remova um contato da sua lista. Útil para limpeza periódica ou remoção de contatos inativos.

### <Icon name="CircleCheck" size="sm" /> Operações de Validação

- **[Validar número](/docs/contacts/numero-whatsapp)**: Verifique se um número de telefone está registrado no WhatsApp. Fundamental para melhorar taxas de entrega e evitar erros.

- **[Validar números em lote](/docs/contacts/validar-lote)**: Valide múltiplos números simultaneamente. Ideal para processar listas grandes antes de campanhas de envio.

### <Icon name="Shield" size="sm" /> Operações de Segurança e Moderação

- **[Bloquear contato](/docs/contacts/bloquear)**: Bloqueie um contato para evitar receber mensagens dele. Essencial para sistemas de moderação e controle de spam.

- **[Denunciar contato](/docs/contacts/denunciar)**: Reporte um contato por comportamento inadequado ao WhatsApp. Útil para sistemas de denúncia automatizados.

---

## <Icon name="BookOpen" size="md" /> Conceitos Fundamentais

### <Icon name="Phone" size="sm" /> Formato de Número de Telefone

**Regra universal:**

Todos os endpoints da API de contatos (e da API do Z-API em geral) requerem números de telefone no **formato internacional completo**, sem espaços, hífens, parênteses ou outros caracteres especiais.

**Estrutura do formato:**

O formato correto é: `[código do país][DDD][número]`, tudo concatenado.

**Exemplos práticos:**

| País | Código | DDD | Número | Formato Correto | Formato Incorreto |
|------|--------|-----|--------|-----------------|-------------------|
| Brasil | +55 | 11 | 999999999 | `5511999999999` | `+55 11 99999-9999` |
| Brasil | +55 | 21 | 987654321 | `5521987654321` | `(21) 98765-4321` |
| EUA | +1 | 415 | 5551234 | `14155551234` | `+1 (415) 555-1234` |

**Por que este formato é obrigatório?**

- **Consistência**: Facilita processamento e validação
- **Internacionalização**: Suporta números de qualquer país
- **Eficiência**: Reduz necessidade de parsing e normalização
- **Compatibilidade**: Alinhado com padrões do WhatsApp

**Como converter números para o formato correto:**

Se você recebe números em formatos variados, implemente uma função de normalização:

```javascript
function normalizarNumero(numero) {
  // Remove todos os caracteres não numéricos
  return numero.replace(/\D/g, '');
}

// Exemplos
normalizarNumero('+55 11 99999-9999'); // '5511999999999'
normalizarNumero('(11) 99999-9999');   // '11999999999' (falta código do país)
```

:::warning Atenção ao Código do País
Sempre inclua o código do país. Números sem código do país serão interpretados incorretamente. Por exemplo, `11999999999` (sem +55) será tratado como número dos EUA, não do Brasil.
:::

### <Icon name="ShieldCheck" size="sm" /> Validação de Números

**Por que validar números é importante:**

Antes de enviar mensagens ou adicionar contatos, é fundamental verificar se o número está registrado no WhatsApp. A validação oferece vários benefícios:

- **Melhora taxa de entrega**: Evita tentativas de envio para números inválidos
- **Reduz erros**: Previne falhas e exceções no seu código
- **Economiza recursos**: Não desperdiça requisições com números inválidos
- **Evita bloqueios**: Reduz risco de bloqueio por padrões de uso suspeitos
- **Melhora experiência**: Usuários recebem mensagens apenas de números válidos

**Quando validar:**

- **Antes de campanhas**: Valide listas completas antes de envios em massa
- **Antes de adicionar contatos**: Verifique se o número existe antes de adicionar
- **Em formulários**: Valide números fornecidos por usuários antes de processar
- **Em sincronizações**: Valide números importados de sistemas externos

**Estratégias de validação:**

1. **Validação individual**: Use o endpoint de validação único para números específicos
2. **Validação em lote**: Use o endpoint de validação em lote para processar listas grandes
3. **Cache de validação**: Armazene resultados de validação para evitar revalidações desnecessárias
4. **Revalidação periódica**: Números podem ser desativados; revalide periodicamente listas importantes

:::tip Boa Prática: Validação em Lote
Para campanhas de envio, sempre valide números em lote antes de iniciar. Isso melhora significativamente a taxa de entrega, reduz erros e ajuda a evitar bloqueios. Processe a validação em background e use apenas números válidos confirmados para envio.
:::

---

## <Icon name="Rocket" size="md" /> Próximos Passos

Agora que você compreende os conceitos fundamentais da API de contatos, siga estes caminhos de aprendizado:

### <Icon name="PlayCircle" size="sm" /> Para Iniciantes

1. **[Adicionar seu primeiro contato](/docs/contacts/adicionar)**: Aprenda a adicionar contatos programaticamente
2. **[Validar números](/docs/contacts/numero-whatsapp)**: Compreenda como verificar se números estão no WhatsApp
3. **[Obter informações de contatos](/docs/contacts/metadata)**: Aprenda a recuperar dados sobre contatos

### <Icon name="Code2" size="sm" /> Para Pessoas Desenvolvedoras

1. **[Validação em lote](/docs/contacts/validar-lote)**: Implemente validação eficiente para listas grandes
2. **[Gerenciamento de bloqueios](/docs/contacts/bloquear)**: Crie sistemas de moderação automatizados
3. **[Sincronização de contatos](/docs/contacts/pegar-contatos)**: Implemente sincronização com sistemas externos

### <Icon name="Target" size="sm" /> Casos de Uso Comuns

- **Importação de CRMs**: Sincronize contatos de sistemas de gestão de relacionamento
- **Validação pré-campanha**: Valide listas antes de envios em massa
- **Sistemas de moderação**: Implemente bloqueios automáticos baseados em regras
- **Enriquecimento de dados**: Obtenha fotos e metadados para enriquecer bases de dados

Cada página de operação inclui exemplos completos de código, estruturas de requisição/resposta e casos de uso práticos. Comece com operações simples e expanda conforme sua necessidade cresce.
