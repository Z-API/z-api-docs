---
id: listar-categorias
title: Listar Categorias
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> Listar Categorias

Liste as categorias disponíveis para atribuir à sua empresa/companhia através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível listar as categorias disponíveis para atribuir a empresa/companhia. As categorias são usadas para classificar e identificar o tipo de negócio da sua empresa no WhatsApp Business.

:::important Importante

Este método está disponível apenas para contas Business do WhatsApp.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/business/available-categories
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `query` | string | Parâmetro de pesquisa de categorias. Exemplo: `"tecnologia"` |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Listar todas as categorias**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories
Client-Token: seu-token-de-seguranca
```

**Buscar categorias por termo**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories?query=tecnologia
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Listar todas as categorias
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const categories = await response.json();
console.log('Categorias disponíveis:', categories);

// Buscar categorias por termo
const searchResponse = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories?query=tecnologia',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const searchResults = await searchResponse.json();
console.log('Categorias encontradas:', searchResults);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Listar todas as categorias
response = requests.get(url, headers=headers)
categories = response.json()
print('Categorias disponíveis:', categories)

# Buscar categorias por termo
params = {"query": "tecnologia"}
search_response = requests.get(url, headers=headers, params=params)
search_results = search_response.json()
print('Categorias encontradas:', search_results)
```

</TabItem>
<TabItem value="curl" label="cURL">

**Listar todas as categorias**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Buscar categorias por termo**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/available-categories?query=tecnologia" \
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
    "displayName": "Outras empresas",
    "label": "OTHER_COMPANIES",
    "id": "629412378414563"
  },
  {
    "displayName": "Serviço automotivo",
    "id": "1223524174334504"
  }
]
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `displayName` | string | Nome da categoria a ser exibido |
| `id` | string | Identificador da categoria. Deve ser enviado na requisição de atribuir categorias a empresa |
| `label` | string \| undefined | Também pode ser informado na requisição de atribuir categorias a empresa (opcional) |

**Nota**: A resposta é um array de objetos, onde cada objeto representa uma categoria disponível.

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `403` | Conta não Business | Este método está disponível apenas para contas Business do WhatsApp |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Conta Business**: Este método está disponível apenas para contas Business do WhatsApp
- **Busca opcional**: Use o parâmetro `query` para buscar categorias por termo (ex: `"tecnologia"`, `"serviço"`)
- **Uso do ID**: O `id` retornado deve ser usado na requisição de [Atribuir Categorias](/docs/whatsapp-business/atribuir-categorias) à empresa
- **Label opcional**: Algumas categorias podem ter um `label` que também pode ser usado na atribuição
- **Array de resposta**: A resposta sempre retorna um array, mesmo que vazio

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Atribuir Categorias](/docs/whatsapp-business/atribuir-categorias) - Atribuir categorias à empresa
- [Dados da Conta](/docs/whatsapp-business/dados-conta) - Ver informações da conta Business
