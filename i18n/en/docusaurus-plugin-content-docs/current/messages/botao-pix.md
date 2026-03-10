---
id: botao-pix
title: PIX Button
sidebar_position: 23
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CreditCard" size="lg" /> PIX Button

Send messages with a button to copy a PIX key. Ideal for receiving payments, charges, and PIX payments via WhatsApp.

---

:::caution Attention

Button sending is currently available, however, there are some decisive factors for its operation. For more details, access the topic [Button Functionality](/docs/tips/funcionamento-botoes).

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Charges**: Send PIX key to receive payments
- **Sales**: Share PIX key to complete purchases
- **Services**: Send PIX key for service payments
- **Donations**: Share PIX key to receive donations

---

## <Icon name="Wand2" size="md" /> For No-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

- **`phone`**: The recipient's number where you want to send the PIX button. Use the full format: Country Code + Area Code + Number (e.g., `5511999999999`). **Important:** Use only numbers, no formatting or mask. For groups, use the group ID.

- **`pixKey`**: The PIX key that will be copied when the button is clicked. This is the key the user will use to make the payment. It can be:
  - CPF (11 digits, numbers only)
  - CNPJ (14 digits, numbers only)
  - Phone number (format: Country Code + Area Code + Number, e.g., `5511999999999`)
  - Email (e.g., `contact@example.com`)
  - Random key (EVP - Virtual Payment Address, UUID format)

- **`type`**: The type of PIX key you are sending. It must correspond to the `pixKey` type:
  - `CPF`: For PIX keys using CPF
  - `CNPJ`: For PIX keys using CNPJ
  - `PHONE`: For PIX keys using phone number
  - `EMAIL`: For PIX keys using email
  - `EVP`: For random PIX keys (Virtual Payment Address)

### Optional Fields

- **`merchantName`**: (Optional) Custom button title. If not provided, the default title will be "Pix". You can customize it to something more specific, like "Copy PIX key" or "Key for payment".

### Practical Example for No-Code

**Basic example (CPF):**

```json
{
  "phone": "5511999999999",
  "pixKey": "12345678900",
  "type": "CPF"
}
```

**Example with custom title:**

```json
{
  "phone": "5511999999999",
  "pixKey": "contact@example.com",
  "type": "EMAIL",
  "merchantName": "Copy PIX key"
}
```

**Example with random key (EVP):**

```json
{
  "phone": "5511999999999",
  "pixKey": "123e4567-e89b-12d3-a456-426614174000",
  "type": "EVP",
  "merchantName": "Key for payment"
}
```

**Important tips:**

- **Correct type**: Make sure `type` corresponds to the format of `pixKey`. For example, if the key is a CPF, the type must be `CPF`.
- **Key format**:

  - CPF: Numbers only, 11 digits (e.g., `12345678900`)
  - CNPJ: Numbers only, 14 digits (e.g., `12345678000190`)
  - Phone: Numbers only, format Country Code + Area Code + Number (e.g., `5511999999999`)
  - Email: Valid email format (e.g., `contact@example.com`)
  - EVP: UUID format (e.g., `123e4567-e89b-12d3-a456-426614174000`)
- **Button title**: Customize `merchantName` to make it clear what will be copied. This improves user experience.
- **Response**: The response will be an object with `zaapId`, `messageId`, and `id` (for compatibility with Zapier). Use `messageId` to track the message status via webhooks.

**Common use cases:**

- **Charges**: Send PIX key to receive payments
- **Sales**: Share PIX key to complete purchases
- **Services**: Send PIX key for service payments
- **Donations**: Share PIX key to receive donations
- **Recurring payments**: Send PIX key for subscriptions or monthly payments

**Important about buttons:**

:::caution Attention

Button sending is currently available, however, there are some decisive factors for its operation. For more details, access the topic [Button Functionality](/docs/tips/funcionamento-botoes).

:::

**Note about WhatsApp Web:**

:::warning WhatsApp Web Bug

In WhatsApp Web, received PIX messages do not change the chat state (do not mark as unread and do not go to the top of the list). However, the message is rendered normally. This is a bug in WhatsApp Web itself.

:::

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-button-pix
```

### <Icon name="Info" size="sm" /> Concept {#conceituacao}

With this method, you can send messages containing a PIX key with a copy button.

![PIX Button Example](/img/SendingMessagePixButton.jpeg)

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-----------|
| `phone` | string | Recipient's phone number in the format Country Code Area Code NUMBER (e.g., `5511999999999`). **IMPORTANT**: Send only numbers, no formatting or mask. For groups, use the group ID |
| `pixKey` | string | PIX key (CPF, CNPJ, phone, email, or random key) |
| `type` | string | PIX key type: `CPF`, `CNPJ`, `PHONE`, `EMAIL`, or `EVP` (random key) |

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `merchantName` | string | Title displayed on the button. If not provided, the default title will be "Pix" |

### PIX Key Types

| Type | Description | Example |
|------|-----------|---------|
| `CPF` | PIX key using CPF | `12345678900` |
| `CNPJ` | PIX key using CNPJ | `12345678000190` |
| `PHONE` | PIX key using phone number | `5511999999999` |
| `EMAIL` | PIX key using email | `contact@example.com` |
| `EVP` | Random PIX key (Virtual Payment Address) | `123e4567-e89b-12d3-a456-426614174000` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

### PIX Key with CPF

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone (numbers only)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (Country Code + Area Code + Number)');
  }
  return phone;
}

// Validate PIX CPF key (11 digits)
function validatePixKeyCPF(pixKey) {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(pixKey)) {
    throw new Error('Invalid CPF PIX key. Must contain exactly 11 digits');
  }
  return pixKey;
}

// Validate PIX type
function validatePixType(type) {
  const validTypes = ['CPF', 'CNPJ', 'PHONE', 'EMAIL', 'EVP'];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid PIX type. Use: ${validTypes.join(', ')}`);
  }
  return type;
}

// Send PIX button with CPF
async function sendButtonPixCPF(phone, pixKey, merchantName) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validatePixKeyCPF(pixKey);
    const validatedType = validatePixType('CPF');

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const payload = {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: validatedType,
      merchantName: merchantName ? merchantName.trim() : undefined,
    };
    
    // Remove undefined fields
    if (!payload.merchantName) delete payload.merchantName;
    
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
    console.log('PIX button sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending PIX button:', error.message);
    throw error;
  }
}

// Example usage
sendButtonPixCPF('5511999999999', '12345678900');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Interfaces
interface PixButtonResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate PIX CPF key
function validatePixKeyCPF(pixKey: string): string {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(pixKey)) {
    throw new Error('Invalid CPF PIX key. Must contain exactly 11 digits');
  }
  return pixKey;
}

// Function to send PIX button with CPF
async function sendButtonPixCPF(
  phone: string,
  pixKey: string,
  merchantName?: string
): Promise<PixButtonResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  const validatedPixKey = validatePixKeyCPF(pixKey);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;

  const payload: any = {
    phone: validatedPhone,
    pixKey: validatedPixKey,
    type: 'CPF',
    merchantName: merchantName?.trim(),
  };

  // Remove undefined fields
  if (!payload.merchantName) delete payload.merchantName;

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
sendButtonPixCPF('5511999999999', '12345678900')
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-security-token')

def validate_phone(phone: str) -> str:
    """Validate phone (numbers only)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (Country Code + Area Code + Number)')
    return phone

def validate_pix_key_cpf(pix_key: str) -> str:
    """Validate PIX CPF key (11 digits)"""
    if not re.match(r'^\d{11}$', pix_key):
        raise ValueError('Invalid CPF PIX key. Must contain exactly 11 digits')
    return pix_key

def send_button_pix_cpf(phone: str, pix_key: str, merchant_name: Optional[str] = None) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    validated_pix_key = validate_pix_key_cpf(pix_key)
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-pix"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "pixKey": validated_pix_key,
        "type": "CPF",
        "merchantName": merchant_name.strip() if merchant_name else None
    }
    
    # Remove None fields
    payload = {k: v for k, v in payload.items() if v is not None}
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('PIX button sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_button_pix_cpf('5511999999999', '12345678900')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-security-token}"

# ⚠️ VALIDATION: Validate phone (numbers only)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (Country Code + Area Code + Number)"
    exit 1
fi

# ⚠️ VALIDATION: Validate PIX CPF key (11 digits)
PIX_KEY="${2:-12345678900}"
if ! [[ "$PIX_KEY" =~ ^[0-9]{11}$ ]]; then
    echo "Error: Invalid CPF PIX key. Must contain exactly 11 digits"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send PIX button with CPF via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-pix" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"pixKey\": \"${PIX_KEY}\",
    \"type\": \"CPF\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE PIX_KEY
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX CPF key
function validatePixKeyCPF(pixKey) {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(pixKey)) {
    throw new Error('Invalid CPF PIX key');
  }
  return pixKey;
}

// Send PIX button with CPF
function sendButtonPixCPF(phone, pixKey, merchantName) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validatePixKeyCPF(pixKey);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    const payload = JSON.stringify({
      phone: phone,
      pixKey: pixKey,
      type: 'CPF',
      merchantName: merchantName || undefined,
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
            console.log('PIX button sent successfully');
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
sendButtonPixCPF('5511999999999', '12345678900')
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX CPF key
function validatePixKeyCPF(pixKey) {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(pixKey)) {
    throw new Error('Invalid CPF PIX key');
  }
  return pixKey;
}

// Route to send PIX button with CPF
app.post('/api/send-button-pix-cpf', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, pixKey, merchantName } = req.body;
    
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validatePixKeyCPF(pixKey);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: 'CPF',
      merchantName: merchantName?.trim(),
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
    console.error('Error sending PIX button:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending PIX button',
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX CPF key
function validatePixKeyCPF(pixKey) {
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(pixKey)) {
    throw new Error('Invalid CPF PIX key');
  }
  return pixKey;
}

// Middleware to send PIX button with CPF
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-pix-cpf' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, pixKey, merchantName } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validatePixKeyCPF(pixKey);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        pixKey: validatedPixKey,
        type: 'CPF',
        merchantName: merchantName?.trim(),
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
      console.error('Error sending PIX button:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending PIX button',
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

public class SendButtonPixCPF {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-security-token";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate PIX CPF key
    private static String validatePixKeyCPF(String pixKey) {
        if (!pixKey.matches("^\\d{11}$")) {
            throw new IllegalArgumentException("Invalid CPF PIX key. Must contain exactly 11 digits");
        }
        return pixKey;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("5511999999999");
            String pixKey = validatePixKeyCPF("12345678900");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-pix",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("pixKey", pixKey);
            payload.put("type", "CPF");
            
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
                
                System.out.println("PIX button sent successfully");
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
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-security-token";

    // Validate phone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate PIX CPF key
    private static string ValidatePixKeyCPF(string pixKey)
    {
        if (!Regex.IsMatch(pixKey, @"^\d{11}$"))
        {
            throw new ArgumentException("Invalid CPF PIX key. Must contain exactly 11 digits");
        }
        return pixKey;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("5511999999999");
            string pixKey = ValidatePixKeyCPF("12345678900");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-pix";
            
            var payload = new
            {
                phone = phone,
                pixKey = pixKey,
                type = "CPF"
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
                    Console.WriteLine("PIX button sent successfully");
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-security-token")
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

func validatePixKeyCPF(pixKey string) error {
    matched, _ := regexp.MatchString(`^\d{11}$`, pixKey)
    if !matched {
        return fmt.Errorf("invalid CPF PIX key. Must contain exactly 11 digits")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "5511999999999"
    pixKey := "12345678900"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    if err := validatePixKeyCPF(pixKey); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "pixKey": pixKey,
        "type": "CPF",
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
        
        fmt.Println("PIX button sent successfully")
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-security-token';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

// Validate PIX CPF key
function validatePixKeyCPF($pixKey) {
    if (!preg_match('/^\d{11}$/', $pixKey)) {
        throw new Exception('Invalid CPF PIX key. Must contain exactly 11 digits');
    }
    return $pixKey;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('5511999999999');
    $pixKey = validatePixKeyCPF('12345678900');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-pix',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'pixKey' => $pixKey,
        'type' => 'CPF',
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
        echo "PIX button sent successfully\n";
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
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'YOUR_INSTANCE'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-security-token'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validate PIX CPF key
def validate_pix_key_cpf(pix_key)
  raise 'Invalid CPF PIX key. Must contain exactly 11 digits' unless pix_key.match?(/^\d{11}$/)
  pix_key
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('5511999999999')
  pix_key = validate_pix_key_cpf('12345678900')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-pix")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    pixKey: pix_key,
    type: 'CPF'
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'PIX button sent successfully'
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "YOUR_INSTANCE"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-security-token"

// Validate phone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone. Use only numbers"])
    }
    return phone
}

// Validate PIX CPF key
func validatePixKeyCPF(_ pixKey: String) throws -> String {
    let cpfRegex = "^\\d{11}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", cpfRegex)
    if !predicate.evaluate(with: pixKey) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid CPF PIX key. Must contain exactly 11 digits"])
    }
    return pixKey
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("5511999999999")
    let pixKey = try validatePixKeyCPF("12345678900")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-pix"
    
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
        "pixKey": pixKey,
        "type": "CPF"
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
                        print("PIX button sent successfully")
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
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "YOUR_INSTANCE" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-security-token" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

# Validate PIX CPF key
function Validate-PixKeyCPF {
    param([string]$PixKey)
    if ($PixKey -notmatch '^\d{11}$') {
        throw "Invalid CPF PIX key. Must contain exactly 11 digits"
    }
    return $PixKey
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "5511999999999"
    $pixKey = Validate-PixKeyCPF "12345678900"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-pix"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        pixKey = $pixKey
        type = "CPF"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "PIX button sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-pix HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-security-token

{
  "phone": "5511999999999",
  "pixKey": "12345678900",
  "type": "CPF"
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

bool validatePixKeyCPF(const std::string& pixKey) {
    std::regex cpfRegex("^\\d{11}$");
    return std::regex_match(pixKey, cpfRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    std::string phone = "5511999999999";
    std::string pixKey = "12345678900";
    
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    if (!validatePixKeyCPF(pixKey)) {
        std::cerr << "Error: Invalid CPF PIX key" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-pix";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"pixKey\":\"" << pixKey << "\","
                  << "\"type\":\"CPF\""
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
                std::cout << "PIX button sent successfully" << std::endl;
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

int validatePixKeyCPF(const char* pixKey) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]{11}$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, pixKey, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    char* phone = "5511999999999";
    char* pixKey = "12345678900";
    
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    if (!validatePixKeyCPF(pixKey)) {
        fprintf(stderr, "Error: Invalid CPF PIX key\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken);
    
    char payload[256];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"pixKey\":\"%s\",\"type\":\"CPF\"}",
        phone, pixKey);
    
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
                printf("PIX button sent successfully\n");
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

### Random PIX Key (EVP) with Custom Title

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone (numbers only)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (Country Code + Area Code + Number)');
  }
  return phone;
}

// Validate PIX EVP key (UUID format)
function validatePixKeyEVP(pixKey) {
  const evpRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!evpRegex.test(pixKey)) {
    throw new Error('Invalid EVP PIX key. Use UUID format (e.g., 123e4567-e89b-12d3-a456-426614174000)');
  }
  return pixKey;
}

// Validate PIX type
function validatePixType(type) {
  const validTypes = ['CPF', 'CNPJ', 'PHONE', 'EMAIL', 'EVP'];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid PIX type. Use: ${validTypes.join(', ')}`);
  }
  return type;
}

// Send PIX button EVP with custom title
async function sendButtonPixEVP(phone, pixKey, merchantName) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validatePixKeyEVP(pixKey);
    const validatedType = validatePixType('EVP');
    
    if (!merchantName || typeof merchantName !== 'string' || merchantName.trim() === '') {
      throw new Error('merchantName is required for this example');
    }

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const payload = {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: validatedType,
      merchantName: merchantName.trim(),
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
      // ⚠️ SECURITY: Do not expose sensitive details in error logs
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SECURITY: Do not log tokens or sensitive data
    console.log('PIX button sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending PIX button:', error.message);
    throw error;
  }
}

// Example usage
sendButtonPixEVP('5511999999999', '123e4567-e89b-12d3-a456-426614174000', 'Quick Payment');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Interfaces
interface PixButtonResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate PIX EVP key
function validatePixKeyEVP(pixKey: string): string {
  const evpRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!evpRegex.test(pixKey)) {
    throw new Error('Invalid EVP PIX key. Use UUID format');
  }
  return pixKey;
}

// Function to send PIX button EVP
async function sendButtonPixEVP(
  phone: string,
  pixKey: string,
  merchantName: string
): Promise<PixButtonResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  const validatedPixKey = validatePixKeyEVP(pixKey);
  
  if (!merchantName || merchantName.trim() === '') {
    throw new Error('merchantName is required');
  }

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;

  const payload = {
    phone: validatedPhone,
    pixKey: validatedPixKey,
    type: 'EVP' as const,
    merchantName: merchantName.trim(),
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
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response.json();
}

// Execute
sendButtonPixEVP('5511999999999', '123e4567-e89b-12d3-a456-426614174000', 'Quick Payment')
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
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-security-token')

def validate_phone(phone: str) -> str:
    """Validate phone (numbers only)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (Country Code + Area Code + Number)')
    return phone

def validate_pix_key_evp(pix_key: str) -> str:
    """Validate PIX EVP key (UUID format)"""
    evp_regex = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    if not re.match(evp_regex, pix_key, re.IGNORECASE):
        raise ValueError('Invalid EVP PIX key. Use UUID format (e.g., 123e4567-e89b-12d3-a456-426614174000)')
    return pix_key

def send_button_pix_evp(phone: str, pix_key: str, merchant_name: str) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    validated_pix_key = validate_pix_key_evp(pix_key)
    
    if not merchant_name or not isinstance(merchant_name, str) or not merchant_name.strip():
        raise ValueError('merchantName is required for this example')
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-pix"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "pixKey": validated_pix_key,
        "type": "EVP",
        "merchantName": merchant_name.strip()
    }
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('PIX button sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_button_pix_evp('5511999999999', '123e4567-e89b-12d3-a456-426614174000', 'Quick Payment')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-security-token}"

# ⚠️ VALIDATION: Validate phone (numbers only)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (Country Code + Area Code + Number)"
    exit 1
fi

# ⚠️ VALIDATION: Validate PIX EVP key (UUID format)
PIX_KEY="${2:-123e4567-e89b-12d3-a456-426614174000}"
if ! [[ "$PIX_KEY" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ ]]; then
    echo "Error: Invalid EVP PIX key. Use UUID format"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send PIX button EVP with custom title via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-pix" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"pixKey\": \"${PIX_KEY}\",
    \"type\": \"EVP\",
    \"merchantName\": \"Quick Payment\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE PIX_KEY
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX EVP key
function validatePixKeyEVP(pixKey) {
  const evpRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!evpRegex.test(pixKey)) {
    throw new Error('Invalid EVP PIX key');
  }
  return pixKey;
}

// Send PIX button EVP
function sendButtonPixEVP(phone, pixKey, merchantName) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validatePixKeyEVP(pixKey);
      if (!merchantName || typeof merchantName !== 'string' || merchantName.trim() === '') {
        throw new Error('merchantName is required');
      }
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    const payload = JSON.stringify({
      phone: phone,
      pixKey: pixKey,
      type: 'EVP',
      merchantName: merchantName.trim(),
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
            console.log('PIX button sent successfully');
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
sendButtonPixEVP('5511999999999', '123e4567-e89b-12d3-a456-426614174000', 'Quick Payment')
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX EVP key
function validatePixKeyEVP(pixKey) {
  const evpRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!evpRegex.test(pixKey)) {
    throw new Error('Invalid EVP PIX key');
  }
  return pixKey;
}

// Route to send PIX button EVP
app.post('/api/send-button-pix-evp', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, pixKey, merchantName } = req.body;
    
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validatePixKeyEVP(pixKey);
    
    if (!merchantName || typeof merchantName !== 'string' || merchantName.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'merchantName is required',
      });
    }

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: 'EVP',
      merchantName: merchantName.trim(),
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
    console.error('Error sending PIX button:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending PIX button',
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate PIX EVP key
function validatePixKeyEVP(pixKey) {
  const evpRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!evpRegex.test(pixKey)) {
    throw new Error('Invalid EVP PIX key');
  }
  return pixKey;
}

// Middleware to send PIX button EVP
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-pix-evp' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, pixKey, merchantName } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validatePixKeyEVP(pixKey);
      
      if (!merchantName || typeof merchantName !== 'string' || merchantName.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'merchantName is required',
        };
        return;
      }

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        pixKey: validatedPixKey,
        type: 'EVP',
        merchantName: merchantName.trim(),
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
      console.error('Error sending PIX button:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending PIX button',
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

public class SendButtonPixEVP {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-security-token";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate PIX EVP key
    private static String validatePixKeyEVP(String pixKey) {
        if (!pixKey.matches("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")) {
            throw new IllegalArgumentException("Invalid EVP PIX key. Use UUID format");
        }
        return pixKey;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("5511999999999");
            String pixKey = validatePixKeyEVP("123e4567-e89b-12d3-a456-426614174000");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-pix",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("pixKey", pixKey);
            payload.put("type", "EVP");
            payload.put("merchantName", "Quick Payment");
            
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
                
                System.out.println("PIX button sent successfully");
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
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-security-token";

    // Validate phone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate PIX EVP key
    private static string ValidatePixKeyEVP(string pixKey)
    {
        if (!Regex.IsMatch(pixKey, @"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", RegexOptions.IgnoreCase))
        {
            throw new ArgumentException("Invalid EVP PIX key. Use UUID format");
        }
        return pixKey;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("5511999999999");
            string pixKey = ValidatePixKeyEVP("123e4567-e89b-12d3-a456-426614174000");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-pix";
            
            var payload = new
            {
                phone = phone,
                pixKey = pixKey,
                type = "EVP",
                merchantName = "Quick Payment"
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
                    Console.WriteLine("PIX button sent successfully");
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-security-token")
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

func validatePixKeyEVP(pixKey string) error {
    matched, _ := regexp.MatchString(`^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`, pixKey)
    if !matched {
        return fmt.Errorf("invalid EVP PIX key. Use UUID format")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "5511999999999"
    pixKey := "123e4567-e89b-12d3-a456-426614174000"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    if err := validatePixKeyEVP(pixKey); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "pixKey": pixKey,
        "type": "EVP",
        "merchantName": "Quick Payment",
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
        
        fmt.Println("PIX button sent successfully")
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-security-token';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

// Validate PIX EVP key
function validatePixKeyEVP($pixKey) {
    if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $pixKey)) {
        throw new Exception('Invalid EVP PIX key. Use UUID format');
    }
    return $pixKey;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('5511999999999');
    $pixKey = validatePixKeyEVP('123e4567-e89b-12d3-a456-426614174000');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-pix',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'pixKey' => $pixKey,
        'type' => 'EVP',
        'merchantName' => 'Quick Payment',
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
        echo "PIX button sent successfully\n";
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
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'YOUR_INSTANCE'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-security-token'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validate PIX EVP key
def validate_pix_key_evp(pix_key)
  raise 'Invalid EVP PIX key. Use UUID format' unless pix_key.match?(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  pix_key
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('5511999999999')
  pix_key = validate_pix_key_evp('123e4567-e89b-12d3-a456-426614174000')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-pix")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    pixKey: pix_key,
    type: 'EVP',
    merchantName: 'Quick Payment'
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'PIX button sent successfully'
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "YOUR_INSTANCE"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-security-token"

// Validate phone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone. Use only numbers"])
    }
    return phone
}

// Validate PIX EVP key
func validatePixKeyEVP(_ pixKey: String) throws -> String {
    let evpRegex = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
    let predicate = NSPredicate(format: "SELF MATCHES[c] %@", evpRegex)
    if !predicate.evaluate(with: pixKey) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid EVP PIX key. Use UUID format"])
    }
    return pixKey
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("5511999999999")
    let pixKey = try validatePixKeyEVP("123e4567-e89b-12d3-a456-426614174000")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-pix"
    
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
        "pixKey": pixKey,
        "type": "EVP",
        "merchantName": "Quick Payment"
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
                        print("PIX button sent successfully")
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
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "YOUR_INSTANCE" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-security-token" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

# Validate PIX EVP key
function Validate-PixKeyEVP {
    param([string]$PixKey)
    if ($PixKey -notmatch '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$') {
        throw "Invalid EVP PIX key. Use UUID format"
    }
    return $PixKey
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "5511999999999"
    $pixKey = Validate-PixKeyEVP "123e4567-e89b-12d3-a456-426614174000"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-pix"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        pixKey = $pixKey
        type = "EVP"
        merchantName = "Quick Payment"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "PIX button sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-pix HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-security-token

{
  "phone": "5511999999999",
  "pixKey": "123e4567-e89b-12d3-a456-426614174000",
  "type": "EVP",
  "merchantName": "Quick Payment"
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

bool validatePixKeyEVP(const std::string& pixKey) {
    std::regex evpRegex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", std::regex_constants::icase);
    return std::regex_match(pixKey, evpRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    std::string phone = "5511999999999";
    std::string pixKey = "123e4567-e89b-12d3-a456-426614174000";
    
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    if (!validatePixKeyEVP(pixKey)) {
        std::cerr << "Error: Invalid EVP PIX key" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-pix";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"pixKey\":\"" << pixKey << "\","
                  << "\"type\":\"EVP\","
                  << "\"merchantName\":\"Quick Payment\""
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
                std::cout << "PIX button sent successfully" << std::endl;
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

int validatePixKeyEVP(const char* pixKey) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", REG_EXTENDED | REG_ICASE);
    if (ret) return 0;
    ret = regexec(&regex, pixKey, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    char* phone = "5511999999999";
    char* pixKey = "123e4567-e89b-12d3-a456-426614174000";
    
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    if (!validatePixKeyEVP(pixKey)) {
        fprintf(stderr, "Error: Invalid EVP PIX key\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"pixKey\":\"%s\",\"type\":\"EVP\",\"merchantName\":\"Quick Payment\"}",
        phone, pixKey);
    
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
                printf("PIX button sent successfully\n");
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

### PIX Key with Email

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone (numbers only)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (Country Code + Area Code + Number)');
  }
  return phone;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email. Use a valid format (e.g., contact@example.com)');
  }
  return email;
}

// Validate PIX type
function validatePixType(type) {
  const validTypes = ['CPF', 'CNPJ', 'PHONE', 'EMAIL', 'EVP'];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid PIX type. Use: ${validTypes.join(', ')}`);
  }
  return type;
}

// Send PIX button with Email
async function sendButtonPixEmail(phone, pixKey, merchantName) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validateEmail(pixKey);
    const validatedType = validatePixType('EMAIL');

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const payload = {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: validatedType,
      merchantName: merchantName ? merchantName.trim() : undefined,
    };
    
    // Remove undefined fields
    if (!payload.merchantName) delete payload.merchantName;
    
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
    console.log('PIX button sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending PIX button:', error.message);
    throw error;
  }
}

// Example usage
sendButtonPixEmail('5511999999999', 'contact@example.com');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Interfaces
interface PixButtonResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate email
function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email. Use a valid format');
  }
  return email;
}

// Function to send PIX button with Email
async function sendButtonPixEmail(
  phone: string,
  pixKey: string,
  merchantName?: string
): Promise<PixButtonResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  const validatedPixKey = validateEmail(pixKey);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;

  const payload: any = {
    phone: validatedPhone,
    pixKey: validatedPixKey,
    type: 'EMAIL',
    merchantName: merchantName?.trim(),
  };

  // Remove undefined fields
  if (!payload.merchantName) delete payload.merchantName;

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
sendButtonPixEmail('5511999999999', 'contact@example.com')
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-security-token')

def validate_phone(phone: str) -> str:
    """Validate phone (numbers only)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (Country Code + Area Code + Number)')
    return phone

def validate_email(email: str) -> str:
    """Validate email"""
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not re.match(email_regex, email):
        raise ValueError('Invalid email. Use a valid format (e.g., contact@example.com)')
    return email

def send_button_pix_email(phone: str, pix_key: str, merchant_name: Optional[str] = None) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    validated_pix_key = validate_email(pix_key)
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-pix"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "pixKey": validated_pix_key,
        "type": "EMAIL",
        "merchantName": merchant_name.strip() if merchant_name else None
    }
    
    # Remove None fields
    payload = {k: v for k, v in payload.items() if v is not None}
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('PIX button sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_button_pix_email('5511999999999', 'contact@example.com')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-security-token}"

# ⚠️ VALIDATION: Validate phone (numbers only)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (Country Code + Area Code + Number)"
    exit 1
fi

# ⚠️ VALIDATION: Validate email
PIX_KEY="${2:-contact@example.com}"
if ! [[ "$PIX_KEY" =~ ^[^\s@]+@[^\s@]+\.[^\s@]+$ ]]; then
    echo "Error: Invalid email. Use a valid format (e.g., contact@example.com)"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send PIX button with Email via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-pix" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"pixKey\": \"${PIX_KEY}\",
    \"type\": \"EMAIL\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE PIX_KEY
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
  }
  return email;
}

// Send PIX button with Email
function sendButtonPixEmail(phone, pixKey, merchantName) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validateEmail(pixKey);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    const payload = JSON.stringify({
      phone: phone,
      pixKey: pixKey,
      type: 'EMAIL',
      merchantName: merchantName || undefined,
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
            console.log('PIX button sent successfully');
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
sendButtonPixEmail('5511999999999', 'contact@example.com')
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
  }
  return email;
}

// Route to send PIX button with Email
app.post('/api/send-button-pix-email', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, pixKey, merchantName } = req.body;
    
    const validatedPhone = validatePhone(phone);
    const validatedPixKey = validateEmail(pixKey);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      pixKey: validatedPixKey,
      type: 'EMAIL',
      merchantName: merchantName?.trim(),
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
    console.error('Error sending PIX button:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending PIX button',
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
  }
  return email;
}

// Middleware to send PIX button with Email
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-pix-email' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, pixKey, merchantName } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      const validatedPixKey = validateEmail(pixKey);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-pix`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        pixKey: validatedPixKey,
        type: 'EMAIL',
        merchantName: merchantName?.trim(),
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
      console.error('Error sending PIX button:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending PIX button',
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

public class SendButtonPixEmail {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-security-token";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate email
    private static String validateEmail(String email) {
        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Invalid email. Use a valid format");
        }
        return email;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("5511999999999");
            String pixKey = validateEmail("contact@example.com");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-pix",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("pixKey", pixKey);
            payload.put("type", "EMAIL");
            
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
                
                System.out.println("PIX button sent successfully");
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
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-security-token";

    // Validate phone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate email
    private static string ValidateEmail(string email)
    {
        if (!Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
        {
            throw new ArgumentException("Invalid email. Use a valid format");
        }
        return email;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("5511999999999");
            string pixKey = ValidateEmail("contact@example.com");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-pix";
            
            var payload = new
            {
                phone = phone,
                pixKey = pixKey,
                type = "EMAIL"
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
                    Console.WriteLine("PIX button sent successfully");
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-security-token")
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

func validateEmail(email string) error {
    matched, _ := regexp.MatchString(`^[^\s@]+@[^\s@]+\.[^\s@]+$`, email)
    if !matched {
        return fmt.Errorf("invalid email. Use a valid format")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "5511999999999"
    pixKey := "contact@example.com"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    if err := validateEmail(pixKey); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "pixKey": pixKey,
        "type": "EMAIL",
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
        
        fmt.Println("PIX button sent successfully")
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-security-token';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

// Validate email
function validateEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email. Use a valid format');
    }
    return $email;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('5511999999999');
    $pixKey = validateEmail('contact@example.com');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-pix',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'pixKey' => $pixKey,
        'type' => 'EMAIL',
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
        echo "PIX button sent successfully\n";
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
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'YOUR_INSTANCE'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-security-token'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validate email
def validate_email(email)
  raise 'Invalid email. Use a valid format' unless email.match?(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  email
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('5511999999999')
  pix_key = validate_email('contact@example.com')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-pix")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    pixKey: pix_key,
    type: 'EMAIL'
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'PIX button sent successfully'
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "YOUR_INSTANCE"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-security-token"

// Validate phone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone. Use only numbers"])
    }
    return phone
}

// Validate email
func validateEmail(_ email: String) throws -> String {
    let emailRegex = "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
    if !predicate.evaluate(with: email) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid email. Use a valid format"])
    }
    return email
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("5511999999999")
    let pixKey = try validateEmail("contact@example.com")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-pix"
    
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
        "pixKey": pixKey,
        "type": "EMAIL"
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
                        print("PIX button sent successfully")
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
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "YOUR_INSTANCE" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-security-token" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

# Validate email
function Validate-Email {
    param([string]$Email)
    if ($Email -notmatch '^[^\s@]+@[^\s@]+\.[^\s@]+$') {
        throw "Invalid email. Use a valid format"
    }
    return $Email
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "5511999999999"
    $pixKey = Validate-Email "contact@example.com"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-pix"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        pixKey = $pixKey
        type = "EMAIL"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "PIX button sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-pix HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-security-token

{
  "phone": "5511999999999",
  "pixKey": "contact@example.com",
  "type": "EMAIL"
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

bool validateEmail(const std::string& email) {
    std::regex emailRegex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    return std::regex_match(email, emailRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    std::string phone = "5511999999999";
    std::string pixKey = "contact@example.com";
    
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    if (!validateEmail(pixKey)) {
        std::cerr << "Error: Invalid email" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-pix";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"pixKey\":\"" << pixKey << "\","
                  << "\"type\":\"EMAIL\""
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
                std::cout << "PIX button sent successfully" << std::endl;
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

int validateEmail(const char* email) {
    regex_t regex;
    int ret = regcomp(&regex, "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, email, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    
    // ⚠️ VALIDATION
    char* phone = "5511999999999";
    char* pixKey = "contact@example.com";
    
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    if (!validateEmail(pixKey)) {
        fprintf(stderr, "Error: Invalid email\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-pix", instanceId, instanceToken);
    
    char payload[256];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"pixKey\":\"%s\",\"type\":\"EMAIL\"}",
        phone, pixKey);
    
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
                printf("PIX button sent successfully\n");
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

### 200 OK

| Attribute | Type | Description |
|----------|------|-----------|
| `zaapId` | string | Unique message ID in the Z-API system |
| `messageId` | string | Message ID in WhatsApp |
| `id` | string | Added for Zapier compatibility, has the same value as `messageId` |

**Response example:**

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

**Important:**

- `messageId` is the main identifier you should use to track the message
- `zaapId` is used internally by Z-API for processing
- `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered, read, or if there was any error, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber#exemplo-de-retorno-de-botão-de-chave-pix).

### Common Errors {#erros-comuns}

| Code | Reason | How to resolve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `phone`, `pixKey` and `type` (type must match the key format) |
| 401 | Invalid token | Check the `Client-Token` header |
| 405 | Incorrect method | Make sure you are using the `POST` method |
| 415 | Incorrect Content-Type | Add `Content-Type: application/json` to the header |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; contact support if it persists |

---

## <Icon name="Warning" size="md" /> Important Note {#observacao}

:::warning WhatsApp Web Bug

In WhatsApp Web, received PIX messages do not change the chat state, meaning:

- The chat is not marked as unread
- The chat does not go to the top of the chat list

However, the message is rendered normally. This is a bug in WhatsApp Web itself.

:::

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

[Webhook on receiving message](/docs/webhooks/ao-receber) - Receive notifications when the PIX button is clicked

---

## <Icon name="Lightbulb" size="md" /> Tips {#dicas}

- **Key Types**: Use `EVP` for random keys (more secure)
- **Custom Title**: Use `merchantName` to customize the button text
- **Validation**: Ensure the PIX key is correct before sending
- **WhatsApp Web**: Be aware of the bug mentioned above in WhatsApp Web

---

## <Icon name="Rocket" size="md" /> Next Steps

- [OTP Button](/docs/messages/botao-otp) - Send OTP codes with button
- [Button Functionality](/docs/tips/funcionamento-botoes) - Understand how buttons work
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive clicks