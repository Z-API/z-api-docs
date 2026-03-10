---
id: listar-produtos-colecao
title: Listar Produtos da Coleção
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackageSearch" size="lg" /> Listar Produtos da Coleção

Liste todos os produtos que fazem parte de uma coleção específica do seu catálogo.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você liste todos os produtos que fazem parte de uma coleção específica. Útil para visualizar quais produtos estão agrupados em uma determinada coleção, verificar informações detalhadas de cada produto e gerenciar o conteúdo da coleção.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/catalogs/collection-products/{phoneNumber}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `phoneNumber` | string | Número de telefone do dono do catálogo no formato internacional (sem espaços ou caracteres especiais) | `5511999999999` |

### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|
| `collectionId` | string | Sim | ID da coleção da qual deseja listar os produtos | `1072603710847740` |
| `nextCursor` | string | Não | Token utilizado para paginação dos registros | `eyJpZCI6IjEyMzQ1NiJ9` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740
Client-Token: seu-token-de-seguranca
```

**Com paginação**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740&nextCursor=eyJpZCI6IjEyMzQ1NiJ9
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phoneNumber = '5511999999999';
const collectionId = '1072603710847740';
const nextCursor = null; // Opcional: token de paginação

let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/${phoneNumber}?collectionId=${collectionId}`;
if (nextCursor) {
  url += `&nextCursor=${nextCursor}`;
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

phone_number = '5511999999999'
collection_id = '1072603710847740'
next_cursor = None  # Opcional: token de paginação

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/{phone_number}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {
    'collectionId': collection_id
}
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Com paginação**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740&nextCursor=eyJpZCI6IjEyMzQ1NiJ9" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "nextCursor": null,
  "products": [
    {
      "id": "6988917394481455",
      "name": "Nome do produto",
      "description": "Descrição do produto",
      "url": "http://site.com/produto",
      "price": "10000",
      "currency": "BRL",
      "isHidden": false,
      "availability": "in stock",
      "retailerId": "123",
      "images": [
        "https://cdn.greatsoftwares.com.br/arquivos/paginas/10603-92bb9420b363835d05d41b96a45d8f4e.png"
      ],
      "quantity": "99"
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `nextCursor` | string \| null | Token para paginação. Se presente, há mais resultados disponíveis. Use este token na próxima requisição para obter mais produtos |
| `products` | array | Lista de produtos da coleção |
| `products[].id` | string | ID único do produto |
| `products[].name` | string | Nome do produto |
| `products[].description` | string | Descrição do produto |
| `products[].url` | string | URL do produto (link para página do produto) |
| `products[].price` | string | Preço do produto (em centavos) |
| `products[].currency` | string | Moeda do produto (ex: `"BRL"`) |
| `products[].isHidden` | boolean | Indica se o produto está oculto na coleção |
| `products[].availability` | string | Disponibilidade do produto (`"in stock"`, `"out of stock"`, etc.) |
| `products[].retailerId` | string | ID do varejista |
| `products[].images` | array | Array de URLs das imagens do produto |
| `products[].quantity` | string | Quantidade disponível do produto |

---

### Paginação

Quando há muitos produtos na coleção, a resposta pode vir paginada. Para obter todos os produtos:

1. Verifique se o campo `nextCursor` está presente na resposta
2. Faça uma nova requisição incluindo o `nextCursor` como parâmetro de query
3. Repita até que `nextCursor` seja `null` ou não esteja presente

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Coleção não encontrada | Verifique se o `collectionId` está correto e se a coleção existe |
| `400` | Parâmetros inválidos | Verifique se o `collectionId` foi fornecido e se o número está no formato correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da coleção**: Use o ID retornado pelo método [Listar Coleções](/docs/whatsapp-business/listar-colecoes) para obter o `collectionId`
- **Formato do número**: Use formato internacional sem espaços ou caracteres especiais (ex: `5511999999999`)
- **Preços em centavos**: Os valores de `price` são retornados em centavos (ex: `"10000"` = R$ 100,00)
- **Produtos ocultos**: O campo `isHidden` indica se o produto está visível ou oculto na coleção
- **Paginação**: Use o campo `nextCursor` para obter todos os produtos quando houver muitos resultados

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Listar Coleções](/docs/whatsapp-business/listar-colecoes) - Ver todas as coleções do catálogo
- [Criar Coleção](/docs/whatsapp-business/criar-colecao) - Criar uma nova coleção
- [Adicionar Produtos à Coleção](/docs/whatsapp-business/adicionar-produtos-colecao) - Adicionar produtos a uma coleção
- [Remover Produtos da Coleção](/docs/whatsapp-business/remover-produtos-colecao) - Remover produtos de uma coleção
