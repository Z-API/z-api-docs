---
id: carrossel
sidebar_position: 24
title: Send Carousel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Layers" size="lg" /> Send Carousel

Send carousel messages with images, text, and action buttons. Carousels allow you to present multiple products or options in a visual and interactive way.

---

:::caution Caution

Sending button actions that accompany the current carousel are available but have some critical factors for functionality. For more details, visit the topic [Button Functionality](/docs/tips/funcionamento-botoes).

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Product Catalog**: Present multiple products in a single carousel
- **Option Menu**: Display various options visually
- **Portfolio**: Show works or projects in a carousel format
- **Promotions**: Highlight multiple offers simultaneously

---

## <Icon name="Wand2" size="md" /> For No-Code Users

If you are using an automation platform like n8n or Make, configure the following fields:

### Required Fields

1. **`phone`**: Full recipient number in format: DDI + DDD + Number (ex: `5511999999999`). **Important:** Send only numbers, without formatting or mask.

2. **`message`**: Main text message that appears before the carousel. This is the introductory message that contextualizes the carousel.

3. **`carousel`**: Array (list) of carousel cards. Each card is an object with:
   - **`text`** (required): Descriptive text for the card
   - **`image`** (required): Public URL of the card image (must be accessible via HTTPS)
   - **`buttons`** (optional): Array of action buttons.

### Configuring Buttons in Cards

Each button is an object with the following fields:

- **`type`** (required): Button type. Possible values:
  - `"URL"`: Button that opens a link
  - `"CALL"`: Button that makes a phone call
  - `"REPLY"`: Button that sends a predefined response (used in chatbots)
- **`label`** (required): Text that appears on the button (ex: "View Product", "Call Now", "Yes")
- **`id`** (optional): Unique identifier for the button. Use this ID to identify which button was clicked when receiving the webhook
- **`url`** (required if `type` is `"URL"`): Link that will be opened when the button is clicked
- **`phone`** (required if `type` is `"CALL"`): Phone number to be called (format: DDI + DDD + Number)

### Practical Example for No-Code

**Example 1: Simple Carousel (Without Buttons)**

```json
{
  "phone": "5511999999999",
  "message": "Confira nossos produtos em destaque:",
  "carousel": [
    {
      "text": "Produto 1 - R$ 99,90",
      "image": "https://exemplo.com/produto1.jpg"
    },
    {
      "text": "Produto 2 - R$ 149,90",
      "image": "https://exemplo.com/produto2.jpg"
    }
  ]
}
```

**Example 2: Carousel with Buttons**

```json
{
  "phone": "5511999999999",
  "message": "Escolha uma opção:",
  "carousel": [
    {
      "text": "Produto 1 - R$ 99,90",
      "image": "https://exemplo.com/produto1.jpg",
      "buttons": [
        {
          "id": "ver-produto-1",
          "type": "URL",
          "label": "Ver Produto",
          "url": "https://exemplo.com/produto1"
        },
        {
          "id": "comprar-1",
          "type": "REPLY",
          "label": "Comprar Agora"
        }
      ]
    }
  ]
}
```

### Important Tips

- **Image URLs**: Use public and accessible (HTTPS recommended) URLs. Private images or those requiring authentication will not work
- **Button Identifiers**: Use unique `id` for buttons to identify clicks in the webhook
- **Button Types**:
  - `URL`: Opens a link in the browser
  - `CALL`: Initiates a phone call
  - `REPLY`: Sends a predefined response (useful for chatbots)
- **Optional Delay**: You can add `delayMessage` (1-15 seconds) to control the send delay

**Common Use Cases:**

- **E-commerce**: Show multiple products with "View Product" and "Buy Now" buttons
- **Restaurants**: Display menu items with "Place Order" and "See Full Menu" buttons
- **Services**: Present different services with "Request Quote" and "Call Now" buttons
- **Portfolio**: Show completed works with "View More" and "Request Proposal" buttons

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-carousel
```

### <Icon name="Info" size="sm" /> Conceptualization {#conceituacao}

In this method, you can send carousel messages with images, text, and action buttons. From the action buttons, you can redirect to links, make calls, or give predefined responses.

![Example of carousel message](/img/send-message-carousel.jpeg)

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-----------|
| `phone` | string | Recipient phone number in format DDI DDD NUMBER (ex: `5511999999999`). **Important:** Send only numbers, without formatting or mask. For groups, use the group ID |
| `message` | string | Text to be sent |
| `carousel` | array | Array of objects `carouselCard` with carousel cards |

### Structure of `carouselCard`

| Attribute | Type | Required | Description |
|----------|------|---------|-----------|
| `text` | string | Yes | Card text |
| `image` | string | Yes | Card image URL |
| `buttons` | array | No | Array of objects `buttonActions` |

### Structure of `buttonActions`

| Attribute | Type | Required | Description |
|----------|------|---------|-----------|
| `type` | string | Yes | Button type: `CALL`, `URL`, or `REPLY` |
| `label` | string | Yes | Button text |
| `id` | string | No | Unique button identifier (used in webhook) |
| `phone` | string | No | Number for button type `CALL` |
| `url` | string | No | Link for button type `URL` |

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `delayMessage` | number | Add a delay in the message. You can choose between 1 to 15 seconds, meaning how many seconds it will wait before sending the next message. (Ex "delayMessage": 5, ). The default delay if not specified is 1 to 3 seconds |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

### Carousel with Buttons

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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      throw new Error('URL deve usar protocolo HTTP ou HTTPS');
    }
    return url;
  } catch (error) {
    throw new Error('URL inválida');
  }
}

// Validar botões do carrossel
function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Cada cartão deve ter pelo menos 1 botão');
  }
  for (const button of buttons) {
    if (!button.type || !['CALL', 'URL', 'REPLY'].includes(button.type)) {
      throw new Error('Tipo de botão inválido. Use: CALL, URL ou REPLY');
    }
    if (!button.label || typeof button.label !== 'string' || button.label.trim() === '') {
      throw new Error('Cada botão deve ter um label válido');
    }
    if (button.type === 'URL' && (!button.url || !validateUrl(button.url))) {
      throw new Error('Botões do tipo URL devem ter uma URL válida');
    }
    if (button.type === 'CALL' && (!button.phone || !/^\d{10,15}$/.test(button.phone))) {
      throw new Error('Botões do tipo CALL devem ter um telefone válido');
    }
  }
  return buttons;
}

// Validar cartões do carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
    if (card.buttons) {
      validateButtons(card.buttons);
    }
  }
  return carousel;
}

// Enviar carrossel com botões
async function sendCarousel(phone, message, carousel) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || typeof message !== 'string' || message.trim() === '') {
      throw new Error('A mensagem é obrigatória e não pode estar vazia');
    }
    const validatedCarousel = validateCarousel(carousel);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel.map(card => ({
        text: card.text.trim(),
        image: card.image,
        buttons: card.buttons ? validateButtons(card.buttons) : undefined,
      })),
    };
    
    // Remover campos undefined
    payload.carousel = payload.carousel.map(card => {
      const cleanCard = { text: card.text, image: card.image };
      if (card.buttons) cleanCard.buttons = card.buttons;
      return cleanCard;
    });
    
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
    console.log('Carrossel enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar carrossel:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendCarousel('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ver Detalhes',
        url: 'https://exemplo.com/produto1',
        type: 'URL',
      },
      {
        id: '2',
        label: 'Comprar',
        type: 'REPLY',
      },
    ],
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ligar',
        phone: '5511999999999',
        type: 'CALL',
      },
    ],
  },
]);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface ButtonAction {
  type: 'CALL' | 'URL' | 'REPLY';
  label: string;
  id?: string;
  phone?: string;
  url?: string;
}

interface CarouselCard {
  text: string;
  image: string;
  buttons?: ButtonAction[];
}

interface CarouselResponse {
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

// Validar URL
function validateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      throw new Error('URL deve usar protocolo HTTP ou HTTPS');
    }
    return url;
  } catch {
    throw new Error('URL inválida');
  }
}

// Validar botões
function validateButtons(buttons: ButtonAction[]): ButtonAction[] {
  if (buttons.length === 0) {
    throw new Error('Cada cartão deve ter pelo menos 1 botão');
  }
  for (const button of buttons) {
    if (!['CALL', 'URL', 'REPLY'].includes(button.type)) {
      throw new Error('Tipo de botão inválido');
    }
    if (!button.label || button.label.trim() === '') {
      throw new Error('Cada botão deve ter um label válido');
    }
    if (button.type === 'URL' && (!button.url || !validateUrl(button.url))) {
      throw new Error('Botões do tipo URL devem ter uma URL válida');
    }
    if (button.type === 'CALL' && (!button.phone || !/^\d{10,15}$/.test(button.phone))) {
      throw new Error('Botões do tipo CALL devem ter um telefone válido');
    }
  }
  return buttons;
}

// Validar carrossel
function validateCarousel(carousel: CarouselCard[]): CarouselCard[] {
  if (carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
    if (card.buttons) {
      validateButtons(card.buttons);
    }
  }
  return carousel;
}

// Função para enviar carrossel
async function sendCarousel(
  phone: string,
  message: string,
  carousel: CarouselCard[]
): Promise<CarouselResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem é obrigatória');
  }
  const validatedCarousel = validateCarousel(carousel);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendCarousel('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ver Detalhes',
        url: 'https://exemplo.com/produto1',
        type: 'URL',
      },
      {
        id: '2',
        label: 'Comprar',
        type: 'REPLY',
      },
    ],
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ligar',
        phone: '5511999999999',
        type: 'CALL',
      },
    ],
  },
])
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, List, Optional
from urllib.parse import urlparse

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_url(url: str) -> str:
    """Valida URL"""
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ['http', 'https']:
            raise ValueError('URL deve usar protocolo HTTP ou HTTPS')
        return url
    except Exception:
        raise ValueError('URL inválida')

def validate_buttons(buttons: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida botões do carrossel"""
    if not isinstance(buttons, list) or len(buttons) == 0:
        raise ValueError('Cada cartão deve ter pelo menos 1 botão')
    valid_types = ['CALL', 'URL', 'REPLY']
    for button in buttons:
        if button.get('type') not in valid_types:
            raise ValueError(f'Tipo de botão inválido. Use: {", ".join(valid_types)}')
        if not button.get('label') or not isinstance(button['label'], str) or not button['label'].strip():
            raise ValueError('Cada botão deve ter um label válido')
        if button['type'] == 'URL' and (not button.get('url') or not validate_url(button['url'])):
            raise ValueError('Botões do tipo URL devem ter uma URL válida')
        if button['type'] == 'CALL' and (not button.get('phone') or not re.match(r'^\d{10,15}$', button['phone'])):
            raise ValueError('Botões do tipo CALL devem ter um telefone válido')
    return buttons

def validate_carousel(carousel: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida cartões do carrossel"""
    if not isinstance(carousel, list) or len(carousel) == 0:
        raise ValueError('O carrossel deve conter pelo menos um cartão')
    for card in carousel:
        if not card.get('text') or not isinstance(card['text'], str) or not card['text'].strip():
            raise ValueError('Cada cartão deve ter um texto válido')
        if not card.get('image') or not validate_url(card['image']):
            raise ValueError('Cada cartão deve ter uma URL de imagem válida')
        if card.get('buttons'):
            validate_buttons(card['buttons'])
    return carousel

def send_carousel(phone: str, message: str, carousel: List[Dict[str, Any]]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not isinstance(message, str) or not message.strip():
        raise ValueError('A mensagem é obrigatória e não pode estar vazia')
    validated_carousel = validate_carousel(carousel)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-carousel"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "carousel": [
            {
                "text": card["text"].strip(),
                "image": card["image"],
                "buttons": card.get("buttons")
            }
            for card in validated_carousel
        ]
    }
    
    # Remover campos None
    for card in payload["carousel"]:
        if card.get("buttons") is None:
            card.pop("buttons", None)
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Carrossel enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_carousel('5511999999999', 'Confira nossos produtos!', [
    {
        'text': 'Produto 1',
        'image': 'https://exemplo.com/produto1.jpg',
        'buttons': [
            {
                'id': '1',
                'label': 'Ver Detalhes',
                'url': 'https://exemplo.com/produto1',
                'type': 'URL'
            },
            {
                'id': '2',
                'label': 'Comprar',
                'type': 'REPLY'
            }
        ]
    },
    {
        'text': 'Produto 2',
        'image': 'https://exemplo.com/produto2.jpg',
        'buttons': [
            {
                'id': '1',
                'label': 'Ligar',
                'phone': '5511999999999',
                'type': 'CALL'
            }
        ]
    }
])
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
# Enviar carrossel com botões via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-carousel" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Confira nossos produtos!\",
    \"carousel\": [
      {
        \"text\": \"Produto 1\",
        \"image\": \"https://exemplo.com/produto1.jpg\",
        \"buttons\": [
          {
            \"id\": \"1\",
            \"label\": \"Ver Detalhes\",
            \"url\": \"https://exemplo.com/produto1\",
            \"type\": \"URL\"
          },
          {
            \"id\": \"2\",
            \"label\": \"Comprar\",
            \"type\": \"REPLY\"
          }
        ]
      },
      {
        \"text\": \"Produto 2\",
        \"image\": \"https://exemplo.com/produto2.jpg\",
        \"buttons\": [
          {
            \"id\": \"1\",
            \"label\": \"Ligar\",
            \"phone\": \"5511999999999\",
            \"type\": \"CALL\"
          }
        ]
      }
    ]
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
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar botões
function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Cada cartão deve ter pelo menos 1 botão');
  }
  for (const button of buttons) {
    if (!['CALL', 'URL', 'REPLY'].includes(button.type)) {
      throw new Error('Tipo de botão inválido');
    }
    if (!button.label || typeof button.label !== 'string' || button.label.trim() === '') {
      throw new Error('Cada botão deve ter um label válido');
    }
    if (button.type === 'URL' && (!button.url || !validateUrl(button.url))) {
      throw new Error('Botões do tipo URL devem ter uma URL válida');
    }
    if (button.type === 'CALL' && (!button.phone || !/^\d{10,15}$/.test(button.phone))) {
      throw new Error('Botões do tipo CALL devem ter um telefone válido');
    }
  }
  return buttons;
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
    if (card.buttons) {
      validateButtons(card.buttons);
    }
  }
  return carousel;
}

// Enviar carrossel
function sendCarousel(phone, message, carousel) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || typeof message !== 'string' || message.trim() === '') {
        throw new Error('A mensagem é obrigatória');
      }
      const validatedCarousel = validateCarousel(carousel);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      carousel: carousel,
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
            console.log('Carrossel enviado com sucesso');
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
sendCarousel('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ver Detalhes',
        url: 'https://exemplo.com/produto1',
        type: 'URL',
      },
      {
        id: '2',
        label: 'Comprar',
        type: 'REPLY',
      },
    ],
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
    buttons: [
      {
        id: '1',
        label: 'Ligar',
        phone: '5511999999999',
        type: 'CALL',
      },
    ],
  },
])
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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar botões
function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Cada cartão deve ter pelo menos 1 botão');
  }
  for (const button of buttons) {
    if (!['CALL', 'URL', 'REPLY'].includes(button.type)) {
      throw new Error('Tipo de botão inválido');
    }
    if (!button.label || typeof button.label !== 'string' || button.label.trim() === '') {
      throw new Error('Cada botão deve ter um label válido');
    }
    if (button.type === 'URL' && (!button.url || !validateUrl(button.url))) {
      throw new Error('Botões do tipo URL devem ter uma URL válida');
    }
    if (button.type === 'CALL' && (!button.phone || !/^\d{10,15}$/.test(button.phone))) {
      throw new Error('Botões do tipo CALL devem ter um telefone válido');
    }
  }
  return buttons;
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
    if (card.buttons) {
      validateButtons(card.buttons);
    }
  }
  return carousel;
}

// Rota para enviar carrossel
app.post('/api/send-carousel', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, carousel } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem é obrigatória',
      });
    }
    const validatedCarousel = validateCarousel(carousel);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel,
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
    console.error('Erro ao enviar carrossel:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar carrossel',
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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar botões
function validateButtons(buttons) {
  if (!Array.isArray(buttons) || buttons.length === 0) {
    throw new Error('Cada cartão deve ter pelo menos 1 botão');
  }
  for (const button of buttons) {
    if (!['CALL', 'URL', 'REPLY'].includes(button.type)) {
      throw new Error('Tipo de botão inválido');
    }
    if (!button.label || typeof button.label !== 'string' || button.label.trim() === '') {
      throw new Error('Cada botão deve ter um label válido');
    }
    if (button.type === 'URL' && (!button.url || !validateUrl(button.url))) {
      throw new Error('Botões do tipo URL devem ter uma URL válida');
    }
    if (button.type === 'CALL' && (!button.phone || !/^\d{10,15}$/.test(button.phone))) {
      throw new Error('Botões do tipo CALL devem ter um telefone válido');
    }
  }
  return buttons;
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
    if (card.buttons) {
      validateButtons(card.buttons);
    }
  }
  return carousel;
}

// Middleware para enviar carrossel
app.use(async (ctx) => {
  if (ctx.path === '/api/send-carousel' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, carousel } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || typeof message !== 'string' || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem é obrigatória',
        };
        return;
      }
      const validatedCarousel = validateCarousel(carousel);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        carousel: validatedCarousel,
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
      console.error('Erro ao enviar carrossel:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar carrossel',
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

public class SendCarousel {
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

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-carousel",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray carousel = new JSONArray();
            
            // Cartão 1
            JSONArray buttons1 = new JSONArray();
            JSONObject button1_1 = new JSONObject();
            button1_1.put("id", "1");
            button1_1.put("label", "Ver Detalhes");
            button1_1.put("url", "https://exemplo.com/produto1");
            button1_1.put("type", "URL");
            buttons1.put(button1_1);
            
            JSONObject button1_2 = new JSONObject();
            button1_2.put("id", "2");
            button1_2.put("label", "Comprar");
            button1_2.put("type", "REPLY");
            buttons1.put(button1_2);
            
            JSONObject card1 = new JSONObject();
            card1.put("text", "Produto 1");
            card1.put("image", "https://exemplo.com/produto1.jpg");
            card1.put("buttons", buttons1);
            carousel.put(card1);
            
            // Cartão 2
            JSONArray buttons2 = new JSONArray();
            JSONObject button2_1 = new JSONObject();
            button2_1.put("id", "1");
            button2_1.put("label", "Ligar");
            button2_1.put("phone", "5511999999999");
            button2_1.put("type", "CALL");
            buttons2.put(button2_1);
            
            JSONObject card2 = new JSONObject();
            card2.put("text", "Produto 2");
            card2.put("image", "https://exemplo.com/produto2.jpg");
            card2.put("buttons", buttons2);
            carousel.put(card2);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", "Confira nossos produtos!");
            payload.put("carousel", carousel);
            
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
                
                System.out.println("Carrossel enviado com sucesso");
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

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-carousel";
            
            var payload = new
            {
                phone = phone,
                message = "Confira nossos produtos!",
                carousel = new[]
                {
                    new
                    {
                        text = "Produto 1",
                        image = "https://exemplo.com/produto1.jpg",
                        buttons = new[]
                        {
                            new { id = "1", label = "Ver Detalhes", url = "https://exemplo.com/produto1", type = "URL" },
                            new { id = "2", label = "Comprar", type = "REPLY" }
                        }
                    },
                    new
                    {
                        text = "Produto 2",
                        image = "https://exemplo.com/produto2.jpg",
                        buttons = new[]
                        {
                            new { id = "1", label = "Ligar", phone = "5511999999999", type = "CALL" }
                        }
                    }
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
                    Console.WriteLine("Carrossel enviado com sucesso");
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-carousel", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": "Confira nossos produtos!",
        "carousel": []map[string]interface{}{
            {
                "text": "Produto 1",
                "image": "https://exemplo.com/produto1.jpg",
                "buttons": []map[string]interface{}{
                    {
                        "id": "1",
                        "label": "Ver Detalhes",
                        "url": "https://exemplo.com/produto1",
                        "type": "URL",
                    },
                    {
                        "id": "2",
                        "label": "Comprar",
                        "type": "REPLY",
                    },
                },
            },
            {
                "text": "Produto 2",
                "image": "https://exemplo.com/produto2.jpg",
                "buttons": []map[string]interface{}{
                    {
                        "id": "1",
                        "label": "Ligar",
                        "phone": "5511999999999",
                        "type": "CALL",
                    },
                },
            },
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
        
        fmt.Println("Carrossel enviado com sucesso")
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-carousel',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => 'Confira nossos produtos!',
        'carousel' => [
            [
                'text' => 'Produto 1',
                'image' => 'https://exemplo.com/produto1.jpg',
                'buttons' => [
                    [
                        'id' => '1',
                        'label' => 'Ver Detalhes',
                        'url' => 'https://exemplo.com/produto1',
                        'type' => 'URL',
                    ],
                    [
                        'id' => '2',
                        'label' => 'Comprar',
                        'type' => 'REPLY',
                    ],
                ],
            ],
            [
                'text' => 'Produto 2',
                'image' => 'https://exemplo.com/produto2.jpg',
                'buttons' => [
                    [
                        'id' => '1',
                        'label' => 'Ligar',
                        'phone' => '5511999999999',
                        'type' => 'CALL',
                    ],
                ],
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
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Carrossel enviado com sucesso\n";
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

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-carousel")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: 'Confira nossos produtos!',
    carousel: [
      {
        text: 'Produto 1',
        image: 'https://exemplo.com/produto1.jpg',
        buttons: [
          {
            id: '1',
            label: 'Ver Detalhes',
            url: 'https://exemplo.com/produto1',
            type: 'URL'
          },
          {
            id: '2',
            label: 'Comprar',
            type: 'REPLY'
          }
        ]
      },
      {
        text: 'Produto 2',
        image: 'https://exemplo.com/produto2.jpg',
        buttons: [
          {
            id: '1',
            label: 'Ligar',
            phone: '5511999999999',
            type: 'CALL'
          }
        ]
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
    puts 'Carrossel enviado com sucesso'
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-carousel"
    
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
        "message": "Confira nossos produtos!",
        "carousel": [
            [
                "text": "Produto 1",
                "image": "https://exemplo.com/produto1.jpg",
                "buttons": [
                    [
                        "id": "1",
                        "label": "Ver Detalhes",
                        "url": "https://exemplo.com/produto1",
                        "type": "URL"
                    ],
                    [
                        "id": "2",
                        "label": "Comprar",
                        "type": "REPLY"
                    ]
                ]
            ],
            [
                "text": "Produto 2",
                "image": "https://exemplo.com/produto2.jpg",
                "buttons": [
                    [
                        "id": "1",
                        "label": "Ligar",
                        "phone": "5511999999999",
                        "type": "CALL"
                    ]
                ]
            ]
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
                        print("Carrossel enviado com sucesso")
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

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-carousel"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = "Confira nossos produtos!"
        carousel = @(
            @{
                text = "Produto 1"
                image = "https://exemplo.com/produto1.jpg"
                buttons = @(
                    @{
                        id = "1"
                        label = "Ver Detalhes"
                        url = "https://exemplo.com/produto1"
                        type = "URL"
                    },
                    @{
                        id = "2"
                        label = "Comprar"
                        type = "REPLY"
                    }
                )
            },
            @{
                text = "Produto 2"
                image = "https://exemplo.com/produto2.jpg"
                buttons = @(
                    @{
                        id = "1"
                        label = "Ligar"
                        phone = "5511999999999"
                        type = "CALL"
                    }
                )
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Carrossel enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-carousel HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Confira nossos produtos!",
  "carousel": [
    {
      "text": "Produto 1",
      "image": "https://exemplo.com/produto1.jpg",
      "buttons": [
        {
          "id": "1",
          "label": "Ver Detalhes",
          "url": "https://exemplo.com/produto1",
          "type": "URL"
        },
        {
          "id": "2",
          "label": "Comprar",
          "type": "REPLY"
        }
      ]
    },
    {
      "text": "Produto 2",
      "image": "https://exemplo.com/produto2.jpg",
      "buttons": [
        {
          "id": "1",
          "label": "Ligar",
          "phone": "5511999999999",
          "type": "CALL"
        }
      ]
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
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-carousel";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"Confira nossos produtos!\","
                  << "\"carousel\":["
                  << "{\"text\":\"Produto 1\",\"image\":\"https://exemplo.com/produto1.jpg\",\"buttons\":[{\"id\":\"1\",\"label\":\"Ver Detalhes\",\"url\":\"https://exemplo.com/produto1\",\"type\":\"URL\"},{\"id\":\"2\",\"label\":\"Comprar\",\"type\":\"REPLY\"}]},"
                  << "{\"text\":\"Produto 2\",\"image\":\"https://exemplo.com/produto2.jpg\",\"buttons\":[{\"id\":\"1\",\"label\":\"Ligar\",\"phone\":\"5511999999999\",\"type\":\"CALL\"}]}"
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
                std::cout << "Carrossel enviado com sucesso" << std::endl;
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
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-carousel", instanceId, instanceToken);
    
    char payload[2048];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"Confira nossos produtos!\",\"carousel\":[{\"text\":\"Produto 1\",\"image\":\"https://exemplo.com/produto1.jpg\",\"buttons\":[{\"id\":\"1\",\"label\":\"Ver Detalhes\",\"url\":\"https://exemplo.com/produto1\",\"type\":\"URL\"},{\"id\":\"2\",\"label\":\"Comprar\",\"type\":\"REPLY\"}]},{\"text\":\"Produto 2\",\"image\":\"https://exemplo.com/produto2.jpg\",\"buttons\":[{\"id\":\"1\",\"label\":\"Ligar\",\"phone\":\"5511999999999\",\"type\":\"CALL\"}]}]}",
        phone);
    
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
                printf("Carrossel enviado com sucesso\n");
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

### Simple Carousel (Without Buttons)

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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      throw new Error('URL deve usar protocolo HTTP ou HTTPS');
    }
    return url;
  } catch (error) {
    throw new Error('URL inválida');
  }
}

// Validar cartões do carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
  }
  return carousel;
}

// Enviar carrossel simples
async function sendCarouselSimple(phone, message, carousel) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || typeof message !== 'string' || message.trim() === '') {
      throw new Error('A mensagem é obrigatória e não pode estar vazia');
    }
    const validatedCarousel = validateCarousel(carousel);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel.map(card => ({
        text: card.text.trim(),
        image: card.image,
      })),
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
    console.log('Carrossel enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar carrossel:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendCarouselSimple('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
  },
]);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface CarouselCard {
  text: string;
  image: string;
}

interface CarouselResponse {
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

// Validar URL
function validateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      throw new Error('URL deve usar protocolo HTTP ou HTTPS');
    }
    return url;
  } catch {
    throw new Error('URL inválida');
  }
}

// Validar carrossel
function validateCarousel(carousel: CarouselCard[]): CarouselCard[] {
  if (carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
  }
  return carousel;
}

// Função para enviar carrossel simples
async function sendCarouselSimple(
  phone: string,
  message: string,
  carousel: CarouselCard[]
): Promise<CarouselResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem é obrigatória');
  }
  const validatedCarousel = validateCarousel(carousel);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendCarouselSimple('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
  },
])
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
from urllib.parse import urlparse

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_url(url: str) -> str:
    """Valida URL"""
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ['http', 'https']:
            raise ValueError('URL deve usar protocolo HTTP ou HTTPS')
        return url
    except Exception:
        raise ValueError('URL inválida')

def validate_carousel(carousel: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida cartões do carrossel"""
    if not isinstance(carousel, list) or len(carousel) == 0:
        raise ValueError('O carrossel deve conter pelo menos um cartão')
    for card in carousel:
        if not card.get('text') or not isinstance(card['text'], str) or not card['text'].strip():
            raise ValueError('Cada cartão deve ter um texto válido')
        if not card.get('image') or not validate_url(card['image']):
            raise ValueError('Cada cartão deve ter uma URL de imagem válida')
    return carousel

def send_carousel_simple(phone: str, message: str, carousel: List[Dict[str, Any]]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not isinstance(message, str) or not message.strip():
        raise ValueError('A mensagem é obrigatória e não pode estar vazia')
    validated_carousel = validate_carousel(carousel)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-carousel"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "carousel": [
            {
                "text": card["text"].strip(),
                "image": card["image"]
            }
            for card in validated_carousel
        ]
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Carrossel enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_carousel_simple('5511999999999', 'Confira nossos produtos!', [
    {
        'text': 'Produto 1',
        'image': 'https://exemplo.com/produto1.jpg'
    },
    {
        'text': 'Produto 2',
        'image': 'https://exemplo.com/produto2.jpg'
    }
])
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
# Enviar carrossel simples via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-carousel" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Confira nossos produtos!\",
    \"carousel\": [
      {
        \"text\": \"Produto 1\",
        \"image\": \"https://exemplo.com/produto1.jpg\"
      },
      {
        \"text\": \"Produto 2\",
        \"image\": \"https://exemplo.com/produto2.jpg\"
      }
    ]
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
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
  }
  return carousel;
}

// Enviar carrossel simples
function sendCarouselSimple(phone, message, carousel) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || typeof message !== 'string' || message.trim() === '') {
        throw new Error('A mensagem é obrigatória');
      }
      const validatedCarousel = validateCarousel(carousel);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      carousel: carousel,
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
            console.log('Carrossel enviado com sucesso');
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
sendCarouselSimple('5511999999999', 'Confira nossos produtos!', [
  {
    text: 'Produto 1',
    image: 'https://exemplo.com/produto1.jpg',
  },
  {
    text: 'Produto 2',
    image: 'https://exemplo.com/produto2.jpg',
  },
])
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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
  }
  return carousel;
}

// Rota para enviar carrossel simples
app.post('/api/send-carousel-simple', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, carousel } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem é obrigatória',
      });
    }
    const validatedCarousel = validateCarousel(carousel);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      message: message.trim(),
      carousel: validatedCarousel,
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
    console.error('Erro ao enviar carrossel:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar carrossel',
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

// Validar URL
function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

// Validar carrossel
function validateCarousel(carousel) {
  if (!Array.isArray(carousel) || carousel.length === 0) {
    throw new Error('O carrossel deve conter pelo menos um cartão');
  }
  for (const card of carousel) {
    if (!card.text || typeof card.text !== 'string' || card.text.trim() === '') {
      throw new Error('Cada cartão deve ter um texto válido');
    }
    if (!card.image || !validateUrl(card.image)) {
      throw new Error('Cada cartão deve ter uma URL de imagem válida');
    }
  }
  return carousel;
}

// Middleware para enviar carrossel simples
app.use(async (ctx) => {
  if (ctx.path === '/api/send-carousel-simple' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, carousel } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || typeof message !== 'string' || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem é obrigatória',
        };
        return;
      }
      const validatedCarousel = validateCarousel(carousel);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-carousel`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        message: message.trim(),
        carousel: validatedCarousel,
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
      console.error('Erro ao enviar carrossel:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar carrossel',
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

public class SendCarouselSimple {
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

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-carousel",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray carousel = new JSONArray();
            
            JSONObject card1 = new JSONObject();
            card1.put("text", "Produto 1");
            card1.put("image", "https://exemplo.com/produto1.jpg");
            carousel.put(card1);
            
            JSONObject card2 = new JSONObject();
            card2.put("text", "Produto 2");
            card2.put("image", "https://exemplo.com/produto2.jpg");
            carousel.put(card2);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", "Confira nossos produtos!");
            payload.put("carousel", carousel);
            
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
                
                System.out.println("Carrossel enviado com sucesso");
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

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-carousel";
            
            var payload = new
            {
                phone = phone,
                message = "Confira nossos produtos!",
                carousel = new[]
                {
                    new { text = "Produto 1", image = "https://exemplo.com/produto1.jpg" },
                    new { text = "Produto 2", image = "https://exemplo.com/produto2.jpg" }
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
                    Console.WriteLine("Carrossel enviado com sucesso");
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-carousel", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": "Confira nossos produtos!",
        "carousel": []map[string]interface{}{
            {
                "text": "Produto 1",
                "image": "https://exemplo.com/produto1.jpg",
            },
            {
                "text": "Produto 2",
                "image": "https://exemplo.com/produto2.jpg",
            },
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
        
        fmt.Println("Carrossel enviado com sucesso")
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-carousel',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => 'Confira nossos produtos!',
        'carousel' => [
            [
                'text' => 'Produto 1',
                'image' => 'https://exemplo.com/produto1.jpg',
            ],
            [
                'text' => 'Produto 2',
                'image' => 'https://exemplo.com/produto2.jpg',
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
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Carrossel enviado com sucesso\n";
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

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-carousel")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: 'Confira nossos produtos!',
    carousel: [
      {
        text: 'Produto 1',
        image: 'https://exemplo.com/produto1.jpg'
      },
      {
        text: 'Produto 2',
        image: 'https://exemplo.com/produto2.jpg'
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
    puts 'Carrossel enviado com sucesso'
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

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-carousel"
    
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
        "message": "Confira nossos produtos!",
        "carousel": [
            [
                "text": "Produto 1",
                "image": "https://exemplo.com/produto1.jpg"
            ],
            [
                "text": "Produto 2",
                "image": "https://exemplo.com/produto2.jpg"
            ]
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
                        print("Carrossel enviado com sucesso")
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

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-carousel"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = "Confira nossos produtos!"
        carousel = @(
            @{
                text = "Produto 1"
                image = "https://exemplo.com/produto1.jpg"
            },
            @{
                text = "Produto 2"
                image = "https://exemplo.com/produto2.jpg"
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Carrossel enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-carousel HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "message": "Confira nossos produtos!",
  "carousel": [
    {
      "text": "Produto 1",
      "image": "https://exemplo.com/produto1.jpg"
    },
    {
      "text": "Produto 2",
      "image": "https://exemplo.com/produto2.jpg"
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
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-carousel";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"Confira nossos produtos!\","
                  << "\"carousel\":["
                  << "{\"text\":\"Produto 1\",\"image\":\"https://exemplo.com/produto1.jpg\"},"
                  << "{\"text\":\"Produto 2\",\"image\":\"https://exemplo.com/produto2.jpg\"}"
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
                std::cout << "Carrossel enviado com sucesso" << std::endl;
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
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-carousel", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"Confira nossos produtos!\",\"carousel\":[{\"text\":\"Produto 1\",\"image\":\"https://exemplo.com/produto1.jpg\"},{\"text\":\"Produto 2\",\"image\":\"https://exemplo.com/produto2.jpg\"}]}",
        phone);
    
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
                printf("Carrossel enviado com sucesso\n");
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

| Attribute | Type | Description |
|----------|------|-----------|
| `zaapId` | string | Unique ID of the message in Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message in WhatsApp. **Save this ID!** Use it to track delivery status through webhooks |
| `id` | string | Compatibility ID for Zapier and legacy systems. Has the same value as `messageId` |

**Example of response:**

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

**Important:**

- The `messageId` is the main identifier you should use for tracking
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery and Click Tracking:**

To know when the message was delivered, read, or when a carousel button was clicked, configure a webhook and monitor events. See more about [message receipt webhooks](/docs/webhooks/ao-receber) and [button click webhooks](/docs/webhooks/ao-receber#exemplo-de-retorno-de-carrosel).

### Error Codes

| Code | Description |
|------|-----------|
| `405` | Incorrect HTTP method. Check if you are using `POST` |
| `415` | Missing Content-Type. Add `Content-Type: application/json` to header |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

[Webhook for receiving message](/docs/webhooks/ao-receber) - Receive notifications when carousel buttons are clicked

---

## <Icon name="Lightbulb" size="md" /> Tips {#tips}

- **Button Types**: Use `URL` for links, `CALL` for calls, and `REPLY` for responses
- **Identifiers**: Use `id` in buttons to identify which one was clicked in the webhook
- **Images**: Use public and high-quality URLs for better visualization

---

## <Icon name="Rocket" size="md" /> Next Steps

- [Buttons](/docs/messages/botoes) - Understand how buttons work
- [Button Functionality Status](/docs/tips/funcionamento-botoes) - Current status of button functionality
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive clicks