---
id: alterar-horario-funcionamento
title: Change Business Hours
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Change Business Hours

Configure your company's business hours on WhatsApp Business.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to change the business hours of your company on your WhatsApp Business profile. You can configure specific hours for each day of the week, set as open 24 hours, or appointment only.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

**Operating modes**:
- `specificHours`: Specific hours for each day of the week
- `open24h`: Open 24 hours every day
- `appointmentOnly`: Appointment only

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/hours
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|-------------|-----------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-----------|
| `timezone` | string | Timezone location (e.g., `"America/Sao_Paulo"`, `"America/New_York"`) |

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `mode` | string | Operating mode. Possible values: `"specificHours"`, `"open24h"`, `"appointmentOnly"` |
| `days` | array[object] | Array with the days of the week the company operates |

### `days` Object

| Attribute | Type | Description |
|----------|------|-----------|
| `dayOfWeek` | string | Day of the week. Values: `"SUNDAY"`, `"MONDAY"`, `"TUESDAY"`, `"WEDNESDAY"`, `"THURSDAY"`, `"FRIDAY"`, `"SATURDAY"` |
| `openTime` | string | Opening time in `hh:mm` format (e.g., `"08:00"`) |
| `closeTime` | string | Closing time in `hh:mm` format (e.g., `"18:00"`) |

:::tip Tip
To set all days as "closed", simply send the `days` attribute as an empty array (`[]`).
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Specific hours**:

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/hours
Content-Type: application/json
Client-Token: your-security-token

{
  "timezone": "America/Sao_Paulo",
  "mode": "specificHours",
  "days": [
    {
      "dayOfWeek": "MONDAY",
      "openTime": "08:00",
      "closeTime": "12:00"
    },
    {
      "dayOfWeek": "MONDAY",
      "openTime": "14:00",
      "closeTime": "18:00"
    },
    {
      "dayOfWeek": "TUESDAY",
      "openTime": "08:00",
      "closeTime": "18:00"
    }
  ]
}
```

**Open 24 hours**:

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/hours
Content-Type: application/json
Client-Token: your-security-token

{
  "timezone": "America/Sao_Paulo",
  "mode": "open24h"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Specific hours
const response = await fetch(
  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/hours',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'your-security-token',
    },
    body: JSON.stringify({
      timezone: 'America/Sao_Paulo',
      mode: 'specificHours',
      days: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '08:00',
          closeTime: '12:00',
        },
        {
          dayOfWeek: 'MONDAY',
          openTime: '14:00',
          closeTime: '18:00',
        },
      ],
    }),
  }
);

const data = await response.json();
console.log('Success:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/hours"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "your-security-token"
}

# Specific hours
payload = {
    "timezone": "America/Sao_Paulo",
    "mode": "specificHours",
    "days": [
        {
            "dayOfWeek": "MONDAY",
            "openTime": "08:00",
            "closeTime": "12:00"
        },
        {
            "dayOfWeek": "MONDAY",
            "openTime": "14:00",
            "closeTime": "18:00"
        }
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Success: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/hours" \
  -H "Content-Type: application/json" \
  -H "Client-Token: your-security-token" \
  -d '{
    "timezone": "America/Sao_Paulo",
    "mode": "specificHours",
    "days": [
      {
        "dayOfWeek": "MONDAY",
        "openTime": "08:00",
        "closeTime": "12:00"
      },
      {
        "dayOfWeek": "MONDAY",
        "openTime": "14:00",
        "closeTime": "18:00"
      }
    ]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-----------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|--------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `timezone` was provided and if the times are in the correct format (`hh:mm`) |
| `403` | Non-Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Timezone**: Use IANA timezone format (e.g., `"America/Sao_Paulo"`, `"America/New_York"`)
- **Multiple hours**: You can define multiple periods for the same day (e.g., morning and afternoon)
- **Time format**: Use `hh:mm` 24-hour format (e.g., `"08:00"`, `"18:30"`)
- **Closed days**: Send `days` as an empty array to mark all days as closed

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Account Data](/docs/whatsapp-business/dados-conta) - View all public account information
- [Change Company Address](/docs/whatsapp-business/alterar-endereco-empresa) - Update address
- [Change Company Description](/docs/whatsapp-business/alterar-descricao-empresa) - Update description