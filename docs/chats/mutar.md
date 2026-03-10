---
id: mutar
title: Mutar Chats
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="VolumeX" size="lg" /> Mutar Chats

Mute e desmute seus chats através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por mutar e desmutar seus chats. Quando você muta um chat, você não recebe notificações de novas mensagens desse chat, mas o chat continua visível na sua lista de conversas.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `phone` | string | Número de telefone que você deseja alterar no **SEU** chat (formato internacional, sem espaços) | Ex: `5544999999999` |
| `action` | string | Atributo para mutar e desmutar o chat | `mute` (mutar), `unmute` (desmutar) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Mutar chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "mute"
}
```

**Desmutar chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "unmute"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Mutar chat
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5544999999999',
      action: 'mute', // ou 'unmute' para desmutar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat mutado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Mutar chat
payload = {
    "phone": "5544999999999",
    "action": "mute"  # ou "unmute" para desmutar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat mutado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Mutar chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "mute"
  }'
```

**Desmutar chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "unmute"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "value": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `value` | boolean | Atributo de confirmação da ação (`true` se bem-sucedido, `false` em caso de falha) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone` e `action` foram fornecidos corretamente. Use `mute` ou `unmute` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Ações disponíveis**: Use `mute` para mutar um chat ou `unmute` para desmutá-lo
- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Notificações**: Quando um chat está mutado, você não recebe notificações de novas mensagens
- **Chat visível**: O chat continua visível na sua lista de conversas mesmo quando mutado
- **Reversível**: Você pode desmutar um chat a qualquer momento usando `unmute`

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Arquivar Chat](/docs/chats/arquivar) - Arquivar um chat
- [Deletar Chat](/docs/chats/deletar) - Deletar um chat
- [Limpar Chat](/docs/chats/limpar) - Limpar mensagens de um chat
- [Listar Chats](/docs/chats/pegar-chats) - Listar todos os chats
