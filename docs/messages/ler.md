---
id: ler
title: Marcar como lida
sidebar_position: 26
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Marcar como lida

Marque uma mensagem específica como lida usando a API do Z-API. Isso remove os indicadores de "não lido" e atualiza o status de leitura no WhatsApp.

Método utilizado para marcar uma mensagem em um chat como lida.

![Exemplo de leitura de mensagem](/video/read-message.gif)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/read-message
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

```json
{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário/remetente no formato DDI DDD NÚMERO. **IMPORTANTE:** Envie somente números, sem formatação ou máscara |
| `messageId` | string | Sim | ID original da mensagem. No caso de mensagem enviada por você, é o código que vem no seu response. Caso seja uma mensagem enviada por um contato, você vai receber este `messageId` pelo seu webhook de receive |

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do chat onde a mensagem está localizada. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

2. **`messageId`**: O ID da mensagem que você deseja marcar como lida. Este é o `messageId` da mensagem que você recebeu através dos webhooks ou que você enviou anteriormente (obtido no response da API).

### Exemplo Prático para No-Code

```json
{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

**Dicas importantes:**

- **Obter messageId**: O `messageId` pode ser obtido através dos webhooks quando uma mensagem é recebida. Guarde este ID se você quiser marcar a mensagem como lida posteriormente.
- **Mensagens em grupos**: Você pode marcar mensagens em grupos usando o ID do grupo no campo `phone`.
- **Status 204**: A resposta será um status `204 No Content`, indicando que a operação foi bem-sucedida. Não há conteúdo no corpo da resposta.

**Casos de uso comuns:**

- **Atendimento ao cliente**: Marcar mensagens de clientes como lidas automaticamente após processamento
- **Automação de leitura**: Marcar mensagens como lidas após serem processadas por um sistema
- **Gestão de notificações**: Controlar quais mensagens aparecem como não lidas
- **Integração com sistemas**: Sincronizar status de leitura entre diferentes sistemas

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 204 No Content {#204-no-content}

A resposta é um status `204 No Content`, indicando que a mensagem foi marcada como lida com sucesso. O corpo da resposta está vazio.

```json
{}
```

**Importante:**

- O status `204` significa que a operação foi bem-sucedida, mas não há conteúdo para retornar
- Não há campos na resposta, apenas o status HTTP indica o sucesso

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique o formato do `phone` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 404 | Chat não encontrado | Verifique se o `phone` existe e é válido |
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

// Marcar mensagem como lida
async function markMessageAsRead(phone, messageId) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
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

    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (response.status === 204) {
      console.log('Mensagem marcada como lida com sucesso');
      return { success: true };
    } else {
      throw new Error(`Erro ao marcar como lido: ${response.status}`);
    }
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao marcar como lido:', error.message);
    throw error;
  }
}

// Exemplo de uso
markMessageAsRead('5511999998888', '3999984263738042930CD6ECDE9VDWSA');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface ReadChatResponse {
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

// Função para marcar chat como lido
async function markChatAsRead(phone: string): Promise<ReadChatResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/read-chat`;

  const payload = {
    phone: validatedPhone,
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
    throw new Error(data.message || 'Erro ao marcar como lido');
  }

  return data;
}

// Executar
markChatAsRead('5511999999999')
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

def mark_chat_as_read(phone: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/read-chat"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if result.get('value'):
            print('Chat marcado como lido com sucesso')
            return result
        else:
            raise ValueError(result.get('message', 'Erro ao marcar como lido'))
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
mark_chat_as_read('5511999999999')
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

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Marcar chat como lido via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/read-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONE
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

// Marcar chat como lido
function markChatAsRead(phone) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/read-chat`;
    const payload = JSON.stringify({
      phone: phone,
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
              console.log('Chat marcado como lido com sucesso');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Erro ao marcar como lido'));
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
markChatAsRead('5511999999999')
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

// Rota para marcar chat como lido
app.post('/api/read-chat', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone } = req.body;
    const validatedPhone = validatePhone(phone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/read-chat`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
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
        error: response.data.message || 'Erro ao marcar como lido',
      });
    }
  } catch (error) {
    console.error('Erro ao marcar como lido:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao marcar como lido',
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

// Middleware para marcar chat como lido
app.use(async (ctx) => {
  if (ctx.path === '/api/read-chat' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone } = ctx.request.body;
      const validatedPhone = validatePhone(phone);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/read-chat`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
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
          error: response.data.message || 'Erro ao marcar como lido',
        };
      }
    } catch (error) {
      console.error('Erro ao marcar como lido:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao marcar como lido',
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

public class MarkChatAsRead {
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

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/read-chat",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            
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
                    System.out.println("Chat marcado como lido com sucesso");
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

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/read-chat";
            
            var payload = new
            {
                phone = phone
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
                        Console.WriteLine("Chat marcado como lido com sucesso");
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

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/read-chat", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
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
            fmt.Println("Chat marcado como lido com sucesso")
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

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/read-chat',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
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
            echo "Chat marcado como lido com sucesso\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Erro: " . ($result['message'] ?? 'Erro ao marcar como lido') . "\n";
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

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/read-chat")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['value']
      puts 'Chat marcado como lido com sucesso'
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

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/read-chat"
    
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
        "phone": phone
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
                        print("Chat marcado como lido com sucesso")
                        print(result)
                    } else if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Erro: \(result["message"] as? String ?? "Erro ao marcar como lido")")
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

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/read-chat"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    if ($response.value) {
        Write-Host "Chat marcado como lido com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/read-chat HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
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
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/read-chat";
    
    // Criar payload JSON
    std::string payload = "{\"phone\":\"" + phone + "\"}";
    
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
                std::cout << "Chat marcado como lido com sucesso" << std::endl;
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
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/read-chat", instanceId);
    
    char payload[256];
    snprintf(payload, sizeof(payload), "{\"phone\":\"%s\"}", phone);
    
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
                printf("Chat marcado como lido com sucesso\n");
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

## <Icon name="Info" size="md" /> Como funciona {#como-funciona}

Quando você marca um chat como lido:

1. **Todas as mensagens não lidas** do chat são marcadas como lidas
2. **Indicadores removidos** - Os dois checkmarks azuis aparecem nas mensagens
3. **Contador zerado** - O contador de mensagens não lidas é removido
4. **Status atualizado** - O remetente vê que suas mensagens foram lidas

:::tip Uso em automações

Use este endpoint em automações para marcar mensagens como lidas automaticamente após processá-las, melhorando a experiência do usuário e mantendo o status de leitura atualizado.

:::

## <Icon name="AlertTriangle" size="md" /> Limitações {#limitacoes}

- Você só pode marcar chats como lidos se tiver acesso a eles
- Para grupos, você precisa ser membro do grupo
- A marcação como lida é aplicada a todas as mensagens não lidas do chat

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- Marcar como lido remove todos os indicadores de "não lido" do chat
- Use o `phone` do contato individual ou o ID do grupo
- **Atenção**: No dia 4 de novembro de 2021, o WhatsApp alterou o formato de criação de novos grupos:
  - Antes: `"phone": "5511999999999-1623281429"`
  - Agora: `"phone": "120363019502650977-group"`
  Certifique-se de usar o formato correto do `groupId` baseado na data de criação do grupo.
- O remetente verá os dois checkmarks azuis indicando que a mensagem foi lida
- Esta operação é útil para manter o status de leitura sincronizado em automações

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Obter chats](/docs/chats/pegar) - Liste todos os chats da sua instância
- [Arquivar chat](/docs/chats/arquivar) - Arquivar ou desarquivar conversas
- [Responder mensagem](/docs/messages/responder) - Responda a mensagens recebidas
