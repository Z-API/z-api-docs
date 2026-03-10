---
id: atualizar-notificar-enviadas
title: Notificar Mensagens Enviadas por Mim
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Bell" size="lg" /> Notificar Mensagens Enviadas por Mim

Configure para receber notificações de mensagens que você mesmo enviou através do webhook "Ao receber mensagem". Útil para sincronização, logs e auditoria.

---

:::caution Atenção

Para que este recurso funcione, você deve ter configurado um webhook para o evento [Ao receber mensagem](/docs/webhooks/ao-receber).

:::

---

## Casos de Uso Comuns

- **Sincronização**: Sincronize mensagens enviadas em múltiplos sistemas
- **Logs e Auditoria**: Mantenha logs completos de todas as mensagens, incluindo as enviadas por você
- **Rastreamento**: Rastreie mensagens enviadas automaticamente
- **Backup**: Mantenha backup de todas as mensagens em um sistema centralizado

---

## Para Usuários No-Code

Se você usa ferramentas como n8n ou Make, ative esta opção para receber todas as mensagens (incluindo as que você enviou) no mesmo webhook. Isso permite:

- Processar todas as mensagens em um único fluxo
- Manter histórico completo de conversas
- Sincronizar dados entre sistemas

---

## Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-notify-sent-by-me
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `notifySentByMe` | boolean | `true` para ativar notificações de mensagens enviadas por você, `false` para desativar |

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Por padrão, o webhook "Ao receber mensagem" só notifica sobre mensagens recebidas de outros contatos. Ao ativar `notifySentByMe`, você também receberá notificações sobre mensagens que você mesmo enviou através da API.

**Comportamento**:
- **`notifySentByMe: false`** (padrão): Apenas mensagens recebidas de outros contatos
- **`notifySentByMe: true`**: Todas as mensagens, incluindo as enviadas por você

**Importante**: 
- Requer webhook "Ao receber mensagem" configurado
- As mensagens enviadas por você aparecerão no webhook com informações completas
- Útil para manter sincronização e logs completos

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos-codigo}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('notifySentByMe deve ser um boolean (true ou false)');
  }
  return value;
}

// Dados da requisição com validação
const notifySentByMe = validateBoolean(true); // true = ativar, false = desativar

const requestData = {
  notifySentByMe: notifySentByMe,
};

// Atualizar configuração com tratamento seguro de erros
async function updateNotifySentByMe() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-notify-sent-by-me`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Configuração atualizada. Value:', result.value);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao atualizar configuração:', error.message);
    throw error;
  }
}

// Executar função
updateNotifySentByMe();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface UpdateNotifySentByMeRequest {
  notifySentByMe: boolean;
}

interface UpdateNotifySentByMeResponse {
  value: boolean;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Configure via: export ZAPI_INSTANCE_ID="seu-id"
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateBoolean(value: any): boolean {
  if (typeof value !== 'boolean') {
    throw new Error('notifySentByMe deve ser um boolean (true ou false)');
  }
  return value;
}

// Dados da requisição com validação
const requestData: UpdateNotifySentByMeRequest = {
  notifySentByMe: validateBoolean(true), // true = ativar, false = desativar
};

// Função para atualizar configuração
async function updateNotifySentByMe(): Promise<UpdateNotifySentByMeResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-notify-sent-by-me`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
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
updateNotifySentByMe()
  .then((result) => console.log('Sucesso. Value:', result.value))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_INSTANCE_ID="seu-id"
instance_id = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCE_ID')
instance_token = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_INSTANCE_TOKEN')
client_token = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

# Validação de entrada (segurança)
def validate_boolean(value: Any) -> bool:
    if not isinstance(value, bool):
        raise ValueError('notifySentByMe deve ser um boolean (True ou False)')
    return value

# Dados da requisição com validação
request_data: Dict[str, bool] = {
    'notifySentByMe': validate_boolean(True),  # True = ativar, False = desativar
}

# Atualizar configuração com tratamento seguro de erros
def update_notify_sent_by_me() -> Dict[str, Any]:
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
        url = f'https://api.z-api.io/instances/{instance_id}/token/{instance_token}/update-notify-sent-by-me'
        
        headers = {
            'Content-Type': 'application/json',
            'Client-Token': client_token,
        }
        
        response = requests.put(
            url,
            json=request_data,
            headers=headers,
            timeout=30,  # 30 segundos
            verify=True,  # ⚠️ SEGURANÇA: Verificar certificados SSL
        )
        
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print(f'Configuração atualizada. Value: {result.get("value")}')
        return result
    except requests.exceptions.RequestException as e:
        # ⚠️ SEGURANÇA: Tratamento genérico de erro
        print(f'Erro ao atualizar configuração: {str(e)}')
        raise

# Executar função
if __name__ == '__main__':
    update_notify_sent_by_me()
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_INSTANCE_ID="seu-id"
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_INSTANCE_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Atualizar configuração (true = ativar, false = desativar)
curl -X PUT \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/update-notify-sent-by-me" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
    "notifySentByMe": true
  }' \
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('notifySentByMe deve ser um boolean (true ou false)');
  }
  return value;
}

// Dados da requisição com validação
const requestData = {
  notifySentByMe: validateBoolean(true), // true = ativar, false = desativar
};

// Atualizar configuração
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-notify-sent-by-me`);
const postData = JSON.stringify(requestData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Client-Token': clientToken,
    'Content-Length': Buffer.byteLength(postData),
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
      console.log('Configuração atualizada. Value:', result.value);
    } else {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
      console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro ao atualizar configuração:', error.message);
});

req.write(postData);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('notifySentByMe deve ser um boolean (true ou false)');
  }
  return value;
}

// Rota para atualizar configuração
app.put('/update-notify-sent-by-me', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawNotifySentByMe = req.body.notifySentByMe !== undefined ? req.body.notifySentByMe : true;
    const notifySentByMe = validateBoolean(rawNotifySentByMe);

    const requestData = {
      notifySentByMe: notifySentByMe,
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-notify-sent-by-me`);
    const postData = JSON.stringify(requestData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
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

      req.write(postData);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao atualizar configuração:', error.message);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validateBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('notifySentByMe deve ser um boolean (true ou false)');
  }
  return value;
}

// Rota para atualizar configuração
router.put('/update-notify-sent-by-me', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawNotifySentByMe = ctx.request.body.notifySentByMe !== undefined ? ctx.request.body.notifySentByMe : true;
    const notifySentByMe = validateBoolean(rawNotifySentByMe);

    const requestData = {
      notifySentByMe: notifySentByMe,
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/update-notify-sent-by-me`);
    const postData = JSON.stringify(requestData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
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

      req.write(postData);
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
  console.error('Erro ao atualizar configuração:', err.message);
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

public class UpdateNotifySentByMe {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static boolean validateBoolean(Object value) {
        if (!(value instanceof Boolean)) {
            throw new IllegalArgumentException("notifySentByMe deve ser um boolean (true ou false)");
        }
        return (Boolean) value;
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            boolean notifySentByMe = validateBoolean(true); // true = ativar, false = desativar

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/update-notify-sent-by-me",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("PUT");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000); // 30 segundos
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Enviar dados
            String jsonInputString = String.format("{\"notifySentByMe\":%s}", notifySentByMe);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Configuração atualizada. Response: " + response.toString());
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
using Newtonsoft.Json;

public class UpdateNotifySentByMe
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCE_ID";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_INSTANCE_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static bool ValidateBoolean(object value)
    {
        if (!(value is bool))
        {
            throw new ArgumentException("notifySentByMe deve ser um boolean (true ou false)");
        }
        return (bool)value;
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            bool notifySentByMe = ValidateBoolean(true); // true = ativar, false = desativar

            var requestData = new
            {
                notifySentByMe = notifySentByMe
            };

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/update-notify-sent-by-me";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonConvert.SerializeObject(requestData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PutAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Configuração atualizada. Response: {result}");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Erro: {ex.Message}");
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
    "net/http"
    "os"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var instanceID = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
var instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
var clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Estrutura da requisição
type UpdateNotifySentByMeRequest struct {
    NotifySentByMe bool `json:"notifySentByMe"`
}

// Estrutura da resposta
type UpdateNotifySentByMeResponse struct {
    Value bool `json:"value"`
}

// Validação de entrada (segurança)
func validateBoolean(value bool) bool {
    // Boolean já é validado pelo tipo
    return value
}

func main() {
    // Dados da requisição com validação
    requestData := UpdateNotifySentByMeRequest{
        NotifySentByMe: validateBoolean(true), // true = ativar, false = desativar
    }

    jsonData, err := json.Marshal(requestData)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/update-notify-sent-by-me",
        instanceID, instanceToken)

    req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro ao fazer requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result UpdateNotifySentByMeResponse
        if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
            fmt.Printf("Erro ao decodificar resposta: %v\n", err)
            return
        }
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Printf("Configuração atualizada. Value: %v\n", result.Value)
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_INSTANCE_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateBoolean($value) {
    if (!is_bool($value)) {
        throw new Exception('notifySentByMe deve ser um boolean (true ou false)');
    }
    return $value;
}

// Dados da requisição com validação
$notifySentByMe = validateBoolean(true); // true = ativar, false = desativar

$requestData = [
    'notifySentByMe' => $notifySentByMe,
];

// Atualizar configuração com tratamento seguro de erros
try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/token/" . urlencode($instanceToken) . "/update-notify-sent-by-me";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken,
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // ⚠️ SEGURANÇA: Verificar certificados SSL

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erro cURL: $error");
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Configuração atualizada. Value: " . ($result['value'] ? 'true' : 'false') . "\n";
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        throw new Exception("Erro HTTP $httpCode: Requisição falhou");
    }
} catch (Exception $e) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    error_log("Erro ao atualizar configuração: " . $e->getMessage());
    echo "Erro: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'json'
require 'uri'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_INSTANCE_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_boolean(value)
  unless value.is_a?(TrueClass) || value.is_a?(FalseClass)
    raise ArgumentError, 'notifySentByMe deve ser um boolean (true ou false)'
  end
  value
end

# Dados da requisição com validação
notify_sent_by_me = validate_boolean(true) # true = ativar, false = desativar

request_data = {
  notifySentByMe: notify_sent_by_me
}

# Atualizar configuração com tratamento seguro de erros
begin
  # ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/update-notify-sent-by-me")
  
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Verificar certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Put.new(url.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = request_data.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Configuração atualizada. Value: #{result['value']}"
  else
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    raise "Erro HTTP #{response.code}: Requisição falhou"
  end
rescue => e
  # ⚠️ SEGURANÇA: Tratamento genérico de erro
  puts "Erro ao atualizar configuração: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_INSTANCE_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validateBoolean(_ value: Bool) -> Bool {
    // Boolean já é validado pelo tipo
    return value
}

// Dados da requisição com validação
let notifySentByMe = validateBoolean(true) // true = ativar, false = desativar

let requestData: [String: Bool] = [
    "notifySentByMe": notifySentByMe
]

// Atualizar configuração com tratamento seguro de erros
func updateNotifySentByMe() {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)/update-notify-sent-by-me") else {
        print("Erro: URL inválida")
        return
    }

    var request = URLRequest(url: url)
    request.httpMethod = "PUT"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    do {
        request.httpBody = try JSONSerialization.data(withJSONObject: requestData)
    } catch {
        print("Erro ao serializar JSON: \(error.localizedDescription)")
        return
    }

    URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro ao fazer requisição: \(error.localizedDescription)")
            return
        }

        guard let httpResponse = response as? HTTPURLResponse else {
            print("Erro: Resposta inválida")
            return
        }

        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data,
               let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let value = result["value"] as? Bool {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                print("Configuração atualizada. Value: \(value)")
            }
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
        }
    }.resume()
}

// Executar função
updateNotifySentByMe()
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-Boolean {
    param($value)
    if ($value -isnot [bool]) {
        throw "notifySentByMe deve ser um boolean (true ou false)"
    }
    return $value
}

# Dados da requisição com validação
$notifySentByMe = Validate-Boolean $true # $true = ativar, $false = desativar

$requestData = @{
    notifySentByMe = $notifySentByMe
} | ConvertTo-Json

# Atualizar configuração com tratamento seguro de erros
try {
    # ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/update-notify-sent-by-me"
    
    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Put -Headers $headers -Body $requestData -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Configuração atualizada. Value: $($response.value)"
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "Erro HTTP $statusCode : Requisição falhou"
    } else {
        Write-Host "Erro: $($_.Exception.Message)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
PUT /instances/SUA_INSTANCIA/token/SEU_TOKEN/update-notify-sent-by-me HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 25

{
  "notifySentByMe": true
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA`, `SEU_TOKEN` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide que `notifySentByMe` é um boolean (true ou false) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

// Validação de entrada (segurança)
bool validateBoolean(bool value) {
    // Boolean já é validado pelo tipo
    return value;
}

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // ⚠️ SEGURANÇA: Use variáveis de ambiente
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        // Dados da requisição com validação
        bool notifySentByMe = validateBoolean(true); // true = ativar, false = desativar

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/update-notify-sent-by-me";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"notifySentByMe\":" + (notifySentByMe ? "true" : "false") + "}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        // Configurar headers
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        // Configurar cURL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Configuração atualizada. Response: " << responseData << std::endl;
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            if (res != CURLE_OK) {
                std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
            }
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev
g++ -o update_notify update_notify.cpp -lcurl
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

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    // Dados da requisição
    int notifySentByMe = 1; // 1 = ativar, 0 = desativar

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/update-notify-sent-by-me", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[256];
    snprintf(jsonPayload, sizeof(jsonPayload), "{\"notifySentByMe\":%s}", 
             notifySentByMe ? "true" : "false");

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    // Configurar headers
    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    // Configurar cURL
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        printf("Configuração atualizada. Response: %s\n", responseData);
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        if (res != CURLE_OK) {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev
gcc -o update_notify update_notify.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `value` | boolean | Confirma o valor configurado (`true` ou `false`) |

**Exemplo de resposta:**

```json
{
 "value": true
}
```

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `405` | Método HTTP incorreto. Verifique se está usando `PUT` |
| `415` | Content-Type ausente. Adicione `Content-Type: application/json` no header |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando `notifySentByMe` está ativado, as mensagens enviadas por você também serão notificadas através do webhook [Ao receber mensagem](/docs/webhooks/ao-receber).

As mensagens enviadas por você terão as mesmas informações no webhook que as mensagens recebidas, permitindo processamento uniforme.

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Webhook obrigatório**: Certifique-se de ter configurado o webhook "Ao receber mensagem" antes de ativar esta opção
- **Sincronização**: Use esta opção para manter sincronização completa entre sistemas
- **Logs**: Ideal para sistemas que precisam manter logs completos de todas as mensagens
- **Performance**: Considere o volume de mensagens ao ativar, pois aumentará o número de webhooks recebidos
- **Filtragem**: No seu sistema, você pode filtrar mensagens enviadas por você usando campos como `fromMe` ou similar no payload do webhook

---

## Próximos Passos

- [Ao Receber Mensagem](/docs/webhooks/ao-receber) - Configure o webhook principal
- [Atualizar Todos os Webhooks](/docs/webhooks/atualizar-todos) - Configure todos os webhooks de uma vez
- [Webhooks - Introdução](/docs/webhooks/introducao) - Entenda melhor como funcionam os webhooks
