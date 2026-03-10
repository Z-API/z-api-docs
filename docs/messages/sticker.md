---
id: sticker
title: Enviar sticker
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Smile" size="lg" /> Enviar sticker

Envie um sticker do WhatsApp para um destinatário usando a API do Z-API. Stickers são imagens animadas ou estáticas usadas para expressar emoções e reações.

![Exemplo de mensagem com sticker](/img/send-message-sticker.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/send-sticker
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

**Exemplo mínimo (apenas campos obrigatórios):**

```json
{
  "phone": "5511999999999",
  "sticker": "https://exemplo.com/sticker.webp"
}
```

**Exemplo completo (com todos os parâmetros opcionais):**

```json
{
  "phone": "5511999999999",
  "sticker": "https://exemplo.com/sticker.webp",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3,
  "stickerAuthor": "Z-API"
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. |
| `sticker` | string | Sim | URL do sticker ou string base64. Formatos suportados: WEBP, PNG. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|----------|--------|-------------|--------------------------------------------------|
| `messageId` | string | Não | Permite responder uma mensagem existente no chat, criando uma conversa encadeada. Use o `messageId` da mensagem que você quer responder. Veja mais sobre [como responder mensagens](./responder). |
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplos stickers em sequência para evitar bloqueios. |
| `stickerAuthor` | string | Não | Nome do autor do sticker. Aparece como metadado quando o sticker é visualizado. Útil para dar crédito ao criador do sticker ou identificar a origem. |

## <Icon name="FileText" size="md" /> Formatos suportados {#formatos-suportados}

Você pode enviar stickers usando:

- **URL**: `https://exemplo.com/sticker.webp` - URL pública acessível que retorna o sticker diretamente
- **Base64**: `data:image/webp;base64,UklGRiQAAABXRUJQVlA4...` - Sticker codificado em base64

**Importante:** Se usar Base64, você precisa adicionar o prefixo `data:image/png;base64,` ou `data:image/webp;base64,` antes do código Base64.

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o sticker. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).
2. **`sticker`**: O campo onde você colará a **URL pública** do seu sticker ou o código Base64. **Recomendação:** Use URL sempre que possível, pois é mais simples e confiável.

### Campos Opcionais

3. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

4. **`delayMessage`**: Se você vai enviar vários stickers seguidos, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

5. **`stickerAuthor`**: Nome do autor ou origem do sticker. Aparece como metadado quando o sticker é visualizado. Útil para dar crédito ao criador ou identificar a origem.

**Dica:** Na maioria dos casos, você só precisa preencher `phone` e `sticker`. Os outros campos são opcionais e podem ser deixados em branco.

**Formatos de Sticker:**

- **WEBP**: Formato recomendado pelo WhatsApp (melhor compressão)
- **PNG**: Formato alternativo suportado
- **Tamanho máximo**: 100KB (recomendado pelo WhatsApp)

**Onde encontrar stickers:**

- Use stickers do seu próprio catálogo ou pacotes personalizados
- Certifique-se de que a URL do sticker seja pública e acessível
- Teste a URL no navegador antes de usar na automação

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
| 400 | Parâmetros inválidos | Verifique `phone` e `sticker` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 413 | Arquivo muito grande | Reduza o tamanho do sticker (máximo 100KB) |
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

// Validar URL do sticker
function validateStickerUrl(sticker) {
  if (!sticker || typeof sticker !== 'string' || sticker.trim() === '') {
    throw new Error('sticker é obrigatório e deve ser uma URL ou base64 válida');
  }
  
  // Validar se é URL ou base64
  const urlRegex = /^https?:\/\/.+/i;
  const base64Regex = /^data:image\/(webp|png);base64,.+/i;
  
  if (!urlRegex.test(sticker) && !base64Regex.test(sticker)) {
    throw new Error('sticker deve ser uma URL válida (https://) ou base64 (data:image/webp;base64,...)');
  }
  
  return sticker.trim();
}

// Enviar sticker
async function sendSticker(phone, sticker) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedSticker = validateStickerUrl(sticker);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-sticker`;
    
    const payload = {
      phone: validatedPhone,
      sticker: validatedSticker,
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
    console.log('Sticker enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar sticker:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendSticker('5511999999999', 'https://exemplo.com/sticker.webp');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface SendStickerResponse {
  messageId: string;
  status: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar URL do sticker
function validateStickerUrl(sticker: string): string {
  if (!sticker || sticker.trim() === '') {
    throw new Error('sticker é obrigatório');
  }
  
  const urlRegex = /^https?:\/\/.+/i;
  const base64Regex = /^data:image\/(webp|png);base64,.+/i;
  
  if (!urlRegex.test(sticker) && !base64Regex.test(sticker)) {
    throw new Error('sticker deve ser uma URL válida ou base64');
  }
  
  return sticker.trim();
}

// Função para enviar sticker
async function sendSticker(
  phone: string,
  sticker: string
): Promise<SendStickerResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  const validatedSticker = validateStickerUrl(sticker);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-sticker`;

  const payload = {
    phone: validatedPhone,
    sticker: validatedSticker,
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

  return response.json();
}

// Executar
sendSticker('5511999999999', 'https://exemplo.com/sticker.webp')
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

def validate_sticker_url(sticker: str) -> str:
    """Valida URL do sticker (URL ou base64)"""
    if not sticker or not isinstance(sticker, str) or not sticker.strip():
        raise ValueError('sticker é obrigatório e deve ser uma URL ou base64 válida')
    
    sticker = sticker.strip()
    url_regex = r'^https?://.+'
    base64_regex = r'^data:image/(webp|png);base64,.+'
    
    if not re.match(url_regex, sticker, re.IGNORECASE) and not re.match(base64_regex, sticker, re.IGNORECASE):
        raise ValueError('sticker deve ser uma URL válida (https://) ou base64 (data:image/webp;base64,...)')
    
    return sticker

def send_sticker(phone: str, sticker: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    validated_sticker = validate_sticker_url(sticker)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-sticker"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "sticker": validated_sticker
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Sticker enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_sticker('5511999999999', 'https://exemplo.com/sticker.webp')
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

# ⚠️ VALIDAÇÃO: Validar sticker (URL ou base64)
STICKER="${2:-https://exemplo.com/sticker.webp}"
if [ -z "$STICKER" ] || [ "$STICKER" = "" ]; then
    echo "Erro: sticker é obrigatório e deve ser uma URL ou base64 válida"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar sticker via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-sticker" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"sticker\": \"${STICKER}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONE STICKER
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

// Validar sticker URL
function validateStickerUrl(sticker) {
  if (!sticker || typeof sticker !== 'string' || sticker.trim() === '') {
    throw new Error('sticker é obrigatório');
  }
  const urlRegex = /^https?:\/\/.+/i;
  const base64Regex = /^data:image\/(webp|png);base64,.+/i;
  if (!urlRegex.test(sticker) && !base64Regex.test(sticker)) {
    throw new Error('sticker deve ser uma URL válida ou base64');
  }
  return sticker.trim();
}

// Enviar sticker
function sendSticker(phone, sticker) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      const validatedSticker = validateStickerUrl(sticker);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/send-sticker`;
    const payload = JSON.stringify({
      phone: phone,
      sticker: sticker,
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
            console.log('Sticker enviado com sucesso');
            resolve(result);
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
sendSticker('5511999999999', 'https://exemplo.com/sticker.webp')
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

// Validar sticker URL
function validateStickerUrl(sticker) {
  if (!sticker || typeof sticker !== 'string' || sticker.trim() === '') {
    throw new Error('sticker é obrigatório');
  }
  const urlRegex = /^https?:\/\/.+/i;
  const base64Regex = /^data:image\/(webp|png);base64,.+/i;
  if (!urlRegex.test(sticker) && !base64Regex.test(sticker)) {
    throw new Error('sticker deve ser uma URL válida ou base64');
  }
  return sticker.trim();
}

// Rota para enviar sticker
app.post('/api/send-sticker', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, sticker } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedSticker = validateStickerUrl(sticker);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-sticker`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      sticker: validatedSticker,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar sticker:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar sticker',
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

// Validar sticker URL
function validateStickerUrl(sticker) {
  if (!sticker || typeof sticker !== 'string' || sticker.trim() === '') {
    throw new Error('sticker é obrigatório');
  }
  const urlRegex = /^https?:\/\/.+/i;
  const base64Regex = /^data:image\/(webp|png);base64,.+/i;
  if (!urlRegex.test(sticker) && !base64Regex.test(sticker)) {
    throw new Error('sticker deve ser uma URL válida ou base64');
  }
  return sticker.trim();
}

// Middleware para enviar sticker
app.use(async (ctx) => {
  if (ctx.path === '/api/send-sticker' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, sticker } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedSticker = validateStickerUrl(sticker);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-sticker`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        sticker: validatedSticker,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao enviar sticker:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar sticker',
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

public class SendSticker {
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

    // Validar sticker URL
    private static String validateStickerUrl(String sticker) {
        if (sticker == null || sticker.trim().isEmpty()) {
            throw new IllegalArgumentException("sticker é obrigatório");
        }
        boolean isUrl = sticker.matches("^https?://.+");
        boolean isBase64 = sticker.matches("^data:image/(webp|png);base64,.+");
        if (!isUrl && !isBase64) {
            throw new IllegalArgumentException("sticker deve ser uma URL válida ou base64");
        }
        return sticker.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String sticker = validateStickerUrl("https://exemplo.com/sticker.webp");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/send-sticker",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("sticker", sticker);
            
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
                
                System.out.println("Sticker enviado com sucesso");
                System.out.println(response.toString());
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

    // Validar sticker URL
    private static string ValidateStickerUrl(string sticker)
    {
        if (string.IsNullOrWhiteSpace(sticker))
        {
            throw new ArgumentException("sticker é obrigatório");
        }
        bool isUrl = Regex.IsMatch(sticker, @"^https?://.+", RegexOptions.IgnoreCase);
        bool isBase64 = Regex.IsMatch(sticker, @"^data:image/(webp|png);base64,.+", RegexOptions.IgnoreCase);
        if (!isUrl && !isBase64)
        {
            throw new ArgumentException("sticker deve ser uma URL válida ou base64");
        }
        return sticker.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string sticker = ValidateStickerUrl("https://exemplo.com/sticker.webp");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-sticker";
            
            var payload = new
            {
                phone = phone,
                sticker = sticker
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
                    Console.WriteLine("Sticker enviado com sucesso");
                    Console.WriteLine(result);
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

func validateStickerUrl(sticker string) error {
    if strings.TrimSpace(sticker) == "" {
        return fmt.Errorf("sticker é obrigatório")
    }
    urlMatched, _ := regexp.MatchString(`^https?://.+`, sticker)
    base64Matched, _ := regexp.MatchString(`^data:image/(webp|png);base64,.+`, sticker)
    if !urlMatched && !base64Matched {
        return fmt.Errorf("sticker deve ser uma URL válida ou base64")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    sticker := "https://exemplo.com/sticker.webp"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateStickerUrl(sticker); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-sticker", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
        "sticker": sticker,
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
        
        fmt.Println("Sticker enviado com sucesso")
        fmt.Println(string(body))
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

// Validar sticker URL
function validateStickerUrl($sticker) {
    if (empty($sticker) || !is_string($sticker) || trim($sticker) === '') {
        throw new Exception('sticker é obrigatório');
    }
    $sticker = trim($sticker);
    $isUrl = preg_match('/^https?:\/\/.+/i', $sticker);
    $isBase64 = preg_match('/^data:image\/(webp|png);base64,.+/i', $sticker);
    if (!$isUrl && !$isBase64) {
        throw new Exception('sticker deve ser uma URL válida ou base64');
    }
    return $sticker;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $sticker = validateStickerUrl('https://exemplo.com/sticker.webp');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/send-sticker',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
        'sticker' => $sticker,
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
        echo "Sticker enviado com sucesso\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
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

# Validar sticker URL
def validate_sticker_url(sticker)
  raise 'sticker é obrigatório' if sticker.nil? || sticker.to_s.strip.empty?
  sticker = sticker.to_s.strip
  is_url = sticker.match?(/^https?:\/\/.+/i)
  is_base64 = sticker.match?(/^data:image\/(webp|png);base64,.+/i)
  raise 'sticker deve ser uma URL válida ou base64' unless is_url || is_base64
  sticker
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  sticker = validate_sticker_url('https://exemplo.com/sticker.webp')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/send-sticker")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    sticker: sticker
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Sticker enviado com sucesso'
    puts result.to_json
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

// Validar sticker URL
func validateStickerUrl(_ sticker: String) throws -> String {
    if sticker.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "sticker é obrigatório"])
    }
    let urlRegex = "^https?://.+"
    let base64Regex = "^data:image/(webp|png);base64,.+"
    let urlPredicate = NSPredicate(format: "SELF MATCHES[c] %@", urlRegex)
    let base64Predicate = NSPredicate(format: "SELF MATCHES[c] %@", base64Regex)
    if !urlPredicate.evaluate(with: sticker) && !base64Predicate.evaluate(with: sticker) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "sticker deve ser uma URL válida ou base64"])
    }
    return sticker.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let sticker = try validateStickerUrl("https://exemplo.com/sticker.webp")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/send-sticker"
    
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
        "sticker": sticker
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
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Sticker enviado com sucesso")
                        print(result)
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

# Validar sticker URL
function Validate-StickerUrl {
    param([string]$Sticker)
    if ([string]::IsNullOrWhiteSpace($Sticker)) {
        throw "sticker é obrigatório"
    }
    $isUrl = $Sticker -match '^https?://.+'
    $isBase64 = $Sticker -match '^data:image/(webp|png);base64,.+'
    if (-not $isUrl -and -not $isBase64) {
        throw "sticker deve ser uma URL válida ou base64"
    }
    return $Sticker.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $sticker = Validate-StickerUrl "https://exemplo.com/sticker.webp"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-sticker"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        sticker = $sticker
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Sticker enviado com sucesso"
    $response | ConvertTo-Json -Depth 10
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/send-sticker HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "sticker": "https://exemplo.com/sticker.webp"
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

bool validateStickerUrl(const std::string& sticker) {
    if (sticker.empty()) return false;
    std::regex urlRegex("^https?://.+", std::regex_constants::icase);
    std::regex base64Regex("^data:image/(webp|png);base64,.+", std::regex_constants::icase);
    return std::regex_match(sticker, urlRegex) || std::regex_match(sticker, base64Regex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    std::string phone = "5511999999999";
    std::string sticker = "https://exemplo.com/sticker.webp";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    if (!validateStickerUrl(sticker)) {
        std::cerr << "Erro: sticker deve ser uma URL válida ou base64" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-sticker";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"sticker\":\"" << sticker << "\""
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
                std::cout << "Sticker enviado com sucesso" << std::endl;
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

int validateStickerUrl(const char* sticker) {
    if (!sticker || strlen(sticker) == 0) return 0;
    regex_t urlRegex, base64Regex;
    int urlRet = regcomp(&urlRegex, "^https?://.+", REG_EXTENDED | REG_ICASE);
    int base64Ret = regcomp(&base64Regex, "^data:image/(webp|png);base64,.+", REG_EXTENDED | REG_ICASE);
    if (urlRet || base64Ret) return 0;
    int urlMatch = regexec(&urlRegex, sticker, 0, NULL, 0);
    int base64Match = regexec(&base64Regex, sticker, 0, NULL, 0);
    regfree(&urlRegex);
    regfree(&base64Regex);
    return urlMatch == 0 || base64Match == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    char* phone = "5511999999999";
    char* sticker = "https://exemplo.com/sticker.webp";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    if (!validateStickerUrl(sticker)) {
        fprintf(stderr, "Erro: sticker deve ser uma URL válida ou base64\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-sticker", instanceId);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"sticker\":\"%s\"}",
        phone, sticker);
    
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
                printf("Sticker enviado com sucesso\n");
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

## <Icon name="AlertTriangle" size="md" /> Limitações e boas práticas {#limitacoes-e-boas-praticas}

- **Tamanho máximo**: 100KB por sticker
- **Formatos suportados**: WEBP (recomendado), PNG
- **Dimensões**: Recomendado 512x512 pixels para stickers estáticos ou animados
- **URLs**: Devem ser acessíveis publicamente e retornar o sticker diretamente. Evite URLs que exigem autenticação ou redirecionamentos complexos

:::tip Dica

Use formato WEBP para melhor compressão e qualidade. Stickers animados devem estar no formato WEBP animado.

:::

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- Stickers são diferentes de imagens normais e aparecem em tamanho maior no WhatsApp
- Para melhor performance, use URLs ao invés de base64 quando possível
- Stickers muito grandes podem demorar mais para serem processados
- Certifique-se de que as URLs de sticker são acessíveis publicamente para que o WhatsApp possa baixá-las

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar GIF](/docs/messages/gif) - Envie animações GIF
- [Enviar imagem](/docs/messages/imagem) - Envie imagens com legendas
- [Enviar vídeo](/docs/messages/video) - Envie vídeos com legendas
