---
id: botoes
sidebar_position: 20
title: Send Quick Response Buttons
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MousePointerClick" size="lg" /> Send Message with Quick Response Buttons

Quick response buttons are one of the most effective ways to create interactive conversations. Instead of asking the user to type a reply, you offer clear and direct options that they can simply tap to select.

:::info What Are Quick Response Buttons?
They appear below a text message and once the user clicks on one of them, the buttons disappear. They are ideal for direct questions and to guide the user through an automation flow.
:::

:::caution Caution

Quick response button sends currently available but have some decisive factors for functionality. For more details, visit the topic [Button Functioning](/docs/tips/funcionamento-botoes).

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Satisfaction Surveys:** "Were you satisfied with the service?" with buttons "Yes" and "No".
- **Simple Confirmation:** "Can we confirm your appointment for tomorrow at 3 PM?" with buttons "Confirm" and "Reschedule".
- **Service Menus:** "How can I help?" with buttons "Talk to Support", "View Products" and "Order Status".
- **Lead Qualification:** "Are you already using any automation tool?" with buttons "Yes, I am using it" and "No, just starting".

---

## <Icon name="Workflow" size="md" /> The Interaction Flow with Buttons

Understanding the full cycle is crucial for creating effective automations:

1. **Send:** You send a text message.
2. **Click:** The user reads the message and clicks on one of the buttons.
3. **Webhook:** The user's click generates an event. Z-API captures this event and sends a notification (a **webhook**) to your system.
4. **Action:** Your system receives the webhook, identifies which button was clicked through the `buttonId`, and executes the next action (e.g., send another message, save information in the database, etc.).

![Example of a message with buttons](/img/send-button-list.jpeg)

---

## <Icon name="Wand2" size="md" /> For No-Code Users

In your automation platform, creating a message with buttons involves two parts:

### Required Fields

1. **`phone`**: The full contact number in the format: DDI + DDD + Number (e.g., `5511999999999`). **Important:** Use only numbers, without formatting or mask.

2. **`message`**: The text of the question that will appear above the buttons (e.g., "Do you want to receive our promotions?"). **Important:** This field cannot be sent empty!

3. **`buttonList`**: An object that contains the list of buttons. Within it, you will configure:
   - **`buttons`**: A list (array) of buttons. Each button will have:
     - **`label`** (required): The text that appears on the button (e.g., "Yes, I want!", "No, thank you"). Maximum of 20 characters.
     - **`id`** (optional but recommended): A unique identifier (e.g., `aceitar_promocoes`, `recusar_promocoes`). **This is the value your automation will use to know which button was clicked.**

### Optional Fields

4. **`delayMessage`**: Delay in seconds (1-15 seconds) before sending the message. If not specified, the default delay is 1-3 seconds.

### Practical Example for No-Code

```json
{
  "phone": "5511999999999",
  "message": "Deseja receber nossas promoções?",
  "buttonList": {
    "buttons": [
      {
        "id": "aceitar_promocoes",
        "label": "Sim, quero!"
      },
      {
        "id": "recusar_promocoes",
        "label": "Não, obrigado"
      }
    ]
  }
}
```

### Create the Trigger to Receive Responses

After the send node, you will create a new trigger that "listens" for responses:

1. **Configure a webhook** that receives events from Z-API
2. **Create conditional logic** (like an "IF" or "Switch") based on the value of `buttonId` that comes in the webhook
3. **Actions based on the clicked button:**
   - **If** `buttonId` is `aceitar_promocoes`, **then** send the welcome message and add the contact to the promotions list
   - **If** `buttonId` is `recusar_promocoes`, **then** send a thank you message

**Important Tips:**

- **Button Text**: Each button can have at most 20 characters
- **Message Text**: The main message can have up to 1024 characters
- **Unique Identifiers**: Use `id` descriptive and unique for easier identification in the webhook
- **Buttons Disappear**: After the user clicks a button, all buttons disappear from the conversation

**Common Use Cases:**

- **Satisfaction Surveys**: "Were you satisfied with the service?" with buttons "Yes" and "No"
- **Simple Confirmation**: "Can we confirm your appointment for tomorrow at 3 PM?" with buttons "Confirm" and "Reschedule"
- **Service Menus**: "How can I help?" with buttons "Talk to Support", "View Products" and "Order Status"
- **Lead Qualification**: "Are you already using any automation tool?" with buttons "Yes, I am using it" and "No, just starting"

---

## <Icon name="Code" size="md" /> For Developers

To send a message with buttons, make an `POST` request to the endpoint below.

### Endpoint

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list
```

### Body Structure

The request body contains the phone number, message, and an object `buttonList` with an array `buttons` containing the objects of each button.

```json
{
  "phone": "5511999999999",
  "message": "Gostaria de agendar uma demonstração?",
  "buttonList": {
    "buttons": [
      {
        "id": "agendar_sim",
        "label": "Sim, por favor"
      },
      {
        "id": "agendar_nao",
        "label": "Agora não"
      }
    ]
  }
}
```

:::important Important

The `message` attribute cannot be sent empty!

:::

#### Structure of the `buttonList`

| Field | Type | Required | Description |
|:------ |:----- |:---------- |:----------------------------------------------------------------------- |
| `buttons` | array | Yes | List of buttons to be sent |

#### The Object `button`

| Field | Type | Required | Description |
|:------ |:----- |:---------- |:----------------------------------------------------------------------- |
| `label` | string | Yes | The text that will be displayed on the button. Max. 20 characters. |
| `id` | string | No | Unique identifier of the button (used in the webhook to identify which button was clicked). Max. 256 characters. |

### Limits

- **Button Text:** 20 characters.
- **Message Text:** 1024 characters.

---

### Receiving User Responses

When the user clicks a button, you will receive a notification via webhook with the following structure:

```json
{
 // ... outros dados do webhook
 "buttonId": "agendar_sim",
 "buttonText": "Sim, por favor",
 "phone": "5511999999999"
 // ...
}
```

Use the `buttonId` in your backend to determine the next step of the conversation flow.

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
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (trimmed.length > 1024) {
    throw new Error('Mensagem excede o limite de 1024 caracteres');
  }
  return trimmed;
}

function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Botões são obrigatórios e devem conter pelo menos um botão');
  }
  
  buttons.forEach((button, index) => {
    if (!button.id || typeof button.id !== 'string') {
      throw new Error(`Botão ${index + 1}: id é obrigatório`);
    }
    if (button.id.length > 256) {
      throw new Error(`Botão ${index + 1}: id excede limite de 256 caracteres`);
    }
    if (!button.text || typeof button.text !== 'string') {
      throw new Error(`Botão ${index + 1}: text é obrigatório`);
    }
    const textTrimmed = button.text.trim();
    if (textTrimmed.length === 0) {
      throw new Error(`Botão ${index + 1}: text não pode estar vazio`);
    }
    if (textTrimmed.length > 20) {
      throw new Error(`Botão ${index + 1}: text excede limite de 20 caracteres`);
    }
  });
  
  return buttons.map(btn => ({
    id: btn.id,
    text: btn.text.trim(),
  }));
}

// Dados dos botões com validação
const buttonsData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Sua fatura deste mês já está disponível. Deseja visualizá-la?'),
  buttons: validateButtons([
    { id: 'ver_fatura', text: 'Ver Fatura' },
    { id: 'falar_atendente', text: 'Falar com Atendente' },
  ]),
};

// Enviar requisição com tratamento seguro de erros
async function sendButtons() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-buttons`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(buttonsData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Botões enviados com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar botões:', error.message);
    throw error;
  }
}

// Executar função
sendButtons();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface Button {
  id: string;
  text: string;
}

interface SendButtonsRequest {
  phone: string;
  message: string;
  buttons: Button[];
}

interface SendButtonsResponse {
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
  const trimmed = message.trim();
  if (trimmed.length > 1024) {
    throw new Error('Mensagem excede limite de 1024 caracteres');
  }
  return trimmed;
}

function validateButtons(buttons: Button[]): Button[] {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Botões são obrigatórios');
  }
  
  buttons.forEach((button, index) => {
    if (!button.id || button.id.length > 256) {
      throw new Error(`Botão ${index + 1}: id inválido (máx. 256 caracteres)`);
    }
    if (!button.text || button.text.trim().length === 0) {
      throw new Error(`Botão ${index + 1}: text é obrigatório`);
    }
    if (button.text.trim().length > 20) {
      throw new Error(`Botão ${index + 1}: text excede limite de 20 caracteres`);
    }
  });
  
  return buttons.map(btn => ({
    id: btn.id,
    text: btn.text.trim(),
  }));
}

// Dados dos botões com validação
const buttonsData: SendButtonsRequest = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Sua fatura deste mês já está disponível. Deseja visualizá-la?'),
  buttons: validateButtons([
    { id: 'ver_fatura', text: 'Ver Fatura' },
    { id: 'falar_atendente', text: 'Falar com Atendente' },
  ]),
};

// Função para enviar botões
async function sendButtons(): Promise<SendButtonsResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-buttons`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(buttonsData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendButtons()
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
    trimmed = message.strip()
    if len(trimmed) > 1024:
        raise ValueError("Mensagem excede limite de 1024 caracteres")
    return trimmed

def validate_buttons(buttons: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Valida estrutura de botões."""
    if not buttons or len(buttons) == 0:
        raise ValueError("Botões são obrigatórios e devem conter pelo menos um botão")
    
    for idx, button in enumerate(buttons):
        if not button.get("id"):
            raise ValueError(f"Botão {idx + 1}: id é obrigatório")
        if len(button["id"]) > 256:
            raise ValueError(f"Botão {idx + 1}: id excede limite de 256 caracteres")
        if not button.get("text"):
            raise ValueError(f"Botão {idx + 1}: text é obrigatório")
        text_trimmed = button["text"].strip()
        if len(text_trimmed) == 0:
            raise ValueError(f"Botão {idx + 1}: text não pode estar vazio")
        if len(text_trimmed) > 20:
            raise ValueError(f"Botão {idx + 1}: text excede limite de 20 caracteres")
    
    return [{"id": btn["id"], "text": btn["text"].strip()} for btn in buttons]

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-buttons"

# Dados dos botões com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "message": sanitize_message("Sua fatura deste mês já está disponível. Deseja visualizá-la?"),
        "buttons": validate_buttons([
            {"id": "ver_fatura", "text": "Ver Fatura"},
            {"id": "falar_atendente", "text": "Falar com Atendente"},
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
    print(f"Botões enviados. MessageId: {result.get('messageId')}")
    
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
MESSAGE="Sua fatura deste mês já está disponível. Deseja visualizá-la?"

# Enviar botões via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-buttons" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"${MESSAGE}\",
    \"buttons\": [
      {\"id\": \"ver_fatura\", \"text\": \"Ver Fatura\"},
      {\"id\": \"falar_atendente\", \"text\": \"Falar com Atendente\"}
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
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (trimmed.length > 1024) {
    throw new Error('Mensagem excede o limite de 1024 caracteres');
  }
  return trimmed;
}

function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Botões são obrigatórios e devem conter pelo menos um botão');
  }
  
  buttons.forEach((button, index) => {
    if (!button.id || typeof button.id !== 'string') {
      throw new Error(`Botão ${index + 1}: id é obrigatório`);
    }
    if (button.id.length > 256) {
      throw new Error(`Botão ${index + 1}: id excede limite de 256 caracteres`);
    }
    if (!button.text || typeof button.text !== 'string') {
      throw new Error(`Botão ${index + 1}: text é obrigatório`);
    }
    const textTrimmed = button.text.trim();
    if (textTrimmed.length === 0) {
      throw new Error(`Botão ${index + 1}: text não pode estar vazio`);
    }
    if (textTrimmed.length > 20) {
      throw new Error(`Botão ${index + 1}: text excede limite de 20 caracteres`);
    }
  });
  
  return buttons.map(btn => ({
    id: btn.id,
    text: btn.text.trim(),
  }));
}

// Dados dos botões com validação
const buttonsData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Sua fatura deste mês já está disponível. Deseja visualizá-la?'),
  buttons: validateButtons([
    { id: 'ver_fatura', text: 'Ver Fatura' },
    { id: 'falar_atendente', text: 'Falar com Atendente' },
  ]),
};

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-buttons`);
const postData = JSON.stringify(buttonsData);

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
      console.log('Botões enviados. MessageId:', result.messageId);
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
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (trimmed.length > 1024) {
    throw new Error('Mensagem excede o limite de 1024 caracteres');
  }
  return trimmed;
}

function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Botões são obrigatórios e devem conter pelo menos um botão');
  }
  
  buttons.forEach((button, index) => {
    if (!button.id || typeof button.id !== 'string') {
      throw new Error(`Botão ${index + 1}: id é obrigatório`);
    }
    if (button.id.length > 256) {
      throw new Error(`Botão ${index + 1}: id excede limite de 256 caracteres`);
    }
    if (!button.text || typeof button.text !== 'string') {
      throw new Error(`Botão ${index + 1}: text é obrigatório`);
    }
    const textTrimmed = button.text.trim();
    if (textTrimmed.length === 0) {
      throw new Error(`Botão ${index + 1}: text não pode estar vazio`);
    }
    if (textTrimmed.length > 20) {
      throw new Error(`Botão ${index + 1}: text excede limite de 20 caracteres`);
    }
  });
  
  return buttons.map(btn => ({
    id: btn.id,
    text: btn.text.trim(),
  }));
}

// Rota para enviar botões
app.post('/send-buttons', async (req, res) => {
  try {
    // Dados dos botões com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawMessage = req.body.message || 'Sua fatura deste mês já está disponível. Deseja visualizá-la?';
    const rawButtons = req.body.buttons || [
      { id: 'ver_fatura', text: 'Ver Fatura' },
      { id: 'falar_atendente', text: 'Falar com Atendente' }
    ];

    const buttonsData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      buttons: validateButtons(rawButtons),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-buttons`);
    const postData = JSON.stringify(buttonsData);

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
    console.error('Erro ao enviar botões:', error.message);
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
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (trimmed.length > 1024) {
    throw new Error('Mensagem excede o limite de 1024 caracteres');
  }
  return trimmed;
}

function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Botões são obrigatórios e devem conter pelo menos um botão');
  }
  
  buttons.forEach((button, index) => {
    if (!button.id || typeof button.id !== 'string') {
      throw new Error(`Botão ${index + 1}: id é obrigatório`);
    }
    if (button.id.length > 256) {
      throw new Error(`Botão ${index + 1}: id excede limite de 256 caracteres`);
    }
    if (!button.text || typeof button.text !== 'string') {
      throw new Error(`Botão ${index + 1}: text é obrigatório`);
    }
    const textTrimmed = button.text.trim();
    if (textTrimmed.length === 0) {
      throw new Error(`Botão ${index + 1}: text não pode estar vazio`);
    }
    if (textTrimmed.length > 20) {
      throw new Error(`Botão ${index + 1}: text excede limite de 20 caracteres`);
    }
  });
  
  return buttons.map(btn => ({
    id: btn.id,
    text: btn.text.trim(),
  }));
}

// Rota para enviar botões
router.post('/send-buttons', async (ctx) => {
  try {
    // Dados dos botões com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawMessage = ctx.request.body.message || 'Sua fatura deste mês já está disponível. Deseja visualizá-la?';
    const rawButtons = ctx.request.body.buttons || [
      { id: 'ver_fatura', text: 'Ver Fatura' },
      { id: 'falar_atendente', text: 'Falar com Atendente' }
    ];

    const buttonsData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      buttons: validateButtons(rawButtons),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-buttons`);
    const postData = JSON.stringify(buttonsData);

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
  console.error('Erro ao enviar botões:', err.message);
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
import java.util.List;

public class SendButtons {
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
        String trimmed = message.trim();
        if (trimmed.length() > 1024) {
            throw new IllegalArgumentException("Mensagem excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    private static List<String> validateButtons(List<String[]> buttons) {
        if (buttons == null || buttons.isEmpty()) {
            throw new IllegalArgumentException("Botões são obrigatórios");
        }
        
        List<String> validatedButtons = new ArrayList<>();
        for (int i = 0; i < buttons.size(); i++) {
            String[] button = buttons.get(i);
            if (button.length != 2 || button[0] == null || button[1] == null) {
                throw new IllegalArgumentException("Botão " + (i + 1) + ": id e text são obrigatórios");
            }
            String id = button[0];
            String text = button[1].trim();
            
            if (id.length() > 256) {
                throw new IllegalArgumentException("Botão " + (i + 1) + ": id excede limite de 256 caracteres");
            }
            if (text.isEmpty()) {
                throw new IllegalArgumentException("Botão " + (i + 1) + ": text não pode estar vazio");
            }
            if (text.length() > 20) {
                throw new IllegalArgumentException("Botão " + (i + 1) + ": text excede limite de 20 caracteres");
            }
            
            validatedButtons.add(String.format("{\"id\":\"%s\",\"text\":\"%s\"}", 
                id.replace("\"", "\\\""), text.replace("\"", "\\\"")));
        }
        return validatedButtons;
    }

    public static void main(String[] args) {
        try {
            // Dados dos botões com validação
            String phone = validatePhoneNumber("5511999999999");
            String message = sanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?");
            
            List<String[]> buttons = new ArrayList<>();
            buttons.add(new String[]{"ver_fatura", "Ver Fatura"});
            buttons.add(new String[]{"falar_atendente", "Falar com Atendente"});
            List<String> validatedButtons = validateButtons(buttons);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-buttons",
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
            String buttonsJson = "[" + String.join(",", validatedButtons) + "]";
            String jsonInputString = String.format(
                "{\"phone\":\"%s\",\"message\":\"%s\",\"buttons\":%s}",
                phone.replace("\"", "\\\""),
                message.replace("\"", "\\\""),
                buttonsJson
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
                    System.out.println("Botões enviados. Response: " + response.toString());
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
using System.Linq;

class SendButtons
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
        string trimmed = message.Trim();
        if (trimmed.Length > 1024)
        {
            throw new ArgumentException("Mensagem excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    private static List<object> ValidateButtons(List<(string id, string text)> buttons)
    {
        if (buttons == null || buttons.Count == 0)
        {
            throw new ArgumentException("Botões são obrigatórios");
        }
        
        return buttons.Select((btn, index) => {
            if (string.IsNullOrWhiteSpace(btn.id))
            {
                throw new ArgumentException($"Botão {index + 1}: id é obrigatório");
            }
            if (btn.id.Length > 256)
            {
                throw new ArgumentException($"Botão {index + 1}: id excede limite de 256 caracteres");
            }
            string textTrimmed = btn.text?.Trim() ?? "";
            if (textTrimmed.Length == 0)
            {
                throw new ArgumentException($"Botão {index + 1}: text é obrigatório");
            }
            if (textTrimmed.Length > 20)
            {
                throw new ArgumentException($"Botão {index + 1}: text excede limite de 20 caracteres");
            }
            return new { id = btn.id, text = textTrimmed };
        }).Cast<object>().ToList();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados dos botões com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string message = SanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?");
            var buttons = ValidateButtons(new List<(string, string)> {
                ("ver_fatura", "Ver Fatura"),
                ("falar_atendente", "Falar com Atendente")
            });

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-buttons";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    message = message,
                    buttons = buttons
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Botões enviados. Response: {result}");
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
    if len(trimmed) > 1024 {
        return "", fmt.Errorf("mensagem excede limite de 1024 caracteres")
    }
    return trimmed, nil
}

func validateButtons(buttons []map[string]string) ([]map[string]string, error) {
    if len(buttons) == 0 {
        return nil, fmt.Errorf("botões são obrigatórios e devem conter pelo menos um botão")
    }
    
    validated := make([]map[string]string, len(buttons))
    for i, btn := range buttons {
        id, ok := btn["id"]
        if !ok || id == "" {
            return nil, fmt.Errorf("botão %d: id é obrigatório", i+1)
        }
        if len(id) > 256 {
            return nil, fmt.Errorf("botão %d: id excede limite de 256 caracteres", i+1)
        }
        
        text, ok := btn["text"]
        if !ok || text == "" {
            return nil, fmt.Errorf("botão %d: text é obrigatório", i+1)
        }
        textTrimmed := strings.TrimSpace(text)
        if textTrimmed == "" {
            return nil, fmt.Errorf("botão %d: text não pode estar vazio", i+1)
        }
        if len(textTrimmed) > 20 {
            return nil, fmt.Errorf("botão %d: text excede limite de 20 caracteres", i+1)
        }
        
        validated[i] = map[string]string{
            "id":   id,
            "text": textTrimmed,
        }
    }
    return validated, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados dos botões com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    buttons, err := validateButtons([]map[string]string{
        {"id": "ver_fatura", "text": "Ver Fatura"},
        {"id": "falar_atendente", "text": "Falar com Atendente"},
    })
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-buttons",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]interface{}{
        "phone":    phone,
        "message":  message,
        "buttons":  buttons,
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
            fmt.Printf("Botões enviados. MessageId: %v\n", result["messageId"])
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
    $trimmed = trim($message);
    if (strlen($trimmed) > 1024) {
        throw new InvalidArgumentException('Mensagem excede limite de 1024 caracteres');
    }
    return $trimmed;
}

function validateButtons($buttons) {
    if (empty($buttons) || !is_array($buttons)) {
        throw new InvalidArgumentException('Botões são obrigatórios e devem conter pelo menos um botão');
    }
    
    foreach ($buttons as $index => $button) {
        if (empty($button['id'])) {
            throw new InvalidArgumentException("Botão " . ($index + 1) . ": id é obrigatório");
        }
        if (strlen($button['id']) > 256) {
            throw new InvalidArgumentException("Botão " . ($index + 1) . ": id excede limite de 256 caracteres");
        }
        if (empty($button['text'])) {
            throw new InvalidArgumentException("Botão " . ($index + 1) . ": text é obrigatório");
        }
        $textTrimmed = trim($button['text']);
        if (strlen($textTrimmed) === 0) {
            throw new InvalidArgumentException("Botão " . ($index + 1) . ": text não pode estar vazio");
        }
        if (strlen($textTrimmed) > 20) {
            throw new InvalidArgumentException("Botão " . ($index + 1) . ": text excede limite de 20 caracteres");
        }
        // Normalizar botão
        $buttons[$index] = [
            'id' => $button['id'],
            'text' => $textTrimmed
        ];
    }
    return $buttons;
}

try {
    // Dados dos botões com validação
    $phone = validatePhoneNumber('5511999999999');
    $message = sanitizeMessage('Sua fatura deste mês já está disponível. Deseja visualizá-la?');
    $buttons = validateButtons([
        ['id' => 'ver_fatura', 'text' => 'Ver Fatura'],
        ['id' => 'falar_atendente', 'text' => 'Falar com Atendente'],
    ]);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-buttons',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => $message,
        'buttons' => $buttons,
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
        echo "Botões enviados. MessageId: " . $result['messageId'] . "\n";
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
  if trimmed.length > 1024
    raise ArgumentError, 'Mensagem excede limite de 1024 caracteres'
  end
  trimmed
end

def validate_buttons(buttons)
  if buttons.nil? || buttons.empty?
    raise ArgumentError, 'Botões são obrigatórios e devem conter pelo menos um botão'
  end
  
  buttons.each_with_index do |button, index|
    if button[:id].nil? || button[:id].to_s.empty?
      raise ArgumentError, "Botão #{index + 1}: id é obrigatório"
    end
    if button[:id].to_s.length > 256
      raise ArgumentError, "Botão #{index + 1}: id excede limite de 256 caracteres"
    end
    if button[:text].nil? || button[:text].to_s.strip.empty?
      raise ArgumentError, "Botão #{index + 1}: text é obrigatório"
    end
    text_trimmed = button[:text].to_s.strip
    if text_trimmed.length > 20
      raise ArgumentError, "Botão #{index + 1}: text excede limite de 20 caracteres"
    end
  end
  
  buttons.map { |btn| { id: btn[:id].to_s, text: btn[:text].to_s.strip } }
end

begin
  # Dados dos botões com validação
  phone = validate_phone_number('5511999999999')
  message = sanitize_message('Sua fatura deste mês já está disponível. Deseja visualizá-la?')
  buttons = validate_buttons([
    { id: 'ver_fatura', text: 'Ver Fatura' },
    { id: 'falar_atendente', text: 'Falar com Atendente' }
  ])

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-buttons")

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
    buttons: buttons
  })

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Botões enviados. MessageId: #{result['messageId']}"
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
    if trimmed.count > 1024 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 1024 caracteres"])
    }
    return trimmed
}

func validateButtons(_ buttons: [[String: String]]) throws -> [[String: String]] {
    if buttons.isEmpty {
        throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Botões são obrigatórios"])
    }
    
    return try buttons.enumerated().map { index, button in
        guard let id = button["id"], !id.isEmpty else {
            throw NSError(domain: "ValidationError", code: 6, userInfo: [NSLocalizedDescriptionKey: "Botão \(index + 1): id é obrigatório"])
        }
        if id.count > 256 {
            throw NSError(domain: "ValidationError", code: 7, userInfo: [NSLocalizedDescriptionKey: "Botão \(index + 1): id excede limite de 256 caracteres"])
        }
        
        guard let text = button["text"] else {
            throw NSError(domain: "ValidationError", code: 8, userInfo: [NSLocalizedDescriptionKey: "Botão \(index + 1): text é obrigatório"])
        }
        let textTrimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        if textTrimmed.isEmpty {
            throw NSError(domain: "ValidationError", code: 9, userInfo: [NSLocalizedDescriptionKey: "Botão \(index + 1): text não pode estar vazio"])
        }
        if textTrimmed.count > 20 {
            throw NSError(domain: "ValidationError", code: 10, userInfo: [NSLocalizedDescriptionKey: "Botão \(index + 1): text excede limite de 20 caracteres"])
        }
        
        return ["id": id, "text": textTrimmed]
    }
}

// Dados dos botões com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let message = try sanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?")
    let buttons = try validateButtons([
        ["id": "ver_fatura", "text": "Ver Fatura"],
        ["id": "falar_atendente", "text": "Falar com Atendente"]
    ])

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-buttons"
    
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
        "buttons": buttons
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
                    print("Botões enviados. MessageId: \(messageId)")
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
    if ($trimmed.Length -gt 1024) {
        throw "Mensagem excede limite de 1024 caracteres"
    }
    return $trimmed
}

function Validate-Buttons {
    param([array]$Buttons)
    if ($Buttons -eq $null -or $Buttons.Length -eq 0) {
        throw "Botões são obrigatórios e devem conter pelo menos um botão"
    }
    
    for ($i = 0; $i -lt $Buttons.Length; $i++) {
        $button = $Buttons[$i]
        if ([string]::IsNullOrWhiteSpace($button.id)) {
            throw "Botão $($i + 1): id é obrigatório"
        }
        if ($button.id.Length -gt 256) {
            throw "Botão $($i + 1): id excede limite de 256 caracteres"
        }
        if ([string]::IsNullOrWhiteSpace($button.text)) {
            throw "Botão $($i + 1): text é obrigatório"
        }
        $textTrimmed = $button.text.Trim()
        if ($textTrimmed.Length -eq 0) {
            throw "Botão $($i + 1): text não pode estar vazio"
        }
        if ($textTrimmed.Length -gt 20) {
            throw "Botão $($i + 1): text excede limite de 20 caracteres"
        }
    }
    
    return $Buttons | ForEach-Object { @{ id = $_.id; text = $_.text.Trim() } }
}

try {
    # Dados dos botões com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $message = Sanitize-Message -Message "Sua fatura deste mês já está disponível. Deseja visualizá-la?"
    $buttons = Validate-Buttons -Buttons @(
        @{ id = "ver_fatura"; text = "Ver Fatura" }
        @{ id = "falar_atendente"; text = "Falar com Atendente" }
    )

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-buttons"

    $body = @{
        phone = $phone
        message = $message
        buttons = $buttons
    } | ConvertTo-Json -Depth 10

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Botões enviados. MessageId: $($response.messageId)"

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
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-buttons HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 185

{
  "phone": "5511999999999",
  "message": "Sua fatura deste mês já está disponível. Deseja visualizá-la?",
  "buttons": [
    {"id": "ver_fatura", "text": "Ver Fatura"},
    {"id": "falar_atendente", "text": "Falar com Atendente"}
  ]
}
```

**Note:** This is an example of a raw HTTP request. In production:
- ⚠️ **SECURITY:** Replace `SUA_INSTANCIA`, `SEU_TOKEN` and `SEU_CLIENT_TOKEN` with real values from environment variables
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate `phone` (only numbers, 10-15 digits), `message` (not empty, max. 1024 characters) and `buttons` (array of buttons, each with `id` max. 256 characters and `text` max. 20 characters) before sending

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <vector>
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
    if (trimmed.length() > 1024) {
        throw std::invalid_argument("Mensagem excede limite de 1024 caracteres");
    }
    return trimmed;
}

struct Button {
    std::string id;
    std::string text;
};

std::vector<Button> validateButtons(const std::vector<Button>& buttons) {
    if (buttons.empty()) {
        throw std::invalid_argument("Botões são obrigatórios e devem conter pelo menos um botão");
    }
    
    std::vector<Button> validated;
    for (size_t i = 0; i < buttons.size(); i++) {
        const Button& btn = buttons[i];
        if (btn.id.empty()) {
            throw std::invalid_argument("Botão " + std::to_string(i + 1) + ": id é obrigatório");
        }
        if (btn.id.length() > 256) {
            throw std::invalid_argument("Botão " + std::to_string(i + 1) + ": id excede limite de 256 caracteres");
        }
        
        std::string textTrimmed = btn.text;
        textTrimmed.erase(0, textTrimmed.find_first_not_of(" \t\n\r"));
        textTrimmed.erase(textTrimmed.find_last_not_of(" \t\n\r") + 1);
        
        if (textTrimmed.empty()) {
            throw std::invalid_argument("Botão " + std::to_string(i + 1) + ": text é obrigatório");
        }
        if (textTrimmed.length() > 20) {
            throw std::invalid_argument("Botão " + std::to_string(i + 1) + ": text excede limite de 20 caracteres");
        }
        
        validated.push_back({btn.id, textTrimmed});
    }
    return validated;
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

        // Dados dos botões com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string message = sanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?");
        std::vector<Button> buttons = validateButtons({
            {"ver_fatura", "Ver Fatura"},
            {"falar_atendente", "Falar com Atendente"}
        });

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-buttons";
        
        // Criar payload JSON
        std::string buttonsJson = "[";
        for (size_t i = 0; i < buttons.size(); i++) {
            if (i > 0) buttonsJson += ",";
            buttonsJson += "{\"id\":\"" + buttons[i].id + "\",\"text\":\"" + buttons[i].text + "\"}";
        }
        buttonsJson += "]";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"message\":\"" + message + "\",\"buttons\":" + buttonsJson + "}";

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
            std::cout << "Botões enviados. Response: " << responseData << std::endl;
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
g++ -o send_buttons send_buttons.cpp -lcurl
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
    if (len > 1024) {
        return -1; // Muito longo
    }
    
    strncpy(sanitized, message + start, len);
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

    // Dados dos botões com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    char message[1025];
    int msgResult = sanitizeMessage("Sua fatura deste mês já está disponível. Deseja visualizá-la?", message);
    if (msgResult == 0) {
        fprintf(stderr, "Erro de validação: Mensagem não pode estar vazia\n");
        return 1;
    } else if (msgResult == -1) {
        fprintf(stderr, "Erro de validação: Mensagem excede limite de 1024 caracteres\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-buttons", 
             instanceId, instanceToken);

    // Criar payload JSON (botões hardcoded para simplificar em C)
    char jsonPayload[2048];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"message\":\"%s\",\"buttons\":[{\"id\":\"ver_fatura\",\"text\":\"Ver Fatura\"},{\"id\":\"falar_atendente\",\"text\":\"Falar com Atendente\"}]}",
             phone, message);

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
        printf("Botões enviados. Response: %s\n", responseData);
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
gcc -o send_buttons send_buttons.c -lcurl
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
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary ID you should use to track the message
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking and Clicks:**

To know when the message was delivered, read, or when a button was clicked, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber#example-of-text-return-list-button).