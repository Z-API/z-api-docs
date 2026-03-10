---
id: enquete
title: Enviar Enquete
sidebar_position: 28
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="BarChart" size="lg" /> Enviar Enquete

Envie enquetes interativas para seus contatos ou grupos no WhatsApp. As enquetes permitem que os destinatários votem em uma ou múltiplas opções, facilitando a coleta de opiniões e feedback.

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Pesquisas de Satisfação**: Coletar feedback sobre produtos ou serviços
- **Votação em Grupos**: Decidir entre opções em grupos de trabalho ou comunidade
- **Enquetes de Opinião**: Descobrir preferências dos clientes
- **Coleta de Dados**: Obter informações estruturadas de forma interativa

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Se você está usando uma plataforma de automação como n8n ou Make, configure os seguintes campos:

1. **`phone`**: Número do destinatário (formato: `5511999999999`)
2. **`message`**: Texto da pergunta da enquete
3. **`poll`**: Array com as opções da enquete (mínimo 2 opções)
4. **`pollMaxOptions`** (opcional): Número máximo de votos por pessoa (padrão: múltiplas escolhas)

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do destinatário no formato DDI DDD NÚMERO (ex: `5511999999999`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara. Para grupos, use o ID do grupo. |
| `message` | string | Texto da pergunta da enquete |
| `poll` | PollItem[] | Lista de opções da enquete (mínimo 2 opções) |

#### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `delayMessage` | number | Delay em segundos (1-15). O delay padrão é de 1-3 segundos se não informado |
| `pollMaxOptions` | number | Número máximo de votos por pessoa. Se não informado, permite múltiplas escolhas. Use `1` para escolha única |

#### PollItem

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `name` | string | Nome da opção da enquete |

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

As enquetes são uma forma interativa de coletar opiniões e feedback. Você pode criar enquetes com múltiplas escolhas (padrão) ou escolha única (definindo `pollMaxOptions: 1`).

**Importante**: 
- O destinatário pode votar em uma enquete recebida
- Você pode votar em enquetes que você mesmo enviou
- Use o `messageId` retornado para permitir votos na enquete

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar opções da enquete (2-12 opções)
function validatePollOptions(poll) {
  if (!Array.isArray(poll) || poll.length < 2 || poll.length > 12) {
    throw new Error('A enquete deve ter entre 2 e 12 opções');
  }
  for (const option of poll) {
    if (!option.name || typeof option.name !== 'string' || option.name.trim() === '') {
      throw new Error('Cada opção da enquete deve ter um nome válido');
    }
  }
  return poll;
}

// Enviar enquete
async function sendPoll(phone, message, pollOptions) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedPoll = validatePollOptions(pollOptions);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-poll`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        message: message.trim(),
        poll: validatedPoll.map(option => ({ name: option.name.trim() })),
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Enquete enviada com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar enquete:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendPoll('5511999999999', 'Qual a melhor API para WhatsApp?', [
  { name: 'Z-API' },
  { name: 'Outras' }
]);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface PollResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

interface PollOption {
  name: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar opções da enquete
function validatePollOptions(poll: PollOption[]): PollOption[] {
  if (!Array.isArray(poll) || poll.length < 2 || poll.length > 12) {
    throw new Error('A enquete deve ter entre 2 e 12 opções');
  }
  for (const option of poll) {
    if (!option.name || option.name.trim() === '') {
      throw new Error('Cada opção da enquete deve ter um nome válido');
    }
  }
  return poll;
}

// Função para enviar enquete
async function sendPoll(
  phone: string,
  message: string,
  pollOptions: PollOption[]
): Promise<PollResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedPoll = validatePollOptions(pollOptions);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-poll`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      poll: validatedPoll.map(option => ({ name: option.name.trim() })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendPoll('5511999999999', 'Qual a melhor API para WhatsApp?', [
  { name: 'Z-API' },
  { name: 'Outras' }
])
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, List

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_poll_options(poll: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Valida opções da enquete (2-12 opções)"""
    if not isinstance(poll, list) or len(poll) < 2 or len(poll) > 12:
        raise ValueError('A enquete deve ter entre 2 e 12 opções')
    for option in poll:
        if not isinstance(option, dict) or 'name' not in option or not option['name'] or not option['name'].strip():
            raise ValueError('Cada opção da enquete deve ter um nome válido')
    return poll

def send_poll(phone: str, message: str, poll_options: List[Dict[str, str]]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_poll = validate_poll_options(poll_options)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-poll"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "poll": [{"name": option["name"].strip()} for option in validated_poll]
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Enquete enviada com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_poll('5511999999999', 'Qual a melhor API para WhatsApp?', [
    {'name': 'Z-API'},
    {'name': 'Outras'}
])
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar enquete via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-poll" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Qual a melhor API para WhatsApp?\",
    \"poll\": [
      {\"name\": \"Z-API\"},
      {\"name\": \"Outras\"}
    ]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar opções da enquete
function validatePollOptions(poll) {
  if (!Array.isArray(poll) || poll.length < 2 || poll.length > 12) {
    throw new Error('A enquete deve ter entre 2 e 12 opções');
  }
  for (const option of poll) {
    if (!option.name || typeof option.name !== 'string' || option.name.trim() === '') {
      throw new Error('Cada opção da enquete deve ter um nome válido');
    }
  }
  return poll;
}

// Enviar enquete
function sendPoll(phone, message, pollOptions) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      const validatedPoll = validatePollOptions(pollOptions);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-poll`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      poll: pollOptions.map(option => ({ name: option.name.trim() })),
    });
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = JSON.parse(data);
            console.log('Enquete enviada com sucesso');
            resolve(result);
          } catch (error) {
            reject(new Error('Erro ao parsear resposta JSON'));
          }
        } else {
          reject(new Error(`Erro HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erro na requisição:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Executar
sendPoll('5511999999999', 'Qual a melhor API para WhatsApp?', [
  { name: 'Z-API' },
  { name: 'Outras' }
])
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar opções da enquete
function validatePollOptions(poll) {
  if (!Array.isArray(poll) || poll.length < 2 || poll.length > 12) {
    throw new Error('A enquete deve ter entre 2 e 12 opções');
  }
  for (const option of poll) {
    if (!option.name || typeof option.name !== 'string' || option.name.trim() === '') {
      throw new Error('Cada opção da enquete deve ter um nome válido');
    }
  }
  return poll;
}

// Rota para enviar enquete
app.post('/api/send-poll', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, poll } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    const validatedPoll = validatePollOptions(poll);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-poll`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      poll: validatedPoll.map(option => ({ name: option.name.trim() })),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar enquete:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar enquete',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar opções da enquete
function validatePollOptions(poll) {
  if (!Array.isArray(poll) || poll.length < 2 || poll.length > 12) {
    throw new Error('A enquete deve ter entre 2 e 12 opções');
  }
  for (const option of poll) {
    if (!option.name || typeof option.name !== 'string' || option.name.trim() === '') {
      throw new Error('Cada opção da enquete deve ter um nome válido');
    }
  }
  return poll;
}

// Middleware para enviar enquete
app.use(async (ctx) => {
  if (ctx.path === '/api/send-poll' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, poll } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      const validatedPoll = validatePollOptions(poll);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-poll`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        poll: validatedPoll.map(option => ({ name: option.name.trim() })),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao enviar enquete:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar enquete',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;
import org.json.JSONArray;

public class SendPoll {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar opções da enquete
    private static JSONArray validatePollOptions(JSONArray poll) {
        if (poll == null || poll.length() < 2 || poll.length() > 12) {
            throw new IllegalArgumentException("A enquete deve ter entre 2 e 12 opções");
        }
        for (int i = 0; i < poll.length(); i++) {
            JSONObject option = poll.getJSONObject(i);
            if (!option.has("name") || option.getString("name").trim().isEmpty()) {
                throw new IllegalArgumentException("Cada opção da enquete deve ter um nome válido");
            }
        }
        return poll;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String message = "Qual a melhor API para WhatsApp?";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }
            
            JSONArray poll = new JSONArray();
            poll.put(new JSONObject().put("name", "Z-API"));
            poll.put(new JSONObject().put("name", "Outras"));
            validatePollOptions(poll);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-poll",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("poll", poll);
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = payload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            if (responseCode >= 200 && responseCode < 300) {
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8)
                );
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                
                System.out.println("Enquete enviada com sucesso");
                System.out.println(response.toString());
            } else {
                System.err.println("Erro HTTP " + responseCode);
            }
            
            connection.disconnect();
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
using System.Collections.Generic;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validar telefone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar opções da enquete
    private static List<object> ValidatePollOptions(List<object> poll)
    {
        if (poll == null || poll.Count < 2 || poll.Count > 12)
        {
            throw new ArgumentException("A enquete deve ter entre 2 e 12 opções");
        }
        foreach (var option in poll)
        {
            var dict = option as Dictionary<string, object>;
            if (dict == null || !dict.ContainsKey("name") || string.IsNullOrWhiteSpace(dict["name"]?.ToString()))
            {
                throw new ArgumentException("Cada opção da enquete deve ter um nome válido");
            }
        }
        return poll;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string message = "Qual a melhor API para WhatsApp?";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }
            
            var poll = new List<object>
            {
                new { name = "Z-API" },
                new { name = "Outras" }
            };
            ValidatePollOptions(poll);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-poll";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                poll = poll
            };

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Enquete enviada com sucesso");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}");
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

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func validatePollOptions(poll []map[string]string) error {
    if len(poll) < 2 || len(poll) > 12 {
        return fmt.Errorf("a enquete deve ter entre 2 e 12 opções")
    }
    for _, option := range poll {
        if option["name"] == "" || strings.TrimSpace(option["name"]) == "" {
            return fmt.Errorf("cada opção da enquete deve ter um nome válido")
        }
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    message := "Qual a melhor API para WhatsApp?"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }
    
    poll := []map[string]string{
        {"name": "Z-API"},
        {"name": "Outras"},
    }
    if err := validatePollOptions(poll); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-poll", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "poll": poll,
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Erro ao ler resposta: %v\n", err)
            return
        }
        
        fmt.Println("Enquete enviada com sucesso")
        fmt.Println(string(body))
    } else {
        fmt.Printf("Erro HTTP %d\n", resp.StatusCode)
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
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar opções da enquete
function validatePollOptions($poll) {
    if (!is_array($poll) || count($poll) < 2 || count($poll) > 12) {
        throw new Exception('A enquete deve ter entre 2 e 12 opções');
    }
    foreach ($poll as $option) {
        if (!isset($option['name']) || empty(trim($option['name']))) {
            throw new Exception('Cada opção da enquete deve ter um nome válido');
        }
    }
    return $poll;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $message = 'Qual a melhor API para WhatsApp?';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }
    $poll = [
        ['name' => 'Z-API'],
        ['name' => 'Outras'],
    ];
    validatePollOptions($poll);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-poll',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'poll' => array_map(function($option) {
            return ['name' => trim($option['name'])];
        }, $poll),
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Enquete enviada com sucesso\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "Erro HTTP $httpCode\n";
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar opções da enquete
def validate_poll_options(poll)
  raise 'A enquete deve ter entre 2 e 12 opções' unless poll.is_a?(Array) && poll.length >= 2 && poll.length <= 12
  poll.each do |option|
    raise 'Cada opção da enquete deve ter um nome válido' unless option.is_a?(Hash) && option[:name] && !option[:name].strip.empty?
  end
  poll
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message = 'Qual a melhor API para WhatsApp?'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?
  poll = [
    { name: 'Z-API' },
    { name: 'Outras' }
  ]
  validate_poll_options(poll)

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-poll")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    poll: poll.map { |option| { name: option[:name].strip } }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Enquete enviada com sucesso'
    puts result.to_json
  else
    puts "Erro HTTP #{response.code}"
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
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

// Validar opções da enquete
func validatePollOptions(_ poll: [[String: String]]) throws -> [[String: String]] {
    if poll.count < 2 || poll.count > 12 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "A enquete deve ter entre 2 e 12 opções"])
    }
    for option in poll {
        guard let name = option["name"], !name.trimmingCharacters(in: .whitespaces).isEmpty else {
            throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Cada opção da enquete deve ter um nome válido"])
        }
    }
    return poll
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let message = "Qual a melhor API para WhatsApp?"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }
    let poll = try validatePollOptions([
        ["name": "Z-API"],
        ["name": "Outras"]
    ])

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-poll"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: Any] = [
        "phone": phone,
        "message": message.trimmingCharacters(in: .whitespaces),
        "poll": poll.map { ["name": $0["name"]?.trimmingCharacters(in: .whitespaces) ?? ""] }
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Resposta inválida")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Enquete enviada com sucesso")
                        print(result)
                    }
                } catch {
                    print("Erro ao parsear JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("Erro HTTP \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar opções da enquete
function Validate-PollOptions {
    param([array]$Poll)
    if ($Poll.Count -lt 2 -or $Poll.Count -gt 12) {
        throw "A enquete deve ter entre 2 e 12 opções"
    }
    foreach ($option in $Poll) {
        if (-not $option.name -or [string]::IsNullOrWhiteSpace($option.name)) {
            throw "Cada opção da enquete deve ter um nome válido"
        }
    }
    return $Poll
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $message = "Qual a melhor API para WhatsApp?"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }
    $poll = @(
        @{ name = "Z-API" },
        @{ name = "Outras" }
    )
    $poll = Validate-PollOptions $poll

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-poll"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        poll = $poll | ForEach-Object { @{ name = $_.name.Trim() } }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Enquete enviada com sucesso"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Qual a melhor API para WhatsApp?",
  "poll": [
    {"name": "Z-API"},
    {"name": "Outras"}
  ]
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstdlib>
#include <regex>
#include <sstream>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnvVar(const std::string& key, const std::string& defaultValue) {
    const char* val = std::getenv(key.c_str());
    return val ? std::string(val) : defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "5511999999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    std::string message = "Qual a melhor API para WhatsApp?";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-poll";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"poll\":["
                  << "{\"name\":\"Z-API\"},"
                  << "{\"name\":\"Outras\"}"
                  << "]"
                  << "}";
    std::string payload = payloadStream.str();
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                std::cout << "Enquete enviada com sucesso" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "Erro HTTP " << responseCode << std::endl;
            }
        } else {
            std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
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
#include <curl/curl.h>
#include <regex.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnvVar(const char* key, const char* defaultValue) {
    char* val = getenv(key);
    return val ? val : (char*)defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    memcpy(data, contents, totalSize);
    data[totalSize] = '\0';
    return totalSize;
}

int validatePhone(const char* phone) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]{10,15}$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, phone, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "5511999999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    char* message = "Qual a melhor API para WhatsApp?";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-poll", instanceId, instanceToken);
    
    char payload[256];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"poll\":[{\"name\":\"Z-API\"},{\"name\":\"Outras\"}]}",
        phone, message);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                printf("Enquete enviada com sucesso\n");
                printf("%s\n", responseData);
            } else {
                printf("Erro HTTP %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
</Tabs>

### Exemplo: Enquete com Escolha Única

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `zaapId` | string | ID da mensagem no Z-API |
| `messageId` | string | ID da mensagem no WhatsApp (use este ID para votar na enquete) |
| `id` | string | ID para compatibilidade com Zapier (mesmo valor do `messageId`) |

**Exemplo de resposta:**

```json
{
 "zaapId": "3999984263738042930CD6ECDE9VDWSA",
 "messageId": "D241XXXX732339502B68",
 "id": "D241XXXX732339502B68"
}
```

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `405` | Método HTTP incorreto. Verifique se está usando `POST` |
| `415` | Content-Type ausente. Adicione `Content-Type: application/json` no header |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando uma enquete é recebida, o webhook [Ao receber mensagem](/docs/webhooks/ao-receber) será acionado com o tipo `poll`.

Para mais detalhes sobre como receber e processar enquetes, consulte a documentação do webhook [Ao receber mensagem](/docs/webhooks/ao-receber#exemplo-de-retorno-de-enquete).

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Armazene o `messageId`**: Você precisará do `messageId` retornado para permitir que usuários votem na enquete usando o endpoint [Voto em Enquete](/docs/messages/voto-enquete)
- **Mínimo de opções**: Uma enquete deve ter pelo menos 2 opções
- **Escolha única vs múltipla**: Use `pollMaxOptions: 1` para enquetes de escolha única
- **Enquetes em grupos**: Você pode enviar enquetes para grupos usando o ID do grupo no campo `phone`

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Votar em uma enquete](/docs/messages/voto-enquete) - Aprenda como permitir que usuários votem em enquetes
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações sobre enquetes
