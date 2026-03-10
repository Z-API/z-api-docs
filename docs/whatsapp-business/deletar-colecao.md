---
id: deletar-colecao
title: Deletar Coleção
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderX" size="lg" /> Deletar Coleção

Remova uma coleção de produtos do seu catálogo do WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite deletar uma coleção do seu catálogo usando o ID da coleção. Quando uma coleção é deletada, ela é removida permanentemente do catálogo, mas os produtos que estavam na coleção não são deletados.

:::warning Atenção
A operação de deletar uma coleção é permanente e não pode ser desfeita. Certifique-se de que realmente deseja remover a coleção antes de executar esta operação.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/{{id-da-coleção}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `collectionId` | string | ID da coleção a ser deletada | `658387616418640` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/658387616418640
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const collectionId = '658387616418640';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/${collectionId}`,
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

collection_id = '658387616418640'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/{collection_id}"
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
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/658387616418640" \
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
| `404` | Coleção não encontrada | Verifique se o ID da coleção está correto e se a coleção existe no catálogo |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da coleção**: Use o ID retornado ao criar a coleção ou obtenha-o através da [API de Listar Coleções](/docs/whatsapp-business/listar-colecoes)
- **Remoção permanente**: A coleção será removida permanentemente e não poderá ser recuperada
- **Produtos preservados**: Os produtos que estavam na coleção não são deletados, apenas removidos da coleção

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Coleção](/docs/whatsapp-business/criar-colecao) - Criar uma nova coleção
- [Listar Coleções](/docs/whatsapp-business/listar-colecoes) - Ver todas as coleções
- [Editar Coleção](/docs/whatsapp-business/editar-colecao) - Atualizar informações de uma coleção
- [Listar Produtos da Coleção](/docs/whatsapp-business/listar-produtos-colecao) - Ver produtos de uma coleção
