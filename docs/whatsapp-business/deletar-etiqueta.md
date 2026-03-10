---
id: deletar-etiqueta
title: Deletar Etiqueta
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagX" size="lg" /> Deletar Etiqueta

Remova uma etiqueta do seu WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite deletar uma etiqueta existente. Quando uma etiqueta é deletada, ela é removida de todos os chats onde estava atribuída.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

:::warning Atenção
Ao deletar uma etiqueta, ela será removida permanentemente e não poderá ser recuperada. Certifique-se de que realmente deseja remover a etiqueta antes de executar esta operação.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/tag/{{ID_DA_ETIQUETA}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `tagId` | string | ID da etiqueta a ser deletada | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/10
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const tagId = '10';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/${tagId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

tag_id = '10'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/{tag_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.delete(url, headers=headers)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/10" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `DELETE` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Etiqueta não encontrada | Verifique se o `tagId` existe |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da etiqueta**: Use o ID retornado ao criar a etiqueta ou obtenha-o através da [API de Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas)
- **Remoção permanente**: A etiqueta será removida permanentemente e não poderá ser recuperada
- **Remoção de chats**: Quando uma etiqueta é deletada, ela é automaticamente removida de todos os chats onde estava atribuída

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Etiqueta](/docs/whatsapp-business/criar-etiqueta) - Criar uma nova etiqueta
- [Editar Etiqueta](/docs/whatsapp-business/editar-etiqueta) - Atualizar uma etiqueta
- [Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas) - Listar todas as etiquetas
- [Atribuir Etiquetas](/docs/whatsapp-business/atribuir-etiquetas) - Adicionar etiquetas a chats
