---
id: evento
sidebar_position: 35
title: Send Event
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send Event

Send events to groups on WhatsApp. Events allow you to create invitations for meetings, gatherings or any type of activity with date, time and location.

---

:::important Important

This method is **only available for groups**. It is not possible to send events to individual contacts.

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Work Meetings**: Create events for team meetings
- **Social Gatherings**: Organize social gatherings and events
- **Webinars**: Create events for webinars and lectures
- **Voice Calls/Video**: Create events with integrated call links

---

## <Icon name="Wand2" size="md" /> For No-Code Users {#for-no-code-users}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

- **`phone`**: ID of the group where you want to send the event. **IMPORTANT**: Use the format `{groupId}-group` (ex: `120363019502650977-group`). This method is **only available for groups**, it is not possible to send events to individual contacts.

- **`event`**: An object containing all the event information. Within this object, you need to configure:

  - **`name`**: Event name (required). Ex: `"Team Meeting"`, `"Marketing Webinar"`, `"Social Gathering"`
  - **`dateTime`**: Event date and time (required). Use ISO 8601 format (ex: `2024-04-29T09:30:53.309Z`). **Tip**: Make sure the date is in the future.
  - **`canceled`**: Defines whether the event is canceled (required). Use `true` to cancel or `false` to create an active event.

### Optional Fields

- **`description`**: Detailed description of the event (optional). Use this field to provide more information about the event, such as agenda, required materials, etc.

- **`timeZone`**: Event time zone UTC (optional). Use the format `UTC±N` (ex: `UTC-3` for Brasília time, `UTC+0` for London). If not specified, WhatsApp will use the device's time zone.

- **`location`**: Event location (optional). An object containing:
  - **`name`**: Place name (required if `location` is provided). Ex: `"Meeting Room 1"`, `"Main Auditorium"`, `"Online via Zoom"`

- **`callLinkType`**: Integrated call type (optional). Use `"voice"` for voice calls or `"video"` for video calls. When specified, WhatsApp will automatically create a call link in the event.

### Practical Example for No-Code

**Basic example (simple event):**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Team Meeting",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": false
  }
}
```

**Complete example (with all optional fields):**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Digital Marketing Webinar",
    "description": "Learn advanced digital marketing strategies",
    "dateTime": "2024-04-29T14:00:00.000Z",
    "timeZone": "UTC-3",
    "location": {
      "name": "Online via Zoom"
    },
    "callLinkType": "video",
    "canceled": false
  }
}
```

**Example with canceled event:**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Canceled Meeting",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": true
  }
}
```

**Important tips:**

- **Only groups**: Events can only be sent to groups, not individual contacts. Use the group ID in the format `{groupId}-group`.
- **Date format**: Use ISO 8601 format for `dateTime` (ex: `2024-04-29T09:30:53.309Z`). Make sure the date is in the future.
- **Time zone**: If you specify `timeZone`, WhatsApp will adjust the event time to the specified time zone. If not specified, it will use the user's device time zone.
- **Location**: Location is optional but helps participants find the event. Use a descriptive name (ex: `"Meeting Room 1"`, `"Main Auditorium"`, `"Online via Zoom"`).
- **Integrated calls**: Use `callLinkType: "voice"` for voice calls or `"video"` for video calls. When specified, WhatsApp will automatically create a call link in the event.
- **Cancellation**: Set `canceled: true` to mark an event as canceled. This will notify participants about the cancellation.
- **Response**: The response will be an object with `zaapId`, `messageId` and `id` (for compatibility with Zapier). Use the `messageId` to track the event status and to edit the event later using [Edit Event](/docs/messages/editar-evento).

**Next steps:**

After creating an event, you can:

- [Edit Event](/docs/messages/editar-evento) - Edit an existing event using the `messageId`
- [Respond to Event](/docs/messages/responder-evento) - Respond to an event (accept/decline)
- Configure webhooks to receive notifications when participants respond to the event

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-event
```

### <Icon name="Info" size="sm" /> Conceptualization {#conceptualization}

In this method, you can send event messages. This is only possible for a group.

![Example of event](/img/SendingEvent.jpeg)

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|-----------|
| `phone` | string | Group ID in the format `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANT**: Send only numbers, without formatting or mask |
| `event` | object | Event data (see structure below) |

### Structure of Object `event`

| Attribute | Type | Required | Description |
|----------|------|-------------|-----------|
| `name` | string | Yes | Event name |
| `dateTime` | string | Yes | Event date and time in ISO 8601 format (ex: `2024-04-29T09:30:53.309Z`) |
| `canceled` | boolean | Yes | Defines whether the event is canceled (`true` or `false`) |
| `description` | string | No | Event description |
| `timeZone` | string | No | Event time zone UTC (ex: `UTC-3`) |
| `location` | object | No | Event location (see structure below) |
| `callLinkType` | string | No | Call type: `voice` or `video` |

### Structure of Object `location`

| Attribute | Type | Required | Description |
|----------|------|-------------|-----------|
| `name` | string | Yes | Place name |

---

## <Icon name="Code" size="md" /> Examples {#examples}

### Simple Event

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID (format: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format (ex: 2024-04-29T09:30:53.309Z)');
  }
  return dateTime;
}

// Validate timeZone
function validateTimeZone(timeZone) {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('Invalid timeZone. Use UTC±N format (ex: UTC-3)');
  }
  return timeZone;
}

// Validate callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('Invalid callLinkType. Use: voice or video');
  }
  return callLinkType;
}

// Send simple event
async function sendEvent(phone, event) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('The event object must contain name and dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedTimeZone = event.timeZone ? validateTimeZone(event.timeZone) : undefined;
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const payload = {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: validatedTimeZone,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: validatedCallLinkType,
      },
    };
    
    // Remove undefined fields
    if (!payload.event.description) delete payload.event.description;
    if (!payload.event.timeZone) delete payload.event.timeZone;
    if (!payload.event.location) delete payload.event.location;
    if (!payload.event.callLinkType) delete payload.event.callLinkType;
    
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
    console.log('Event sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending event:', error.message);
    throw error;
  }
}

// Example usage
sendEvent('120363019502650977-group', {
  name: 'Team Meeting',
  description: 'Monthly alignment meeting',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Meeting Room 1',
  },
  canceled: false,
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Interfaces
interface EventLocation {
  name: string;
}

interface Event {
  name: string;
  dateTime: string;
  canceled: boolean;
  description?: string;
  timeZone?: string;
  location?: EventLocation;
  callLinkType?: 'voice' | 'video';
}

interface EventResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate group ID
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format');
  }
  return dateTime;
}

// Validate timeZone
function validateTimeZone(timeZone?: string): string | undefined {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('Invalid timeZone. Use UTC±N format');
  }
  return timeZone;
}

// Function to send event
async function sendEvent(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDATION
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('The event object must contain name and dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedTimeZone = validateTimeZone(event.timeZone);
  const validatedCallLinkType = event.callLinkType;

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;

  const payload: any = {
    phone: validatedGroupId,
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: event.canceled,
      description: event.description?.trim(),
      timeZone: validatedTimeZone,
      location: event.location ? { name: event.location.name.trim() } : undefined,
      callLinkType: validatedCallLinkType,
    },
  };

  // Remove undefined fields
  Object.keys(payload.event).forEach(key => {
    if (payload.event[key] === undefined) delete payload.event[key];
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
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

// Execute
sendEvent('120363019502650977-group', {
  name: 'Team Meeting',
  description: 'Monthly alignment meeting',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Meeting Room 1',
  },
  canceled: false,
})
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
from datetime import datetime

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-client-token')

def validate_group_id(group_id: str) -> str:
    """Validate group ID (format: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('Invalid group ID. Use format: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Validate ISO 8601 datetime"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Invalid date. Use ISO 8601 format (e.g., 2024-04-29T09:30:53.309Z)')

def validate_time_zone(time_zone: Optional[str]) -> Optional[str]:
    """Validate timeZone"""
    if time_zone and not re.match(r'^UTC[+-]\d+$', time_zone):
        raise ValueError('Invalid timeZone. Use UTC±N format (e.g., UTC-3)')
    return time_zone

def send_event(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('The event object must contain name and dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_time_zone = validate_time_zone(event.get('timeZone'))
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-event"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_group_id,
        "event": {
            "name": event["name"].strip(),
            "dateTime": validated_datetime,
            "canceled": event.get("canceled", False),
            "description": event.get("description", "").strip() if event.get("description") else None,
            "timeZone": validated_time_zone,
            "location": {
                "name": event["location"]["name"].strip()
            } if event.get("location") and event["location"].get("name") else None,
            "callLinkType": event.get("callLinkType"),
        }
    }
    
    # Remove None fields
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('Event sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_event('120363019502650977-group', {
    'name': 'Team Meeting',
    'description': 'Monthly alignment meeting',
    'dateTime': '2024-04-29T09:30:53.309Z',
    'timeZone': 'UTC-3',
    'location': {
        'name': 'Meeting Room 1'
    },
    'canceled': False
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-client-token}"

# ⚠️ VALIDATION: Validate group ID (format: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Error: Invalid group ID. Use the format: {groupId}-group"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send simple event via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Team Meeting\",
      \"description\": \"Monthly alignment meeting\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"timeZone\": \"UTC-3\",
      \"location\": {
        \"name\": \"Meeting Room 1\"
      },
      \"canceled\": false
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Send simple event
function sendEvent(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('The event object must contain name and dateTime');
      }
      const validatedDateTime = validateDateTime(event.dateTime);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    const payload = JSON.stringify({
      phone: phone,
      event: {
        name: event.name.trim(),
        dateTime: event.dateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: event.timeZone,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: event.callLinkType,
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
            console.log('Event sent successfully');
            resolve(result);
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
sendEvent('120363019502650977-group', {
  name: 'Team Meeting',
  description: 'Monthly alignment meeting',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Meeting Room 1',
  },
  canceled: false,
})
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Route to send event
app.post('/api/send-event', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'The event object must contain name and dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: event.timeZone,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: event.callLinkType,
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
    console.error('Error sending event:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending event',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Middleware to send event
app.use(async (ctx) => {
  if (ctx.path === '/api/send-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'The event object must contain name and dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
          description: event.description ? event.description.trim() : undefined,
          timeZone: event.timeZone,
          location: event.location && event.location.name ? {
            name: event.location.name.trim(),
          } : undefined,
          callLinkType: event.callLinkType,
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
      console.error('Error sending event:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending event',
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

public class SendEvent {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-client-token";

    // Validate group ID
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Meeting Room 1");
            
            JSONObject event = new JSONObject();
            event.put("name", "Team Meeting");
            event.put("description", "Monthly alignment meeting");
            event.put("dateTime", "2024-04-29T09:30:53.309Z");
            event.put("timeZone", "UTC-3");
            event.put("location", location);
            event.put("canceled", false);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("event", event);
            
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
                
                System.out.println("Event sent successfully");
                System.out.println(response.toString());
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
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-client-token";

    // Validate group ID
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Team Meeting",
                    description = "Monthly alignment meeting",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    timeZone = "UTC-3",
                    location = new { name = "Meeting Room 1" },
                    canceled = false
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
                    Console.WriteLine("Event sent successfully");
                    Console.WriteLine(result);
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-client-token")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("Invalid group ID. Use the format: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name":        "Team Meeting",
            "description": "Monthly alignment meeting",
            "dateTime":    "2024-04-29T09:30:53.309Z",
            "timeZone":    "UTC-3",
            "location": map[string]interface{}{
                "name": "Meeting Room 1",
            },
            "canceled": false,
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Error marshalling JSON: %v\n", err)
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
        
        fmt.Println("Event sent successfully")
        fmt.Println(string(body))
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-client-token';

// Validate group ID
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('Invalid group ID. Use the format: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDATION
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Team Meeting',
            'description' => 'Monthly alignment meeting',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'timeZone' => 'UTC-3',
            'location' => [
                'name' => 'Meeting Room 1',
            ],
            'canceled' => false,
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
        error_log("cURL error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Event sent successfully\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-client-token'

# Validate group ID
def validate_group_id(group_id)
  raise 'Invalid group ID. Use the format: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDATION
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Team Meeting',
      description: 'Monthly alignment meeting',
      dateTime: '2024-04-29T09:30:53.309Z',
      timeZone: 'UTC-3',
      location: {
        name: 'Meeting Room 1'
      },
      canceled: false
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Event sent successfully'
    puts result.to_json
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-client-token"

// Validate group ID
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid group ID. Use the format: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDATION
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Team Meeting",
            "description": "Monthly alignment meeting",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "timeZone": "UTC-3",
            "location": [
                "name": "Meeting Room 1"
            ],
            "canceled": false
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
                        print("Event sent successfully")
                        print(result)
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-client-token" }

# Validate group ID
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "Invalid group ID. Use the format: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Team Meeting"
            description = "Monthly alignment meeting"
            dateTime = "2024-04-29T09:30:53.309Z"
            timeZone = "UTC-3"
            location = @{
                name = "Meeting Room 1"
            }
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Event sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-client-token

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Team Meeting",
    "description": "Monthly alignment meeting",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "timeZone": "UTC-3",
    "location": {
      "name": "Meeting Room 1"
    },
    "canceled": false
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Error: Invalid group ID" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Team Meeting\","
                  << "\"description\":\"Monthly alignment meeting\","
                  << "\"dateTime\":\"2024-04-29T09:30:53.309Z\","
                  << "\"timeZone\":\"UTC-3\","
                  << "\"location\":{\"name\":\"Meeting Room 1\"},"
                  << "\"canceled\":false"
                  << "}}";
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
                std::cout << "Event sent successfully" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Error: Invalid group ID\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Team Meeting\",\"description\":\"Monthly alignment meeting\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"timeZone\":\"UTC-3\",\"location\":{\"name\":\"Meeting Room 1\"},\"canceled\":false}}",
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
                printf("Event sent successfully\n");
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

### Event with Voice Call

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID (format: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format (ex: 2024-04-29T14:00:00.000Z)');
  }
  return dateTime;
}

// Validate timeZone
function validateTimeZone(timeZone) {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('Invalid timeZone. Use UTC±N format (ex: UTC-3)');
  }
  return timeZone;
}

// Validate callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('Invalid callLinkType. Use: voice or video');
  }
  return callLinkType;
}

// Send event with voice call
async function sendEventWithCall(phone, event) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('The event object must contain name and dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedTimeZone = event.timeZone ? validateTimeZone(event.timeZone) : undefined;
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const payload = {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: validatedTimeZone,
        callLinkType: validatedCallLinkType,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
      },
    };
    
    // Remove undefined fields
    if (!payload.event.description) delete payload.event.description;
    if (!payload.event.timeZone) delete payload.event.timeZone;
    if (!payload.event.location) delete payload.event.location;
    if (!payload.event.callLinkType) delete payload.event.callLinkType;
    
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
    console.log('Event with call sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending event:', error.message);
    throw error;
  }
}

// Example usage
sendEventWithCall('120363019502650977-group', {
  name: 'Marketing Webinar',
  description: 'Webinar on digital marketing strategies',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Interfaces (same as previous example)
interface EventLocation {
  name: string;
}

interface Event {
  name: string;
  dateTime: string;
  canceled: boolean;
  description?: string;
  timeZone?: string;
  location?: EventLocation;
  callLinkType?: 'voice' | 'video';
}

interface EventResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate group ID
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format');
  }
  return dateTime;
}

// Validate callLinkType
function validateCallLinkType(callLinkType?: string): 'voice' | 'video' | undefined {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('Invalid callLinkType. Use: voice or video');
  }
  return callLinkType as 'voice' | 'video' | undefined;
}

// Function to send event with call
async function sendEventWithCall(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDATION
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('The event object must contain name and dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedCallLinkType = validateCallLinkType(event.callLinkType);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;

  const payload: any = {
    phone: validatedGroupId,
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: event.canceled,
      description: event.description?.trim(),
      timeZone: event.timeZone,
      callLinkType: validatedCallLinkType,
      location: event.location ? { name: event.location.name.trim() } : undefined,
    },
  };

  // Remove undefined fields
  Object.keys(payload.event).forEach(key => {
    if (payload.event[key] === undefined) delete payload.event[key];
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
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

// Execute
sendEventWithCall('120363019502650977-group', {
  name: 'Marketing Webinar',
  description: 'Webinar on digital marketing strategies',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
})
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
from datetime import datetime

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-client-token')

def validate_group_id(group_id: str) -> str:
    """Validate group ID (format: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('Invalid group ID. Use format: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Validate ISO 8601 datetime"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Invalid date. Use ISO 8601 format (e.g., 2024-04-29T14:00:00.000Z)')

def validate_call_link_type(call_link_type: Optional[str]) -> Optional[str]:
    """Validate callLinkType"""
    if call_link_type and call_link_type not in ['voice', 'video']:
        raise ValueError('Invalid callLinkType. Use: voice or video')
    return call_link_type

def send_event_with_call(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('The event object must contain name and dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_call_link_type = validate_call_link_type(event.get('callLinkType'))
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-event"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_group_id,
        "event": {
            "name": event["name"].strip(),
            "dateTime": validated_datetime,
            "canceled": event.get("canceled", False),
            "description": event.get("description", "").strip() if event.get("description") else None,
            "timeZone": event.get("timeZone"),
            "callLinkType": validated_call_link_type,
        }
    }
    
    # Remove None fields
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('Event with call sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_event_with_call('120363019502650977-group', {
    'name': 'Marketing Webinar',
    'description': 'Webinar on digital marketing strategies',
    'dateTime': '2024-04-29T14:00:00.000Z',
    'timeZone': 'UTC-3',
    'callLinkType': 'voice',
    'canceled': False
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-client-token}"

# ⚠️ VALIDATION: Validate group ID (format: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Error: Invalid group ID. Use the format: {groupId}-group"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send event with voice call via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Marketing Webinar\",
      \"description\": \"Webinar on digital marketing strategies\",
      \"dateTime\": \"2024-04-29T14:00:00.000Z\",
      \"timeZone\": \"UTC-3\",
      \"callLinkType\": \"voice\",
      \"canceled\": false
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Send event with call
function sendEventWithCall(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('The event object must contain name and dateTime');
      }
      const validatedDateTime = validateDateTime(event.dateTime);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    const payload = JSON.stringify({
      phone: phone,
      event: {
        name: event.name.trim(),
        dateTime: event.dateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: event.timeZone,
        callLinkType: event.callLinkType,
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
            console.log('Event with call sent successfully');
            resolve(result);
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
sendEventWithCall('120363019502650977-group', {
  name: 'Marketing Webinar',
  description: 'Webinar on digital marketing strategies',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
})
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Route to send event with call
app.post('/api/send-event-with-call', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'The event object must contain name and dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        timeZone: event.timeZone,
        callLinkType: event.callLinkType,
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
    console.error('Error sending event:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending event',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Middleware to send event with call
app.use(async (ctx) => {
  if (ctx.path === '/api/send-event-with-call' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'The event object must contain name and dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
          description: event.description ? event.description.trim() : undefined,
          timeZone: event.timeZone,
          callLinkType: event.callLinkType,
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
      console.error('Error sending event:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending event',
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

public class SendEventWithCall {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-client-token";

    // Validate group ID
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject event = new JSONObject();
            event.put("name", "Marketing Webinar");
            event.put("description", "Webinar on digital marketing strategies");
            event.put("dateTime", "2024-04-29T14:00:00.000Z");
            event.put("timeZone", "UTC-3");
            event.put("callLinkType", "voice");
            event.put("canceled", false);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("event", event);
            
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
                
                System.out.println("Event with call sent successfully");
                System.out.println(response.toString());
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
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-client-token";

    // Validate group ID
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Marketing Webinar",
                    description = "Webinar on digital marketing strategies",
                    dateTime = "2024-04-29T14:00:00.000Z",
                    timeZone = "UTC-3",
                    callLinkType = "voice",
                    canceled = false
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
                    Console.WriteLine("Event with call sent successfully");
                    Console.WriteLine(result);
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-client-token")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("Invalid group ID. Use the format: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name":        "Marketing Webinar",
            "description": "Webinar on digital marketing strategies",
            "dateTime":    "2024-04-29T14:00:00.000Z",
            "timeZone":    "UTC-3",
            "callLinkType": "voice",
            "canceled":    false,
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Error marshalling JSON: %v\n", err)
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
        
        fmt.Println("Event with call sent successfully")
        fmt.Println(string(body))
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-client-token';

// Validate group ID
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('Invalid group ID. Use the format: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDATION
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Marketing Webinar',
            'description' => 'Webinar on digital marketing strategies',
            'dateTime' => '2024-04-29T14:00:00.000Z',
            'timeZone' => 'UTC-3',
            'callLinkType' => 'voice',
            'canceled' => false,
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
        error_log("cURL error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Event with call sent successfully\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-client-token'

# Validate group ID
def validate_group_id(group_id)
  raise 'Invalid group ID. Use the format: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDATION
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Marketing Webinar',
      description: 'Webinar on digital marketing strategies',
      dateTime: '2024-04-29T14:00:00.000Z',
      timeZone: 'UTC-3',
      callLinkType: 'voice',
      canceled: false
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Event with call sent successfully'
    puts result.to_json
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-client-token"

// Validate group ID
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid group ID. Use the format: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDATION
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Marketing Webinar",
            "description": "Webinar on digital marketing strategies",
            "dateTime": "2024-04-29T14:00:00.000Z",
            "timeZone": "UTC-3",
            "callLinkType": "voice",
            "canceled": false
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
                        print("Event with call sent successfully")
                        print(result)
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-client-token" }

# Validate group ID
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "Invalid group ID. Use the format: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Marketing Webinar"
            description = "Webinar on digital marketing strategies"
            dateTime = "2024-04-29T14:00:00.000Z"
            timeZone = "UTC-3"
            callLinkType = "voice"
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Event with call sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-client-token

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Marketing Webinar",
    "description": "Webinar on digital marketing strategies",
    "dateTime": "2024-04-29T14:00:00.000Z",
    "timeZone": "UTC-3",
    "callLinkType": "voice",
    "canceled": false
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Error: Invalid group ID" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Marketing Webinar\","
                  << "\"description\":\"Webinar on digital marketing strategies\","
                  << "\"dateTime\":\"2024-04-29T14:00:00.000Z\","
                  << "\"timeZone\":\"UTC-3\","
                  << "\"callLinkType\":\"voice\","
                  << "\"canceled\":false"
                  << "}}";
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
                std::cout << "Event with call sent successfully" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Error: Invalid group ID\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Marketing Webinar\",\"description\":\"Webinar on digital marketing strategies\",\"dateTime\":\"2024-04-29T14:00:00.000Z\",\"timeZone\":\"UTC-3\",\"callLinkType\":\"voice\",\"canceled\":false}}",
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
                printf("Event with call sent successfully\n");
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

### Canceled Event

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID (format: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format (ex: 2024-04-29T09:30:53.309Z)');
  }
  return dateTime;
}

// Send canceled event
async function sendCanceledEvent(phone, event) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('The event object must contain name and dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const payload = {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Canceled event
        description: event.description ? event.description.trim() : undefined,
      },
    };
    
    // Remove undefined fields
    if (!payload.event.description) delete payload.event.description;
    
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
    console.log('Canceled event sent successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error sending event:', error.message);
    throw error;
  }
}

// Example usage
sendCanceledEvent('120363019502650977-group', {
  name: 'Canceled Event',
  description: 'This event has been canceled',
  dateTime: '2024-04-29T09:30:53.309Z',
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Interfaces (same as previous example)
interface Event {
  name: string;
  dateTime: string;
  canceled: boolean;
  description?: string;
}

interface EventResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validate group ID
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID. Use the format: {groupId}-group');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date. Use ISO 8601 format');
  }
  return dateTime;
}

// Function to send canceled event
async function sendCanceledEvent(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDATION
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('The event object must contain name and dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;

  const payload: any = {
    phone: validatedGroupId,
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: true, // Canceled event
      description: event.description?.trim(),
    },
  };

  // Remove undefined fields
  if (!payload.event.description) delete payload.event.description;

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

  return response.json();
}

// Execute
sendCanceledEvent('120363019502650977-group', {
  name: 'Canceled Event',
  description: 'This event has been canceled',
  dateTime: '2024-04-29T09:30:53.309Z',
})
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
from datetime import datetime

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'your-client-token')

def validate_group_id(group_id: str) -> str:
    """Validate group ID (format: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('Invalid group ID. Use format: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Validate ISO 8601 datetime"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Invalid date. Use ISO 8601 format (e.g., 2024-04-29T09:30:53.309Z)')

def send_canceled_event(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('The event object must contain name and dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    
    # Endpoint URL (always HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-event"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_group_id,
        "event": {
            "name": event["name"].strip(),
            "dateTime": validated_datetime,
            "canceled": True,  # Canceled event
            "description": event.get("description", "").strip() if event.get("description") else None,
        }
    }
    
    # Remove None fields
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SECURITY: Always use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print('Canceled event sent successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
send_canceled_event('120363019502650977-group', {
    'name': 'Canceled Event',
    'description': 'This event has been canceled',
    'dateTime': '2024-04-29T09:30:53.309Z',
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID="${ZAPI_INSTANCE_ID:-YOUR_INSTANCE}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-YOUR_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-your-client-token}"

# ⚠️ VALIDATION: Validate group ID (format: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Error: Invalid group ID. Use the format: {groupId}-group"
    exit 1
fi

# ⚠️ SECURITY: Always use HTTPS (never HTTP)
# Send canceled event via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Canceled Event\",
      \"description\": \"This event has been canceled\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"canceled\": true
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Send canceled event
function sendCanceledEvent(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('The event object must contain name and dateTime');
      }
      const validatedDateTime = validateDateTime(event.dateTime);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    const payload = JSON.stringify({
      phone: phone,
      event: {
        name: event.name.trim(),
        dateTime: event.dateTime,
        canceled: true, // Canceled event
        description: event.description ? event.description.trim() : undefined,
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
            console.log('Canceled event sent successfully');
            resolve(result);
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
sendCanceledEvent('120363019502650977-group', {
  name: 'Canceled Event',
  description: 'This event has been canceled',
  dateTime: '2024-04-29T09:30:53.309Z',
})
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Route to send canceled event
app.post('/api/send-canceled-event', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'The event object must contain name and dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Canceled event
        description: event.description ? event.description.trim() : undefined,
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
    console.error('Error sending event:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error sending event',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'your-client-token';

// Validate group ID
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('Invalid group ID');
  }
  return groupId;
}

// Validate ISO 8601 date
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return dateTime;
}

// Middleware to send canceled event
app.use(async (ctx) => {
  if (ctx.path === '/api/send-canceled-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'The event object must contain name and dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SECURITY: Always use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: true, // Canceled event
          description: event.description ? event.description.trim() : undefined,
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
      console.error('Error sending event:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error sending event',
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

public class SendCanceledEvent {
    // ⚠️ SECURITY: Use environment variables for credentials
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "your-client-token";

    // Validate group ID
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDATION
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject event = new JSONObject();
            event.put("name", "Canceled Event");
            event.put("description", "This event has been canceled");
            event.put("dateTime", "2024-04-29T09:30:53.309Z");
            event.put("canceled", true); // Canceled event
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("event", event);
            
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
                
                System.out.println("Canceled event sent successfully");
                System.out.println(response.toString());
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
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "YOUR_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "your-client-token";

    // Validate group ID
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("Invalid group ID. Use the format: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDATION
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SECURITY: Always use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Canceled Event",
                    description = "This event has been canceled",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    canceled = true // Canceled event
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
                    Console.WriteLine("Canceled event sent successfully");
                    Console.WriteLine(result);
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
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "your-client-token")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("Invalid group ID. Use the format: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDATION
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // ⚠️ SECURITY: Always use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name":        "Canceled Event",
            "description": "This event has been canceled",
            "dateTime":    "2024-04-29T09:30:53.309Z",
            "canceled":    true, // Canceled event
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Error marshalling JSON: %v\n", err)
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
        
        fmt.Println("Canceled event sent successfully")
        fmt.Println(string(body))
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
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'your-client-token';

// Validate group ID
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('Invalid group ID. Use the format: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDATION
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SECURITY: Always use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Canceled Event',
            'description' => 'This event has been canceled',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'canceled' => true, // Canceled event
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
        error_log("cURL error: " . $error);
        echo "Request error\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Canceled event sent successfully\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
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
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'your-client-token'

# Validate group ID
def validate_group_id(group_id)
  raise 'Invalid group ID. Use the format: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDATION
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SECURITY: Always use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Canceled Event',
      description: 'This event has been canceled',
      dateTime: '2024-04-29T09:30:53.309Z',
      canceled: true # Canceled event
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Canceled event sent successfully'
    puts result.to_json
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
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "YOUR_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "your-client-token"

// Validate group ID
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid group ID. Use the format: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDATION
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SECURITY: Always use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Canceled Event",
            "description": "This event has been canceled",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "canceled": true // Canceled event
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
                        print("Canceled event sent successfully")
                        print(result)
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
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "your-client-token" }

# Validate group ID
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "Invalid group ID. Use the format: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDATION
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SECURITY: Always use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Canceled Event"
            description = "This event has been canceled"
            dateTime = "2024-04-29T09:30:53.309Z"
            canceled = $true # Canceled event
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Canceled event sent successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-client-token

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Canceled Event",
    "description": "This event has been canceled",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": true
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Error: Invalid group ID" << std::endl;
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Canceled Event\","
                  << "\"description\":\"This event has been canceled\","
                  << "\"dateTime\":\"2024-04-29T09:30:53.309Z\","
                  << "\"canceled\":true"
                  << "}}";
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
                std::cout << "Canceled event sent successfully" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "YOUR_INSTANCE");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "YOUR_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "your-client-token");
    
    // ⚠️ VALIDATION
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Error: Invalid group ID\n");
        return 1;
    }
    
    // ⚠️ SECURITY: Always use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Canceled Event\",\"description\":\"This event has been canceled\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"canceled\":true}}",
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
                printf("Canceled event sent successfully\n");
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
| `messageId` | string | Unique message ID in WhatsApp. **Save this ID!** Use it to track the event status, to edit the event later using [Edit Event](/docs/messages/editar-evento), or to respond to the event using [Respond to Event](/docs/messages/responder-evento) |
| `id` | string | Compatibility ID for Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the main identifier you should use to track and manage the event.
- The `zaapId` is used internally by Z-API for processing.
- The `id` exists only for compatibility with legacy integrations (like Zapier).

**Delivery and Response Tracking:**

To know when the event was delivered, when participants responded (accepted/declined), or if there was an error, configure a webhook and monitor the events. See more about [received message webhooks](../webhooks/ao-receber).

### Common Errors {#common-errors}

| Code | Reason | How to Solve |
|------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check if all required attributes were sent (`phone`, `event.name`, `event.dateTime`, `event.canceled`), if the `phone` is in the correct format (`{groupId}-group`), if the date is in ISO 8601 format, and if `canceled` is a boolean |
| 401 | Invalid token | Check the header `Client-Token` |
| 405 | Incorrect method | Make sure you are using the method `POST` |
| 415 | Incorrect Content-Type | Add `Content-Type: application/json` to the request headers |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if it persists |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#related-webhook}

[Webhook for received message](/docs/webhooks/ao-receber) - Receive notifications when participants respond to the event

---

## <Icon name="Lightbulb" size="md" /> Tips {#tips}

- **Only Groups**: Events can only be sent to groups, not individual contacts
- **Date Format**: Use ISO 8601 format for `dateTime` (ex: `2024-04-29T09:30:53.309Z`)
- **Calls**: Use `callLinkType: "voice"` for voice calls or `"video"` for video
- **Cancellation**: Set `canceled: true` to mark an event as canceled
- **Location**: Location is optional but helps participants find the event

---

## <Icon name="Rocket" size="md" /> Next Steps

- [Edit Event](/docs/messages/editar-evento) - Learn how to edit an existing event
- [Groups](/docs/groups/introducao) - Understand how to work with groups
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive event responses