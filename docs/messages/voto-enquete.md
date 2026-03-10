---
id: voto-enquete
title: Voto em Enquete
sidebar_position: 29
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckSquare" size="lg" /> Voto em Enquete

Envie um voto para uma enquete através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Neste método você poderá votar em uma determinada enquete. Você pode votar em uma ou mais opções da enquete, dependendo das configurações da mesma.

**Importante**:
- Você precisa do `messageId` da mensagem da enquete para poder votar
- Você pode votar em mais de uma opção se a enquete permitir
- O `messageId` pode ser obtido ao enviar uma enquete ou ao receber uma enquete de outro contato

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
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
| `phone` | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO. **IMPORTANTE**: Envie somente números, sem formatação ou máscara. Ex: `551199999999` |
| `pollMessageId` | string | ID da mensagem da enquete. **IMPORTANTE**: Esse é o `messageId` recebido ao enviar uma enquete ou ao receber de outro contato |
| `pollVote` | array | Lista de opções que compõem o voto. **IMPORTANTE**: Você pode votar em mais de uma opção |

### PollVote (Objeto)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `name` | string | Nome da opção da enquete que você deseja votar |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Votar em uma opção**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "pollMessageId": "id da mensagem de enquete",
  "pollVote": [
    {"name": "Z-API"}
  ]
}
```

**Votar em múltiplas opções**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "pollMessageId": "id da mensagem de enquete",
  "pollVote": [
    {"name": "Z-API"},
    {"name": "WhatsApp"}
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Votar em uma opção
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      pollMessageId: 'id da mensagem de enquete',
      pollVote: [
        { name: 'Z-API' },
        // Você pode adicionar mais opções se a enquete permitir múltiplos votos
      ],
    }),
  }
);

const data = await response.json();
console.log('Voto enviado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Votar em uma opção
payload = {
    "phone": "5511999999999",
    "pollMessageId": "id da mensagem de enquete",
    "pollVote": [
        {"name": "Z-API"}
        # Você pode adicionar mais opções se a enquete permitir múltiplos votos
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Voto enviado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "pollMessageId": "id da mensagem de enquete",
    "pollVote": [
      {"name": "Z-API"}
    ]
  }'
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

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID no Z-API |
| `messageId` | string | ID no WhatsApp |
| `id` | string | Adicionado para compatibilidade com Zapier, ele tem o mesmo valor do `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone`, `pollMessageId` e `pollVote` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **messageId**: Você precisa do `messageId` da mensagem da enquete para poder votar. Este ID pode ser obtido:
  - Ao enviar uma enquete através da API
  - Ao receber uma enquete de outro contato (via webhook)
- **Múltiplos votos**: Você pode votar em mais de uma opção se a enquete permitir múltiplos votos
- **Formato do telefone**: Use formato DDI DDD NÚMERO sem formatação (ex: `5511999999999`)
- **Grupos**: Você pode votar em enquetes enviadas para grupos usando o ID do grupo como `phone`

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Enviar Enquete](/docs/messages/enquete) - Criar e enviar uma enquete
- [Webhook - Resposta de Enquete](/docs/webhooks/ao-receber#exemplo-de-retorno-de-resposta-de-enquete) - Receber notificações de votos em enquetes
