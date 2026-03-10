---
id: introducao
title: Entendendo Webhooks
sidebar_position: 1
---

# <Icon name="Webhook" size="lg" /> Entendendo Webhooks

Webhooks são o mecanismo fundamental que permite ao Z-API notificar seu sistema automaticamente em tempo real sempre que um evento importante ocorre na sua conta do WhatsApp. Esta seção explica o conceito, a importância e como implementar webhooks de forma eficiente.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para fornecer compreensão completa sobre webhooks:

- **Conceitos fundamentais**: O que são webhooks e por que são essenciais
- **Comparação com polling**: Entendendo a diferença e quando usar cada abordagem
- **Implementação prática**: Como configurar e receber webhooks
- **Segurança**: Validação e proteção de endpoints
- **Tipos de eventos**: Todos os eventos disponíveis e quando são acionados
- **Boas práticas**: Recomendações para implementações robustas e escaláveis

## <Icon name="Target" size="md" /> O Problema que Webhooks Resolvem

### <Icon name="QuestionCircle" size="sm" /> O Desafio da Comunicação em Tempo Real

Imagine que você precisa saber quando recebe uma nova mensagem no WhatsApp para processá-la automaticamente. Sem webhooks, você teria duas opções:

### Opção 1: Polling (Consulta Periódica)

Sua aplicação faria requisições constantes à API do Z-API perguntando "há mensagens novas?" a cada poucos segundos. Esta abordagem, conhecida como **polling**, apresenta problemas significativos:

- **Ineficiência de recursos**: Muitas requisições sem resultados (quando não há mensagens novas)
- **Atrasos na detecção**: Pode levar até 30 segundos ou mais para detectar um evento
- **Sobrecarga no servidor**: Aumenta carga desnecessária tanto no seu servidor quanto no servidor da API
- **Consumo de largura de banda**: Requisições constantes consomem recursos de rede

### Opção 2: Webhooks (Notificações Proativas)

Com webhooks, o Z-API envia automaticamente uma notificação para seu servidor no exato momento em que um evento acontece. Você não precisa perguntar - o Z-API te avisa. Esta abordagem transforma sua aplicação de **reativa** (você consulta a API) para **proativa** (a API notifica você).

### <Icon name="CheckCircle" size="sm" /> Por Que Webhooks São Essenciais

Webhooks são fundamentais para automações eficientes por várias razões:

- <Icon name="Clock" size="xs" /> **Tempo Real**: Resposta instantânea a eventos, sem atrasos de polling. Suas automações podem reagir imediatamente quando algo acontece.

- <Icon name="Cpu" size="xs" /> **Eficiência**: Reduz drasticamente o número de requisições à API. Você só recebe notificações quando há eventos reais, não precisa fazer consultas constantes.

- <Icon name="TrendingUp" size="xs" /> **Escalabilidade**: Permite processar milhares de eventos sem sobrecarregar o sistema. A carga é distribuída naturalmente conforme eventos ocorrem.

- <Icon name="Zap" size="xs" /> **Base para Automação**: Fundamental para chatbots, sistemas de suporte, CRMs e integrações complexas. Sem webhooks, criar automações reativas seria praticamente inviável.

:::tip Conceito Fundamental
**Webhooks = Automação Proativa**: Em vez de sua aplicação fazer polling constante (perguntar repetidamente "há algo novo?"), os webhooks entregam eventos instantaneamente quando acontecem. Esta é a diferença fundamental entre uma automação básica e uma automação verdadeiramente inteligente e eficiente.
:::

---

:::info Artigos Explicativos
Para explicações didáticas sobre webhooks usando analogias práticas e acessíveis:

- **[Webhooks vs Polling: Por Que Esperar é Mais Eficiente Que Ficar Perguntando](/blog/webhooks-vs-polling-por-que-esperar-e-mais-eficiente)**: Entenda por que webhooks são muito mais eficientes que polling, com explicação simples e prática
- **[Webhooks Explicados: A Metáfora do Garçom para Automações em Tempo Real](/blog/webhooks-metáfora-garçom)**: Explicação didática usando analogia do garçom de restaurante
:::

---

## <Icon name="Code2" size="md" /> Como Funcionam os Webhooks Tecnicamente

### <Icon name="Network" size="sm" /> Arquitetura de Comunicação

Webhooks implementam um padrão de comunicação **push-based** (baseado em push), onde o servidor (Z-API) inicia a comunicação enviando dados para o cliente (seu sistema), em vez do cliente ter que solicitar informações.

**Fluxo básico:**

1. **Configuração inicial**: Você registra uma URL pública em seu servidor no painel do Z-API

2. **Evento ocorre**: Algo acontece na sua instância do WhatsApp (nova mensagem, mudança de status, etc.)

3. **Z-API detecta**: O Z-API identifica o evento e prepara os dados

4. **Notificação enviada**: O Z-API faz uma requisição HTTP POST para sua URL com os dados do evento

5. **Seu sistema processa**: Seu servidor recebe, valida e processa a notificação

6. **Confirmação**: Seu servidor responde com status HTTP 200 para confirmar recebimento

### <Icon name="Shield" size="sm" /> Características Técnicas Importantes

**Protocolo HTTP:**

- Webhooks usam requisições HTTP POST padrão
- Suportam HTTPS para comunicação segura (altamente recomendado)
- Seguem padrões RESTful de comunicação

**Formato de dados:**

- Payloads são enviados em formato JSON
- Estrutura consistente entre diferentes tipos de eventos
- Incluem metadados como timestamp, instanceId e tipo de evento

**Confiabilidade:**

- O Z-API tenta reenviar webhooks que falharam (retry automático)
- Timeout configurável para respostas
- Logs de tentativas de entrega disponíveis

**Segurança:**

- Validação através de token no header `x-token`
- Suporte a HTTPS para criptografia em trânsito
- Validação de origem recomendada

---

## <Icon name="Puzzle" size="md" /> Implementação para Plataformas No-Code

Webhooks são fundamentais para criar automações reativas em plataformas no-code como n8n, Make, Zapier e outras. Eles funcionam como triggers que iniciam fluxos de trabalho automaticamente quando eventos acontecem.

**Processo básico:**

1. Criar nó webhook na sua ferramenta (gera URL pública)

2. Configurar a URL no painel do Z-API

3. Construir fluxo de trabalho processando os dados recebidos

:::info Tutorial Completo
Para um guia passo a passo completo sobre configuração de webhooks em plataformas no-code, incluindo exemplos práticos e diagramas de fluxo, consulte o artigo: [Configurando Webhooks do Z-API em Plataformas No-Code: Um Guia Completo](/blog/webhooks-no-code-completo).
:::

---

## <Icon name="Code2" size="md" /> Implementação para Pessoas Desenvolvedoras

Para receber webhooks, você precisa expor um endpoint HTTP público no seu servidor que possa receber requisições POST. Esta seção explica os aspectos técnicos da implementação.

### <Icon name="Server" size="sm" /> Requisitos do Endpoint

Seu endpoint webhook deve atender aos seguintes requisitos:

- **Acessibilidade pública**: A URL deve ser acessível via internet (não pode ser localhost ou rede privada)

- **Protocolo HTTPS**: Altamente recomendado para segurança (alguns serviços exigem)

- **Método HTTP POST**: Webhooks usam exclusivamente requisições POST

- **Resposta rápida**: Deve responder com status HTTP 200 em poucos segundos (recomendado: < 3 segundos)

- **Validação de token**: Deve validar o header `x-token` para segurança

### <Icon name="ListTree" size="sm" /> Fluxo Técnico Detalhado

O processo completo de um webhook segue estas etapas:

1. <Icon name="MessageSquare" size="xs" /> **Evento Ocorre**: Uma nova mensagem é recebida na sua instância do WhatsApp, ou outro evento acontece (mudança de status, conexão, etc.)

2. <Icon name="Webhook" size="xs" /> **Z-API Processa**: O Z-API detecta o evento, coleta todos os dados relevantes e monta um payload JSON estruturado

3. <Icon name="Send" size="xs" /> **Requisição HTTP POST**: O Z-API faz uma requisição POST para a URL que você configurou no painel, incluindo:
   - Headers HTTP (incluindo `x-token` para validação)
   - Body JSON com os dados do evento
   - Timeout configurável (geralmente 30 segundos)

4. <Icon name="Terminal" size="xs" /> **Seu Servidor Processa**: Seu servidor deve executar estas ações em ordem:

   - <Icon name="ShieldCheck" size="xs" /> **Validar a requisição**: Verificar o token `x-token` no header para garantir autenticidade
   - <Icon name="Database" size="xs" /> **Processar os dados**: Executar sua lógica de negócio (salvar no banco de dados, acionar outras APIs, processar comandos, etc.)
   - <Icon name="CircleCheck" size="xs" /> **Responder rapidamente**: Retornar status HTTP 200 OK o mais rápido possível

:::warning Resposta Rápida é Crítica
Seu endpoint deve responder com `200 OK` em poucos segundos (recomendado: < 3 segundos). Se o Z-API não receber uma resposta de sucesso dentro do timeout, ele assumirá que a entrega falhou e tentará reenviar o webhook. Isso pode causar processamento duplicado.

**Solução para operações demoradas:**

- Use processamento assíncrono (filas, workers em background)

- Responda 200 OK imediatamente após validar

- Processe os dados em background após responder

- Use sistemas de fila como RabbitMQ, Redis Queue, AWS SQS, etc.
:::

### <Icon name="FileText" size="sm" /> Estrutura Padrão de um Webhook

Todo webhook enviado pelo Z-API segue uma estrutura JSON consistente, facilitando o processamento e a validação em seu sistema.

**Estrutura base:**

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    // Dados específicos do tipo de evento
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Campos da estrutura:**

- **`event`** (string): Tipo de evento que ocorreu. Valores comuns incluem:
  - `message`: Nova mensagem recebida
  - `message.status`: Mudança de status de uma mensagem enviada
  - `instance.connected`: Instância conectada
  - `instance.disconnected`: Instância desconectada
  - E outros tipos específicos documentados em cada seção

- **`instanceId`** (string): Identificador único da instância do WhatsApp onde o evento ocorreu. Útil quando você gerencia múltiplas instâncias.

- **`data`** (objeto): Contém os dados específicos do evento. A estrutura varia conforme o tipo de evento:
  - Para eventos de mensagem: dados da mensagem (texto, remetente, mídia, etc.)
  - Para eventos de status: informações sobre o status (messageId, status anterior, status novo)
  - Para eventos de conexão: informações sobre o estado da conexão

- **`timestamp`** (string ISO 8601): Data e hora UTC em que o evento ocorreu, no formato ISO 8601. Exemplo: `2024-01-01T12:00:00Z`

**Exemplo completo (mensagem recebida):**

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "message": "Olá, preciso de ajuda",
    "timestamp": "2024-01-01T12:00:00Z",
    "isGroup": false
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

:::info Consistência da Estrutura
Todos os webhooks seguem esta estrutura base consistente, independentemente do tipo de evento. Isso facilita a criação de processadores genéricos que podem lidar com múltiplos tipos de eventos de forma unificada.
:::

### <Icon name="Shield" size="sm" /> Segurança: Validação do Token `x-token`

**Por que a validação é essencial:**

Qualquer pessoa com conhecimento da sua URL de webhook pode enviar requisições para ela. Sem validação, sua URL está vulnerável a:

- Requisições maliciosas com dados falsos

- Ataques de negação de serviço (DoS)

- Injeção de dados inválidos no seu sistema

- Consumo indevido de recursos do servidor

**Como o Z-API protege:**

O Z-API envia um **token de segurança** em cada requisição webhook, no cabeçalho HTTP `x-token`. Este token é único para sua instância e é configurado no painel do Z-API.

**Implementação da validação:**

Seu código deve **sempre** verificar se o token recebido corresponde ao token configurado:

```javascript
// Exemplo em Node.js/Express
app.post('/webhook', (req, res) => {
  const receivedToken = req.headers['x-token'];
  const expectedToken = process.env.ZAPI_WEBHOOK_TOKEN;
  
  if (receivedToken !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Processar webhook apenas se token for válido
  // ... sua lógica aqui
});
```

**O que fazer se o token não corresponder:**

- Retornar status HTTP 401 (Unauthorized)
- Não processar os dados recebidos
- Registrar tentativa de acesso não autorizado (para auditoria)
- Opcionalmente, bloquear o IP de origem após múltiplas tentativas

:::warning Segurança Crítica
Nunca processe webhooks sem validar o token `x-token`. Esta é a única forma de garantir que as requisições realmente vieram do Z-API. Sem esta validação, sua URL está completamente vulnerável a requisições maliciosas que podem comprometer seu sistema.
:::

---

## <Icon name="ListTree" size="md" /> Tipos de Webhooks Disponíveis

O Z-API oferece webhooks para diversos tipos de eventos. Cada tipo possui sua própria documentação detalhada com estrutura de dados específica, exemplos e casos de uso.

### <Icon name="MessageSquare" size="sm" /> Eventos de Mensagens

- **[Ao Receber Mensagem](./ao-receber)**: Acionado sempre que uma nova mensagem é recebida na sua instância. Este é o webhook mais comum e fundamental para chatbots e sistemas de atendimento.

- **[Status da Mensagem](./status-mensagem)**: Notifica mudanças no status de mensagens que você enviou. Permite rastrear quando mensagens são enviadas, entregues, lidas ou falham.

### <Icon name="Smartphone" size="sm" /> Eventos de Instância

- **[Status da Conexão](./ao-conectar)**: Notifica quando sua instância se conecta ao WhatsApp. Essencial para monitoramento e tratamento de conexões.

- **[Status da Desconexão](./ao-desconectar)**: Notifica quando sua instância se desconecta do WhatsApp. Útil para implementar sistemas de reconexão automática.

:::info Grupos e Comunidades
Para informações sobre eventos de grupos e comunidades, consulte a seção de [Grupos](/docs/groups/introducao) e [Comunidades](/docs/communities/introducao).
:::

### <Icon name="Settings" size="sm" /> Outros Eventos

Explore a barra lateral para ver todos os tipos de webhook disponíveis, cada um com documentação completa incluindo:

- Estrutura exata do payload
- Exemplos de código para processamento
- Casos de uso práticos
- Tratamento de erros específicos

---

## <Icon name="CheckCircle" size="md" /> Próximos Passos

Agora que você compreende os conceitos fundamentais de webhooks:

1. **Escolha o tipo de evento** que deseja monitorar
2. **Configure sua URL** no painel do Z-API
3. **Implemente o endpoint** no seu servidor ou plataforma no-code
4. **Valide o token** `x-token` para segurança
5. **Processe os dados** recebidos conforme sua necessidade
6. **Teste e itere** baseado nos resultados

Cada página de tipo de webhook inclui exemplos completos e funcionais. Comece com eventos simples (como recebimento de mensagens) e expanda conforme sua necessidade cresce.
