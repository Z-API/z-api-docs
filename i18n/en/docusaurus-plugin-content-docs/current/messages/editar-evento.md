---
id: editar-evento
sidebar_position: 36
title: Edit Event
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Edit Event

Edit an existing event in a group. Use this method to update information such as name, date, time, location or cancellation status of an already created event.

---

:::tip Important

To edit the event, you need to resend **all data** that is already configured for the event, even if it does not change. If these data are not sent, they may be removed from the event.

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Update Date**: Change the date or time of an event
- **Change Location**: Update the location of the event
- **Modify Description**: Update the description of the event
- **Cancel Event**: Mark an event as canceled

---

## <Icon name="Wand2" size="md" /> For No-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

- **`phone`**: ID of the group where the event was created. **IMPORTANT**: Use the format `{groupId}-group` (ex: `120363019502650977-group`). This method is **only available for groups**, it is not possible to edit events of individual contacts.

- **`eventMessageId`**: ID of the original event message that you want to edit. **IMPORTANT**: This is the `messageId` returned when you created the event using [Send Event](/docs/messages/evento). Save this ID when creating the event to be able to edit it later.

- **`event`**: An object containing **ALL** the data of the event, even those that do not change. **CRITICAL ATTENTION**: If you do not resend all the data that was already configured in the event, they may be removed. Inside this object, you need to configure:

  - **`name`**: Event name (required). Even if it does not change, resend the current name.
  - **`dateTime`**: Date and time of the event (required). Use ISO 8601 format (ex: `2024-04-29T09:30:53.309Z`). Even if it does not change, resend the current date.
  - **`canceled`**: Defines whether the event is canceled (required). Use `true` to cancel or `false` to keep active. Even if it does not change, resend the current status.

### Optional Fields (but resend if they existed)

- **`description`**: Event description (optional). **IMPORTANT**: If the original event had a description, you MUST resend it here, even if it does not change. Otherwise, it will be removed.

- **`location`**: Event location (optional). An object containing:
  - **`name`**: Place name (required if `location` is provided). **IMPORTANT**: If the original event had a location, you MUST resend it here, even if it does not change. Otherwise, it will be removed.

- **`callLinkType`**: Integrated call type (optional). Use `"voice"` for voice calls or `"video"` for video calls. **IMPORTANT**: If the original event had a `callLinkType`, you MUST resend it here, even if it does not change. Otherwise, it will be removed.

### Practical Example for No-Code

**Example: Edit only the name of the event (keeping everything else the same):**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D241XXXX732339502B68",
  "event": {
    "name": "Reunião de Equipe - ATUALIZADO",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": false,
    "description": "Descrição original mantida",
    "location": {
      "name": "Sala de Reuniões 1"
    },
    "callLinkType": "video",
    "canceled": false
  }
}
```

**Example: Change only the date (keeping everything else the same):**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D241XXXX732339502B68",
  "event": {
    "name": "Reunião de Equipe",
    "dateTime": "2024-05-01T14:00:00.000Z",
    "canceled": false,
    "description": "Descrição original mantida",
    "location": {
      "name": "Sala de Reuniões 1"
    },
    "callLinkType": "video",
    "canceled": false
  }
}
```

**Example: Cancel event (keeping all data):**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D241XXXX732339502B68",
  "event": {
    "name": "Reunião de Equipe",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": true,
    "description": "Descrição original mantida",
    "location": {
      "name": "Sala de Reuniões 1"
    },
    "callLinkType": "video",
    "canceled": false
  }
}
```

**Important Tips:**

- **Resend All Data**: Always resend all fields of the event, even those that do not change. If you do not resend a field that existed in the original event, it will be removed.
- **Get eventMessageId**: The `eventMessageId` is the `messageId` returned when you created the event. Save this ID when creating the event to be able to edit it later. You can also get it through webhooks when the event is created.
- **Date Format**: Maintain the ISO 8601 format for `dateTime` (ex: `2024-04-29T09:30:53.309Z`). Even if it does not change, resend the current date.
- **Optional Fields**: If the original event had optional fields (such as `description`, `location`, `callLinkType`), you MUST resend them here, even if they do not change. Otherwise, they will be removed.
- **Cancellation**: Set `canceled: true` to cancel the event. Remember to resend all other data as well.
- **Response**: The response will be an object with `zaapId`, `messageId` and `id` (for compatibility with Zapier). The `messageId` returned is the same as the original event (does not change when editing).

**Common Use Cases:**

- **Update Date**: Change the date or time of an event (resending all other data)
- **Change Location**: Update the location of the event (resending all other data)
- **Modify Description**: Update the description of the event (resending all other data)
- **Cancel Event**: Mark an event as canceled (resending all other data)
- **Rename Event**: Change the name of the event (resending all other data)

**Recommended Workflow:**

1. Create the event using [Send Event](/docs/messages/evento) and save the `messageId` returned
2. When you need to edit, use this `messageId` as `eventMessageId`
3. Resend all data of the event, changing only what needs to be changed
4. Monitor webhooks to confirm that the edit was applied

**Next Steps:**

- [Send Event](/docs/messages/evento) - Learn how to create an event
- [Respond to Event](/docs/messages/responder-evento) - Learn how to respond to an event (accept/decline)
- [Groups](/docs/groups/introducao) - Understand how to work with groups
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive notifications

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-edit-event
```

### <Icon name="Info" size="sm" /> Conceptualization {#conceituacao}

In this method, you can send messages to edit an Event.

![Example of event editing](/img/SendingEditEvent.jpeg)

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|-----------|------|-------------|
| `phone` | string | Group ID in the format `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANT**: Send only numbers, without formatting or mask |
| `eventMessageId` | string | ID of the original event message that will be edited |
| `event` | object | Complete event data (see structure below) |

### Structure of Object `event`

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Event name |
| `dateTime` | string | Yes | Event date and time in ISO 8601 format |
| `canceled` | boolean | Yes | Defines whether the event is canceled |
| `description` | string | No | Event description (resend even if it does not change) |
| `location` | object | No | Event location (resend even if it does not change) |
| `callLinkType` | string | No | Call type: `voice` or `video` (resend even if it does not change) |

### Structure of Object `location`

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Place name |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

### Edit Event Name and Date

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
    throw new Error('Invalid date. Use ISO 8601 format (ex: 2024-04-30T10:00:00.000Z)');
  }
  return dateTime;
}

// Validate callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('Invalid callLinkType. Use: voice or video');
  }
  return callLinkType;
}

// Edit event
async function editEvent(phone, eventMessageId, event) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      throw new Error('eventMessageId is required');
    }
    if (!event || !event.name || !event.dateTime) {
      throw new Error('The event object must contain name and dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const payload = {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: validatedCallLinkType,
      },
    };
    
    // Remove undefined fields
    if (!payload.event.description) delete payload.event.description;
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
    console.log('Event edited successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error editing event:', error.message);
    throw error;
  }
}

// Example usage
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'New event name',
  description: 'Event description',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Place name',
  },
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

// Interfaces
interface EventLocation {
  name: string;
}

interface Event {
  name: string;
  dateTime: string;
  canceled: boolean;
  description?: string;
  location?: EventLocation;
  callLinkType?: 'voice' | 'video';
}

interface EditEventResponse {
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

// Function to edit event
async function editEvent(
  phone: string,
  eventMessageId: string,
  event: Event
): Promise<EditEventResponse> {
  // ⚠️ VALIDATION
  const validatedGroupId = validateGroupId(phone);
  if (!eventMessageId || eventMessageId.trim() === '') {
    throw new Error('eventMessageId is required');
  }
  if (!event.name || !event.dateTime) {
    throw new Error('The event object must contain name and dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedCallLinkType = validateCallLinkType(event.callLinkType);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;

  const payload: any = {
    phone: validatedGroupId,
    eventMessageId: eventMessageId.trim(),
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: event.canceled,
      description: event.description?.trim(),
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
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'New event name',
  description: 'Event description',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Place name',
  },
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
        raise ValueError('Invalid date. Use ISO 8601 format (e.g., 2024-04-30T10:00:00.000Z)')

def validate_call_link_type(call_link_type: Optional[str]) -> Optional[str]:
    """Validate callLinkType"""
    if call_link_type and call_link_type not in ['voice', 'video']:
        raise ValueError('Invalid callLinkType. Use: voice or video')
    return call_link_type

def edit_event(phone: str, event_message_id: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_group_id = validate_group_id(phone)
    if not event_message_id or not isinstance(event_message_id, str) or not event_message_id.strip():
        raise ValueError('eventMessageId is required')
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('event object must contain name and dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_call_link_type = validate_call_link_type(event.get('callLinkType'))
    
    # ⚠️ SECURITY: Always use HTTPS
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-edit-event"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_group_id,
        "eventMessageId": event_message_id.strip(),
        "event": {
            "name": event["name"].strip(),
            "dateTime": validated_datetime,
            "canceled": event.get("canceled", False),
            "description": event.get("description", "").strip() if event.get("description") else None,
            "location": {
                "name": event["location"]["name"].strip()
            } if event.get("location") and event["location"].get("name") else None,
            "callLinkType": validated_call_link_type,
        }
    }
    
    # Remove None fields
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        print('Event edited successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
edit_event('120363019502650977-group', '3EB058359730B7C2895C55', {
    'name': 'New event name',
    'description': 'Event description',
    'dateTime': '2024-04-30T10:00:00.000Z',
    'location': {
        'name': 'Place name'
    },
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
# Edit event via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-edit-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"eventMessageId\": \"3EB058359730B7C2895C55\",
    \"event\": {
      \"name\": \"New event name\",
      \"description\": \"Event description\",
      \"dateTime\": \"2024-04-30T10:00:00.000Z\",
      \"location\": {
        \"name\": \"Place name\"
      },
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

// Edit event
function editEvent(phone, eventMessageId, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        throw new Error('eventMessageId is required');
      }
      if (!event || !event.name || !event.dateTime) {
        throw new Error('The event object must contain name and dateTime');
      }
      const validatedDateTime = validateDateTime(event.dateTime);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    const payload = JSON.stringify({
      phone: phone,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: event.dateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
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
            console.log('Event edited successfully');
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
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'New event name',
  description: 'Event description',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Place name',
  },
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

// Route to edit event
app.post('/api/edit-event', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, eventMessageId, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'eventMessageId is required',
      });
    }
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'The event object must contain name and dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
        description: event.description ? event.description.trim() : undefined,
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
    console.error('Error editing event:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error editing event',
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

// Middleware to edit event
app.use(async (ctx) => {
  if (ctx.path === '/api/edit-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, eventMessageId, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'eventMessageId is required',
        };
        return;
      }
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
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        eventMessageId: eventMessageId.trim(),
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: event.canceled !== undefined ? Boolean(event.canceled) : false,
          description: event.description ? event.description.trim() : undefined,
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
      console.error('Error editing event:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error editing event',
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

public class EditEvent {
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
                "https://api.z-api.io/instances/%s/token/%s/send-edit-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Place name");
            
            JSONObject event = new JSONObject();
            event.put("name", "New event name");
            event.put("description", "Event description");
            event.put("dateTime", "2024-04-30T10:00:00.000Z");
            event.put("location", location);
            event.put("callLinkType", "voice");
            event.put("canceled", false);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("eventMessageId", "3EB058359730B7C2895C55");
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
                
                System.out.println("Event edited successfully");
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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-edit-event";
            
            var payload = new
            {
                phone = phone,
                eventMessageId = "3EB058359730B7C2895C55",
                event = new
                {
                    name = "New event name",
                    description = "Event description",
                    dateTime = "2024-04-30T10:00:00.000Z",
                    location = new { name = "Place name" },
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
                    Console.WriteLine("Event edited successfully");
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": map[string]interface{}{
            "name": "New event name",
            "description": "Event description",
            "dateTime": "2024-04-30T10:00:00.000Z",
            "location": map[string]interface{}{
                "name": "Place name",
            },
            "callLinkType": "voice",
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
        
        fmt.Println("Event edited successfully")
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
        'https://api.z-api.io/instances/%s/token/%s/send-edit-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'eventMessageId' => '3EB058359730B7C2895C55',
        'event' => [
            'name' => 'New event name',
            'description' => 'Event description',
            'dateTime' => '2024-04-30T10:00:00.000Z',
            'location' => [
                'name' => 'Place name',
            ],
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
        echo "Event edited successfully\n";
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
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-edit-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    eventMessageId: '3EB058359730B7C2895C55',
    event: {
      name: 'New event name',
      description: 'Event description',
      dateTime: '2024-04-30T10:00:00.000Z',
      location: {
        name: 'Place name'
      },
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
    puts 'Event edited successfully'
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
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-edit-event"
    
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
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": [
            "name": "New event name",
            "description": "Event description",
            "dateTime": "2024-04-30T10:00:00.000Z",
            "location": [
                "name": "Place name"
            ],
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
                        print("Event edited successfully")
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
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-edit-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        eventMessageId = "3EB058359730B7C2895C55"
        event = @{
            name = "New event name"
            description = "Event description"
            dateTime = "2024-04-30T10:00:00.000Z"
            location = @{
                name = "Place name"
            }
            callLinkType = "voice"
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Event edited successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-edit-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-client-token

{
  "phone": "120363019502650977-group",
  "eventMessageId": "3EB058359730B7C2895C55",
  "event": {
    "name": "New event name",
    "description": "Event description",
    "dateTime": "2024-04-30T10:00:00.000Z",
    "location": {
      "name": "Place name"
    },
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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-edit-event";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"eventMessageId\":\"3EB058359730B7C2895C55\","
                  << "\"event\":{"
                  << "\"name\":\"New event name\","
                  << "\"description\":\"Event description\","
                  << "\"dateTime\":\"2024-04-30T10:00:00.000Z\","
                  << "\"location\":{\"name\":\"Place name\"},"
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
                std::cout << "Event edited successfully" << std::endl;
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"eventMessageId\":\"3EB058359730B7C2895C55\",\"event\":{\"name\":\"New event name\",\"description\":\"Event description\",\"dateTime\":\"2024-04-30T10:00:00.000Z\",\"location\":{\"name\":\"Place name\"},\"callLinkType\":\"voice\",\"canceled\":false}}",
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
                printf("Event edited successfully\n");
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

### Cancel Event

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

// Cancel event
async function cancelEvent(phone, eventMessageId, event) {
  try {
    // ⚠️ VALIDATION: Validate input
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      throw new Error('eventMessageId is required');
    }
    if (!event || !event.name || !event.dateTime) {
      throw new Error('The event object must contain name and dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const payload = {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Cancel event
        description: event.description ? event.description.trim() : undefined,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: event.callLinkType,
      },
    };
    
    // Remove undefined fields
    if (!payload.event.description) delete payload.event.description;
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
    console.log('Event cancelled successfully');
    return data;
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling without exposing stack traces in production
    console.error('Error cancelling event:', error.message);
    throw error;
  }
}

// Example usage
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Event name',
  description: 'Event description',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Place name',
  },
  callLinkType: 'voice',
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
  location?: EventLocation;
  callLinkType?: 'voice' | 'video';
}

interface EditEventResponse {
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

// Function to cancel event
async function cancelEvent(
  phone: string,
  eventMessageId: string,
  event: Event
): Promise<EditEventResponse> {
  // ⚠️ VALIDATION
  const validatedGroupId = validateGroupId(phone);
  if (!eventMessageId || eventMessageId.trim() === '') {
    throw new Error('eventMessageId is required');
  }
  if (!event.name || !event.dateTime) {
    throw new Error('The event object must contain name and dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);

  // ⚠️ SECURITY: Always use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;

  const payload: any = {
    phone: validatedGroupId,
    eventMessageId: eventMessageId.trim(),
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: true, // Cancel event
      description: event.description?.trim(),
      location: event.location ? { name: event.location.name.trim() } : undefined,
      callLinkType: event.callLinkType,
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
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Event name',
  description: 'Event description',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Place name',
  },
  callLinkType: 'voice',
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

def cancel_event(phone: str, event_message_id: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDATION
    validated_group_id = validate_group_id(phone)
    if not event_message_id or not isinstance(event_message_id, str) or not event_message_id.strip():
        raise ValueError('eventMessageId is required')
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('event object must contain name and dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    
    # ⚠️ SECURITY: Always use HTTPS
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-edit-event"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_group_id,
        "eventMessageId": event_message_id.strip(),
        "event": {
            "name": event["name"].strip(),
            "dateTime": validated_datetime,
            "canceled": True,  # Cancel event
            "description": event.get("description", "").strip() if event.get("description") else None,
            "location": {
                "name": event["location"]["name"].strip()
            } if event.get("location") and event["location"].get("name") else None,
            "callLinkType": event.get("callLinkType"),
        }
    }
    
    # Remove None fields
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        print('Event cancelled successfully')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: Request failed")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise

# Example usage
cancel_event('120363019502650977-group', '3EB058359730B7C2895C55', {
    'name': 'Event name',
    'description': 'Event description',
    'dateTime': '2024-04-29T09:30:53.309Z',
    'location': {
        'name': 'Place name'
    },
    'callLinkType': 'voice'
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
# Cancel event via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-edit-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"eventMessageId\": \"3EB058359730B7C2895C55\",
    \"event\": {
      \"name\": \"Event name\",
      \"description\": \"Event description\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"location\": {
        \"name\": \"Place name\"
      },
      \"callLinkType\": \"voice\",
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

// Cancel event
function cancelEvent(phone, eventMessageId, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDATION
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        throw new Error('eventMessageId is required');
      }
      if (!event || !event.name || !event.dateTime) {
        throw new Error('The event object must contain name and dateTime');
      }
      const validatedDateTime = validateDateTime(event.dateTime);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    const payload = JSON.stringify({
      phone: phone,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: event.dateTime,
        canceled: true, // Cancel event
        description: event.description ? event.description.trim() : undefined,
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
            console.log('Event cancelled successfully');
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
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Event name',
  description: 'Event description',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Place name',
  },
  callLinkType: 'voice',
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

// Route to cancel event
app.post('/api/cancel-event', async (req, res) => {
  try {
    // ⚠️ VALIDATION
    const { phone, eventMessageId, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'eventMessageId is required',
      });
    }
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'The event object must contain name and dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SECURITY: Always use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Cancel event
        description: event.description ? event.description.trim() : undefined,
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
    console.error('Error cancelling event:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Error cancelling event',
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

// Middleware to cancel event
app.use(async (ctx) => {
  if (ctx.path === '/api/cancel-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDATION
      const { phone, eventMessageId, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'eventMessageId is required',
        };
        return;
      }
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
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        eventMessageId: eventMessageId.trim(),
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: true, // Cancel event
          description: event.description ? event.description.trim() : undefined,
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
      console.error('Error cancelling event:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Error cancelling event',
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

public class CancelEvent {
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
                "https://api.z-api.io/instances/%s/token/%s/send-edit-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Place name");
            
            JSONObject event = new JSONObject();
            event.put("name", "Event name");
            event.put("description", "Event description");
            event.put("dateTime", "2024-04-29T09:30:53.309Z");
            event.put("location", location);
            event.put("callLinkType", "voice");
            event.put("canceled", true); // Cancel event
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("eventMessageId", "3EB058359730B7C2895C55");
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
                
                System.out.println("Event cancelled successfully");
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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-edit-event";
            
            var payload = new
            {
                phone = phone,
                eventMessageId = "3EB058359730B7C2895C55",
                event = new
                {
                    name = "Event name",
                    description = "Event description",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    location = new { name = "Place name" },
                    callLinkType = "voice",
                    canceled = true // Cancel event
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
                    Console.WriteLine("Event cancelled successfully");
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": map[string]interface{}{
            "name": "Event name",
            "description": "Event description",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "location": map[string]interface{}{
                "name": "Place name",
            },
            "callLinkType": "voice",
            "canceled": true, // Cancel event
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
        
        fmt.Println("Event cancelled successfully")
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
        'https://api.z-api.io/instances/%s/token/%s/send-edit-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'eventMessageId' => '3EB058359730B7C2895C55',
        'event' => [
            'name' => 'Event name',
            'description' => 'Event description',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'location' => [
                'name' => 'Place name',
            ],
            'callLinkType' => 'voice',
            'canceled' => true, // Cancel event
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
        echo "Event cancelled successfully\n";
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
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-edit-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    eventMessageId: '3EB058359730B7C2895C55',
    event: {
      name: 'Event name',
      description: 'Event description',
      dateTime: '2024-04-29T09:30:53.309Z',
      location: {
        name: 'Place name'
      },
      callLinkType: 'voice',
      canceled: true # Cancel event
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Event cancelled successfully'
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
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-edit-event"
    
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
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": [
            "name": "Event name",
            "description": "Event description",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "location": [
                "name": "Place name"
            ],
            "callLinkType": "voice",
            "canceled": true // Cancel event
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
                        print("Event cancelled successfully")
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
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-edit-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        eventMessageId = "3EB058359730B7C2895C55"
        event = @{
            name = "Event name"
            description = "Event description"
            dateTime = "2024-04-29T09:30:53.309Z"
            location = @{
                name = "Place name"
            }
            callLinkType = "voice"
            canceled = $true # Cancel event
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Event cancelled successfully"
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
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-edit-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: your-client-token

{
  "phone": "120363019502650977-group",
  "eventMessageId": "3EB058359730B7C2895C55",
  "event": {
    "name": "Event name",
    "description": "Event description",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "location": {
      "name": "Place name"
    },
    "callLinkType": "voice",
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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-edit-event";
    
    // Create JSON payload
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"eventMessageId\":\"3EB058359730B7C2895C55\","
                  << "\"event\":{"
                  << "\"name\":\"Event name\","
                  << "\"description\":\"Event description\","
                  << "\"dateTime\":\"2024-04-29T09:30:53.309Z\","
                  << "\"location\":{\"name\":\"Place name\"},"
                  << "\"callLinkType\":\"voice\","
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
                std::cout << "Event cancelled successfully" << std::endl;
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"eventMessageId\":\"3EB058359730B7C2895C55\",\"event\":{\"name\":\"Event name\",\"description\":\"Event description\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"location\":{\"name\":\"Place name\"},\"callLinkType\":\"voice\",\"canceled\":true}}",
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
                printf("Event cancelled successfully\n");
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
| `messageId` | string | Unique message ID in WhatsApp. **IMPORTANT**: This is the same `messageId` as the original event (does not change when editing). Use this ID to edit the event again in the future |
| `id` | string | Compatibility ID for Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` returned is the **same** as the original event (does not change when editing). Use this ID to edit the event again in the future.
- The `zaapId` is used internally by Z-API for processing.
- The `id` exists only for compatibility with legacy integrations (like Zapier).

**Edit Tracking:**

To know when the edit was applied or if there was an error, configure a webhook and monitor the events. See more about [received message webhooks](../webhooks/ao-receber).

### Common Errors {#erros-comuns}

| Code | Reason | How to Solve |
|------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check if all required attributes were sent (`phone`, `eventMessageId`, `event.name`, `event.dateTime`, `event.canceled`), if the `phone` is in the correct format (`{groupId}-group`), if the `eventMessageId` is valid, and if the date is in ISO 8601 format |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Event not found | Check if the `eventMessageId` exists and is valid |
| 405 | Incorrect method | Make sure you are using the method `POST` |
| 415 | Incorrect Content-Type | Add `Content-Type: application/json` to the request headers |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if it persists |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

[Webhook for received message](/docs/webhooks/ao-receber) - Receive notifications when participants respond to the edited event

---

## <Icon name="Lightbulb" size="md" /> Tips {#dicas}

- **Send All Data**: Always send all fields of the event, even if they haven't changed
- **Event ID**: Use the `messageId` from the original event for `eventMessageId`
- **Date Format**: Keep the ISO 8601 format for `dateTime`
- **Cancelation**: Set `canceled: true` to cancel the event

---

## <Icon name="Rocket" size="md" /> Next Steps

- [Send Event](/docs/messages/evento) - Learn how to create an event
- [Groups](/docs/groups/introducao) - Understand how to work with groups
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive responses
```