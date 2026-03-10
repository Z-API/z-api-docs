---
id: atribuir-etiquetas
title: Atribuir Etiquetas
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagPlus" size="lg" /> Atribuir Etiquetas

Atribua uma etiqueta a um chat no WhatsApp Business para organizar e categorizar suas conversas.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite atribuir uma etiqueta a um chat específico no WhatsApp Business. Etiquetas são úteis para organizar conversas, criar filtros personalizados e gerenciar melhor seus contatos.

:::important Importante
Este método está disponível apenas para dispositivos conectados à versão Multi-Devices do WhatsApp.
:::

**Casos de uso**:
- Marcar conversas importantes (ex: "Cliente VIP")
- Organizar por status (ex: "Aguardando Resposta", "Em Negociação")
- Criar categorias personalizadas (ex: "Suporte", "Vendas")

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/add
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `phone` | string | Número de telefone do chat (formato internacional, sem espaços) | `5511999999999` |
| `tagId` | string | ID da etiqueta a ser atribuída | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/add
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phone = '5511999999999';
const tagId = '10';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/${phone}/tags/${tagId}/add`,
  {
    method: 'PUT',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

phone = '5511999999999'
tag_id = '10'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/{phone}/tags/{tag_id}/add"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.put(url, headers=headers)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/add" \
  -H "Client-Token: seu-token-de-seguranca"
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
| `value` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `PUT` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Chat ou etiqueta não encontrado | Verifique se o número e o `tagId` estão corretos |
| `400` | Dados inválidos | Verifique se o número está no formato correto (formato internacional, sem espaços) |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Multi-Devices obrigatório**: Este método requer que a instância esteja conectada à versão Multi-Devices do WhatsApp
- **WhatsApp Business**: Requer uma conta WhatsApp Business configurada
- **Formato do número**: Use formato internacional sem espaços ou caracteres especiais (ex: `5511999999999`)
- **ID da etiqueta**: Use o ID retornado ao criar a etiqueta ou obtenha-o através da [API de Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas)
- **Múltiplas etiquetas**: Você pode atribuir múltiplas etiquetas ao mesmo chat fazendo requisições separadas
- **Etiquetas duplicadas**: Se a etiqueta já estiver atribuída ao chat, a operação ainda será bem-sucedida

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Etiqueta](/docs/whatsapp-business/criar-etiqueta) - Criar uma nova etiqueta
- [Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas) - Listar todas as etiquetas disponíveis
- [Remover Etiquetas](/docs/whatsapp-business/remover-etiquetas) - Remover etiquetas de um chat
- [Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) - Ver cores disponíveis para etiquetas
