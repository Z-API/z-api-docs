---
id: listar-colecoes
title: Listar Coleções
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderOpen" size="lg" /> Listar Coleções

Liste todas as coleções do seu catálogo do WhatsApp Business através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você liste todas as coleções criadas no seu catálogo. Coleções são grupos de produtos organizados por categoria, tipo ou qualquer critério que você definir. A resposta inclui informações sobre cada coleção, como ID, nome e status de aprovação.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection
```

### Parâmetros de Query (Opcionais)

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `nextCursor` | string | Token utilizado para paginação dos registros | `AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection
Client-Token: seu-token-de-seguranca
```

**Com paginação**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection?nextCursor=AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const nextCursor = null; // Opcional: token de paginação

let url = 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection';
if (nextCursor) {
  url += `?nextCursor=${nextCursor}`;
}

const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Client-Token': 'seu-token-de-seguranca',
  },
});

const data = await response.json();
console.log(data);

// Se houver mais resultados, use o nextCursor retornado
if (data.nextCursor) {
  // Fazer nova requisição com nextCursor
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

next_cursor = None  # Opcional: token de paginação

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {}
if next_cursor:
    params['nextCursor'] = next_cursor

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)

# Se houver mais resultados, use o nextCursor retornado
if data.get('nextCursor'):
    # Fazer nova requisição com nextCursor
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Com paginação**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection?nextCursor=AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "nextCursor": "AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve",
  "collections": [
    {
      "id": "1072603710847740",
      "name": "Nome da coleção",
      "status": "PENDING"
    },
    {
      "id": "902834786123343",
      "name": "Nome da coleção 2",
      "status": "APPROVED"
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `nextCursor` | string \| null | Token para paginação. Se presente, há mais resultados disponíveis. Use este token na próxima requisição para obter mais coleções |
| `collections` | array | Lista de coleções do catálogo |
| `collections[].id` | string | ID único da coleção |
| `collections[].name` | string | Nome da coleção |
| `collections[].status` | string | Status da coleção. Valores possíveis: `"PENDING"` (pendente de aprovação), `"APPROVED"` (aprovada) |

---

### Status da Coleção

| Status | Descrição |
|--------|-----------|
| `PENDING` | Coleção está pendente de aprovação pelo WhatsApp |
| `APPROVED` | Coleção foi aprovada e está ativa no catálogo |

---

### Paginação

Quando há muitas coleções, a resposta pode vir paginada. Para obter todas as coleções:

1. Verifique se o campo `nextCursor` está presente na resposta
2. Faça uma nova requisição incluindo o `nextCursor` como parâmetro de query
3. Repita até que `nextCursor` seja `null` ou não esteja presente

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Catálogo não encontrado | Verifique se o catálogo existe e está configurado |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **Status de aprovação**: Coleções podem estar pendentes de aprovação (`PENDING`) ou já aprovadas (`APPROVED`)
- **Paginação**: Use o campo `nextCursor` para obter todas as coleções quando houver muitos resultados
- **ID da coleção**: Use o ID retornado para listar produtos de uma coleção específica ou para editar/deletar a coleção

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Coleção](/docs/whatsapp-business/criar-colecao) - Criar uma nova coleção
- [Listar Produtos da Coleção](/docs/whatsapp-business/listar-produtos-colecao) - Ver produtos de uma coleção específica
- [Editar Coleção](/docs/whatsapp-business/editar-colecao) - Atualizar informações de uma coleção
- [Deletar Coleção](/docs/whatsapp-business/deletar-colecao) - Remover uma coleção do catálogo
