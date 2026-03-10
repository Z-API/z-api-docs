---
id: botoes-video
title: Botões com Vídeo
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Video" size="lg" /> Botões com Vídeo

Envie vídeos acompanhados de botões de resposta rápida. O usuário pode escolher uma opção clicando em um dos botões, e a resposta será capturada via webhook.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite enviar um vídeo com botões de resposta rápida. Quando o usuário clicar em um botão, a resposta será enviada como uma mensagem que pode ser capturada via webhook, permitindo criar fluxos interativos baseados na escolha do usuário.

:::caution Atenção
Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).
:::

:::important Importante
O atributo `message` não pode ser enviado vazio! Sempre inclua um texto junto com o vídeo.
:::

![Exemplo de botões com vídeo](/img/SendButtonWithVideo.jpeg)

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: O número do destinatário para onde você deseja enviar o vídeo com botões. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

- **`message`**: O texto que será exibido junto com o vídeo. **Este campo é obrigatório e não pode estar vazio!** Use este campo para explicar o que o usuário deve fazer ou fornecer contexto sobre o vídeo.

- **`buttonList`**: Um objeto contendo o vídeo e os botões. Dentro deste objeto, você precisa configurar:

  - **`video`**: URL pública ou Base64 do vídeo que será enviado. O vídeo deve ser acessível publicamente ou estar codificado em Base64.

  - **`buttons`**: Uma lista (array) de botões. Cada botão precisa ter:

    - **`label`**: O texto que aparecerá no botão (obrigatório)
    - **`id`**: Um identificador único para o botão (opcional, mas recomendado). Se não informado, será gerado automaticamente.

### Campos Opcionais

- **`delayMessage`**: Se você vai enviar várias mensagens seguidas, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

### Exemplo Prático para No-Code

**Exemplo básico:**

```json
{
  "phone": "5511999999999",
  "message": "Z-API é bom?",
  "buttonList": {
    "video": "https://exemplo.com/video.mp4",
    "buttons": [
      { "id": "1", "label": "Ótimo" },
      { "id": "2", "label": "Excelente" }
    ]
  }
}
```

**Exemplo com múltiplos botões:**

```json
{
  "phone": "5511999999999",
  "message": "Escolha uma opção:",
  "buttonList": {
    "video": "https://exemplo.com/demonstracao.mp4",
    "buttons": [
      { "id": "sim", "label": "Sim, quero" },
      { "id": "talvez", "label": "Talvez depois" },
      { "id": "nao", "label": "Não, obrigado" }
    ]
  }
}
```

**Dicas importantes:**

- **Mensagem obrigatória**: O campo `message` não pode estar vazio. Sempre inclua um texto explicativo junto com o vídeo.
- **URL do vídeo**: Certifique-se de que a URL do vídeo seja pública e acessível. Teste a URL no navegador antes de usar na automação.
- **Base64**: Se preferir usar Base64, o formato deve ser: `data:video/mp4;base64,SEU_CODIGO_BASE64` (ou `data:video/avi;base64,` para AVI, `data:video/mov;base64,` para MOV).
- **Formatos de vídeo**: MP4, AVI, MOV são suportados. O formato MP4 é o mais recomendado.
- **Tamanho máximo**: Verifique os limites de tamanho de arquivo do WhatsApp (geralmente 16MB para vídeos).
- **Duração recomendada**: Vídeos curtos (até 60 segundos) funcionam melhor e têm maior taxa de engajamento.
- **ID do botão**: Use IDs descritivos (ex: `"sim"`, `"nao"`, `"opcao1"`) para facilitar a identificação no webhook quando o usuário clicar.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). Use o `messageId` para rastrear o status da mensagem através dos webhooks.

**Casos de uso comuns:**

- **Demonstrações interativas**: Enviar vídeo de demonstração de produto com botões "Quero comprar", "Ver mais", "Falar com vendedor"
- **Tutoriais**: Enviar vídeo tutorial com botões de resposta rápida para feedback
- **Promoções**: Enviar vídeo promocional com botões "Quero", "Ver detalhes", "Compartilhar"
- **Suporte visual**: Enviar vídeo de instrução com botões de resposta rápida
- **Pesquisas**: Enviar vídeo de pesquisa com botões de avaliação

**Importante sobre botões:**

:::caution Atenção

Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).

:::

**Recebendo respostas:**

Quando o usuário clicar em um botão, você receberá um webhook com a resposta. O webhook incluirá o `id` do botão clicado, permitindo que você identifique qual opção o usuário escolheu. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-botão-com-video).

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO. Ex: `551199999999`. **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `message` | string | Texto a ser enviado junto com o vídeo. **Não pode ser vazio** |
| `buttonList` | object | Objeto contendo o vídeo e os botões |

### buttonList

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `video` | string | URL ou Base64 do vídeo que será enviado |
| `buttons` | array | Lista de botões a serem exibidos |

### Button

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `label` | string | Texto exibido no botão |

### Opcionais (Button)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | string | Identificador único do botão |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `delayMessage` | number | Delay em segundos (1-15) antes de enviar a próxima mensagem. Default: 1-3 segundos |

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

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

// Validar URL ou Base64 do vídeo
function validateVideoUrl(url) {
  if (!url || (typeof url !== 'string')) {
    throw new Error('URL do vídeo é obrigatória');
  }
  // Verificar se é URL válida ou Base64
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:video/');
  if (!isUrl && !isBase64) {
    throw new Error('URL do vídeo inválida. Use URL pública ou Base64');
  }
  return url;
}

// Enviar botões com vídeo
async function sendButtonListWithVideo(phone, message, videoUrl, buttons) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedVideoUrl = validateVideoUrl(videoUrl);
    if (!Array.isArray(buttons) || buttons.length === 0) {
      throw new Error('Deve haver pelo menos 1 botão');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-list`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        message: message.trim(),
        buttonList: {
          video: validatedVideoUrl,
          buttons: buttons.map((btn, index) => ({
            id: btn.id || String(index + 1),
            label: btn.label,
          })),
        },
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Botões com vídeo enviados com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar botões com vídeo:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendButtonListWithVideo(
  '5511999999999',
  'Z-API é Bom ?',
  'https://exemplo.com/video.mp4',
  [
    { id: '1', label: 'Ótimo' },
    { id: '2', label: 'Excelente' },
  ]
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface Button {
  id?: string;
  label: string;
}

interface ButtonListResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar URL do vídeo
function validateVideoUrl(url: string): string {
  if (!url || url.trim() === '') {
    throw new Error('URL do vídeo é obrigatória');
  }
  const isUrl = url.startsWith('http://') || url.startsWith('https://');
  const isBase64 = url.startsWith('data:video/');
  if (!isUrl && !isBase64) {
    throw new Error('URL do vídeo inválida');
  }
  return url;
}

// Função para enviar botões com vídeo
async function sendButtonListWithVideo(
  phone: string,
  message: string,
  videoUrl: string,
  buttons: Button[]
): Promise<ButtonListResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedVideoUrl = validateVideoUrl(videoUrl);
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Deve haver pelo menos 1 botão');
  }

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-list`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      buttonList: {
        video: validatedVideoUrl,
        buttons: buttons.map((btn, index) => ({
          id: btn.id || String(index + 1),
          label: btn.label,
        })),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendButtonListWithVideo(
  '5511999999999',
  'Z-API é Bom ?',
  'https://exemplo.com/video.mp4',
  [
    { id: '1', label: 'Ótimo' },
    { id: '2', label: 'Excelente' },
  ]
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
from typing import Dict, Any, List

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_video_url(url: str) -> str:
    """Valida URL ou Base64 do vídeo"""
    if not url or not isinstance(url, str):
        raise ValueError('URL do vídeo é obrigatória')
    is_url = url.startswith('http://') or url.startswith('https://')
    is_base64 = url.startswith('data:video/')
    if not is_url and not is_base64:
        raise ValueError('URL do vídeo inválida. Use URL pública ou Base64')
    return url

def send_button_list_with_video(
    phone: str,
    message: str,
    video_url: str,
    buttons: List[Dict[str, str]]
) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_video_url = validate_video_url(video_url)
    if not isinstance(buttons, list) or len(buttons) == 0:
        raise ValueError('Deve haver pelo menos 1 botão')
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-list"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "buttonList": {
            "video": validated_video_url,
            "buttons": [
                {
                    "id": btn.get("id", str(i + 1)),
                    "label": btn["label"]
                }
                for i, btn in enumerate(buttons)
            ]
        }
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Botões com vídeo enviados com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_button_list_with_video(
    '5511999999999',
    'Z-API é Bom ?',
    'https://exemplo.com/video.mp4',
    [
        {'id': '1', 'label': 'Ótimo'},
        {'id': '2', 'label': 'Excelente'}
    ]
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

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar botões com vídeo via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-list" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Z-API é Bom ?\",
    \"buttonList\": {
      \"video\": \"https://exemplo.com/video.mp4\",
      \"buttons\": [
        {
          \"id\": \"1\",
          \"label\": \"Ótimo\"
        },
        {
          \"id\": \"2\",
          \"label\": \"Excelente\"
        }
      ]
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
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

// Enviar botões com vídeo
function sendButtonListWithVideo(phone, message, videoUrl, buttons) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      if (!Array.isArray(buttons) || buttons.length === 0) {
        throw new Error('Deve haver pelo menos 1 botão');
      }
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-list`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      buttonList: {
        video: videoUrl,
        buttons: buttons.map((btn, index) => ({
          id: btn.id || String(index + 1),
          label: btn.label,
        })),
      },
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
            console.log('Botões com vídeo enviados com sucesso');
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
sendButtonListWithVideo(
  '5511999999999',
  'Z-API é Bom ?',
  'https://exemplo.com/video.mp4',
  [
    { id: '1', label: 'Ótimo' },
    { id: '2', label: 'Excelente' },
  ]
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

// Rota para enviar botões com vídeo
app.post('/api/send-button-list-video', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, videoUrl, buttons } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    if (!Array.isArray(buttons) || buttons.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Deve haver pelo menos 1 botão',
      });
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-list`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      buttonList: {
        video: videoUrl,
        buttons: buttons.map((btn, index) => ({
          id: btn.id || String(index + 1),
          label: btn.label,
        })),
      },
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
    console.error('Erro ao enviar botões com vídeo:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar botões com vídeo',
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

// Middleware para enviar botões com vídeo
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-list-video' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, videoUrl, buttons } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      if (!Array.isArray(buttons) || buttons.length === 0) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'Deve haver pelo menos 1 botão',
        };
        return;
      }

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-list`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        buttonList: {
          video: videoUrl,
          buttons: buttons.map((btn, index) => ({
            id: btn.id || String(index + 1),
            label: btn.label,
          })),
        },
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
      console.error('Erro ao enviar botões com vídeo:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar botões com vídeo',
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
import org.json.JSONArray;

public class SendButtonListVideo {
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

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String message = "Z-API é Bom ?";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }
            
            String videoUrl = "https://exemplo.com/video.mp4";
            JSONArray buttons = new JSONArray();
            buttons.put(new JSONObject().put("id", "1").put("label", "Ótimo"));
            buttons.put(new JSONObject().put("id", "2").put("label", "Excelente"));
            
            if (buttons.length() == 0) {
                throw new IllegalArgumentException("Deve haver pelo menos 1 botão");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-list",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject buttonList = new JSONObject();
            buttonList.put("video", videoUrl);
            buttonList.put("buttons", buttons);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("buttonList", buttonList);
            
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
                
                System.out.println("Botões com vídeo enviados com sucesso");
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

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string message = "Z-API é Bom ?";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }
            
            string videoUrl = "https://exemplo.com/video.mp4";
            var buttons = new[]
            {
                new { id = "1", label = "Ótimo" },
                new { id = "2", label = "Excelente" }
            };
            
            if (buttons.Length == 0)
            {
                throw new ArgumentException("Deve haver pelo menos 1 botão");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-list";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                buttonList = new
                {
                    video = videoUrl,
                    buttons = buttons
                }
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
                    Console.WriteLine("Botões com vídeo enviados com sucesso");
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

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    message := "Z-API é Bom ?"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }
    
    videoUrl := "https://exemplo.com/video.mp4"
    buttons := []map[string]string{
        {"id": "1", "label": "Ótimo"},
        {"id": "2", "label": "Excelente"},
    }
    
    if len(buttons) == 0 {
        fmt.Println("Erro: Deve haver pelo menos 1 botão")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-list", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "buttonList": map[string]interface{}{
            "video": videoUrl,
            "buttons": buttons,
        },
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
        
        fmt.Println("Botões com vídeo enviados com sucesso")
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

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $message = 'Z-API é Bom ?';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }
    
    $videoUrl = 'https://exemplo.com/video.mp4';
    $buttons = [
        ['id' => '1', 'label' => 'Ótimo'],
        ['id' => '2', 'label' => 'Excelente'],
    ];
    
    if (count($buttons) === 0) {
        throw new Exception('Deve haver pelo menos 1 botão');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-list',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'buttonList' => [
            'video' => $videoUrl,
            'buttons' => $buttons,
        ],
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
        echo "Botões com vídeo enviados com sucesso\n";
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

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message = 'Z-API é Bom ?'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?
  
  video_url = 'https://exemplo.com/video.mp4'
  buttons = [
    { id: '1', label: 'Ótimo' },
    { id: '2', label: 'Excelente' }
  ]
  
  raise 'Deve haver pelo menos 1 botão' if buttons.empty?

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-list")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    buttonList: {
      video: video_url,
      buttons: buttons
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Botões com vídeo enviados com sucesso'
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

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let message = "Z-API é Bom ?"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }
    
    let videoUrl = "https://exemplo.com/video.mp4"
    let buttons: [[String: String]] = [
        ["id": "1", "label": "Ótimo"],
        ["id": "2", "label": "Excelente"]
    ]
    
    if buttons.isEmpty {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Deve haver pelo menos 1 botão"])
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-list"
    
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
        "message": message.trimmingCharacters(in: .whitespaces),
        "buttonList": [
            "video": videoUrl,
            "buttons": buttons
        ]
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
                        print("Botões com vídeo enviados com sucesso")
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

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $message = "Z-API é Bom ?"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }
    
    $videoUrl = "https://exemplo.com/video.mp4"
    $buttons = @(
        @{ id = "1"; label = "Ótimo" },
        @{ id = "2"; label = "Excelente" }
    )
    
    if ($buttons.Count -eq 0) {
        throw "Deve haver pelo menos 1 botão"
    }

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-list"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        buttonList = @{
            video = $videoUrl
            buttons = $buttons
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Botões com vídeo enviados com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Z-API é Bom ?",
  "buttonList": {
    "video": "https://exemplo.com/video.mp4",
    "buttons": [
      {
        "id": "1",
        "label": "Ótimo"
      },
      {
        "id": "2",
        "label": "Excelente"
      }
    ]
  }
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
    
    std::string message = "Z-API é Bom ?";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    std::string videoUrl = "https://exemplo.com/video.mp4";
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-list";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"buttonList\":{"
                  << "\"video\":\"" << videoUrl << "\","
                  << "\"buttons\":["
                  << "{\"id\":\"1\",\"label\":\"Ótimo\"},"
                  << "{\"id\":\"2\",\"label\":\"Excelente\"}"
                  << "]"
                  << "}"
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
                std::cout << "Botões com vídeo enviados com sucesso" << std::endl;
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
    
    char* message = "Z-API é Bom ?";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    char* videoUrl = "https://exemplo.com/video.mp4";
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-list", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"buttonList\":{\"video\":\"%s\",\"buttons\":[{\"id\":\"1\",\"label\":\"Ótimo\"},{\"id\":\"2\",\"label\":\"Excelente\"}]}}",
        phone, message, videoUrl);
    
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
                printf("Botões com vídeo enviados com sucesso\n");
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
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega e Cliques:**

Para saber quando a mensagem foi entregue, lida, ou quando um botão foi clicado, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-botão-com-video).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique se todos os atributos obrigatórios foram enviados, especialmente se `message` não está vazio, se `buttonList` contém `video` e `buttons`, e se há pelo menos 1 botão |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` nos headers da requisição |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando o usuário clicar em um botão, você receberá um webhook com a resposta. Veja mais detalhes em:

[Webhook ao receber mensagem - Botões com vídeo](/docs/webhooks/ao-receber#exemplo-de-retorno-de-botão-com-video)

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Vídeo**: Pode ser fornecida via URL pública ou Base64
- **Mensagem obrigatória**: O atributo `message` não pode ser vazio
- **ID do botão**: Use o `id` para identificar qual botão foi clicado no webhook
- **Formatos de vídeo**: MP4, AVI, MOV são suportados
- **Tamanho máximo**: Verifique os limites de tamanho de arquivo do WhatsApp
