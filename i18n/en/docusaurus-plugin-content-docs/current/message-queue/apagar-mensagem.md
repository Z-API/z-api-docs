---
id: apagar-mensagem
sidebar_position: 1
title: Delete message from queue
---
id: delete-message
title: Delete message from queue
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete message from queue

Remove a specific message from a queue instance through the Z-API API. Use this endpoint to remove only one message without affecting others.

## Endpoint

```http
DELETE https://api.z-api.io/instances/{instanceId}/token/{token}/queue/{zaapid}
```

### Headers

- Content-Type: application/json

### Parameters

| Parameter | Type | Description |
|-----------|--------|----------------------------------------------|
| zaapid    | string | ID of the message in the queue |

## Responses

### Success

| Code | Explanation |
|--------|----------------|
|  200   | Success status |

### Common Errors

| Code | Reason | How to resolve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check the `zaapid` |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Message not found | Check if the `zaapid` is correct |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validateZaapid(zaapid) {
  if (!zaapid || typeof zaapid !== 'string' || zaapid.trim().length === 0) {
    throw new Error('Zaapid inválido');
  }
  return zaapid.trim();
}

// Dados da requisição com validação
const zaapid = validateZaapid("zaapid-exemplo");

// Apagar mensagem da fila com tratamento seguro de erros
async function deleteMessageFromQueue() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(clientToken)}/queue/${encodeURIComponent(zaapid)}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Mensagem removida com sucesso');
    } else {
      console.error('Erro ao remover mensagem');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao remover mensagem:', error.message);
    throw error;
  }
}

// Executar função
deleteMessageFromQueue();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface DeleteMessageResponse {
  value: boolean;
  message: string;
}

// Validação de entrada (segurança)
function validateZaapid(zaapid: string): string {
  if (!zaapid || zaapid.trim().length === 0) {
    throw new Error('Zaapid inválido');
  }
  return zaapid.trim();
}

// Dados da requisição com validação
const zaapid: string = validateZaapid("zaapid-exemplo");

// Função para apagar mensagem da fila
async function deleteMessageFromQueue(): Promise<DeleteMessageResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(clientToken)}/queue/${encodeURIComponent(zaapid)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
deleteMessageFromQueue()
  .then((result) => console.log('Sucesso:', result.message))
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

def validate_zaapid(zaapid: str) -> str:
    """Valida formato do zaapid."""
    if not zaapid or not zaapid.strip():
        raise ValueError('Zaapid inválido')
    return zaapid.strip()

# Dados da requisição com validação
zaapid = validate_zaapid("zaapid-exemplo")

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{CLIENT_TOKEN}/queue/{zaapid}"

# Headers obrigatórios
headers = {
    "Content-Type": "application/json"
}

# Apagar mensagem da fila com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.delete(url, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Mensagem removida com sucesso')
    else:
        print('Erro ao remover mensagem')
    
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
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
MESSAGE_ID="message123"

ZAAPID="zaapid-exemplo"

# Apagar mensagem da fila via cURL
curl -X DELETE \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${CLIENT_TOKEN}/queue/${ZAAPID}" \
  -H "Content-Type: application/json" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN ZAAP
</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Input validation (security)
function validateZaapid(zaapid) {
  if (!zaapid || typeof zaapid !== 'string' || zaapid.trim().length === 0) {
    throw new Error('Zaapid inválido');
  }
  return zaapid.trim();
}

// Request data with validation
const zaapid = validateZaapid("zaapid-exemplo");

// Delete message from queue
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(clientToken)}/queue/${encodeURIComponent(zaapid)}`);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
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
        console.log('Mensagem removida com sucesso');
      } else {
        console.error('Erro ao remover mensagem');
      }
    } else {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
      console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
});

req.on('timeout', () => {
  req.destroy();
  console.error('Timeout request');
});

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

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Input validation (security)
function validateZaapid(zaapid) {
  if (!zaapid || typeof zaapid !== 'string' || zaapid.trim().length === 0) {
    throw new Error('Zaapid inválido');
  }
  return zaapid.trim();
}

// Route to delete message from queue
app.delete('/queue/:zaapid', async (req, res) => {
  try {
    // Request data with validation
    const rawZaapid = req.params.zaapid || "zaapid-exemplo";
    const zaapid = validateZaapid(rawZaapid);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(clientToken)}/queue/${encodeURIComponent(zaapid)}`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
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
        reject(new Error('Timeout request'));
      });

      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    console.error('Error removing message:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
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

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Middleware for parsing JSON
app.use(require('koa-bodyparser')());

// Input validation (security)
function validateZaapid(zaapid) {
  if (!zaapid || typeof zaapid !== 'string' || zaapid.trim().length === 0) {
    throw new Error('Zaapid inválido');
  }
  return zaapid.trim();
}

// Route to delete message from queue
router.delete('/queue/:zaapid', async (ctx) => {
  try {
    // Request data with validation
    const rawZaapid = ctx.params.zaapid || "zaapid-exemplo";
    const zaapid = validateZaapid(rawZaapid);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(clientToken)}/queue/${encodeURIComponent(zaapid)}`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
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
        reject(new Error('Timeout request'));
      });

      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Error removing message:', err.message);
});

app.listen(3000, () => {
  console.log('Koa server running on port 3000');
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

public class DeleteMessageFromQueue {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Input validation (security)
    private static String validateZaapid(String zaapid) {
        if (zaapid == null || zaapid.trim().isEmpty()) {
            throw new IllegalArgumentException("Zaapid inválido");
        }
        return zaapid.trim();
    }

    public static void main(String[] args) {
        try {
            // Request data with validation
            String zaapid = validateZaapid("zaapid-exemplo");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/queue/%s",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(CLIENT_TOKEN, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(zaapid, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Check response
            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                System.out.println("Message deleted successfully");
            } else {
                System.out.println("Error: " + conn.getErrorStream());
            }
        } catch (Exception e) {
            System.err.println("Error removing message: " + e.getMessage());
        }
    }
}

```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'uri'
require 'json'
require 'openssl'

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Input validation (security)
def validate_zaapid(zaapid)
  trimmed = zaapid.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Zaapid inválido'
  end
  trimmed
end

begin
  # Request data with validation
  zaapid = validate_zaapid("zaapid-exemplo")

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(CLIENT_TOKEN)}/queue/#{URI.encode_www_form_component(zaapid)}")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Delete.new(url)
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    puts "Message deleted successfully"
  else
    puts "Error: #{response.body}"
  end
rescue => e
  puts "Error removing message: #{e.message}"
end

```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SECURITY: Use environment variables for credentials
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Input validation (security)
func validateZaapid(_ zaapid: String) throws -> String {
    let trimmed = zaapid.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Zaapid inválido"])
    }
    return trimmed
}

// Request data with validation
let zaapid = try validateZaapid("zaapid-exemplo")

// ⚠️ SECURITY: Always use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(clientToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/queue/\(zaapid.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")") else {
    fatalError("Invalid URL")
}

var request = URLRequest(url: url)
request.httpMethod = "DELETE"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.timeoutInterval = 30

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \(error.localizedDescription)")
        return
    }
    
    guard let httpResponse = response as? HTTPURLResponse else { return }
    
    if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
        if let data = data {
            do {
                let result = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                // ⚠️ SECURITY: Do not log tokens or sensitive data
                if let value = result?["value"] as? Bool, value {
                    print("Message deleted successfully")
                } else {
                    print("Error deleting message")
                }
            } catch {
                print("Error processing JSON: \(error.localizedDescription)")
            }
        }
    } else {
        // ⚠️ SECURITY: Do not expose sensitive details in logs
        print("HTTP Error \(httpResponse.statusCode): Request failed")
    }
}

task.resume()
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SECURITY: Use environment variables for credentials
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Input validation (security)
function Validate-MessageId {
    param([string]$MessageId)
    $trimmed = $MeZaapid {
    param([string]$Zaapid)
    $trimmed = $Zaapid.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Zaapid inválido"
    }
    return $trimmed
}

try {
    # Request data with validation
    $zaapid = Validate-Zaapid -Zaapid "zaapid-exemplo"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($clientToken))/queue/$([System.Web.HttpUtility]::UrlEncode($zaapid))"

    $headers = @{

    $response = Invoke-RestMethod -Uri $url -Method Delete -Headers $headers -TimeoutSec 30

    # ⚠️ SECURITY: Do not log tokens or sensitive data
    if ($response.value) {
        Write-Host "Message deleted successfully"
    } else {
        Write-Host "Error deleting message"
    }
} catch {
    # ⚠️ SECURITY: Generic error handling
    Write-Host "Error: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/queue/message123 HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/jsontoken/seu-token-de-seguranca/queue/zaapid-exemplo HTTP/1.1
Host: api.z-api.io
</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
std::string validateZaapid(const std::string& zaapid) {
    std::string trimmed = zaapid;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("Zaapid inválido");
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
        std::string zaapid = validateZaapid("zaapid-exemplo");

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + clientToken + "/queue/" + zaapid;
            std::string responseData;

            struct curl_slist* headers = NULL;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Mensagem removida com sucesso" << std::endl;
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
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
int validateZaapid(const char* zaapid, char* cleaned) {
    int len = strlen(zaapid);
    int j = 0;
    
    // Remove espaços iniciais e finais
    int start = 0;
    while (start < len && (zaapid[start] == ' ' || zaapid[start] == '\t')) start++;
    int end = len - 1;
    while (end >= start && (zaapid[end] == ' ' || zaapid[end] == '\t')) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    for (int i = start; i <= end; i++) {
        cleaned[j++] = zaapid[i];
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
    char zaapid[] = "zaapid-exemplo";
    char cleaned[256];
    
    if (!validateZaapid(zaapid, cleaned)) {
        fprintf(stderr, "Zaapid inválido\n");
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/queue/%s",
                 instanceId, clientToken, cleaned);

        struct curl_slist* headers = NULL;
        char contentTypeHeader[] = "Content-Type: application/json";
        headers = curl_slist_append(headers, contentTypeHeader);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Mensagem removida com sucesso\n");
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

## Notes

- This action removes only the specified message from the queue
- Removed messages cannot be recovered
- Use with caution in production environments
- The `zaapid` is obtained by querying the message queue
---