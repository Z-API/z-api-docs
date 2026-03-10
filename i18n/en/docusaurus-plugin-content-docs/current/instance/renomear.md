---
id: renomear
sidebar_position: 10
title: Rename Instance
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Rename Instance

Rename an instance through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows renaming an existing instance. The instance name is used only for identification in the administrative panel and does not affect the operation of the API.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-name
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `value` | string | New name for the instance |

---

## <Icon name="Code" size="md" /> Code Examples {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validateInstanceName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome da instância é obrigatório');
  }
  if (name.trim().length === 0) {
    throw new Error('Nome da instância não pode estar vazio');
  }
  return name.trim();
}

// Dados da requisição com validação
const rawName = 'Nova Instância';
const name = validateInstanceName(rawName);

const requestData = {
  value: name,
};

// Renomear instância com tratamento seguro de erros
async function renameInstance() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-name`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (data.value) {
      console.log('Instância renomeada com sucesso');
    } else {
      console.error('Erro ao renomear instância');
    }
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao renomear instância:', error.message);
    throw error;
  }
}

// Executar função
renameInstance();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface RenameInstanceResponse {
  value: boolean;
}

// Validação de entrada (segurança)
function validateInstanceName(name: string): string {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome da instância é obrigatório');
  }
  return name.trim();
}

// Dados da requisição com validação
const requestData = {
  value: validateInstanceName('Nova Instância'),
};

// Função para renomear instância
async function renameInstance(): Promise<RenameInstanceResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-name`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
renameInstance()
  .then((result) => {
    if (result.value) {
      console.log('Instância renomeada com sucesso');
    } else {
      console.error('Erro ao renomear instância');
    }
  })
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
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_instance_name(name: str) -> str:
    """Valida nome da instância."""
    if not name or not name.strip():
        raise ValueError('Nome da instância é obrigatório')
    return name.strip()

# Dados da requisição com validação
raw_name = 'Nova Instância'
name = validate_instance_name(raw_name)

request_data = {
    'value': name,
}

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/update-name"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Renomear instância com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.put(url, json=request_data, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Instância renomeada com sucesso')
    else:
        print('Erro ao renomear instância')
    
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
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
NAME="Nova Instância"

# Renomear instância via cURL
curl -X PUT \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/update-name" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"value\": \"${NAME}\"}" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validateInstanceName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome da instância é obrigatório');
  }
  if (name.trim().length === 0) {
    throw new Error('Nome da instância não pode estar vazio');
  }
  return name.trim();
}

// Dados da requisição com validação
const rawName = 'Nova Instância';
const name = validateInstanceName(rawName);

const requestData = JSON.stringify({
  value: name,
});

// Renomear instância
function renameInstance() {
  return new Promise((resolve, reject) => {
    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-name`;
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'PUT',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData),
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
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            if (result.value) {
              console.log('Instância renomeada com sucesso');
            } else {
              console.error('Erro ao renomear instância');
            }
            resolve(result);
          } catch (error) {
            reject(new Error('Erro ao parsear resposta JSON'));
          }
        } else {
          // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
          reject(new Error(`Erro HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erro na requisição:', error.message);
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

// Executar
renameInstance()
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

app.use(express.json());

// Validação de entrada (segurança)
function validateInstanceName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome da instância é obrigatório');
  }
  if (name.trim().length === 0) {
    throw new Error('Nome da instância não pode estar vazio');
  }
  return name.trim();
}

// Rota para renomear instância
app.put('/api/instance/rename', async (req, res) => {
  try {
    const rawName = req.body.value || 'Nova Instância';
    const name = validateInstanceName(rawName);

    const requestData = {
      value: name,
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-name`;
    
    const response = await axios.put(url, requestData, {
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // ⚠️ SEGURANÇA: Não exponha tokens na resposta
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento seguro de erros
    console.error('Erro ao renomear instância:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao renomear instância',
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

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validateInstanceName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome da instância é obrigatório');
  }
  if (name.trim().length === 0) {
    throw new Error('Nome da instância não pode estar vazio');
  }
  return name.trim();
}

// Middleware para renomear instância
app.use(async (ctx) => {
  if (ctx.path === '/api/instance/rename' && ctx.method === 'PUT') {
    try {
      const rawName = ctx.request.body.value || 'Nova Instância';
      const name = validateInstanceName(rawName);

      const requestData = {
        value: name,
      };

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-name`;
      
      const response = await axios.put(url, requestData, {
        headers: {
          'Client-Token': clientToken,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      // ⚠️ SEGURANÇA: Não exponha tokens na resposta
      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // ⚠️ SEGURANÇA: Tratamento seguro de erros
      console.error('Erro ao renomear instância:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao renomear instância',
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
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class RenameInstance {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static String validateInstanceName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome da instância é obrigatório");
        }
        return name.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String name = validateInstanceName("Nova Instância");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/update-name",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            String jsonInputString = String.format("{\"value\":\"%s\"}", name.replace("\"", "\\\""));
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("PUT");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
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
                
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                System.out.println("Instância renomeada com sucesso");
                System.out.println(response.toString());
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static string ValidateInstanceName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Nome da instância é obrigatório");
        }
        return name.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string name = ValidateInstanceName("Nova Instância");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/update-name";
            
            var requestData = new { value = name };
            var json = System.Text.Json.JsonSerializer.Serialize(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var response = await client.PutAsync(url, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Instância renomeada com sucesso");
                    Console.WriteLine(result);
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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
    "strings"
    "time"
)

func main() {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    instanceId := os.Getenv("ZAPI_INSTANCE_ID")
    if instanceId == "" {
        instanceId = "SUA_INSTANCIA"
    }
    
    instanceToken := os.Getenv("ZAPI_INSTANCE_TOKEN")
    if instanceToken == "" {
        instanceToken = "SEU_TOKEN"
    }
    
    clientToken := os.Getenv("ZAPI_CLIENT_TOKEN")
    if clientToken == "" {
        clientToken = "seu-token-de-seguranca"
    }

    // Validação de entrada (segurança)
    name := "Nova Instância"
    name = strings.TrimSpace(name)
    if len(name) == 0 {
        fmt.Println("Erro: Nome da instância é obrigatório")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/update-name", instanceId, instanceToken)
    
    requestData := map[string]string{
        "value": name,
    }
    
    jsonData, err := json.Marshal(requestData)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
        return
    }
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }
    
    req.Header.Set("Client-Token", clientToken)
    req.Header.Set("Content-Type", "application/json")
    
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
        
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Println("Instância renomeada com sucesso")
        fmt.Printf("%+v\n", result)
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

// Validação de entrada (segurança)
function validateInstanceName($name) {
    if (empty($name) || !is_string($name)) {
        throw new Exception('Nome da instância é obrigatório');
    }
    $trimmed = trim($name);
    if (strlen($trimmed) === 0) {
        throw new Exception('Nome da instância não pode estar vazio');
    }
    return $trimmed;
}

try {
    // Dados da requisição com validação
    $name = validateInstanceName('Nova Instância');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/update-name',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $requestData = json_encode(['value' => $name]);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_HTTPHEADER => [
            'Client-Token: ' . $clientToken,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $requestData,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true, // ⚠️ SEGURANÇA: Sempre verifique SSL
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        // ⚠️ SEGURANÇA: Tratamento seguro de erros
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if ($result['value']) {
            echo "Instância renomeada com sucesso\n";
        } else {
            echo "Erro ao renomear instância\n";
        }
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

# Validação de entrada (segurança)
def validate_instance_name(name)
  if name.nil? || name.strip.empty?
    raise ArgumentError, 'Nome da instância é obrigatório'
  end
  name.strip
end

begin
  # Dados da requisição com validação
  name = validate_instance_name('Nova Instância')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/update-name")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique SSL

  request = Net::HTTP::Put.new(url)
  request['Client-Token'] = client_token
  request['Content-Type'] = 'application/json'
  request.body = JSON.generate({ value: name })

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts 'Instância renomeada com sucesso'
    else
      puts 'Erro ao renomear instância'
    end
  else
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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

// Validação de entrada (segurança)
func validateInstanceName(_ name: String) throws -> String {
    let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Nome da instância é obrigatório"])
    }
    return trimmed
}

do {
    // Dados da requisição com validação
    let name = try validateInstanceName("Nova Instância")
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/update-name") else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "PUT"
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.timeoutInterval = 30
    
    let requestData = ["value": name]
    request.httpBody = try JSONSerialization.data(withJSONObject: requestData)

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
                        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                        if let value = result["value"] as? Bool, value {
                            print("Instância renomeada com sucesso")
                        } else {
                            print("Erro ao renomear instância")
                        }
                    }
                } catch {
                    print("Erro ao parsear JSON: \(error.localizedDescription)")
                }
            }
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            print("Erro HTTP \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Erro de validação: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validação de entrada (segurança)
function Validate-InstanceName {
    param([string]$Name)
    
    if ([string]::IsNullOrWhiteSpace($Name)) {
        throw "Nome da instância é obrigatório"
    }
    return $Name.Trim()
}

try {
    # Dados da requisição com validação
    $name = Validate-InstanceName "Nova Instância"
    
    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/update-name"
    
    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }
    
    $body = @{
        value = $name
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri $url -Method Put -Headers $headers -Body $body -TimeoutSec 30
        
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if ($response.value) {
            Write-Host "Instância renomeada com sucesso"
        } else {
            Write-Host "Erro ao renomear instância"
        }
    } catch {
        # ⚠️ SEGURANÇA: Tratamento seguro de erros
        Write-Host "Erro: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
        }
    }
} catch {
    Write-Host "Erro de validação: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-name HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/json

{
  "value": "Nova Instância"
}
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
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // Validação de entrada (segurança)
    std::string name = "Nova Instância";
    if (name.empty()) {
        std::cerr << "Erro: Nome da instância é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/update-name";
    
    std::string jsonData = "{\"value\":\"" + name + "\"}";
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        std::string tokenHeader = "Client-Token: " + clientToken;
        std::string contentTypeHeader = "Content-Type: application/json";
        headers = curl_slist_append(headers, tokenHeader.c_str());
        headers = curl_slist_append(headers, contentTypeHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Sempre verifique SSL
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Instância renomeada com sucesso" << std::endl;
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
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // Validação de entrada (segurança)
    char* name = "Nova Instância";
    if (strlen(name) == 0) {
        fprintf(stderr, "Erro: Nome da instância é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/update-name", instanceId, instanceToken);
    
    char jsonData[256];
    snprintf(jsonData, sizeof(jsonData), "{\"value\":\"%s\"}", name);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, "Content-Type: application/json");
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Sempre verifique SSL
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                printf("Instância renomeada com sucesso\n");
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

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
 "value": true
}
```

| Field | Type | Description |
|-------|------|------------|
| `value` | boolean | `true` if the rename was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `PUT` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the request headers |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Instance not found | Verify the `instanceId` and `token` are correct |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- The instance name is used only for **identification in the administrative panel**
- Renaming does not affect the operation of the API or the connection to WhatsApp
- The new name will be applied immediately after a successful request
- There is no character limit, but it is recommended to keep the name concise and descriptive