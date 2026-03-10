---
id: editar-evento
title: Editar Evento
sidebar_position: 36
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Editar Evento

Edite um evento existente em um grupo. Use este método para atualizar informações como nome, data, hora, localização ou status de cancelamento de um evento já criado.

---

:::tip Importante

Para editar o evento, é necessário reenviar **todos os dados** que já estão configurados no evento, mesmo que eles não possuam alteração. Caso esses dados não sejam enviados, eles podem acabar sendo removidos do evento.

:::

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Atualizar Data/Hora**: Mudar a data ou hora de um evento
- **Alterar Localização**: Atualizar o local do evento
- **Modificar Descrição**: Atualizar a descrição do evento
- **Cancelar Evento**: Marcar um evento como cancelado

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: ID do grupo onde o evento foi criado. **IMPORTANTE**: Use o formato `{groupId}-group` (ex: `120363019502650977-group`). Este método está disponível **apenas para grupos**, não é possível editar eventos de contatos individuais.

- **`eventMessageId`**: ID da mensagem original do evento que você deseja editar. **IMPORTANTE**: Este é o `messageId` retornado quando você criou o evento usando [Enviar Evento](/docs/messages/evento). Guarde este ID quando criar o evento para poder editá-lo depois.

- **`event`**: Um objeto contendo **TODOS** os dados do evento, mesmo os que não mudaram. **ATENÇÃO CRÍTICA**: Se você não reenviar todos os dados que já estavam configurados no evento, eles podem ser removidos. Dentro deste objeto, você precisa configurar:

  - **`name`**: Nome do evento (obrigatório). Mesmo que não mude, reenvie o nome atual.
  - **`dateTime`**: Data e hora do evento (obrigatório). Use o formato ISO 8601 (ex: `2024-04-29T09:30:53.309Z`). Mesmo que não mude, reenvie a data atual.
  - **`canceled`**: Define se o evento está cancelado (obrigatório). Use `true` para cancelar ou `false` para manter ativo. Mesmo que não mude, reenvie o status atual.

### Campos Opcionais (mas reenvie se já existiam)

- **`description`**: Descrição do evento (opcional). **IMPORTANTE**: Se o evento original tinha descrição, você DEVE reenviá-la aqui, mesmo que não mude. Caso contrário, ela será removida.

- **`location`**: Localização do evento (opcional). Um objeto contendo:
  - **`name`**: Nome do lugar (obrigatório se `location` for fornecido). **IMPORTANTE**: Se o evento original tinha localização, você DEVE reenviá-la aqui, mesmo que não mude. Caso contrário, ela será removida.

- **`callLinkType`**: Tipo de chamada integrada (opcional). Use `"voice"` para chamadas de voz ou `"video"` para chamadas de vídeo. **IMPORTANTE**: Se o evento original tinha `callLinkType`, você DEVE reenviá-lo aqui, mesmo que não mude. Caso contrário, ele será removido.

### Exemplo Prático para No-Code

**Exemplo: Editar apenas o nome do evento (mantendo tudo igual):**

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

**Exemplo: Mudar apenas a data (mantendo tudo igual):**

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

**Exemplo: Cancelar evento (mantendo todos os dados):**

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

**Dicas importantes:**

- **Reenvie todos os dados**: Sempre reenvie todos os campos do evento, mesmo os que não mudaram. Se você não reenviar um campo que existia no evento original, ele será removido.
- **Obter eventMessageId**: O `eventMessageId` é o `messageId` retornado quando você criou o evento. Guarde este ID quando criar o evento para poder editá-lo depois. Você também pode obtê-lo através dos webhooks quando o evento é criado.
- **Formato de data**: Mantenha o formato ISO 8601 para `dateTime` (ex: `2024-04-29T09:30:53.309Z`). Mesmo que não mude, reenvie a data atual.
- **Campos opcionais**: Se o evento original tinha campos opcionais (como `description`, `location`, `callLinkType`), você DEVE reenviá-los aqui, mesmo que não mudem. Caso contrário, eles serão removidos.
- **Cancelamento**: Defina `canceled: true` para cancelar o evento. Lembre-se de reenviar todos os outros dados também.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). O `messageId` retornado é o mesmo do evento original (não muda ao editar).

**Casos de uso comuns:**

- **Atualizar Data/Hora**: Mudar a data ou hora de um evento (reenviando todos os outros dados)
- **Alterar Localização**: Atualizar o local do evento (reenviando todos os outros dados)
- **Modificar Descrição**: Atualizar a descrição do evento (reenviando todos os outros dados)
- **Cancelar Evento**: Marcar um evento como cancelado (reenviando todos os outros dados)
- **Renomear Evento**: Mudar o nome do evento (reenviando todos os outros dados)

**Fluxo recomendado:**

1. Crie o evento usando [Enviar Evento](/docs/messages/evento) e guarde o `messageId` retornado
2. Quando precisar editar, use este `messageId` como `eventMessageId`
3. Reenvie todos os dados do evento, alterando apenas o que precisa mudar
4. Monitore os webhooks para confirmar que a edição foi aplicada

**Próximos passos:**

- [Enviar Evento](/docs/messages/evento) - Saiba como criar um evento
- [Responder Evento](/docs/messages/responder-evento) - Saiba como responder a um evento (aceitar/recusar)
- [Grupos](/docs/groups/introducao) - Entenda como trabalhar com grupos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-edit-event
```

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Neste método você poderá enviar mensagens de edição de Evento.

![Exemplo de edição de evento](/img/SendingEditEvent.jpeg)

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | ID do grupo no formato `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `eventMessageId` | string | ID da mensagem original do evento que será editado |
| `event` | object | Dados completos do evento (veja estrutura abaixo) |

### Estrutura do Objeto `event`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `name` | string | Sim | Nome do evento |
| `dateTime` | string | Sim | Data e hora do evento no formato ISO 8601 |
| `canceled` | boolean | Sim | Define se o evento está cancelado |
| `description` | string | Não | Descrição do evento (reenvie mesmo se não mudou) |
| `location` | object | Não | Localização do evento (reenvie mesmo se não mudou) |
| `callLinkType` | string | Não | Tipo de chamada: `voice` ou `video` (reenvie mesmo se não mudou) |
| `canceled` | boolean | Sim | Define se o evento está cancelado |

### Estrutura do Objeto `location`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `name` | string | Sim | Nome do lugar |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

### Editar Nome e Data do Evento

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
    throw new Error('Data inválida. Use formato ISO 8601 (ex: 2024-04-30T10:00:00.000Z)');
  }
  return dateTime;
}

// Validar callLinkType
function validateCallLinkType(callLinkType) {
  if (callLinkType && !['voice', 'video'].includes(callLinkType)) {
    throw new Error('callLinkType inválido. Use: voice ou video');
  }
  return callLinkType;
}

// Editar evento
async function editEvent(phone, eventMessageId, event) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      throw new Error('eventMessageId é obrigatório');
    }
    if (!event || !event.name || !event.dateTime) {
      throw new Error('O objeto event deve conter name e dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);
    const validatedCallLinkType = event.callLinkType ? validateCallLinkType(event.callLinkType) : undefined;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
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
    
    // Remover campos undefined
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
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Evento editado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao editar evento:', error.message);
    throw error;
  }
}

// Exemplo de uso
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Novo nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Nome do lugar',
  },
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

// Função para editar evento
async function editEvent(
  phone: string,
  eventMessageId: string,
  event: Event
): Promise<EditEventResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedGroupId = validateGroupId(phone);
  if (!eventMessageId || eventMessageId.trim() === '') {
    throw new Error('eventMessageId é obrigatório');
  }
  if (!event.name || !event.dateTime) {
    throw new Error('O objeto event deve conter name e dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);
  const validatedCallLinkType = validateCallLinkType(event.callLinkType);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
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
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Novo nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Nome do lugar',
  },
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
        raise ValueError('Data inválida. Use formato ISO 8601 (ex: 2024-04-30T10:00:00.000Z)')

def validate_call_link_type(call_link_type: Optional[str]) -> Optional[str]:
    """Valida callLinkType"""
    if call_link_type and call_link_type not in ['voice', 'video']:
        raise ValueError('callLinkType inválido. Use: voice ou video')
    return call_link_type

def edit_event(phone: str, event_message_id: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_group_id = validate_group_id(phone)
    if not event_message_id or not isinstance(event_message_id, str) or not event_message_id.strip():
        raise ValueError('eventMessageId é obrigatório')
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('O objeto event deve conter name e dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    validated_call_link_type = validate_call_link_type(event.get('callLinkType'))
    
    # URL do endpoint (sempre HTTPS)
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
    
    # Remover campos None
    payload["event"] = {k: v for k, v in payload["event"].items() if v is not None}
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Evento editado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
edit_event('120363019502650977-group', '3EB058359730B7C2895C55', {
    'name': 'Novo nome do evento',
    'description': 'Descrição do evento',
    'dateTime': '2024-04-30T10:00:00.000Z',
    'location': {
        'name': 'Nome do lugar'
    },
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
# Editar evento via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-edit-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"eventMessageId\": \"3EB058359730B7C2895C55\",
    \"event\": {
      \"name\": \"Novo nome do evento\",
      \"description\": \"Descrição do evento\",
      \"dateTime\": \"2024-04-30T10:00:00.000Z\",
      \"location\": {
        \"name\": \"Nome do lugar\"
      },
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

// Editar evento
function editEvent(phone, eventMessageId, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        throw new Error('eventMessageId é obrigatório');
      }
      if (!event || !event.name || !event.dateTime) {
        throw new Error('O objeto event deve conter name e dateTime');
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
            console.log('Evento editado com sucesso');
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
editEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Novo nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-30T10:00:00.000Z',
  location: {
    name: 'Nome do lugar',
  },
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

// Rota para editar evento
app.post('/api/edit-event', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, eventMessageId, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'eventMessageId é obrigatório',
      });
    }
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'O objeto event deve conter name e dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
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
    console.error('Erro ao editar evento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao editar evento',
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

// Middleware para editar evento
app.use(async (ctx) => {
  if (ctx.path === '/api/edit-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, eventMessageId, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'eventMessageId é obrigatório',
        };
        return;
      }
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
      console.error('Erro ao editar evento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao editar evento',
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

public class EditEvent {
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
                "https://api.z-api.io/instances/%s/token/%s/send-edit-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Nome do lugar");
            
            JSONObject event = new JSONObject();
            event.put("name", "Novo nome do evento");
            event.put("description", "Descrição do evento");
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
                
                System.out.println("Evento editado com sucesso");
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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-edit-event";
            
            var payload = new
            {
                phone = phone,
                eventMessageId = "3EB058359730B7C2895C55",
                event = new
                {
                    name = "Novo nome do evento",
                    description = "Descrição do evento",
                    dateTime = "2024-04-30T10:00:00.000Z",
                    location = new { name = "Nome do lugar" },
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
                    Console.WriteLine("Evento editado com sucesso");
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": map[string]interface{}{
            "name": "Novo nome do evento",
            "description": "Descrição do evento",
            "dateTime": "2024-04-30T10:00:00.000Z",
            "location": map[string]interface{}{
                "name": "Nome do lugar",
            },
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
        
        fmt.Println("Evento editado com sucesso")
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
        'https://api.z-api.io/instances/%s/token/%s/send-edit-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'eventMessageId' => '3EB058359730B7C2895C55',
        'event' => [
            'name' => 'Novo nome do evento',
            'description' => 'Descrição do evento',
            'dateTime' => '2024-04-30T10:00:00.000Z',
            'location' => [
                'name' => 'Nome do lugar',
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
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Evento editado com sucesso\n";
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
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-edit-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    eventMessageId: '3EB058359730B7C2895C55',
    event: {
      name: 'Novo nome do evento',
      description: 'Descrição do evento',
      dateTime: '2024-04-30T10:00:00.000Z',
      location: {
        name: 'Nome do lugar'
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
    puts 'Evento editado com sucesso'
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
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-edit-event"
    
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
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": [
            "name": "Novo nome do evento",
            "description": "Descrição do evento",
            "dateTime": "2024-04-30T10:00:00.000Z",
            "location": [
                "name": "Nome do lugar"
            ],
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
                        print("Evento editado com sucesso")
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
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-edit-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        eventMessageId = "3EB058359730B7C2895C55"
        event = @{
            name = "Novo nome do evento"
            description = "Descrição do evento"
            dateTime = "2024-04-30T10:00:00.000Z"
            location = @{
                name = "Nome do lugar"
            }
            callLinkType = "voice"
            canceled = $false
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Evento editado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-edit-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977-group",
  "eventMessageId": "3EB058359730B7C2895C55",
  "event": {
    "name": "Novo nome do evento",
    "description": "Descrição do evento",
    "dateTime": "2024-04-30T10:00:00.000Z",
    "location": {
      "name": "Nome do lugar"
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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-edit-event";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"eventMessageId\":\"3EB058359730B7C2895C55\","
                  << "\"event\":{"
                  << "\"name\":\"Novo nome do evento\","
                  << "\"description\":\"Descrição do evento\","
                  << "\"dateTime\":\"2024-04-30T10:00:00.000Z\","
                  << "\"location\":{\"name\":\"Nome do lugar\"},"
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
                std::cout << "Evento editado com sucesso" << std::endl;
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"eventMessageId\":\"3EB058359730B7C2895C55\",\"event\":{\"name\":\"Novo nome do evento\",\"description\":\"Descrição do evento\",\"dateTime\":\"2024-04-30T10:00:00.000Z\",\"location\":{\"name\":\"Nome do lugar\"},\"callLinkType\":\"voice\",\"canceled\":false}}",
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
                printf("Evento editado com sucesso\n");
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

### Cancelar Evento

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

// Cancelar evento
async function cancelEvent(phone, eventMessageId, event) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      throw new Error('eventMessageId é obrigatório');
    }
    if (!event || !event.name || !event.dateTime) {
      throw new Error('O objeto event deve conter name e dateTime');
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const payload = {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Cancelar evento
        description: event.description ? event.description.trim() : undefined,
        location: event.location && event.location.name ? {
          name: event.location.name.trim(),
        } : undefined,
        callLinkType: event.callLinkType,
      },
    };
    
    // Remover campos undefined
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
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Evento cancelado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao cancelar evento:', error.message);
    throw error;
  }
}

// Exemplo de uso
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Nome do lugar',
  },
  callLinkType: 'voice',
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
  location?: EventLocation;
  callLinkType?: 'voice' | 'video';
}

interface EditEventResponse {
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

// Função para cancelar evento
async function cancelEvent(
  phone: string,
  eventMessageId: string,
  event: Event
): Promise<EditEventResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedGroupId = validateGroupId(phone);
  if (!eventMessageId || eventMessageId.trim() === '') {
    throw new Error('eventMessageId é obrigatório');
  }
  if (!event.name || !event.dateTime) {
    throw new Error('O objeto event deve conter name e dateTime');
  }
  const validatedDateTime = validateDateTime(event.dateTime);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;

  const payload: any = {
    phone: validatedGroupId,
    eventMessageId: eventMessageId.trim(),
    event: {
      name: event.name.trim(),
      dateTime: validatedDateTime,
      canceled: true, // Cancelar evento
      description: event.description?.trim(),
      location: event.location ? { name: event.location.name.trim() } : undefined,
      callLinkType: event.callLinkType,
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
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Nome do lugar',
  },
  callLinkType: 'voice',
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

def cancel_event(phone: str, event_message_id: str, event: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_group_id = validate_group_id(phone)
    if not event_message_id or not isinstance(event_message_id, str) or not event_message_id.strip():
        raise ValueError('eventMessageId é obrigatório')
    if not event or 'name' not in event or 'dateTime' not in event:
        raise ValueError('O objeto event deve conter name e dateTime')
    validated_datetime = validate_datetime(event['dateTime'])
    
    # URL do endpoint (sempre HTTPS)
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
            "canceled": True,  # Cancelar evento
            "description": event.get("description", "").strip() if event.get("description") else None,
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
        print('Evento cancelado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
cancel_event('120363019502650977-group', '3EB058359730B7C2895C55', {
    'name': 'Nome do evento',
    'description': 'Descrição do evento',
    'dateTime': '2024-04-29T09:30:53.309Z',
    'location': {
        'name': 'Nome do lugar'
    },
    'callLinkType': 'voice'
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
# Cancelar evento via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-edit-event" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"eventMessageId\": \"3EB058359730B7C2895C55\",
    \"event\": {
      \"name\": \"Nome do evento\",
      \"description\": \"Descrição do evento\",
      \"dateTime\": \"2024-04-29T09:30:53.309Z\",
      \"location\": {
        \"name\": \"Nome do lugar\"
      },
      \"callLinkType\": \"voice\",
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

// Cancelar evento
function cancelEvent(phone, eventMessageId, event) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        throw new Error('eventMessageId é obrigatório');
      }
      if (!event || !event.name || !event.dateTime) {
        throw new Error('O objeto event deve conter name e dateTime');
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
        canceled: true, // Cancelar evento
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
            console.log('Evento cancelado com sucesso');
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
cancelEvent('120363019502650977-group', '3EB058359730B7C2895C55', {
  name: 'Nome do evento',
  description: 'Descrição do evento',
  dateTime: '2024-04-29T09:30:53.309Z',
  location: {
    name: 'Nome do lugar',
  },
  callLinkType: 'voice',
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

// Rota para cancelar evento
app.post('/api/cancel-event', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, eventMessageId, event } = req.body;
    
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'eventMessageId é obrigatório',
      });
    }
    if (!event || !event.name || !event.dateTime) {
      return res.status(400).json({
        success: false,
        error: 'O objeto event deve conter name e dateTime',
      });
    }
    const validatedDateTime = validateDateTime(event.dateTime);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
    
    const response = await axios.post(url, {
      phone: validatedGroupId,
      eventMessageId: eventMessageId.trim(),
      event: {
        name: event.name.trim(),
        dateTime: validatedDateTime,
        canceled: true, // Cancelar evento
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
    console.error('Erro ao cancelar evento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao cancelar evento',
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

// Middleware para cancelar evento
app.use(async (ctx) => {
  if (ctx.path === '/api/cancel-event' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, eventMessageId, event } = ctx.request.body;
      
      const validatedGroupId = validateGroupId(phone);
      if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'eventMessageId é obrigatório',
        };
        return;
      }
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
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-edit-event`;
      
      const response = await axios.post(url, {
        phone: validatedGroupId,
        eventMessageId: eventMessageId.trim(),
        event: {
          name: event.name.trim(),
          dateTime: validatedDateTime,
          canceled: true, // Cancelar evento
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
      console.error('Erro ao cancelar evento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao cancelar evento',
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

public class CancelEvent {
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
                "https://api.z-api.io/instances/%s/token/%s/send-edit-event",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject location = new JSONObject();
            location.put("name", "Nome do lugar");
            
            JSONObject event = new JSONObject();
            event.put("name", "Nome do evento");
            event.put("description", "Descrição do evento");
            event.put("dateTime", "2024-04-29T09:30:53.309Z");
            event.put("location", location);
            event.put("callLinkType", "voice");
            event.put("canceled", true); // Cancelar evento
            
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
                
                System.out.println("Evento cancelado com sucesso");
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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-edit-event";
            
            var payload = new
            {
                phone = phone,
                eventMessageId = "3EB058359730B7C2895C55",
                event = new
                {
                    name = "Nome do evento",
                    description = "Descrição do evento",
                    dateTime = "2024-04-29T09:30:53.309Z",
                    location = new { name = "Nome do lugar" },
                    callLinkType = "voice",
                    canceled = true // Cancelar evento
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
                    Console.WriteLine("Evento cancelado com sucesso");
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": map[string]interface{}{
            "name": "Nome do evento",
            "description": "Descrição do evento",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "location": map[string]interface{}{
                "name": "Nome do lugar",
            },
            "callLinkType": "voice",
            "canceled": true, // Cancelar evento
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
        
        fmt.Println("Evento cancelado com sucesso")
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
        'https://api.z-api.io/instances/%s/token/%s/send-edit-event',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'eventMessageId' => '3EB058359730B7C2895C55',
        'event' => [
            'name' => 'Nome do evento',
            'description' => 'Descrição do evento',
            'dateTime' => '2024-04-29T09:30:53.309Z',
            'location' => [
                'name' => 'Nome do lugar',
            ],
            'callLinkType' => 'voice',
            'canceled' => true, // Cancelar evento
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
        echo "Evento cancelado com sucesso\n";
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
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-edit-event")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    eventMessageId: '3EB058359730B7C2895C55',
    event: {
      name: 'Nome do evento',
      description: 'Descrição do evento',
      dateTime: '2024-04-29T09:30:53.309Z',
      location: {
        name: 'Nome do lugar'
      },
      callLinkType: 'voice',
      canceled: true # Cancelar evento
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Evento cancelado com sucesso'
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
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-edit-event"
    
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
        "eventMessageId": "3EB058359730B7C2895C55",
        "event": [
            "name": "Nome do evento",
            "description": "Descrição do evento",
            "dateTime": "2024-04-29T09:30:53.309Z",
            "location": [
                "name": "Nome do lugar"
            ],
            "callLinkType": "voice",
            "canceled": true // Cancelar evento
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
                        print("Evento cancelado com sucesso")
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
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-edit-event"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        eventMessageId = "3EB058359730B7C2895C55"
        event = @{
            name = "Nome do evento"
            description = "Descrição do evento"
            dateTime = "2024-04-29T09:30:53.309Z"
            location = @{
                name = "Nome do lugar"
            }
            callLinkType = "voice"
            canceled = $true # Cancelar evento
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Evento cancelado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-edit-event HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977-group",
  "eventMessageId": "3EB058359730B7C2895C55",
  "event": {
    "name": "Nome do evento",
    "description": "Descrição do evento",
    "dateTime": "2024-04-29T09:30:53.309Z",
    "location": {
      "name": "Nome do lugar"
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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-edit-event";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"eventMessageId\":\"3EB058359730B7C2895C55\","
                  << "\"event\":{"
                  << "\"name\":\"Nome do evento\","
                  << "\"description\":\"Descrição do evento\","
                  << "\"dateTime\":\"2024-04-29T09:30:53.309Z\","
                  << "\"location\":{\"name\":\"Nome do lugar\"},"
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
                std::cout << "Evento cancelado com sucesso" << std::endl;
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-edit-event", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"eventMessageId\":\"3EB058359730B7C2895C55\",\"event\":{\"name\":\"Nome do evento\",\"description\":\"Descrição do evento\",\"dateTime\":\"2024-04-29T09:30:53.309Z\",\"location\":{\"name\":\"Nome do lugar\"},\"callLinkType\":\"voice\",\"canceled\":true}}",
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
                printf("Evento cancelado com sucesso\n");
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
| `messageId` | string | ID único da mensagem no WhatsApp. **IMPORTANTE**: Este é o mesmo `messageId` do evento original (não muda ao editar). Use este ID para editar o evento novamente no futuro |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` retornado é o **mesmo** do evento original (não muda ao editar). Use este ID para editar o evento novamente no futuro.
- O `zaapId` é usado internamente pelo Z-API para processamento.
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier).

**Rastreamento de Edição:**

Para saber quando a edição foi aplicada ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique se todos os atributos obrigatórios foram enviados (`phone`, `eventMessageId`, `event.name`, `event.dateTime`, `event.canceled`), se o `phone` está no formato correto (`{groupId}-group`), se o `eventMessageId` é válido, e se a data está no formato ISO 8601 |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 404 | Evento não encontrado | Verifique se o `eventMessageId` existe e é válido |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` nos headers da requisição |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

[Webhook ao receber mensagem](/docs/webhooks/ao-receber) - Receba notificações quando participantes responderem ao evento editado

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Reenvie Todos os Dados**: Sempre reenvie todos os campos do evento, mesmo os que não mudaram
- **ID do Evento**: Use o `messageId` do evento original para `eventMessageId`
- **Formato de Data**: Mantenha o formato ISO 8601 para `dateTime`
- **Cancelamento**: Defina `canceled: true` para cancelar o evento

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Enviar Evento](/docs/messages/evento) - Saiba como criar um evento
- [Grupos](/docs/groups/introducao) - Entenda como trabalhar com grupos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber respostas
