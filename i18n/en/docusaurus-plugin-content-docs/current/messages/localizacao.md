---
id: localizacao
sidebar_position: 13
title: Send Location
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MapPin" size="lg" /> Send Location

Send a fixed geographic location to a recipient using the Z-API. The location appears as a point on the WhatsApp map, allowing the recipient to view and navigate to the location.

**Common Use Cases:**
- Send store or office address
- Share event locations
- Send delivery coordinates
- Indicate points of interest

![Example message with location](/img/send-message-location.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-location
```

### Headers {#headers}

| Header | Type | Required | Description |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Yes | Authentication token |
| Content-Type | string | Yes | Should be `application/json` |

### Request Body {#request-body}

**Full Example:**

```json
{
  "phone": "5511999998888",
  "title": "Google Brasil",
  "address": "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133",
  "latitude": "-23.0696347",
  "longitude": "-50.4357913"
}
```

**Example with Optional Parameters:**

```json
{
  "phone": "5511999998888",
  "title": "Google Brasil",
  "address": "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133",
  "latitude": "-23.0696347",
  "longitude": "-50.4357913",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

### Parameters {#parameters}

#### Required Parameters

| Field | Type | Required | Description |
|------------|--------|-------------|--------------------------------------------------|
| `phone` | string | Yes | Recipient number in DDI + DDD + NUMBER format. |
| `title` | string | Yes | Title for your location (ex: "My House", "Central Store", "Office"). |
| `address` | string | Yes | Full address of the location. Should be composed by street, NUMBER, neighborhood, city, state and ZIP code, all separated by commas. Example: "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133". |
| `latitude` | string | Yes | Latitude of the sent location. Should be between -90 and 90 degrees. Can be sent as a string or number. |
| `longitude` | string | Yes | Longitude of the sent location. Should be between -180 and 180 degrees. Can be sent as a string or number. |

#### Optional Parameters

| Field | Type | Required | Description |
|------------|--------|-------------|--------------------------------------------------|
| `messageId` | string | No | Allows responding to an existing message in the chat, creating a threaded conversation. Use the `messageId` of the message you want to respond to. See more about [how to reply messages](./responder). |
| `delayMessage` | number | No | Controls the wait time (in seconds) before sending the next message. Values between 1 and 15 seconds. If not specified, the system uses an automatic delay of 1 to 3 seconds. Useful when sending multiple locations in sequence to avoid blocks. |

## <Icon name="Wand2" size="md" /> For No-Code Users {#for-no-code-users}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

1. **`phone`**: The contact number that will receive the location. Use the full format: DDI + DDD + Number (ex: `5511999999999`).

2. **`title`**: The title of the location (ex: `"My Store"`, `"Central Office"`, `"Delivery Point"`). This title appears when the location is viewed.

3. **`address`**: The full address of the location. **Format:** street, NUMBER, neighborhood, city, state and ZIP code, all separated by commas. Example: `"Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133"`.

4. **`latitude`**: The latitude of the location (geographic coordinate). Should be between -90 and 90 degrees. Example: `"-23.0696347"` or `-23.0696347`.

5. **`longitude`**: The longitude of the location (geographic coordinate). Should be between -180 and 180 degrees. Example: `"-50.4357913"` or `-50.4357913`.

### Optional Fields

6. **`messageId`**: If you want to respond to a specific message, paste here the `messageId` of the original message. This creates a threaded conversation in WhatsApp.

7. **`delayMessage`**: If you are sending multiple locations in sequence, use this field to space the send (between 1 and 15 seconds). This helps avoid blocks.

**Tip:** In most cases, you only need to fill in the required fields. The optional fields can be left blank.

**How to get coordinates (latitude and longitude):**

- **Google Maps**: Right-click on the location → "What's here?" → Coordinates appear in the search field
- **Google Earth**: Click on the location → Coordinates appear in the bottom right corner
- **Geocoding websites**: Use services like Google Geocoding API, OpenStreetMap, etc.

**Address Format:**

The `address` field should follow this format:

```text
Street, NUMBER - Neighborhood, City - State, ZIP code
```

Example:

```text
Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133
```

## <Icon name="CheckCircle" size="md" /> Responses {#responses}

### 200 OK {#200-ok}

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

- The `messageId` is the primary identifier you should use for tracking
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered, read or if there was an error, configure a webhook and monitor events. See more about [message received webhooks](../webhooks/on-receive).

### Common Errors {#common-errors}

| Code | Reason | How to Solve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `phone`, `latitude` and `longitude` |
| 401 | Invalid token | Check the header `Client-Token` |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## <Icon name="FileCode" size="md" /> Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';

// Input validation (security)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: DDI + DDD + Number');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// Location data with validation
const locationData = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

// Remove optional fields if undefined
if (!locationData.name) delete locationData.name;
if (!locationData.address) delete locationData.address;

// Send request with safe error handling
async function sendLocation() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Location sent successfully. MessageId:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending location:', error.message);
    throw error;
  }
}

// Execute function
sendLocation();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface SendLocationRequest {
  phone: string;
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

interface SendLocationResponse {
  messageId: string;
  status: string;
}

const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';

function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number');
  }
  return cleaned;
}

function validateLatitude(latitude: number): number {
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
  }
  return latitude;
}

function validateLongitude(longitude: number): number {
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
  }
  return longitude;
}

function sanitizeString(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const locationData: SendLocationRequest = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

async function sendLocation(): Promise<SendLocationResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

sendLocation()
  .then((result) => console.log('Success. MessageId:', result.messageId))
  .catch((error) => console.error('Error:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional

INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN")

def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Invalid phone number. Use format: DDI + DDD + Number")
    return cleaned

def validate_latitude(latitude: float) -> float:
    if not isinstance(latitude, (int, float)) or latitude < -90 or latitude > 90:
        raise ValueError("Invalid latitude. Must be between -90 and 90 degrees")
    return float(latitude)

def validate_longitude(longitude: float) -> float:
    if not isinstance(longitude, (int, float)) or longitude < -180 or longitude > 180:
        raise ValueError("Invalid longitude. Must be between -180 and 180 degrees")
    return float(longitude)

def sanitize_string(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    trimmed = value.strip()
    return trimmed if trimmed else None

url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-location"

try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "latitude": validate_latitude(-23.5505),
        "longitude": validate_longitude(-46.6333),
        "name": sanitize_string("São Paulo, SP"),
        "address": sanitize_string("Praça da Sé, São Paulo - SP"),
    }
    # Remove None fields
    payload = {k: v for k, v in payload.items() if v is not None}
except ValueError as e:
    print(f"Validation error: {e}")
    exit(1)

headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

try:
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    print(f"Location sent. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
    print(f"HTTP error {e.response.status_code}: Request failed")
except requests.exceptions.RequestException as e:
    print(f"Request error: {e}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE_ID}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-YOUR_CLIENT_TOKEN}"

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-location" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
    "phone": "5511999999999",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "name": "São Paulo, SP",
    "address": "Praça da Sé, São Paulo - SP"
  }' \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: DDI + DDD + Number');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const locationData = {
  phone: validatePhoneNumber('5511999999999'),
  latitude: validateLatitude(-23.5505),
  longitude: validateLongitude(-46.6333),
  name: sanitizeString('São Paulo, SP'),
  address: sanitizeString('Praça da Sé, São Paulo - SP'),
};

if (!locationData.name) delete locationData.name;
if (!locationData.address) delete locationData.address;

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
const postData = JSON.stringify(locationData);

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
      console.log('Location sent. MessageId:', result.messageId);
    } else {
      console.error(`HTTP error ${res.statusCode}: Request failed`);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
});

req.on('timeout', () => {
  req.destroy();
  console.error('Request timeout');
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: DDI + DDD + Number');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

app.post('/send-location', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawLatitude = req.body.latitude !== undefined ? req.body.latitude : -23.5505;
    const rawLongitude = req.body.longitude !== undefined ? req.body.longitude : -46.6333;
    const rawName = req.body.name || '';
    const rawAddress = req.body.address || '';

    const locationData = {
      phone: validatePhoneNumber(rawPhone),
      latitude: validateLatitude(rawLatitude),
      longitude: validateLongitude(rawLongitude),
      name: sanitizeString(rawName),
      address: sanitizeString(rawAddress),
    };

    if (!locationData.name) delete locationData.name;
    if (!locationData.address) delete locationData.address;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
    const postData = JSON.stringify(locationData);

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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Error processing response'));
            }
          } else {
            reject(new Error(`HTTP error ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.write(postData);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending location:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';

app.use(require('koa-bodyparser')());

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: DDI + DDD + Number');
  }
  return cleaned;
}

function validateLatitude(latitude) {
  const lat = Number(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
  }
  return lat;
}

function validateLongitude(longitude) {
  const lng = Number(longitude);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
  }
  return lng;
}

function sanitizeString(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

router.post('/send-location', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawLatitude = ctx.request.body.latitude !== undefined ? ctx.request.body.latitude : -23.5505;
    const rawLongitude = ctx.request.body.longitude !== undefined ? ctx.request.body.longitude : -46.6333;
    const rawName = ctx.request.body.name || '';
    const rawAddress = ctx.request.body.address || '';

    const locationData = {
      phone: validatePhoneNumber(rawPhone),
      latitude: validateLatitude(rawLatitude),
      longitude: validateLongitude(rawLongitude),
      name: sanitizeString(rawName),
      address: sanitizeString(rawAddress),
    };

    if (!locationData.name) delete locationData.name;
    if (!locationData.address) delete locationData.address;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-location`);
    const postData = JSON.stringify(locationData);

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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Error processing response'));
            }
          } else {
            reject(new Error(`HTTP error ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.write(postData);
      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Error sending location:', err.message);
});

app.listen(3000, () => {
  console.log('Koa server running on port 3000');
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

public class SendLocation {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE_ID";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "YOUR_CLIENT_TOKEN";

    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Invalid phone number");
        }
        return cleaned;
    }

    private static double validateLatitude(double latitude) {
        if (latitude < -90 || latitude > 90) {
            throw new IllegalArgumentException("Invalid latitude. Must be between -90 and 90 degrees");
        }
        return latitude;
    }

    private static double validateLongitude(double longitude) {
        if (longitude < -180 || longitude > 180) {
            throw new IllegalArgumentException("Invalid longitude. Must be between -180 and 180 degrees");
        }
        return longitude;
    }

    private static String sanitizeString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        return value.trim();
    }

    public static void main(String[] args) {
        try {
            String phone = validatePhoneNumber("5511999999999");
            double latitude = validateLatitude(-23.5505);
            double longitude = validateLongitude(-46.6333);
            String name = sanitizeString("São Paulo, SP");
            String address = sanitizeString("Praça da Sé, São Paulo - SP");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-location";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(phone);
            jsonPayload.append("\",\"latitude\":").append(latitude);
            jsonPayload.append(",\"longitude\":").append(longitude);
            if (name != null) {
                jsonPayload.append(",\"name\":\"").append(name.replace("\"", "\\\"")).append("\"");
            }
            if (address != null) {
                jsonPayload.append(",\"address\":\"").append(address.replace("\"", "\\\"")).append("\"");
            }
            jsonPayload.append("}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("Location sent. Response: " + response.toString());
                }
            } else {
                System.err.println("HTTP error " + responseCode + ": Request failed");
            }

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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class SendLocation
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE_ID";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "YOUR_CLIENT_TOKEN";

    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Invalid phone number");
        }
        return cleaned;
    }

    private static double ValidateLatitude(double latitude)
    {
        if (latitude < -90 || latitude > 90)
        {
            throw new ArgumentException("Invalid latitude. Must be between -90 and 90 degrees");
        }
        return latitude;
    }

    private static double ValidateLongitude(double longitude)
    {
        if (longitude < -180 || longitude > 180)
        {
            throw new ArgumentException("Invalid longitude. Must be between -180 and 180 degrees");
        }
        return longitude;
    }

    private static string? SanitizeString(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }
        return value.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            string phone = ValidatePhoneNumber("5511999999999");
            double latitude = ValidateLatitude(-23.5505);
            double longitude = ValidateLongitude(-46.6333);
            string? name = SanitizeString("São Paulo, SP");
            string? address = SanitizeString("Praça da Sé, São Paulo - SP");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-location";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    latitude = latitude,
                    longitude = longitude,
                    name = name,
                    address = address
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Location sent. Response: {responseBody}");
                }
                else
                {
                    Console.WriteLine($"HTTP error {(int)response.StatusCode}: Request failed");
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

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("invalid phone number")
    }
    return cleaned, nil
}

func validateLatitude(latitude float64) error {
    if latitude < -90 || latitude > 90 {
        return fmt.Errorf("invalid latitude. Must be between -90 and 90 degrees")
    }
    return nil
}

func validateLongitude(longitude float64) error {
    if longitude < -180 || longitude > 180 {
        return fmt.Errorf("invalid longitude. Must be between -180 and 180 degrees")
    }
    return nil
}

func sanitizeString(value string) string {
    trimmed := strings.TrimSpace(value)
    if trimmed == "" {
        return ""
    }
    return trimmed
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN")

    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Validation error: %v\n", err)
        return
    }

    latitude := -23.5505
    if err := validateLatitude(latitude); err != nil {
        fmt.Printf("Validation error: %v\n", err)
        return
    }

    longitude := -46.6333
    if err := validateLongitude(longitude); err != nil {
        fmt.Printf("Validation error: %v\n", err)
        return
    }

    name := sanitizeString("São Paulo, SP")
    address := sanitizeString("Praça da Sé, São Paulo - SP")

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-location", instanceId)

    payload := map[string]interface{}{
        "phone":     phone,
        "latitude":  latitude,
        "longitude": longitude,
    }
    if name != "" {
        payload["name"] = name
    }
    if address != "" {
        payload["address"] = address
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Request error: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, _ := io.ReadAll(resp.Body)
        fmt.Printf("Location sent. Response: %s\n", string(body))
    } else {
        fmt.Printf("HTTP error %d: Request failed\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE_ID';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'YOUR_CLIENT_TOKEN';

function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Invalid phone number');
    }
    return $cleaned;
}

function validateLatitude($latitude) {
    if (!is_numeric($latitude) || $latitude < -90 || $latitude > 90) {
        throw new Exception('Invalid latitude. Must be between -90 and 90 degrees');
    }
    return (float)$latitude;
}

function validateLongitude($longitude) {
    if (!is_numeric($longitude) || $longitude < -180 || $longitude > 180) {
        throw new Exception('Invalid longitude. Must be between -180 and 180 degrees');
    }
    return (float)$longitude;
}

function sanitizeString($value) {
    if (empty($value) || trim($value) === '') {
        return null;
    }
    return trim($value);
}

try {
    $phone = validatePhoneNumber('5511999999999');
    $latitude = validateLatitude(-23.5505);
    $longitude = validateLongitude(-46.6333);
    $name = sanitizeString('São Paulo, SP');
    $address = sanitizeString('Praça da Sé, São Paulo - SP');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-location";

    $payload = [
        'phone' => $phone,
        'latitude' => $latitude,
        'longitude' => $longitude,
    ];
    if ($name !== null) {
        $payload['name'] = $name;
    }
    if ($address !== null) {
        $payload['address'] = $address;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Location sent. MessageId: " . $result['messageId'] . "\n";
    } else {
        echo "HTTP error $httpCode: Request failed\n";
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
require 'json'
require 'uri'
require 'openssl'

instance_id = ENV['ZAPI_INSTANCE_ID'] || 'YOUR_INSTANCE_ID'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'YOUR_CLIENT_TOKEN'

def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Invalid phone number'
  end
  cleaned
end

def validate_latitude(latitude)
  lat = latitude.to_f
  if lat < -90 || lat > 90
    raise ArgumentError, 'Invalid latitude. Must be between -90 and 90 degrees'
  end
  lat
end

def validate_longitude(longitude)
  lng = longitude.to_f
  if lng < -180 || lng > 180
    raise ArgumentError, 'Invalid longitude. Must be between -180 and 180 degrees'
  end
  lng
end

def sanitize_string(value)
  return nil if value.nil? || value.strip.empty?
  value.strip
end

begin
  phone = validate_phone_number('5511999999999')
  latitude = validate_latitude(-23.5505)
  longitude = validate_longitude(-46.6333)
  name = sanitize_string('São Paulo, SP')
  address = sanitize_string('Praça da Sé, São Paulo - SP')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-location")

  payload = {
    phone: phone,
    latitude: latitude,
    longitude: longitude
  }
  payload[:name] = name if name
  payload[:address] = address if address

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Location sent. MessageId: #{result['messageId']}"
  else
    puts "HTTP error #{response.code}: Request failed"
  end
rescue => e
  puts "Error: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "YOUR_INSTANCE_ID"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "YOUR_CLIENT_TOKEN"

func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid phone number"])
    }
    return cleaned
}

func validateLatitude(_ latitude: Double) throws -> Double {
    if latitude < -90 || latitude > 90 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Invalid latitude. Must be between -90 and 90 degrees"])
    }
    return latitude
}

func validateLongitude(_ longitude: Double) throws -> Double {
    if longitude < -180 || longitude > 180 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Invalid longitude. Must be between -180 and 180 degrees"])
    }
    return longitude
}

func sanitizeString(_ value: String?) -> String? {
    guard let value = value else { return nil }
    let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
    return trimmed.isEmpty ? nil : trimmed
}

do {
    let phone = try validatePhoneNumber("5511999999999")
    let latitude = try validateLatitude(-23.5505)
    let longitude = try validateLongitude(-46.6333)
    let name = sanitizeString("São Paulo, SP")
    let address = sanitizeString("Praça da Sé, São Paulo - SP")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-location"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    var payload: [String: Any] = [
        "phone": phone,
        "latitude": latitude,
        "longitude": longitude
    ]
    if let name = name {
        payload["name"] = name
    }
    if let address = address {
        payload["address"] = address
    }
    request.httpBody = try JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Request error: \(error.localizedDescription)")
            return
        }

        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                if let data = data,
                   let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let messageId = result["messageId"] as? String {
                    print("Location sent. MessageId: \(messageId)")
                }
            } else {
                print("HTTP error \(httpResponse.statusCode): Request failed")
            }
        }
    }
    task.resume()

    RunLoop.main.run(until: Date(timeIntervalSinceNow: 35))

} catch {
    print("Error: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SECURITY: Use environment variables for credentials
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "YOUR_INSTANCE_ID" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "YOUR_CLIENT_TOKEN" }

function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Invalid phone number"
    }
    return $cleaned
}

function Validate-Latitude {
    param([double]$Latitude)
    if ($Latitude -lt -90 -or $Latitude -gt 90) {
        throw "Invalid latitude. Must be between -90 and 90 degrees"
    }
    return $Latitude
}

function Validate-Longitude {
    param([double]$Longitude)
    if ($Longitude -lt -180 -or $Longitude -gt 180) {
        throw "Invalid longitude. Must be between -180 and 180 degrees"
    }
    return $Longitude
}

function Sanitize-String {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }
    return $Value.Trim()
}

try {
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $latitude = Validate-Latitude -Latitude -23.5505
    $longitude = Validate-Longitude -Longitude -46.6333
    $name = Sanitize-String -Value "São Paulo, SP"
    $address = Sanitize-String -Value "Praça da Sé, São Paulo - SP"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-location"

    $body = @{
        phone = $phone
        latitude = $latitude
        longitude = $longitude
    }
    if ($name) {
        $body.name = $name
    }
    if ($address) {
        $body.address = $address
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Location sent. MessageId: $($response.messageId)"

} catch {
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "HTTP error $statusCode : Request failed"
    } else {
        Write-Host "Error: $($_.Exception.Message)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /instances/YOUR_INSTANCE/send-location HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: YOUR_CLIENT_TOKEN
Content-Length: 125

{
  "phone": "5511999999999",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "name": "São Paulo, SP",
  "address": "Praça da Sé, São Paulo - SP"
}
```

**Note:** This is an example of raw HTTP request. In production:
- ⚠️ **SECURITY:** Replace `YOUR_INSTANCE` and `YOUR_CLIENT_TOKEN` with real values from environment variables
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate `phone` (only numbers, 10-15 digits), `latitude` (-90 to 90), `longitude` (-180 to 180), `name` and `address` (optional) before sending

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Invalid phone number");
    }
    return cleaned;
}

double validateLatitude(double latitude) {
    if (latitude < -90 || latitude > 90) {
        throw std::invalid_argument("Invalid latitude. Must be between -90 and 90 degrees");
    }
    return latitude;
}

double validateLongitude(double longitude) {
    if (longitude < -180 || longitude > 180) {
        throw std::invalid_argument("Invalid longitude. Must be between -180 and 180 degrees");
    }
    return longitude;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN");

        std::string phone = validatePhoneNumber("5511999999999");
        double latitude = validateLatitude(-23.5505);
        double longitude = validateLongitude(-46.6333);

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-location";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"latitude\":" + std::to_string(latitude) + 
                                  ",\"longitude\":" + std::to_string(longitude) + 
                                  ",\"name\":\"São Paulo, SP\",\"address\":\"Praça da Sé, São Paulo - SP\"}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Error initializing cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            std::cout << "Location sent. Response: " << responseData << std::endl;
        } else {
            std::cerr << "HTTP error " << responseCode << ": Request failed" << std::endl;
            if (res != CURLE_OK) {
                std::cerr << "cURL error: " << curl_easy_strerror(res) << std::endl;
            }
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

**Compilation:**
```bash
g++ -o send_location send_location.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

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
        return 0;
    }
    return 1;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN");

    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Error: Invalid phone number\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-location", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"latitude\":-23.5505,\"longitude\":-46.6333,\"name\":\"São Paulo, SP\",\"address\":\"Praça da Sé, São Paulo - SP\"}",
             phone);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Error initializing cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        printf("Location sent. Response: %s\n", responseData);
    } else {
        fprintf(stderr, "HTTP error %ld: Request failed\n", responseCode);
        if (res != CURLE_OK) {
            fprintf(stderr, "cURL error: %s\n", curl_easy_strerror(res));
        }
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return 0;
}
```

**Compilation:**
```bash
gcc -o send_location send_location.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Coordinate Format {#coordinate-format}

Coordinates should be in decimal degrees format:

| Coordinate | Range | Description |
|------------|----------------|----------------------------------------------|
| Latitude | -90 to 90 | Negative for south, positive for north |
| Longitude | -180 to 180 | Negative for west, positive for east |

:::tip Examples of coordinates

- **São Paulo, Brazil**: `latitude: -23.5505, longitude: -46.6333`
- **New York, USA**: `latitude: 40.7128, longitude: -74.0060`
- **London, UK**: `latitude: 51.5074, longitude: -0.1278`

:::

## <Icon name="Info" size="md" /> Important Notes {#important-notes}

- The location appears as a clickable point on the WhatsApp map
- The recipient can open the location in their mobile mapping app
- The fields `name` and `address` are optional but improve the user experience
- Use precise coordinates for better display on the map
- WhatsApp uses Google Maps to display locations

## <Icon name="ArrowRight" size="md" /> Next Steps {#next-steps}

- [Send Contact](/docs/messages/contact) - Share contact information
- [Send Link](/docs/messages/link) - Send links with preview
- [Send Product](/docs/messages/product) - Send product information