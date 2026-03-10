---
id: texto-botoes-acao
title: Text with Action Buttons
sidebar_position: 18
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MousePointerClick" size="lg" /> Text with Action Buttons

Send text messages with interactive action buttons. Buttons can redirect to links, make calls, or send standard replies.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows sending text messages accompanied by action buttons. Buttons can be of three types:

- **CALL**: Starts a call to a specific number
- **URL**: Redirects to an external link
- **REPLY**: Sends a standard reply that can be captured via webhook

:::caution Attention
Button sending is currently available, but there are some decisive factors for its operation. For more details, access the topic [Button Operation](/docs/tips/funcionamento-botoes).
:::

:::tip Note
Currently, when sending all three button types simultaneously, WhatsApp Web generates an error, which also occurs when using Meta's own API. An alternative is to send only CALL and URL buttons together, and always send the REPLY button separately.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-actions
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | Recipient's phone (or group ID for group sending) in DDI DDD NUMBER format. Ex: `551199999999`. **IMPORTANT**: Send only numbers, without formatting or mask |
| `message` | string | Text to be sent |
| `buttonActions` | array | Array of `buttonActions` objects |

### buttonActions

| Attribute | Type | Description |
|----------|------|-------------|
| `type` | string | Button type: `CALL`, `URL`, or `REPLY` |
| `phone` | string | Number assigned to the button if it is of type `CALL` |
| `url` | string | Link assigned to the button if it is of type `URL` |
| `label` | string | Text displayed on the button |

### Optional (buttonActions)

| Attribute | Type | Description |
|----------|------|-----------|
| `id` | string | Unique button identifier |

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `delayMessage` | number | Delay in seconds (1-15) before sending the next message. Default: 1-3 seconds |
| `title` | string | Optional message title |
| `footer` | string | Optional message footer |

:::tip Tip
WhatsApp has a specific link for copying texts. By passing this link in the `url` attribute, the button becomes a copy button: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=yourcode`
:::

---

## <Icon name="Wand2" size="md" /> For No-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

- **`phone`**: The recipient's number where you want to send the message with action buttons. Use the full format: DDI + DDD + Number (ex: `5511999999999`). **Important:** Use only numbers, without formatting or mask. For groups, use the group ID.

- **`message`**: The text that will be displayed along with the buttons. This field is required and cannot be empty.

- **`buttonActions`**: A list (array) of action buttons. You can send 1 to 3 buttons. Each button must have:

  - **`type`**: The button type (required). Can be:
    - `CALL`: Starts a call to a specific number
    - `URL`: Redirects to an external link
    - `REPLY`: Sends a standard reply that can be captured via webhook
  - **`label`**: The text that will appear on the button (required)
  - **`id`**: A unique identifier for the button (optional, but recommended)
  - **`phone`**: Number assigned to the button if it is of type `CALL` (required for CALL type)
  - **`url`**: Link assigned to the button if it is of type `URL` (required for URL type)

### Optional Fields

- **`delayMessage`**: If you are sending multiple messages in sequence, use this field to space them out (between 1 and 15 seconds). This helps avoid blocks and makes communication more natural.

- **`title`**: Optional message title (appears above the main text).

- **`footer`**: Optional message footer (appears below the main text).

### Practical No-Code Example

**Example with CALL and URL buttons:**

```json
{
  "phone": "5511999999999",
  "message": "Contact us:",
  "buttonActions": [
    {
      "id": "call",
      "type": "CALL",
      "label": "Call",
      "phone": "5511999999999"
    },
    {
      "id": "website",
      "type": "URL",
      "label": "Visit Website",
      "url": "https://example.com"
    }
  ]
}
```

**Example with REPLY button:**

```json
{
  "phone": "5511999999999",
  "message": "Choose an option:",
  "buttonActions": [
    {
      "id": "yes",
      "type": "REPLY",
      "label": "Yes, I want"
    }
  ]
}
```

**Example with code copy button:**

```json
{
  "phone": "5511999999999",
  "message": "Your verification code:",
  "buttonActions": [
    {
      "id": "copy",
      "type": "URL",
      "label": "Copy Code",
      "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=123456"
    }
  ]
}
```

**Important tips:**

- **Button types**: There are three types: `CALL` (call), `URL` (link), and `REPLY` (reply). Each type has specific requirements.
- **Important limitation**: Do not send all three types simultaneously. WhatsApp Web generates an error. Use `CALL` + `URL` together, or `REPLY` separately.
- **CALL button**: Requires the `phone` field with the number to call (format: DDI + DDD + Number, only numbers).
- **URL button**: Requires the `url` field with the full link (ex: `https://example.com`).
- **REPLY button**: No additional fields required besides `type` and `label`. The reply will be captured via webhook when the user clicks.
- **Copy button**: Use the special WhatsApp link in the `url` attribute to create a code copy button: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=yourcode`
- **Number of buttons**: You can send 1 to 3 buttons. More than 3 buttons are not supported.
- **Button ID**: Use descriptive IDs (e.g., `"call"`, `"website"`, `"yes"`) to facilitate identification in the webhook when the user clicks.
- **Title and Footer**: Use `title` and `footer` to add visual context to the message (optional).
- **Response**: The response will be an object with `zaapId`, `messageId`, and `id` (for Zapier compatibility). Use the `messageId` to track the message status through webhooks.

**Common use cases:**

- **Support**: Send "Call" and "Talk to Agent" buttons to facilitate contact
- **Promotions**: Send "View Offer" button (URL) to redirect to a promotion page
- **Confirmations**: Send "Yes" and "No" buttons (REPLY) for quick confirmations
- **Verification codes**: Send a code copy button for easy use
- **Scheduling**: Send "Schedule" button (URL) to redirect to a calendar
- **Support**: Send "Open Ticket" (URL) and "Talk to Support" (CALL) buttons

**Important about buttons:**

:::caution Attention

Button sending is currently available, but there are some decisive factors for its operation. For more details, access the topic [Button Operation](/docs/tips/funcionamento-botoes).

:::

:::tip Note

Currently, when sending all three button types simultaneously, WhatsApp Web generates an error, which also occurs when using Meta's own API. An alternative is to send only CALL and URL buttons together, and always send the REPLY button separately.

:::

**Receiving responses:**

When the user clicks a button of type `REPLY`, you will receive a webhook with the reply. The webhook will include the `id` of the clicked button, allowing you to identify which option the user chose. For `URL` and `CALL` buttons, WhatsApp redirects the user directly (without webhook). See more about [webhooks for received messages](../webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão).

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Code" size="md" /> Code Examples {#exemplos}

### Example 1: CALL and URL Buttons {#exemplo-call-url}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone (only numbers)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (DDI + DDD + Number)');
  }
  return phone;
}

// Validate action buttons
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('There must be between 1 and 3 action buttons');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Each button must have id, type, and label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('CALL type buttons must have a phone number');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('URL type buttons must have a URL');
    }
    if (button.type !== 'CALL' && button.type !== 'URL') {
      throw new Error('Invalid button type. Use CALL or URL');
    }
  }
  return buttonActions;
}

// Send text with action buttons
async function sendButtonActions(phone, message, buttonActions, title, footer) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
    }
    const validatedButtonActions = validateButtonActions(buttonActions);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: validatedButtonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // ⚠️ SECURITY: Do not expose sensitive details in error logs
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SECURITY: Do not log tokens or sensitive data
    console.log('Text with action buttons sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending text with action buttons:', error.message);
    throw error;
  }
}

// Usage example
sendButtonActions(
  '551199999999',
  'Contact us',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Call us',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visit our website',
    },
  ],
  'Support',
  'We are here to help'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface for response
interface ButtonActionsResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

interface ButtonAction {
  id: string;
  type: 'CALL' | 'URL';
  phone?: string;
  url?: string;
  label: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate action buttons
function validateButtonActions(buttonActions: ButtonAction[]): ButtonAction[] {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('There must be between 1 and 3 action buttons');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Each button must have id, type, and label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('CALL type buttons must have a phone number');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('URL type buttons must have a URL');
    }
  }
  return buttonActions;
}

// Function to send text with action buttons
async function sendButtonActions(
  phone: string,
  message: string,
  buttonActions: ButtonAction[],
  title?: string,
  footer?: string
): Promise<ButtonActionsResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty');
  }
  const validatedButtonActions = validateButtonActions(buttonActions);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;

  const payload: any = {
    phone: validatedPhone,
    message: message.trim(),
    buttonActions: validatedButtonActions.map(btn => ({
      id: btn.id,
      type: btn.type,
      phone: btn.type === 'CALL' ? validatePhone(btn.phone!) : undefined,
      url: btn.type === 'URL' ? btn.url : undefined,
      label: btn.label.trim(),
    })),
  };
  
  if (title) payload.title = title.trim();
  if (footer) payload.footer = footer.trim();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response.json();
}

// Execute
sendButtonActions(
  '551199999999',
  'Contact us',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Call us',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visit our website',
    },
  ],
  'Support',
  'We are here to help'
)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, List, Optional

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Validate phone (only numbers)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (DDI + DDD + Number)')
    return phone

def validate_button_actions(button_actions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Validate action buttons (1-3 buttons)"""
    if not isinstance(button_actions, list) or len(button_actions) == 0 or len(button_actions) > 3:
        raise ValueError('There must be between 1 and 3 action buttons')
    for button in button_actions:
        if not button.get('id') or not button.get('type') or not button.get('label'):
            raise ValueError('Each button must have id, type, and label')
        if button['type'] == 'CALL' and not button.get('phone'):
            raise ValueError('CALL type buttons must have a phone number')
        if button['type'] == 'URL' and not button.get('url'):
            raise ValueError('URL type buttons must have a URL')
        if button['type'] not in ['CALL', 'URL']:
            raise ValueError('Invalid button type. Use CALL or URL')
    return button_actions

def send_button_actions(
    phone: str,
    message: str,
    button_actions: List[Dict[str, Any]],
    title: Optional[str] = None,
    footer: Optional[str] = None
) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('Message cannot be empty')
    validated_button_actions = validate_button_actions(button_actions)
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-actions"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "buttonActions": [
            {
                "id": btn["id"],
                "type": btn["type"],
                "phone": validate_phone(btn["phone"]) if btn["type"] == "CALL" else None,
                "url": btn.get("url") if btn["type"] == "URL" else None,
                "label": btn["label"].strip(),
            }
            for btn in validated_button_actions
        ]
    }
    
    if title:
        payload["title"] = title.strip()
    if footer:
        payload["footer"] = footer.strip()
    
    # Remove None fields from payload
    payload["buttonActions"] = [
        {k: v for k, v in btn.items() if v is not None}
        for btn in payload["buttonActions"]
    ]
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('Text with action buttons sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Usage example
send_button_actions(
    '551199999999',
    'Contact us',
    [
        {
            'id': '1',
            'type': 'CALL',
            'phone': '554498398733',
            'label': 'Call us'
        },
        {
            'id': '2',
            'type': 'URL',
            'url': 'https://z-api.io',
            'label': 'Visit our website'
        }
    ],
    title='Support',
    footer='We are here to help'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDATION: Validate phone (only numbers)
PHONE="${1:-551199999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (DDI + DDD + Number)"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send text with action buttons via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-actions" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Contact us\",
    \"title\": \"Support\",
    \"footer\": \"We are here to help\",
    \"buttonActions\": [
      {
        \"id\": \"1\",
        \"type\": \"CALL\",
        \"phone\": \"554498398733\",
        \"label\": \"Call us\"
      },
      {
        \"id\": \"2\",
        \"type\": \"URL\",
        \"url\": \"https://z-api.io\",
        \"label\": \"Visit our website\"
      }
    ]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clean sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate action buttons
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('There must be between 1 and 3 action buttons');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Each button must have id, type, and label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('CALL type buttons must have a phone number');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('URL type buttons must have a URL');
    }
  }
  return buttonActions;
}

// Send text with action buttons
function sendButtonActions(phone, message, buttonActions, title, footer) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('Message cannot be empty');
      }
      const validatedButtonActions = validateButtonActions(buttonActions);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      title: title ? title.trim() : undefined,
      footer: footer ? footer.trim() : undefined,
      buttonActions: buttonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? btn.phone : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
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
            console.log('Text with action buttons sent successfully');
            resolve(result);
          } catch (error) {
            reject(new Error('Error parsing JSON response'));
          }
        } else {
          reject(new Error(`HTTP Error ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Execute
sendButtonActions(
  '551199999999',
  'Contact us',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Call us',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visit our website',
    },
  ],
  'Support',
  'We are here to help'
)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate action buttons
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('There must be between 1 and 3 action buttons');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Each button must have id, type, and label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('CALL type buttons must have a phone number');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('URL type buttons must have a URL');
    }
  }
  return buttonActions;
}

// Route to send text with action buttons
app.post('/api/send-button-actions', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, message, buttonActions, title, footer } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }
    const validatedButtonActions = validateButtonActions(buttonActions);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: validatedButtonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();

    const response = await axios.post(url, payload, {
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
    console.error('Error sending text with action buttons:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending text with action buttons',
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate action buttons
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('There must be between 1 and 3 action buttons');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Each button must have id, type, and label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('CALL type buttons must have a phone number');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('URL type buttons must have a URL');
    }
  }
  return buttonActions;
}

// Middleware to send text with action buttons
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-actions' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, message, buttonActions, title, footer } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'Message cannot be empty',
        };
        return;
      }
      const validatedButtonActions = validateButtonActions(buttonActions);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
      
      const payload = {
        phone: validatedPhone,
        message: message.trim(),
        buttonActions: validatedButtonActions.map(btn => ({
          id: btn.id,
          type: btn.type,
          phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
          url: btn.type === 'URL' ? btn.url : undefined,
          label: btn.label.trim(),
        })),
      };
      
      if (title) payload.title = title.trim();
      if (footer) payload.footer = footer.trim();

      const response = await axios.post(url, payload, {
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
      console.error('Error sending text with action buttons:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending text with action buttons',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
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

public class SendButtonActions {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("551199999999");
            String message = "Contact us";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("Message cannot be empty");
            }

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-actions",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray buttonActions = new JSONArray();
            JSONObject button1 = new JSONObject();
            button1.put("id", "1");
            button1.put("type", "CALL");
            button1.put("phone", validatePhone("554498398733"));
            button1.put("label", "Call us");
            buttonActions.put(button1);
            
            JSONObject button2 = new JSONObject();
            button2.put("id", "2");
            button2.put("type", "URL");
            button2.put("url", "https://z-api.io");
            button2.put("label", "Visit our website");
            buttonActions.put(button2);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("title", "Support");
            payload.put("footer", "We are here to help");
            payload.put("buttonActions", buttonActions);
            
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
                
                System.out.println("Text with action buttons sent successfully");
                System.out.println(response.toString());
            } else {
                System.err.println("HTTP Error " + responseCode);
            }
            
            connection.disconnect();
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
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
using System.Collections.Generic;

class Program
{
    // ⚠️ SECURITY: Use environment variables for credentials
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validate phone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("551199999999");
            string message = "Contact us";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("Message cannot be empty");
            }

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-actions";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                title = "Support",
                footer = "We are here to help",
                buttonActions = new[]
                {
                    new { id = "1", type = "CALL", phone = ValidatePhone("554498398733"), label = "Call us" },
                    new { id = "2", type = "URL", url = "https://z-api.io", label = "Visit our website" }
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
                    Console.WriteLine("Text with action buttons sent successfully");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"HTTP Error {(int)response.StatusCode}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
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

// ⚠️ SECURITY: Use environment variables for credentials
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
        return fmt.Errorf("invalid phone. Use only numbers")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "551199999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    message := "Contact us"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Error: Message cannot be empty")
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "title": "Support",
        "footer": "We are here to help",
        "buttonActions": []map[string]interface{}{
            {
                "id": "1",
                "type": "CALL",
                "phone": "554498398733",
                "label": "Call us",
            },
            {
                "id": "2",
                "type": "URL",
                "url": "https://z-api.io",
                "label": "Visit our website",
            },
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Error serializing JSON: %v\n", err)
        return
    }
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Error creating request: %v\n", err)
        return
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Request error: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Error reading response: %v\n", err)
            return
        }
        
        fmt.Println("Text with action buttons sent successfully")
        fmt.Println(string(body))
    } else {
        fmt.Printf("HTTP Error %d\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SECURITY: Use environment variables for credentials
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('551199999999');
    $message = 'Contact us';
    if (empty(trim($message))) {
        throw new Exception('Message cannot be empty');
    }

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-actions',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'title' => 'Support',
        'footer' => 'We are here to help',
        'buttonActions' => [
            [
                'id' => '1',
                'type' => 'CALL',
                'phone' => validatePhone('554498398733'),
                'label' => 'Call us',
            ],
            [
                'id' => '2',
                'type' => 'URL',
                'url' => 'https://z-api.io',
                'label' => 'Visit our website',
            ],
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
        error_log("cURL Error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Text with action buttons sent successfully\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "HTTP Error $httpCode\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'uri'
require 'json'

# ⚠️ SECURITY: Use environment variables for credentials
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('551199999999')
  message = 'Contact us'
  raise 'Message cannot be empty' if message.nil? || message.strip.empty?

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-actions")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    title: 'Support',
    footer: 'We are here to help',
    buttonActions: [
      {
        id: '1',
        type: 'CALL',
        phone: validate_phone('554498398733'),
        label: 'Call us'
      },
      {
        id: '2',
        type: 'URL',
        url: 'https://z-api.io',
        label: 'Visit our website'
      }
    ]
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Text with action buttons sent successfully'
    puts result.to_json
  else
    puts "HTTP Error #{response.code}"
  end
rescue => e
  puts "Error: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SECURITY: Use environment variables for credentials
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validate phone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone. Use only numbers"])
    }
    return phone
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("551199999999")
    let message = "Contact us"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Message cannot be empty"])
    }

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-actions"
    
    guard let url = URL(string: urlString) else {
        print("Invalid URL")
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
        "title": "Support",
        "footer": "We are here to help",
        "buttonActions": [
            [
                "id": "1",
                "type": "CALL",
                "phone": try validatePhone("554498398733"),
                "label": "Call us"
            ],
            [
                "id": "2",
                "type": "URL",
                "url": "https://z-api.io",
                "label": "Visit our website"
            ]
        ]
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Error: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Invalid response")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Text with action buttons sent successfully")
                        print(result)
                    }
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("HTTP Error \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Error: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SECURITY: Use environment variables for credentials
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "551199999999"
    $message = "Contact us"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "Message cannot be empty"
    }

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-actions"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        title = "Support"
        footer = "We are here to help"
        buttonActions = @(
            @{
                id = "1"
                type = "CALL"
                phone = (Validate-Phone "554498398733")
                label = "Call us"
            },
            @{
                id = "2"
                type = "URL"
                url = "https://z-api.io"
                label = "Visit our website"
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Text with action buttons sent successfully"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "551199999999",
  "message": "Contact us",
  "title": "Support",
  "footer": "We are here to help",
  "buttonActions": [
    {
      "id": "1",
      "type": "CALL",
      "phone": "554498398733",
      "label": "Call us"
    },
    {
      "id": "2",
      "type": "URL",
      "url": "https://z-api.io",
      "label": "Visit our website"
    }
  ]
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

// ⚠️ SECURITY: Use environment variables for credentials
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
    
    // ⚠️ VALIDATION
    std::string phone = "551199999999";
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    std::string message = "Contact us";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Error: Message cannot be empty" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-actions";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"title\":\"Support\","
                  << "\"footer\":\"We are here to help\","
                  << "\"buttonActions\":["
                  << "{\"id\":\"1\",\"type\":\"CALL\",\"phone\":\"554498398733\",\"label\":\"Call us\"},"
                  << "{\"id\":\"2\",\"type\":\"URL\",\"url\":\"https://z-api.io\",\"label\":\"Visit our website\"}"
                  << "]}";
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
                std::cout << "Text with action buttons sent successfully" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "HTTP Error " << responseCode << std::endl;
            }
        } else {
            std::cerr << "cURL Error: " << curl_easy_strerror(res) << std::endl;
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

// ⚠️ SECURITY: Use environment variables for credentials
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
    
    // ⚠️ VALIDATION
    char* phone = "551199999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    char* message = "Contact us";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Error: Message cannot be empty\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"title\":\"Support\",\"footer\":\"We are here to help\",\"buttonActions\":[{\"id\":\"1\",\"type\":\"CALL\",\"phone\":\"554498398733\",\"label\":\"Call us\"},{\"id\":\"2\",\"type\":\"URL\",\"url\":\"https://z-api.io\",\"label\":\"Visit our website\"}]}",
        phone, message);
    
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
                printf("Text with action buttons sent successfully\n");
                printf("%s\n", responseData);
            } else {
                printf("HTTP Error %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "cURL Error: %s\n", curl_easy_strerror(res));
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
</Tabs>

### Example 2: REPLY Button {#exemplo-reply}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone (only numbers)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (DDI + DDD + Number)');
  }
  return phone;
}

// Validate REPLY button
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('REPLY button must have id, type, and label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Button type must be REPLY');
  }
  return button;
}

// Send text with REPLY button
async function sendReplyButton(phone, message, button, title, footer) {
  try {
    // ⚠️ VALIDATION
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
    }
    const validatedButton = validateReplyButton(button);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: [{
        id: validatedButton.id,
        type: validatedButton.type,
        label: validatedButton.label.trim(),
      }],
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Text with REPLY button sent successfully');
    return data;
  } catch (error) {
    console.error('Error sending text with REPLY button:', error.message);
    throw error;
  }
}

// Usage example
sendReplyButton(
  '551199999999',
  'Would you like to speak to an agent?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Talk to agent',
  },
  'Support',
  'Quick reply'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface for response
interface ButtonActionsResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

interface ReplyButton {
  id: string;
  type: 'REPLY';
  label: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate REPLY button
function validateReplyButton(button: ReplyButton): ReplyButton {
  if (!button.id || !button.type || !button.label) {
    throw new Error('REPLY button must have id, type, and label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Button type must be REPLY');
  }
  return button;
}

// Function to send text with REPLY button
async function sendReplyButton(
  phone: string,
  message: string,
  button: ReplyButton,
  title?: string,
  footer?: string
): Promise<ButtonActionsResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty');
  }
  const validatedButton = validateReplyButton(button);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;

  const payload: any = {
    phone: validatedPhone,
    message: message.trim(),
    buttonActions: [{
      id: validatedButton.id,
      type: validatedButton.type,
      label: validatedButton.label.trim(),
    }],
  };
  
  if (title) payload.title = title.trim();
  if (footer) payload.footer = footer.trim();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response.json();
}

// Execute
sendReplyButton(
  '551199999999',
  'Would you like to speak to an agent?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Talk to agent',
  },
  'Support',
  'Quick reply'
)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Validate phone (only numbers)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (DDI + DDD + Number)')
    return phone

def validate_reply_button(button: Dict[str, Any]) -> Dict[str, Any]:
    """Validate REPLY button"""
    if not button.get('id') or not button.get('type') or not button.get('label'):
        raise ValueError('REPLY button must have id, type, and label')
    if button['type'] != 'REPLY':
        raise ValueError('Button type must be REPLY')
    return button

def send_reply_button(
    phone: str,
    message: str,
    button: Dict[str, Any],
    title: str = None,
    footer: str = None
) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('Message cannot be empty')
    validated_button = validate_reply_button(button)
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-actions"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "buttonActions": [{
            "id": validated_button["id"],
            "type": validated_button["type"],
            "label": validated_button["label"].strip(),
        }]
    }
    
    if title:
        payload["title"] = title.strip()
    if footer:
        payload["footer"] = footer.strip()
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        print('Text with REPLY button sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Usage example
send_reply_button(
    '551199999999',
    'Would you like to speak to an agent?',
    {
        'id': '3',
        'type': 'REPLY',
        'label': 'Talk to agent'
    },
    title='Support',
    footer='Quick reply'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDATION: Validate phone (only numbers)
PHONE="${1:-551199999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (DDI + DDD + Number)"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send text with REPLY button via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-actions" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Would you like to speak to an agent?\",
    \"title\": \"Support\",
    \"footer\": \"Quick reply\",
    \"buttonActions\": [
      {
        \"id\": \"3\",
        \"type\": \"REPLY\",
        \"label\": \"Talk to agent\"
      }
    ]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clean sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate REPLY button
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('REPLY button must have id, type, and label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Button type must be REPLY');
  }
  return button;
}

// Send text with REPLY button
function sendReplyButton(phone, message, button, title, footer) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('Message cannot be empty');
      }
      const validatedButton = validateReplyButton(button);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      title: title ? title.trim() : undefined,
      footer: footer ? footer.trim() : undefined,
      buttonActions: [{
        id: button.id,
        type: button.type,
        label: button.label.trim(),
      }],
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
            console.log('Text with REPLY button sent successfully');
            resolve(result);
          } catch (error) {
            reject(new Error('Error parsing JSON response'));
          }
        } else {
          reject(new Error(`HTTP Error ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Execute
sendReplyButton(
  '551199999999',
  'Would you like to speak to an agent?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Talk to agent',
  },
  'Support',
  'Quick reply'
)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate REPLY button
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('REPLY button must have id, type, and label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Button type must be REPLY');
  }
  return button;
}

// Route to send text with REPLY button
app.post('/api/send-reply-button', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, message, button, title, footer } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }
    const validatedButton = validateReplyButton(button);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: [{
        id: validatedButton.id,
        type: validatedButton.type,
        label: validatedButton.label.trim(),
      }],
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();

    const response = await axios.post(url, payload, {
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
    console.error('Error sending text with REPLY button:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending text with REPLY button',
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate REPLY button
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('REPLY button must have id, type, and label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Button type must be REPLY');
  }
  return button;
}

// Middleware to send text with REPLY button
app.use(async (ctx) => {
  if (ctx.path === '/api/send-reply-button' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, message, button, title, footer } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'Message cannot be empty',
        };
        return;
      }
      const validatedButton = validateReplyButton(button);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
      
      const payload = {
        phone: validatedPhone,
        message: message.trim(),
        buttonActions: [{
          id: validatedButton.id,
          type: validatedButton.type,
          label: validatedButton.label.trim(),
        }],
      };
      
      if (title) payload.title = title.trim();
      if (footer) payload.footer = footer.trim();

      const response = await axios.post(url, payload, {
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
      console.error('Error sending text with REPLY button:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending text with REPLY button',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
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

public class SendReplyButton {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("551199999999");
            String message = "Would you like to speak to an agent?";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("Message cannot be empty");
            }

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-actions",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray buttonActions = new JSONArray();
            JSONObject button = new JSONObject();
            button.put("id", "3");
            button.put("type", "REPLY");
            button.put("label", "Talk to agent");
            buttonActions.put(button);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("title", "Support");
            payload.put("footer", "Quick reply");
            payload.put("buttonActions", buttonActions);
            
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
                
                System.out.println("Text with REPLY button sent successfully");
                System.out.println(response.toString());
            } else {
                System.err.println("HTTP Error " + responseCode);
            }
            
            connection.disconnect();
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
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
    // ⚠️ SECURITY: Use environment variables for credentials
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validate phone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("551199999999");
            string message = "Would you like to speak to an agent?";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("Message cannot be empty");
            }

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-actions";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                title = "Support",
                footer = "Quick reply",
                buttonActions = new[]
                {
                    new { id = "3", type = "REPLY", label = "Talk to agent" }
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
                    Console.WriteLine("Text with REPLY button sent successfully");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"HTTP Error {(int)response.StatusCode}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
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

// ⚠️ SECURITY: Use environment variables for credentials
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
        return fmt.Errorf("invalid phone. Use only numbers")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "551199999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    message := "Would you like to speak to an agent?"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Error: Message cannot be empty")
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "title": "Support",
        "footer": "Quick reply",
        "buttonActions": []map[string]interface{}{
            {
                "id": "3",
                "type": "REPLY",
                "label": "Talk to agent",
            },
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Error serializing JSON: %v\n", err)
        return
    }
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Error creating request: %v\n", err)
        return
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Request error: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Error reading response: %v\n", err)
            return
        }
        
        fmt.Println("Text with REPLY button sent successfully")
        fmt.Println(string(body))
    } else {
        fmt.Printf("HTTP Error %d\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SECURITY: Use environment variables for credentials
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('551199999999');
    $message = 'Would you like to speak to an agent?';
    if (empty(trim($message))) {
        throw new Exception('Message cannot be empty');
    }

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-actions',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'title' => 'Support',
        'footer' => 'Quick reply',
        'buttonActions' => [
            [
                'id' => '3',
                'type' => 'REPLY',
                'label' => 'Talk to agent',
            ],
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
        error_log("cURL Error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Text with REPLY button sent successfully\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "HTTP Error $httpCode\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'uri'
require 'json'

# ⚠️ SECURITY: Use environment variables for credentials
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('551199999999')
  message = 'Would you like to speak to an agent?'
  raise 'Message cannot be empty' if message.nil? || message.strip.empty?

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-actions")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    title: 'Support',
    footer: 'Quick reply',
    buttonActions: [
      {
        id: '3',
        type: 'REPLY',
        label: 'Talk to agent'
      }
    ]
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Text with REPLY button sent successfully'
    puts result.to_json
  else
    puts "HTTP Error #{response.code}"
  end
rescue => e
  puts "Error: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SECURITY: Use environment variables for credentials
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validate phone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone. Use only numbers"])
    }
    return phone
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("551199999999")
    let message = "Would you like to speak to an agent?"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Message cannot be empty"])
    }

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-actions"
    
    guard let url = URL(string: urlString) else {
        print("Invalid URL")
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
        "title": "Support",
        "footer": "Quick reply",
        "buttonActions": [
            [
                "id": "3",
                "type": "REPLY",
                "label": "Talk to agent"
            ]
        ]
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Error: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Invalid response")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Text with REPLY button sent successfully")
                        print(result)
                    }
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("HTTP Error \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Error: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SECURITY: Use environment variables for credentials
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "551199999999"
    $message = "Would you like to speak to an agent?"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "Message cannot be empty"
    }

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-actions"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        title = "Support"
        footer = "Quick reply"
        buttonActions = @(
            @{
                id = "3"
                type = "REPLY"
                label = "Talk to agent"
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Text with REPLY button sent successfully"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "551199999999",
  "message": "Would you like to speak to an agent?",
  "title": "Support",
  "footer": "Quick reply",
  "buttonActions": [
    {
      "id": "3",
      "type": "REPLY",
      "label": "Talk to agent"
    }
  ]
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

// ⚠️ SECURITY: Use environment variables for credentials
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
    
    // ⚠️ VALIDATION
    std::string phone = "551199999999";
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    std::string message = "Would you like to speak to an agent?";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Error: Message cannot be empty" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-actions";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"title\":\"Support\","
                  << "\"footer\":\"Quick reply\","
                  << "\"buttonActions\":["
                  << "{\"id\":\"3\",\"type\":\"REPLY\",\"label\":\"Talk to agent\"}"
                  << "]}";
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
                std::cout << "Text with REPLY button sent successfully" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "HTTP Error " << responseCode << std::endl;
            }
        } else {
            std::cerr << "cURL Error: " << curl_easy_strerror(res) << std::endl;
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

// ⚠️ SECURITY: Use environment variables for credentials
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
    
    // ⚠️ VALIDATION
    char* phone = "551199999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    char* message = "Would you like to speak to an agent?";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Error: Message cannot be empty\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"title\":\"Support\",\"footer\":\"Quick reply\",\"buttonActions\":[{\"id\":\"3\",\"type\":\"REPLY\",\"label\":\"Talk to agent\"}]}",
        phone, message);
    
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
                printf("Text with REPLY button sent successfully\n");
                printf("%s\n", responseData);
            } else {
                printf("HTTP Error %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "cURL Error: %s\n", curl_easy_strerror(res));
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

| Field | Type | Description |
|-------|------|-------------|
| `zaapId` | string | Unique message ID in the Z-API system (for internal tracking) |
| `messageId` | string | Unique message ID in WhatsApp. **Save this ID!** Use it to track delivery status through webhooks |
| `id` | string | Compatibility ID for Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- `messageId` is the primary identifier you should use to track the message
- `zaapId` is used internally by Z-API for processing
- `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery and Click Tracking:**

To know when the message was delivered, read, or when a button was clicked (REPLY type), configure a webhook and monitor the events. See more about [webhooks for received messages](../webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão).

### Common Errors {#erros-comuns}

| Code | Reason | How to resolve |
|------|--------|----------------|
| 400 | Invalid parameters | Check if all required attributes were sent, especially `phone`, `message`, `buttonActions` with correct `type` and `label`, and type-specific fields (`phone` for CALL, `url` for URL) |
| 401 | Invalid token | Check the `Client-Token` header |
| 405 | Incorrect method | Make sure you are using the `POST` method |
| 415 | Incorrect Content-Type | Add `Content-Type: application/json` to the request headers |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if it persists |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

When the user clicks a button, you will receive a webhook with the reply. See more details in:

[Webhook on receiving message - Action Buttons](/docs/webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão)

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Button types**: `CALL`, `URL`, and `REPLY`
- **Limitation**: Do not send all three types simultaneously. Use CALL + URL together, or REPLY separately
- **Copy button**: Use the special WhatsApp link in the `url` attribute to create a code copy button
- **Delay**: The `delayMessage` attribute allows controlling the time between messages (1-15 seconds)