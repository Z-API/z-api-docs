---
id: deletar-produto
title: Deletar Produto
sidebar_position: 19
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Deletar Produto

Remova um produto do seu catálogo do WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite deletar um produto do seu catálogo usando o ID do produto. Quando um produto é deletado, ele é removido permanentemente do catálogo e não poderá ser recuperado.

:::warning Atenção
A operação de deletar um produto é permanente e não pode ser desfeita. Certifique-se de que realmente deseja remover o produto antes de executar esta operação.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{id-do-produto}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `productId` | string | ID do produto a ser deletado | `99999999999999` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const productId = '99999999999999';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/${productId}`,
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

product_id = '99999999999999'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/{product_id}"
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
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999" \
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
| `404` | Produto não encontrado | Verifique se o ID do produto está correto e se o produto existe no catálogo |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID do produto**: Use o ID retornado ao criar ou editar o produto, ou obtenha-o através da [API de Pegar Produtos](/docs/whatsapp-business/pegar-produtos)
- **Remoção permanente**: O produto será removido permanentemente e não poderá ser recuperado
- **Produtos em coleções**: Se o produto estiver em uma coleção, ele será removido da coleção também

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar/Editar Produto](/docs/whatsapp-business/editar-produto) - Criar ou atualizar produtos
- [Pegar Produtos](/docs/whatsapp-business/pegar-produtos) - Listar todos os produtos
- [Pegar Produto por ID](/docs/whatsapp-business/pegar-produto-id) - Obter um produto específico
