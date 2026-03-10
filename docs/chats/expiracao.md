---
id: expiracao
title: Expiração dos Chats
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Expiração dos Chats

Configure o tempo de expiração das mensagens em seus chats.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por enviar expiração do chat. Você pode configurar para que as mensagens de um chat específico expirem automaticamente após um período determinado, ou desativar a expiração.

**Opções de expiração disponíveis**:
- **24 horas** (`24_HOURS`): Mensagens expiram após 24 horas
- **7 dias** (`7_DAYS`): Mensagens expiram após 7 dias
- **90 dias** (`90_DAYS`): Mensagens expiram após 90 dias
- **Desativado** (`OFF`): Desativa a expiração das mensagens (mensagens permanecem indefinidamente)

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
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
| `phone` | string | Número de telefone que você deseja inserir o tempo de expiração do **SEU** chat (formato internacional, sem espaços) | Ex: `554497050785` |
| `chatExpiration` | string | Atributo para enviar expiração do chat | `24_HOURS`, `7_DAYS`, `90_DAYS`, `OFF` |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**24 horas**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "24_HOURS"
}
```

**7 dias**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "7_DAYS"
}
```

**90 dias**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "90_DAYS"
}
```

**Desativar**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "OFF"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Configurar expiração para 90 dias
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '554497050785',
      chatExpiration: '90_DAYS', // ou '24_HOURS', '7_DAYS', 'OFF'
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Expiração do chat configurada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Configurar expiração para 90 dias
payload = {
    "phone": "554497050785",
    "chatExpiration": "90_DAYS"  # ou "24_HOURS", "7_DAYS", "OFF"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Expiração do chat configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**90 dias**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "554497050785",
    "chatExpiration": "90_DAYS"
  }'
```

**Desativar**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "554497050785",
    "chatExpiration": "OFF"
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
| `400` | Dados inválidos | Verifique se `phone` e `chatExpiration` foram fornecidos corretamente. Use um dos valores aceitos: `24_HOURS`, `7_DAYS`, `90_DAYS`, ou `OFF` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Valores aceitos**: Use `24_HOURS` para 24 horas, `7_DAYS` para 7 dias, `90_DAYS` para 90 dias, ou `OFF` para desativar a expiração
- **Formato do telefone**: Use formato internacional sem espaços (ex: `554497050785`)
- **Aplicação**: A expiração se aplica a todas as mensagens do chat após a configuração
- **Mensagens existentes**: Mensagens já existentes podem não ser afetadas, dependendo da implementação do WhatsApp

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Arquivar Chat](/docs/chats/arquivar) - Arquivar um chat
- [Deletar Chat](/docs/chats/deletar) - Deletar um chat
- [Limpar Chat](/docs/chats/limpar) - Limpar mensagens de um chat
- [Mutar Chat](/docs/chats/mutar) - Mutar ou desmutar um chat
