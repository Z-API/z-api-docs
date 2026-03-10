---
id: pegar-produto-id
title: Pegar Produto por ID
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackageSearch" size="lg" /> Pegar Produto por ID

Obtenha informações detalhadas de um produto específico do seu catálogo usando o ID do produto.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você obtenha informações completas sobre um produto específico do seu catálogo, usando o ID único do produto. Útil quando você já conhece o ID e precisa apenas das informações desse produto específico.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{Id-do-produto}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `productId` | string | ID do produto a ser consultado | `99999999999999` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const productId = '99999999999999';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/${productId}`,
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

product_id = '99999999999999'
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/{product_id}"
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999" \
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
  "catalogId": "99999999999999999",
  "product": {
    "availability": "in stock",
    "id": "99999999999999",
    "retailerId": null,
    "description": "Descrição do mouse",
    "price": "20000",
    "salePrice": "90000",
    "currency": "BRL",
    "name": "Meu primeiro produto",
    "images": ["https://exemplo.com/imagem.jpg"]
  }
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `cartEnabled` | boolean | Indica se o carrinho de compras está ativo no catálogo |
| `catalogId` | string | ID do catálogo ao qual o produto pertence |
| `product` | object | Objeto com informações do produto |
| `product.availability` | string | Disponibilidade do produto (`"in stock"`, `"out of stock"`, etc.) |
| `product.id` | string | ID único do produto |
| `product.retailerId` | string \| null | ID do varejista (pode ser null) |
| `product.description` | string | Descrição do produto |
| `product.price` | string | Preço do produto (em centavos) |
| `product.salePrice` | string | Preço promocional (em centavos) |
| `product.currency` | string | Moeda do produto (ex: `"BRL"`) |
| `product.name` | string | Nome do produto |
| `product.images` | array | Array de URLs das imagens do produto |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Produto não encontrado | Verifique se o ID do produto está correto e se o produto existe no catálogo |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID do produto**: O ID do produto é retornado quando você cria ou edita um produto
- **Preços em centavos**: Os valores de `price` e `salePrice` são retornados em centavos (ex: `"20000"` = R$ 200,00)
- **Imagens**: As imagens devem estar hospedadas em URLs públicas acessíveis

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Pegar Produtos](/docs/whatsapp-business/pegar-produtos) - Listar todos os produtos do catálogo
- [Criar/Editar Produto](/docs/whatsapp-business/editar-produto) - Criar ou atualizar produtos
- [Pegar Produtos por Telefone](/docs/whatsapp-business/pegar-produtos-telefone) - Obter produtos de outro número
- [Deletar Produto](/docs/whatsapp-business/deletar-produto) - Remover um produto do catálogo
