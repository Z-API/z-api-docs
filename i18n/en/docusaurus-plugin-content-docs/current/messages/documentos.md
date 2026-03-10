---
id: documentos
sidebar_position: 11
title: Send Document
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { EndpointDisplay, RequestBodyDisplay, ParameterTableDisplay } from '@site/src/components/shared/HighlightBox';

# Send Message with Document

Send files of various formats, such as PDFs, spreadsheets, text documents and much more. It's the ideal way to share detailed information, invoices, contracts or any other type of file directly in the conversation.

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Finance:** Send invoices, bills, or quotes in PDF.
- **Sales:** Send product catalogs or commercial proposals.
- **Logistics:** Send tax invoices or transportation documents.
- **Educational:** Share study materials, such as e-books or exercise spreadsheets.

---

## <Icon name="Info" size="md" /> The Importance of `fileName`

When sending a document, you can specify the `fileName`. This parameter is optional but **highly recommended**.

- **What does it do?** Defines the name of the file that your contact will see when receiving and downloading it.
- **Why use it?** A clear name (e.g., `Fatura-Pedido-123.pdf`) is much more professional and useful than a generic name (e.g., `doc_789456123.pdf`), which may be the default if you don't specify one.

![Example of message with document](/img/send-message-document.jpeg)

Always include the file extension (like `.pdf`, `.docx`, `.xlsx`) in the `fileName`.

---

## <Icon name="Wand2" size="md" /> For No-Code Users

In your automation tool, you will fill in the following fields:

### Required Fields

1. **`phone`**: The contact number that will receive the file. Use the full format: DDI + DDD + Number (e.g., `5511999999999`).
2. **`document`**: The field where you will paste the **public URL** of your document. The URL must be publicly accessible on the internet.

### Optional Fields

3. **`fileName`** (Recommended): The name that the file will have for your contact (e.g., `Catalogo-2025.pdf`). **Always include the file extension** (`.pdf`, `.docx`, `.xlsx`, etc.). Although optional, it is strongly recommended for a better experience.

4. **`caption`**: A short text to describe the document. You can use formatting (bold with `*texto*`, italic with `_texto_`).

5. **`messageId`**: If you want to reply to a specific message, paste here the `messageId` of the original message. This creates a threaded conversation in WhatsApp.

6. **`delayMessage`**: If you are sending multiple documents consecutively, use this field to space out the sends (between 1 and 15 seconds). This helps avoid blocks and makes communication more natural.

7. **`editDocumentMessageId`**: Use this field to edit the description of a document that has already been sent. Paste the `messageId` of the original document and include the new `caption` in JSON. **Important:** You need to have the webhook configured to use this functionality.

**Tip:** In most cases, you only need to fill in `phone`, `document` and `fileName`. The other fields are optional and can be left blank.

---

## <Icon name="Code" size="md" /> For Developers

To send a document, make an `POST` request to the endpoint below.

### Endpoint

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-document/{extension}
```
*OBS: You need to provide the `{extension}` parameter with the file extension you want to send! Theoretically, this method should support all types of documents as long as they are within the file size policies of WhatsApp.*

### Request Body

**Minimum Example (only required fields):**

```json
{
  "phone": "5511999999999",
  "document": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
}
```

**Complete Example (with all optional parameters):**

```json
{
  "phone": "5511999999999",
  "document": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  "fileName": "Fatura-Exemplo.pdf",
  "caption": "Segue a fatura referente ao seu último pedido.",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

**Edit Document Example (editDocumentMessageId):**

```json
{
  "phone": "5511999999999",
  "document": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  "fileName": "Fatura-Exemplo.pdf",
  "caption": "Fatura atualizada - nova descrição",
  "editDocumentMessageId": "3EB0C767F26A"
}
```

### Parameters

#### Required Parameters

| Field | Type | Required | Description |
|:--------- |:----- |:---------- |:----------------------------------------------------------------------- |
| `phone` | string | Yes | The recipient's number in the format DDI + DDD + NUMBER. |
| `document` | string | Yes | The public URL of the document. Base64 usage is not recommended. |

#### Optional Parameters

| Field | Type | Required | Description |
|:--------- |:----- |:---------- |:----------------------------------------------------------------------- |
| `fileName` | string | No* | The name of the file that the recipient will see (e.g., `proposta.pdf`). **Although optional, it is strongly recommended** for a better user experience. Always include the file extension in the name. |
| `caption` | string | No | An optional text to describe the document. Max. 1024 characters. Allows formatting (bold, italic). |
| `messageId` | string | No | Allows replying to an existing message in the chat, creating a threaded conversation. Use the `messageId` of the message you want to reply. See more about [how to reply messages](./responder). |
| `delayMessage` | number | No | Controls the wait time (in seconds) before sending the next message. Values between 1 and 15 seconds. If not provided, the system uses an automatic delay of 1 to 3 seconds. Useful when sending multiple documents in sequence to avoid blocks. |
| `editDocumentMessageId` | string | No | Allows editing the description (caption) of a document that has already been sent. Use the `messageId` of the original document along with the new `caption` in JSON. **Important:** You need to have the webhook configured to use this functionality. Only the `caption` can be edited, not the file itself. |

---

## <Icon name="Shield" size="md" /> Best Practices and Limits

- **Maximum Size:** WhatsApp limits document uploads to **100MB**.
- **Common Formats:** PDF, DOCX, XLSX, PPTX, TXT.
- **Optimization:** For faster sends, keep files below 16MB.
- **Public URLs:** The document URL should be public and directly lead to the download of the file.

---

## <Icon name="FileCode" size="md" /> Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateDocumentUrl(documentUrl) {
  if (!documentUrl || typeof documentUrl !== 'string') {
    throw new Error('URL do documento é obrigatória');
  }
  try {
    const url = new URL(documentUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do documento inválida');
  }
  return documentUrl;
}

function validateFileName(fileName) {
  if (!fileName) return undefined;
  const trimmed = fileName.trim();
  if (trimmed.length === 0) {
    return undefined;
  }
  // Validação básica: deve ter extensão
  if (!trimmed.includes('.')) {
    throw new Error('fileName deve incluir a extensão do arquivo (ex: documento.pdf)');
  }
  return trimmed;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do documento com validação
const documentData = {
  phone: validatePhoneNumber('5511999999999'),
  document: validateDocumentUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
  fileName: validateFileName('Fatura-Exemplo.pdf'),
  caption: sanitizeCaption('Segue sua fatura.'),
};

// Remover campos opcionais se undefined
if (!documentData.fileName) delete documentData.fileName;
if (!documentData.caption) delete documentData.caption;

// Enviar requisição com tratamento seguro de erros
async function sendDocument() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-document/pdf`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Documento enviado com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar documento:', error.message);
    throw error;
  }
}

// Executar função
sendDocument();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface SendDocumentRequest {
  phone: string;
  document: string;
  fileName?: string;
  caption?: string;
}

interface SendDocumentResponse {
  messageId: string;
  status: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function validateDocumentUrl(documentUrl: string): string {
  if (!documentUrl) {
    throw new Error('URL do documento é obrigatória');
  }
  try {
    const url = new URL(documentUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch {
    throw new Error('URL do documento inválida');
  }
  return documentUrl;
}

function validateFileName(fileName?: string): string | undefined {
  if (!fileName) return undefined;
  const trimmed = fileName.trim();
  if (trimmed.length === 0) return undefined;
  if (!trimmed.includes('.')) {
    throw new Error('fileName deve incluir a extensão do arquivo');
  }
  return trimmed;
}

function sanitizeCaption(caption?: string): string | undefined {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do documento com validação
const documentData: SendDocumentRequest = {
  phone: validatePhoneNumber('5511999999999'),
  document: validateDocumentUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
  fileName: validateFileName('Fatura-Exemplo.pdf'),
  caption: sanitizeCaption('Segue sua fatura.'),
};

// Função para enviar documento
async function sendDocument(): Promise<SendDocumentResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-document/pdf`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendDocument()
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
from urllib.parse import urlparse

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
INSTANCE_TOKEN = os.getenv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    """Valida e sanitiza número de telefone."""
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_document_url(document_url: str) -> str:
    """Valida URL do documento."""
    if not document_url:
        raise ValueError("URL do documento é obrigatória")
    try:
        parsed = urlparse(document_url)
        if parsed.scheme not in ['http', 'https']:
            raise ValueError("URL deve usar HTTP ou HTTPS")
    except Exception:
        raise ValueError("URL do documento inválida")
    return document_url

def validate_file_name(file_name: Optional[str]) -> Optional[str]:
    """Valida nome do arquivo."""
    if not file_name:
        return None
    trimmed = file_name.strip()
    if trimmed == "":
        return None
    if '.' not in trimmed:
        raise ValueError("fileName deve incluir a extensão do arquivo (ex: documento.pdf)")
    return trimmed

def sanitize_caption(caption: Optional[str]) -> Optional[str]:
    """Valida e sanitiza legenda."""
    if not caption:
        return None
    trimmed = caption.strip()
    if len(trimmed) > 1024:
        raise ValueError("Legenda excede limite de 1024 caracteres")
    return trimmed

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-document/pdf"

# Dados do documento com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "document": validate_document_url("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"),
        "fileName": validate_file_name("Fatura-Exemplo.pdf"),
        "caption": sanitize_caption("Segue sua fatura.")
    }
    # Remove campos opcionais se None
    if payload["fileName"] is None:
        del payload["fileName"]
    if payload["caption"] is None:
        del payload["caption"]
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

# Headers obrigatórios
headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

# Enviar requisição com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f"Documento enviado. MessageId: {result.get('messageId')}")
    
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_INSTANCE_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
PHONE="5511999999999"
DOCUMENT_URL="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
FILE_NAME="Fatura-Exemplo.pdf"
CAPTION="Segue sua fatura."

# Enviar documento via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-document/pdf" \
 -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"document\": \"${DOCUMENT_URL}\",
    \"fileName\": \"${FILE_NAME}\",
    \"caption\": \"${CAPTION}\"
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateDocumentUrl(documentUrl) {
  if (!documentUrl) {
    throw new Error('URL do documento é obrigatória');
  }
  try {
    const url = new URL(documentUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do documento inválida');
  }
  return documentUrl;
}

function validateFileName(fileName) {
  if (!fileName) return undefined;
  const trimmed = fileName.trim();
  if (trimmed.length === 0) return undefined;
  if (!trimmed.includes('.')) {
    throw new Error('fileName deve incluir a extensão do arquivo');
  }
  return trimmed;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do documento com validação
const documentData = {
  phone: validatePhoneNumber('5511999999999'),
  document: validateDocumentUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
  fileName: validateFileName('Fatura-Exemplo.pdf'),
  caption: sanitizeCaption('Segue sua fatura.'),
};

// Remover campos opcionais se undefined
if (!documentData.fileName) delete documentData.fileName;
if (!documentData.caption) delete documentData.caption;

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-document/pdf`);
const postData = JSON.stringify(documentData);

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
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      console.log('Documento enviado. MessageId:', result.messageId);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

function validateFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('Nome do arquivo deve ser uma string não vazia');
  }
  // Remove caracteres perigosos
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '');
  if (sanitized.length === 0 || sanitized.length > 255) {
    throw new Error('Nome do arquivo inválido');
  }
  return sanitized;
}

function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL deve ser uma string não vazia');
  }
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:') {
      throw new Error('URL deve usar HTTPS');
    }
    return url;
  } catch (error) {
    throw new Error('URL inválida');
  }
}

// Rota para enviar documento
app.post('/send-document', async (req, res) => {
  try {
    // Dados do documento com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawUrl = req.body.url || 'https://exemplo.com/documento.pdf';
    const rawFileName = req.body.fileName || 'documento.pdf';
    const rawCaption = req.body.caption || '';

    const documentData = {
      phone: validatePhoneNumber(rawPhone),
      url: validateUrl(rawUrl),
      fileName: validateFileName(rawFileName),
      caption: rawCaption ? sanitizeMessage(rawCaption) : undefined,
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-document`);
    const postData = JSON.stringify(documentData);

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
              resolve({ success: true, messageId: parsed.messageId });
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
    console.error('Erro ao enviar documento:', error.message);
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
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

function validateFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('Nome do arquivo deve ser uma string não vazia');
  }
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '');
  if (sanitized.length === 0 || sanitized.length > 255) {
    throw new Error('Nome do arquivo inválido');
  }
  return sanitized;
}

function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('URL deve ser uma string não vazia');
  }
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:') {
      throw new Error('URL deve usar HTTPS');
    }
    return url;
  } catch (error) {
    throw new Error('URL inválida');
  }
}

// Rota para enviar documento
router.post('/send-document', async (ctx) => {
  try {
    // Dados do documento com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawUrl = ctx.request.body.url || 'https://exemplo.com/documento.pdf';
    const rawFileName = ctx.request.body.fileName || 'documento.pdf';
    const rawCaption = ctx.request.body.caption || '';

    const documentData = {
      phone: validatePhoneNumber(rawPhone),
      url: validateUrl(rawUrl),
      fileName: validateFileName(rawFileName),
      caption: rawCaption ? sanitizeMessage(rawCaption) : undefined,
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-document`);
    const postData = JSON.stringify(documentData);

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
              resolve({ success: true, messageId: parsed.messageId });
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
  console.error('Erro ao enviar documento:', err.message);
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

public class SendDocument {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static String validateDocumentUrl(String documentUrl) {
        if (documentUrl == null || documentUrl.trim().isEmpty()) {
            throw new IllegalArgumentException("URL do documento é obrigatória");
        }
        try {
            URL url = new URL(documentUrl);
            String protocol = url.getProtocol();
            if (!protocol.equals("http") && !protocol.equals("https")) {
                throw new IllegalArgumentException("URL deve usar HTTP ou HTTPS");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("URL do documento inválida");
        }
        return documentUrl;
    }

    private static String validateFileName(String fileName) {
        if (fileName == null || fileName.trim().isEmpty()) {
            return null;
        }
        String trimmed = fileName.trim();
        if (!trimmed.contains(".")) {
            throw new IllegalArgumentException("fileName deve incluir a extensão do arquivo");
        }
        return trimmed;
    }

    private static String sanitizeCaption(String caption) {
        if (caption == null || caption.trim().isEmpty()) {
            return null;
        }
        String trimmed = caption.trim();
        if (trimmed.length() > 1024) {
            throw new IllegalArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    public static void main(String[] args) {
        try {
            // Dados do documento com validação
            String phone = validatePhoneNumber("5511999999999");
            String documentUrl = validateDocumentUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
            String fileName = validateFileName("Fatura-Exemplo.pdf");
            String caption = sanitizeCaption("Segue sua fatura.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-document/pdf",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Criar JSON payload
            StringBuilder json = new StringBuilder();
            json.append("{\"phone\":\"").append(phone.replace("\"", "\\\""));
            json.append("\",\"document\":\"").append(documentUrl.replace("\"", "\\\""));
            if (fileName != null) {
                json.append("\",\"fileName\":\"").append(fileName.replace("\"", "\\\""));
            }
            if (caption != null) {
                json.append("\",\"caption\":\"").append(caption.replace("\"", "\\\""));
            }
            json.append("\"}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = json.toString().getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Documento enviado. Response: " + response.toString());
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
using System.Text.Json;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

class SendDocument
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string InstanceToken = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_INSTANCE_TOKEN";
    private static readonly string ClientToken = 
        Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

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

    private static string ValidateDocumentUrl(string documentUrl)
    {
        if (string.IsNullOrWhiteSpace(documentUrl))
        {
            throw new ArgumentException("URL do documento é obrigatória");
        }
        if (!Uri.TryCreate(documentUrl, UriKind.Absolute, out Uri? uri) || 
            (uri.Scheme != "http" && uri.Scheme != "https"))
        {
            throw new ArgumentException("URL do documento inválida. Deve usar HTTP ou HTTPS");
        }
        return documentUrl;
    }

    private static string? ValidateFileName(string? fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            return null;
        }
        string trimmed = fileName.Trim();
        if (!trimmed.Contains("."))
        {
            throw new ArgumentException("fileName deve incluir a extensão do arquivo");
        }
        return trimmed;
    }

    private static string? SanitizeCaption(string? caption)
    {
        if (string.IsNullOrWhiteSpace(caption))
        {
            return null;
        }
        string trimmed = caption.Trim();
        if (trimmed.Length > 1024)
        {
            throw new ArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados do documento com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string documentUrl = ValidateDocumentUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
            string? fileName = ValidateFileName("Fatura-Exemplo.pdf");
            string? caption = SanitizeCaption("Segue sua fatura.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-document/pdf";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    document = documentUrl,
                    fileName = fileName,
                    caption = caption
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Documento enviado. Response: {result}");
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
    "net/http"
    "net/url"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
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

func validateDocumentUrl(documentUrl string) (string, error) {
    if documentUrl == "" {
        return "", fmt.Errorf("URL do documento é obrigatória")
    }
    parsed, err := url.Parse(documentUrl)
    if err != nil {
        return "", fmt.Errorf("URL do documento inválida")
    }
    if parsed.Scheme != "http" && parsed.Scheme != "https" {
        return "", fmt.Errorf("URL deve usar HTTP ou HTTPS")
    }
    return documentUrl, nil
}

func validateFileName(fileName string) (string, error) {
    trimmed := strings.TrimSpace(fileName)
    if trimmed == "" {
        return "", nil
    }
    if !strings.Contains(trimmed, ".") {
        return "", fmt.Errorf("fileName deve incluir a extensão do arquivo")
    }
    return trimmed, nil
}

func sanitizeCaption(caption string) (string, error) {
    trimmed := strings.TrimSpace(caption)
    if trimmed == "" {
        return "", nil
    }
    if len(trimmed) > 1024 {
        return "", fmt.Errorf("legenda excede limite de 1024 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados do documento com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    documentUrl, err := validateDocumentUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    fileName, err := validateFileName("Fatura-Exemplo.pdf")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    caption, err := sanitizeCaption("Segue sua fatura.")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-document/pdf",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]interface{}{
        "phone":    phone,
        "document": documentUrl,
    }
    if fileName != "" {
        payload["fileName"] = fileName
    }
    if caption != "" {
        payload["caption"] = caption
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }

    req, err := http.NewRequest("POST", baseURL, bytes.NewBuffer(jsonData))
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
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result map[string]interface{}
        if err := json.NewDecoder(resp.Body).Decode(&result); err == nil {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            fmt.Printf("Documento enviado. MessageId: %v\n", result["messageId"])
        }
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
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new InvalidArgumentException('Número de telefone inválido. Use formato: DDI + DDD + Número');
    }
    return $cleaned;
}

function validateDocumentUrl($documentUrl) {
    if (empty($documentUrl)) {
        throw new InvalidArgumentException('URL do documento é obrigatória');
    }
    $parsed = parse_url($documentUrl);
    if ($parsed === false || !in_array($parsed['scheme'] ?? '', ['http', 'https'])) {
        throw new InvalidArgumentException('URL do documento inválida. Deve usar HTTP ou HTTPS');
    }
    return $documentUrl;
}

function validateFileName($fileName) {
    if (empty(trim($fileName))) {
        return null;
    }
    $trimmed = trim($fileName);
    if (strpos($trimmed, '.') === false) {
        throw new InvalidArgumentException('fileName deve incluir a extensão do arquivo');
    }
    return $trimmed;
}

function sanitizeCaption($caption) {
    if (empty(trim($caption))) {
        return null;
    }
    $trimmed = trim($caption);
    if (strlen($trimmed) > 1024) {
        throw new InvalidArgumentException('Legenda excede limite de 1024 caracteres');
    }
    return $trimmed;
}

try {
    // Dados do documento com validação
    $phone = validatePhoneNumber('5511999999999');
    $documentUrl = validateDocumentUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
    $fileName = validateFileName('Fatura-Exemplo.pdf');
    $caption = sanitizeCaption('Segue sua fatura.');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-document/pdf',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'document' => $documentUrl,
    ];
    if ($fileName !== null) {
        $payload['fileName'] = $fileName;
    }
    if ($caption !== null) {
        $payload['caption'] = $caption;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true, // ⚠️ SEGURANÇA: Sempre verifique certificados SSL
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erro na requisição: $error");
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Documento enviado. MessageId: " . $result['messageId'] . "\n";
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
require 'json'
require 'uri'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_INSTANCE_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Use formato: DDI + DDD + Número'
  end
  cleaned
end

def validate_document_url(document_url)
  if document_url.nil? || document_url.strip.empty?
    raise ArgumentError, 'URL do documento é obrigatória'
  end
  begin
    uri = URI.parse(document_url)
    unless ['http', 'https'].include?(uri.scheme)
      raise ArgumentError, 'URL deve usar HTTP ou HTTPS'
    end
  rescue URI::InvalidURIError
    raise ArgumentError, 'URL do documento inválida'
  end
  document_url
end

def validate_file_name(file_name)
  return nil if file_name.nil? || file_name.strip.empty?
  trimmed = file_name.strip
  unless trimmed.include?('.')
    raise ArgumentError, 'fileName deve incluir a extensão do arquivo'
  end
  trimmed
end

def sanitize_caption(caption)
  return nil if caption.nil? || caption.strip.empty?
  trimmed = caption.strip
  if trimmed.length > 1024
    raise ArgumentError, 'Legenda excede limite de 1024 caracteres'
  end
  trimmed
end

begin
  # Dados do documento com validação
  phone = validate_phone_number('5511999999999')
  document_url = validate_document_url('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf')
  file_name = validate_file_name('Fatura-Exemplo.pdf')
  caption = sanitize_caption('Segue sua fatura.')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-document/pdf")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  
  payload = {
    phone: phone,
    document: document_url
  }
  payload[:fileName] = file_name if file_name
  payload[:caption] = caption if caption
  
  request.body = JSON.generate(payload)

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Documento enviado. MessageId: #{result['messageId']}"
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_INSTANCE_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido. Use formato: DDI + DDD + Número"])
    }
    return cleaned
}

func validateDocumentUrl(_ documentUrl: String) throws -> String {
    guard let url = URL(string: documentUrl),
          let scheme = url.scheme,
          (scheme == "http" || scheme == "https") else {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "URL do documento inválida. Deve usar HTTP ou HTTPS"])
    }
    return documentUrl
}

func validateFileName(_ fileName: String?) throws -> String? {
    guard let fileName = fileName else { return nil }
    let trimmed = fileName.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        return nil
    }
    if !trimmed.contains(".") {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "fileName deve incluir a extensão do arquivo"])
    }
    return trimmed
}

func sanitizeCaption(_ caption: String?) throws -> String? {
    guard let caption = caption else { return nil }
    let trimmed = caption.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        return nil
    }
    if trimmed.count > 1024 {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Legenda excede limite de 1024 caracteres"])
    }
    return trimmed
}

// Dados do documento com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let documentUrl = try validateDocumentUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")
    let fileName = try validateFileName("Fatura-Exemplo.pdf")
    let caption = try sanitizeCaption("Segue sua fatura.")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-document/pdf"
    
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
        "document": documentUrl
    ]
    if let fileName = fileName {
        payload["fileName"] = fileName
    }
    if let caption = caption {
        payload["caption"] = caption
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
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Documento enviado. MessageId: \(messageId)")
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

    // Aguardar conclusão (em produção, use async/await ou completion handlers)
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Use formato: DDI + DDD + Número"
    }
    return $cleaned
}

function Validate-DocumentUrl {
    param([string]$DocumentUrl)
    if ([string]::IsNullOrWhiteSpace($DocumentUrl)) {
        throw "URL do documento é obrigatória"
    }
    try {
        $uri = [System.Uri]$DocumentUrl
        if ($uri.Scheme -notin @('http', 'https')) {
            throw "URL deve usar HTTP ou HTTPS"
        }
    } catch {
        throw "URL do documento inválida"
    }
    return $DocumentUrl
}

function Validate-FileName {
    param([string]$FileName)
    if ([string]::IsNullOrWhiteSpace($FileName)) {
        return $null
    }
    $trimmed = $FileName.Trim()
    if ($trimmed -notmatch '\.') {
        throw "fileName deve incluir a extensão do arquivo"
    }
    return $trimmed
}

function Sanitize-Caption {
    param([string]$Caption)
    if ([string]::IsNullOrWhiteSpace($Caption)) {
        return $null
    }
    $trimmed = $Caption.Trim()
    if ($trimmed.Length -gt 1024) {
        throw "Legenda excede limite de 1024 caracteres"
    }
    return $trimmed
}

try {
    # Dados do documento com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $documentUrl = Validate-DocumentUrl -DocumentUrl "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    $fileName = Validate-FileName -FileName "Fatura-Exemplo.pdf"
    $caption = Sanitize-Caption -Caption "Segue sua fatura."

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-document/pdf"

    $body = @{
        phone = $phone
        document = $documentUrl
    }
    if ($fileName) {
        $body.fileName = $fileName
    }
    if ($caption) {
        $body.caption = $caption
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Documento enviado. MessageId: $($response.messageId)"

} catch {
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
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
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-document/pdf HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 185

{
 "phone": "5511999999999",
 "document": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
 "fileName": "Fatura-Exemplo.pdf",
 "caption": "Segue sua fatura."
}
```

**Note:** This is an example of a raw HTTP request. In production:
- ⚠️ **SECURITY:** Replace `SUA_INSTANCIA`, `SEU_TOKEN` and `SEU_CLIENT_TOKEN` with real values from environment variables
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate `phone` (only numbers, 10-15 digits), `document` (valid HTTP URL), `fileName` (must include extension) and `caption` (max 1024 characters) before sending

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido. Use formato: DDI + DDD + Número");
    }
    return cleaned;
}

std::string validateDocumentUrl(const std::string& documentUrl) {
    if (documentUrl.empty()) {
        throw std::invalid_argument("URL do documento é obrigatória");
    }
    std::regex urlPattern("^https?://");
    if (!std::regex_search(documentUrl, urlPattern)) {
        throw std::invalid_argument("URL do documento inválida. Deve usar HTTP ou HTTPS");
    }
    return documentUrl;
}

std::string validateFileName(const std::string& fileName) {
    std::string trimmed = fileName;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        return "";
    }
    if (trimmed.find('.') == std::string::npos) {
        throw std::invalid_argument("fileName deve incluir a extensão do arquivo");
    }
    return trimmed;
}

std::string sanitizeCaption(const std::string& caption) {
    std::string trimmed = caption;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        return "";
    }
    if (trimmed.length() > 1024) {
        throw std::invalid_argument("Legenda excede limite de 1024 caracteres");
    }
    return trimmed;
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

        // Dados do documento com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string documentUrl = validateDocumentUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
        std::string fileName = validateFileName("Fatura-Exemplo.pdf");
        std::string caption = sanitizeCaption("Segue sua fatura.");

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-document/pdf";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"document\":\"" + documentUrl + "\"";
        if (!fileName.empty()) {
            jsonPayload += ",\"fileName\":\"" + fileName + "\"";
        }
        if (!caption.empty()) {
            jsonPayload += ",\"caption\":\"" + caption + "\"";
        }
        jsonPayload += "}";

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
            std::cout << "Documento enviado. Response: " << responseData << std::endl;
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

**Compilation:**
```bash
# Requer libcurl-dev
g++ -o send_document send_document.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

// Validação de entrada (segurança)
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
        return 0; // Inválido
    }
    return 1; // Válido
}

int validateDocumentUrl(const char* documentUrl) {
    if (documentUrl == NULL || strlen(documentUrl) == 0) {
        return 0; // Inválido
    }
    // Verifica se começa com http:// ou https://
    if (strncmp(documentUrl, "http://", 7) != 0 && strncmp(documentUrl, "https://", 8) != 0) {
        return 0; // Inválido
    }
    return 1; // Válido
}

int validateFileName(const char* fileName, char* validated) {
    if (fileName == NULL || strlen(fileName) == 0) {
        validated[0] = '\0';
        return 0; // Vazio
    }
    
    int start = 0;
    int end = strlen(fileName) - 1;
    
    while (isspace(fileName[start]) && fileName[start] != '\0') start++;
    while (end > start && isspace(fileName[end])) end--;
    
    if (start > end) {
        validated[0] = '\0';
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    strncpy(validated, fileName + start, len);
    validated[len] = '\0';
    
    if (strchr(validated, '.') == NULL) {
        return -1; // Sem extensão
    }
    return 1; // Válido
}

int sanitizeCaption(const char* caption, char* sanitized) {
    if (caption == NULL || strlen(caption) == 0) {
        sanitized[0] = '\0';
        return 0; // Vazio
    }
    
    int start = 0;
    int end = strlen(caption) - 1;
    
    while (isspace(caption[start]) && caption[start] != '\0') start++;
    while (end > start && isspace(caption[end])) end--;
    
    if (start > end) {
        sanitized[0] = '\0';
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    if (len > 1024) {
        return -1; // Muito longo
    }
    
    strncpy(sanitized, caption + start, len);
    sanitized[len] = '\0';
    return 1; // Válido
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

    // Dados do documento com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    const char* documentUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    if (!validateDocumentUrl(documentUrl)) {
        fprintf(stderr, "Erro de validação: URL do documento inválida\n");
        return 1;
    }

    char fileName[256];
    int fileNameResult = validateFileName("Fatura-Exemplo.pdf", fileName);
    if (fileNameResult == -1) {
        fprintf(stderr, "Erro de validação: fileName deve incluir a extensão do arquivo\n");
        return 1;
    }

    char caption[1025];
    int captionResult = sanitizeCaption("Segue sua fatura.", caption);
    if (captionResult == -1) {
        fprintf(stderr, "Erro de validação: Legenda excede limite de 1024 caracteres\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-document/pdf", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[2048];
    if (fileNameResult == 1 && captionResult == 1) {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"document\":\"%s\",\"fileName\":\"%s\",\"caption\":\"%s\"}",
                 phone, documentUrl, fileName, caption);
    } else if (fileNameResult == 1) {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"document\":\"%s\",\"fileName\":\"%s\"}",
                 phone, documentUrl, fileName);
    } else if (captionResult == 1) {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"document\":\"%s\",\"caption\":\"%s\"}",
                 phone, documentUrl, caption);
    } else {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"document\":\"%s\"}",
                 phone, documentUrl);
    }

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
        printf("Documento enviado. Response: %s\n", responseData);
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

**Compilation:**
```bash
# Requer libcurl-dev
gcc -o send_document send_document.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> API Response

If your request is successful, you will receive the following response:

### Success (200 OK)

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A",
}
```

| Field | Type | Description |
|:------|:-----|:----------|
| `zaapId` | string | Unique ID of the message in Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message on WhatsApp. **Save this ID!** Use it to track delivery status through webhooks or to edit the document later |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary identifier you should use to track the message
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered, read or if there was any error, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber).

**Document Editing:**

To edit the description of a document that has already been sent, use the `messageId` returned here in the `editDocumentMessageId` parameter of a new request.