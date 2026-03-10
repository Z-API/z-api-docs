---
id: dados-celular
title: Dados do Celular
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Smartphone" size="lg" /> Dados do Celular

Obtenha informações detalhadas sobre o dispositivo (celular) conectado à sua instância.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna informações completas sobre o dispositivo conectado à instância, incluindo dados do perfil, informações da sessão e configurações do dispositivo.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/device
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Obter dados do celular com tratamento seguro de erros
async function getDeviceData() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/device`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Client-Token': clientToken,
      },
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Dados do celular obtidos com sucesso');
    console.log('Telefone:', data.phone);
    console.log('Nome:', data.name);
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao obter dados do celular:', error.message);
    throw error;
  }
}

// Executar função
getDeviceData();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface DeviceData {
  phone: string;
  imgUrl?: string;
  about?: string;
  name: string;
  device: {
    sessionName: string;
    device_model: string;
  };
  originalDevice: string;
  sessionId: number;
  isBusiness: boolean;
}

// Função para obter dados do celular
async function getDeviceData(): Promise<DeviceData> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/device`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Token': clientToken,
    },
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
getDeviceData()
  .then((result) => {
    console.log('Dados do celular obtidos com sucesso');
    console.log('Telefone:', result.phone);
    console.log('Nome:', result.name);
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

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/device"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN
}

# Obter dados do celular com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.get(url, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print('Dados do celular obtidos com sucesso')
    print(f'Telefone: {result.get("phone")}')
    print(f'Nome: {result.get("name")}')
    
except requests.exceptions.HTTPError as e:
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Obter dados do celular via cURL
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/device" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
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

// Obter dados do celular
function getDeviceData() {
  return new Promise((resolve, reject) => {
    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/device`;
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'GET',
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
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            console.log('Dados do celular obtidos com sucesso');
            console.log('Telefone:', result.phone);
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

    req.end();
  });
}

// Executar
getDeviceData()
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

// Rota para obter dados do celular
app.get('/api/device-data', async (req, res) => {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/device`;
    
    const response = await axios.get(url, {
      headers: {
        'Client-Token': clientToken,
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
    console.error('Erro ao obter dados do celular:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao obter dados do celular',
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

// Middleware para obter dados do celular
app.use(async (ctx) => {
  if (ctx.path === '/api/device-data') {
    try {
      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/device`;
      
      const response = await axios.get(url, {
        headers: {
          'Client-Token': clientToken,
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
      console.error('Erro ao obter dados do celular:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao obter dados do celular',
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
import java.nio.charset.StandardCharsets;

public class GetDeviceData {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    public static void main(String[] args) {
        try {
            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/device",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
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
                
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                System.out.println("Dados do celular obtidos com sucesso");
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
using System.Threading.Tasks;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/device";
            
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var response = await client.GetAsync(url);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Dados do celular obtidos com sucesso");
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
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/device", instanceId, instanceToken)
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("GET", url, nil)
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
        
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Println("Dados do celular obtidos com sucesso")
        fmt.Printf("Telefone: %v\n", result["phone"])
        fmt.Printf("Nome: %v\n", result["name"])
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

// ⚠️ SEGURANÇA: Sempre use HTTPS
$url = sprintf(
    'https://api.z-api.io/instances/%s/token/%s/device',
    urlencode($instanceId),
    urlencode($instanceToken)
);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Client-Token: ' . $clientToken,
    ],
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
    echo "Dados do celular obtidos com sucesso\n";
    echo "Telefone: " . ($result['phone'] ?? 'N/A') . "\n";
    echo "Nome: " . ($result['name'] ?? 'N/A') . "\n";
} else {
    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    echo "Erro HTTP $httpCode\n";
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

# ⚠️ SEGURANÇA: Sempre use HTTPS
url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/device")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique SSL

request = Net::HTTP::Get.new(url)
request['Client-Token'] = client_token

begin
  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts 'Dados do celular obtidos com sucesso'
    puts "Telefone: #{result['phone']}"
    puts "Nome: #{result['name']}"
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

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/device") else {
    print("URL inválida")
    exit(1)
}

var request = URLRequest(url: url)
request.httpMethod = "GET"
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
                if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Dados do celular obtidos com sucesso")
                    print("Telefone: \(result["phone"] ?? "N/A")")
                    print("Nome: \(result["name"] ?? "N/A")")
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
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# ⚠️ SEGURANÇA: Sempre use HTTPS
$url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/device"

$headers = @{
    "Client-Token" = $clientToken
}

try {
    $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers -TimeoutSec 30
    
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Dados do celular obtidos com sucesso"
    Write-Host "Telefone: $($response.phone)"
    Write-Host "Nome: $($response.name)"
    $response | ConvertTo-Json -Depth 10
} catch {
    # ⚠️ SEGURANÇA: Tratamento seguro de erros
    Write-Host "Erro: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/device HTTP/1.1
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
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/device";
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
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
                std::cout << "Dados do celular obtidos com sucesso" << std::endl;
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
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/device", instanceId, instanceToken);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
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
                printf("Dados do celular obtidos com sucesso\n");
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
 "phone": "5511999999999",
 "imgUrl": "https://exemplo.com/foto-perfil.jpg",
 "about": "Recado do perfil do contato",
 "name": "Nome do Perfil",
 "device": {
 "sessionName": "Z-API",
 "device_model": "Z-API"
 },
 "originalDevice": "android",
 "sessionId": 175,
 "isBusiness": false
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `phone` | string | Número de telefone da instância |
| `imgUrl` | string | URL da imagem de perfil |
| `about` | string | Descrição/status do perfil |
| `name` | string | Nome do perfil |
| `device` | object | Informações do dispositivo |
| `device.sessionName` | string | Nome da sessão (geralmente "Z-API") |
| `device.device_model` | string | Modelo do dispositivo (geralmente "Z-API") |
| `originalDevice` | string | Dispositivo original (`"iphone"`, `"smbi"`, `"android"`, `"smba"`) |
| `sessionId` | number | ID da sessão |
| `isBusiness` | boolean | Indica se é uma conta WhatsApp Business |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Instância não encontrada | Verifique se o `instanceId` e `token` estão corretos |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- Este endpoint retorna informações em tempo real sobre o dispositivo conectado
- O campo `originalDevice` indica o tipo de dispositivo original usado para conectar
- O campo `isBusiness` indica se a conta é WhatsApp Business ou não
- A `sessionId` é um identificador único da sessão atual
