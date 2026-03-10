---
id: arquivar
title: Arquivar Chats
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Archive" size="lg" /> Arquivar Chats

Arquive e desarquive seus chats através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por arquivar e desarquivar seus chats. Quando você arquiva um chat, ele é movido para a seção de arquivados, mas não é deletado. Você pode desarquivar o chat a qualquer momento.

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
| `action` | string | Atributo para arquivar e desarquivar o chat | `archive` (arquivar), `unarchive` (desarquivar) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Arquivar chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "archive"
}
```

**Desarquivar chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "unarchive"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Arquivar chat
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
      action: 'archive', // ou 'unarchive' para desarquivar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat arquivado com sucesso!');
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

# Arquivar chat
payload = {
    "phone": "5544999999999",
    "action": "archive"  # ou "unarchive" para desarquivar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat arquivado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Arquivar chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "archive"
  }'
```

**Desarquivar chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "unarchive"
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
| `400` | Dados inválidos | Verifique se `phone` e `action` foram fornecidos corretamente. Use `archive` ou `unarchive` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Ações disponíveis**: Use `archive` para arquivar um chat ou `unarchive` para desarquivá-lo
- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Chat não deletado**: Arquivar um chat não o deleta, apenas o move para a seção de arquivados
- **Reversível**: Você pode desarquivar um chat a qualquer momento usando `unarchive`

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Deletar Chat](/docs/chats/deletar) - Deletar um chat permanentemente
- [Limpar Chat](/docs/chats/limpar) - Limpar mensagens de um chat
- [Mutar Chat](/docs/chats/mutar) - Mutar ou desmutar um chat
- [Listar Chats](/docs/chats/pegar-chats) - Listar todos os chats
