---
id: pegar-produtos
title: Pegar Produtos
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Package" size="lg" /> Pegar Produtos

Obtenha todos os produtos do seu catálogo do WhatsApp Business através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você liste todos os produtos cadastrados no seu catálogo do WhatsApp Business. Você receberá informações completas sobre cada produto, incluindo preço, descrição, imagens e disponibilidade.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log(data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs" \
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
  "products": [
    {
      "availability": "in stock",
      "id": "999999999999999",
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
| `cartEnabled` | boolean | Indica se o carrinho de compras está ativo no catálogo |
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
- **Preços em centavos**: Os valores de `price` e `salePrice` são retornados em centavos (ex: `"100000"` = R$ 1.000,00)
- **Imagens**: As imagens devem estar hospedadas em URLs públicas acessíveis
- **Disponibilidade**: O campo `availability` pode ter valores como `"in stock"`, `"out of stock"`, etc.

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar/Editar Produto](/docs/whatsapp-business/editar-produto) - Criar ou atualizar produtos
- [Pegar Produto por ID](/docs/whatsapp-business/pegar-produto-id) - Obter um produto específico
- [Pegar Produtos por Telefone](/docs/whatsapp-business/pegar-produtos-telefone) - Obter produtos de outro número
- [Deletar Produto](/docs/whatsapp-business/deletar-produto) - Remover um produto do catálogo
