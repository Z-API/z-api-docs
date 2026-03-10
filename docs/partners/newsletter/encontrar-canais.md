---
id: encontrar-canais
title: Encontrar Canais
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Search" size="lg" /> Encontrar Canais

Busque canais de newsletter disponíveis usando filtros e critérios de pesquisa.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna uma lista com dados de canais, de acordo com a busca realizada através de filtros passados no body da requisição. Você pode buscar canais por país, visualização (recomendados, em alta, populares, novos) e texto.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/search-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `limit` | number | Limite de registros a serem listados |
| `filters` | object | Objeto com filtros a serem aplicados |

### Objeto `filters`

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `countryCodes` | array[string] | Array com códigos de países (formato ISO 3166-1 alpha-2, ex: `["BR", "US", "CA"]`). Veja [códigos de países](https://www.iban.com/country-codes) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `view` | string | Filtro de visualização. Valores possíveis: `"RECOMMENDED"` (recomendados), `"TRENDING"` (em alta), `"POPULAR"` (populares), `"NEW"` (novos) |
| `searchText` | string | Filtragem por texto (busca no nome ou descrição do canal) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "limit": 50,
  "view": "TRENDING",
  "filters": {
    "countryCodes": ["BR", "US", "CA"]
  },
  "searchText": "Z-API"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      limit: 50,
      view: 'TRENDING', // RECOMMENDED, TRENDING, POPULAR, NEW
      filters: {
        countryCodes: ['BR', 'US', 'CA'],
      },
      searchText: 'Z-API', // Opcional
    }),
  }
);

const data = await response.json();
console.log('Canais encontrados:', data.data);
console.log('Cursor:', data.cursor);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "limit": 50,
    "view": "TRENDING",  # RECOMMENDED, TRENDING, POPULAR, NEW
    "filters": {
        "countryCodes": ["BR", "US", "CA"]
    },
    "searchText": "Z-API"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Canais encontrados: {len(data['data'])}")
for channel in data['data']:
    print(f"- {channel['name']}: {channel['description']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "limit": 50,
    "view": "TRENDING",
    "filters": {
      "countryCodes": ["BR", "US", "CA"]
    },
    "searchText": "Z-API"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "cursor": null,
  "data": [
    {
      "id": "999999999999999999@newsletter",
      "name": "Z-API",
      "description": "Canal oficial Z-API",
      "subscribersCount": "123",
      "picture": "https://mmg.whatsapp.net/v/t61.24694-24/345237462_968463277797373_5339431038113115975_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdTMyhA5kdwCdSqV0v784czJ1dHP_nkNhJ8TdgnANHro7Q&oe=651E6909&_nc_sid=000000&_nc_cat=109"
    },
    {
      "id": "888888888888888888@newsletter",
      "name": "Canal Exemplo",
      "description": "Exemplo",
      "subscribersCount": "0",
      "picture": null
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `cursor` | string ou null | Token para paginação dos resultados. Atualmente sempre `null` até que o WhatsApp implemente essa funcionalidade |
| `data` | array[object] | Lista de canais encontrados |

### Objeto `data`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID do canal (sempre termina com `@newsletter`) |
| `name` | string | Nome do canal |
| `description` | string | Descrição do canal |
| `subscribersCount` | string | Contagem do número de seguidores do canal |
| `picture` | string ou null | URL da imagem do canal (ou `null` se não houver imagem) |

:::tip Atributo "cursor" no objeto de resposta
A API do WhatsApp fornece o atributo `limit` para realizar a busca dos canais, o que significa que existe paginação dos resultados. Porém, na resposta não existe a indicação do `cursor` dos registros. Sendo assim, por enquanto, o atributo `cursor` sempre será `null`, até que o WhatsApp implemente essa funcionalidade.
:::

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `limit` e `filters` foram fornecidos e se os códigos de país estão no formato correto (ISO 3166-1 alpha-2) |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Códigos de país**: Use códigos ISO 3166-1 alpha-2 (ex: `BR`, `US`, `CA`). Veja [códigos de países](https://www.iban.com/country-codes)
- **Filtros de visualização**: Use `RECOMMENDED` para canais recomendados, `TRENDING` para canais em alta, `POPULAR` para canais populares, e `NEW` para canais novos
- **Busca por texto**: O `searchText` busca no nome e descrição dos canais
- **Paginação**: Atualmente, o `cursor` sempre será `null`. Use o `limit` para controlar quantos resultados deseja receber

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Listar Canais](/docs/partners/newsletter/listar-canais) - Listar canais próprios e seguidos
- [Seguir Canal](/docs/partners/newsletter/seguir-canal) - Seguir um canal encontrado
- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas de um canal
