---
id: metadata
title: Metadata da Comunidade
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Info" size="lg" /> Metadata da Comunidade

Obtenha informações detalhadas sobre uma comunidade, incluindo nome, descrição e grupos vinculados.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna o metadata da comunidade, como nome, descrição e grupos que estão vinculados a ela. Use esta API para obter informações completas sobre uma comunidade específica, incluindo todos os grupos vinculados e seus tipos (grupo comum ou grupo de avisos).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/communities-metadata/{idDaComunidade}
```

### Parâmetros de URL

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `idDaComunidade` | string | Sim | ID da comunidade (obtido ao listar comunidades ou criar uma nova) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/98372465382764532938
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const communityId = '98372465382764532938';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/${communityId}`,
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const metadata = await response.json();
console.log('Nome da comunidade:', metadata.name);
console.log('Descrição:', metadata.description);
console.log('Grupos vinculados:', metadata.subGroups);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

community_id = "98372465382764532938"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/{community_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
metadata = response.json()

print(f"Nome: {metadata.get('name')}")
print(f"Descrição: {metadata.get('description')}")
print(f"Grupos vinculados: {len(metadata.get('subGroups', []))}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/98372465382764532938" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "name": "Minha primeira Comunidade",
  "id": "98372465382764532938",
  "description": "Uma descrição da comunidade",
  "subGroups": [
    {
      "name": "Minha primeira Comunidade",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    },
    {
      "name": "Outro grupo",
      "phone": "1203634230225498-group",
      "isGroupAnnouncement": false
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome da comunidade |
| `id` | string | ID da comunidade |
| `description` | string | Descrição da comunidade |
| `subGroups` | array[object] | Lista de grupos vinculados à comunidade |

### Objeto `subGroups`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome do subgrupo |
| `phone` | string | Telefone/ID do subgrupo (use para enviar mensagens) |
| `isGroupAnnouncement` | boolean | `true` se for um grupo de avisos, `false` se for um grupo comum |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Comunidade não encontrada | Verifique se o `idDaComunidade` está correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Grupo de avisos**: O grupo com `isGroupAnnouncement: true` é o grupo padrão criado automaticamente com a comunidade. Apenas administradores podem enviar mensagens neste grupo
- **Grupos comuns**: Grupos com `isGroupAnnouncement: false` são grupos normais vinculados à comunidade
- **Phone do grupo**: Use o campo `phone` do grupo para enviar mensagens usando as APIs de mensagens
- **ID da comunidade**: O `id` retornado é o mesmo usado para outras operações na comunidade

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Listar Comunidades](/docs/communities/listar) - Listar todas as comunidades
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
- [Vincular Grupos](/docs/communities/vincular-grupos) - Adicionar grupos à comunidade
- [Desvincular Grupos](/docs/communities/desvincular-grupos) - Remover grupos da comunidade
