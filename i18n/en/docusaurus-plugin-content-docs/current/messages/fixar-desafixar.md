---
id: fixar-desafixar
sidebar_position: 33
title: Pin/Unpin message
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Pin" size="lg" /> Pin/Unpin message

Pin or unpin a message in a chat using the Z-API. Pinned messages appear at the top of the chat and are highlighted for easy access.

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/pin-message
```

### Headers {#headers}

| Header        | Type   | Required | Description               |
|---------------|--------|----------|---------------------------|
| Client-Token  | string | Yes      | Authentication token      |
| Content-Type  | string | Yes      | Must be `application/json`|

### Request Body {#request-body}

```json
{
  "phone": "5511999999999",
  "messageId": "77DF5293EBC176FFA6A88838E7A6AD83",
  "messageAction": "pin | unpin",
  "pinMessageDuration": "24_hours | 7_days | 30_days"
}
```

### Parameters {#parameters}

| Field               | Type   | Required | Description                                           |
|---------------------|--------|----------|-------------------------------------------------------|
| phone               | string | Yes      | Contact number or group ID                            |
| messageId           | string | Yes      | ID of the message to be pinned or unpinned            |
| messageAction       | string | Yes      | Action to perform: `pin` or `unpin`                   |
| pinMessageDuration  | string | Yes      | Duration for which the message will be pinned (ignored when unpinning) |

## <Icon name="Info" size="md" /> How It Works {#how-it-works}

When you pin a message:

1. **Highlighted Message** – The message appears at the top of the chat.
2. **Pin Icon** – A pin icon appears next to the message.
3. **Quick Access** – Users can quickly access important information.
4. **Limit** – You can pin up to 3 messages per chat.

![Example of pinned message](/img/pin-message.jpeg)

:::tip Recommended Use

Use pinned messages for:
- Important information (times, addresses, contacts)
- Group rules
- Announcements and warnings
- Important links

:::

## <Icon name="CheckCircle" size="md" /> Responses {#responses}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Field     | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| zaapId    | string | Unique message ID in the Z-API system (for internal tracking)               |
| messageId | string | Unique message ID on WhatsApp. **Save this ID!** Use it to track status.    |
| id        | string | Compatibility ID for Zapier and legacy systems. Same value as `messageId`.  |

## <Icon name="AlertTriangle" size="md" /> Common Errors {#common-errors}

| Code | Reason               | How to Resolve                                                |
|------|----------------------|---------------------------------------------------------------|
| 400  | Invalid parameters   | Check `phone`, `messageId` and `messageAction`                |
| 401  | Invalid token        | Verify the `Client-Token` header                               |
| 403  | No permission        | You need to be a group admin to pin messages                  |
| 404  | Message not found    | Verify that the `messageId` exists and is valid                |
| 429  | Rate limit           | Wait and try again                                             |
| 5xx  | Internal error       | Try again; contact support if it persists                      |

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone (numbers only)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (country code + area code + number)');
  }
  return phone;
}

// Validate messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId is required and must be a non-empty string');
  }
  return messageId.trim();
}

// Pin or unpin a message
async function pinMessage(phone, messageId, pin) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedPin = Boolean(pin);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
      pin: validatedPin,
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
    if (data.value) {
      console.log(pin ? 'Message pinned successfully' : 'Message unpinned successfully');
      return data;
    } else {
      throw new Error(data.message || 'Error pinning/unpinning message');
    }
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error pinning/unpinning message:', error.message);
    throw error;
  }
}

// Usage example: pin message
pinMessage('5511999999999', '3EB0C767F26A', true);

// Usage example: unpin message
// pinMessage('5511999999999', '3EB0C767F26A', false);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Interfaces
interface PinMessageResponse {
  value: boolean;
  message: string;
}

// Validate phone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers');
  }
  return phone;
}

// Validate messageId
function validateMessageId(messageId: string): string {
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Pin or unpin a message
async function pinMessage(
  phone: string,
  messageId: string,
  pin: boolean
): Promise<PinMessageResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  const validatedMessageId = validateMessageId(messageId);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;

  const payload = {
    phone: validatedPhone,
    messageId: validatedMessageId,
    pin: pin,
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
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();
  if (!data.value) {
    throw new Error(data.message || 'Error pinning/unpinning message');
  }

  return data;
}

// Execute
pinMessage('5511999999999', '3EB0C767F26A', true)
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
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-security-token')

def validate_phone(phone: str) -> str:
    """Validate phone (numbers only)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (country code + area code + number)')
    return phone

def validate_message_id(message_id: str) -> str:
    """Validate messageId"""
    if not message_id or not isinstance(message_id, str) or not message_id.strip():
        raise ValueError('messageId is required and must be a non-empty string')
    return message_id.strip()

def pin_message(phone: str, message_id: str, pin: bool) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    validated_message_id = validate_message_id(message_id)
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/pin-message"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": validated_message_id,
        "pin": pin
    }

    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()

        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        if result.get('value'):
            action = 'pinned' if pin else 'unpinned'
            print(f'Message {action} successfully')
            return result
        else:
            raise ValueError(result.get('message', 'Error pinning/unpinning message'))
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Usage example: pin message
pin_message('5511999999999', '3EB0C767F26A', True)

# Usage example: unpin message
# pin_message('5511999999999', '3EB0C767F26A', False)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-security-token}"

# ⚠️ VALIDATION: Validate phone (numbers only)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (country code + area code + number)"
    exit 1
fi

# ⚠️ VALIDATION: Validate messageId
MESSAGE_ID="${2:-3EB0C767F26A}"
if [ -z "$MESSAGE_ID" ] || [ "$MESSAGE_ID" = "" ]; then
    echo "Error: messageId is required and must be a non-empty string"
    exit 1
fi

# ⚠️ VALIDATION: Validate pin (true or false)
PIN="${3:-true}"
if [ "$PIN" != "true" ] && [ "$PIN" != "false" ]; then
    echo "Error: pin must be 'true' or 'false'"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Pin or unpin message via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/pin-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"${MESSAGE_ID}\",
    \"pin\": ${PIN}
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clean up sensitive variables after use (optional)
unset INSTANCE_ID CLIENT_TOKEN PHONE MESSAGE_ID PIN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Pin or unpin a message
function pinMessage(phone, messageId, pin) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/pin-message`;
    const payload = JSON.stringify({
      phone: phone,
      messageId: messageId,
      pin: Boolean(pin),
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
            if (result.value) {
              console.log(pin ? 'Message pinned successfully' : 'Message unpinned successfully');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Error pinning/unpinning message'));
            }
          } catch (error) {
            reject(new Error('Error parsing JSON response'));
          }
        } else {
          reject(new Error(`HTTP error ${res.statusCode}`));
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
pinMessage('5511999999999', '3EB0C767F26A', true)
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Route to pin or unpin a message
app.post('/api/pin-message', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, messageId, pin } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: validatedMessageId,
      pin: Boolean(pin),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    if (response.data.value) {
      res.json({
        success: true,
        data: response.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.message || 'Error pinning/unpinning message',
      });
    }
  } catch (error) {
    console.error('Error pinning/unpinning message:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error pinning/unpinning message',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone');
  }
  return phone;
}

// Validate messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Middleware to pin or unpin a message
app.use(async (ctx) => {
  if (ctx.path === '/api/pin-message' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, messageId, pin } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/pin-message`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: validatedMessageId,
        pin: Boolean(pin),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      if (response.data.value) {
        ctx.body = {
          success: true,
          data: response.data,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: response.data.message || 'Error pinning/unpinning message',
        };
      }
    } catch (error) {
      console.error('Error pinning/unpinning message:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error pinning/unpinning message',
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

public class PinMessage {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-security-token";

    // Validate phone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Invalid phone. Use only numbers");
        }
        return phone;
    }

    // Validate messageId
    private static String validateMessageId(String messageId) {
        if (messageId == null || messageId.trim().isEmpty()) {
            throw new IllegalArgumentException("messageId is required");
        }
        return messageId.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validatePhone("5511999999999");
            String messageId = validateMessageId("3EB0C767F26A");
            boolean pin = true; // true to pin, false to unpin

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/pin-message",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("messageId", messageId);
            payload.put("pin", pin);
            
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
                
                JSONObject result = new JSONObject(response.toString());
                if (result.getBoolean("value")) {
                    System.out.println(pin ? "Message pinned successfully" : "Message unpinned successfully");
                    System.out.println(result.toString());
                } else {
                    System.err.println("Error: " + result.getString("message"));
                }
            } else {
                System.err.println("HTTP error " + responseCode);
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

    // Validate messageId
    private static string ValidateMessageId(string messageId)
    {
        if (string.IsNullOrWhiteSpace(messageId))
        {
            throw new ArgumentException("messageId is required");
        }
        return messageId.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidatePhone("5511999999999");
            string messageId = ValidateMessageId("3EB0C767F26A");
            bool pin = true; // true to pin, false to unpin

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/pin-message";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                pin = pin
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
                    var jsonDoc = JsonDocument.Parse(result);
                    var root = jsonDoc.RootElement;
                    
                    if (root.GetProperty("value").GetBoolean())
                    {
                        Console.WriteLine(pin ? "Message pinned successfully" : "Message unpinned successfully");
                        Console.WriteLine(result);
                    }
                    else
                    {
                        Console.WriteLine($"Error: {root.GetProperty("message").GetString()}");
                    }
                }
                else
                {
                    Console.WriteLine($"HTTP error {(int)response.StatusCode}");
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
    instanceId  = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    clientToken = getEnv("ZAPI_CLIENT_TOKEN", "your-security-token")
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

func validateMessageId(messageId string) error {
    if strings.TrimSpace(messageId) == "" {
        return fmt.Errorf("messageId is required")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "5511999999999"
    messageId := "3EB0C767F26A"
    pin := true // true to pin, false to unpin
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/pin-message", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "pin": pin,
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
        
        var result map[string]interface{}
        if err := json.Unmarshal(body, &result); err != nil {
            fmt.Printf("Error parsing JSON: %v\n", err)
            return
        }
        
        if value, ok := result["value"].(bool); ok && value {
            action := "pinned"
            if !pin {
                action = "unpinned"
            }
            fmt.Printf("Message %s successfully\n", action)
            fmt.Println(string(body))
        } else {
            fmt.Printf("Error: %v\n", result["message"])
        }
    } else {
        fmt.Printf("HTTP error %d\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SECURITY: Use environment variables for credentials
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-security-token';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

// Validate messageId
function validateMessageId($messageId) {
    if (empty($messageId) || !is_string($messageId) || trim($messageId) === '') {
        throw new Exception('messageId is required');
    }
    return trim($messageId);
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('5511999999999');
    $messageId = validateMessageId('3EB0C767F26A');
    $pin = true; // true to pin, false to unpin

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/pin-message',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'pin' => $pin,
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
        error_log("cURL error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        if ($result && isset($result['value']) && $result['value']) {
            $action = $pin ? 'pinned' : 'unpinned';
            echo "Message {$action} successfully\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Error: " . ($result['message'] ?? 'Error pinning/unpinning message') . "\n";
        }
    } else {
        echo "HTTP error $httpCode\n";
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
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-security-token'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validate messageId
def validate_message_id(message_id)
  raise 'messageId is required' if message_id.nil? || message_id.to_s.strip.empty?
  message_id.to_s.strip
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('5511999999999')
  message_id = validate_message_id('3EB0C767F26A')
  pin = true # true to pin, false to unpin

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/pin-message")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    pin: pin
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['value']
      action = pin ? 'pinned' : 'unpinned'
      puts "Message #{action} successfully"
      puts result.to_json
    else
      puts "Error: #{result['message']}"
    end
  else
    puts "HTTP error #{response.code}"
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

// Validate messageId
func validateMessageId(_ messageId: String) throws -> String {
    if messageId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "messageId is required"])
    }
    return messageId.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("5511999999999")
    let messageId = try validateMessageId("3EB0C767F26A")
    let pin = true // true to pin, false to unpin

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/pin-message"
    
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
        "messageId": messageId,
        "pin": pin
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
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                       let value = result["value"] as? Bool, value {
                        let action = pin ? "pinned" : "unpinned"
                        print("Message \(action) successfully")
                        print(result)
                    } else if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Error: \(result["message"] as? String ?? "Error pinning/unpinning message")")
                    }
                } catch {
                    print("Error parsing JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("HTTP error \(httpResponse.statusCode)")
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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-security-token" }

# Validate phone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Invalid phone. Use only numbers"
    }
    return $Phone
}

# Validate messageId
function Validate-MessageId {
    param([string]$MessageId)
    if ([string]::IsNullOrWhiteSpace($MessageId)) {
        throw "messageId is required"
    }
    return $MessageId.Trim()
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-Phone "5511999999999"
    $messageId = Validate-MessageId "3EB0C767F26A"
    $pin = $true # $true to pin, $false to unpin

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/pin-message"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        pin = $pin
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    if ($response.value) {
        $action = if ($pin) { "pinned" } else { "unpinned" }
        Write-Host "Message $action successfully"
        $response | ConvertTo-Json -Depth 10
    } else {
        Write-Host "Error: $($response.message)"
    }
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/pin-message HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-security-token

{
 "phone": "5511999999999",
 "messageId": "3EB0C767F26A",
 "pin": true
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
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    std::string phone = "5511999999999";
    std::string messageId = "3EB0C767F26A";
    bool pin = true; // true to pin, false to unpin
    
    // ⚠️ VALIDATION
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    
    if (messageId.empty()) {
        std::cerr << "Error: messageId is required" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/pin-message";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"pin\":" << (pin ? "true" : "false")
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
                std::cout << (pin ? "Message pinned successfully" : "Message unpinned successfully") << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "HTTP error " << responseCode << std::endl;
            }
        } else {
            std::cerr << "cURL error: " << curl_easy_strerror(res) << std::endl;
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
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    char* phone = "5511999999999";
    char* messageId = "3EB0C767F26A";
    int pin = 1; // 1 to pin, 0 to unpin
    
    // ⚠️ VALIDATION
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    
    if (!messageId || strlen(messageId) == 0) {
        fprintf(stderr, "Error: messageId is required\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/pin-message", instanceId);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"pin\":%s}",
        phone, messageId, pin ? "true" : "false");
    
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
                printf("%s\n", pin ? "Message pinned successfully" : "Message unpinned successfully");
                printf("%s\n", responseData);
            } else {
                printf("HTTP error %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "cURL error: %s\n", curl_easy_strerror(res));
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
</Tabs>

## <Icon name="AlertTriangle" size="md" /> Limitations {#limitations}

- **Maximum pinned messages**: 3 messages per chat.
- **Permissions**: In groups, you need to be an admin to pin messages.
- **Old messages**: Very old messages may not be pinnable.
- **Individual chats**: You can pin messages in individual chats without permission restrictions.

:::warning Important

In groups, only admins can pin messages. If you are not an admin, the operation will return error 403.

:::

## <Icon name="Info" size="md" /> Important Notes {#important-notes}

- Pinned messages appear at the top of the chat for easy access.
- Use the `messageId` of the message you want to pin or unpin.
- The `phone` should be the contact number or group ID.
- Pinned messages are visible to all chat participants.
- For groups, make sure you have admin permissions.

## <Icon name="ArrowRight" size="md" /> Next Steps {#next-steps}

- [Get chats](/docs/chats/pegar) – List all your instance's chats.
- [Pin chat](/docs/chats/fixar) – Pin chats at the top of the list.
- [Reply to message](/docs/messages/responder) – Reply to received messages.