---
id: alterar-descricao
sidebar_position: 8
title: Change Description of the Group
---
id: alterar-descricao
title: Change Group Description
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Change Group Description

Change the description of an existing group through the Z-API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows changing the description of a group. The description is displayed on the group information page and can be viewed by all participants.

:::caution Attention
**Only administrators** can change the group description.
:::

:::caution Attention
On November 4, 2021, WhatsApp changed the format for creating new groups:
- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

Make sure to use the correct format of __PROTECTED_1e25b89d-e136-431f-bd83-f3f4c400e671__ based on the group's creation date.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-group-description
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `groupId` | string | Group ID (old format: `"5511999999999-1623281429"` or new format: `"120363019502650977-group"`) |
| `groupDescription` | string | New group description |

### Body Request

```json
// Forma antiga
{
  "groupId": "5511999999999-1623281429",
  "groupDescription": "descrição do grupo"
}

// --------------------------------------------------------

// Forma nova
{
  "groupId": "120363019502650977-group",
  "groupDescription": "descrição do grupo"
}
```

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN

{
 "groupId": "120363019502650977-group",
 "groupDescription": "Nova descrição do grupo"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateGroupId(groupId) {
  if (!groupId || typeof groupId !== 'string' || groupId.trim().length === 0) {
    throw new Error('GroupId é obrigatório');
  }
  // Aceita formato antigo (5511999999999-1623281429) ou novo (120363019502650977-group)
  const trimmed = groupId.trim();
  if (!trimmed.includes('-') && !trimmed.includes('@g.us')) {
    throw new Error('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
  }
  return trimmed;
}

function validateGroupDescription(description) {
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Descrição do grupo é obrigatória');
  }
  return description.trim();
}

// Dados da requisição com validação
const groupId = validateGroupId('120363019502650977-group');
const groupDescription = validateGroupDescription('Nova descrição do grupo');

// Alterar descrição com tratamento seguro de erros
async function updateGroupDescription() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-group-description`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupId: groupId,
        groupDescription: groupDescription
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Descrição do grupo alterada com sucesso');
    } else {
      console.error('Erro ao alterar descrição do grupo');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao alterar descrição do grupo:', error.message);
    throw error;
  }
}

// Executar função
updateGroupDescription();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Interface para resposta
interface UpdateGroupDescriptionResponse {
  value: boolean;
}

// Validação de entrada (segurança)
function validateGroupId(groupId: string): string {
  if (!groupId || groupId.trim().length === 0) {
    throw new Error('GroupId é obrigatório');
  }
  const trimmed = groupId.trim();
  if (!trimmed.includes('-') && !trimmed.includes('@g.us')) {
    throw new Error('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
  }
  return trimmed;
}

function validateGroupDescription(description: string): string {
  if (!description || description.trim().length === 0) {
    throw new Error('Descrição do grupo é obrigatória');
  }
  return description.trim();
}

// Dados da requisição com validação
const groupId: string = validateGroupId('120363019502650977-group');
const groupDescription: string = validateGroupDescription('Nova descrição do grupo');

// Função para alterar descrição
async function updateGroupDescription(): Promise<UpdateGroupDescriptionResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-group-description`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      groupId: groupId,
      groupDescription: groupDescription
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
updateGroupDescription()
  .then((result) => console.log('Sucesso:', result.value))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

def validate_group_id(group_id: str) -> str:
    """Valida formato do groupId."""
    if not group_id or not group_id.strip():
        raise ValueError('GroupId é obrigatório')
    trimmed = group_id.strip()
    if '-' not in trimmed and '@g.us' not in trimmed:
        raise ValueError('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us')
    return trimmed

def validate_group_description(description: str) -> str:
    """Valida descrição do grupo."""
    if not description or not description.strip():
        raise ValueError('Descrição do grupo é obrigatória')
    return description.strip()

# Dados da requisição com validação
group_id = validate_group_id('120363019502650977-group')
group_description = validate_group_description('Nova descrição do grupo')

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/update-group-description"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Body da requisição
payload = {
    "groupId": group_id,
    "groupDescription": group_description
}

# Alterar descrição com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Descrição do grupo alterada com sucesso')
    else:
        print('Erro ao alterar descrição do grupo')
    
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
GROUP_ID="120363019502650977-group"
GROUP_DESCRIPTION="Nova descrição do grupo"

# Alterar descrição via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/update-group-description" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"groupId\": \"${GROUP_ID}\",
    \"groupDescription\": \"${GROUP_DESCRIPTION}\"
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
function validateGroupId(groupId) {
  if (!groupId || typeof groupId !== 'string' || groupId.trim().length === 0) {
    throw new Error('GroupId é obrigatório');
  }
  const trimmed = groupId.trim();
  if (!trimmed.includes('-') && !trimmed.includes('@g.us')) {
    throw new Error('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
  }
  return trimmed;
}

function validateGroupDescription(description) {
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Descrição do grupo é obrigatória');
  }
  return description.trim();
}

// Dados da requisição com validação
const groupId = validateGroupId('120363019502650977-group');
const groupDescription = validateGroupDescription('Nova descrição do grupo');

// Alterar descrição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-group-description`);

const body = JSON.stringify({
  groupId: groupId,
  groupDescription: groupDescription
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
      if (result.value) {
        console.log('Descrição do grupo alterada com sucesso');
      } else {
        console.error('Erro ao alterar descrição do grupo');
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
function validateGroupId(groupId) {
  if (!groupId || typeof groupId !== 'string' || groupId.trim().length === 0) {
    throw new Error('GroupId é obrigatório');
  }
  const trimmed = groupId.trim();
  if (!trimmed.includes('-') && !trimmed.includes('@g.us')) {
    throw new Error('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
  }
  return trimmed;
}

function validateGroupDescription(description) {
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Descrição do grupo é obrigatória');
  }
  return description.trim();
}

// Rota para alterar descrição
app.post('/update-group-description', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawGroupId = req.body.groupId || '120363019502650977-group';
    const rawDescription = req.body.groupDescription || 'Nova descrição do grupo';
    const groupId = validateGroupId(rawGroupId);
    const groupDescription = validateGroupDescription(rawDescription);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-group-description`);

    const body = JSON.stringify({
      groupId: groupId,
      groupDescription: groupDescription
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
    console.error('Erro ao alterar descrição do grupo:', error.message);
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
function validateGroupId(groupId) {
  if (!groupId || typeof groupId !== 'string' || groupId.trim().length === 0) {
    throw new Error('GroupId é obrigatório');
  }
  const trimmed = groupId.trim();
  if (!trimmed.includes('-') && !trimmed.includes('@g.us')) {
    throw new Error('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
  }
  return trimmed;
}

function validateGroupDescription(description) {
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Descrição do grupo é obrigatória');
  }
  return description.trim();
}

// Rota para alterar descrição
router.post('/update-group-description', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawGroupId = ctx.request.body.groupId || '120363019502650977-group';
    const rawDescription = ctx.request.body.groupDescription || 'Nova descrição do grupo';
    const groupId = validateGroupId(rawGroupId);
    const groupDescription = validateGroupDescription(rawDescription);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-group-description`);

    const body = JSON.stringify({
      groupId: groupId,
      groupDescription: groupDescription
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
  console.error('Erro ao alterar descrição do grupo:', err.message);
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

public class UpdateGroupDescription {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validateGroupId(String groupId) {
        if (groupId == null || groupId.trim().isEmpty()) {
            throw new IllegalArgumentException("GroupId é obrigatório");
        }
        String trimmed = groupId.trim();
        if (!trimmed.contains("-") && !trimmed.contains("@g.us")) {
            throw new IllegalArgumentException("GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us");
        }
        return trimmed;
    }

    private static String validateGroupDescription(String description) {
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Descrição do grupo é obrigatória");
        }
        return description.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String groupId = validateGroupId("120363019502650977-group");
            String groupDescription = validateGroupDescription("Nova descrição do grupo");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/update-group-description",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
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
            String jsonBody = String.format("{\"groupId\":\"%s\",\"groupDescription\":\"%s\"}", 
                groupId.replace("\"", "\\\""), groupDescription.replace("\"", "\\\""));
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Descrição do grupo alterada com sucesso");
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

public class UpdateGroupDescription
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static string ValidateGroupId(string groupId)
    {
        if (string.IsNullOrWhiteSpace(groupId))
        {
            throw new ArgumentException("GroupId é obrigatório");
        }
        string trimmed = groupId.Trim();
        if (!trimmed.Contains("-") && !trimmed.Contains("@g.us"))
        {
            throw new ArgumentException("GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us");
        }
        return trimmed;
    }

    private static string ValidateGroupDescription(string description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            throw new ArgumentException("Descrição do grupo é obrigatória");
        }
        return description.Trim();
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string groupId = ValidateGroupId("120363019502650977-group");
            string groupDescription = ValidateGroupDescription("Nova descrição do grupo");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/update-group-description";

            var payload = new
            {
                groupId = groupId,
                groupDescription = groupDescription
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
                    Console.WriteLine("Descrição do grupo alterada com sucesso");
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
func validateGroupId(groupId string) (string, error) {
    trimmed := strings.TrimSpace(groupId)
    if trimmed == "" {
        return "", fmt.Errorf("GroupId é obrigatório")
    }
    if !strings.Contains(trimmed, "-") && !strings.Contains(trimmed, "@g.us") {
        return "", fmt.Errorf("GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us")
    }
    return trimmed, nil
}

func validateGroupDescription(description string) (string, error) {
    trimmed := strings.TrimSpace(description)
    if trimmed == "" {
        return "", fmt.Errorf("Descrição do grupo é obrigatória")
    }
    return trimmed, nil
}

func main() {
    // Dados da requisição com validação
    groupId, err := validateGroupId("120363019502650977-group")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }
    groupDescription, err := validateGroupDescription("Nova descrição do grupo")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/update-group-description",
        instanceId, instanceToken)

    payload := map[string]interface{}{
        "groupId":         groupId,
        "groupDescription": groupDescription,
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
        fmt.Printf("Descrição do grupo alterada com sucesso\n")
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
function validateGroupId($groupId) {
    $trimmed = trim($groupId);
    if (empty($trimmed)) {
        throw new Exception('GroupId é obrigatório');
    }
    if (strpos($trimmed, '-') === false && strpos($trimmed, '@g.us') === false) {
        throw new Exception('GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us');
    }
    return $trimmed;
}

function validateGroupDescription($description) {
    $trimmed = trim($description);
    if (empty($trimmed)) {
        throw new Exception('Descrição do grupo é obrigatória');
    }
    return $trimmed;
}

try {
    // Dados da requisição com validação
    $groupId = validateGroupId('120363019502650977-group');
    $groupDescription = validateGroupDescription('Nova descrição do grupo');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/update-group-description',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $jsonBody = json_encode([
        'groupId' => $groupId,
        'groupDescription' => $groupDescription
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
        if ($result['value'] ?? false) {
            echo "Descrição do grupo alterada com sucesso\n";
        } else {
            echo "Erro ao alterar descrição do grupo\n";
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
def validate_group_id(group_id)
  trimmed = group_id.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'GroupId é obrigatório'
  end
  unless trimmed.include?('-') || trimmed.include?('@g.us')
    raise ArgumentError, 'GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us'
  end
  trimmed
end

def validate_group_description(description)
  trimmed = description.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Descrição do grupo é obrigatória'
  end
  trimmed
end

begin
  # Dados da requisição com validação
  group_id = validate_group_id('120363019502650977-group')
  group_description = validate_group_description('Nova descrição do grupo')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/update-group-description")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    groupId: group_id,
    groupDescription: group_description
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts "Descrição do grupo alterada com sucesso"
    else
      puts "Erro ao alterar descrição do grupo"
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
func validateGroupId(_ groupId: String) throws -> String {
    let trimmed = groupId.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "GroupId é obrigatório"])
    }
    guard trimmed.contains("-") || trimmed.contains("@g.us") else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us"])
    }
    return trimmed
}

func validateGroupDescription(_ description: String) throws -> String {
    let trimmed = description.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Descrição do grupo é obrigatória"])
    }
    return trimmed
}

// Dados da requisição com validação
let groupId = try validateGroupId("120363019502650977-group")
let groupDescription = try validateGroupDescription("Nova descrição do grupo")

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/update-group-description") else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "POST"

let payload: [String: Any] = [
    "groupId": groupId,
    "groupDescription": groupDescription
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
                if let value = result?["value"] as? Bool, value {
                    print("Descrição do grupo alterada com sucesso")
                } else {
                    print("Erro ao alterar descrição do grupo")
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
function Validate-GroupId {
    param([string]$GroupId)
    $trimmed = $GroupId.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "GroupId é obrigatório"
    }
    if ($trimmed -notmatch '-' -and $trimmed -notmatch '@g.us') {
        throw "GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us"
    }
    return $trimmed
}

function Validate-GroupDescription {
    param([string]$Description)
    $trimmed = $Description.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Descrição do grupo é obrigatória"
    }
    return $trimmed
}

try {
    # Dados da requisição com validação
    $groupId = Validate-GroupId -GroupId "120363019502650977-group"
    $groupDescription = Validate-GroupDescription -Description "Nova descrição do grupo"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/update-group-description"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $body = @{
        groupId = $groupId
        groupDescription = $groupDescription
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.value) {
        Write-Host "Descrição do grupo alterada com sucesso"
    } else {
        Write-Host "Erro ao alterar descrição do grupo"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http-raw" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json

{
  "groupId": "120363019502650977-group",
  "groupDescription": "Nova descrição do grupo"
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <sstream>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Validação de entrada (segurança)
std::string validateGroupId(const std::string& groupId) {
    std::string trimmed = groupId;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("GroupId é obrigatório");
    }
    if (trimmed.find("-") == std::string::npos && trimmed.find("@g.us") == std::string::npos) {
        throw std::runtime_error("GroupId deve estar no formato: número-xxxxx ou número-group ou número@g.us");
    }
    return trimmed;
}

std::string validateGroupDescription(const std::string& description) {
    std::string trimmed = description;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("Descrição do grupo é obrigatória");
    }
    return trimmed;
}

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // Dados da requisição com validação
        std::string groupId = validateGroupId("120363019502650977-group");
        std::string groupDescription = validateGroupDescription("Nova descrição do grupo");

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"groupId\":\"" << groupId << "\",\"groupDescription\":\"" << groupDescription << "\"}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/update-group-description";
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
                std::cout << "Descrição do grupo alterada com sucesso" << std::endl;
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
int validateGroupId(const char* groupId, char* cleaned) {
    int len = strlen(groupId);
    int j = 0;
    
    // Remove espaços iniciais e finais
    int start = 0;
    while (start < len && isspace(groupId[start])) start++;
    int end = len - 1;
    while (end >= start && isspace(groupId[end])) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    for (int i = start; i <= end; i++) {
        cleaned[j++] = groupId[i];
    }
    cleaned[j] = '\0';
    
    if (strchr(cleaned, '-') == NULL && strstr(cleaned, "@g.us") == NULL) {
        return 0; // Inválido
    }
    
    return 1; // Válido
}

int validateGroupDescription(const char* description, char* cleaned) {
    int len = strlen(description);
    int j = 0;
    
    // Remove espaços iniciais e finais
    int start = 0;
    while (start < len && isspace(description[start])) start++;
    int end = len - 1;
    while (end >= start && isspace(description[end])) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    for (int i = start; i <= end; i++) {
        cleaned[j++] = description[i];
    }
    cleaned[j] = '\0';
    
    return 1; // Válido
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
    const char* groupId = "120363019502650977-group";
    const char* groupDescription = "Nova descrição do grupo";
    char cleanedGroupId[256];
    char cleanedDescription[512];
    
    if (!validateGroupId(groupId, cleanedGroupId)) {
        fprintf(stderr, "GroupId inválido. Deve estar no formato: número-xxxxx ou número-group ou número@g.us\n");
        return 1;
    }

    if (!validateGroupDescription(groupDescription, cleanedDescription)) {
        fprintf(stderr, "Descrição do grupo inválida\n");
        return 1;
    }

    // Body da requisição
    char jsonBody[1024];
    snprintf(jsonBody, sizeof(jsonBody), "{\"groupId\":\"%s\",\"groupDescription\":\"%s\"}", 
             cleanedGroupId, cleanedDescription);

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/update-group-description",
                 instanceId, instanceToken);

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
            printf("Descrição do grupo alterada com sucesso\n");
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

### 200 OK {#200-ok}

```json
{
 "value": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `value` | boolean | `true` if the update was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|--------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the request headers |
| `401` | Invalid token | Check the header `Client-Token` |
| `400` | Invalid parameters | Check if the `groupId` and `groupDescription` are correct |
| `403` | No permission | Only administrators can change the group description |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Permission**: Only group administrators can change the description
- **Visibility**: The description is visible to all group participants
- **Format of groupId**: Use the old format for groups created before November 4, 2021, or the new format for groups created after this date