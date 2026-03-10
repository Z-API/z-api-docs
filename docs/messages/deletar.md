---
id: deletar
title: Deletar mensagem
sidebar_position: 25
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Deletar mensagem

Delete uma mensagem enviada usando a API do Z-API. A mensagem será removida para todos os participantes da conversa.

Método utilizado para apagar uma mensagem em um chat. Você pode deletar tanto uma mensagem que enviou quanto uma mensagem enviada por um contato. Para utilizar este recurso você só vai precisar do `messageId` da mensagem que quer apagar.

![Exemplo de deletar mensagem](/img/delete-message.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{instanceId}/token/{token}/messages
```

**Exemplo de URL com parâmetros:**

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/messages?messageId=123&phone=5511999998888&owner=true
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |

### Parâmetros de Query {#parametros-de-query}

#### Parâmetros Obrigatórios

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `messageId` | string | Sim | ID original da mensagem. No caso de mensagem enviada por você, é o código que vem no seu response. Caso seja uma mensagem enviada por um contato, você vai receber este `messageId` pelo seu webhook de receive |
| `phone` | string | Sim | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário/remetente no formato DDI DDD NÚMERO. **IMPORTANTE:** Envie somente números, sem formatação ou máscara |
| `owner` | boolean | Sim | Informe `true` caso você tenha enviado a mensagem ou `false` para casos onde seja uma mensagem recebida |

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`messageId`**: O ID da mensagem que você deseja deletar. Este é o `messageId` da mensagem que você recebeu através dos webhooks ou que você enviou anteriormente (obtido no response da API).

2. **`phone`**: O número do chat onde a mensagem está localizada. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

3. **`owner`**: Indique se você é o dono da mensagem. Use `true` se você enviou a mensagem, ou `false` se a mensagem foi recebida de um contato.

### Exemplo Prático para No-Code

**Deletar mensagem que você enviou:**

```json
{
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "phone": "5511999998888",
  "owner": true
}
```

**Deletar mensagem recebida:**

```json
{
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "phone": "5511999998888",
  "owner": false
}
```

**Dicas importantes:**

- **Obter messageId**: O `messageId` pode ser obtido através dos webhooks quando uma mensagem é recebida ou enviada. Guarde este ID se você quiser deletar a mensagem posteriormente.
- **Parâmetro owner**: É importante informar corretamente se você é o dono da mensagem (`true`) ou não (`false`). Isso determina se você pode deletar a mensagem.
- **Mensagens em grupos**: Você pode deletar mensagens em grupos usando o ID do grupo no campo `phone`.
- **Status 204**: A resposta será um status `204 No Content`, indicando que a operação foi bem-sucedida. Não há conteúdo no corpo da resposta.

**Casos de uso comuns:**

- **Correção de erros**: Deletar mensagens enviadas por engano
- **Privacidade**: Remover mensagens sensíveis ou confidenciais
- **Automação de limpeza**: Deletar mensagens antigas automaticamente
- **Gestão de conteúdo**: Gerenciar mensagens em conversas automatizadas

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 204 No Content {#204-no-content}

A resposta é um status `204 No Content`, indicando que a mensagem foi deletada com sucesso. O corpo da resposta está vazio.

```json
{}
```

**Importante:**

- O status `204` significa que a operação foi bem-sucedida, mas não há conteúdo para retornar
- Não há campos na resposta, apenas o status HTTP indica o sucesso

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 401 | Token inválido | Verifique o header `Client-Token` |
| 403 | Sem permissão | Você só pode deletar mensagens que você enviou |
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

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório e deve ser uma string não vazia');
  }
  return messageId.trim();
}

// Validar phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar owner
function validateOwner(owner) {
  if (typeof owner !== 'boolean') {
    throw new Error('owner deve ser um boolean (true ou false)');
  }
  return owner;
}

// Deletar mensagem
async function deleteMessage(messageId, phone, owner) {
  try {
    // ⚠️ VALIDAÇÃO
    const validatedMessageId = validateMessageId(messageId);
    const validatedPhone = validatePhone(phone);
    const validatedOwner = validateOwner(owner);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
    const params = new URLSearchParams({
      messageId: validatedMessageId,
      phone: validatedPhone,
      owner: validatedOwner.toString(),
    });
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/messages?${params}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Client-Token': clientToken,
      },
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (response.status === 204) {
      console.log('Mensagem deletada com sucesso');
      return { success: true };
    } else {
      throw new Error(`Erro ao deletar mensagem: ${response.status}`);
    }
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao deletar mensagem:', error.message);
    throw error;
  }
}

// Exemplo de uso - deletar mensagem que você enviou
deleteMessage('3999984263738042930CD6ECDE9VDWSA', '5511999998888', true);

// Exemplo de uso - deletar mensagem recebida
deleteMessage('3999984263738042930CD6ECDE9VDWSA', '5511999998888', false);
deleteMessage('3999984263738042930CD6ECDE9VDWSA', '5511999998888', true);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface DeleteMessageResponse {
  value: boolean;
  message: string;
}

// Validar messageId
function validateMessageId(messageId: string): string {
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId é obrigatório e deve ser uma string não vazia');
  }
  return messageId.trim();
}

// Função para deletar mensagem
async function deleteMessage(messageId: string): Promise<DeleteMessageResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedMessageId = validateMessageId(messageId);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/messages/${encodeURIComponent(validatedMessageId)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Client-Token': clientToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data.value) {
    throw new Error(data.message || 'Erro ao deletar mensagem');
  }

  return data;
}

// Executar
deleteMessage('3EB0C767F26A')
  .then((result) => console.log('Sucesso:', result))
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
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_message_id(message_id: str) -> str:
    """Valida messageId"""
    if not message_id or not isinstance(message_id, str) or not message_id.strip():
        raise ValueError('messageId é obrigatório e deve ser uma string não vazia')
    return message_id.strip()

def delete_message(message_id: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_message_id = validate_message_id(message_id)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/messages/{validated_message_id}"
    
    headers = {
        "Client-Token": CLIENT_TOKEN
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.delete(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if result.get('value'):
            print('Mensagem deletada com sucesso')
            return result
        else:
            raise ValueError(result.get('message', 'Erro ao deletar mensagem'))
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
delete_message('3EB0C767F26A')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar messageId
MESSAGE_ID="${1:-3EB0C767F26A}"
if [ -z "$MESSAGE_ID" ] || [ "$MESSAGE_ID" = "" ]; then
    echo "Erro: messageId é obrigatório e deve ser uma string não vazia"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Deletar mensagem via cURL
curl -X DELETE \
  "https://api.z-api.io/instances/${INSTANCE_ID}/messages/${MESSAGE_ID}" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN MESSAGE_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Deletar mensagem
function deleteMessage(messageId) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedMessageId = validateMessageId(messageId);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/messages/${encodeURIComponent(messageId)}`;
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'DELETE',
      headers: {
        'Client-Token': clientToken,
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
              console.log('Mensagem deletada com sucesso');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Erro ao deletar mensagem'));
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

    req.end();
  });
}

// Executar
deleteMessage('3EB0C767F26A')
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

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Rota para deletar mensagem
app.delete('/api/messages/:messageId', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { messageId } = req.params;
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/messages/${encodeURIComponent(validatedMessageId)}`;
    
    const response = await axios.delete(url, {
      headers: {
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
        error: response.data.message || 'Erro ao deletar mensagem',
      });
    }
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao deletar mensagem',
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
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Rota para deletar mensagem
router.delete('/api/messages/:messageId', async (ctx) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { messageId } = ctx.params;
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/messages/${encodeURIComponent(validatedMessageId)}`;
    
    const response = await axios.delete(url, {
      headers: {
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
        error: response.data.message || 'Erro ao deletar mensagem',
      };
    }
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error.message);
    ctx.status = error.response?.status || 500;
    ctx.body = {
      success: false,
      error: 'Erro ao deletar mensagem',
    };
  }
});

app.use(router.routes());
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
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

public class DeleteMessage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar messageId
    private static String validateMessageId(String messageId) {
        if (messageId == null || messageId.trim().isEmpty()) {
            throw new IllegalArgumentException("messageId é obrigatório e deve ser uma string não vazia");
        }
        return messageId.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String messageId = validateMessageId("3EB0C767F26A");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/messages/%s",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(messageId, StandardCharsets.UTF_8)
            );
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("DELETE");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

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
                    System.out.println("Mensagem deletada com sucesso");
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
using System.Threading.Tasks;
using System.Text.Json;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validar messageId
    private static string ValidateMessageId(string messageId)
    {
        if (string.IsNullOrWhiteSpace(messageId))
        {
            throw new ArgumentException("messageId é obrigatório e deve ser uma string não vazia");
        }
        return messageId.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string messageId = ValidateMessageId("3EB0C767F26A");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/messages/{Uri.EscapeDataString(messageId)}";

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var response = await client.DeleteAsync(url);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    var jsonDoc = JsonDocument.Parse(result);
                    var root = jsonDoc.RootElement;
                    
                    if (root.GetProperty("value").GetBoolean())
                    {
                        Console.WriteLine("Mensagem deletada com sucesso");
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
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
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

func validateMessageId(messageId string) error {
    if messageId == "" {
        return fmt.Errorf("messageId é obrigatório e deve ser uma string não vazia")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    messageId := "3EB0C767F26A"
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/messages/%s", instanceId, messageId)
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("DELETE", url, nil)
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }
    
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
            fmt.Println("Mensagem deletada com sucesso")
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

// Validar messageId
function validateMessageId($messageId) {
    if (empty($messageId) || !is_string($messageId) || trim($messageId) === '') {
        throw new Exception('messageId é obrigatório e deve ser uma string não vazia');
    }
    return trim($messageId);
}

try {
    // ⚠️ VALIDAÇÃO
    $messageId = validateMessageId('3EB0C767F26A');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/messages/%s',
        urlencode($instanceId),
        urlencode($messageId)
    );

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'DELETE',
        CURLOPT_HTTPHEADER => [
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
            echo "Mensagem deletada com sucesso\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Erro: " . ($result['message'] ?? 'Erro ao deletar mensagem') . "\n";
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

# Validar messageId
def validate_message_id(message_id)
  raise 'messageId é obrigatório e deve ser uma string não vazia' if message_id.nil? || message_id.to_s.strip.empty?
  message_id.to_s.strip
end

begin
  # ⚠️ VALIDAÇÃO
  message_id = validate_message_id('3EB0C767F26A')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/messages/#{CGI.escape(message_id)}")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  request = Net::HTTP::Delete.new(url)
  request['Client-Token'] = client_token

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['value']
      puts 'Mensagem deletada com sucesso'
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

// Validar messageId
func validateMessageId(_ messageId: String) throws -> String {
    if messageId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "messageId é obrigatório e deve ser uma string não vazia"])
    }
    return messageId.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDAÇÃO
    let messageId = try validateMessageId("3EB0C767F26A")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/messages/\(messageId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? messageId)"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "DELETE"
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

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
                        print("Mensagem deletada com sucesso")
                        print(result)
                    } else if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Erro: \(result["message"] as? String ?? "Erro ao deletar mensagem")")
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

# Validar messageId
function Validate-MessageId {
    param([string]$MessageId)
    if ([string]::IsNullOrWhiteSpace($MessageId)) {
        throw "messageId é obrigatório e deve ser uma string não vazia"
    }
    return $MessageId.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $messageId = Validate-MessageId "3EB0C767F26A"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/messages/$([System.Web.HttpUtility]::UrlEncode($messageId))"

    $headers = @{
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Delete -Headers $headers -TimeoutSec 30
    
    if ($response.value) {
        Write-Host "Mensagem deletada com sucesso"
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
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/messages/3EB0C767F26A HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstdlib>

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

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    std::string messageId = "3EB0C767F26A";
    
    // ⚠️ VALIDAÇÃO
    if (messageId.empty()) {
        std::cerr << "Erro: messageId é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/messages/" + messageId;
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
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
                std::cout << "Mensagem deletada com sucesso" << std::endl;
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

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    char* messageId = "3EB0C767F26A";
    
    // ⚠️ VALIDAÇÃO
    if (!messageId || strlen(messageId) == 0) {
        fprintf(stderr, "Erro: messageId é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/messages/%s", instanceId, messageId);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
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
                printf("Mensagem deletada com sucesso\n");
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

- Você só pode deletar mensagens que você enviou
- Mensagens muito antigas podem não ser deletáveis
- A deleção pode levar alguns segundos para ser processada

:::warning Importante

A deleção é permanente e não pode ser desfeita. Certifique-se de que realmente deseja deletar a mensagem antes de executar esta operação.

:::

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- A mensagem será removida para todos os participantes da conversa
- Use o `messageId` retornado quando você enviou a mensagem
- Mensagens deletadas não podem ser recuperadas
- Alguns tipos de mensagem podem ter restrições de deleção
- A deleção pode não ser instantânea e pode levar alguns segundos para ser processada

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Marcar como lida](/docs/messages/ler) - Marque mensagens como lidas
- [Responder mensagem](/docs/messages/responder) - Responda a mensagens recebidas
- [Reencaminhar mensagem](/docs/messages/reencaminhar) - Compartilhe mensagens recebidas
