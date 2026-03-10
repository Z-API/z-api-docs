---
id: fixar-desafixar
title: Fixar/Desafixar mensagem
sidebar_position: 33
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Pin" size="lg" /> Fixar/Desafixar mensagem

Fixar ou desafixar uma mensagem em um chat usando a API do Z-API. Mensagens fixadas aparecem no topo do chat e são destacadas para fácil acesso.

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/pin-message
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

```json
{
  "phone": "5511999999999",
  "messageId": "77DF5293EBC176FFA6A88838E7A6AD83",
  "messageAction": "pin | unpin",
  "pinMessageDuration": "24_hours | 7_days | 30_days"
}
```

### Parâmetros {#parametros}

| Campo | Tipo | Obrigatório | Descrição |
|-----------|---------|-------------|--------------------------------------------------|
| phone | string | Sim | Número do contato ou ID do grupo |
| messageId | string | Sim | ID da mensagem a ser fixada ou desafixada |
| messageAction | string | Sim | Ação que será executada para a mensagem: fixada ou desafixada (pin, unpin) |
| pinMessageDuration | string | Sim | Tempo em que a mensagem ficará fixada. Não tem efeito no caso de desafixar uma mensagem |

## <Icon name="Info" size="md" /> Como funciona {#como-funciona}

Quando você fixa uma mensagem:

1. **Mensagem destacada** - A mensagem aparece no topo do chat
2. **Ícone de pin** - Um ícone de pin aparece ao lado da mensagem
3. **Acesso rápido** - Usuários podem acessar rapidamente informações importantes
4. **Limite** - Você pode fixar até 3 mensagens por chat

![Exemplo de mensagem fixada](/img/pin-message.jpeg)

:::tip Uso recomendado

Use mensagens fixadas para:
- Informações importantes (horários, endereços, contatos)
- Regras de grupos
- Anúncios e avisos
- Links importantes

:::

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Campo | Tipo | Descrição |
|---------|---------|----------------------------------------------|
| zaapId | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| messageId | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status |
| id | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone`, `messageId` e `messageAction` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 403 | Sem permissão | Você precisa ser admin do grupo para fixar mensagens |
| 404 | Mensagem não encontrada | Verifique se o `messageId` existe e é válido |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório e deve ser uma string não vazia');
  }
  return messageId.trim();
}

// Fixar ou desafixar mensagem
async function pinMessage(phone, messageId, pin) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedPin = Boolean(pin);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
      pin: validatedPin,
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (data.value) {
      console.log(pin ? 'Mensagem fixada com sucesso' : 'Mensagem desafixada com sucesso');
      return data;
    } else {
      throw new Error(data.message || 'Erro ao fixar/desafixar mensagem');
    }
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao fixar/desafixar mensagem:', error.message);
    throw error;
  }
}

// Exemplo de uso: fixar mensagem
pinMessage('5511999999999', '3EB0C767F26A', true);

// Exemplo de uso: desafixar mensagem
// pinMessage('5511999999999', '3EB0C767F26A', false);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface PinMessageResponse {
  value: boolean;
  message: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId: string): string {
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Função para fixar ou desafixar mensagem
async function pinMessage(
  phone: string,
  messageId: string,
  pin: boolean
): Promise<PinMessageResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  const validatedMessageId = validateMessageId(messageId);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;

  const payload = {
    phone: validatedPhone,
    messageId: validatedMessageId,
    pin: pin,
  };

  const response = await fetch(url, {
 method: 'POST',
 headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data.value) {
    throw new Error(data.message || 'Erro ao fixar/desafixar mensagem');
  }

  return data;
}

// Executar
pinMessage('5511999999999', '3EB0C767F26A', true)
  .then((result) => console.log('Sucesso:', result))
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
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_message_id(message_id: str) -> str:
    """Valida messageId"""
    if not message_id or not isinstance(message_id, str) or not message_id.strip():
        raise ValueError('messageId é obrigatório e deve ser uma string não vazia')
    return message_id.strip()

def pin_message(phone: str, message_id: str, pin: bool) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    validated_message_id = validate_message_id(message_id)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/pin-message"
    
headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
}
    
payload = {
        "phone": validated_phone,
        "messageId": validated_message_id,
        "pin": pin
}

try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
 response.raise_for_status()

 result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
 if result.get('value'):
            action = 'fixada' if pin else 'desafixada'
            print(f'Mensagem {action} com sucesso')
            return result
 else:
            raise ValueError(result.get('message', 'Erro ao fixar/desafixar mensagem'))
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
except requests.exceptions.RequestException as e:
 print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso: fixar mensagem
pin_message('5511999999999', '3EB0C767F26A', True)

# Exemplo de uso: desafixar mensagem
# pin_message('5511999999999', '3EB0C767F26A', False)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar messageId
MESSAGE_ID="${2:-3EB0C767F26A}"
if [ -z "$MESSAGE_ID" ] || [ "$MESSAGE_ID" = "" ]; then
    echo "Erro: messageId é obrigatório e deve ser uma string não vazia"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar pin (true ou false)
PIN="${3:-true}"
if [ "$PIN" != "true" ] && [ "$PIN" != "false" ]; then
    echo "Erro: pin deve ser 'true' ou 'false'"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Fixar ou desafixar mensagem via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/pin-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"${MESSAGE_ID}\",
    \"pin\": ${PIN}
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONE MESSAGE_ID PIN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Fixar ou desafixar mensagem
function pinMessage(phone, messageId, pin) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/pin-message`;
    const payload = JSON.stringify({
      phone: phone,
      messageId: messageId,
      pin: Boolean(pin),
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
            if (result.value) {
              console.log(pin ? 'Mensagem fixada com sucesso' : 'Mensagem desafixada com sucesso');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Erro ao fixar/desafixar mensagem'));
            }
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
pinMessage('5511999999999', '3EB0C767F26A', true)
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Rota para fixar ou desafixar mensagem
app.post('/api/pin-message', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, messageId, pin } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: validatedMessageId,
      pin: Boolean(pin),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    if (response.data.value) {
      res.json({
        success: true,
        data: response.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.message || 'Erro ao fixar/desafixar mensagem',
      });
    }
  } catch (error) {
    console.error('Erro ao fixar/desafixar mensagem:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao fixar/desafixar mensagem',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Middleware para fixar ou desafixar mensagem
app.use(async (ctx) => {
  if (ctx.path === '/api/pin-message' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, messageId, pin } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: validatedMessageId,
        pin: Boolean(pin),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      if (response.data.value) {
        ctx.body = {
          success: true,
          data: response.data,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: response.data.message || 'Erro ao fixar/desafixar mensagem',
        };
      }
    } catch (error) {
      console.error('Erro ao fixar/desafixar mensagem:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao fixar/desafixar mensagem',
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

public class PinMessage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar messageId
    private static String validateMessageId(String messageId) {
        if (messageId == null || messageId.trim().isEmpty()) {
            throw new IllegalArgumentException("messageId é obrigatório");
        }
        return messageId.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String messageId = validateMessageId("3EB0C767F26A");
            boolean pin = true; // true para fixar, false para desafixar

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/pin-message",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("messageId", messageId);
            payload.put("pin", pin);
            
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
                
                JSONObject result = new JSONObject(response.toString());
                if (result.getBoolean("value")) {
                    System.out.println(pin ? "Mensagem fixada com sucesso" : "Mensagem desafixada com sucesso");
                    System.out.println(result.toString());
                } else {
                    System.err.println("Erro: " + result.getString("message"));
                }
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

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
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

    // Validar messageId
    private static string ValidateMessageId(string messageId)
    {
        if (string.IsNullOrWhiteSpace(messageId))
        {
            throw new ArgumentException("messageId é obrigatório");
        }
        return messageId.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string messageId = ValidateMessageId("3EB0C767F26A");
            bool pin = true; // true para fixar, false para desafixar

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/pin-message";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                pin = pin
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
                    var jsonDoc = JsonDocument.Parse(result);
                    var root = jsonDoc.RootElement;
                    
                    if (root.GetProperty("value").GetBoolean())
                    {
                        Console.WriteLine(pin ? "Mensagem fixada com sucesso" : "Mensagem desafixada com sucesso");
                        Console.WriteLine(result);
                    }
                    else
                    {
                        Console.WriteLine($"Erro: {root.GetProperty("message").GetString()}");
                    }
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
    instanceId  = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca")
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

func validateMessageId(messageId string) error {
    if strings.TrimSpace(messageId) == "" {
        return fmt.Errorf("messageId é obrigatório")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    messageId := "3EB0C767F26A"
    pin := true // true para fixar, false para desafixar
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/pin-message", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "pin": pin,
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
        
        var result map[string]interface{}
        if err := json.Unmarshal(body, &result); err != nil {
            fmt.Printf("Erro ao parsear JSON: %v\n", err)
            return
        }
        
        if value, ok := result["value"].(bool); ok && value {
            action := "fixada"
            if !pin {
                action = "desafixada"
            }
            fmt.Printf("Mensagem %s com sucesso\n", action)
            fmt.Println(string(body))
        } else {
            fmt.Printf("Erro: %v\n", result["message"])
        }
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
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar messageId
function validateMessageId($messageId) {
    if (empty($messageId) || !is_string($messageId) || trim($messageId) === '') {
        throw new Exception('messageId é obrigatório');
    }
    return trim($messageId);
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $messageId = validateMessageId('3EB0C767F26A');
    $pin = true; // true para fixar, false para desafixar

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/pin-message',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'pin' => $pin,
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
        if ($result && isset($result['value']) && $result['value']) {
            $action = $pin ? 'fixada' : 'desafixada';
            echo "Mensagem {$action} com sucesso\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Erro: " . ($result['message'] ?? 'Erro ao fixar/desafixar mensagem') . "\n";
        }
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
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar messageId
def validate_message_id(message_id)
  raise 'messageId é obrigatório' if message_id.nil? || message_id.to_s.strip.empty?
  message_id.to_s.strip
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message_id = validate_message_id('3EB0C767F26A')
  pin = true # true para fixar, false para desafixar

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/pin-message")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    pin: pin
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['value']
      action = pin ? 'fixada' : 'desafixada'
      puts "Mensagem #{action} com sucesso"
      puts result.to_json
    else
      puts "Erro: #{result['message']}"
    end
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

// Validar messageId
func validateMessageId(_ messageId: String) throws -> String {
    if messageId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "messageId é obrigatório"])
    }
    return messageId.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let messageId = try validateMessageId("3EB0C767F26A")
    let pin = true // true para fixar, false para desafixar

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/pin-message"
    
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
        "messageId": messageId,
        "pin": pin
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
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                       let value = result["value"] as? Bool, value {
                        let action = pin ? "fixada" : "desafixada"
                        print("Mensagem \(action) com sucesso")
                        print(result)
                    } else if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Erro: \(result["message"] as? String ?? "Erro ao fixar/desafixar mensagem")")
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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar messageId
function Validate-MessageId {
    param([string]$MessageId)
    if ([string]::IsNullOrWhiteSpace($MessageId)) {
        throw "messageId é obrigatório"
    }
    return $MessageId.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $messageId = Validate-MessageId "3EB0C767F26A"
    $pin = $true # $true para fixar, $false para desafixar

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/pin-message"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        pin = $pin
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    if ($response.value) {
        $action = if ($pin) { "fixada" } else { "desafixada" }
        Write-Host "Mensagem $action com sucesso"
        $response | ConvertTo-Json -Depth 10
    } else {
        Write-Host "Erro: $($response.message)"
    }
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/pin-message HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
 "phone": "5511999999999",
 "messageId": "3EB0C767F26A",
 "pin": true
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
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    std::string phone = "5511999999999";
    std::string messageId = "3EB0C767F26A";
    bool pin = true; // true para fixar, false para desafixar
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    if (messageId.empty()) {
        std::cerr << "Erro: messageId é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/pin-message";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"pin\":" << (pin ? "true" : "false")
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
                std::cout << (pin ? "Mensagem fixada com sucesso" : "Mensagem desafixada com sucesso") << std::endl;
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
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    char* phone = "5511999999999";
    char* messageId = "3EB0C767F26A";
    int pin = 1; // 1 para fixar, 0 para desafixar
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    if (!messageId || strlen(messageId) == 0) {
        fprintf(stderr, "Erro: messageId é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/pin-message", instanceId);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"pin\":%s}",
        phone, messageId, pin ? "true" : "false");
    
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
                printf("%s\n", pin ? "Mensagem fixada com sucesso" : "Mensagem desafixada com sucesso");
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

## <Icon name="AlertTriangle" size="md" /> Limitações {#limitacoes}

- **Máximo de mensagens fixadas**: 3 mensagens por chat
- **Permissões**: Em grupos, você precisa ser administrador para fixar mensagens
- **Mensagens antigas**: Mensagens muito antigas podem não ser fixáveis
- **Chats individuais**: Você pode fixar mensagens em chats individuais sem restrições de permissão

:::warning Importante

Em grupos, apenas administradores podem fixar mensagens. Se você não for admin, a operação retornará erro 403.

:::

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- Mensagens fixadas aparecem no topo do chat para fácil acesso
- Use o `messageId` da mensagem que deseja fixar ou desafixar
- O `phone` deve ser o número do contato ou ID do grupo
- Mensagens fixadas são visíveis para todos os participantes do chat
- Para grupos, certifique-se de ter permissões de administrador

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Obter chats](/docs/chats/pegar) - Liste todos os chats da sua instância
- [Fixar chat](/docs/chats/fixar) - Fixar chats no topo da lista
- [Responder mensagem](/docs/messages/responder) - Responda a mensagens recebidas
