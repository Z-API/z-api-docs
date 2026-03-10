---
id: editar-colecao
title: Editar Coleção
sidebar_position: 21
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderEdit" size="lg" /> Editar Coleção

Atualize o nome de uma coleção existente no seu catálogo do WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite editar uma coleção existente, alterando seu nome. Útil para atualizar a organização das suas coleções conforme suas necessidades mudam.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-edit/{{id-da-coleção}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `collectionId` | string | ID da coleção a ser editada | `658387616418640` |

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
| `name` | string | Novo nome da coleção |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/658387616418640
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Novo nome da coleção"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const collectionId = '658387616418640';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/${collectionId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Novo nome da coleção',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
console.log('ID da coleção:', data.collectionId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

collection_id = '658387616418640'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/{collection_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "name": "Novo nome da coleção"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
print(f"ID da coleção: {data['collectionId']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/658387616418640" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Novo nome da coleção"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "collectionId": "228078660281007"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |
| `collectionId` | string | ID da coleção (pode ser o mesmo ou um novo ID, dependendo da implementação) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se o `name` foi fornecido |
| `404` | Coleção não encontrada | Verifique se o `collectionId` existe |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da coleção**: Use o ID retornado ao criar a coleção ou obtenha-o através da [API de Listar Coleções](/docs/whatsapp-business/listar-colecoes)
- **Apenas nome**: Este método permite alterar apenas o nome da coleção. Para adicionar ou remover produtos, use as APIs específicas

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Coleção](/docs/whatsapp-business/criar-colecao) - Criar uma nova coleção
- [Listar Coleções](/docs/whatsapp-business/listar-colecoes) - Ver todas as coleções
- [Adicionar Produtos à Coleção](/docs/whatsapp-business/adicionar-produtos-colecao) - Adicionar produtos a uma coleção
- [Remover Produtos da Coleção](/docs/whatsapp-business/remover-produtos-colecao) - Remover produtos de uma coleção
- [Deletar Coleção](/docs/whatsapp-business/deletar-colecao) - Remover uma coleção do catálogo
