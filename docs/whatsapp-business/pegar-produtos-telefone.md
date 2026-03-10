---
id: pegar-produtos-telefone
title: Pegar Produtos por Telefone
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Phone" size="lg" /> Pegar Produtos por Telefone

Obtenha os produtos de um catálogo do WhatsApp Business de qualquer número, seja do seu próprio catálogo ou de outro número Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você obtenha os produtos de um catálogo do WhatsApp Business de qualquer número. Você pode consultar tanto o seu próprio catálogo quanto catálogos de outros números Business, desde que o número tenha um catálogo público configurado.

**Casos de uso**:
- Consultar produtos de parceiros ou fornecedores
- Verificar catálogos de concorrentes
- Integrar produtos de múltiplos catálogos

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/catalogs/{phoneNumber}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `phoneNumber` | string | Número de telefone no formato internacional (sem espaços ou caracteres especiais) | `5511999999999` |

### Parâmetros de Query (Opcionais)

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `nextCursor` | string | Token utilizado para paginação dos registros | `eyJpZCI6IjEyMzQ1NiJ9` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999
Client-Token: seu-token-de-seguranca
```

**Com paginação**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999?nextCursor=eyJpZCI6IjEyMzQ1NiJ9
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phoneNumber = '5511999999999';
const nextCursor = null; // Opcional: token de paginação

let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/${phoneNumber}`;
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

phone_number = '5511999999999'
next_cursor = None  # Opcional: token de paginação

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/{phone_number}"
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Com paginação**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999?nextCursor=eyJpZCI6IjEyMzQ1NiJ9" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "cartEnabled": true,
  "nextCursor": "eyJpZCI6IjEyMzQ1NiJ9",
  "products": [
    {
      "availability": "in stock",
      "id": "99999999999999999",
      "retailerId": null,
      "description": "Descrição do mouse",
      "price": "100000",
      "salePrice": "90000",
      "currency": "BRL",
      "name": "Mouse",
      "quantity": null,
      "images": ["https://exemplo.com/imagem.jpg"]
    }
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `cartEnabled` | boolean | Indica se o carrinho de compras está ativo no catálogo consultado |
| `nextCursor` | string \| null | Token para paginação. Se presente, há mais resultados disponíveis. Use este token na próxima requisição para obter mais produtos |
| `products` | array | Lista de produtos do catálogo |
| `products[].availability` | string | Disponibilidade do produto (`"in stock"`, `"out of stock"`, etc.) |
| `products[].id` | string | ID único do produto |
| `products[].retailerId` | string \| null | ID do varejista (pode ser null) |
| `products[].description` | string | Descrição do produto |
| `products[].price` | string | Preço do produto (em centavos) |
| `products[].salePrice` | string | Preço promocional (em centavos) |
| `products[].currency` | string | Moeda do produto (ex: `"BRL"`) |
| `products[].name` | string | Nome do produto |
| `products[].quantity` | number \| null | Quantidade disponível (pode ser null) |
| `products[].images` | array | Array de URLs das imagens do produto |

---

### Paginação

Quando há muitos produtos no catálogo, a resposta pode vir paginada. Para obter mais produtos:

1. Verifique se o campo `nextCursor` está presente na resposta
2. Faça uma nova requisição incluindo o `nextCursor` como parâmetro de query
3. Repita até que `nextCursor` seja `null` ou não esteja presente

**Exemplo de loop de paginação**:

```javascript
let allProducts = [];
let nextCursor = null;

do {
  let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999`;
  if (nextCursor) {
    url += `?nextCursor=${nextCursor}`;
  }

  const response = await fetch(url, {
    headers: { 'Client-Token': 'seu-token-de-seguranca' }
  });
  
  const data = await response.json();
  allProducts = allProducts.concat(data.products);
  nextCursor = data.nextCursor;
} while (nextCursor);
```

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Catálogo não encontrado | Verifique se o número tem um catálogo Business configurado e se está acessível |
| `400` | Número inválido | Verifique se o número está no formato correto (DDI + DDD + NÚMERO, sem espaços) |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: O número consultado deve ter um catálogo Business configurado
- **Formato do número**: Use formato internacional sem espaços ou caracteres especiais (ex: `5511999999999`)
- **Catálogos públicos**: Você pode consultar catálogos de qualquer número Business, não apenas o seu
- **Paginação**: Use o campo `nextCursor` para obter todos os produtos quando houver muitos resultados
- **Preços em centavos**: Os valores de `price` e `salePrice` são retornados em centavos
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Pegar Produtos](/docs/whatsapp-business/pegar-produtos) - Listar produtos do seu próprio catálogo
- [Pegar Produto por ID](/docs/whatsapp-business/pegar-produto-id) - Obter um produto específico
- [Criar/Editar Produto](/docs/whatsapp-business/editar-produto) - Criar ou atualizar produtos
