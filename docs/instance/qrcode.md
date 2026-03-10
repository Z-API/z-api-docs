---
id: qrcode
title: Pegar QRCode
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="QrCode" size="lg" /> Pegar QRCode

Obtenha o QR Code para conectar sua instância ao WhatsApp através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Como no WhatsApp Web, você precisa ler um QR Code ou usar um número de telefone para conectar-se ao Z-API.

Existem 2 formas que você pode utilizar para realizar esta conexão:

- Se conectar através do nosso painel de administrador ou
- Disponibilizar a experiência dentro da sua própria aplicação através dos métodos descritos nesta sessão.

Você pode optar por um dos métodos disponíveis para ler o QR Code do WhatsApp.

---

## <Icon name="Link" size="md" /> Endpoints {#endpoints}

### 1. QR Code - Bytes

```http
GET /instances/{instanceId}/token/{token}/qr-code
```

Este método retorna os bytes do QR Code. Você poderá renderizar em um componente do tipo QR Code compatível com sua linguagem de programação.

### 2. QR Code - Imagem Base64

```http
GET /instances/{instanceId}/token/{token}/qr-code/image
```

Este método retorna uma imagem do tipo base64. Você poderá renderizar em um componente do tipo imagem compatível com sua linguagem de programação.

### 3. Código de Telefone

```http
GET /instances/{instanceId}/token/{token}/phone-code/{phone}
```

Este método retorna um código para que seja possível conectar o número à API sem a necessidade de leitura de QR Code, apenas inserindo o código gerado.

Você pode inserir o código gerado através da API diretamente no WhatsApp, na mesma aba onde é feita a leitura do QR Code, clicando em "Conectar com número de telefone".

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

### <Icon name="Settings" size="sm" /> Parâmetros {#parametros}

#### Para `/phone-code/{phone}`

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `phone` | string | Sim | Número de telefone no formato DDI + DDD + NÚMERO (ex: `5511999999999`) |

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

// Obter QR Code (bytes) com tratamento seguro de erros
async function getQRCode() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code`;
    
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

    // QR Code retorna como bytes (ArrayBuffer)
    const arrayBuffer = await response.arrayBuffer();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('QR Code obtido com sucesso');
    return arrayBuffer;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao obter QR Code:', error.message);
    throw error;
  }
}

// Obter QR Code como imagem Base64
async function getQRCodeImage() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code/image`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Client-Token': clientToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // data.base64 contém a imagem em base64
    console.log('QR Code (imagem) obtido com sucesso');
    return data;
  } catch (error) {
    console.error('Erro ao obter QR Code (imagem):', error.message);
    throw error;
  }
}

// Obter código de telefone
async function getPhoneCode(phone) {
  try {
    // Validação de entrada (segurança)
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 15) {
      throw new Error('Número de telefone inválido');
    }

    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/phone-code/${encodeURIComponent(cleaned)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Client-Token': clientToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Código de telefone obtido com sucesso');
    return data;
  } catch (error) {
    console.error('Erro ao obter código de telefone:', error.message);
    throw error;
  }
}

// Executar função
getQRCode();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta de QR Code imagem
interface QRCodeImageResponse {
  base64: string;
}

// Interface para resposta de código de telefone
interface PhoneCodeResponse {
  code: string;
}

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Função para obter QR Code (bytes)
async function getQRCode(): Promise<ArrayBuffer> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code`;

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

  return response.arrayBuffer();
}

// Função para obter QR Code (imagem base64)
async function getQRCodeImage(): Promise<QRCodeImageResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code/image`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Token': clientToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Função para obter código de telefone
async function getPhoneCode(phone: string): Promise<PhoneCodeResponse> {
  const cleaned = validatePhoneNumber(phone);
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/phone-code/${encodeURIComponent(cleaned)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Token': clientToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
getQRCode()
  .then(() => console.log('QR Code obtido com sucesso'))
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

def validate_phone_number(phone: str) -> str:
    """Valida e limpa número de telefone."""
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Número de telefone inválido. Use formato: DDI + DDD + Número')
    return cleaned

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN
}

# Obter QR Code (bytes) com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/qr-code"
    response = requests.get(url, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    # QR Code retorna como bytes
    qr_code_bytes = response.content
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print("QR Code obtido com sucesso")
    print(f"Tamanho: {len(qr_code_bytes)} bytes")
    
except requests.exceptions.HTTPError as e:
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")

# Obter QR Code como imagem Base64
try:
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/qr-code/image"
    response = requests.get(url, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # result['base64'] contém a imagem em base64
    print("QR Code (imagem) obtido com sucesso")
    
except requests.exceptions.HTTPError as e:
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")

# Obter código de telefone
try:
    phone = validate_phone_number('5511999999999')
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/phone-code/{phone}"
    response = requests.get(url, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    print("Código de telefone obtido com sucesso")
    print(f"Código: {result.get('code')}")
    
except ValueError as e:
    print(f"Erro de validação: {e}")
except requests.exceptions.HTTPError as e:
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
# Obter QR Code (bytes) via cURL
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/qr-code" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  --fail-with-body \
  --max-time 30 \
  --output qrcode.png

# Obter QR Code como imagem Base64
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/qr-code/image" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  --fail-with-body \
  --max-time 30

# Obter código de telefone
PHONE="5511999999999"
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/phone-code/${PHONE}" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const fs = require('fs');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Obter QR Code (bytes)
function getQRCode() {
  return new Promise((resolve, reject) => {
    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code`;
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'GET',
      headers: {
        'Client-Token': clientToken,
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const buffer = Buffer.concat(chunks);
          // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
          console.log('QR Code obtido com sucesso');
          resolve(buffer);
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
getQRCode()
  .then((buffer) => {
    // Salvar QR Code em arquivo (opcional)
    fs.writeFileSync('qrcode.png', buffer);
    console.log('QR Code salvo em qrcode.png');
  })
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

// Rota para obter QR Code
app.get('/api/qrcode', async (req, res) => {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code`;
    
    const response = await axios.get(url, {
      headers: {
        'Client-Token': clientToken,
      },
      responseType: 'arraybuffer',
      timeout: 30000,
    });

    // ⚠️ SEGURANÇA: Não exponha tokens na resposta
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(response.data));
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento seguro de erros
    console.error('Erro ao obter QR Code:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao obter QR Code',
    });
  }
});

// Rota para obter QR Code como imagem Base64
app.get('/api/qrcode/image', async (req, res) => {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code/image`;
    
    const response = await axios.get(url, {
      headers: {
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao obter QR Code (imagem):', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao obter QR Code (imagem)',
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

// Middleware para obter QR Code
app.use(async (ctx) => {
  if (ctx.path === '/api/qrcode') {
    try {
      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/qr-code`;
      
      const response = await axios.get(url, {
        headers: {
          'Client-Token': clientToken,
        },
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      // ⚠️ SEGURANÇA: Não exponha tokens na resposta
      ctx.set('Content-Type', 'image/png');
      ctx.body = Buffer.from(response.data);
    } catch (error) {
      // ⚠️ SEGURANÇA: Tratamento seguro de erros
      console.error('Erro ao obter QR Code:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao obter QR Code',
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
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class GetQRCode {
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
                "https://api.z-api.io/instances/%s/token/%s/qr-code",
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
                InputStream inputStream = connection.getInputStream();
                byte[] qrCodeBytes = inputStream.readAllBytes();
                inputStream.close();
                
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                System.out.println("QR Code obtido com sucesso");
                System.out.println("Tamanho: " + qrCodeBytes.length + " bytes");
                // Salvar em arquivo (opcional)
                // Files.write(Paths.get("qrcode.png"), qrCodeBytes);
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
using System.IO;

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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/qr-code";
            
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var response = await client.GetAsync(url);
                
                if (response.IsSuccessStatusCode)
                {
                    var qrCodeBytes = await response.Content.ReadAsByteArrayAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("QR Code obtido com sucesso");
                    Console.WriteLine($"Tamanho: {qrCodeBytes.Length} bytes");
                    // Salvar em arquivo (opcional)
                    // await File.WriteAllBytesAsync("qrcode.png", qrCodeBytes);
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/qr-code", instanceId, instanceToken)
    
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
        
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Println("QR Code obtido com sucesso")
        fmt.Printf("Tamanho: %d bytes\n", len(body))
        // Salvar em arquivo (opcional)
        // os.WriteFile("qrcode.png", body, 0644)
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
    'https://api.z-api.io/instances/%s/token/%s/qr-code',
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
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    echo "QR Code obtido com sucesso\n";
    echo "Tamanho: " . strlen($response) . " bytes\n";
    // Salvar em arquivo (opcional)
    // file_put_contents('qrcode.png', $response);
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# ⚠️ SEGURANÇA: Sempre use HTTPS
url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/qr-code")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique SSL

request = Net::HTTP::Get.new(url)
request['Client-Token'] = client_token

begin
  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts 'QR Code obtido com sucesso'
    puts "Tamanho: #{response.body.length} bytes"
    # Salvar em arquivo (opcional)
    # File.write('qrcode.png', response.body)
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
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/qr-code") else {
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
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            print("QR Code obtido com sucesso")
            print("Tamanho: \(data.count) bytes")
            // Salvar em arquivo (opcional)
            // try? data.write(to: URL(fileURLWithPath: "qrcode.png"))
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
$url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/qr-code"

$headers = @{
    "Client-Token" = $clientToken
}

try {
    $response = Invoke-WebRequest -Uri $url -Method Get -Headers $headers -TimeoutSec 30
    
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "QR Code obtido com sucesso"
    Write-Host "Tamanho: $($response.Content.Length) bytes"
    # Salvar em arquivo (opcional)
    # [System.IO.File]::WriteAllBytes("qrcode.png", $response.Content)
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
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/qr-code HTTP/1.1
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
#include <fstream>

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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/qr-code";
    
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
                std::cout << "QR Code obtido com sucesso" << std::endl;
                std::cout << "Tamanho: " << responseData.length() << " bytes" << std::endl;
                // Salvar em arquivo (opcional)
                // std::ofstream file("qrcode.png", std::ios::binary);
                // file.write(responseData.c_str(), responseData.length());
                // file.close();
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/qr-code", instanceId, instanceToken);
    
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
                printf("QR Code obtido com sucesso\n");
                printf("Tamanho: %zu bytes\n", strlen(responseData));
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

### 200 OK - QR Code (Bytes) {#200-ok-bytes}

Retorna os bytes da imagem do QR Code (formato PNG).

### 200 OK - QR Code (Imagem Base64) {#200-ok-image}

```json
{
  "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 200 OK - Código de Telefone {#200-ok-phone}

```json
{
  "code": "123456"
}
```

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Instância não encontrada | Verifique se o `instanceId` e `token` estão corretos |
| `409` | Já conectado | A instância já está conectada, não é necessário QR Code |
| `5xx` | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

:::note Importante

Se você optou por implementar a leitura do QR Code em sua aplicação, você precisa saber que o WhatsApp invalida o QR Code a cada 20 segundos.

Caso você chame o método e já esteja conectado, ele não permitirá que você conecte novamente.

Uma vez conectado, você já pode começar a utilizar os métodos Z-API para manipular seu WhatsApp.

:::

:::important Recomendações

- **Crie um método com intervalos entre 10 e 20 segundos** para chamar a API e pegar o novo QR Code.
- **Caso o usuário não leia o QR Code após 3 chamadas**, interrompa o fluxo e adicione um botão solicitando interação do mesmo para evitar chamadas desnecessárias para a API do WhatsApp.

:::

- Use o endpoint `/qr-code` quando precisar renderizar o QR Code em um componente nativo da sua linguagem
- Use o endpoint `/qr-code/image` quando precisar exibir o QR Code como uma imagem HTML (`<img src="data:image/png;base64,...">`)
- Use o endpoint `/phone-code/{phone}` quando quiser permitir conexão via código numérico em vez de QR Code
- O QR Code expira a cada 20 segundos, então você deve atualizar periodicamente se o usuário não tiver lido ainda
