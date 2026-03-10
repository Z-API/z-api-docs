---
id: botao-otp
title: Botão OTP
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Key" size="lg" /> Botão OTP

Envie mensagens com botão para copiar códigos OTP (One-Time Password). Ideal para autenticação, códigos de verificação e valores que precisam ser copiados rapidamente.

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Códigos de Verificação**: Enviar códigos de autenticação de dois fatores (2FA)
- **Tokens de Acesso**: Compartilhar tokens temporários de forma segura
- **Códigos de Desconto**: Enviar cupons e códigos promocionais
- **Senhas Temporárias**: Compartilhar senhas de acesso temporárias

---

:::caution Atenção

Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).

:::

![Exemplo de botão OTP](/img/SendButtonOtp.jpeg)

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: O número do destinatário para onde você deseja enviar o botão OTP. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

- **`message`**: O texto da mensagem que será exibido junto com o botão. Este é o texto explicativo que aparece antes do botão.

- **`code`**: O valor que será copiado quando o botão for clicado. Este é o código OTP, token ou valor que você deseja que o usuário copie facilmente.

### Campos Opcionais

- **`image`**: (Opcional) URL ou Base64 da imagem que irá acompanhar o botão. Você pode incluir uma imagem para tornar a mensagem mais visual e atrativa.

- **`buttonText`**: (Opcional) Texto do botão. O valor padrão é "Copiar código" se não informado. Você pode personalizar este texto para algo mais específico, como "Copiar código de verificação" ou "Copiar token".

### Exemplo Prático para No-Code

**Exemplo básico:**

```json
{
  "phone": "5511999999999",
  "message": "Seu código de verificação é:",
  "code": "123456"
}
```

**Exemplo com imagem e texto personalizado:**

```json
{
  "phone": "5511999999999",
  "message": "Use este código para confirmar sua conta:",
  "code": "ABC123",
  "image": "https://exemplo.com/imagem-verificacao.jpg",
  "buttonText": "Copiar código de verificação"
}
```

**Dicas importantes:**

- **Código OTP**: O código pode ser alfanumérico e geralmente tem entre 4 e 10 caracteres. Use códigos que sejam fáceis de digitar mas seguros.
- **Texto do botão**: Personalize o texto do botão para deixar claro o que será copiado. Isso melhora a experiência do usuário.
- **Imagem**: Use imagens relevantes que reforcem a mensagem. Por exemplo, uma imagem de segurança para códigos de verificação.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). Use o `messageId` para rastrear o status da mensagem através dos webhooks.

**Casos de uso comuns:**

- **Autenticação 2FA**: Enviar códigos de verificação de dois fatores
- **Tokens de acesso**: Compartilhar tokens temporários de forma segura
- **Códigos de desconto**: Enviar cupons e códigos promocionais
- **Senhas temporárias**: Compartilhar senhas de acesso temporárias
- **Códigos de confirmação**: Enviar códigos para confirmar ações (cadastros, compras, etc.)

**Importante sobre botões:**

:::caution Atenção

Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).

:::

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-button-otp
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do destinatário no formato DDI DDD NÚMERO (ex: `5511999999999`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara. Para grupos, use o ID do grupo. |
| `message` | string | Texto da mensagem que será exibido |
| `code` | string | Valor que será copiado quando o botão for clicado |

#### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `image` | string | URL ou Base64 da imagem que irá acompanhar o botão |
| `buttonText` | string | Texto do botão. O valor padrão é "Copiar código" se não informado |

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

O botão OTP permite criar mensagens com um botão interativo que, quando clicado, copia automaticamente um valor para a área de transferência do dispositivo do usuário. Isso é especialmente útil para códigos de verificação, tokens e valores que precisam ser copiados rapidamente.

**Características:**

- O botão copia o valor automaticamente quando clicado
- Você pode personalizar o texto do botão
- Pode incluir uma imagem junto com a mensagem
- Funciona em conversas individuais e grupos

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

### Exemplo Básico

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar código OTP (alfanumérico, 4-10 caracteres)
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Enviar botão OTP
async function sendButtonOTP(phone, message, code) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedCode = validateOTPCode(code);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        message: message.trim(),
        code: validatedCode,
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Botão OTP enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar botão OTP:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendButtonOTP('5511999999999', 'Seu código de verificação é:', '123456');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface ButtonOTPResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code: string): string {
  if (!code || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Função para enviar botão OTP
async function sendButtonOTP(
  phone: string,
  message: string,
  code: string
): Promise<ButtonOTPResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedCode = validateOTPCode(code);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      code: validatedCode,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendButtonOTP('5511999999999', 'Seu código de verificação é:', '123456')
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
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_otp_code(code: str) -> str:
    """Valida código OTP (4-10 caracteres)"""
    if not code or not isinstance(code, str) or len(code.strip()) < 4 or len(code.strip()) > 10:
        raise ValueError('Código OTP inválido. Deve ter entre 4 e 10 caracteres')
    return code.strip()

def send_button_otp(phone: str, message: str, code: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_code = validate_otp_code(code)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-otp"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "code": validated_code
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Botão OTP enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_button_otp('5511999999999', 'Seu código de verificação é:', '123456')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar código OTP (4-10 caracteres)
CODE="${2:-123456}"
if [[ ${#CODE} -lt 4 ]] || [[ ${#CODE} -gt 10 ]]; then
    echo "Erro: Código OTP inválido. Deve ter entre 4 e 10 caracteres"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar botão OTP via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-otp" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Seu código de verificação é:\",
    \"code\": \"${CODE}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE CODE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Enviar botão OTP
function sendButtonOTP(phone, message, code) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      const validatedCode = validateOTPCode(code);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      code: code.trim(),
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
            console.log('Botão OTP enviado com sucesso');
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
sendButtonOTP('5511999999999', 'Seu código de verificação é:', '123456')
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Rota para enviar botão OTP
app.post('/api/send-button-otp', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, code } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    const validatedCode = validateOTPCode(code);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      code: validatedCode,
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
    console.error('Erro ao enviar botão OTP:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar botão OTP',
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Middleware para enviar botão OTP
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-otp' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, code } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      const validatedCode = validateOTPCode(code);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        code: validatedCode,
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
      console.error('Erro ao enviar botão OTP:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar botão OTP',
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

public class SendButtonOTP {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar código OTP
    private static String validateOTPCode(String code) {
        if (code == null || code.trim().length() < 4 || code.trim().length() > 10) {
            throw new IllegalArgumentException("Código OTP inválido. Deve ter entre 4 e 10 caracteres");
        }
        return code.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String message = "Seu código de verificação é:";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }
            String code = validateOTPCode("123456");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-otp",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("code", code);
            
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
                
                System.out.println("Botão OTP enviado com sucesso");
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
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
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

    // Validar código OTP
    private static string ValidateOTPCode(string code)
    {
        if (string.IsNullOrWhiteSpace(code) || code.Trim().Length < 4 || code.Trim().Length > 10)
        {
            throw new ArgumentException("Código OTP inválido. Deve ter entre 4 e 10 caracteres");
        }
        return code.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string message = "Seu código de verificação é:";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }
            string code = ValidateOTPCode("123456");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-otp";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                code = code
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
                    Console.WriteLine("Botão OTP enviado com sucesso");
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func validateOTPCode(code string) error {
    trimmed := strings.TrimSpace(code)
    if len(trimmed) < 4 || len(trimmed) > 10 {
        return fmt.Errorf("código OTP inválido. Deve ter entre 4 e 10 caracteres")
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
    
    message := "Seu código de verificação é:"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }
    
    code := "123456"
    if err := validateOTPCode(code); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-otp", instanceId, instanceToken)
    
    payload := map[string]string{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "code": strings.TrimSpace(code),
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
        
        fmt.Println("Botão OTP enviado com sucesso")
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar código OTP
function validateOTPCode($code) {
    $trimmed = trim($code);
    if (empty($trimmed) || strlen($trimmed) < 4 || strlen($trimmed) > 10) {
        throw new Exception('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
    }
    return $trimmed;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $message = 'Seu código de verificação é:';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }
    $code = validateOTPCode('123456');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-otp',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'code' => $code,
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
        echo "Botão OTP enviado com sucesso\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar código OTP
def validate_otp_code(code)
  trimmed = code.to_s.strip
  raise 'Código OTP inválido. Deve ter entre 4 e 10 caracteres' if trimmed.length < 4 || trimmed.length > 10
  trimmed
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message = 'Seu código de verificação é:'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?
  code = validate_otp_code('123456')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-otp")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    code: code
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Botão OTP enviado com sucesso'
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
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

// Validar código OTP
func validateOTPCode(_ code: String) throws -> String {
    let trimmed = code.trimmingCharacters(in: .whitespaces)
    if trimmed.count < 4 || trimmed.count > 10 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Código OTP inválido. Deve ter entre 4 e 10 caracteres"])
    }
    return trimmed
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let message = "Seu código de verificação é:"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }
    let code = try validateOTPCode("123456")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-otp"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: String] = [
        "phone": phone,
        "message": message.trimmingCharacters(in: .whitespaces),
        "code": code
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
                        print("Botão OTP enviado com sucesso")
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar código OTP
function Validate-OTPCode {
    param([string]$Code)
    $trimmed = $Code.Trim()
    if ($trimmed.Length -lt 4 -or $trimmed.Length -gt 10) {
        throw "Código OTP inválido. Deve ter entre 4 e 10 caracteres"
    }
    return $trimmed
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $message = "Seu código de verificação é:"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }
    $code = Validate-OTPCode "123456"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-otp"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        code = $code
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Botão OTP enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-otp HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Seu código de verificação é:",
  "code": "123456"
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
#include <sstream>

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

bool validateOTPCode(const std::string& code) {
    std::string trimmed = code;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    return trimmed.length() >= 4 && trimmed.length() <= 10;
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "5511999999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    std::string message = "Seu código de verificação é:";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    std::string code = "123456";
    if (!validateOTPCode(code)) {
        std::cerr << "Erro: Código OTP inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-otp";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"code\":\"" << code << "\""
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
                std::cout << "Botão OTP enviado com sucesso" << std::endl;
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

int validateOTPCode(const char* code) {
    size_t len = strlen(code);
    // Remover espaços em branco
    while (len > 0 && (code[len-1] == ' ' || code[len-1] == '\t' || code[len-1] == '\n' || code[len-1] == '\r')) {
        len--;
    }
    return len >= 4 && len <= 10;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "5511999999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    char* message = "Seu código de verificação é:";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    char* code = "123456";
    if (!validateOTPCode(code)) {
        fprintf(stderr, "Erro: Código OTP inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-otp", instanceId, instanceToken);
    
    char payload[256];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"code\":\"%s\"}",
        phone, message, code);
    
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
                printf("Botão OTP enviado com sucesso\n");
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

### Exemplo com Imagem e Texto Personalizado

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar código OTP (alfanumérico, 4-10 caracteres)
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Validar URL da imagem
function validateImageUrl(url) {
  if (!url || (typeof url !== 'string')) {
    throw new Error('URL da imagem é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:image/');
  if (!isUrl && !isBase64) {
    throw new Error('URL da imagem inválida. Use URL pública ou Base64');
  }
  return url;
}

// Enviar botão OTP com imagem e texto personalizado
async function sendButtonOTPWithImage(phone, message, code, imageUrl, buttonText) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedCode = validateOTPCode(code);
    const validatedImageUrl = validateImageUrl(imageUrl);
    if (!buttonText || buttonText.trim() === '') {
      throw new Error('O texto do botão não pode estar vazio');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        message: message.trim(),
        code: validatedCode,
        image: validatedImageUrl,
        buttonText: buttonText.trim(),
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Botão OTP com imagem enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar botão OTP com imagem:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendButtonOTPWithImage(
  '5511999999999',
  'Use este código para acessar sua conta:',
  'ABC123XYZ',
  'https://exemplo.com/imagem.png',
  'Clique para copiar o código'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface ButtonOTPResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code: string): string {
  if (!code || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Validar URL da imagem
function validateImageUrl(url: string): string {
  if (!url || url.trim() === '') {
    throw new Error('URL da imagem é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:image/');
  if (!isUrl && !isBase64) {
    throw new Error('URL da imagem inválida');
  }
  return url;
}

// Função para enviar botão OTP com imagem
async function sendButtonOTPWithImage(
  phone: string,
  message: string,
  code: string,
  imageUrl: string,
  buttonText: string
): Promise<ButtonOTPResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedCode = validateOTPCode(code);
  const validatedImageUrl = validateImageUrl(imageUrl);
  if (!buttonText || buttonText.trim() === '') {
    throw new Error('O texto do botão não pode estar vazio');
  }

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      code: validatedCode,
      image: validatedImageUrl,
      buttonText: buttonText.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendButtonOTPWithImage(
  '5511999999999',
  'Use este código para acessar sua conta:',
  'ABC123XYZ',
  'https://exemplo.com/imagem.png',
  'Clique para copiar o código'
)
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
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_otp_code(code: str) -> str:
    """Valida código OTP (4-10 caracteres)"""
    if not code or not isinstance(code, str) or len(code.strip()) < 4 or len(code.strip()) > 10:
        raise ValueError('Código OTP inválido. Deve ter entre 4 e 10 caracteres')
    return code.strip()

def validate_image_url(url: str) -> str:
    """Valida URL da imagem"""
    if not url or not isinstance(url, str):
        raise ValueError('URL da imagem é obrigatória')
    is_url = url.startswith('http://') or url.startswith('https://')
    is_base64 = url.startswith('data:image/')
    if not is_url and not is_base64:
        raise ValueError('URL da imagem inválida. Use URL pública ou Base64')
    return url

def send_button_otp_with_image(phone: str, message: str, code: str, image_url: str, button_text: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_code = validate_otp_code(code)
    validated_image_url = validate_image_url(image_url)
    if not button_text or not button_text.strip():
        raise ValueError('O texto do botão não pode estar vazio')
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-otp"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "code": validated_code,
        "image": validated_image_url,
        "buttonText": button_text.strip()
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Botão OTP com imagem enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_button_otp_with_image(
    '5511999999999',
    'Use este código para acessar sua conta:',
    'ABC123XYZ',
    'https://exemplo.com/imagem.png',
    'Clique para copiar o código'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar código OTP (4-10 caracteres)
CODE="${2:-ABC123XYZ}"
if [[ ${#CODE} -lt 4 ]] || [[ ${#CODE} -gt 10 ]]; then
    echo "Erro: Código OTP inválido. Deve ter entre 4 e 10 caracteres"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar botão OTP com imagem via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-otp" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Use este código para acessar sua conta:\",
    \"code\": \"${CODE}\",
    \"image\": \"https://exemplo.com/imagem.png\",
    \"buttonText\": \"Clique para copiar o código\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE CODE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Validar URL da imagem
function validateImageUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL da imagem é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:image/');
  if (!isUrl && !isBase64) {
    throw new Error('URL da imagem inválida');
  }
  return url;
}

// Enviar botão OTP com imagem
function sendButtonOTPWithImage(phone, message, code, imageUrl, buttonText) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      const validatedCode = validateOTPCode(code);
      const validatedImageUrl = validateImageUrl(imageUrl);
      if (!buttonText || buttonText.trim() === '') {
        throw new Error('O texto do botão não pode estar vazio');
      }
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      code: code.trim(),
      image: imageUrl,
      buttonText: buttonText.trim(),
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
            console.log('Botão OTP com imagem enviado com sucesso');
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
sendButtonOTPWithImage(
  '5511999999999',
  'Use este código para acessar sua conta:',
  'ABC123XYZ',
  'https://exemplo.com/imagem.png',
  'Clique para copiar o código'
)
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Validar URL da imagem
function validateImageUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL da imagem é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:image/');
  if (!isUrl && !isBase64) {
    throw new Error('URL da imagem inválida');
  }
  return url;
}

// Rota para enviar botão OTP com imagem
app.post('/api/send-button-otp-image', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, code, image, buttonText } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    const validatedCode = validateOTPCode(code);
    const validatedImageUrl = validateImageUrl(image);
    if (!buttonText || buttonText.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'O texto do botão não pode estar vazio',
      });
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      code: validatedCode,
      image: validatedImageUrl,
      buttonText: buttonText.trim(),
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
    console.error('Erro ao enviar botão OTP com imagem:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar botão OTP com imagem',
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar código OTP
function validateOTPCode(code) {
  if (!code || typeof code !== 'string' || code.trim().length < 4 || code.trim().length > 10) {
    throw new Error('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
  }
  return code.trim();
}

// Validar URL da imagem
function validateImageUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL da imagem é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:image/');
  if (!isUrl && !isBase64) {
    throw new Error('URL da imagem inválida');
  }
  return url;
}

// Middleware para enviar botão OTP com imagem
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-otp-image' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, code, image, buttonText } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      const validatedCode = validateOTPCode(code);
      const validatedImageUrl = validateImageUrl(image);
      if (!buttonText || buttonText.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O texto do botão não pode estar vazio',
        };
        return;
      }

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-otp`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        code: validatedCode,
        image: validatedImageUrl,
        buttonText: buttonText.trim(),
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
      console.error('Erro ao enviar botão OTP com imagem:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar botão OTP com imagem',
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

public class SendButtonOTPWithImage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar código OTP
    private static String validateOTPCode(String code) {
        if (code == null || code.trim().length() < 4 || code.trim().length() > 10) {
            throw new IllegalArgumentException("Código OTP inválido. Deve ter entre 4 e 10 caracteres");
        }
        return code.trim();
    }

    // Validar URL da imagem
    private static String validateImageUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            throw new IllegalArgumentException("URL da imagem é obrigatória");
        }
        if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("data:image/")) {
            throw new IllegalArgumentException("URL da imagem inválida");
        }
        return url;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String message = "Use este código para acessar sua conta:";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }
            String code = validateOTPCode("ABC123XYZ");
            String imageUrl = validateImageUrl("https://exemplo.com/imagem.png");
            String buttonText = "Clique para copiar o código";
            if (buttonText == null || buttonText.trim().isEmpty()) {
                throw new IllegalArgumentException("O texto do botão não pode estar vazio");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-otp",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("code", code);
            payload.put("image", imageUrl);
            payload.put("buttonText", buttonText.trim());
            
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
                
                System.out.println("Botão OTP com imagem enviado com sucesso");
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
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
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

    // Validar código OTP
    private static string ValidateOTPCode(string code)
    {
        if (string.IsNullOrWhiteSpace(code) || code.Trim().Length < 4 || code.Trim().Length > 10)
        {
            throw new ArgumentException("Código OTP inválido. Deve ter entre 4 e 10 caracteres");
        }
        return code.Trim();
    }

    // Validar URL da imagem
    private static string ValidateImageUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException("URL da imagem é obrigatória");
        }
        if (!url.StartsWith("http://") && !url.StartsWith("https://") && !url.StartsWith("data:image/"))
        {
            throw new ArgumentException("URL da imagem inválida");
        }
        return url;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string message = "Use este código para acessar sua conta:";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }
            string code = ValidateOTPCode("ABC123XYZ");
            string imageUrl = ValidateImageUrl("https://exemplo.com/imagem.png");
            string buttonText = "Clique para copiar o código";
            if (string.IsNullOrWhiteSpace(buttonText))
            {
                throw new ArgumentException("O texto do botão não pode estar vazio");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-otp";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                code = code,
                image = imageUrl,
                buttonText = buttonText.Trim()
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
                    Console.WriteLine("Botão OTP com imagem enviado com sucesso");
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func validateOTPCode(code string) error {
    trimmed := strings.TrimSpace(code)
    if len(trimmed) < 4 || len(trimmed) > 10 {
        return fmt.Errorf("código OTP inválido. Deve ter entre 4 e 10 caracteres")
    }
    return nil
}

func validateImageUrl(url string) error {
    if url == "" {
        return fmt.Errorf("URL da imagem é obrigatória")
    }
    isUrl := strings.HasPrefix(url, "http://") || strings.HasPrefix(url, "https://")
    isBase64 := strings.HasPrefix(url, "data:image/")
    if !isUrl && !isBase64 {
        return fmt.Errorf("URL da imagem inválida")
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
    
    message := "Use este código para acessar sua conta:"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }
    
    code := "ABC123XYZ"
    if err := validateOTPCode(code); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    imageUrl := "https://exemplo.com/imagem.png"
    if err := validateImageUrl(imageUrl); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    buttonText := "Clique para copiar o código"
    if strings.TrimSpace(buttonText) == "" {
        fmt.Println("Erro: O texto do botão não pode estar vazio")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-otp", instanceId, instanceToken)
    
    payload := map[string]string{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "code": strings.TrimSpace(code),
        "image": imageUrl,
        "buttonText": strings.TrimSpace(buttonText),
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
        
        fmt.Println("Botão OTP com imagem enviado com sucesso")
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar código OTP
function validateOTPCode($code) {
    $trimmed = trim($code);
    if (empty($trimmed) || strlen($trimmed) < 4 || strlen($trimmed) > 10) {
        throw new Exception('Código OTP inválido. Deve ter entre 4 e 10 caracteres');
    }
    return $trimmed;
}

// Validar URL da imagem
function validateImageUrl($url) {
    if (empty($url)) {
        throw new Exception('URL da imagem é obrigatória');
    }
    $isUrl = strpos($url, 'http://') === 0 || strpos($url, 'https://') === 0;
    $isBase64 = strpos($url, 'data:image/') === 0;
    if (!$isUrl && !$isBase64) {
        throw new Exception('URL da imagem inválida');
    }
    return $url;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $message = 'Use este código para acessar sua conta:';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }
    $code = validateOTPCode('ABC123XYZ');
    $imageUrl = validateImageUrl('https://exemplo.com/imagem.png');
    $buttonText = 'Clique para copiar o código';
    if (empty(trim($buttonText))) {
        throw new Exception('O texto do botão não pode estar vazio');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-otp',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'code' => $code,
        'image' => $imageUrl,
        'buttonText' => trim($buttonText),
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
        echo "Botão OTP com imagem enviado com sucesso\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar código OTP
def validate_otp_code(code)
  trimmed = code.to_s.strip
  raise 'Código OTP inválido. Deve ter entre 4 e 10 caracteres' if trimmed.length < 4 || trimmed.length > 10
  trimmed
end

# Validar URL da imagem
def validate_image_url(url)
  raise 'URL da imagem é obrigatória' if url.nil? || url.strip.empty?
  is_url = url.start_with?('http://') || url.start_with?('https://')
  is_base64 = url.start_with?('data:image/')
  raise 'URL da imagem inválida' unless is_url || is_base64
  url
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message = 'Use este código para acessar sua conta:'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?
  code = validate_otp_code('ABC123XYZ')
  image_url = validate_image_url('https://exemplo.com/imagem.png')
  button_text = 'Clique para copiar o código'
  raise 'O texto do botão não pode estar vazio' if button_text.nil? || button_text.strip.empty?

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-otp")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    code: code,
    image: image_url,
    buttonText: button_text.strip
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Botão OTP com imagem enviado com sucesso'
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
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

// Validar código OTP
func validateOTPCode(_ code: String) throws -> String {
    let trimmed = code.trimmingCharacters(in: .whitespaces)
    if trimmed.count < 4 || trimmed.count > 10 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Código OTP inválido. Deve ter entre 4 e 10 caracteres"])
    }
    return trimmed
}

// Validar URL da imagem
func validateImageUrl(_ url: String) throws -> String {
    if url.isEmpty {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "URL da imagem é obrigatória"])
    }
    let isUrl = url.hasPrefix("http://") || url.hasPrefix("https://")
    let isBase64 = url.hasPrefix("data:image/")
    if !isUrl && !isBase64 {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "URL da imagem inválida"])
    }
    return url
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let message = "Use este código para acessar sua conta:"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }
    let code = try validateOTPCode("ABC123XYZ")
    let imageUrl = try validateImageUrl("https://exemplo.com/imagem.png")
    let buttonText = "Clique para copiar o código"
    if buttonText.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 6, userInfo: [NSLocalizedDescriptionKey: "O texto do botão não pode estar vazio"])
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-otp"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: String] = [
        "phone": phone,
        "message": message.trimmingCharacters(in: .whitespaces),
        "code": code,
        "image": imageUrl,
        "buttonText": buttonText.trimmingCharacters(in: .whitespaces)
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
                        print("Botão OTP com imagem enviado com sucesso")
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar código OTP
function Validate-OTPCode {
    param([string]$Code)
    $trimmed = $Code.Trim()
    if ($trimmed.Length -lt 4 -or $trimmed.Length -gt 10) {
        throw "Código OTP inválido. Deve ter entre 4 e 10 caracteres"
    }
    return $trimmed
}

# Validar URL da imagem
function Validate-ImageUrl {
    param([string]$Url)
    if ([string]::IsNullOrWhiteSpace($Url)) {
        throw "URL da imagem é obrigatória"
    }
    $isUrl = $Url.StartsWith("http://") -or $Url.StartsWith("https://")
    $isBase64 = $Url.StartsWith("data:image/")
    if (-not $isUrl -and -not $isBase64) {
        throw "URL da imagem inválida"
    }
    return $Url
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $message = "Use este código para acessar sua conta:"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }
    $code = Validate-OTPCode "ABC123XYZ"
    $imageUrl = Validate-ImageUrl "https://exemplo.com/imagem.png"
    $buttonText = "Clique para copiar o código"
    if ([string]::IsNullOrWhiteSpace($buttonText)) {
        throw "O texto do botão não pode estar vazio"
    }

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-otp"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        code = $code
        image = $imageUrl
        buttonText = $buttonText.Trim()
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Botão OTP com imagem enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-otp HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Use este código para acessar sua conta:",
  "code": "ABC123XYZ",
  "image": "https://exemplo.com/imagem.png",
  "buttonText": "Clique para copiar o código"
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
#include <sstream>

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

bool validateOTPCode(const std::string& code) {
    std::string trimmed = code;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    return trimmed.length() >= 4 && trimmed.length() <= 10;
}

bool validateImageUrl(const std::string& url) {
    if (url.empty()) return false;
    return url.find("http://") == 0 || url.find("https://") == 0 || url.find("data:image/") == 0;
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "5511999999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    std::string message = "Use este código para acessar sua conta:";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    std::string code = "ABC123XYZ";
    if (!validateOTPCode(code)) {
        std::cerr << "Erro: Código OTP inválido" << std::endl;
        return 1;
    }
    
    std::string imageUrl = "https://exemplo.com/imagem.png";
    if (!validateImageUrl(imageUrl)) {
        std::cerr << "Erro: URL da imagem inválida" << std::endl;
        return 1;
    }
    
    std::string buttonText = "Clique para copiar o código";
    if (buttonText.empty() || buttonText.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: O texto do botão não pode estar vazio" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-otp";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"code\":\"" << code << "\","
                  << "\"image\":\"" << imageUrl << "\","
                  << "\"buttonText\":\"" << buttonText << "\""
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
                std::cout << "Botão OTP com imagem enviado com sucesso" << std::endl;
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

int validateOTPCode(const char* code) {
    size_t len = strlen(code);
    while (len > 0 && (code[len-1] == ' ' || code[len-1] == '\t' || code[len-1] == '\n' || code[len-1] == '\r')) {
        len--;
    }
    return len >= 4 && len <= 10;
}

int validateImageUrl(const char* url) {
    if (!url || strlen(url) == 0) return 0;
    return strncmp(url, "http://", 7) == 0 || strncmp(url, "https://", 8) == 0 || strncmp(url, "data:image/", 11) == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "5511999999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    char* message = "Use este código para acessar sua conta:";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    char* code = "ABC123XYZ";
    if (!validateOTPCode(code)) {
        fprintf(stderr, "Erro: Código OTP inválido\n");
        return 1;
    }
    
    char* imageUrl = "https://exemplo.com/imagem.png";
    if (!validateImageUrl(imageUrl)) {
        fprintf(stderr, "Erro: URL da imagem inválida\n");
        return 1;
    }
    
    char* buttonText = "Clique para copiar o código";
    if (!buttonText || strlen(buttonText) == 0) {
        fprintf(stderr, "Erro: O texto do botão não pode estar vazio\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-otp", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"code\":\"%s\",\"image\":\"%s\",\"buttonText\":\"%s\"}",
        phone, message, code, imageUrl, buttonText);
    
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
                printf("Botão OTP com imagem enviado com sucesso\n");
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

### 200 OK

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `zaapId` | string | ID da mensagem no Z-API |
| `messageId` | string | ID da mensagem no WhatsApp |
| `id` | string | ID para compatibilidade com Zapier (mesmo valor do `messageId`) |

**Exemplo de resposta:**

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-template-de-botão-otp).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone`, `message` e `code` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` no header |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando uma mensagem com botão OTP é recebida, o webhook [Ao receber mensagem](/docs/webhooks/ao-receber) será acionado com o tipo `button`.

Para mais detalhes sobre como receber e processar mensagens com botões, consulte a documentação do webhook [Ao receber mensagem](/docs/webhooks/ao-receber#exemplo-de-retorno-de-template-de-botão-otp).

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Códigos temporários**: Use códigos OTP para autenticação de dois fatores (2FA)
- **Personalização**: Você pode personalizar o texto do botão para melhorar a experiência do usuário
- **Imagens**: Adicione uma imagem para tornar a mensagem mais visual e atrativa
- **Segurança**: Códigos OTP devem ser temporários e únicos para cada uso
- **Funcionamento dos botões**: Consulte [**Funcionamento dos Botões**](/docs/tips/button-status) para entender os fatores que afetam o funcionamento

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Botão PIX](/docs/messages/botao-pix) - Envie botões para pagamentos PIX
- [Outros tipos de botões](/docs/messages/botoes) - Explore outros tipos de botões interativos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações
