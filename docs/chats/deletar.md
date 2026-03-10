---
id: deletar
title: Deletar Chats
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Deletar Chats

Delete seus chats permanentemente através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por deletar seus chats. Quando você deleta um chat, ele é removido permanentemente da sua lista de conversas.

:::warning Atenção
Esta ação é **permanente** e não pode ser desfeita. Certifique-se de que realmente deseja deletar o chat antes de executar esta operação.
:::

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

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Número de telefone que você deseja alterar no **SEU** chat (formato internacional, sem espaços) | Ex: `5544999999999` |
| `action` | string | Atributo para deletar o chat ( `delete` ) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "delete"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
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
      action: 'delete',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat deletado com sucesso!');
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

payload = {
    "phone": "5544999999999",
    "action": "delete"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat deletado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "delete"
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
| `400` | Dados inválidos | Verifique se `phone` e `action` foram fornecidos corretamente. Use `delete` como ação |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Ação permanente**: Deletar um chat é uma ação permanente e não pode ser desfeita
- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Ação**: Use `delete` como valor do atributo `action`
- **Diferença de arquivar**: Diferente de arquivar, deletar remove o chat permanentemente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Arquivar Chat](/docs/chats/arquivar) - Arquivar um chat (reversível)
- [Limpar Chat](/docs/chats/limpar) - Limpar mensagens de um chat
- [Mutar Chat](/docs/chats/mutar) - Mutar ou desmutar um chat
- [Listar Chats](/docs/chats/pegar-chats) - Listar todos os chats
