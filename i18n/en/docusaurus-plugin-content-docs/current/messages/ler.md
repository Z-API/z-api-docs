---
id: ler
title: Mark as Read
sidebar_position: 26
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Mark as Read

Mark a specific message as read using the Z-API. This removes the "unread" indicators and updates the read status in WhatsApp.

Method used to mark a message in a chat as read.

![Example of message reading](/video/read-message.gif)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/read-message
```

### Headers {#headers}

| Header | Type | Required | Description |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Yes | Authentication token |
| Content-Type | string | Yes | Should be `application/json` |

### Request Body {#request-body}

```json
{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

### Parameters {#parameters}

#### Required Parameters

| Field | Type | Required | Description |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Yes | Recipient's phone number (or group ID for groups) in the format DDI DDD NUMBER. **IMPORTANT:** Send only numbers, without formatting or mask. For groups, use the group ID. |
| `messageId` | string | Yes | Original message ID. For a message sent by you, it's the ID returned in the send response. For a message received from a contact, you receive this `messageId` via your receive webhook. |

## <Icon name="Wand2" size="md" /> For No-Code Users {#for-no-code-users}

In your automation tool (n8n, Make, Zapier), fill in the following fields:

### Required Fields

1. **`phone`**: The chat number where the message is located. Use the full format: DDI + DDD + Number (e.g., `5511999999999`). **Important:** Use only numbers, without formatting or mask. For groups, use the group ID in the `phone` field.
2. **`messageId`**: The ID of the message you want to mark as read. This is the `messageId` of the message you received via webhooks or sent previously (obtained in the API response).

### Practical Example for No-Code

```json
{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

**Important Tips:**

- **Get messageId**: The `messageId` can be obtained through webhooks when a message is received. Save this ID if you want to mark the message as read later.
- **Group Messages**: You can mark messages in groups using the group ID in the `phone` field.
- **Status 204**: The response is a `204 No Content` status, indicating the operation was successful. The response body is empty.

**Common Use Cases:**

- **Customer Service**: Automatically mark customer messages as read after processing.
- **Reading Automation**: Mark messages as read after they are processed by a system.
- **Notification Management**: Control which messages appear as unread.
- **System Integration**: Synchronize read status between different systems.

## <Icon name="CheckCircle" size="md" /> Responses {#responses}

### 204 No Content {#204-no-content}

The response is a `204 No Content` status, indicating the message was marked as read successfully. The response body is empty.

```json
{}
```

**Important:**

- Status `204` means the operation was successful, but there is no content to return.
- There are no fields in the response; the HTTP status alone indicates success.

### Common Errors {#common-errors}

| Code | Reason | How to Resolve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check the format of `phone` and `messageId`. |
| 401 | Invalid token | Check the `Client-Token` header. |
| 404 | Chat or message not found | Verify if the `phone` and `messageId` are valid. |
| 429 | Rate limit exceeded | Wait and try again. |
| 5xx | Internal error | Try again; contact support if it persists. |

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

// Validate phone (only numbers)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone. Use only numbers (DDI + DDD + Number)');
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

// Mark a message as read
async function markMessageAsRead(phone, messageId) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
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

    if (response.status === 204) {
      console.log('Message marked as read successfully');
      return { success: true };
    } else {
      throw new Error(`Failed to mark as read: ${response.status}`);
    }
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error marking as read:', error.message);
    throw error;
  }
}

// Example usage
markMessageAsRead('5511999998888', '3999984263738042930CD6ECDE9VDWSA');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';

interface MarkAsReadResponse {
  success: boolean;
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

// Mark a message as read
async function markMessageAsRead(phone: string, messageId: string): Promise<MarkAsReadResponse> {
  // ⚠️ VALIDATION
  const validatedPhone = validatePhone(phone);
  const validatedMessageId = validateMessageId(messageId);

  // ⚠️ SECURITY: Always use HTTPS
  const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;

  const payload = {
    phone: validatedPhone,
    messageId: validatedMessageId,
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

  if (response.status === 204) {
    return { success: true };
  } else {
    throw new Error('Unexpected response status');
  }
}

// Execute
markMessageAsRead('5511999998888', '3999984263738042930CD6ECDE9VDWSA')
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
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')

def validate_phone(phone: str) -> str:
    """Validate phone (only numbers)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Invalid phone. Use only numbers (DDI + DDD + Number)')
    return phone

def validate_message_id(message_id: str) -> str:
    """Validate messageId"""
    if not message_id or not isinstance(message_id, str) or not message_id.strip():
        raise ValueError('messageId is required and must be a non-empty string')
    return message_id.strip()

def mark_message_as_read(phone: str, message_id: str) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_phone = validate_phone(phone)
    validated_message_id = validate_message_id(message_id)
    
    # ⚠️ SECURITY: Always use HTTPS
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/read-message"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": validated_message_id
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        if response.status_code == 204:
            print('Message marked as read successfully')
            return {"success": True}
        else:
            raise ValueError(f"Unexpected status code: {response.status_code}")
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
mark_message_as_read('5511999998888', '3999984263738042930CD6ECDE9VDWSA')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-security-token}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"

# ⚠️ VALIDATION: Validate phone (only numbers)
PHONE="${1:-5511999998888}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Error: Invalid phone. Use only numbers (DDI + DDD + Number)"
    exit 1
fi

MESSAGE_ID="${2:-3999984263738042930CD6ECDE9VDWSA}"

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/read-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"${MESSAGE_ID}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID CLIENT_TOKEN INSTANCE_TOKEN PHONE MESSAGE_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-security-token';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';

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

// Mark message as read
function markMessageAsRead(phone, messageId) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      validatePhone(phone);
      validateMessageId(messageId);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;
    const payload = JSON.stringify({
      phone: phone,
      messageId: messageId,
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
        if (res.statusCode === 204) {
          console.log('Message marked as read successfully');
          resolve({ success: true });
        } else if (res.statusCode >= 400) {
          reject(new Error(`HTTP error ${res.statusCode}`));
        } else {
          reject(new Error(`Unexpected status code: ${res.statusCode}`));
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
markMessageAsRead('5511999998888', '3999984263738042930CD6ECDE9VDWSA')
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';

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
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Route to mark message as read
app.post('/api/read-message', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, messageId } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: validatedMessageId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    if (response.status === 204) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Unexpected response from Z-API' });
    }
  } catch (error) {
    console.error('Error marking as read:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Failed to mark message as read',
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';

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
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId is required');
  }
  return messageId.trim();
}

// Middleware to mark message as read
app.use(async (ctx) => {
  if (ctx.path === '/api/read-message' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, messageId } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/read-message`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: validatedMessageId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      if (response.status === 204) {
        ctx.body = { success: true };
      } else {
        ctx.status = 500;
        ctx.body = { error: 'Unexpected response from Z-API' };
      }
    } catch (error) {
      console.error('Error marking as read:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Failed to mark message as read',
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

public class MarkMessageAsRead {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-security-token";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";

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
            String phone = validatePhone("5511999998888");
            String messageId = validateMessageId("3999984263738042930CD6ECDE9VDWSA");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/read-message",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            String payload = String.format("{\"phone\":\"%s\",\"messageId\":\"%s\"}", phone, messageId);
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = payload.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            if (responseCode == 204) {
                System.out.println("Message marked as read successfully");
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
using System.Text.RegularExpressions;

class Program
{
    // ⚠️ SECURITY: Use environment variables for credentials
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-security-token";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";

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
            string phone = ValidatePhone("5511999998888");
            string messageId = ValidateMessageId("3999984263738042930CD6ECDE9VDWSA");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/read-message";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId
            };

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);
                
                if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    Console.WriteLine("Message marked as read successfully");
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
    "net/http"
    "os"
    "regexp"
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-security-token")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
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
    if messageId == "" {
        return fmt.Errorf("messageId is required")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "5511999998888"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    messageId := "3999984263738042930CD6ECDE9VDWSA"
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/read-message", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone":     phone,
        "messageId": messageId,
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
    
    if resp.StatusCode == http.StatusNoContent {
        fmt.Println("Message marked as read successfully")
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';

// Validate phone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Invalid phone. Use only numbers');
    }
    return $phone;
}

// Validate messageId
function validateMessageId($messageId) {
    if (empty($messageId)) {
        throw new Exception('messageId is required');
    }
    return $messageId;
}

try {
    // ⚠️ VALIDATION
    $phone = validatePhone('5511999998888');
    $messageId = validateMessageId('3999984263738042930CD6ECDE9VDWSA');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/read-message',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
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
    } elseif ($httpCode == 204) {
        echo "Message marked as read successfully\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'

# Validate phone
def validate_phone(phone)
  raise 'Invalid phone. Use only numbers' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validate messageId
def validate_message_id(message_id)
  raise 'messageId is required' if message_id.nil? || message_id.strip.empty?
  message_id.strip
end

begin
  # ⚠️ VALIDATION
  phone = validate_phone('5511999998888')
  message_id = validate_message_id('3999984263738042930CD6ECDE9VDWSA')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/read-message")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i == 204
    puts 'Message marked as read successfully'
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"

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
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "messageId is required"])
    }
    return messageId.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDATION
    let phone = try validatePhone("5511999998888")
    let messageId = try validateMessageId("3999984263738042930CD6ECDE9VDWSA")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/read-message"
    
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
        "messageId": messageId
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
        
        if httpResponse.statusCode == 204 {
            print("Message marked as read successfully")
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }

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
    $phone = Validate-Phone "5511999998888"
    $messageId = Validate-MessageId "3999984263738042930CD6ECDE9VDWSA"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/read-message"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Message marked as read successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/read-message HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-security-token

{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
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

bool validateMessageId(const std::string& messageId) {
    return !messageId.empty();
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string phone = "5511999998888";
    std::string messageId = "3999984263738042930CD6ECDE9VDWSA";
    
    // ⚠️ VALIDATION
    if (!validatePhone(phone)) {
        std::cerr << "Error: Invalid phone" << std::endl;
        return 1;
    }
    if (!validateMessageId(messageId)) {
        std::cerr << "Error: messageId is required" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/read-message";
    
    // Create JSON payload
    std::string payload = "{\"phone\":\"" + phone + "\",\"messageId\":\"" + messageId + "\"}";
    
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
            
            if (responseCode == 204) {
                std::cout << "Message marked as read successfully" << std::endl;
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

int validateMessageId(const char* messageId) {
    return messageId != NULL && messageId[0] != '\0';
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-security-token");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* phone = "5511999998888";
    char* messageId = "3999984263738042930CD6ECDE9VDWSA";
    
    // ⚠️ VALIDATION
    if (!validatePhone(phone)) {
        fprintf(stderr, "Error: Invalid phone\n");
        return 1;
    }
    if (!validateMessageId(messageId)) {
        fprintf(stderr, "Error: messageId is required\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/read-message", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload), "{\"phone\":\"%s\",\"messageId\":\"%s\"}", phone, messageId);
    
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
            
            if (responseCode == 204) {
                printf("Message marked as read successfully\n");
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

## <Icon name="Info" size="md" /> How It Works {#how-it-works}

When you mark a specific message as read:

1. **That message and all previous unread messages** in the chat are marked as read.
2. **Indicators removed** – The two blue checkmarks appear on the messages, indicating they have been read.
3. **Counter reset** – The unread message counter for that chat is removed.
4. **Status updated** – The sender sees that their messages were read.

:::tip Usage in Automations

Use this endpoint in automations to mark messages as read automatically after processing them, improving the user experience and keeping the read status up to date.

:::

## <Icon name="AlertTriangle" size="md" /> Limitations {#limitations}

- You can only mark messages as read if you have access to the chat.
- For groups, you must be a member of the group.
- Marking a message as read will also mark all prior messages in that chat as read (standard WhatsApp behavior).

## <Icon name="Info" size="md" /> Important Notes {#important-notes}

- Marking a message as read removes all "unread" indicators from that chat.
- Use the `phone` of an individual contact or the group ID.
- **Attention**: On November 4, 2021, WhatsApp changed the format for creating new groups:
  - Before: `"phone": "5511999999999-1623281429"`
  - Now: `"phone": "120363019502650977-group"`
  Make sure to use the correct format of the `groupId` based on the creation date of the group.
- The sender will see the two blue checkmarks indicating the message was read.
- This operation is useful for keeping the read status synchronized in automations.

## <Icon name="ArrowRight" size="md" /> Next Steps {#next-steps}

- [Get Chats](/docs/chats/pegar) – List all chats in your instance.
- [Archive Chat](/docs/chats/arquivar) – Archive or unarchive conversations.
- [Reply to Message](/docs/messages/responder) – Reply to received messages.