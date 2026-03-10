---
id: varios-contatos
title: Enviar vários contatos
sidebar_position: 17
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Users" size="lg" /> Enviar vários contatos

Envie vários contatos para um destinatário usando a API do Z-API. Este método permite você enviar vários contatos, você não precisa ter eles em seus contatos, basta preencher os atributos do método com informações do contato e enviar.

![Exemplo de envio para vários contatos](/img/send-message-contacts.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/send-contacts
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

```json
{
  "phone": "5544999999999",
  "contacts": [
    {
      "name": "Nome do contato",
      "phones": ["5544999999999", "5544999999999"]
    },
    {
      "name": "Nome do contato",
      "phones": ["5544999999999"]
    },
    {
      "name": "Nome do contato",
      "businessDescription": "Uma empresa do Grupo Irrah",
      "phones": ["5544999999999"]
    }
  ]
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO. **IMPORTANTE:** Envie somente números, sem formatação ou máscara |
| `contacts` | array | Sim | Array dos contatos que serão enviados |

#### Atributos do Contato

| Campo | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `name` | string | Sim | Nome do contato |
| `phones` | array | Sim | Números dos contatos (array de strings) |
| `businessDescription` | string | Não | Breve descrição sobre o contato (opcional) |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `messageId` | string | Não | Atributo utilizado para responder uma mensagem do chat. Basta adicionar o `messageId` da mensagem que queira responder neste atributo |
| `delayMessage` | number | Não | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1\~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1\~3 sec |

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: O número do destinatário para onde você deseja enviar os contatos. Use o formato completo: DDI + DDD + Número (ex: `5544999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

- **`contacts`**: Um array de objetos de contato. Cada contato deve ter:
  - **`name`**: Nome do contato (obrigatório)
  - **`phones`**: Array de números de telefone do contato (obrigatório)
  - **`businessDescription`**: Descrição breve sobre o contato (opcional)

### Campos Opcionais

- **`messageId`**: (Opcional) ID da mensagem que você deseja responder. Use este campo se quiser enviar os contatos como resposta a uma mensagem específica.

- **`delayMessage`**: (Opcional) Tempo de espera em segundos antes de enviar a mensagem. Use um valor entre 1 e 15 segundos. Se não informado, o delay padrão é de 1~3 segundos.

### Exemplo Prático para No-Code

```json
{
  "phone": "5544999999999",
  "contacts": [
    {
      "name": "João Silva",
      "phones": ["5511999999999", "5511888888888"]
    },
    {
      "name": "Maria Santos",
      "phones": ["5511777777777"],
      "businessDescription": "Gerente de Vendas"
    }
  ],
  "delayMessage": 5
}
```

**Dicas importantes:**

- **Estrutura de contatos**: Cada contato no array `contacts` deve ter pelo menos `name` e `phones`. O campo `businessDescription` é opcional.
- **Múltiplos telefones por contato**: Um contato pode ter vários números de telefone no array `phones`.
- **Não precisa estar nos contatos**: Você não precisa ter os contatos salvos no WhatsApp para enviá-los. Basta preencher as informações no objeto.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier).

**Casos de uso comuns:**

- **Compartilhamento de contatos**: Enviar informações de contato de várias pessoas para um destinatário
- **Diretório de equipe**: Enviar lista de contatos de membros da equipe
- **Indicações**: Compartilhar contatos de profissionais ou serviços
- **Agenda de eventos**: Enviar contatos de organizadores ou participantes

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Campo | Tipo | Descrição |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | ID da mensagem no Z-API |
| `messageId` | string | ID da mensagem no WhatsApp |
| `id` | string | Adicionado para compatibilidade com Zapier. Ele tem o mesmo valor do `messageId` |

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone` e `contacts` (deve ser array com objetos válidos) |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` no header |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar contato
function validateContact(contact) {
  if (!contact || typeof contact !== 'object') {
    throw new Error('Contato deve ser um objeto');
  }
  if (!contact.name || typeof contact.name !== 'string' || contact.name.trim() === '') {
    throw new Error('Contato deve ter um nome válido');
  }
  if (!Array.isArray(contact.phones) || contact.phones.length === 0) {
    throw new Error('Contato deve ter pelo menos um telefone no array phones');
  }
  contact.phones = contact.phones.map(phone => validatePhone(phone));
  return contact;
}

// Validar array de contatos
function validateContacts(contacts) {
  if (!Array.isArray(contacts) || contacts.length === 0) {
    throw new Error('contacts deve ser um array não vazio');
  }
  return contacts.map(contact => validateContact(contact));
}

// Enviar vários contatos
async function sendMultipleContacts(phone, contacts, messageId = null, delayMessage = null) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedContacts = validateContacts(contacts);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-contacts`;
    
    const payload = {
      phone: validatedPhone,
      contacts: validatedContacts,
    };

    // Adicionar messageId se fornecido
    if (messageId) {
      payload.messageId = messageId;
    }

    // Adicionar delayMessage se fornecido
    if (delayMessage !== null && delayMessage >= 1 && delayMessage <= 15) {
      payload.delayMessage = delayMessage;
    }
    
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
    if (data.results) {
      console.log(`Mensagens enviadas para ${data.results.length} destinatários`);
      return data;
    } else {
      throw new Error('Resposta inválida da API');
    }
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar para vários contatos:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendToMultipleContacts(
  ['5511999999999', '5511888888888', '5511777777777'],
  'Olá! Esta é uma mensagem para múltiplos destinatários.'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface SendMultipleResponse {
  results: Array<{
    phone: string;
    messageId: string;
    status: string;
  }>;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar array de telefones
function validatePhones(phones: string[]): string[] {
  if (!Array.isArray(phones) || phones.length === 0) {
    throw new Error('phones deve ser um array não vazio');
  }
  if (phones.length > 100) {
    throw new Error('Máximo de 100 destinatários por requisição');
  }
  return phones.map(phone => validatePhone(phone));
}

// Validar mensagem
function validateMessage(message: string): string {
  if (!message || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Função para enviar para vários contatos
async function sendToMultipleContacts(
  phones: string[],
  message: string
): Promise<SendMultipleResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhones = validatePhones(phones);
  const validatedMessage = validateMessage(message);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-multiple`;

  const payload = {
    phones: validatedPhones,
    message: validatedMessage,
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
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendToMultipleContacts(
  ['5511999999999', '5511888888888', '5511777777777'],
  'Olá! Esta é uma mensagem para múltiplos destinatários.'
)
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_phones(phones: List[str]) -> List[str]:
    """Valida array de telefones"""
    if not isinstance(phones, list) or len(phones) == 0:
        raise ValueError('phones deve ser um array não vazio')
    if len(phones) > 100:
        raise ValueError('Máximo de 100 destinatários por requisição')
    return [validate_phone(phone) for phone in phones]

def validate_message(message: str) -> str:
    """Valida mensagem"""
    if not message or not isinstance(message, str) or not message.strip():
        raise ValueError('message é obrigatório e deve ser uma string não vazia')
    if len(message) > 4096:
        raise ValueError('message excede o limite de 4096 caracteres')
    return message.strip()

def send_to_multiple_contacts(phones: List[str], message: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phones = validate_phones(phones)
    validated_message = validate_message(message)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-multiple"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phones": validated_phones,
        "message": validated_message
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if result.get('results'):
            print(f'Mensagens enviadas para {len(result["results"])} destinatários')
            return result
        else:
            raise ValueError('Resposta inválida da API')
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_to_multiple_contacts(
    ['5511999999999', '5511888888888', '5511777777777'],
    'Olá! Esta é uma mensagem para múltiplos destinatários.'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar array de telefones
PHONES=("5511999999999" "5511888888888" "5511777777777")
if [ ${#PHONES[@]} -eq 0 ]; then
    echo "Erro: phones deve ser um array não vazio"
    exit 1
fi
if [ ${#PHONES[@]} -gt 100 ]; then
    echo "Erro: Máximo de 100 destinatários por requisição"
    exit 1
fi

# Validar cada telefone
for phone in "${PHONES[@]}"; do
    if ! [[ "$phone" =~ ^[0-9]{10,15}$ ]]; then
        echo "Erro: Telefone inválido: $phone"
        exit 1
    fi
done

# ⚠️ VALIDAÇÃO: Validar mensagem
MESSAGE="${1:-Olá! Esta é uma mensagem para múltiplos destinatários.}"
if [ -z "$MESSAGE" ] || [ "$MESSAGE" = "" ]; then
    echo "Erro: message é obrigatório e deve ser uma string não vazia"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Criar array JSON de telefones
PHONES_JSON=$(printf '"%s",' "${PHONES[@]}" | sed 's/,$//')
PHONES_JSON="[$PHONES_JSON]"

# Enviar vários contatos via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-multiple" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phones\": ${PHONES_JSON},
    \"message\": \"${MESSAGE}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONES MESSAGE PHONES_JSON
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar array de telefones
function validatePhones(phones) {
  if (!Array.isArray(phones) || phones.length === 0) {
    throw new Error('phones deve ser um array não vazio');
  }
  if (phones.length > 100) {
    throw new Error('Máximo de 100 destinatários por requisição');
  }
  return phones.map(phone => validatePhone(phone));
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Enviar vários contatos
function sendToMultipleContacts(phones, message) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhones = validatePhones(phones);
      const validatedMessage = validateMessage(message);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/send-multiple`;
    const payload = JSON.stringify({
      phones: phones,
      message: message,
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
            if (result.results) {
              console.log(`Mensagens enviadas para ${result.results.length} destinatários`);
              resolve(result);
            } else {
              reject(new Error('Resposta inválida da API'));
            }
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
sendToMultipleContacts(
  ['5511999999999', '5511888888888', '5511777777777'],
  'Olá! Esta é uma mensagem para múltiplos destinatários.'
)
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar array de telefones
function validatePhones(phones) {
  if (!Array.isArray(phones) || phones.length === 0) {
    throw new Error('phones deve ser um array não vazio');
  }
  if (phones.length > 100) {
    throw new Error('Máximo de 100 destinatários por requisição');
  }
  return phones.map(phone => validatePhone(phone));
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para enviar para vários contatos
app.post('/api/send-multiple', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phones, message } = req.body;
    const validatedPhones = validatePhones(phones);
    const validatedMessage = validateMessage(message);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-multiple`;
    
    const response = await axios.post(url, {
      phones: validatedPhones,
      message: validatedMessage,
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
    console.error('Erro ao enviar para vários contatos:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar para vários contatos',
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar array de telefones
function validatePhones(phones) {
  if (!Array.isArray(phones) || phones.length === 0) {
    throw new Error('phones deve ser um array não vazio');
  }
  if (phones.length > 100) {
    throw new Error('Máximo de 100 destinatários por requisição');
  }
  return phones.map(phone => validatePhone(phone));
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Middleware para enviar para vários contatos
app.use(async (ctx) => {
  if (ctx.path === '/api/send-multiple' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phones, message } = ctx.request.body;
      const validatedPhones = validatePhones(phones);
      const validatedMessage = validateMessage(message);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-multiple`;
      
      const response = await axios.post(url, {
        phones: validatedPhones,
        message: validatedMessage,
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
      console.error('Erro ao enviar para vários contatos:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar para vários contatos',
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
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

public class SendMultiple {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar array de telefones
    private static List<String> validatePhones(List<String> phones) {
        if (phones == null || phones.isEmpty()) {
            throw new IllegalArgumentException("phones deve ser um array não vazio");
        }
        if (phones.size() > 100) {
            throw new IllegalArgumentException("Máximo de 100 destinatários por requisição");
        }
        List<String> validated = new ArrayList<>();
        for (String phone : phones) {
            validated.add(validatePhone(phone));
        }
        return validated;
    }

    // Validar mensagem
    private static String validateMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("message é obrigatório");
        }
        if (message.length() > 4096) {
            throw new IllegalArgumentException("message excede o limite de 4096 caracteres");
        }
        return message.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            List<String> phones = new ArrayList<>();
            phones.add("5511999999999");
            phones.add("5511888888888");
            phones.add("5511777777777");
            List<String> validatedPhones = validatePhones(phones);
            String message = validateMessage("Olá! Esta é uma mensagem para múltiplos destinatários.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/send-multiple",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONArray phonesArray = new JSONArray();
            for (String phone : validatedPhones) {
                phonesArray.put(phone);
            }
            
            JSONObject payload = new JSONObject();
            payload.put("phones", phonesArray);
            payload.put("message", message);
            
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
                if (result.has("results")) {
                    JSONArray results = result.getJSONArray("results");
                    System.out.println("Mensagens enviadas para " + results.length() + " destinatários");
                    System.out.println(result.toString());
                } else {
                    System.err.println("Resposta inválida da API");
                }
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
using System.Collections.Generic;
using System.Linq;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
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

    // Validar array de telefones
    private static List<string> ValidatePhones(List<string> phones)
    {
        if (phones == null || phones.Count == 0)
        {
            throw new ArgumentException("phones deve ser um array não vazio");
        }
        if (phones.Count > 100)
        {
            throw new ArgumentException("Máximo de 100 destinatários por requisição");
        }
        return phones.Select(phone => ValidatePhone(phone)).ToList();
    }

    // Validar mensagem
    private static string ValidateMessage(string message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException("message é obrigatório");
        }
        if (message.Length > 4096)
        {
            throw new ArgumentException("message excede o limite de 4096 caracteres");
        }
        return message.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            var phones = new List<string> { "5511999999999", "5511888888888", "5511777777777" };
            var validatedPhones = ValidatePhones(phones);
            string message = ValidateMessage("Olá! Esta é uma mensagem para múltiplos destinatários.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-multiple";
            
            var payload = new
            {
                phones = validatedPhones,
                message = message
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
                    
                    if (root.TryGetProperty("results", out var results))
                    {
                        Console.WriteLine($"Mensagens enviadas para {results.GetArrayLength()} destinatários");
                        Console.WriteLine(result);
                    }
                    else
                    {
                        Console.WriteLine("Resposta inválida da API");
                    }
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
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId  = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca")
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

func validatePhones(phones []string) error {
    if len(phones) == 0 {
        return fmt.Errorf("phones deve ser um array não vazio")
    }
    if len(phones) > 100 {
        return fmt.Errorf("máximo de 100 destinatários por requisição")
    }
    for _, phone := range phones {
        if err := validatePhone(phone); err != nil {
            return err
        }
    }
    return nil
}

func validateMessage(message string) error {
    if strings.TrimSpace(message) == "" {
        return fmt.Errorf("message é obrigatório")
    }
    if len(message) > 4096 {
        return fmt.Errorf("message excede o limite de 4096 caracteres")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phones := []string{"5511999999999", "5511888888888", "5511777777777"}
    message := "Olá! Esta é uma mensagem para múltiplos destinatários."
    
    if err := validatePhones(phones); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateMessage(message); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-multiple", instanceId)
    
    payload := map[string]interface{}{
        "phones": phones,
        "message": message,
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
        
        var result map[string]interface{}
        if err := json.Unmarshal(body, &result); err != nil {
            fmt.Printf("Erro ao parsear JSON: %v\n", err)
            return
        }
        
        if results, ok := result["results"].([]interface{}); ok {
            fmt.Printf("Mensagens enviadas para %d destinatários\n", len(results))
            fmt.Println(string(body))
        } else {
            fmt.Println("Resposta inválida da API")
        }
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
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar array de telefones
function validatePhones($phones) {
    if (!is_array($phones) || count($phones) === 0) {
        throw new Exception('phones deve ser um array não vazio');
    }
    if (count($phones) > 100) {
        throw new Exception('Máximo de 100 destinatários por requisição');
    }
    return array_map('validatePhone', $phones);
}

// Validar mensagem
function validateMessage($message) {
    if (empty($message) || !is_string($message) || trim($message) === '') {
        throw new Exception('message é obrigatório');
    }
    if (strlen($message) > 4096) {
        throw new Exception('message excede o limite de 4096 caracteres');
    }
    return trim($message);
}

try {
    // ⚠️ VALIDAÇÃO
    $phones = validatePhones(['5511999999999', '5511888888888', '5511777777777']);
    $message = validateMessage('Olá! Esta é uma mensagem para múltiplos destinatários.');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/send-multiple',
        urlencode($instanceId)
    );

    $payload = [
        'phones' => $phones,
        'message' => $message,
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
        if ($result && isset($result['results'])) {
            echo "Mensagens enviadas para " . count($result['results']) . " destinatários\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Resposta inválida da API\n";
        }
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
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar array de telefones
def validate_phones(phones)
  raise 'phones deve ser um array não vazio' if phones.nil? || phones.empty?
  raise 'Máximo de 100 destinatários por requisição' if phones.length > 100
  phones.map { |phone| validate_phone(phone) }
end

# Validar mensagem
def validate_message(message)
  raise 'message é obrigatório' if message.nil? || message.to_s.strip.empty?
  if message.length > 4096
    raise 'message excede o limite de 4096 caracteres'
  end
  message.to_s.strip
end

begin
  # ⚠️ VALIDAÇÃO
  phones = validate_phones(['5511999999999', '5511888888888', '5511777777777'])
  message = validate_message('Olá! Esta é uma mensagem para múltiplos destinatários.')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/send-multiple")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phones: phones,
    message: message
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['results']
      puts "Mensagens enviadas para #{result['results'].length} destinatários"
      puts result.to_json
    else
      puts "Resposta inválida da API"
    end
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

// Validar array de telefones
func validatePhones(_ phones: [String]) throws -> [String] {
    if phones.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "phones deve ser um array não vazio"])
    }
    if phones.count > 100 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Máximo de 100 destinatários por requisição"])
    }
    return try phones.map { try validatePhone($0) }
}

// Validar mensagem
func validateMessage(_ message: String) throws -> String {
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "message é obrigatório"])
    }
    if message.count > 4096 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "message excede o limite de 4096 caracteres"])
    }
    return trimmed
}

do {
    // ⚠️ VALIDAÇÃO
    let phones = try validatePhones(["5511999999999", "5511888888888", "5511777777777"])
    let message = try validateMessage("Olá! Esta é uma mensagem para múltiplos destinatários.")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/send-multiple"
    
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
        "phones": phones,
        "message": message
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
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                       let results = result["results"] as? [[String: Any]] {
                        print("Mensagens enviadas para \(results.count) destinatários")
                        print(result)
                    } else {
                        print("Resposta inválida da API")
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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar array de telefones
function Validate-Phones {
    param([string[]]$Phones)
    if ($Phones.Count -eq 0) {
        throw "phones deve ser um array não vazio"
    }
    if ($Phones.Count -gt 100) {
        throw "Máximo de 100 destinatários por requisição"
    }
    foreach ($phone in $Phones) {
        Validate-Phone $phone | Out-Null
    }
    return $Phones
}

# Validar mensagem
function Validate-Message {
    param([string]$Message)
    if ([string]::IsNullOrWhiteSpace($Message)) {
        throw "message é obrigatório"
    }
    if ($Message.Length -gt 4096) {
        throw "message excede o limite de 4096 caracteres"
    }
    return $Message.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $phones = Validate-Phones @("5511999999999", "5511888888888", "5511777777777")
    $message = Validate-Message "Olá! Esta é uma mensagem para múltiplos destinatários."

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-multiple"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phones = $phones
        message = $message
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    if ($response.results) {
        Write-Host "Mensagens enviadas para $($response.results.Count) destinatários"
        $response | ConvertTo-Json -Depth 10
    } else {
        Write-Host "Resposta inválida da API"
    }
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/send-multiple HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phones": [
    "5511999999999",
    "5511888888888",
    "5511777777777"
  ],
  "message": "Olá! Esta é uma mensagem para múltiplos destinatários."
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <vector>
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
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    std::vector<std::string> phones = {"5511999999999", "5511888888888", "5511777777777"};
    std::string message = "Olá! Esta é uma mensagem para múltiplos destinatários.";
    
    // ⚠️ VALIDAÇÃO
    if (phones.empty()) {
        std::cerr << "Erro: phones deve ser um array não vazio" << std::endl;
        return 1;
    }
    if (phones.size() > 100) {
        std::cerr << "Erro: Máximo de 100 destinatários por requisição" << std::endl;
        return 1;
    }
    for (const auto& phone : phones) {
        if (!validatePhone(phone)) {
            std::cerr << "Erro: Telefone inválido: " << phone << std::endl;
            return 1;
        }
    }
    if (message.empty()) {
        std::cerr << "Erro: message é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-multiple";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{\"phones\":[";
    for (size_t i = 0; i < phones.size(); ++i) {
        if (i > 0) payloadStream << ",";
        payloadStream << "\"" << phones[i] << "\"";
    }
    payloadStream << "],\"message\":\"" << message << "\"}";
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
                std::cout << "Mensagens enviadas com sucesso" << std::endl;
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
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    char* phones[] = {"5511999999999", "5511888888888", "5511777777777"};
    int phoneCount = 3;
    char* message = "Olá! Esta é uma mensagem para múltiplos destinatários.";
    
    // ⚠️ VALIDAÇÃO
    if (phoneCount == 0) {
        fprintf(stderr, "Erro: phones deve ser um array não vazio\n");
        return 1;
    }
    if (phoneCount > 100) {
        fprintf(stderr, "Erro: Máximo de 100 destinatários por requisição\n");
        return 1;
    }
    for (int i = 0; i < phoneCount; i++) {
        if (!validatePhone(phones[i])) {
            fprintf(stderr, "Erro: Telefone inválido: %s\n", phones[i]);
            return 1;
        }
    }
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: message é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-multiple", instanceId);
    
    // Criar payload JSON
    char payload[2048];
    strcpy(payload, "{\"phones\":[");
    for (int i = 0; i < phoneCount; i++) {
        if (i > 0) strcat(payload, ",");
        char phoneJson[64];
        snprintf(phoneJson, sizeof(phoneJson), "\"%s\"", phones[i]);
        strcat(payload, phoneJson);
    }
    char messageJson[1024];
    snprintf(messageJson, sizeof(messageJson), "],\"message\":\"%s\"}", message);
    strcat(payload, messageJson);
    
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
                printf("Mensagens enviadas com sucesso\n");
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

## <Icon name="AlertTriangle" size="md" /> Limitações e boas práticas {#limitacoes-e-boas-praticas}

- **Máximo de destinatários**: Recomendado até 100 destinatários por requisição para melhor performance
- **Rate limiting**: Respeite os limites de taxa da API para evitar bloqueios
- **Validação**: Valide números antes de enviar para melhorar a taxa de entrega
- **Personalização**: Considere usar mensagens personalizadas para cada destinatário quando possível

:::warning Importante

Não use este endpoint para SPAM ou envio de mensagens indesejadas. Respeite os termos de serviço do WhatsApp e use a API de forma responsável.

:::

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- Todos os números devem estar no formato internacional (DDI + DDD + número)
- A mensagem é enviada para todos os destinatários simultaneamente
- Cada envio gera um `messageId` único para rastreamento individual
- Use este endpoint para campanhas legítimas e com consentimento dos destinatários
- Para melhor performance, agrupe envios em lotes de até 100 destinatários

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar texto simples](/docs/messages/texto-simples) - Envie mensagens individuais
- [Reencaminhar mensagem](/docs/messages/reencaminhar) - Reencaminhe mensagens recebidas
- [Validar números](/docs/contacts/numero-whatsapp) - Valide números antes de enviar
