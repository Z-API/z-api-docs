---
id: listar
title: Listar Comunidades
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> Listar Comunidades

Liste todas as comunidades que você faz parte.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por retornar todas as comunidades que você faz parte. Use esta API para obter uma lista de todas as comunidades da sua instância, incluindo informações básicas como nome e ID.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
```

### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `page` | integer | Não | Página de comunidades que deseja buscar (utilizado para paginação) |
| `pageSize` | integer | Não | Tamanho do retorno de comunidades por página |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Listar todas as comunidades**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
Client-Token: seu-token-de-seguranca
```

**Com paginação**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Listar todas as comunidades
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const communities = await response.json();
console.log('Comunidades:', communities);

// Com paginação
const responsePaginated = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Listar todas as comunidades
response = requests.get(url, headers=headers)
communities = response.json()
print(f"Comunidades encontradas: {len(communities)}")

# Com paginação
params = {
    "page": 1,
    "pageSize": 10
}
response = requests.get(url, headers=headers, params=params)
communities = response.json()
```

</TabItem>
<TabItem value="curl" label="cURL">

**Listar todas as comunidades**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Com paginação**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
[
  {
    "name": "Minha primeira Comunidade",
    "id": "98372465382764532938"
  },
  {
    "name": "Outra Comunidade",
    "id": "120363019502650977"
  }
]
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome da comunidade |
| `id` | string | Identificador da comunidade (use este ID para outras operações) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Paginação**: Use os parâmetros `page` e `pageSize` para paginar os resultados quando houver muitas comunidades
- **ID da comunidade**: O `id` retornado pode ser usado em outras APIs de comunidades (metadata, configurações, etc.)
- **Lista vazia**: Se você não fizer parte de nenhuma comunidade, o array retornado estará vazio

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
- [Metadata da Comunidade](/docs/communities/metadata) - Obter informações detalhadas sobre uma comunidade
- [Configurações da Comunidade](/docs/communities/configuracoes) - Alterar configurações da comunidade
