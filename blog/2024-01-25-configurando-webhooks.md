---
slug: configurando-webhooks
title: "Configurando Webhooks no Z-API: Receba Notificações em Tempo Real"
authors: [zapi-central]
tags: [webhooks, integração, tutorial]
featured: true
category: Tutorial
summary: Webhooks são essenciais para criar integrações robustas com o Z-API. Aprenda como configurá-los para receber notificações em tempo real!
description: "Aprenda a configurar webhooks no Z-API: tipos de eventos, criação de endpoint, segurança e melhores práticas para processamento em tempo real."
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---

Webhooks são essenciais para criar integrações robustas com o Z-API. Aprenda como configurá-los para receber notificações em tempo real! Pense neles como a "campainha" do seu sistema: quando um evento ocorre, o Z‑API toca a campainha no seu endpoint — você valida, registra e processa.

<!-- truncate -->

## O que são Webhooks? {#o-que-sao-webhooks}

Webhooks são callbacks HTTP que o Z-API envia para sua aplicação quando eventos específicos ocorrem, como:

- 📨 Mensagens recebidas
- Status de entrega de mensagens
- 🔌 Conexão/desconexão da instância
- 💬 Atualizações de chat

## Por que usar Webhooks? {#por-que-usar-webhooks}

Ao invés de ficar fazendo polling (consultas periódicas), os webhooks permitem uma arquitetura mais eficiente e responsiva:

- Resposta em tempo real
- Menos requisições à API
- 💰 Economia de recursos
- Melhor experiência do usuário

## Tipos de Webhooks {#tipos-de-webhooks}

O Z-API suporta vários tipos de webhooks:

### 1. Webhook de Mensagens Recebidas {#1-webhook-de-mensagens-recebidas}

Receba notificações quando alguém enviar mensagem para sua instância.

### 2. Webhook de Status de Mensagem {#2-webhook-de-status-de-mensagem}

Acompanhe o status de entrega e leitura das mensagens enviadas.

### 3. Webhook de Conexão {#3-webhook-de-conexao}

Seja notificado quando a instância conectar ou desconectar.

### 4. Webhook de Chat {#4-webhook-de-chat}

Receba atualizações sobre mudanças nos chats.

## Configurando um Webhook {#configurando-um-webhook}

### Passo 1: Criar Endpoint {#passo-1-criar-endpoint}

Primeiro, você precisa criar um endpoint HTTP que receberá os webhooks. Abaixo, um handler Express enxuto com validação básica e roteamento por tipo de evento:

```javascript
// Exemplo com Express.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
 const { event, instanceId, data } = req.body;
 
 console.log('Evento recebido:', event);
 console.log('Dados:', data);
 
 // Processar o evento
 switch(event) {
 case 'message':
 console.log('Nova mensagem recebida:', data);
 break;
 case 'status':
 console.log('Status atualizado:', data);
 break;
 case 'connected':
 console.log('Instância conectada!');
 break;
 }
 
 res.status(200).json({ status: 'OK' });
});

app.listen(3000, () => {
 console.log('Webhook server rodando na porta 3000');
});
```

### Passo 2: Expor seu Endpoint {#passo-2-expor-seu-endpoint}

Para receber webhooks, seu servidor precisa estar acessível publicamente. Em desenvolvimento, use um túnel; em produção, prefira infraestrutura gerenciada com TLS:

- Servidor próprio com IP público
- Serviços como Heroku, Railway, Render
- Túneis como ngrok (para desenvolvimento)

**Exemplo com ngrok (desenvolvimento):**

```bash
ngrok http 3000
```

Isso gerará uma URL pública como: `https://abc123.ngrok.io`

### Passo 3: Configurar no Z-API {#passo-3-configurar-no-z-api}

Agora configure o webhook no Z-API informando a URL pública e o token que você validará no header `x-token`:

```http
PUT https://api.z-api.io/instances/{instanceId}/webhook/on-receive
Headers:
 Client-Token: seu-token-aqui
 Content-Type: application/json

Body:
{
 "url": "https://seu-servidor.com/webhook",
 "token": "seu-token-secreto-aqui"
}
```

### Passo 4: Validar Token {#passo-4-validar-token}

Sempre valide o token para garantir segurança. Em produção, prefira comparação em tempo constante e, quando possível, whitelisting de IP:

```javascript
app.post('/webhook', (req, res) => {
 const token = req.headers['x-token'];
 const expectedToken = process.env.WEBHOOK_TOKEN;
 
 if (token !== expectedToken) {
 return res.status(401).json({ error: 'Unauthorized' });
 }
 
 // Processar webhook...
});
```

## Exemplo Completo {#exemplo-completo}

Aqui está um exemplo completo de servidor de webhook, com middleware de autenticação, roteamento por evento e tratamento de erros:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

// Middleware de autenticação
const authenticateWebhook = (req, res, next) => {
 const token = req.headers['x-token'];
 
 if (token !== WEBHOOK_TOKEN) {
 return res.status(401).json({ error: 'Token inválido' });
 }
 
 next();
};

app.post('/webhook', authenticateWebhook, (req, res) => {
 const { event, instanceId, data } = req.body;
 
 try {
 switch(event) {
 case 'message':
 handleMessage(data);
 break;
 case 'status':
 handleStatus(data);
 break;
 case 'connected':
 handleConnected(instanceId);
 break;
 case 'disconnected':
 handleDisconnected(instanceId);
 break;
 }
 
 res.status(200).json({ status: 'OK' });
 } catch (error) {
 console.error('Erro ao processar webhook:', error);
 res.status(500).json({ error: 'Erro interno' });
 }
});

function handleMessage(data) {
 const { phone, message, messageId } = data;
 console.log(`Nova mensagem de ${phone}: ${message}`);
 
 // Aqui você pode:
 // - Salvar no banco de dados
 // - Enviar resposta automática
 // - Processar comandos
 // - etc.
}

function handleStatus(data) {
 const { messageId, status } = data;
 console.log(`Mensagem ${messageId} agora está: ${status}`);
 
 // Atualizar status no banco de dados
}

function handleConnected(instanceId) {
 console.log(`Instância ${instanceId} conectada!`);
}

function handleDisconnected(instanceId) {
 console.log(`Instância ${instanceId} desconectada!`);
}

app.listen(3000, () => {
 console.log('Webhook server rodando na porta 3000');
});
```

## Boas Práticas {#boas-praticas}

### 1. Sempre Valide o Token {#1-sempre-valide-o-token}

Nunca confie em requisições sem validação adequada.

### 2. Use HTTPS {#2-use-https}

Sempre use HTTPS em produção para proteger os dados.

### 3. Implemente Retry Logic {#3-implemente-retry-logic}

O Z-API tentará reenviar webhooks que falharem, mas implemente sua própria lógica de retry.

### 4. Processe Assincronamente {#4-processe-assincronamente}

Processe webhooks de forma assíncrona para responder rapidamente. Responda 200 OK e mova o trabalho pesado para um worker/fila:

```javascript
app.post('/webhook', authenticateWebhook, async (req, res) => {
 // Responde imediatamente
 res.status(200).json({ status: 'OK' });
 
 // Processa em background
 processWebhookAsync(req.body);
});
```

### 5. Logs e Monitoramento {#5-logs-e-monitoramento}

Mantenha logs de todos os webhooks recebidos para debugging.

## Testando Webhooks {#testando-webhooks}

Use ferramentas como:

- **Postman**: Para testar manualmente
- **Webhook.site**: Para receber webhooks temporários
- **ngrok**: Para expor servidor local

## Conclusão {#conclusao}

Webhooks são fundamentais para criar integrações robustas com o Z-API. Com eles, você pode:

- Receber notificações em tempo real
- Reduzir carga no servidor
- Criar experiências mais responsivas
- Integrar facilmente com outros sistemas

Feche o ciclo implementando idempotência (use `messageId`/`eventId`) e correlação com logs/trace para garantir consistência mesmo com reentregas. Para mais informações, consulte a [documentação completa de webhooks](/docs/webhooks/introducao).
