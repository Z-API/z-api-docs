---
id: contato
title: Enviar contato
sidebar_position: 16
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="User" size="lg" /> Enviar contato

Envie informações de contato para um destinatário usando a API do Z-API. O destinatário pode salvar o contato diretamente no WhatsApp.

**Simples e objetivo:** Este método permite você enviar um contato. Você não precisa ter ele em seus contatos, basta preencher os atributos do método com as informações do contato e enviar.

![Exemplo de mensagem com contato](/img/send-message-contact.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-contact
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

**Exemplo mínimo (apenas campos obrigatórios):**

```json
{
  "phone": "5511999999999",
  "contactName": "Z-API Contato",
  "contactPhone": "554498398733"
}
```

**Exemplo completo (com todos os parâmetros opcionais):**

```json
{
  "phone": "5511999999999",
  "contactName": "Z-API Contato",
  "contactPhone": "554498398733",
  "contactBusinessDescription": "Breve descrição sobre o contato",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|---------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. |
| `contactName` | string | Sim | Nome do contato que você quer compartilhar. |
| `contactPhone` | string | Sim | Telefone do contato que você quer compartilhar. Deve estar no formato DDI + DDD + NÚMERO. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|---------|--------|-------------|--------------------------------------------------|
| `messageId` | string | Não | Permite responder uma mensagem existente no chat, criando uma conversa encadeada. Use o `messageId` da mensagem que você quer responder. Veja mais sobre [como responder mensagens](./responder). |
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplos contatos em sequência para evitar bloqueios. |
| `contactBusinessDescription` | string | Não | Breve descrição sobre o contato. **Nota:** Este campo não é exibido no WhatsApp Web, apenas em alguns clientes móveis. |

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o contato compartilhado. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).

2. **`contactName`**: O nome do contato que você quer compartilhar (ex: `"João Silva"`, `"Maria Santos"`, `"Empresa XYZ"`).

3. **`contactPhone`**: O telefone do contato que você quer compartilhar. Use o formato completo: DDI + DDD + Número (ex: `554498398733`).

### Campos Opcionais

4. **`contactBusinessDescription`**: Uma breve descrição sobre o contato. **Nota importante:** Este campo não é exibido no WhatsApp Web, apenas em alguns clientes móveis. Use para adicionar contexto adicional quando disponível.

5. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

6. **`delayMessage`**: Se você vai enviar vários contatos seguidos, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

**Dica:** Na maioria dos casos, você só precisa preencher `phone`, `contactName` e `contactPhone`. Os outros campos são opcionais e podem ser deixados em branco.

**Casos de uso comuns:**

- **Vendas:** Compartilhar contato de um vendedor ou representante
- **Suporte:** Enviar contato de um técnico ou especialista
- **Indicações:** Recomendar contatos de parceiros ou fornecedores
- **Equipe:** Compartilhar contatos de membros da equipe

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Campo | Tipo | Descrição |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone` e estrutura de `contact` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateContactName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome excede limite de 100 caracteres');
  }
  return name.trim();
}

function validateEmail(email) {
  if (email && email.length > 100) {
    throw new Error('Email excede limite de 100 caracteres');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Formato de email inválido');
  }
  return email ? email.trim() : undefined;
}

function validateOrganization(organization) {
  if (organization && organization.length > 100) {
    throw new Error('Organização excede limite de 100 caracteres');
  }
  return organization ? organization.trim() : undefined;
}

// Dados do contato com validação
const recipientPhone = '5511999999999';
const contactData = {
  name: validateContactName('João Silva'),
  phone: validatePhoneNumber('5511888888888'),
  email: validateEmail('joao@exemplo.com'),
  organization: validateOrganization('Empresa XYZ'),
};

const messageData = {
  phone: validatePhoneNumber(recipientPhone),
  contact: contactData,
};

// Enviar requisição com tratamento seguro de erros
async function sendContactMessage() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-contact`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Contato enviado com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erro ao enviar contato:', error.message);
    throw error;
  }
}

// Executar função
sendContactMessage();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface Contact {
  name: string;
  phone: string;
  email?: string;
  organization?: string;
}

interface SendContactRequest {
  phone: string;
  contact: Contact;
}

interface SendContactResponse {
  messageId: string;
  status: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function validateContactName(name: string): string {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome excede limite de 100 caracteres');
  }
  return name.trim();
}

function validateEmail(email?: string): string | undefined {
  if (!email) return undefined;
  if (email.length > 100) {
    throw new Error('Email excede limite de 100 caracteres');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Formato de email inválido');
  }
  return email.trim();
}

function validateOrganization(organization?: string): string | undefined {
  if (!organization) return undefined;
  if (organization.length > 100) {
    throw new Error('Organização excede limite de 100 caracteres');
  }
  return organization.trim();
}

// Dados do contato com validação
const messageData: SendContactRequest = {
  phone: validatePhoneNumber('5511999999999'),
  contact: {
    name: validateContactName('João Silva'),
    phone: validatePhoneNumber('5511888888888'),
    email: validateEmail('joao@exemplo.com'),
    organization: validateOrganization('Empresa XYZ'),
  },
};

// Função para enviar contato
async function sendContactMessage(): Promise<SendContactResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-contact`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendContactMessage()
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_contact_name(name: str) -> str:
    if not name or not name.strip():
        raise ValueError("Nome do contato é obrigatório")
    if len(name) > 100:
        raise ValueError("Nome excede limite de 100 caracteres")
    return name.strip()

def validate_email(email: Optional[str]) -> Optional[str]:
    if not email:
        return None
    if len(email) > 100:
        raise ValueError("Email excede limite de 100 caracteres")
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        raise ValueError("Formato de email inválido")
    return email.strip()

def validate_organization(organization: Optional[str]) -> Optional[str]:
    if not organization:
        return None
    if len(organization) > 100:
        raise ValueError("Organização excede limite de 100 caracteres")
    return organization.strip()

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-contact"

# Dados do contato com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "contact": {
            "name": validate_contact_name("João Silva"),
            "phone": validate_phone_number("5511888888888"),
        }
    }
    email = validate_email("joao@exemplo.com")
    if email:
        payload["contact"]["email"] = email
    organization = validate_organization("Empresa XYZ")
    if organization:
        payload["contact"]["organization"] = organization
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

# Headers obrigatórios
headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

# Enviar requisição com tratamento seguro de erros
try:
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    print(f"Contato enviado. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
except ValueError as e:
    print(f"Erro de validação: {e}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-contact" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
 "phone": "5511999999999",
 "contact": {
 "name": "João Silva",
 "phone": "5511888888888",
 "email": "joao@exemplo.com",
 "organization": "Empresa XYZ"
 }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateContactName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome excede limite de 100 caracteres');
  }
  return name.trim();
}

function validateEmail(email) {
  if (email && email.length > 100) {
    throw new Error('Email excede limite de 100 caracteres');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Formato de email inválido');
  }
  return email ? email.trim() : undefined;
}

function validateOrganization(organization) {
  if (organization && organization.length > 100) {
    throw new Error('Organização excede limite de 100 caracteres');
  }
  return organization ? organization.trim() : undefined;
}

// Dados do contato com validação
const messageData = {
  phone: validatePhoneNumber('5511999999999'),
  contact: {
    name: validateContactName('João Silva'),
    phone: validatePhoneNumber('5511888888888'),
    email: validateEmail('joao@exemplo.com'),
    organization: validateOrganization('Empresa XYZ'),
  },
};

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-contact`);
const postData = JSON.stringify(messageData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
 method: 'POST',
 headers: {
    'Content-Type': 'application/json',
    'Client-Token': clientToken,
    'Content-Length': Buffer.byteLength(postData),
  },
  timeout: 30000,
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      console.log('Contato enviado. MessageId:', result.messageId);
    } else {
      console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro na requisição:', error.message);
});

req.on('timeout', () => {
  req.destroy();
  console.error('Timeout na requisição');
});

req.write(postData);
req.end();
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const https = require('https');
const { URL } = require('url');

const app = express();
app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateContactName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome excede limite de 100 caracteres');
  }
  return name.trim();
}

function validateEmail(email) {
  if (email && email.length > 100) {
    throw new Error('Email excede limite de 100 caracteres');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Formato de email inválido');
  }
  return email ? email.trim() : undefined;
}

function validateOrganization(organization) {
  if (organization && organization.length > 100) {
    throw new Error('Organização excede limite de 100 caracteres');
  }
  return organization ? organization.trim() : undefined;
}

// Rota para enviar contato
app.post('/send-contact', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawContact = req.body.contact || {
      name: 'João Silva',
      phone: '5511888888888',
      email: 'joao@exemplo.com',
      organization: 'Empresa XYZ',
    };

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
 contact: {
        name: validateContactName(rawContact.name),
        phone: validatePhoneNumber(rawContact.phone),
        email: validateEmail(rawContact.email),
        organization: validateOrganization(rawContact.organization),
      },
    };

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-contact`);
    const postData = JSON.stringify(messageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao enviar contato:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor Express rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const https = require('https');
const { URL } = require('url');

const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateContactName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome excede limite de 100 caracteres');
  }
  return name.trim();
}

function validateEmail(email) {
  if (email && email.length > 100) {
    throw new Error('Email excede limite de 100 caracteres');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Formato de email inválido');
  }
  return email ? email.trim() : undefined;
}

function validateOrganization(organization) {
  if (organization && organization.length > 100) {
    throw new Error('Organização excede limite de 100 caracteres');
  }
  return organization ? organization.trim() : undefined;
}

// Rota para enviar contato
router.post('/send-contact', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawContact = ctx.request.body.contact || {
 name: 'João Silva',
 phone: '5511888888888',
 email: 'joao@exemplo.com',
      organization: 'Empresa XYZ',
    };

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
      contact: {
        name: validateContactName(rawContact.name),
        phone: validatePhoneNumber(rawContact.phone),
        email: validateEmail(rawContact.email),
        organization: validateOrganization(rawContact.organization),
      },
    };

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-contact`);
    const postData = JSON.stringify(messageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao enviar contato:', err.message);
});

app.listen(3000, () => {
  console.log('Servidor Koa rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

public class SendContact {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static String validateContactName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do contato é obrigatório");
        }
        if (name.length() > 100) {
            throw new IllegalArgumentException("Nome excede limite de 100 caracteres");
        }
        return name.trim();
    }

    private static String validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return null;
        }
        if (email.length() > 100) {
            throw new IllegalArgumentException("Email excede limite de 100 caracteres");
        }
        Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
        if (!emailPattern.matcher(email).matches()) {
            throw new IllegalArgumentException("Formato de email inválido");
        }
        return email.trim();
    }

    private static String validateOrganization(String organization) {
        if (organization == null || organization.trim().isEmpty()) {
            return null;
        }
        if (organization.length() > 100) {
            throw new IllegalArgumentException("Organização excede limite de 100 caracteres");
        }
        return organization.trim();
    }

    public static void main(String[] args) {
        try {
            String recipientPhone = validatePhoneNumber("5511999999999");
            String contactName = validateContactName("João Silva");
            String contactPhone = validatePhoneNumber("5511888888888");
            String contactEmail = validateEmail("joao@exemplo.com");
            String contactOrg = validateOrganization("Empresa XYZ");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-contact";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(recipientPhone).append("\",");
            jsonPayload.append("\"contact\":{");
            jsonPayload.append("\"name\":\"").append(contactName.replace("\"", "\\\"")).append("\",");
            jsonPayload.append("\"phone\":\"").append(contactPhone).append("\"");
            if (contactEmail != null) {
                jsonPayload.append(",\"email\":\"").append(contactEmail.replace("\"", "\\\"")).append("\"");
            }
            if (contactOrg != null) {
                jsonPayload.append(",\"organization\":\"").append(contactOrg.replace("\"", "\\\"")).append("\"");
            }
            jsonPayload.append("}}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("Contato enviado. Response: " + response.toString());
                }
            } else {
                System.err.println("Erro HTTP " + responseCode + ": Requisição falhou");
            }

        } catch (Exception e) {
            System.err.println("Erro: " + e.getMessage());
        }
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class SendContact
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static string ValidateContactName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Nome do contato é obrigatório");
        }
        if (name.Length > 100)
        {
            throw new ArgumentException("Nome excede limite de 100 caracteres");
        }
        return name.Trim();
    }

    private static string ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return null;
        }
        if (email.Length > 100)
        {
            throw new ArgumentException("Email excede limite de 100 caracteres");
        }
        if (!Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
        {
            throw new ArgumentException("Formato de email inválido");
        }
        return email.Trim();
    }

    private static string ValidateOrganization(string organization)
    {
        if (string.IsNullOrWhiteSpace(organization))
        {
            return null;
        }
        if (organization.Length > 100)
        {
            throw new ArgumentException("Organização excede limite de 100 caracteres");
        }
        return organization.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            string recipientPhone = ValidatePhoneNumber("5511999999999");
            string contactName = ValidateContactName("João Silva");
            string contactPhone = ValidatePhoneNumber("5511888888888");
            string contactEmail = ValidateEmail("joao@exemplo.com");
            string contactOrg = ValidateOrganization("Empresa XYZ");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-contact";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = recipientPhone,
                    contact = new
                    {
                        name = contactName,
                        phone = contactPhone,
                        email = contactEmail,
                        organization = contactOrg
                    }
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Contato enviado. Response: {responseBody}");
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro: {ex.Message}");
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido")
    }
    return cleaned, nil
}

func validateContactName(name string) (string, error) {
    trimmed := strings.TrimSpace(name)
    if trimmed == "" {
        return "", fmt.Errorf("nome do contato é obrigatório")
    }
    if len(trimmed) > 100 {
        return "", fmt.Errorf("nome excede limite de 100 caracteres")
    }
    return trimmed, nil
}

func validateEmail(email string) (string, error) {
    if email == "" {
        return "", nil
    }
    trimmed := strings.TrimSpace(email)
    if len(trimmed) > 100 {
        return "", fmt.Errorf("email excede limite de 100 caracteres")
    }
    emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
    if !emailRegex.MatchString(trimmed) {
        return "", fmt.Errorf("formato de email inválido")
    }
    return trimmed, nil
}

func validateOrganization(organization string) (string, error) {
    if organization == "" {
        return "", nil
    }
    trimmed := strings.TrimSpace(organization)
    if len(trimmed) > 100 {
        return "", fmt.Errorf("organização excede limite de 100 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    recipientPhone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    contactName, err := validateContactName("João Silva")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    contactPhone, err := validatePhoneNumber("5511888888888")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    contactEmail, err := validateEmail("joao@exemplo.com")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    contactOrg, err := validateOrganization("Empresa XYZ")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-contact", instanceId)

    contact := map[string]interface{}{
        "name":  contactName,
        "phone": contactPhone,
    }
    if contactEmail != "" {
        contact["email"] = contactEmail
    }
    if contactOrg != "" {
        contact["organization"] = contactOrg
    }

    payload := map[string]interface{}{
        "phone":   recipientPhone,
        "contact": contact,
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, _ := io.ReadAll(resp.Body)
        fmt.Printf("Contato enviado. Response: %s\n", string(body))
    } else {
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido');
    }
    return $cleaned;
}

function validateContactName($name) {
    if (empty($name) || trim($name) === '') {
        throw new Exception('Nome do contato é obrigatório');
    }
    if (strlen($name) > 100) {
        throw new Exception('Nome excede limite de 100 caracteres');
    }
    return trim($name);
}

function validateEmail($email) {
    if (empty($email)) {
        return null;
    }
    if (strlen($email) > 100) {
        throw new Exception('Email excede limite de 100 caracteres');
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Formato de email inválido');
    }
    return trim($email);
}

function validateOrganization($organization) {
    if (empty($organization)) {
        return null;
    }
    if (strlen($organization) > 100) {
        throw new Exception('Organização excede limite de 100 caracteres');
    }
    return trim($organization);
}

try {
    $recipientPhone = validatePhoneNumber('5511999999999');
    $contactName = validateContactName('João Silva');
    $contactPhone = validatePhoneNumber('5511888888888');
    $contactEmail = validateEmail('joao@exemplo.com');
    $contactOrg = validateOrganization('Empresa XYZ');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-contact";

    $contact = [
        'name' => $contactName,
        'phone' => $contactPhone,
    ];
    if ($contactEmail !== null) {
        $contact['email'] = $contactEmail;
    }
    if ($contactOrg !== null) {
        $contact['organization'] = $contactOrg;
    }

    $payload = [
        'phone' => $recipientPhone,
        'contact' => $contact,
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Contato enviado. MessageId: " . $result['messageId'] . "\n";
    } else {
        echo "Erro HTTP $httpCode: Requisição falhou\n";
    }
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'json'
require 'uri'
require 'openssl'

instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido'
  end
  cleaned
end

def validate_contact_name(name)
  if name.nil? || name.strip.empty?
    raise ArgumentError, 'Nome do contato é obrigatório'
  end
  if name.length > 100
    raise ArgumentError, 'Nome excede limite de 100 caracteres'
  end
  name.strip
end

def validate_email(email)
  return nil if email.nil? || email.strip.empty?
  if email.length > 100
    raise ArgumentError, 'Email excede limite de 100 caracteres'
  end
  unless email.match?(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    raise ArgumentError, 'Formato de email inválido'
  end
  email.strip
end

def validate_organization(organization)
  return nil if organization.nil? || organization.strip.empty?
  if organization.length > 100
    raise ArgumentError, 'Organização excede limite de 100 caracteres'
  end
  organization.strip
end

begin
  recipient_phone = validate_phone_number('5511999999999')
  contact_name = validate_contact_name('João Silva')
  contact_phone = validate_phone_number('5511888888888')
  contact_email = validate_email('joao@exemplo.com')
  contact_org = validate_organization('Empresa XYZ')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-contact")

  contact = {
    name: contact_name,
    phone: contact_phone
  }
  contact[:email] = contact_email if contact_email
  contact[:organization] = contact_org if contact_org

  payload = {
    phone: recipient_phone,
    contact: contact
  }

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Contato enviado. MessageId: #{result['messageId']}"
  else
    puts "Erro HTTP #{response.code}: Requisição falhou"
  end
rescue => e
  puts "Erro: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.replacingOccurrences(of: "\\D", with: "", options: .regularExpression)
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido"])
    }
    return cleaned
}

func validateContactName(_ name: String) throws -> String {
    let trimmed = name.trimmingCharacters(in: .whitespaces)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Nome do contato é obrigatório"])
    }
    if trimmed.count > 100 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Nome excede limite de 100 caracteres"])
    }
    return trimmed
}

func validateEmail(_ email: String?) -> String? {
    guard let email = email, !email.trimmingCharacters(in: .whitespaces).isEmpty else {
        return nil
    }
    let trimmed = email.trimmingCharacters(in: .whitespaces)
    if trimmed.count > 100 {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Email excede limite de 100 caracteres"])
    }
    let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
    let emailPredicate = NSPredicate(format:"SELF MATCHES %@", emailRegex)
    if !emailPredicate.evaluate(with: trimmed) {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "Formato de email inválido"])
    }
    return trimmed
}

func validateOrganization(_ organization: String?) -> String? {
    guard let organization = organization, !organization.trimmingCharacters(in: .whitespaces).isEmpty else {
        return nil
    }
    let trimmed = organization.trimmingCharacters(in: .whitespaces)
    if trimmed.count > 100 {
        throw NSError(domain: "ValidationError", code: 6, userInfo: [NSLocalizedDescriptionKey: "Organização excede limite de 100 caracteres"])
    }
    return trimmed
}

do {
    let recipientPhone = try validatePhoneNumber("5511999999999")
    let contactName = try validateContactName("João Silva")
    let contactPhone = try validatePhoneNumber("5511888888888")
    let contactEmail = try validateEmail("joao@exemplo.com")
    let contactOrg = try validateOrganization("Empresa XYZ")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-contact"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var contact: [String: Any] = [
        "name": contactName,
        "phone": contactPhone
    ]
    if let email = contactEmail {
        contact["email"] = email
    }
    if let org = contactOrg {
        contact["organization"] = org
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    let payload: [String: Any] = [
        "phone": recipientPhone,
        "contact": contact
    ]
    request.httpBody = try JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro na requisição: \(error.localizedDescription)")
            return
        }

        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                if let data = data,
                   let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let messageId = result["messageId"] as? String {
                    print("Contato enviado. MessageId: \(messageId)")
                }
            } else {
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

    RunLoop.main.run(until: Date(timeIntervalSinceNow: 35))

} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido"
    }
    return $cleaned
}

function Validate-ContactName {
    param([string]$Name)
    if ([string]::IsNullOrWhiteSpace($Name)) {
        throw "Nome do contato é obrigatório"
    }
    if ($Name.Length -gt 100) {
        throw "Nome excede limite de 100 caracteres"
    }
    return $Name.Trim()
}

function Validate-Email {
    param([string]$Email)
    if ([string]::IsNullOrWhiteSpace($Email)) {
        return $null
    }
    if ($Email.Length -gt 100) {
        throw "Email excede limite de 100 caracteres"
    }
    if ($Email -notmatch '^[^\s@]+@[^\s@]+\.[^\s@]+$') {
        throw "Formato de email inválido"
    }
    return $Email.Trim()
}

function Validate-Organization {
    param([string]$Organization)
    if ([string]::IsNullOrWhiteSpace($Organization)) {
        return $null
    }
    if ($Organization.Length -gt 100) {
        throw "Organização excede limite de 100 caracteres"
    }
    return $Organization.Trim()
}

try {
    $recipientPhone = Validate-PhoneNumber -Phone "5511999999999"
    $contactName = Validate-ContactName -Name "João Silva"
    $contactPhone = Validate-PhoneNumber -Phone "5511888888888"
    $contactEmail = Validate-Email -Email "joao@exemplo.com"
    $contactOrg = Validate-Organization -Organization "Empresa XYZ"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-contact"

    $contact = @{
        name = $contactName
        phone = $contactPhone
    }
    if ($contactEmail) {
        $contact.email = $contactEmail
    }
    if ($contactOrg) {
        $contact.organization = $contactOrg
    }

    $body = @{
        phone = $recipientPhone
        contact = $contact
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Contato enviado. MessageId: $($response.messageId)"

} catch {
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "Erro HTTP $statusCode : Requisição falhou"
    } else {
        Write-Host "Erro: $($_.Exception.Message)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /instances/SUA_INSTANCIA/send-contact HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 185

{
 "phone": "5511999999999",
 "contact": {
 "name": "João Silva",
 "phone": "5511888888888",
 "email": "joao@exemplo.com",
 "organization": "Empresa XYZ"
 }
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `contact.name` (obrigatório, max 100 caracteres), `contact.phone` (obrigatório), `contact.email` (opcional, max 100 caracteres, formato válido), e `contact.organization` (opcional, max 100 caracteres) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return cleaned;
}

std::string validateContactName(const std::string& name) {
    std::string trimmed = name;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    if (trimmed.empty()) {
        throw std::invalid_argument("Nome do contato é obrigatório");
    }
    if (trimmed.length() > 100) {
        throw std::invalid_argument("Nome excede limite de 100 caracteres");
    }
    return trimmed;
}

std::string validateEmail(const std::string& email) {
    if (email.empty()) return "";
    std::string trimmed = email;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    if (trimmed.length() > 100) {
        throw std::invalid_argument("Email excede limite de 100 caracteres");
    }
    std::regex emailPattern("^[A-Za-z0-9+_.-]+@(.+)$");
    if (!std::regex_match(trimmed, emailPattern)) {
        throw std::invalid_argument("Formato de email inválido");
    }
    return trimmed;
}

std::string validateOrganization(const std::string& organization) {
    if (organization.empty()) return "";
    std::string trimmed = organization;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    if (trimmed.length() > 100) {
        throw std::invalid_argument("Organização excede limite de 100 caracteres");
    }
    return trimmed;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        std::string recipientPhone = validatePhoneNumber("5511999999999");
        std::string contactName = validateContactName("João Silva");
        std::string contactPhone = validatePhoneNumber("5511888888888");
        std::string contactEmail = validateEmail("joao@exemplo.com");
        std::string contactOrg = validateOrganization("Empresa XYZ");

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-contact";
        
        std::string jsonPayload = "{\"phone\":\"" + recipientPhone + "\",\"contact\":{";
        jsonPayload += "\"name\":\"" + contactName + "\",";
        jsonPayload += "\"phone\":\"" + contactPhone + "\"";
        if (!contactEmail.empty()) {
            jsonPayload += ",\"email\":\"" + contactEmail + "\"";
        }
        if (!contactOrg.empty()) {
            jsonPayload += ",\"organization\":\"" + contactOrg + "\"";
        }
        jsonPayload += "}}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            std::cout << "Contato enviado. Response: " << responseData << std::endl;
        } else {
            std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            if (res != CURLE_OK) {
                std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
            }
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

**Compilação:**
```bash
g++ -o send_contact send_contact.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    for (int i = 0; phone[i] != '\0'; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    int len = strlen(cleaned);
    if (len < 10 || len > 15) {
        return 0;
    }
    return 1;
}

int validateContactName(const char* name, char* cleaned) {
    int start = 0;
    int end = strlen(name) - 1;
    while (isspace(name[start]) && name[start] != '\0') start++;
    while (end > start && isspace(name[end])) end--;
    if (start > end) {
        return 0;
    }
    int len = end - start + 1;
    if (len > 100) {
        return -1;
    }
    strncpy(cleaned, name + start, len);
    cleaned[len] = '\0';
    return 1;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    char recipientPhone[20];
    if (!validatePhoneNumber("5511999999999", recipientPhone)) {
        fprintf(stderr, "Erro: Número de telefone inválido\n");
        return 1;
    }

    char contactName[101];
    int nameResult = validateContactName("João Silva", contactName);
    if (nameResult == 0) {
        fprintf(stderr, "Erro: Nome do contato é obrigatório\n");
        return 1;
    } else if (nameResult == -1) {
        fprintf(stderr, "Erro: Nome excede limite de 100 caracteres\n");
        return 1;
    }

    char contactPhone[20];
    if (!validatePhoneNumber("5511888888888", contactPhone)) {
        fprintf(stderr, "Erro: Número de telefone do contato inválido\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-contact", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"contact\":{\"name\":\"%s\",\"phone\":\"%s\",\"email\":\"joao@exemplo.com\",\"organization\":\"Empresa XYZ\"}}",
             recipientPhone, contactName, contactPhone);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        printf("Contato enviado. Response: %s\n", responseData);
    } else {
        fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        if (res != CURLE_OK) {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return 0;
}
```

**Compilação:**
```bash
gcc -o send_contact send_contact.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Limitações {#limitacoes}

:::tip Limites importantes

- **Nome**: Máximo de 100 caracteres
- **Telefone**: Deve estar no formato internacional
- **Email**: Máximo de 100 caracteres (formato de email válido)
- **Organização**: Máximo de 100 caracteres

:::

:::info Comportamento

- O contato aparece como um cartão de visita no WhatsApp
- O destinatário pode tocar no contato para salvá-lo na agenda do celular
- Use o formato internacional para o número de telefone do contato
- Campos opcionais melhoram a experiência do usuário
- O WhatsApp valida o formato do email antes de exibir

:::

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar vários contatos](/docs/messages/varios-contatos) - Envie múltiplos contatos de uma vez
- [Enviar localização](/docs/messages/localizacao) - Compartilhe localizações no mapa
- [Enviar produto](/docs/messages/produto) - Envie informações de produtos
