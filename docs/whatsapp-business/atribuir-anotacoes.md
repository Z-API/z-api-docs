---
id: atribuir-anotacoes
title: Atribuir Anotações a um Chat
sidebar_position: 27
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="StickyNote" size="lg" /> Atribuir Anotações a um Chat

Adicione anotações personalizadas a conversas no WhatsApp Business. Ideal para manter informações importantes sobre clientes e conversas.

---

:::important Importante

Este método está disponível **apenas para dispositivos conectados à versão Multi-Devices** do WhatsApp.

:::

---

## Casos de Uso Comuns

- **Informações do Cliente**: Anote preferências, histórico de compras ou informações importantes
- **Contexto de Conversa**: Mantenha notas sobre o contexto da conversa
- **Lembretes**: Anote lembretes e tarefas relacionadas ao chat
- **CRM Integration**: Sincronize informações com sistemas de CRM

---

## Para Usuários No-Code

Se você está usando uma plataforma de automação como n8n ou Make, use este endpoint para adicionar anotações a conversas baseadas em eventos ou condições específicas.

---

## Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/chats/{phone}/notes
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do chat no formato DDI DDD NÚMERO (ex: `5511999999999`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `notes` | string | Texto da anotação a ser adicionada ao chat |

### Request Body

```json
{
  "notes": "anotação"
}
```

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Através deste método, é possível atribuir notas a um chat no WhatsApp Business. As anotações são visíveis apenas para você e sua equipe, permitindo manter informações contextuais sobre conversas e clientes.

**Características**:
- Anotações são privadas e visíveis apenas para sua conta
- Podem ser editadas ou removidas a qualquer momento
- Úteis para manter contexto em conversas longas
- Integração com sistemas de CRM e gestão

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório');
  }
  const cleaned = phone.trim().replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Telefone deve conter entre 10 e 15 dígitos');
  }
  return cleaned;
}

function validateNotes(notes) {
  if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
    throw new Error('Anotações são obrigatórias');
  }
  return notes.trim();
}

// Dados da requisição com validação
const phone = validatePhone('5511999999999');
const notes = validateNotes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00');

// Atribuir anotações com tratamento seguro de erros
async function assignNotes() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/chats/${encodeURIComponent(phone)}/notes`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: notes
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.success) {
      console.log('Anotações atribuídas com sucesso');
    } else {
      console.error('Erro ao atribuir anotações');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao atribuir anotações:', error.message);
    throw error;
  }
}

// Executar função
assignNotes();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Interface para resposta
interface AssignNotesResponse {
  success: boolean;
}

// Validação de entrada (segurança)
function validatePhone(phone: string): string {
  if (!phone || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório');
  }
  const cleaned = phone.trim().replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Telefone deve conter entre 10 e 15 dígitos');
  }
  return cleaned;
}

function validateNotes(notes: string): string {
  if (!notes || notes.trim().length === 0) {
    throw new Error('Anotações são obrigatórias');
  }
  return notes.trim();
}

// Dados da requisição com validação
const phone: string = validatePhone('5511999999999');
const notes: string = validateNotes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00');

// Função para atribuir anotações
async function assignNotes(): Promise<AssignNotesResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/chats/${encodeURIComponent(phone)}/notes`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notes: notes
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
assignNotes()
  .then((result) => console.log('Sucesso:', result.success))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

def validate_phone(phone: str) -> str:
    """Valida e limpa número de telefone."""
    if not phone or not phone.strip():
        raise ValueError('Telefone é obrigatório')
    cleaned = re.sub(r'\D', '', phone.strip())
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Telefone deve conter entre 10 e 15 dígitos')
    return cleaned

def validate_notes(notes: str) -> str:
    """Valida anotações."""
    if not notes or not notes.strip():
        raise ValueError('Anotações são obrigatórias')
    return notes.strip()

# Dados da requisição com validação
phone = validate_phone('5511999999999')
notes = validate_notes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00')

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/chats/{phone}/notes"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Body da requisição
payload = {
    "notes": notes
}

# Atribuir anotações com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('success'):
        print('Anotações atribuídas com sucesso')
    else:
        print('Erro ao atribuir anotações')
    
except requests.exceptions.HTTPError as e:
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
PHONE="5511999999999"
NOTES="Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00"

# Atribuir anotações via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/chats/${PHONE}/notes" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"notes\": \"${NOTES}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório');
  }
  const cleaned = phone.trim().replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Telefone deve conter entre 10 e 15 dígitos');
  }
  return cleaned;
}

function validateNotes(notes) {
  if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
    throw new Error('Anotações são obrigatórias');
  }
  return notes.trim();
}

// Dados da requisição com validação
const phone = validatePhone('5511999999999');
const notes = validateNotes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00');

// Atribuir anotações
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/chats/${encodeURIComponent(phone)}/notes`);

const body = JSON.stringify({
  notes: notes
});

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Client-Token': clientToken,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  },
  timeout: 30000, // 30 segundos
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      if (result.success) {
        console.log('Anotações atribuídas com sucesso');
      } else {
        console.error('Erro ao atribuir anotações');
      }
    } else {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

req.write(body);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório');
  }
  const cleaned = phone.trim().replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Telefone deve conter entre 10 e 15 dígitos');
  }
  return cleaned;
}

function validateNotes(notes) {
  if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
    throw new Error('Anotações são obrigatórias');
  }
  return notes.trim();
}

// Rota para atribuir anotações
app.post('/chats/:phone/notes', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawPhone = req.params.phone || '5511999999999';
    const rawNotes = req.body.notes || 'Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00';
    const phone = validatePhone(rawPhone);
    const notes = validateNotes(rawNotes);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/chats/${encodeURIComponent(phone)}/notes`);

    const body = JSON.stringify({
      notes: notes
    });

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 30000, // 30 segundos
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
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, data: parsed });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

      req.write(body);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao atribuir anotações:', error.message);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório');
  }
  const cleaned = phone.trim().replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Telefone deve conter entre 10 e 15 dígitos');
  }
  return cleaned;
}

function validateNotes(notes) {
  if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
    throw new Error('Anotações são obrigatórias');
  }
  return notes.trim();
}

// Rota para atribuir anotações
router.post('/chats/:phone/notes', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawPhone = ctx.params.phone || '5511999999999';
    const rawNotes = ctx.request.body.notes || 'Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00';
    const phone = validatePhone(rawPhone);
    const notes = validateNotes(rawNotes);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/chats/${encodeURIComponent(phone)}/notes`);

    const body = JSON.stringify({
      notes: notes
    });

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 30000, // 30 segundos
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
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, data: parsed });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

      req.write(body);
      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao atribuir anotações:', err.message);
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
import org.json.JSONObject;

public class AssignNotes {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validatePhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("Telefone é obrigatório");
        }
        String cleaned = phone.trim().replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Telefone deve conter entre 10 e 15 dígitos");
        }
        return cleaned;
    }

    private static String validateNotes(String notes) {
        if (notes == null || notes.trim().isEmpty()) {
            throw new IllegalArgumentException("Anotações são obrigatórias");
        }
        return notes.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String phone = validatePhone("5511999999999");
            String notes = validateNotes("Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/chats/%s/notes",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(phone, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Body da requisição
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("notes", notes);
            
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Verificar resposta
            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    System.out.println("Anotações atribuídas com sucesso");
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.RegularExpressions;

public class AssignNotes
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static string ValidatePhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
        {
            throw new ArgumentException("Telefone é obrigatório");
        }
        string cleaned = Regex.Replace(phone.Trim(), @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Telefone deve conter entre 10 e 15 dígitos");
        }
        return cleaned;
    }

    private static string ValidateNotes(string notes)
    {
        if (string.IsNullOrWhiteSpace(notes))
        {
            throw new ArgumentException("Anotações são obrigatórias");
        }
        return notes.Trim();
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string phone = ValidatePhone("5511999999999");
            string notes = ValidateNotes("Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/chats/{Uri.EscapeDataString(phone)}/notes";

            var payload = new
            {
                notes = notes
            };

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Anotações atribuídas com sucesso");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro: {e.Message}");
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validatePhone(phone string) (string, error) {
    trimmed := strings.TrimSpace(phone)
    if trimmed == "" {
        return "", fmt.Errorf("Telefone é obrigatório")
    }
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(trimmed, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("Telefone deve conter entre 10 e 15 dígitos")
    }
    return cleaned, nil
}

func validateNotes(notes string) (string, error) {
    trimmed := strings.TrimSpace(notes)
    if trimmed == "" {
        return "", fmt.Errorf("Anotações são obrigatórias")
    }
    return trimmed, nil
}

func main() {
    // Dados da requisição com validação
    phone, err := validatePhone("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }
    notes, err := validateNotes("Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/chats/%s/notes",
        instanceId, instanceToken, phone)

    payload := map[string]interface{}{
        "notes": notes,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
        return
    }

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    req, err := http.NewRequest("POST", url, strings.NewReader(string(jsonData)))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }

    req.Header.Set("Client-Token", clientToken)
    req.Header.Set("Content-Type", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro ao fazer requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Erro ao ler resposta: %v\n", err)
            return
        }

        var result map[string]interface{}
        if err := json.Unmarshal(body, &result); err != nil {
            fmt.Printf("Erro ao processar JSON: %v\n", err)
            return
        }

        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Printf("Anotações atribuídas com sucesso\n")
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhone($phone) {
    $trimmed = trim($phone);
    if (empty($trimmed)) {
        throw new Exception('Telefone é obrigatório');
    }
    $cleaned = preg_replace('/\D/', '', $trimmed);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Telefone deve conter entre 10 e 15 dígitos');
    }
    return $cleaned;
}

function validateNotes($notes) {
    $trimmed = trim($notes);
    if (empty($trimmed)) {
        throw new Exception('Anotações são obrigatórias');
    }
    return $trimmed;
}

try {
    // Dados da requisição com validação
    $phone = validatePhone('5511999999999');
    $notes = validateNotes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/chats/%s/notes',
        urlencode($instanceId),
        urlencode($instanceToken),
        urlencode($phone)
    );

    $jsonBody = json_encode([
        'notes' => $notes
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-Token: ' . $clientToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if ($result['success'] ?? false) {
            echo "Anotações atribuídas com sucesso\n";
        } else {
            echo "Erro ao atribuir anotações\n";
        }
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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
require 'uri'
require 'json'
require 'openssl'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
INSTANCE_TOKEN = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_phone(phone)
  trimmed = phone.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Telefone é obrigatório'
  end
  cleaned = trimmed.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Telefone deve conter entre 10 e 15 dígitos'
  end
  cleaned
end

def validate_notes(notes)
  trimmed = notes.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Anotações são obrigatórias'
  end
  trimmed
end

begin
  # Dados da requisição com validação
  phone = validate_phone('5511999999999')
  notes = validate_notes('Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/chats/#{URI.encode_www_form_component(phone)}/notes")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    notes: notes
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['success']
      puts "Anotações atribuídas com sucesso"
    else
      puts "Erro ao atribuir anotações"
    end
  else
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validatePhone(_ phone: String) throws -> String {
    let trimmed = phone.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Telefone é obrigatório"])
    }
    let cleaned = trimmed.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    guard cleaned.count >= 10 && cleaned.count <= 15 else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Telefone deve conter entre 10 e 15 dígitos"])
    }
    return cleaned
}

func validateNotes(_ notes: String) throws -> String {
    let trimmed = notes.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Anotações são obrigatórias"])
    }
    return trimmed
}

// Dados da requisição com validação
let phone = try validatePhone("5511999999999")
let notes = try validateNotes("Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00")

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/chats/\(phone.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/notes") else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "POST"

let payload: [String: Any] = [
    "notes": notes
]

request.httpBody = try JSONSerialization.data(withJSONObject: payload)
request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.timeoutInterval = 30

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Erro: \(error.localizedDescription)")
        return
    }
    
    guard let httpResponse = response as? HTTPURLResponse else { return }
    
    if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
        if let data = data {
            do {
                let result = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                if let success = result?["success"] as? Bool, success {
                    print("Anotações atribuídas com sucesso")
                } else {
                    print("Erro ao atribuir anotações")
                }
            } catch {
                print("Erro ao processar JSON: \(error.localizedDescription)")
            }
        }
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
    }
}

task.resume()
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-Phone {
    param([string]$Phone)
    $trimmed = $Phone.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Telefone é obrigatório"
    }
    $cleaned = $trimmed -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Telefone deve conter entre 10 e 15 dígitos"
    }
    return $cleaned
}

function Validate-Notes {
    param([string]$Notes)
    $trimmed = $Notes.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Anotações são obrigatórias"
    }
    return $trimmed
}

try {
    # Dados da requisição com validação
    $phone = Validate-Phone -Phone "5511999999999"
    $notes = Validate-Notes -Notes "Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/chats/$([System.Web.HttpUtility]::UrlEncode($phone))/notes"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $body = @{
        notes = $notes
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.success) {
        Write-Host "Anotações atribuídas com sucesso"
    } else {
        Write-Host "Erro ao atribuir anotações"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/notes HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json

{
  "notes": "Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00"
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <sstream>
#include <regex>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Validação de entrada (segurança)
std::string validatePhone(const std::string& phone) {
    std::string trimmed = phone;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("Telefone é obrigatório");
    }
    
    std::string cleaned;
    for (char c : trimmed) {
        if (std::isdigit(c)) {
            cleaned += c;
        }
    }
    
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::runtime_error("Telefone deve conter entre 10 e 15 dígitos");
    }
    
    return cleaned;
}

std::string validateNotes(const std::string& notes) {
    std::string trimmed = notes;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("Anotações são obrigatórias");
    }
    return trimmed;
}

// Escape JSON string
std::string escapeJson(const std::string& str) {
    std::ostringstream o;
    for (char c : str) {
        switch (c) {
            case '"': o << "\\\""; break;
            case '\\': o << "\\\\"; break;
            case '\b': o << "\\b"; break;
            case '\f': o << "\\f"; break;
            case '\n': o << "\\n"; break;
            case '\r': o << "\\r"; break;
            case '\t': o << "\\t"; break;
            default:
                if ('\x00' <= c && c <= '\x1f') {
                    o << "\\u" << std::hex << std::setw(4) << std::setfill('0') << (int)c;
                } else {
                    o << c;
                }
        }
    }
    return o.str();
}

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // Dados da requisição com validação
        std::string phone = validatePhone("5511999999999");
        std::string notes = validateNotes("Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00");

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"notes\":\"" << escapeJson(notes) << "\"}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/chats/" + phone + "/notes";
            std::string responseData;
            std::string bodyStr = jsonBody.str();

            struct curl_slist* headers = NULL;
            std::string tokenHeader = "Client-Token: " + clientToken;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, tokenHeader.c_str());
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_POST, 1L);
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, bodyStr.c_str());
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Anotações atribuídas com sucesso" << std::endl;
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            }

            curl_slist_free_all(headers);
            curl_easy_cleanup(curl);
        }
    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
    }

    return 0;
}
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Validação de entrada (segurança)
int validatePhone(const char* phone, char* cleaned) {
    int len = strlen(phone);
    int j = 0;
    
    // Remove espaços iniciais e finais e extrai apenas dígitos
    for (int i = 0; i < len; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    if (j < 10 || j > 15) {
        return 0; // Inválido
    }
    
    return 1; // Válido
}

int validateNotes(const char* notes, char* cleaned) {
    int len = strlen(notes);
    int j = 0;
    
    // Remove espaços iniciais e finais
    int start = 0;
    while (start < len && isspace(notes[start])) start++;
    int end = len - 1;
    while (end >= start && isspace(notes[end])) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    for (int i = start; i <= end; i++) {
        cleaned[j++] = notes[i];
    }
    cleaned[j] = '\0';
    
    return 1; // Válido
}

// Escape JSON string simples
void escapeJson(const char* input, char* output, size_t outputSize) {
    size_t j = 0;
    for (size_t i = 0; input[i] != '\0' && j < outputSize - 1; i++) {
        if (input[i] == '"') {
            if (j + 1 < outputSize - 1) {
                output[j++] = '\\';
                output[j++] = '"';
            }
        } else if (input[i] == '\\') {
            if (j + 1 < outputSize - 1) {
                output[j++] = '\\';
                output[j++] = '\\';
            }
        } else if (input[i] == '\n') {
            if (j + 1 < outputSize - 1) {
                output[j++] = '\\';
                output[j++] = 'n';
            }
        } else if (input[i] == '\r') {
            if (j + 1 < outputSize - 1) {
                output[j++] = '\\';
                output[j++] = 'r';
            }
        } else if (input[i] == '\t') {
            if (j + 1 < outputSize - 1) {
                output[j++] = '\\';
                output[j++] = 't';
            }
        } else {
            output[j++] = input[i];
        }
    }
    output[j] = '\0';
}

struct MemoryStruct {
    char* memory;
    size_t size;
};

static size_t WriteMemoryCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    size_t realsize = size * nmemb;
    struct MemoryStruct* mem = (struct MemoryStruct*)userp;

    char* ptr = realloc(mem->memory, mem->size + realsize + 1);
    if (!ptr) {
        return 0;
    }

    mem->memory = ptr;
    memcpy(&(mem->memory[mem->size]), contents, realsize);
    mem->size += realsize;
    mem->memory[mem->size] = 0;

    return realsize;
}

int main() {
    const char* phone = "5511999999999";
    const char* notes = "Cliente VIP - Preferência por produtos premium. Última compra: R$ 500,00";
    char cleanedPhone[256];
    char cleanedNotes[512];
    char escapedNotes[1024];
    
    if (!validatePhone(phone, cleanedPhone)) {
        fprintf(stderr, "Telefone inválido. Deve conter entre 10 e 15 dígitos\n");
        return 1;
    }
    
    if (!validateNotes(notes, cleanedNotes)) {
        fprintf(stderr, "Anotações são obrigatórias\n");
        return 1;
    }

    escapeJson(cleanedNotes, escapedNotes, sizeof(escapedNotes));

    // Body da requisição
    char jsonBody[1536];
    snprintf(jsonBody, sizeof(jsonBody), "{\"notes\":\"%s\"}", escapedNotes);

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/chats/%s/notes",
                 instanceId, instanceToken, cleanedPhone);

        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        char contentTypeHeader[] = "Content-Type: application/json";
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, contentTypeHeader);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonBody);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Anotações atribuídas com sucesso\n");
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        }

        free(chunk.memory);
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    return 0;
}
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `success` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

**Exemplo de resposta:**

```json
{
 "success": true
}
```

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `405` | Método HTTP incorreto. Verifique se está usando `POST` |
| `415` | Content-Type ausente. Adicione `Content-Type: application/json` no header |

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Multi-Devices obrigatório**: Este recurso só funciona com Multi-Devices ativado
- **Informações contextuais**: Use anotações para manter contexto sobre clientes e conversas
- **Integração CRM**: Sincronize anotações com sistemas de CRM para melhor gestão
- **Privacidade**: Anotações são privadas e visíveis apenas para sua conta

---

## Próximos Passos

- [Etiquetas](/docs/whatsapp-business/buscar-etiquetas) - Organize conversas com etiquetas
- [Multi-Devices](/docs/multi-devices/introducao) - Saiba mais sobre Multi-Devices (quando disponível)
