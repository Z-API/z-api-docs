---
id: lista-opcoes
sidebar_position: 21
title: Send Options List
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> Send Message with Options List

It allows presenting a rich and structured menu, where the user taps on a button to open a list of selectable items, which can be organized into sections.

:::warning Attention

The options list functionality no longer works in groups. This limitation occurs because the feature was discontinued by WhatsApp itself for group chats. In individual conversations, the buttons continue to function normally.

:::

![Example of options list](/img/send-option-list.jpeg)

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Support Menus:** "Select the department you wish to speak with", with sections for "Sales", "Finance", and "Technical Support".
- **Product Selection:** "Which product category are you looking for?", with a list of all available categories.
- **Scheduling:** "Choose the best time for your consultation", listing all available times.
- **Frequently Asked Questions (FAQ):** Present a list of common questions for the user to select.

---

## <Icon name="FileText" size="md" /> Structure of an Options List

A list is composed of several main parts:

1. **Open Button:** The text of the button that the user clicks to see the list (e.g., "View Options").
2. **List Title:** The title that appears at the top of the list screen (e.g., "Choose a Category").
3. **Sections (Optional):** You can group the list items into sections, each with its own title (e.g., "Shoes", "Clothes").
4. **Rows:** Each clickable item in the list is a "row", containing a `id` (for your automation), a `title` (what the user sees), and a `description` (optional).

---

## <Icon name="Wand2" size="md" /> For No-Code Users

In your automation tool, you will need to build a nested structure:

### Required Fields

1. **`phone`**: The full contact number in the format: DDI + DDD + Number (e.g., `5511999999999`). **Important:** Use only numbers, without formatting or mask.

2. **`message`**: The main text that appears above the list button (e.g., "Select the best option:").

3. **`optionList`**: An object containing the list configuration. Inside it, you will configure:
   - **`title`** (required): The title of the listing that appears at the top of the list when the user opens it (e.g., "Available Options").
   - **`buttonLabel`** (required): The text of the button that the user clicks to open the list (e.g., "Open options list").
   - **`options`** (required): A list (array) of options. Each option will have:
     - **`title`** (required): The title of the option (what the user sees, e.g., "Z-API").
     - **`description`** (required): The description of the option (support text, e.g., "Z-API Wings for your imagination").
     - **`id`** (optional but recommended): A unique identifier (e.g., `"1"`, `"opcao_zapi"`). **This is the value that your automation will use to know which option was selected.**

### Optional Fields

4. **`delayMessage`**: Delay in seconds (1-15 seconds) before sending the message. If not specified, the default delay is 1-3 seconds.

### Practical Example for No-Code

```json
{
  "phone": "5511999999999",
  "message": "Selecione a melhor opção:",
  "optionList": {
    "title": "Opções disponíveis",
    "buttonLabel": "Abrir lista de opções",
    "options": [
      {
        "id": "opcao_1",
        "title": "Z-API",
        "description": "Z-API Asas para sua imaginação"
      },
      {
        "id": "opcao_2",
        "title": "Outros",
        "description": "Não funcionam"
      }
    ]
  }
}
```

### Create Trigger to Receive Selections

After the send node, you will create a new trigger that "listens" for selections:

1. **Configure a webhook** that receives events from Z-API
2. **Create a conditional logic** (like an "IF" or "Switch") based on the value of `selectedRowId` that comes in the webhook
3. **Actions based on selected option:**
   - **If** `selectedRowId` is `opcao_1`, **then** execute the corresponding action
   - **If** `selectedRowId` is `opcao_2`, **then** execute another action

**Important Tips:**

- **Maximum Options**: The maximum number of options varies by platform, but it generally supports multiple options
- **Title and Description**: Both are required for each option
- **Unique Identifiers**: Use `id` descriptive and unique to facilitate identification in the webhook
- **Open Button**: The `buttonLabel` is the text that appears on the button that opens the list

**Common Use Cases:**

- **Support Menus**: "Select the department you wish to speak with", with options for "Sales", "Finance" and "Technical Support"
- **Product Selection**: "Which product category are you looking for?", with a list of all available categories
- **Scheduling**: "Choose the best time for your consultation", listing all available times
- **Frequently Asked Questions (FAQ)**: Present a list of common questions for the user to select

---

## <Icon name="Code" size="md" /> For Developers

To send a message with an options list, make a request `POST` to the endpoint below.

### Endpoint

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-option-list
```

### Body Structure

The request body contains the phone number, message, and an object `optionList` with the list title, button text, and options.

```json
{
  "phone": "5511999999999",
  "message": "Selecione a melhor opção:",
  "optionList": {
    "title": "Opções disponíveis",
    "buttonLabel": "Abrir lista de opções",
    "options": [
      {
        "id": "1",
        "title": "Z-API",
        "description": "Z-API Asas para sua imaginação"
      },
      {
        "id": "2",
        "title": "Outros",
        "description": "Não funcionam"
      }
    ]
  }
}
```

#### Structure of `optionList`

| Field | Type | Required | Description |
|:------ |:----- |:-------- |:---------------------------------------------------- |
| `title` | string | Yes | Title of the list that appears at the top of the list |
| `buttonLabel` | string | Yes | Text of the button that opens the list |
| `options` | array | Yes | List of options (maximum number of options varies by platform) |

#### Structure of `option`

| Field | Type | Required | Description |
|:------ |:----- |:-------- |:---------------------------------------------------- |
| `title` | string | Yes | Title of the option (what the user sees) |
| `description` | string | Yes | Description of the option (support text) |
| `id` | string | No | Unique identifier of the option (used in webhook to identify which option was selected) |

### Receiving User Response

When the user selects an item from the list, you receive a notification via webhook with the `selectedRowId`.

```json
{
 // ... outros dados do webhook
 "selectedRowId": "cat_tenis",
 "phone": "5511999999999"
 // ...
}
```

Use the `selectedRowId` in your backend to identify the user's choice and continue the flow.

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

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

function validateButtonText(buttonText) {
  if (!buttonText || typeof buttonText !== 'string' || buttonText.trim().length === 0) {
    throw new Error('Texto do botão é obrigatório');
  }
  if (buttonText.length > 20) {
    throw new Error('Texto do botão excede limite de 20 caracteres');
  }
  return buttonText.trim();
}

function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('Seções são obrigatórias e devem conter pelo menos uma seção');
  }
  if (sections.length > 10) {
    throw new Error('Máximo de 10 seções permitidas');
  }
  
  sections.forEach((section, sectionIndex) => {
    if (!section.title || typeof section.title !== 'string') {
      throw new Error(`Seção ${sectionIndex + 1}: título é obrigatório`);
    }
    if (!Array.isArray(section.rows) || section.rows.length === 0) {
      throw new Error(`Seção ${sectionIndex + 1}: deve conter pelo menos uma linha`);
    }
    if (section.rows.length > 10) {
      throw new Error(`Seção ${sectionIndex + 1}: máximo de 10 linhas por seção`);
    }
    
    section.rows.forEach((row, rowIndex) => {
      if (!row.id || typeof row.id !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: id é obrigatório`);
      }
      if (!row.title || typeof row.title !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: title é obrigatório`);
      }
      if (row.description && row.description.length > 72) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: descrição excede 72 caracteres`);
      }
    });
  });
  
  return sections;
}

// Dados da lista com validação
const listData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Selecione um departamento para continuar seu atendimento.'),
  buttonText: validateButtonText('Ver Departamentos'),
  sections: validateSections([
    {
      title: 'Atendimento',
      rows: [
        { id: 'falar_vendas', title: 'Comercial' },
        { id: 'falar_suporte', title: 'Suporte Técnico' },
        { id: 'falar_financeiro', title: 'Financeiro' },
      ],
    },
  ]),
};

// Enviar requisição com tratamento seguro de erros
async function sendList() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-list`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(listData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Lista enviada com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar lista:', error.message);
    throw error;
  }
}

// Executar função
sendList();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface ListRow {
  id: string;
  title: string;
  description?: string;
}

interface ListSection {
  title: string;
  rows: ListRow[];
}

interface SendListRequest {
  phone: string;
  message: string;
  buttonText: string;
  sections: ListSection[];
}

interface SendListResponse {
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

function sanitizeMessage(message: string): string {
  if (!message || message.trim().length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede limite de 4096 caracteres');
  }
  return message.trim();
}

function validateButtonText(buttonText: string): string {
  if (!buttonText || buttonText.trim().length === 0) {
    throw new Error('Texto do botão é obrigatório');
  }
  if (buttonText.length > 20) {
    throw new Error('Texto do botão excede limite de 20 caracteres');
  }
  return buttonText.trim();
}

function validateSections(sections: ListSection[]): ListSection[] {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('Seções são obrigatórias');
  }
  if (sections.length > 10) {
    throw new Error('Máximo de 10 seções permitidas');
  }
  
  sections.forEach((section, sectionIndex) => {
    if (!section.title) {
      throw new Error(`Seção ${sectionIndex + 1}: título é obrigatório`);
    }
    if (!Array.isArray(section.rows) || section.rows.length === 0) {
      throw new Error(`Seção ${sectionIndex + 1}: deve conter pelo menos uma linha`);
    }
    if (section.rows.length > 10) {
      throw new Error(`Seção ${sectionIndex + 1}: máximo de 10 linhas por seção`);
    }
    
    section.rows.forEach((row, rowIndex) => {
      if (!row.id || !row.title) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: id e title são obrigatórios`);
      }
      if (row.description && row.description.length > 72) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: descrição excede 72 caracteres`);
      }
    });
  });
  
  return sections;
}

// Dados da lista com validação
const listData: SendListRequest = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Selecione um departamento para continuar seu atendimento.'),
  buttonText: validateButtonText('Ver Departamentos'),
  sections: validateSections([
    {
      title: 'Atendimento',
      rows: [
        { id: 'falar_vendas', title: 'Comercial' },
        { id: 'falar_suporte', title: 'Suporte Técnico' },
        { id: 'falar_financeiro', title: 'Financeiro' },
      ],
    },
  ]),
};

// Função para enviar lista
async function sendList(): Promise<SendListResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-list`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(listData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendList()
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
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

def sanitize_message(message: str) -> str:
    """Valida e sanitiza mensagem."""
    if not message or not message.strip():
        raise ValueError("Mensagem não pode estar vazia")
    if len(message) > 4096:
        raise ValueError("Mensagem excede limite de 4096 caracteres")
    return message.strip()

def validate_button_text(button_text: str) -> str:
    """Valida texto do botão."""
    if not button_text or not button_text.strip():
        raise ValueError("Texto do botão é obrigatório")
    if len(button_text) > 20:
        raise ValueError("Texto do botão excede limite de 20 caracteres")
    return button_text.strip()

def validate_sections(sections: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida estrutura de seções."""
    if not sections or len(sections) == 0:
        raise ValueError("Seções são obrigatórias e devem conter pelo menos uma seção")
    if len(sections) > 10:
        raise ValueError("Máximo de 10 seções permitidas")
    
    for section_idx, section in enumerate(sections):
        if not section.get("title"):
            raise ValueError(f"Seção {section_idx + 1}: título é obrigatório")
        rows = section.get("rows", [])
        if not rows or len(rows) == 0:
            raise ValueError(f"Seção {section_idx + 1}: deve conter pelo menos uma linha")
        if len(rows) > 10:
            raise ValueError(f"Seção {section_idx + 1}: máximo de 10 linhas por seção")
        
        for row_idx, row in enumerate(rows):
            if not row.get("id"):
                raise ValueError(f"Seção {section_idx + 1}, linha {row_idx + 1}: id é obrigatório")
            if not row.get("title"):
                raise ValueError(f"Seção {section_idx + 1}, linha {row_idx + 1}: title é obrigatório")
            if row.get("description") and len(row["description"]) > 72:
                raise ValueError(f"Seção {section_idx + 1}, linha {row_idx + 1}: descrição excede 72 caracteres")
    
    return sections

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-list"

# Dados da lista com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "message": sanitize_message("Selecione um departamento para continuar seu atendimento."),
        "buttonText": validate_button_text("Ver Departamentos"),
        "sections": validate_sections([
            {
                "title": "Atendimento",
                "rows": [
                    {"id": "falar_vendas", "title": "Comercial"},
                    {"id": "falar_suporte", "title": "Suporte Técnico"},
                    {"id": "falar_financeiro", "title": "Financeiro"},
                ],
            },
        ]),
    }
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
    print(f"Lista enviada. MessageId: {result.get('messageId')}")
    
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
MESSAGE="Selecione um departamento para continuar seu atendimento."
BUTTON_TEXT="Ver Departamentos"

# Enviar lista de opções via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-list" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"${MESSAGE}\",
    \"buttonText\": \"${BUTTON_TEXT}\",
    \"sections\": [
      {
        \"title\": \"Atendimento\",
        \"rows\": [
          {\"id\": \"falar_vendas\", \"title\": \"Comercial\"},
          {\"id\": \"falar_suporte\", \"title\": \"Suporte Técnico\"},
          {\"id\": \"falar_financeiro\", \"title\": \"Financeiro\"}
        ]
      }
    ]
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

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

function validateButtonText(buttonText) {
  if (!buttonText || typeof buttonText !== 'string' || buttonText.trim().length === 0) {
    throw new Error('Texto do botão é obrigatório');
  }
  if (buttonText.length > 20) {
    throw new Error('Texto do botão excede limite de 20 caracteres');
  }
  return buttonText.trim();
}

function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('Seções são obrigatórias e devem conter pelo menos uma seção');
  }
  if (sections.length > 10) {
    throw new Error('Máximo de 10 seções permitidas');
  }
  
  sections.forEach((section, sectionIndex) => {
    if (!section.title || typeof section.title !== 'string') {
      throw new Error(`Seção ${sectionIndex + 1}: título é obrigatório`);
    }
    if (!Array.isArray(section.rows) || section.rows.length === 0) {
      throw new Error(`Seção ${sectionIndex + 1}: deve conter pelo menos uma linha`);
    }
    if (section.rows.length > 10) {
      throw new Error(`Seção ${sectionIndex + 1}: máximo de 10 linhas por seção`);
    }
    
    section.rows.forEach((row, rowIndex) => {
      if (!row.id || typeof row.id !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: id é obrigatório`);
      }
      if (!row.title || typeof row.title !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: title é obrigatório`);
      }
      if (row.description && row.description.length > 72) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: descrição excede 72 caracteres`);
      }
    });
  });
  
  return sections;
}

// Dados da lista com validação
const listData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Selecione um departamento para continuar seu atendimento.'),
  buttonText: validateButtonText('Ver Departamentos'),
  sections: validateSections([
    {
      title: 'Atendimento',
      rows: [
        { id: 'falar_vendas', title: 'Comercial' },
        { id: 'falar_suporte', title: 'Suporte Técnico' },
        { id: 'falar_financeiro', title: 'Financeiro' },
      ],
    },
  ]),
};

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-list`);
const postData = JSON.stringify(listData);

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
      console.log('Lista enviada. MessageId:', result.messageId);
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

function validateButtonText(buttonText) {
  if (!buttonText || typeof buttonText !== 'string' || buttonText.trim().length === 0) {
    throw new Error('Texto do botão é obrigatório');
  }
  if (buttonText.length > 20) {
    throw new Error('Texto do botão excede limite de 20 caracteres');
  }
  return buttonText.trim();
}

function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('Seções são obrigatórias e devem conter pelo menos uma seção');
  }
  if (sections.length > 10) {
    throw new Error('Máximo de 10 seções permitidas');
  }
  
  sections.forEach((section, sectionIndex) => {
    if (!section.title || typeof section.title !== 'string') {
      throw new Error(`Seção ${sectionIndex + 1}: título é obrigatório`);
    }
    if (!Array.isArray(section.rows) || section.rows.length === 0) {
      throw new Error(`Seção ${sectionIndex + 1}: deve conter pelo menos uma linha`);
    }
    if (section.rows.length > 10) {
      throw new Error(`Seção ${sectionIndex + 1}: máximo de 10 linhas por seção`);
    }
    
    section.rows.forEach((row, rowIndex) => {
      if (!row.id || typeof row.id !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: id é obrigatório`);
      }
      if (!row.title || typeof row.title !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: title é obrigatório`);
      }
      if (row.description && row.description.length > 72) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: descrição excede 72 caracteres`);
      }
    });
  });
  
  return sections;
}

// Rota para enviar lista de opções
app.post('/send-list', async (req, res) => {
  try {
    // Dados da lista com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawMessage = req.body.message || 'Selecione um departamento para continuar seu atendimento.';
    const rawButtonText = req.body.buttonText || 'Ver Departamentos';
    const rawSections = req.body.sections || [
      {
        title: 'Atendimento',
        rows: [
          { id: 'falar_vendas', title: 'Comercial' },
          { id: 'falar_suporte', title: 'Suporte Técnico' },
          { id: 'falar_financeiro', title: 'Financeiro' },
        ],
      },
    ];

    const listData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      buttonText: validateButtonText(rawButtonText),
      sections: validateSections(rawSections),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-list`);
    const postData = JSON.stringify(listData);

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
    console.error('Erro ao enviar lista:', error.message);
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

function validateButtonText(buttonText) {
  if (!buttonText || typeof buttonText !== 'string' || buttonText.trim().length === 0) {
    throw new Error('Texto do botão é obrigatório');
  }
  if (buttonText.length > 20) {
    throw new Error('Texto do botão excede limite de 20 caracteres');
  }
  return buttonText.trim();
}

function validateSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('Seções são obrigatórias e devem conter pelo menos uma seção');
  }
  if (sections.length > 10) {
    throw new Error('Máximo de 10 seções permitidas');
  }
  
  sections.forEach((section, sectionIndex) => {
    if (!section.title || typeof section.title !== 'string') {
      throw new Error(`Seção ${sectionIndex + 1}: título é obrigatório`);
    }
    if (!Array.isArray(section.rows) || section.rows.length === 0) {
      throw new Error(`Seção ${sectionIndex + 1}: deve conter pelo menos uma linha`);
    }
    if (section.rows.length > 10) {
      throw new Error(`Seção ${sectionIndex + 1}: máximo de 10 linhas por seção`);
    }
    
    section.rows.forEach((row, rowIndex) => {
      if (!row.id || typeof row.id !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: id é obrigatório`);
      }
      if (!row.title || typeof row.title !== 'string') {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: title é obrigatório`);
      }
      if (row.description && row.description.length > 72) {
        throw new Error(`Seção ${sectionIndex + 1}, linha ${rowIndex + 1}: descrição excede 72 caracteres`);
      }
    });
  });
  
  return sections;
}

// Rota para enviar lista de opções
router.post('/send-list', async (ctx) => {
  try {
    // Dados da lista com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawMessage = ctx.request.body.message || 'Selecione um departamento para continuar seu atendimento.';
    const rawButtonText = ctx.request.body.buttonText || 'Ver Departamentos';
    const rawSections = ctx.request.body.sections || [
      {
        title: 'Atendimento',
        rows: [
          { id: 'falar_vendas', title: 'Comercial' },
          { id: 'falar_suporte', title: 'Suporte Técnico' },
          { id: 'falar_financeiro', title: 'Financeiro' },
        ],
      },
    ];

    const listData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      buttonText: validateButtonText(rawButtonText),
      sections: validateSections(rawSections),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-list`);
    const postData = JSON.stringify(listData);

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
  console.error('Erro ao enviar lista:', err.message);
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SendList {
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

    private static String sanitizeMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Mensagem não pode estar vazia");
        }
        if (message.length() > 4096) {
            throw new IllegalArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return message.trim();
    }

    private static String validateButtonText(String buttonText) {
        if (buttonText == null || buttonText.trim().isEmpty()) {
            throw new IllegalArgumentException("Texto do botão é obrigatório");
        }
        if (buttonText.length() > 20) {
            throw new IllegalArgumentException("Texto do botão excede limite de 20 caracteres");
        }
        return buttonText.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da lista com validação
            String phone = validatePhoneNumber("5511999999999");
            String message = sanitizeMessage("Selecione um departamento para continuar seu atendimento.");
            String buttonText = validateButtonText("Ver Departamentos");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-list",
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
            String jsonInputString = String.format(
                "{\"phone\":\"%s\",\"message\":\"%s\",\"buttonText\":\"%s\",\"sections\":[{\"title\":\"Atendimento\",\"rows\":[{\"id\":\"falar_vendas\",\"title\":\"Comercial\"},{\"id\":\"falar_suporte\",\"title\":\"Suporte Técnico\"},{\"id\":\"falar_financeiro\",\"title\":\"Financeiro\"}]}]}",
                phone.replace("\"", "\\\""),
                message.replace("\"", "\\\""),
                buttonText.replace("\"", "\\\"")
            );

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
                    System.out.println("Lista enviada. Response: " + response.toString());
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
using System.Collections.Generic;

class SendList
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

    private static string SanitizeMessage(string message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException("Mensagem não pode estar vazia");
        }
        if (message.Length > 4096)
        {
            throw new ArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return message.Trim();
    }

    private static string ValidateButtonText(string buttonText)
    {
        if (string.IsNullOrWhiteSpace(buttonText))
        {
            throw new ArgumentException("Texto do botão é obrigatório");
        }
        if (buttonText.Length > 20)
        {
            throw new ArgumentException("Texto do botão excede limite de 20 caracteres");
        }
        return buttonText.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados da lista com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string message = SanitizeMessage("Selecione um departamento para continuar seu atendimento.");
            string buttonText = ValidateButtonText("Ver Departamentos");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-list";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    message = message,
                    buttonText = buttonText,
                    sections = new[]
                    {
                        new
                        {
                            title = "Atendimento",
                            rows = new[]
                            {
                                new { id = "falar_vendas", title = "Comercial" },
                                new { id = "falar_suporte", title = "Suporte Técnico" },
                                new { id = "falar_financeiro", title = "Financeiro" }
                            }
                        }
                    }
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Lista enviada. Response: {result}");
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

func sanitizeMessage(message string) (string, error) {
    trimmed := strings.TrimSpace(message)
    if trimmed == "" {
        return "", fmt.Errorf("mensagem não pode estar vazia")
    }
    if len(trimmed) > 4096 {
        return "", fmt.Errorf("mensagem excede limite de 4096 caracteres")
    }
    return trimmed, nil
}

func validateButtonText(buttonText string) (string, error) {
    trimmed := strings.TrimSpace(buttonText)
    if trimmed == "" {
        return "", fmt.Errorf("texto do botão é obrigatório")
    }
    if len(trimmed) > 20 {
        return "", fmt.Errorf("texto do botão excede limite de 20 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados da lista com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("Selecione um departamento para continuar seu atendimento.")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    buttonText, err := validateButtonText("Ver Departamentos")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-list",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]interface{}{
        "phone":     phone,
        "message":   message,
        "buttonText": buttonText,
        "sections": []map[string]interface{}{
            {
                "title": "Atendimento",
                "rows": []map[string]string{
                    {"id": "falar_vendas", "title": "Comercial"},
                    {"id": "falar_suporte", "title": "Suporte Técnico"},
                    {"id": "falar_financeiro", "title": "Financeiro"},
                },
            },
        },
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
            fmt.Printf("Lista enviada. MessageId: %v\n", result["messageId"])
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

function sanitizeMessage($message) {
    if (empty(trim($message))) {
        throw new InvalidArgumentException('Mensagem não pode estar vazia');
    }
    if (strlen($message) > 4096) {
        throw new InvalidArgumentException('Mensagem excede limite de 4096 caracteres');
    }
    return trim($message);
}

function validateButtonText($buttonText) {
    if (empty(trim($buttonText))) {
        throw new InvalidArgumentException('Texto do botão é obrigatório');
    }
    if (strlen($buttonText) > 20) {
        throw new InvalidArgumentException('Texto do botão excede limite de 20 caracteres');
    }
    return trim($buttonText);
}

try {
    // Dados da lista com validação
    $phone = validatePhoneNumber('5511999999999');
    $message = sanitizeMessage('Selecione um departamento para continuar seu atendimento.');
    $buttonText = validateButtonText('Ver Departamentos');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-list',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => $message,
        'buttonText' => $buttonText,
        'sections' => [
            [
                'title' => 'Atendimento',
                'rows' => [
                    ['id' => 'falar_vendas', 'title' => 'Comercial'],
                    ['id' => 'falar_suporte', 'title' => 'Suporte Técnico'],
                    ['id' => 'falar_financeiro', 'title' => 'Financeiro'],
                ],
            ],
        ],
    ];

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
        echo "Lista enviada. MessageId: " . $result['messageId'] . "\n";
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

def sanitize_message(message)
  trimmed = message.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Mensagem não pode estar vazia'
  end
  if trimmed.length > 4096
    raise ArgumentError, 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

def validate_button_text(button_text)
  trimmed = button_text.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Texto do botão é obrigatório'
  end
  if trimmed.length > 20
    raise ArgumentError, 'Texto do botão excede limite de 20 caracteres'
  end
  trimmed
end

begin
  # Dados da lista com validação
  phone = validate_phone_number('5511999999999')
  message = sanitize_message('Selecione um departamento para continuar seu atendimento.')
  button_text = validate_button_text('Ver Departamentos')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-list")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = JSON.generate({
    phone: phone,
    message: message,
    buttonText: button_text,
    sections: [
      {
        title: 'Atendimento',
        rows: [
          { id: 'falar_vendas', title: 'Comercial' },
          { id: 'falar_suporte', title: 'Suporte Técnico' },
          { id: 'falar_financeiro', title: 'Financeiro' }
        ]
      }
    ]
  })

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Lista enviada. MessageId: #{result['messageId']}"
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

func sanitizeMessage(_ message: String) throws -> String {
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Mensagem não pode estar vazia"])
    }
    if trimmed.count > 4096 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 4096 caracteres"])
    }
    return trimmed
}

func validateButtonText(_ buttonText: String) throws -> String {
    let trimmed = buttonText.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Texto do botão é obrigatório"])
    }
    if trimmed.count > 20 {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "Texto do botão excede limite de 20 caracteres"])
    }
    return trimmed
}

// Dados da lista com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let message = try sanitizeMessage("Selecione um departamento para continuar seu atendimento.")
    let buttonText = try validateButtonText("Ver Departamentos")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-list"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    let payload: [String: Any] = [
        "phone": phone,
        "message": message,
        "buttonText": buttonText,
        "sections": [
            [
                "title": "Atendimento",
                "rows": [
                    ["id": "falar_vendas", "title": "Comercial"],
                    ["id": "falar_suporte", "title": "Suporte Técnico"],
                    ["id": "falar_financeiro", "title": "Financeiro"]
                ]
            ]
        ]
    ]
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
                    print("Lista enviada. MessageId: \(messageId)")
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

function Sanitize-Message {
    param([string]$Message)
    $trimmed = $Message.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Mensagem não pode estar vazia"
    }
    if ($trimmed.Length -gt 4096) {
        throw "Mensagem excede limite de 4096 caracteres"
    }
    return $trimmed
}

function Validate-ButtonText {
    param([string]$ButtonText)
    $trimmed = $ButtonText.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Texto do botão é obrigatório"
    }
    if ($trimmed.Length -gt 20) {
        throw "Texto do botão excede limite de 20 caracteres"
    }
    return $trimmed
}

try {
    # Dados da lista com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $message = Sanitize-Message -Message "Selecione um departamento para continuar seu atendimento."
    $buttonText = Validate-ButtonText -ButtonText "Ver Departamentos"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-list"

    $body = @{
        phone = $phone
        message = $message
        buttonText = $buttonText
        sections = @(
            @{
                title = "Atendimento"
                rows = @(
                    @{ id = "falar_vendas"; title = "Comercial" }
                    @{ id = "falar_suporte"; title = "Suporte Técnico" }
                    @{ id = "falar_financeiro"; title = "Financeiro" }
                )
            }
        )
    } | ConvertTo-Json -Depth 10

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Lista enviada. MessageId: $($response.messageId)"

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
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-list HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 245

{
  "phone": "5511999999999",
  "message": "Selecione um departamento para continuar seu atendimento.",
  "buttonText": "Ver Departamentos",
  "sections": [
    {
      "title": "Atendimento",
      "rows": [
        {"id": "falar_vendas", "title": "Comercial"},
        {"id": "falar_suporte", "title": "Suporte Técnico"},
        {"id": "falar_financeiro", "title": "Financeiro"}
      ]
    }
  ]
}
```

**Note:** This is an example of a raw HTTP request. In production:
- ⚠️ **SECURITY:** Replace `SUA_INSTANCIA`, `SEU_TOKEN` and `SEU_CLIENT_TOKEN` with real values from environment variables
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate `phone` (only numbers, 10-15 digits), `message` (not empty, max 4096 characters), `buttonText` (not empty, max 20 characters) and `sections` (valid structure) before sending

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

std::string sanitizeMessage(const std::string& message) {
    std::string trimmed = message;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::invalid_argument("Mensagem não pode estar vazia");
    }
    if (trimmed.length() > 4096) {
        throw std::invalid_argument("Mensagem excede limite de 4096 caracteres");
    }
    return trimmed;
}

std::string validateButtonText(const std::string& buttonText) {
    std::string trimmed = buttonText;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::invalid_argument("Texto do botão é obrigatório");
    }
    if (trimmed.length() > 20) {
        throw std::invalid_argument("Texto do botão excede limite de 20 caracteres");
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

        // Dados da lista com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string message = sanitizeMessage("Selecione um departamento para continuar seu atendimento.");
        std::string buttonText = validateButtonText("Ver Departamentos");

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-list";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"message\":\"" + message + "\",\"buttonText\":\"" + buttonText + "\",\"sections\":[{\"title\":\"Atendimento\",\"rows\":[{\"id\":\"falar_vendas\",\"title\":\"Comercial\"},{\"id\":\"falar_suporte\",\"title\":\"Suporte Técnico\"},{\"id\":\"falar_financeiro\",\"title\":\"Financeiro\"}]}]}";

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
            std::cout << "Lista enviada. Response: " << responseData << std::endl;
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
g++ -o send_list send_list.cpp -lcurl
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

int sanitizeMessage(const char* message, char* sanitized) {
    int start = 0;
    int end = strlen(message) - 1;
    
    while (isspace(message[start]) && message[start] != '\0') start++;
    while (end > start && isspace(message[end])) end--;
    
    if (start > end) {
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    if (len > 4096) {
        return -1; // Muito longo
    }
    
    strncpy(sanitized, message + start, len);
    sanitized[len] = '\0';
    return 1; // Válido
}

int validateButtonText(const char* buttonText, char* validated) {
    int start = 0;
    int end = strlen(buttonText) - 1;
    
    while (isspace(buttonText[start]) && buttonText[start] != '\0') start++;
    while (end > start && isspace(buttonText[end])) end--;
    
    if (start > end) {
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    if (len > 20) {
        return -1; // Muito longo
    }
    
    strncpy(validated, buttonText + start, len);
    validated[len] = '\0';
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

    // Dados da lista com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    char message[4100];
    int msgResult = sanitizeMessage("Selecione um departamento para continuar seu atendimento.", message);
    if (msgResult == 0) {
        fprintf(stderr, "Erro de validação: Mensagem não pode estar vazia\n");
        return 1;
    } else if (msgResult == -1) {
        fprintf(stderr, "Erro de validação: Mensagem excede limite de 4096 caracteres\n");
        return 1;
    }

    char buttonText[25];
    int btnResult = validateButtonText("Ver Departamentos", buttonText);
    if (btnResult == 0) {
        fprintf(stderr, "Erro de validação: Texto do botão é obrigatório\n");
        return 1;
    } else if (btnResult == -1) {
        fprintf(stderr, "Erro de validação: Texto do botão excede limite de 20 caracteres\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-list", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[2048];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"message\":\"%s\",\"buttonText\":\"%s\",\"sections\":[{\"title\":\"Atendimento\",\"rows\":[{\"id\":\"falar_vendas\",\"title\":\"Comercial\"},{\"id\":\"falar_suporte\",\"title\":\"Suporte Técnico\"},{\"id\":\"falar_financeiro\",\"title\":\"Financeiro\"}]}]}",
             phone, message, buttonText);

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
        printf("Lista enviada. Response: %s\n", responseData);
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
gcc -o send_list send_list.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> API Response (Send)

If your send request is successful, you will receive the following response:

### Success (200 OK)

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Field | Type | Description |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | Unique ID of the message in Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message in WhatsApp. **Save this ID!** Use it to track delivery status through webhooks |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId`

**Important:**

- The `messageId` is the primary ID you should use to track the message
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking and Selections:**

To know when the message was delivered, read, or when an option was selected, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber#example-of-text-return-list-option).

## <Icon name="Link" size="md" /> See Also

### Related Documentation

- <Icon name="List" size="sm" /> [Options List](/docs/messages/lista-opcoes) - For more than 3 options or categories
- <Icon name="Send" size="sm" /> [Send Messages](/docs/messages/introducao) - Overview of message types
- <Icon name="Webhook" size="sm" /> [Webhooks](/docs/webhooks/introducao) - Receive user responses