---
id: localizacao
title: Enviar localização
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MapPin" size="lg" /> Enviar localização

Envie uma localização geográfica fixa para um destinatário usando a API do Z-API. A localização aparece como um ponto no mapa do WhatsApp, permitindo que o destinatário visualize e navegue até o local.

**Casos de uso comuns:**
- Enviar endereço de loja ou escritório
- Compartilhar localização de eventos
- Enviar coordenadas de entrega
- Indicar pontos de interesse

![Exemplo de mensagem com localização](/img/send-message-location.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-location
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

**Exemplo completo:**

```json
{
  "phone": "5511999998888",
  "title": "Google Brasil",
  "address": "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133",
  "latitude": "-23.0696347",
  "longitude": "-50.4357913"
}
```

**Exemplo com parâmetros opcionais:**

```json
{
  "phone": "5511999998888",
  "title": "Google Brasil",
  "address": "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133",
  "latitude": "-23.0696347",
  "longitude": "-50.4357913",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|------------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. |
| `title` | string | Sim | Título para sua localização (ex: "Minha casa", "Loja Central", "Escritório"). |
| `address` | string | Sim | Endereço completo da localização. Deve ser composto por logradouro, NÚMERO, bairro, cidade, UF e CEP, tudo separado por vírgula. Exemplo: "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133". |
| `latitude` | string | Sim | Latitude da localização enviada. Deve estar entre -90 e 90 graus. Pode ser enviada como string ou number. |
| `longitude` | string | Sim | Longitude da localização enviada. Deve estar entre -180 e 180 graus. Pode ser enviada como string ou number. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|------------|--------|-------------|--------------------------------------------------|
| `messageId` | string | Não | Permite responder uma mensagem existente no chat, criando uma conversa encadeada. Use o `messageId` da mensagem que você quer responder. Veja mais sobre [como responder mensagens](./responder). |
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplas localizações em sequência para evitar bloqueios. |

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá a localização. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).

2. **`title`**: O título da localização (ex: `"Minha Loja"`, `"Escritório Central"`, `"Ponto de Entrega"`). Este título aparece quando a localização é visualizada.

3. **`address`**: O endereço completo da localização. **Formato:** logradouro, NÚMERO, bairro, cidade, UF e CEP, tudo separado por vírgula. Exemplo: `"Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133"`.

4. **`latitude`**: A latitude da localização (coordenada geográfica). Deve estar entre -90 e 90 graus. Exemplo: `"-23.0696347"` ou `-23.0696347`.

5. **`longitude`**: A longitude da localização (coordenada geográfica). Deve estar entre -180 e 180 graus. Exemplo: `"-50.4357913"` ou `-50.4357913`.

### Campos Opcionais

6. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

7. **`delayMessage`**: Se você vai enviar várias localizações seguidas, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios.

**Dica:** Na maioria dos casos, você só precisa preencher os campos obrigatórios. Os campos opcionais podem ser deixados em branco.

**Como obter coordenadas (latitude e longitude):**

- **Google Maps**: Clique com o botão direito no local → "O que há aqui?" → As coordenadas aparecem no campo de busca
- **Google Earth**: Clique no local → As coordenadas aparecem no canto inferior direito
- **Sites de geocodificação**: Use serviços como Google Geocoding API, OpenStreetMap, etc.

**Formato do endereço:**

O campo `address` deve seguir este formato:

```text
Logradouro, NÚMERO - Bairro, Cidade - UF, CEP
```

Exemplo:

```text
Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133
```

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Campo | Tipo | Descrição |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone`, `latitude` e `longitude` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Latitude inválida. Deve estar entre -90 e 90 graus');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Longitude inválida. Deve estar entre -180 e 180 graus');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// Dados da localização com validação
const locationData = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

// Remover campos opcionais se undefined
if (!locationData.name) delete locationData.name;
if (!locationData.address) delete locationData.address;

// Enviar requisição com tratamento seguro de erros
async function sendLocation() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

const result = await response.json();
    console.log('Localização enviada com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erro ao enviar localização:', error.message);
    throw error;
  }
}

// Executar função
sendLocation();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface SendLocationRequest {
  phone: string;
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

interface SendLocationResponse {
  messageId: string;
  status: string;
}

const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function validateLatitude(latitude: number): number {
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Latitude inválida. Deve estar entre -90 e 90 graus');
  }
  return latitude;
}

function validateLongitude(longitude: number): number {
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Longitude inválida. Deve estar entre -180 e 180 graus');
  }
  return longitude;
}

function sanitizeString(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const locationData: SendLocationRequest = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

async function sendLocation(): Promise<SendLocationResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

sendLocation()
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional

INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_latitude(latitude: float) -> float:
    if not isinstance(latitude, (int, float)) or latitude < -90 or latitude > 90:
        raise ValueError("Latitude inválida. Deve estar entre -90 e 90 graus")
    return float(latitude)

def validate_longitude(longitude: float) -> float:
    if not isinstance(longitude, (int, float)) or longitude < -180 or longitude > 180:
        raise ValueError("Longitude inválida. Deve estar entre -180 e 180 graus")
    return float(longitude)

def sanitize_string(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    trimmed = value.strip()
    return trimmed if trimmed else None

url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-location"

try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "latitude": validate_latitude(-23.5505),
        "longitude": validate_longitude(-46.6333),
        "name": sanitize_string("São Paulo, SP"),
        "address": sanitize_string("Praça da Sé, São Paulo - SP"),
    }
    # Remover campos None
    payload = {k: v for k, v in payload.items() if v is not None}
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

try:
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    print(f"Localização enviada. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-location" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
 "phone": "5511999999999",
 "latitude": -23.5505,
 "longitude": -46.6333,
 "name": "São Paulo, SP",
 "address": "Praça da Sé, São Paulo - SP"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Latitude inválida. Deve estar entre -90 e 90 graus');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Longitude inválida. Deve estar entre -180 e 180 graus');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const locationData = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

if (!locationData.name) delete locationData.name;
if (!locationData.address) delete locationData.address;

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
const postData = JSON.stringify(locationData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Client-Token': clientToken,
    'Content-Length': Buffer.byteLength(postData),
  },
  timeout: 30000,
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      console.log('Localização enviada. MessageId:', result.messageId);
    } else {
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Latitude inválida. Deve estar entre -90 e 90 graus');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Longitude inválida. Deve estar entre -180 e 180 graus');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

app.post('/send-location', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawLatitude = req.body.latitude !== undefined ? req.body.latitude : -23.5505;
    const rawLongitude = req.body.longitude !== undefined ? req.body.longitude : -46.6333;
    const rawName = req.body.name || '';
    const rawAddress = req.body.address || '';

    const locationData = {
      phone: validatePhoneNumber(rawPhone),
      latitude: validateLatitude(rawLatitude),
      longitude: validateLongitude(rawLongitude),
      name: sanitizeString(rawName),
      address: sanitizeString(rawAddress),
    };

    if (!locationData.name) delete locationData.name;
    if (!locationData.address) delete locationData.address;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
    const postData = JSON.stringify(locationData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    console.error('Erro ao enviar localização:', error.message);
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

app.use(require('koa-bodyparser')());

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Latitude inválida. Deve estar entre -90 e 90 graus');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Longitude inválida. Deve estar entre -180 e 180 graus');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

router.post('/send-location', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawLatitude = ctx.request.body.latitude !== undefined ? ctx.request.body.latitude : -23.5505;
    const rawLongitude = ctx.request.body.longitude !== undefined ? ctx.request.body.longitude : -46.6333;
    const rawName = ctx.request.body.name || '';
    const rawAddress = ctx.request.body.address || '';

    const locationData = {
      phone: validatePhoneNumber(rawPhone),
      latitude: validateLatitude(rawLatitude),
      longitude: validateLongitude(rawLongitude),
      name: sanitizeString(rawName),
      address: sanitizeString(rawAddress),
    };

    if (!locationData.name) delete locationData.name;
    if (!locationData.address) delete locationData.address;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
    const postData = JSON.stringify(locationData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000,
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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Erro ao enviar localização:', err.message);
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

public class SendLocation {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static double validateLatitude(double latitude) {
        if (latitude < -90 || latitude > 90) {
            throw new IllegalArgumentException("Latitude inválida. Deve estar entre -90 e 90 graus");
        }
        return latitude;
    }

    private static double validateLongitude(double longitude) {
        if (longitude < -180 || longitude > 180) {
            throw new IllegalArgumentException("Longitude inválida. Deve estar entre -180 e 180 graus");
        }
        return longitude;
    }

    private static String sanitizeString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        return value.trim();
    }

    public static void main(String[] args) {
        try {
            String phone = validatePhoneNumber("5511999999999");
            double latitude = validateLatitude(-23.5505);
            double longitude = validateLongitude(-46.6333);
            String name = sanitizeString("São Paulo, SP");
            String address = sanitizeString("Praça da Sé, São Paulo - SP");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-location";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(phone);
            jsonPayload.append("\",\"latitude\":").append(latitude);
            jsonPayload.append(",\"longitude\":").append(longitude);
            if (name != null) {
                jsonPayload.append(",\"name\":\"").append(name.replace("\"", "\\\"")).append("\"");
            }
            if (address != null) {
                jsonPayload.append(",\"address\":\"").append(address.replace("\"", "\\\"")).append("\"");
            }
            jsonPayload.append("}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("Localização enviada. Response: " + response.toString());
                }
            } else {
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

class SendLocation
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static double ValidateLatitude(double latitude)
    {
        if (latitude < -90 || latitude > 90)
        {
            throw new ArgumentException("Latitude inválida. Deve estar entre -90 e 90 graus");
        }
        return latitude;
    }

    private static double ValidateLongitude(double longitude)
    {
        if (longitude < -180 || longitude > 180)
        {
            throw new ArgumentException("Longitude inválida. Deve estar entre -180 e 180 graus");
        }
        return longitude;
    }

    private static string? SanitizeString(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }
        return value.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            string phone = ValidatePhoneNumber("5511999999999");
            double latitude = ValidateLatitude(-23.5505);
            double longitude = ValidateLongitude(-46.6333);
            string? name = SanitizeString("São Paulo, SP");
            string? address = SanitizeString("Praça da Sé, São Paulo - SP");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-location";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    latitude = latitude,
                    longitude = longitude,
                    name = name,
                    address = address
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Localização enviada. Response: {responseBody}");
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
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

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido")
    }
    return cleaned, nil
}

func validateLatitude(latitude float64) error {
    if latitude < -90 || latitude > 90 {
        return fmt.Errorf("latitude inválida. Deve estar entre -90 e 90 graus")
    }
    return nil
}

func validateLongitude(longitude float64) error {
    if longitude < -180 || longitude > 180 {
        return fmt.Errorf("longitude inválida. Deve estar entre -180 e 180 graus")
    }
    return nil
}

func sanitizeString(value string) string {
    trimmed := strings.TrimSpace(value)
    if trimmed == "" {
        return ""
    }
    return trimmed
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    latitude := -23.5505
    if err := validateLatitude(latitude); err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    longitude := -46.6333
    if err := validateLongitude(longitude); err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    name := sanitizeString("São Paulo, SP")
    address := sanitizeString("Praça da Sé, São Paulo - SP")

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-location", instanceId)

    payload := map[string]interface{}{
        "phone":     phone,
        "latitude":  latitude,
        "longitude": longitude,
    }
    if name != "" {
        payload["name"] = name
    }
    if address != "" {
        payload["address"] = address
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, _ := io.ReadAll(resp.Body)
        fmt.Printf("Localização enviada. Response: %s\n", string(body))
    } else {
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido');
    }
    return $cleaned;
}

function validateLatitude($latitude) {
    if (!is_numeric($latitude) || $latitude < -90 || $latitude > 90) {
        throw new Exception('Latitude inválida. Deve estar entre -90 e 90 graus');
    }
    return (float)$latitude;
}

function validateLongitude($longitude) {
    if (!is_numeric($longitude) || $longitude < -180 || $longitude > 180) {
        throw new Exception('Longitude inválida. Deve estar entre -180 e 180 graus');
    }
    return (float)$longitude;
}

function sanitizeString($value) {
    if (empty($value) || trim($value) === '') {
        return null;
    }
    return trim($value);
}

try {
    $phone = validatePhoneNumber('5511999999999');
    $latitude = validateLatitude(-23.5505);
    $longitude = validateLongitude(-46.6333);
    $name = sanitizeString('São Paulo, SP');
    $address = sanitizeString('Praça da Sé, São Paulo - SP');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-location";

    $payload = [
        'phone' => $phone,
        'latitude' => $latitude,
        'longitude' => $longitude,
    ];
    if ($name !== null) {
        $payload['name'] = $name;
    }
    if ($address !== null) {
        $payload['address'] = $address;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Localização enviada. MessageId: " . $result['messageId'] . "\n";
    } else {
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
require 'json'
require 'uri'
require 'openssl'

instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido'
  end
  cleaned
end

def validate_latitude(latitude)
  lat = latitude.to_f
  if lat < -90 || lat > 90
    raise ArgumentError, 'Latitude inválida. Deve estar entre -90 e 90 graus'
  end
  lat
end

def validate_longitude(longitude)
  lng = longitude.to_f
  if lng < -180 || lng > 180
    raise ArgumentError, 'Longitude inválida. Deve estar entre -180 e 180 graus'
  end
  lng
end

def sanitize_string(value)
  return nil if value.nil? || value.strip.empty?
  value.strip
end

begin
  phone = validate_phone_number('5511999999999')
  latitude = validate_latitude(-23.5505)
  longitude = validate_longitude(-46.6333)
  name = sanitize_string('São Paulo, SP')
  address = sanitize_string('Praça da Sé, São Paulo - SP')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-location")

  payload = {
    phone: phone,
    latitude: latitude,
    longitude: longitude
  }
  payload[:name] = name if name
  payload[:address] = address if address

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Localização enviada. MessageId: #{result['messageId']}"
  else
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

let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido"])
    }
    return cleaned
}

func validateLatitude(_ latitude: Double) throws -> Double {
    if latitude < -90 || latitude > 90 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Latitude inválida. Deve estar entre -90 e 90 graus"])
    }
    return latitude
}

func validateLongitude(_ longitude: Double) throws -> Double {
    if longitude < -180 || longitude > 180 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Longitude inválida. Deve estar entre -180 e 180 graus"])
    }
    return longitude
}

func sanitizeString(_ value: String?) -> String? {
    guard let value = value else { return nil }
    let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
    return trimmed.isEmpty ? nil : trimmed
}

do {
    let phone = try validatePhoneNumber("5511999999999")
    let latitude = try validateLatitude(-23.5505)
    let longitude = try validateLongitude(-46.6333)
    let name = sanitizeString("São Paulo, SP")
    let address = sanitizeString("Praça da Sé, São Paulo - SP")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-location"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    var payload: [String: Any] = [
        "phone": phone,
        "latitude": latitude,
        "longitude": longitude
    ]
    if let name = name {
        payload["name"] = name
    }
    if let address = address {
        payload["address"] = address
    }
    request.httpBody = try JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro na requisição: \(error.localizedDescription)")
            return
        }

        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                if let data = data,
                   let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let messageId = result["messageId"] as? String {
                    print("Localização enviada. MessageId: \(messageId)")
                }
            } else {
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

    RunLoop.main.run(until: Date(timeIntervalSinceNow: 35))

} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido"
    }
    return $cleaned
}

function Validate-Latitude {
    param([double]$Latitude)
    if ($Latitude -lt -90 -or $Latitude -gt 90) {
        throw "Latitude inválida. Deve estar entre -90 e 90 graus"
    }
    return $Latitude
}

function Validate-Longitude {
    param([double]$Longitude)
    if ($Longitude -lt -180 -or $Longitude -gt 180) {
        throw "Longitude inválida. Deve estar entre -180 e 180 graus"
    }
    return $Longitude
}

function Sanitize-String {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }
    return $Value.Trim()
}

try {
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $latitude = Validate-Latitude -Latitude -23.5505
    $longitude = Validate-Longitude -Longitude -46.6333
    $name = Sanitize-String -Value "São Paulo, SP"
    $address = Sanitize-String -Value "Praça da Sé, São Paulo - SP"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-location"

    $body = @{
        phone = $phone
        latitude = $latitude
        longitude = $longitude
    }
    if ($name) {
        $body.name = $name
    }
    if ($address) {
        $body.address = $address
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Localização enviada. MessageId: $($response.messageId)"

} catch {
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
POST /instances/SUA_INSTANCIA/send-location HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "latitude": -23.5505,
 "longitude": -46.6333,
 "name": "São Paulo, SP",
 "address": "Praça da Sé, São Paulo - SP"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `latitude` (-90 a 90), `longitude` (-180 a 180), `name` e `address` (opcionais) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return cleaned;
}

double validateLatitude(double latitude) {
    if (latitude < -90 || latitude > 90) {
        throw std::invalid_argument("Latitude inválida. Deve estar entre -90 e 90 graus");
    }
    return latitude;
}

double validateLongitude(double longitude) {
    if (longitude < -180 || longitude > 180) {
        throw std::invalid_argument("Longitude inválida. Deve estar entre -180 e 180 graus");
    }
    return longitude;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        std::string phone = validatePhoneNumber("5511999999999");
        double latitude = validateLatitude(-23.5505);
        double longitude = validateLongitude(-46.6333);

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-location";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"latitude\":" + std::to_string(latitude) + 
                                  ",\"longitude\":" + std::to_string(longitude) + 
                                  ",\"name\":\"São Paulo, SP\",\"address\":\"Praça da Sé, São Paulo - SP\"}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            std::cout << "Localização enviada. Response: " << responseData << std::endl;
        } else {
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
g++ -o send_location send_location.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    for (int i = 0; phone[i] != '\0'; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    int len = strlen(cleaned);
    if (len < 10 || len > 15) {
        return 0;
    }
    return 1;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro: Número de telefone inválido\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-location", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"latitude\":-23.5505,\"longitude\":-46.6333,\"name\":\"São Paulo, SP\",\"address\":\"Praça da Sé, São Paulo - SP\"}",
             phone);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        printf("Localização enviada. Response: %s\n", responseData);
    } else {
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
gcc -o send_location send_location.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Formato de coordenadas {#formato-de-coordenadas}

As coordenadas devem estar no formato de graus decimais:

| Coordenada | Faixa | Descrição |
|------------|----------------|----------------------------------------------|
| Latitude | -90 a 90 | Negativo para sul, positivo para norte |
| Longitude | -180 a 180 | Negativo para oeste, positivo para leste |

:::tip Exemplos de coordenadas

- **São Paulo, Brasil**: `latitude: -23.5505, longitude: -46.6333`
- **Nova York, EUA**: `latitude: 40.7128, longitude: -74.0060`
- **Londres, Reino Unido**: `latitude: 51.5074, longitude: -0.1278`

:::

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- A localização aparece como um ponto clicável no mapa do WhatsApp
- O usuário pode abrir a localização no aplicativo de mapas do celular
- Os campos `name` e `address` são opcionais mas melhoram a experiência do usuário
- Use coordenadas precisas para melhor exibição no mapa
- O WhatsApp usa o Google Maps para exibir localizações

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar contato](/docs/messages/contato) - Compartilhe informações de contato
- [Enviar link](/docs/messages/link) - Envie links com preview
- [Enviar produto](/docs/messages/produto) - Envie informações de produtos
