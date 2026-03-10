---
id: evento
title: Enviar Evento
sidebar_position: 35
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Calendar" size="lg" /> Enviar Evento

Envie eventos para grupos no WhatsApp. Eventos permitem criar convites para reuniões, encontros ou qualquer tipo de atividade com data, hora e localização.

---

:::important Importante

Este método está disponível **apenas para grupos**. Não é possível enviar eventos para contatos individuais.

:::

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Reuniões de Trabalho**: Criar eventos para reuniões de equipe
- **Encontros Sociais**: Organizar encontros e eventos sociais
- **Webinars**: Criar eventos para webinars e palestras
- **Chamadas de Voz/Video**: Criar eventos com links de chamada integrados

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: ID do grupo para onde você deseja enviar o evento. **IMPORTANTE**: Use o formato `{groupId}-group` (ex: `120363019502650977-group`). Este método está disponível **apenas para grupos**, não é possível enviar eventos para contatos individuais.

- **`event`**: Um objeto contendo todas as informações do evento. Dentro deste objeto, você precisa configurar:

  - **`name`**: Nome do evento (obrigatório). Ex: `"Reunião de Equipe"`, `"Webinar de Marketing"`, `"Encontro Social"`
  - **`dateTime`**: Data e hora do evento (obrigatório). Use o formato ISO 8601 (ex: `2024-04-29T09:30:53.309Z`). **Dica**: Certifique-se de que a data está no futuro.
  - **`canceled`**: Define se o evento está cancelado (obrigatório). Use `true` para cancelar ou `false` para criar um evento ativo.

### Campos Opcionais

- **`description`**: Descrição detalhada do evento (opcional). Use este campo para fornecer mais informações sobre o evento, como agenda, materiais necessários, etc.

- **`timeZone`**: Fuso horário UTC do evento (opcional). Use o formato `UTC±N` (ex: `UTC-3` para horário de Brasília, `UTC+0` para Londres). Se não especificado, o WhatsApp usará o fuso horário do dispositivo.

- **`location`**: Localização do evento (opcional). Um objeto contendo:
  - **`name`**: Nome do lugar (obrigatório se `location` for fornecido). Ex: `"Sala de Reuniões 1"`, `"Auditório Principal"`, `"Online via Zoom"`

- **`callLinkType`**: Tipo de chamada integrada (opcional). Use `"voice"` para chamadas de voz ou `"video"` para chamadas de vídeo. Quando especificado, o WhatsApp criará automaticamente um link de chamada no evento.

### Exemplo Prático para No-Code

**Exemplo básico (evento simples):**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Reunião de Equipe",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": false
  }
}
```

**Exemplo completo (com todos os campos opcionais):**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Webinar de Marketing Digital",
    "description": "Aprenda estratégias avançadas de marketing digital",
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

**Exemplo com evento cancelado:**

```json
{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Reunião Cancelada",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "canceled": true
  }
}
```

**Dicas importantes:**

- **Apenas grupos**: Eventos só podem ser enviados para grupos, não para contatos individuais. Use o ID do grupo no formato `{groupId}-group`.
- **Formato de data**: Use formato ISO 8601 para `dateTime` (ex: `2024-04-29T09:30:53.309Z`). Certifique-se de que a data está no futuro.
- **Fuso horário**: Se você especificar `timeZone`, o WhatsApp ajustará a hora do evento para o fuso horário especificado. Se não especificar, usará o fuso horário do dispositivo do usuário.
- **Localização**: A localização é opcional, mas ajuda os participantes a encontrar o evento. Use um nome descritivo (ex: `"Sala de Reuniões 1"`, `"Auditório Principal"`, `"Online via Zoom"`).
- **Chamadas integradas**: Use `callLinkType: "voice"` para chamadas de voz ou `"video"` para chamadas de vídeo. Quando especificado, o WhatsApp criará automaticamente um link de chamada no evento.
- **Cancelamento**: Defina `canceled: true` para marcar um evento como cancelado. Isso notificará os participantes sobre o cancelamento.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). Use o `messageId` para rastrear o status do evento e para editar o evento posteriormente usando [Editar Evento](/docs/messages/editar-evento).

**Casos de uso comuns:**

- **Reuniões de Trabalho**: Criar eventos para reuniões de equipe com data, hora e localização
- **Encontros Sociais**: Organizar encontros e eventos sociais com detalhes completos
- **Webinars**: Criar eventos para webinars e palestras com links de chamada integrados
- **Chamadas de Voz/Video**: Criar eventos com links de chamada integrados (`callLinkType`)
- **Cancelamentos**: Marcar eventos como cancelados quando necessário

**Próximos passos:**

Após criar um evento, você pode:

- [Editar Evento](/docs/messages/editar-evento) - Editar um evento existente usando o `messageId`
- [Responder Evento](/docs/messages/responder-evento) - Responder a um evento (aceitar/recusar)
- Configurar webhooks para receber notificações quando participantes responderem ao evento

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-event
```

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Neste método você poderá enviar mensagens do tipo Evento. Só é possível enviar esse tipo para um grupo.

![Exemplo de evento](/img/SendingEvent.jpeg)

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | ID do grupo no formato `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `event` | object | Dados do evento (veja estrutura abaixo) |

### Estrutura do Objeto `event`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `name` | string | Sim | Nome do evento |
| `dateTime` | string | Sim | Data e hora do evento no formato ISO 8601 (ex: `2024-04-29T09:30:53.309Z`) |
| `canceled` | boolean | Sim | Define se o evento está cancelado (`true` ou `false`) |
| `description` | string | Não | Descrição do evento |
| `timeZone` | string | Não | Fuso horário UTC do evento (ex: `UTC-3`) |
| `location` | object | Não | Localização do evento (veja estrutura abaixo) |
| `callLinkType` | string | Não | Tipo de chamada: `voice` ou `video` |

### Estrutura do Objeto `location`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `name` | string | Sim | Nome do lugar |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

### Evento Simples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo (formato: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T09:30:53.309Z)');
  }
  return dateTime;
}

// Validar timeZone
function validateTimeZone(timeZone) {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('timeZone inválido. Use formato UTC±N (ex: UTC-3)');
  }
  return timeZone;
}

// Validar callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('callLinkType inválido. Use: voice ou video');
  }
  return callLinkType;
}

// Enviar evento simples
async function sendEvent(phone, event) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('O objeto event deve conter name e dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedTimeZone = event.timeZone ? validateTimeZone(event.timeZone) : undefined;
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
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
    
    // Remover campos undefined
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
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Evento enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar evento:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendEvent('120363019502650977-group', {
  name: 'Reunião de Equipe',
  description: 'Reunião mensal para alinhamento',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Sala de Reuniões 1',
  },
  canceled: false,
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

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

// Validar ID do grupo
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601');
  }
  return dateTime;
}

// Validar timeZone
function validateTimeZone(timeZone?: string): string | undefined {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('timeZone inválido. Use formato UTC±N');
  }
  return timeZone;
}

// Função para enviar evento
async function sendEvent(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('O objeto event deve conter name e dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedTimeZone = validateTimeZone(event.timeZone);
  const validatedCallLinkType = event.callLinkType;

  // ⚠️ SEGURANÇA: Sempre use HTTPS
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

  // Remover campos undefined
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
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendEvent('120363019502650977-group', {
  name: 'Reunião de Equipe',
  description: 'Reunião mensal para alinhamento',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Sala de Reuniões 1',
  },
  canceled: false,
})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional
from datetime import datetime

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_group_id(group_id: str) -> str:
    """Valida ID do grupo (formato: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('ID do grupo inválido. Use o formato: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Valida data ISO 8601"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T09:30:53.309Z)')

def validate_time_zone(time_zone: Optional[str]) -> Optional[str]:
    """Valida timeZone"""
    if time_zone and not re.match(r'^UTC[+-]\d+$', time_zone):
        raise ValueError('timeZone inválido. Use formato UTC±N (ex: UTC-3)')
    return time_zone

def send_event(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('O objeto event deve conter name e dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_time_zone = validate_time_zone(event.get('timeZone'))
    
    # URL do endpoint (sempre HTTPS)
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
    
    # Remover campos None
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Evento enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_event('120363019502650977-group', {
    'name': 'Reunião de Equipe',
    'description': 'Reunião mensal para alinhamento',
    'dateTime': '2024-04-29T09:30:53.309Z',
    'timeZone': 'UTC-3',
    'location': {
        'name': 'Sala de Reuniões 1'
    },
    'canceled': False
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar ID do grupo (formato: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Erro: ID do grupo inválido. Use o formato: {groupId}-group"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar evento simples via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Reunião de Equipe\",
      \"description\": \"Reunião mensal para alinhamento\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"timeZone\": \"UTC-3\",
      \"location\": {
        \"name\": \"Sala de Reuniões 1\"
      },
      \"canceled\": false
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Enviar evento simples
function sendEvent(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('O objeto event deve conter name e dateTime');
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
            console.log('Evento enviado com sucesso');
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
sendEvent('120363019502650977-group', {
  name: 'Reunião de Equipe',
  description: 'Reunião mensal para alinhamento',
  dateTime: '2024-04-29T09:30:53.309Z',
  timeZone: 'UTC-3',
  location: {
    name: 'Sala de Reuniões 1',
  },
  canceled: false,
})
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Rota para enviar evento
app.post('/api/send-event', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'O objeto event deve conter name e dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
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
    console.error('Erro ao enviar evento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar evento',
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Middleware para enviar evento
app.use(async (ctx) => {
  if (ctx.path === '/api/send-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O objeto event deve conter name e dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
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
      console.error('Erro ao enviar evento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar evento',
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

public class SendEvent {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar ID do grupo
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Sala de Reuniões 1");
            
            JSONObject event = new JSONObject();
            event.put("name", "Reunião de Equipe");
            event.put("description", "Reunião mensal para alinhamento");
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
                
                System.out.println("Evento enviado com sucesso");
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

    // Validar ID do grupo
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Reunião de Equipe",
                    description = "Reunião mensal para alinhamento",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    timeZone = "UTC-3",
                    location = new { name = "Sala de Reuniões 1" },
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
                    Console.WriteLine("Evento enviado com sucesso");
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

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("ID do grupo inválido. Use o formato: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name": "Reunião de Equipe",
            "description": "Reunião mensal para alinhamento",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "timeZone": "UTC-3",
            "location": map[string]interface{}{
                "name": "Sala de Reuniões 1",
            },
            "canceled": false,
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
        
        fmt.Println("Evento enviado com sucesso")
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

// Validar ID do grupo
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('ID do grupo inválido. Use o formato: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Reunião de Equipe',
            'description' => 'Reunião mensal para alinhamento',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'timeZone' => 'UTC-3',
            'location' => [
                'name' => 'Sala de Reuniões 1',
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
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Evento enviado com sucesso\n";
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

# Validar ID do grupo
def validate_group_id(group_id)
  raise 'ID do grupo inválido. Use o formato: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Reunião de Equipe',
      description: 'Reunião mensal para alinhamento',
      dateTime: '2024-04-29T09:30:53.309Z',
      timeZone: 'UTC-3',
      location: {
        name: 'Sala de Reuniões 1'
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
    puts 'Evento enviado com sucesso'
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

// Validar ID do grupo
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "ID do grupo inválido. Use o formato: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Reunião de Equipe",
            "description": "Reunião mensal para alinhamento",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "timeZone": "UTC-3",
            "location": [
                "name": "Sala de Reuniões 1"
            ],
            "canceled": false
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
                        print("Evento enviado com sucesso")
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

# Validar ID do grupo
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "ID do grupo inválido. Use o formato: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Reunião de Equipe"
            description = "Reunião mensal para alinhamento"
            dateTime = "2024-04-29T09:30:53.309Z"
            timeZone = "UTC-3"
            location = @{
                name = "Sala de Reuniões 1"
            }
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Evento enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Reunião de Equipe",
    "description": "Reunião mensal para alinhamento",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "timeZone": "UTC-3",
    "location": {
      "name": "Sala de Reuniões 1"
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Erro: ID do grupo inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Reunião de Equipe\","
                  << "\"description\":\"Reunião mensal para alinhamento\","
                  << "\"dateTime\":\"2024-04-29T09:30:53.309Z\","
                  << "\"timeZone\":\"UTC-3\","
                  << "\"location\":{\"name\":\"Sala de Reuniões 1\"},"
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
                std::cout << "Evento enviado com sucesso" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Erro: ID do grupo inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Reunião de Equipe\",\"description\":\"Reunião mensal para alinhamento\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"timeZone\":\"UTC-3\",\"location\":{\"name\":\"Sala de Reuniões 1\"},\"canceled\":false}}",
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
                printf("Evento enviado com sucesso\n");
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

### Evento com Chamada de Voz

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo (formato: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T14:00:00.000Z)');
  }
  return dateTime;
}

// Validar timeZone
function validateTimeZone(timeZone) {
  if (timeZone && !/^UTC[+-]\d+$/.test(timeZone)) {
    throw new Error('timeZone inválido. Use formato UTC±N (ex: UTC-3)');
  }
  return timeZone;
}

// Validar callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('callLinkType inválido. Use: voice ou video');
  }
  return callLinkType;
}

// Enviar evento com chamada de voz
async function sendEventWithCall(phone, event) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('O objeto event deve conter name e dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedTimeZone = event.timeZone ? validateTimeZone(event.timeZone) : undefined;
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
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
    
    // Remover campos undefined
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
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Evento com chamada enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar evento:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendEventWithCall('120363019502650977-group', {
  name: 'Webinar de Marketing',
  description: 'Webinar sobre estratégias de marketing digital',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces (mesmas do exemplo anterior)
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

// Validar ID do grupo
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601');
  }
  return dateTime;
}

// Validar callLinkType
function validateCallLinkType(callLinkType?: string): 'voice' | 'video' | undefined {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('callLinkType inválido. Use: voice ou video');
  }
  return callLinkType as 'voice' | 'video' | undefined;
}

// Função para enviar evento com chamada
async function sendEventWithCall(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('O objeto event deve conter name e dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedCallLinkType = validateCallLinkType(event.callLinkType);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
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

  // Remover campos undefined
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
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendEventWithCall('120363019502650977-group', {
  name: 'Webinar de Marketing',
  description: 'Webinar sobre estratégias de marketing digital',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional
from datetime import datetime

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_group_id(group_id: str) -> str:
    """Valida ID do grupo (formato: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('ID do grupo inválido. Use o formato: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Valida data ISO 8601"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T14:00:00.000Z)')

def validate_call_link_type(call_link_type: Optional[str]) -> Optional[str]:
    """Valida callLinkType"""
    if call_link_type and call_link_type not in ['voice', 'video']:
        raise ValueError('callLinkType inválido. Use: voice ou video')
    return call_link_type

def send_event_with_call(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('O objeto event deve conter name e dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_call_link_type = validate_call_link_type(event.get('callLinkType'))
    
    # URL do endpoint (sempre HTTPS)
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
    
    # Remover campos None
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Evento com chamada enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_event_with_call('120363019502650977-group', {
    'name': 'Webinar de Marketing',
    'description': 'Webinar sobre estratégias de marketing digital',
    'dateTime': '2024-04-29T14:00:00.000Z',
    'timeZone': 'UTC-3',
    'callLinkType': 'voice',
    'canceled': False
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar ID do grupo (formato: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Erro: ID do grupo inválido. Use o formato: {groupId}-group"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar evento com chamada de voz via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Webinar de Marketing\",
      \"description\": \"Webinar sobre estratégias de marketing digital\",
      \"dateTime\": \"2024-04-29T14:00:00.000Z\",
      \"timeZone\": \"UTC-3\",
      \"callLinkType\": \"voice\",
      \"canceled\": false
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Enviar evento com chamada
function sendEventWithCall(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('O objeto event deve conter name e dateTime');
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
            console.log('Evento com chamada enviado com sucesso');
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
sendEventWithCall('120363019502650977-group', {
  name: 'Webinar de Marketing',
  description: 'Webinar sobre estratégias de marketing digital',
  dateTime: '2024-04-29T14:00:00.000Z',
  timeZone: 'UTC-3',
  callLinkType: 'voice',
  canceled: false,
})
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Rota para enviar evento com chamada
app.post('/api/send-event-with-call', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'O objeto event deve conter name e dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
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
    console.error('Erro ao enviar evento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar evento',
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Middleware para enviar evento com chamada
app.use(async (ctx) => {
  if (ctx.path === '/api/send-event-with-call' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O objeto event deve conter name e dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
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
      console.error('Erro ao enviar evento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar evento',
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

public class SendEventWithCall {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar ID do grupo
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject event = new JSONObject();
            event.put("name", "Webinar de Marketing");
            event.put("description", "Webinar sobre estratégias de marketing digital");
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
                
                System.out.println("Evento com chamada enviado com sucesso");
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

    // Validar ID do grupo
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Webinar de Marketing",
                    description = "Webinar sobre estratégias de marketing digital",
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
                    Console.WriteLine("Evento com chamada enviado com sucesso");
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

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("ID do grupo inválido. Use o formato: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name": "Webinar de Marketing",
            "description": "Webinar sobre estratégias de marketing digital",
            "dateTime": "2024-04-29T14:00:00.000Z",
            "timeZone": "UTC-3",
            "callLinkType": "voice",
            "canceled": false,
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
        
        fmt.Println("Evento com chamada enviado com sucesso")
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

// Validar ID do grupo
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('ID do grupo inválido. Use o formato: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Webinar de Marketing',
            'description' => 'Webinar sobre estratégias de marketing digital',
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
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Evento com chamada enviado com sucesso\n";
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

# Validar ID do grupo
def validate_group_id(group_id)
  raise 'ID do grupo inválido. Use o formato: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Webinar de Marketing',
      description: 'Webinar sobre estratégias de marketing digital',
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
    puts 'Evento com chamada enviado com sucesso'
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

// Validar ID do grupo
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "ID do grupo inválido. Use o formato: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Webinar de Marketing",
            "description": "Webinar sobre estratégias de marketing digital",
            "dateTime": "2024-04-29T14:00:00.000Z",
            "timeZone": "UTC-3",
            "callLinkType": "voice",
            "canceled": false
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
                        print("Evento com chamada enviado com sucesso")
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

# Validar ID do grupo
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "ID do grupo inválido. Use o formato: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Webinar de Marketing"
            description = "Webinar sobre estratégias de marketing digital"
            dateTime = "2024-04-29T14:00:00.000Z"
            timeZone = "UTC-3"
            callLinkType = "voice"
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Evento com chamada enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Webinar de Marketing",
    "description": "Webinar sobre estratégias de marketing digital",
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Erro: ID do grupo inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Webinar de Marketing\","
                  << "\"description\":\"Webinar sobre estratégias de marketing digital\","
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
                std::cout << "Evento com chamada enviado com sucesso" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Erro: ID do grupo inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Webinar de Marketing\",\"description\":\"Webinar sobre estratégias de marketing digital\",\"dateTime\":\"2024-04-29T14:00:00.000Z\",\"timeZone\":\"UTC-3\",\"callLinkType\":\"voice\",\"canceled\":false}}",
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
                printf("Evento com chamada enviado com sucesso\n");
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

### Evento Cancelado

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo (formato: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T09:30:53.309Z)');
  }
  return dateTime;
}

// Enviar evento cancelado
async function sendCanceledEvent(phone, event) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      throw new Error('O objeto event deve conter name e dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const payload = {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Evento cancelado
        description: event.description ? event.description.trim() : undefined,
      },
    };
    
    // Remover campos undefined
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
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Evento cancelado enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar evento:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendCanceledEvent('120363019502650977-group', {
  name: 'Evento Cancelado',
  description: 'Este evento foi cancelado',
  dateTime: '2024-04-29T09:30:53.309Z',
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces (mesmas do exemplo anterior)
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

// Validar ID do grupo
function validateGroupId(groupId: string): string {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use formato ISO 8601');
  }
  return dateTime;
}

// Função para enviar evento cancelado
async function sendCanceledEvent(
  phone: string,
  event: Event
): Promise<EventResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedGroupId = validateGroupId(phone);
  if (!event.name || !event.dateTime) {
    throw new Error('O objeto event deve conter name e dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;

  const payload: any = {
    phone: validatedGroupId,
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: true, // Evento cancelado
      description: event.description?.trim(),
    },
  };

  // Remover campos undefined
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
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendCanceledEvent('120363019502650977-group', {
  name: 'Evento Cancelado',
  description: 'Este evento foi cancelado',
  dateTime: '2024-04-29T09:30:53.309Z',
})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional
from datetime import datetime

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_group_id(group_id: str) -> str:
    """Valida ID do grupo (formato: {groupId}-group)"""
    if not re.match(r'^\d+-group$', group_id):
        raise ValueError('ID do grupo inválido. Use o formato: {groupId}-group')
    return group_id

def validate_datetime(date_time: str) -> str:
    """Valida data ISO 8601"""
    try:
        datetime.fromisoformat(date_time.replace('Z', '+00:00'))
        return date_time
    except ValueError:
        raise ValueError('Data inválida. Use formato ISO 8601 (ex: 2024-04-29T09:30:53.309Z)')

def send_canceled_event(phone: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_group_id = validate_group_id(phone)
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('O objeto event deve conter name e dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    
    # URL do endpoint (sempre HTTPS)
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
            "canceled": True,  # Evento cancelado
            "description": event.get("description", "").strip() if event.get("description") else None,
        }
    }
    
    # Remover campos None
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Evento cancelado enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_canceled_event('120363019502650977-group', {
    'name': 'Evento Cancelado',
    'description': 'Este evento foi cancelado',
    'dateTime': '2024-04-29T09:30:53.309Z',
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar ID do grupo (formato: {groupId}-group)
GROUP_ID="${1:-120363019502650977-group}"
if ! [[ "$GROUP_ID" =~ ^[0-9]+-group$ ]]; then
    echo "Erro: ID do grupo inválido. Use o formato: {groupId}-group"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar evento cancelado via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"event\": {
      \"name\": \"Evento Cancelado\",
      \"description\": \"Este evento foi cancelado\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"canceled\": true
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Enviar evento cancelado
function sendCanceledEvent(phone, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        throw new Error('O objeto event deve conter name e dateTime');
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
        canceled: true, // Evento cancelado
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
            console.log('Evento cancelado enviado com sucesso');
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
sendCanceledEvent('120363019502650977-group', {
  name: 'Evento Cancelado',
  description: 'Este evento foi cancelado',
  dateTime: '2024-04-29T09:30:53.309Z',
})
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Rota para enviar evento cancelado
app.post('/api/send-canceled-event', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'O objeto event deve conter name e dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Evento cancelado
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
    console.error('Erro ao enviar evento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar evento',
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

// Validar ID do grupo
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido');
  }
  return groupId;
}

// Validar data ISO 8601
function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return dateTime;
}

// Middleware para enviar evento cancelado
app.use(async (ctx) => {
  if (ctx.path === '/api/send-canceled-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!event || !event.name || !event.dateTime) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O objeto event deve conter name e dateTime',
        };
        return;
      }
      const validatedDateTime = validateDateTime(event.dateTime);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: true, // Evento cancelado
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
      console.error('Erro ao enviar evento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar evento',
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

public class SendCanceledEvent {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar ID do grupo
    private static String validateGroupId(String groupId) {
        if (!groupId.matches("^\\d+-group$")) {
            throw new IllegalArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject event = new JSONObject();
            event.put("name", "Evento Cancelado");
            event.put("description", "Este evento foi cancelado");
            event.put("dateTime", "2024-04-29T09:30:53.309Z");
            event.put("canceled", true); // Evento cancelado
            
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
                
                System.out.println("Evento cancelado enviado com sucesso");
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

    // Validar ID do grupo
    private static string ValidateGroupId(string groupId)
    {
        if (!Regex.IsMatch(groupId, @"^\d+-group$"))
        {
            throw new ArgumentException("ID do grupo inválido. Use o formato: {groupId}-group");
        }
        return groupId;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidateGroupId("120363019502650977-group");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-event";
            
            var payload = new
            {
                phone = phone,
                event = new
                {
                    name = "Evento Cancelado",
                    description = "Este evento foi cancelado",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    canceled = true // Evento cancelado
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
                    Console.WriteLine("Evento cancelado enviado com sucesso");
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

func validateGroupId(groupId string) error {
    matched, _ := regexp.MatchString(`^\d+-group$`, groupId)
    if !matched {
        return fmt.Errorf("ID do grupo inválido. Use o formato: {groupId}-group")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "120363019502650977-group"
    if err := validateGroupId(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "event": map[string]interface{}{
            "name": "Evento Cancelado",
            "description": "Este evento foi cancelado",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "canceled": true, // Evento cancelado
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
        
        fmt.Println("Evento cancelado enviado com sucesso")
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

// Validar ID do grupo
function validateGroupId($groupId) {
    if (!preg_match('/^\d+-group$/', $groupId)) {
        throw new Exception('ID do grupo inválido. Use o formato: {groupId}-group');
    }
    return $groupId;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validateGroupId('120363019502650977-group');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'event' => [
            'name' => 'Evento Cancelado',
            'description' => 'Este evento foi cancelado',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'canceled' => true, // Evento cancelado
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
        echo "Evento cancelado enviado com sucesso\n";
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

# Validar ID do grupo
def validate_group_id(group_id)
  raise 'ID do grupo inválido. Use o formato: {groupId}-group' unless group_id.match?(/^\d+-group$/)
  group_id
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_group_id('120363019502650977-group')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    event: {
      name: 'Evento Cancelado',
      description: 'Este evento foi cancelado',
      dateTime: '2024-04-29T09:30:53.309Z',
      canceled: true # Evento cancelado
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Evento cancelado enviado com sucesso'
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

// Validar ID do grupo
func validateGroupId(_ groupId: String) throws -> String {
    let groupIdRegex = "^\\d+-group$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", groupIdRegex)
    if !predicate.evaluate(with: groupId) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "ID do grupo inválido. Use o formato: {groupId}-group"])
    }
    return groupId
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validateGroupId("120363019502650977-group")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-event"
    
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
        "event": [
            "name": "Evento Cancelado",
            "description": "Este evento foi cancelado",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "canceled": true // Evento cancelado
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
                        print("Evento cancelado enviado com sucesso")
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

# Validar ID do grupo
function Validate-GroupId {
    param([string]$GroupId)
    if ($GroupId -notmatch '^\d+-group$') {
        throw "ID do grupo inválido. Use o formato: {groupId}-group"
    }
    return $GroupId
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-GroupId "120363019502650977-group"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        event = @{
            name = "Evento Cancelado"
            description = "Este evento foi cancelado"
            dateTime = "2024-04-29T09:30:53.309Z"
            canceled = $true # Evento cancelado
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Evento cancelado enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977-group",
  "event": {
    "name": "Evento Cancelado",
    "description": "Este evento foi cancelado",
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

bool validateGroupId(const std::string& groupId) {
    std::regex groupIdRegex("^\\d+-group$");
    return std::regex_match(groupId, groupIdRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        std::cerr << "Erro: ID do grupo inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-event";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"event\":{"
                  << "\"name\":\"Evento Cancelado\","
                  << "\"description\":\"Este evento foi cancelado\","
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
                std::cout << "Evento cancelado enviado com sucesso" << std::endl;
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

int validateGroupId(const char* groupId) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]+-group$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, groupId, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "120363019502650977-group";
    if (!validateGroupId(phone)) {
        fprintf(stderr, "Erro: ID do grupo inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"event\":{\"name\":\"Evento Cancelado\",\"description\":\"Este evento foi cancelado\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"canceled\":true}}",
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
                printf("Evento cancelado enviado com sucesso\n");
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

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status do evento, editar o evento posteriormente usando [Editar Evento](/docs/messages/editar-evento), ou responder ao evento usando [Responder Evento](/docs/messages/responder-evento) |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear e gerenciar o evento
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega e Respostas:**

Para saber quando o evento foi entregue, quando participantes responderam (aceitaram/recusaram), ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique se todos os atributos obrigatórios foram enviados (`phone`, `event.name`, `event.dateTime`, `event.canceled`), se o `phone` está no formato correto (`{groupId}-group`), se a data está no formato ISO 8601, e se `canceled` é um boolean |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` nos headers da requisição |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

[Webhook ao receber mensagem](/docs/webhooks/ao-receber) - Receba notificações quando participantes responderem ao evento

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Apenas Grupos**: Eventos só podem ser enviados para grupos, não para contatos individuais
- **Formato de Data**: Use formato ISO 8601 para `dateTime` (ex: `2024-04-29T09:30:53.309Z`)
- **Chamadas**: Use `callLinkType: "voice"` para chamadas de voz ou `"video"` para vídeo
- **Cancelamento**: Defina `canceled: true` para marcar um evento como cancelado
- **Localização**: A localização é opcional, mas ajuda os participantes a encontrar o evento

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Editar Evento](/docs/messages/editar-evento) - Saiba como editar um evento existente
- [Grupos](/docs/groups/introducao) - Entenda como trabalhar com grupos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber respostas de eventos
