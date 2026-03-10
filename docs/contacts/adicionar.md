---
id: adicionar
title: Adicionar Contato
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Adicionar Contato

Adicione um novo contato à sua lista do WhatsApp através da API do Z-API. O contato será salvo na sua agenda do WhatsApp.

:::danger Atenção

Este método só funcionará para contas que já receberam a atualização necessária do WhatsApp. Certifique-se de que sua conta do Whatsapp tenha recebido a atualização antes de utilizar este recurso.

Além disso, **é necessário permitir que o WhatsApp adicione contatos diretamente no celular**. Para isso, vá até as configurações de privacidade do seu aplicativo e ajuste as permissões de forma que o WhatsApp possa acessar e modificar seus contatos.

:::

<details>
  <summary>Visualizar exemplos da atualização</summary>

  ![Exemplo 1](https://developer.z-api.io/assets/images/add-contacts1-9717e55a45d140e7c6d40dd5616bbb37.jpeg)
  ![Exemplo 2](https://developer.z-api.io/assets/images/add-contacts2-14688bc811cf124325921a696679167d.jpeg)

</details>

## Endpoint

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/contacts/add
```

### Headers

| Header | Valor | Obrigatório |
|--------|-------|-------------|
| Client-Token | `[SEU_TOKEN]` | Sim |

### Request Body

O corpo da requisição deve ser um array de objetos, onde cada objeto representa um contato a ser adicionado.

```json
[
  {
    "firstName": "Contato 1",
    "lastName": "Sobrenome 1",
    "phone": "554499999999"
  },
  {
    "firstName": "Contato 2",
    "lastName": "Sobrenome 2",
    "phone": "554499998888"
  }
]
```

### Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| firstName | string | Sim | Nome do contato que vai ser adicionado na agenda |
| phone | string | Sim | Número do contato que vai ser adicionado na agenda |
| lastName | string | Não | Sobrenome do contato que vai ser adicionado na agenda |

## Respostas

### 200 OK

```json
{
  "success": true,
  "errors": []
}
```

### Erros comuns

| Código | Motivo | Dica |
|--------|--------|------|
| 405 | Method Not Allowed | Verifique se você enviou o POST corretamente conforme especificado no início deste tópico. |
| 415 | Unsupported Media Type | Certifique de adicionar na headers da requisição o "Content-Type" como "application/json" |

## Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome do contato excede limite de 100 caracteres');
  }
  return name.trim();
}

// Dados da requisição com validação
const rawPhone = '5511999999999';
const rawName = 'João Silva';

const contactData = {
  phone: validatePhoneNumber(rawPhone),
  name: validateName(rawName),
};

// Adicionar contato com tratamento seguro de erros
async function addContact() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/contacts`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Contato adicionado com sucesso:', result.contact);
    } else {
      console.error('Erro ao adicionar contato');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao adicionar contato:', error.message);
    throw error;
  }
}

// Executar função
addContact();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface AddContactResponse {
  value: boolean;
  message: string;
  contact?: Contact;
}

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateName(name: string): string {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome do contato excede limite de 100 caracteres');
  }
  return name.trim();
}

// Dados da requisição com validação
const contactData = {
  phone: validatePhoneNumber('5511999999999'),
  name: validateName('João Silva'),
};

// Função para adicionar contato
async function addContact(): Promise<AddContactResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/contacts`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
addContact()
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
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone_number(phone: str) -> str:
    """Valida e limpa número de telefone."""
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Número de telefone inválido. Use formato: DDI + DDD + Número')
    return cleaned

def validate_name(name: str) -> str:
    """Valida nome do contato."""
    if not name or not name.strip():
        raise ValueError('Nome do contato é obrigatório')
    if len(name) > 100:
        raise ValueError('Nome do contato excede limite de 100 caracteres')
    return name.strip()

# Dados da requisição com validação
raw_phone = '5511999999999'
raw_name = 'João Silva'

contact_data = {
    'phone': validate_phone_number(raw_phone),
    'name': validate_name(raw_name),
}

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/contacts"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Adicionar contato com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=contact_data, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Contato adicionado com sucesso:', result.get('contact'))
    else:
        print('Erro ao adicionar contato')
    
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
PHONE="5511999999999"
NAME="João Silva"

# Adicionar contato via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/contacts" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"name\": \"${NAME}\"
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome do contato excede limite de 100 caracteres');
  }
  return name.trim();
}

// Dados da requisição com validação
const contactData = {
  phone: validatePhoneNumber('5511999999999'),
  name: validateName('João Silva'),
};

// Adicionar contato
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/contacts`);
const postData = JSON.stringify(contactData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
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
      if (result.value) {
        console.log('Contato adicionado:', result.contact);
      } else {
        console.error('Erro ao adicionar contato');
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome do contato excede limite de 100 caracteres');
  }
  return name.trim();
}

// Rota para adicionar contato
app.post('/contacts', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawName = req.body.name || 'João Silva';

    const contactData = {
      phone: validatePhoneNumber(rawPhone),
      name: validateName(rawName),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/contacts`);
    const postData = JSON.stringify(contactData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
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
    console.error('Erro ao adicionar contato:', error.message);
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome do contato é obrigatório');
  }
  if (name.length > 100) {
    throw new Error('Nome do contato excede limite de 100 caracteres');
  }
  return name.trim();
}

// Rota para adicionar contato
router.post('/contacts', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawName = ctx.request.body.name || 'João Silva';

    const contactData = {
      phone: validatePhoneNumber(rawPhone),
      name: validateName(rawName),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/contacts`);
    const postData = JSON.stringify(contactData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
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
  console.error('Erro ao adicionar contato:', err.message);
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

public class AddContact {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static String validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do contato é obrigatório");
        }
        if (name.length() > 100) {
            throw new IllegalArgumentException("Nome do contato excede limite de 100 caracteres");
        }
        return name.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String phone = validatePhoneNumber("5511999999999");
            String name = validateName("João Silva");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/contacts",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            String jsonInputString = String.format("{\"phone\":\"%s\",\"name\":\"%s\"}", phone, name);

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

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
                    System.out.println("Contato adicionado com sucesso");
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class AddContact
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static string ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Nome do contato é obrigatório");
        }
        if (name.Length > 100)
        {
            throw new ArgumentException("Nome do contato excede limite de 100 caracteres");
        }
        return name.Trim();
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string name = ValidateName("João Silva");

            var requestData = new
            {
                phone = phone,
                name = name
            };

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/contacts";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonConvert.SerializeObject(requestData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Contato adicionado com sucesso");
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

// Validação de entrada (segurança)
func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido. Use formato: DDI + DDD + Número")
    }
    return cleaned, nil
}

func validateName(name string) (string, error) {
    trimmed := name
    for len(trimmed) > 0 && (trimmed[0] == ' ' || trimmed[0] == '\t') {
        trimmed = trimmed[1:]
    }
    for len(trimmed) > 0 && (trimmed[len(trimmed)-1] == ' ' || trimmed[len(trimmed)-1] == '\t') {
        trimmed = trimmed[:len(trimmed)-1]
    }
    if len(trimmed) == 0 {
        return "", fmt.Errorf("nome do contato é obrigatório")
    }
    if len(trimmed) > 100 {
        return "", fmt.Errorf("nome do contato excede limite de 100 caracteres")
    }
    return trimmed, nil
}

func main() {
    // Dados da requisição com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação (telefone): %v\n", err)
        return
    }

    name, err := validateName("João Silva")
    if err != nil {
        fmt.Printf("Erro de validação (nome): %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/contacts",
        instanceId, instanceToken)

    requestData := map[string]string{
        "phone": phone,
        "name":  name,
    }

    jsonData, err := json.Marshal(requestData)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
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
        fmt.Printf("Contato adicionado com sucesso\n")
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
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido. Use formato: DDI + DDD + Número');
    }
    return $cleaned;
}

function validateName($name) {
    $trimmed = trim($name);
    if (empty($trimmed)) {
        throw new Exception('Nome do contato é obrigatório');
    }
    if (strlen($trimmed) > 100) {
        throw new Exception('Nome do contato excede limite de 100 caracteres');
    }
    return $trimmed;
}

try {
    // Dados da requisição com validação
    $phone = validatePhoneNumber('5511999999999');
    $name = validateName('João Silva');

    $contactData = [
        'phone' => $phone,
        'name' => $name,
    ];

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/contacts',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-Token: ' . $clientToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contactData));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if ($result['value'] ?? false) {
            echo "Contato adicionado com sucesso\n";
        } else {
            echo "Erro ao adicionar contato\n";
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
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Use formato: DDI + DDD + Número'
  end
  cleaned
end

def validate_name(name)
  trimmed = name.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Nome do contato é obrigatório'
  end
  if trimmed.length > 100
    raise ArgumentError, 'Nome do contato excede limite de 100 caracteres'
  end
  trimmed
end

begin
  # Dados da requisição com validação
  phone = validate_phone_number('5511999999999')
  name = validate_name('João Silva')

  contact_data = {
    phone: phone,
    name: name
  }

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/contacts")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'
  request.body = contact_data.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts "Contato adicionado com sucesso"
    else
      puts "Erro ao adicionar contato"
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
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    guard cleaned.count >= 10 && cleaned.count <= 15 else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido. Use formato: DDI + DDD + Número"])
    }
    return cleaned
}

func validateName(_ name: String) throws -> String {
    let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Nome do contato é obrigatório"])
    }
    guard trimmed.count <= 100 else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Nome do contato excede limite de 100 caracteres"])
    }
    return trimmed
}

// Dados da requisição com validação
let phone = try validatePhoneNumber("5511999999999")
let name = try validateName("João Silva")

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/contacts") else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.timeoutInterval = 30

let contactData: [String: String] = [
    "phone": phone,
    "name": name
]

do {
    request.httpBody = try JSONSerialization.data(withJSONObject: contactData)
} catch {
    print("Erro ao criar JSON: \(error.localizedDescription)")
    return
}

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
                    print("Contato adicionado com sucesso")
                } else {
                    print("Erro ao adicionar contato")
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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Use formato: DDI + DDD + Número"
    }
    return $cleaned
}

function Validate-Name {
    param([string]$Name)
    $trimmed = $Name.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Nome do contato é obrigatório"
    }
    if ($trimmed.Length -gt 100) {
        throw "Nome do contato excede limite de 100 caracteres"
    }
    return $trimmed
}

try {
    # Dados da requisição com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $name = Validate-Name -Name "João Silva"

    $contactData = @{
        phone = $phone
        name = $name
    } | ConvertTo-Json

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/contacts"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $contactData -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.value) {
        Write-Host "Contato adicionado com sucesso"
    } else {
        Write-Host "Erro ao adicionar contato"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/contacts HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/json

{
  "phone": "5511999999999",
  "name": "João Silva"
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <regex>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::runtime_error("Número de telefone inválido. Use formato: DDI + DDD + Número");
    }
    return cleaned;
}

std::string validateName(const std::string& name) {
    std::string trimmed = name;
    while (!trimmed.empty() && (trimmed[0] == ' ' || trimmed[0] == '\t')) {
        trimmed.erase(0, 1);
    }
    while (!trimmed.empty() && (trimmed[trimmed.length() - 1] == ' ' || trimmed[trimmed.length() - 1] == '\t')) {
        trimmed.erase(trimmed.length() - 1, 1);
    }
    if (trimmed.empty()) {
        throw std::runtime_error("Nome do contato é obrigatório");
    }
    if (trimmed.length() > 100) {
        throw std::runtime_error("Nome do contato excede limite de 100 caracteres");
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
        std::string phone = validatePhoneNumber("5511999999999");
        std::string name = validateName("João Silva");

        std::string jsonData = "{\"phone\":\"" + phone + "\",\"name\":\"" + name + "\"}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/contacts";
            std::string responseData;

            struct curl_slist* headers = NULL;
            std::string tokenHeader = "Client-Token: " + clientToken;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, tokenHeader.c_str());
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_POST, 1L);
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData.c_str());
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Contato adicionado com sucesso" << std::endl;
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
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    for (int i = 0; phone[i] != '\0'; i++) {
        if (phone[i] >= '0' && phone[i] <= '9') {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    int len = strlen(cleaned);
    if (len < 10 || len > 15) {
        return 0; // Inválido
    }
    return 1; // Válido
}

int validateName(const char* name, char* cleaned) {
    int len = strlen(name);
    int start = 0;
    while (start < len && (name[start] == ' ' || name[start] == '\t')) start++;
    int end = len - 1;
    while (end >= start && (name[end] == ' ' || name[end] == '\t')) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    int j = 0;
    for (int i = start; i <= end; i++) {
        cleaned[j++] = name[i];
    }
    cleaned[j] = '\0';
    
    if (strlen(cleaned) > 100) {
        return 0; // Inválido
    }
    
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
    char phone[] = "5511999999999";
    char name[] = "João Silva";
    char cleanedPhone[20];
    char cleanedName[101];
    
    if (!validatePhoneNumber(phone, cleanedPhone)) {
        fprintf(stderr, "Número de telefone inválido. Use formato: DDI + DDD + Número\n");
        return 1;
    }
    
    if (!validateName(name, cleanedName)) {
        fprintf(stderr, "Nome do contato inválido\n");
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/contacts",
                 instanceId, instanceToken);

        char jsonData[256];
        snprintf(jsonData, sizeof(jsonData), "{\"phone\":\"%s\",\"name\":\"%s\"}", cleanedPhone, cleanedName);

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
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Contato adicionado com sucesso\n");
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

## Limitações

- **Formato do número**: Deve estar no formato internacional (sem espaços, hífens ou caracteres especiais)
- **Nome**: Máximo de 100 caracteres
- **Contatos duplicados**: Não é possível adicionar o mesmo número duas vezes

## Notas

- O contato será salvo na sua agenda do WhatsApp
- Após adicionar, você poderá ver o nome do contato nas conversas
- Use o formato internacional para o número (ex.: `5511999999999`)
- O contato precisa estar no WhatsApp para ser adicionado com sucesso
