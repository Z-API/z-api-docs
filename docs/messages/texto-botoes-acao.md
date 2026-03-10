---
id: texto-botoes-acao
title: Texto com Botões de Ação
sidebar_position: 18
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MousePointerClick" size="lg" /> Texto com Botões de Ação

Envie mensagens de texto com botões de ação interativos. Os botões podem redirecionar para links, fazer chamadas ou enviar respostas padrão.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite enviar mensagens de texto acompanhadas de botões de ação. Os botões podem ser de três tipos:

- **CALL**: Inicia uma chamada para um número específico
- **URL**: Redireciona para um link externo
- **REPLY**: Envia uma resposta padrão que pode ser capturada via webhook

:::caution Atenção
Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).
:::

:::tip Observação
Atualmente, ao enviar os três tipos de botões simultaneamente, o WhatsApp Web gera um erro, o que também ocorre ao utilizar a própria API da Meta. Uma alternativa é enviar apenas os botões do tipo CALL e URL juntos, e sempre enviar o botão do tipo REPLY separadamente.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO. Ex: `551199999999`. **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `message` | string | Texto a ser enviado |
| `buttonActions` | array | Array de objetos do tipo `buttonActions` |

### buttonActions

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `type` | string | Tipo de botão: `CALL`, `URL` ou `REPLY` |
| `phone` | string | Número atribuído ao botão caso seja do tipo `CALL` |
| `url` | string | Link atribuído ao botão caso seja do tipo `URL` |
| `label` | string | Texto exibido no botão |

### Opcionais (buttonActions)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | string | Identificador único do botão |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `delayMessage` | number | Delay em segundos (1-15) antes de enviar a próxima mensagem. Default: 1-3 segundos |
| `title` | string | Título opcional da mensagem |
| `footer` | string | Rodapé opcional da mensagem |

:::tip Dica
O WhatsApp possui um link específico para copiar textos. Passando esse link no atributo `url`, o botão passa a ser um botão de copiar: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=seucodigo`
:::

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: O número do destinatário para onde você deseja enviar a mensagem com botões de ação. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara. Para grupos, use o ID do grupo.

- **`message`**: O texto que será exibido junto com os botões. Este campo é obrigatório e não pode estar vazio.

- **`buttonActions`**: Uma lista (array) de botões de ação. Você pode enviar de 1 a 3 botões. Cada botão precisa ter:

  - **`type`**: O tipo do botão (obrigatório). Pode ser:
    - `CALL`: Inicia uma chamada para um número específico
    - `URL`: Redireciona para um link externo
    - `REPLY`: Envia uma resposta padrão que pode ser capturada via webhook
  - **`label`**: O texto que aparecerá no botão (obrigatório)
  - **`id`**: Um identificador único para o botão (opcional, mas recomendado)
  - **`phone`**: Número atribuído ao botão caso seja do tipo `CALL` (obrigatório para tipo CALL)
  - **`url`**: Link atribuído ao botão caso seja do tipo `URL` (obrigatório para tipo URL)

### Campos Opcionais

- **`delayMessage`**: Se você vai enviar várias mensagens seguidas, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

- **`title`**: Título opcional da mensagem (aparece acima do texto principal).

- **`footer`**: Rodapé opcional da mensagem (aparece abaixo do texto principal).

### Exemplo Prático para No-Code

**Exemplo com botões CALL e URL:**

```json
{
  "phone": "5511999999999",
  "message": "Entre em contato conosco:",
  "buttonActions": [
    {
      "id": "call",
      "type": "CALL",
      "label": "Ligar",
      "phone": "5511999999999"
    },
    {
      "id": "website",
      "type": "URL",
      "label": "Visitar Site",
      "url": "https://exemplo.com"
    }
  ]
}
```

**Exemplo com botão REPLY:**

```json
{
  "phone": "5511999999999",
  "message": "Escolha uma opção:",
  "buttonActions": [
    {
      "id": "sim",
      "type": "REPLY",
      "label": "Sim, quero"
    }
  ]
}
```

**Exemplo com botão de copiar código:**

```json
{
  "phone": "5511999999999",
  "message": "Seu código de verificação:",
  "buttonActions": [
    {
      "id": "copy",
      "type": "URL",
      "label": "Copiar Código",
      "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=123456"
    }
  ]
}
```

**Dicas importantes:**

- **Tipos de botão**: Existem três tipos: `CALL` (chamada), `URL` (link), e `REPLY` (resposta). Cada tipo tem requisitos específicos.
- **Limitação importante**: Não envie os três tipos simultaneamente. O WhatsApp Web gera um erro. Use `CALL` + `URL` juntos, ou `REPLY` separadamente.
- **Botão CALL**: Requer o campo `phone` com o número para chamar (formato: DDI + DDD + Número, apenas números).
- **Botão URL**: Requer o campo `url` com o link completo (ex: `https://exemplo.com`).
- **Botão REPLY**: Não requer campos adicionais além de `type` e `label`. A resposta será capturada via webhook quando o usuário clicar.
- **Botão de copiar**: Use o link especial do WhatsApp no atributo `url` para criar um botão de copiar código: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=seucodigo`
- **Número de botões**: Você pode enviar de 1 a 3 botões. Mais de 3 botões não são suportados.
- **ID do botão**: Use IDs descritivos (ex: `"call"`, `"website"`, `"sim"`) para facilitar a identificação no webhook quando o usuário clicar.
- **Title e Footer**: Use `title` e `footer` para adicionar contexto visual à mensagem (opcional).
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). Use o `messageId` para rastrear o status da mensagem através dos webhooks.

**Casos de uso comuns:**

- **Atendimento**: Enviar botões "Ligar" e "Falar com Atendente" para facilitar contato
- **Promoções**: Enviar botão "Ver Oferta" (URL) para redirecionar para página de promoção
- **Confirmações**: Enviar botões "Sim" e "Não" (REPLY) para confirmações rápidas
- **Códigos de verificação**: Enviar botão de copiar código para facilitar uso
- **Agendamentos**: Enviar botão "Agendar" (URL) para redirecionar para calendário
- **Suporte**: Enviar botões "Abrir Chamado" (URL) e "Falar com Suporte" (CALL)

**Importante sobre botões:**

:::caution Atenção

Envios de botões atualmente se encontram disponíveis, porém possuem alguns fatores decisivos para o funcionamento. Para mais detalhes, acesse o tópico [Funcionamento dos Botões](/docs/tips/funcionamento-botoes).

:::

:::tip Observação

Atualmente, ao enviar os três tipos de botões simultaneamente, o WhatsApp Web gera um erro, o que também ocorre ao utilizar a própria API da Meta. Uma alternativa é enviar apenas os botões do tipo CALL e URL juntos, e sempre enviar o botão do tipo REPLY separadamente.

:::

**Recebendo respostas:**

Quando o usuário clicar em um botão do tipo `REPLY`, você receberá um webhook com a resposta. O webhook incluirá o `id` do botão clicado, permitindo que você identifique qual opção o usuário escolheu. Para botões do tipo `URL` e `CALL`, o WhatsApp redireciona o usuário diretamente (sem webhook). Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão).

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

### Exemplo 1: Botões CALL e URL {#exemplo-call-url}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar botões de ação
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('Deve haver entre 1 e 3 botões de ação');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Cada botão deve ter id, type e label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('Botões do tipo CALL devem ter um telefone');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('Botões do tipo URL devem ter uma URL');
    }
    if (button.type !== 'CALL' && button.type !== 'URL') {
      throw new Error('Tipo de botão inválido. Use CALL ou URL');
    }
  }
  return buttonActions;
}

// Enviar texto com botões de ação
async function sendButtonActions(phone, message, buttonActions, title, footer) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedButtonActions = validateButtonActions(buttonActions);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: validatedButtonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();
    
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
    console.log('Texto com botões de ação enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar texto com botões de ação:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendButtonActions(
  '551199999999',
  'Entre em contato conosco',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Fale conosco',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visite nosso site',
    },
  ],
  'Suporte',
  'Estamos aqui para ajudar'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface ButtonActionsResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

interface ButtonAction {
  id: string;
  type: 'CALL' | 'URL';
  phone?: string;
  url?: string;
  label: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar botões de ação
function validateButtonActions(buttonActions: ButtonAction[]): ButtonAction[] {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('Deve haver entre 1 e 3 botões de ação');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Cada botão deve ter id, type e label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('Botões do tipo CALL devem ter um telefone');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('Botões do tipo URL devem ter uma URL');
    }
  }
  return buttonActions;
}

// Função para enviar texto com botões de ação
async function sendButtonActions(
  phone: string,
  message: string,
  buttonActions: ButtonAction[],
  title?: string,
  footer?: string
): Promise<ButtonActionsResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedButtonActions = validateButtonActions(buttonActions);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;

  const payload: any = {
    phone: validatedPhone,
    message: message.trim(),
    buttonActions: validatedButtonActions.map(btn => ({
      id: btn.id,
      type: btn.type,
      phone: btn.type === 'CALL' ? validatePhone(btn.phone!) : undefined,
      url: btn.type === 'URL' ? btn.url : undefined,
      label: btn.label.trim(),
    })),
  };
  
  if (title) payload.title = title.trim();
  if (footer) payload.footer = footer.trim();

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
sendButtonActions(
  '551199999999',
  'Entre em contato conosco',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Fale conosco',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visite nosso site',
    },
  ],
  'Suporte',
  'Estamos aqui para ajudar'
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
from typing import Dict, Any, List, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_button_actions(button_actions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida botões de ação (1-3 botões)"""
    if not isinstance(button_actions, list) or len(button_actions) == 0 or len(button_actions) > 3:
        raise ValueError('Deve haver entre 1 e 3 botões de ação')
    for button in button_actions:
        if not button.get('id') or not button.get('type') or not button.get('label'):
            raise ValueError('Cada botão deve ter id, type e label')
        if button['type'] == 'CALL' and not button.get('phone'):
            raise ValueError('Botões do tipo CALL devem ter um telefone')
        if button['type'] == 'URL' and not button.get('url'):
            raise ValueError('Botões do tipo URL devem ter uma URL')
        if button['type'] not in ['CALL', 'URL']:
            raise ValueError('Tipo de botão inválido. Use CALL ou URL')
    return button_actions

def send_button_actions(
    phone: str,
    message: str,
    button_actions: List[Dict[str, Any]],
    title: Optional[str] = None,
    footer: Optional[str] = None
) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_button_actions = validate_button_actions(button_actions)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-actions"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "buttonActions": [
            {
                "id": btn["id"],
                "type": btn["type"],
                "phone": validate_phone(btn["phone"]) if btn["type"] == "CALL" else None,
                "url": btn.get("url") if btn["type"] == "URL" else None,
                "label": btn["label"].strip(),
            }
            for btn in validated_button_actions
        ]
    }
    
    if title:
        payload["title"] = title.strip()
    if footer:
        payload["footer"] = footer.strip()
    
    # Remover campos None do payload
    payload["buttonActions"] = [
        {k: v for k, v in btn.items() if v is not None}
        for btn in payload["buttonActions"]
    ]
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Texto com botões de ação enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_button_actions(
    '551199999999',
    'Entre em contato conosco',
    [
        {
            'id': '1',
            'type': 'CALL',
            'phone': '554498398733',
            'label': 'Fale conosco'
        },
        {
            'id': '2',
            'type': 'URL',
            'url': 'https://z-api.io',
            'label': 'Visite nosso site'
        }
    ],
    title='Suporte',
    footer='Estamos aqui para ajudar'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-551199999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar texto com botões de ação via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-actions" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Entre em contato conosco\",
    \"title\": \"Suporte\",
    \"footer\": \"Estamos aqui para ajudar\",
    \"buttonActions\": [
      {
        \"id\": \"1\",
        \"type\": \"CALL\",
        \"phone\": \"554498398733\",
        \"label\": \"Fale conosco\"
      },
      {
        \"id\": \"2\",
        \"type\": \"URL\",
        \"url\": \"https://z-api.io\",
        \"label\": \"Visite nosso site\"
      }
    ]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar botões de ação
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('Deve haver entre 1 e 3 botões de ação');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Cada botão deve ter id, type e label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('Botões do tipo CALL devem ter um telefone');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('Botões do tipo URL devem ter uma URL');
    }
  }
  return buttonActions;
}

// Enviar texto com botões de ação
function sendButtonActions(phone, message, buttonActions, title, footer) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      const validatedButtonActions = validateButtonActions(buttonActions);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      title: title ? title.trim() : undefined,
      footer: footer ? footer.trim() : undefined,
      buttonActions: buttonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? btn.phone : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
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
            console.log('Texto com botões de ação enviado com sucesso');
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
sendButtonActions(
  '551199999999',
  'Entre em contato conosco',
  [
    {
      id: '1',
      type: 'CALL',
      phone: '554498398733',
      label: 'Fale conosco',
    },
    {
      id: '2',
      type: 'URL',
      url: 'https://z-api.io',
      label: 'Visite nosso site',
    },
  ],
  'Suporte',
  'Estamos aqui para ajudar'
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar botões de ação
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('Deve haver entre 1 e 3 botões de ação');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Cada botão deve ter id, type e label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('Botões do tipo CALL devem ter um telefone');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('Botões do tipo URL devem ter uma URL');
    }
  }
  return buttonActions;
}

// Rota para enviar texto com botões de ação
app.post('/api/send-button-actions', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, buttonActions, title, footer } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    const validatedButtonActions = validateButtonActions(buttonActions);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: validatedButtonActions.map(btn => ({
        id: btn.id,
        type: btn.type,
        phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
        url: btn.type === 'URL' ? btn.url : undefined,
        label: btn.label.trim(),
      })),
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();

    const response = await axios.post(url, payload, {
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
    console.error('Erro ao enviar texto com botões de ação:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar texto com botões de ação',
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

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar botões de ação
function validateButtonActions(buttonActions) {
  if (!Array.isArray(buttonActions) || buttonActions.length === 0 || buttonActions.length > 3) {
    throw new Error('Deve haver entre 1 e 3 botões de ação');
  }
  for (const button of buttonActions) {
    if (!button.id || !button.type || !button.label) {
      throw new Error('Cada botão deve ter id, type e label');
    }
    if (button.type === 'CALL' && !button.phone) {
      throw new Error('Botões do tipo CALL devem ter um telefone');
    }
    if (button.type === 'URL' && !button.url) {
      throw new Error('Botões do tipo URL devem ter uma URL');
    }
  }
  return buttonActions;
}

// Middleware para enviar texto com botões de ação
app.use(async (ctx) => {
  if (ctx.path === '/api/send-button-actions' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, buttonActions, title, footer } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      const validatedButtonActions = validateButtonActions(buttonActions);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
      
      const payload = {
        phone: validatedPhone,
        message: message.trim(),
        buttonActions: validatedButtonActions.map(btn => ({
          id: btn.id,
          type: btn.type,
          phone: btn.type === 'CALL' ? validatePhone(btn.phone) : undefined,
          url: btn.type === 'URL' ? btn.url : undefined,
          label: btn.label.trim(),
        })),
      };
      
      if (title) payload.title = title.trim();
      if (footer) payload.footer = footer.trim();

      const response = await axios.post(url, payload, {
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
      console.error('Erro ao enviar texto com botões de ação:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar texto com botões de ação',
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
import org.json.JSONArray;

public class SendButtonActions {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("551199999999");
            String message = "Entre em contato conosco";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-actions",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray buttonActions = new JSONArray();
            JSONObject button1 = new JSONObject();
            button1.put("id", "1");
            button1.put("type", "CALL");
            button1.put("phone", validatePhone("554498398733"));
            button1.put("label", "Fale conosco");
            buttonActions.put(button1);
            
            JSONObject button2 = new JSONObject();
            button2.put("id", "2");
            button2.put("type", "URL");
            button2.put("url", "https://z-api.io");
            button2.put("label", "Visite nosso site");
            buttonActions.put(button2);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("title", "Suporte");
            payload.put("footer", "Estamos aqui para ajudar");
            payload.put("buttonActions", buttonActions);
            
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
                
                System.out.println("Texto com botões de ação enviado com sucesso");
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
using System.Collections.Generic;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
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

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("551199999999");
            string message = "Entre em contato conosco";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-actions";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                title = "Suporte",
                footer = "Estamos aqui para ajudar",
                buttonActions = new[]
                {
                    new { id = "1", type = "CALL", phone = ValidatePhone("554498398733"), label = "Fale conosco" },
                    new { id = "2", type = "URL", url = "https://z-api.io", label = "Visite nosso site" }
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
                    Console.WriteLine("Texto com botões de ação enviado com sucesso");
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
    "strings"
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "551199999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    message := "Entre em contato conosco"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "title": "Suporte",
        "footer": "Estamos aqui para ajudar",
        "buttonActions": []map[string]interface{}{
            {
                "id": "1",
                "type": "CALL",
                "phone": "554498398733",
                "label": "Fale conosco",
            },
            {
                "id": "2",
                "type": "URL",
                "url": "https://z-api.io",
                "label": "Visite nosso site",
            },
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
        
        fmt.Println("Texto com botões de ação enviado com sucesso")
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

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('551199999999');
    $message = 'Entre em contato conosco';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-actions',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'title' => 'Suporte',
        'footer' => 'Estamos aqui para ajudar',
        'buttonActions' => [
            [
                'id' => '1',
                'type' => 'CALL',
                'phone' => validatePhone('554498398733'),
                'label' => 'Fale conosco',
            ],
            [
                'id' => '2',
                'type' => 'URL',
                'url' => 'https://z-api.io',
                'label' => 'Visite nosso site',
            ],
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
        echo "Texto com botões de ação enviado com sucesso\n";
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

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('551199999999')
  message = 'Entre em contato conosco'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-actions")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    title: 'Suporte',
    footer: 'Estamos aqui para ajudar',
    buttonActions: [
      {
        id: '1',
        type: 'CALL',
        phone: validate_phone('554498398733'),
        label: 'Fale conosco'
      },
      {
        id: '2',
        type: 'URL',
        url: 'https://z-api.io',
        label: 'Visite nosso site'
      }
    ]
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Texto com botões de ação enviado com sucesso'
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

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("551199999999")
    let message = "Entre em contato conosco"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-actions"
    
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
        "message": message.trimmingCharacters(in: .whitespaces),
        "title": "Suporte",
        "footer": "Estamos aqui para ajudar",
        "buttonActions": [
            [
                "id": "1",
                "type": "CALL",
                "phone": try validatePhone("554498398733"),
                "label": "Fale conosco"
            ],
            [
                "id": "2",
                "type": "URL",
                "url": "https://z-api.io",
                "label": "Visite nosso site"
            ]
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
                        print("Texto com botões de ação enviado com sucesso")
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

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "551199999999"
    $message = "Entre em contato conosco"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-actions"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        title = "Suporte"
        footer = "Estamos aqui para ajudar"
        buttonActions = @(
            @{
                id = "1"
                type = "CALL"
                phone = (Validate-Phone "554498398733")
                label = "Fale conosco"
            },
            @{
                id = "2"
                type = "URL"
                url = "https://z-api.io"
                label = "Visite nosso site"
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Texto com botões de ação enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "551199999999",
  "message": "Entre em contato conosco",
  "title": "Suporte",
  "footer": "Estamos aqui para ajudar",
  "buttonActions": [
    {
      "id": "1",
      "type": "CALL",
      "phone": "554498398733",
      "label": "Fale conosco"
    },
    {
      "id": "2",
      "type": "URL",
      "url": "https://z-api.io",
      "label": "Visite nosso site"
    }
  ]
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

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "551199999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    std::string message = "Entre em contato conosco";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-actions";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"title\":\"Suporte\","
                  << "\"footer\":\"Estamos aqui para ajudar\","
                  << "\"buttonActions\":["
                  << "{\"id\":\"1\",\"type\":\"CALL\",\"phone\":\"554498398733\",\"label\":\"Fale conosco\"},"
                  << "{\"id\":\"2\",\"type\":\"URL\",\"url\":\"https://z-api.io\",\"label\":\"Visite nosso site\"}"
                  << "]"
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
                std::cout << "Texto com botões de ação enviado com sucesso" << std::endl;
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
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "551199999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    char* message = "Entre em contato conosco";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"title\":\"Suporte\",\"footer\":\"Estamos aqui para ajudar\",\"buttonActions\":[{\"id\":\"1\",\"type\":\"CALL\",\"phone\":\"554498398733\",\"label\":\"Fale conosco\"},{\"id\":\"2\",\"type\":\"URL\",\"url\":\"https://z-api.io\",\"label\":\"Visite nosso site\"}]}",
        phone, message);
    
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
                printf("Texto com botões de ação enviado com sucesso\n");
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

### Exemplo 2: Botão REPLY {#exemplo-reply}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar botão REPLY
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('Botão REPLY deve ter id, type e label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Tipo de botão deve ser REPLY');
  }
  return button;
}

// Enviar texto com botão REPLY
async function sendReplyButton(phone, message, button, title, footer) {
  try {
    // ⚠️ VALIDAÇÃO
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      throw new Error('A mensagem não pode estar vazia');
    }
    const validatedButton = validateReplyButton(button);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: [{
        id: validatedButton.id,
        type: validatedButton.type,
        label: validatedButton.label.trim(),
      }],
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Texto com botão REPLY enviado com sucesso');
    return data;
  } catch (error) {
    console.error('Erro ao enviar texto com botão REPLY:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendReplyButton(
  '551199999999',
  'Deseja falar com um atendente?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Falar com atendente',
  },
  'Atendimento',
  'Resposta rápida'
);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface ButtonActionsResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

interface ReplyButton {
  id: string;
  type: 'REPLY';
  label: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar botão REPLY
function validateReplyButton(button: ReplyButton): ReplyButton {
  if (!button.id || !button.type || !button.label) {
    throw new Error('Botão REPLY deve ter id, type e label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Tipo de botão deve ser REPLY');
  }
  return button;
}

// Função para enviar texto com botão REPLY
async function sendReplyButton(
  phone: string,
  message: string,
  button: ReplyButton,
  title?: string,
  footer?: string
): Promise<ButtonActionsResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!message || message.trim() === '') {
    throw new Error('A mensagem não pode estar vazia');
  }
  const validatedButton = validateReplyButton(button);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;

  const payload: any = {
    phone: validatedPhone,
    message: message.trim(),
    buttonActions: [{
      id: validatedButton.id,
      type: validatedButton.type,
      label: validatedButton.label.trim(),
    }],
  };
  
  if (title) payload.title = title.trim();
  if (footer) payload.footer = footer.trim();

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
sendReplyButton(
  '551199999999',
  'Deseja falar com um atendente?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Falar com atendente',
  },
  'Atendimento',
  'Resposta rápida'
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
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_reply_button(button: Dict[str, Any]) -> Dict[str, Any]:
    """Valida botão REPLY"""
    if not button.get('id') or not button.get('type') or not button.get('label'):
        raise ValueError('Botão REPLY deve ter id, type e label')
    if button['type'] != 'REPLY':
        raise ValueError('Tipo de botão deve ser REPLY')
    return button

def send_reply_button(
    phone: str,
    message: str,
    button: Dict[str, Any],
    title: str = None,
    footer: str = None
) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not message or not message.strip():
        raise ValueError('A mensagem não pode estar vazia')
    validated_button = validate_reply_button(button)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-button-actions"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "message": message.strip(),
        "buttonActions": [{
            "id": validated_button["id"],
            "type": validated_button["type"],
            "label": validated_button["label"].strip(),
        }]
    }
    
    if title:
        payload["title"] = title.strip()
    if footer:
        payload["footer"] = footer.strip()
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        print('Texto com botão REPLY enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_reply_button(
    '551199999999',
    'Deseja falar com um atendente?',
    {
        'id': '3',
        'type': 'REPLY',
        'label': 'Falar com atendente'
    },
    title='Atendimento',
    footer='Resposta rápida'
)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-551199999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar texto com botão REPLY via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-button-actions" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"Deseja falar com um atendente?\",
    \"title\": \"Atendimento\",
    \"footer\": \"Resposta rápida\",
    \"buttonActions\": [
      {
        \"id\": \"3\",
        \"type\": \"REPLY\",
        \"label\": \"Falar com atendente\"
      }
    ]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar botão REPLY
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('Botão REPLY deve ter id, type e label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Tipo de botão deve ser REPLY');
  }
  return button;
}

// Enviar texto com botão REPLY
function sendReplyButton(phone, message, button, title, footer) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        throw new Error('A mensagem não pode estar vazia');
      }
      const validatedButton = validateReplyButton(button);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    const payload = JSON.stringify({
      phone: phone,
      message: message.trim(),
      title: title ? title.trim() : undefined,
      footer: footer ? footer.trim() : undefined,
      buttonActions: [{
        id: button.id,
        type: button.type,
        label: button.label.trim(),
      }],
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
            console.log('Texto com botão REPLY enviado com sucesso');
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
sendReplyButton(
  '551199999999',
  'Deseja falar com um atendente?',
  {
    id: '3',
    type: 'REPLY',
    label: 'Falar com atendente',
  },
  'Atendimento',
  'Resposta rápida'
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
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar botão REPLY
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('Botão REPLY deve ter id, type e label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Tipo de botão deve ser REPLY');
  }
  return button;
}

// Rota para enviar texto com botão REPLY
app.post('/api/send-reply-button', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, message, button, title, footer } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'A mensagem não pode estar vazia',
      });
    }
    const validatedButton = validateReplyButton(button);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
    
    const payload = {
      phone: validatedPhone,
      message: message.trim(),
      buttonActions: [{
        id: validatedButton.id,
        type: validatedButton.type,
        label: validatedButton.label.trim(),
      }],
    };
    
    if (title) payload.title = title.trim();
    if (footer) payload.footer = footer.trim();

    const response = await axios.post(url, payload, {
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
    console.error('Erro ao enviar texto com botão REPLY:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar texto com botão REPLY',
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

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar botão REPLY
function validateReplyButton(button) {
  if (!button.id || !button.type || !button.label) {
    throw new Error('Botão REPLY deve ter id, type e label');
  }
  if (button.type !== 'REPLY') {
    throw new Error('Tipo de botão deve ser REPLY');
  }
  return button;
}

// Middleware para enviar texto com botão REPLY
app.use(async (ctx) => {
  if (ctx.path === '/api/send-reply-button' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, message, button, title, footer } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!message || message.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A mensagem não pode estar vazia',
        };
        return;
      }
      const validatedButton = validateReplyButton(button);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-button-actions`;
      
      const payload = {
        phone: validatedPhone,
        message: message.trim(),
        buttonActions: [{
          id: validatedButton.id,
          type: validatedButton.type,
          label: validatedButton.label.trim(),
        }],
      };
      
      if (title) payload.title = title.trim();
      if (footer) payload.footer = footer.trim();

      const response = await axios.post(url, payload, {
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
      console.error('Erro ao enviar texto com botão REPLY:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar texto com botão REPLY',
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
import org.json.JSONArray;

public class SendReplyButton {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("551199999999");
            String message = "Deseja falar com um atendente?";
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("A mensagem não pode estar vazia");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-button-actions",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray buttonActions = new JSONArray();
            JSONObject button = new JSONObject();
            button.put("id", "3");
            button.put("type", "REPLY");
            button.put("label", "Falar com atendente");
            buttonActions.put(button);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("message", message.trim());
            payload.put("title", "Atendimento");
            payload.put("footer", "Resposta rápida");
            payload.put("buttonActions", buttonActions);
            
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
                
                System.out.println("Texto com botão REPLY enviado com sucesso");
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

    // Validar telefone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("551199999999");
            string message = "Deseja falar com um atendente?";
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("A mensagem não pode estar vazia");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-button-actions";
            
            var payload = new
            {
                phone = phone,
                message = message.Trim(),
                title = "Atendimento",
                footer = "Resposta rápida",
                buttonActions = new[]
                {
                    new { id = "3", type = "REPLY", label = "Falar com atendente" }
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
                    Console.WriteLine("Texto com botão REPLY enviado com sucesso");
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
    "strings"
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "551199999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    message := "Deseja falar com um atendente?"
    if strings.TrimSpace(message) == "" {
        fmt.Println("Erro: A mensagem não pode estar vazia")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "message": strings.TrimSpace(message),
        "title": "Atendimento",
        "footer": "Resposta rápida",
        "buttonActions": []map[string]interface{}{
            {
                "id": "3",
                "type": "REPLY",
                "label": "Falar com atendente",
            },
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
        
        fmt.Println("Texto com botão REPLY enviado com sucesso")
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

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('551199999999');
    $message = 'Deseja falar com um atendente?';
    if (empty(trim($message))) {
        throw new Exception('A mensagem não pode estar vazia');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-button-actions',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'message' => trim($message),
        'title' => 'Atendimento',
        'footer' => 'Resposta rápida',
        'buttonActions' => [
            [
                'id' => '3',
                'type' => 'REPLY',
                'label' => 'Falar com atendente',
            ],
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
        echo "Texto com botão REPLY enviado com sucesso\n";
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

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('551199999999')
  message = 'Deseja falar com um atendente?'
  raise 'A mensagem não pode estar vazia' if message.nil? || message.strip.empty?

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-button-actions")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    message: message.strip,
    title: 'Atendimento',
    footer: 'Resposta rápida',
    buttonActions: [
      {
        id: '3',
        type: 'REPLY',
        label: 'Falar com atendente'
      }
    ]
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Texto com botão REPLY enviado com sucesso'
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

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("551199999999")
    let message = "Deseja falar com um atendente?"
    if message.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "A mensagem não pode estar vazia"])
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-button-actions"
    
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
        "message": message.trimmingCharacters(in: .whitespaces),
        "title": "Atendimento",
        "footer": "Resposta rápida",
        "buttonActions": [
            [
                "id": "3",
                "type": "REPLY",
                "label": "Falar com atendente"
            ]
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
                        print("Texto com botão REPLY enviado com sucesso")
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

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "551199999999"
    $message = "Deseja falar com um atendente?"
    if ([string]::IsNullOrWhiteSpace($message)) {
        throw "A mensagem não pode estar vazia"
    }

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-button-actions"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        message = $message.Trim()
        title = "Atendimento"
        footer = "Resposta rápida"
        buttonActions = @(
            @{
                id = "3"
                type = "REPLY"
                label = "Falar com atendente"
            }
        )
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Texto com botão REPLY enviado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-actions HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "551199999999",
  "message": "Deseja falar com um atendente?",
  "title": "Atendimento",
  "footer": "Resposta rápida",
  "buttonActions": [
    {
      "id": "3",
      "type": "REPLY",
      "label": "Falar com atendente"
    }
  ]
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

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "551199999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    std::string message = "Deseja falar com um atendente?";
    if (message.empty() || message.find_first_not_of(" \t\n\r") == std::string::npos) {
        std::cerr << "Erro: A mensagem não pode estar vazia" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-button-actions";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"message\":\"" << message << "\","
                  << "\"title\":\"Atendimento\","
                  << "\"footer\":\"Resposta rápida\","
                  << "\"buttonActions\":["
                  << "{\"id\":\"3\",\"type\":\"REPLY\",\"label\":\"Falar com atendente\"}"
                  << "]"
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
                std::cout << "Texto com botão REPLY enviado com sucesso" << std::endl;
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
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "551199999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    char* message = "Deseja falar com um atendente?";
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: A mensagem não pode estar vazia\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-button-actions", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"message\":\"%s\",\"title\":\"Atendimento\",\"footer\":\"Resposta rápida\",\"buttonActions\":[{\"id\":\"3\",\"type\":\"REPLY\",\"label\":\"Falar com atendente\"}]}",
        phone, message);
    
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
                printf("Texto com botão REPLY enviado com sucesso\n");
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
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega e Cliques:**

Para saber quando a mensagem foi entregue, lida, ou quando um botão foi clicado (tipo REPLY), configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique se todos os atributos obrigatórios foram enviados, especialmente `phone`, `message`, `buttonActions` com `type` e `label` corretos, e campos específicos por tipo (`phone` para CALL, `url` para URL) |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` nos headers da requisição |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando o usuário clicar em um botão, você receberá um webhook com a resposta. Veja mais detalhes em:

[Webhook ao receber mensagem - Botões de ação](/docs/webhooks/ao-receber#exemplo-de-retorno-de-texto-lista-de-botão)

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Tipos de botão**: `CALL`, `URL` e `REPLY`
- **Limitação**: Não envie os três tipos simultaneamente. Use CALL + URL juntos, ou REPLY separadamente
- **Botão de copiar**: Use o link especial do WhatsApp no atributo `url` para criar um botão de copiar código
- **Delay**: O atributo `delayMessage` permite controlar o tempo entre mensagens (1-15 segundos)
