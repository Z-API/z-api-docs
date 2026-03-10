---
id: criar-produto
title: Criar/Editar Produto
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Package" size="lg" /> Criar/Editar Produto

Cadastre e atualize produtos no seu catálogo através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Nesse método você será capaz de cadastrar e atualizar um produto no seu catálogo. O mesmo endpoint é usado tanto para criar um novo produto quanto para atualizar um produto existente.

**Funcionamento**:
- Se o `retailerId` não existir, um novo produto será criado
- Se o `retailerId` já existir, o produto será atualizado com os novos dados

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products
```

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
| `currency` | string | Tipo da moeda (ex: `BRL`, `USD`, `EUR`) |
| `description` | string | Descrição do produto |
| `images` | array (string) | Array com URLs das imagens do produto |
| `isHidden` | boolean | Atributo para "esconder" o produto no catálogo (`true` para esconder, `false` para mostrar) |
| `name` | string | Nome do produto |
| `price` | integer | Preço do produto (em centavos ou menor unidade da moeda) |
| `salePrice` | integer | Preço promocional (em centavos ou menor unidade da moeda) |
| `retailerId` | string | ID único do produto (usado para identificar e atualizar o produto) |
| `url` | string | URL da rota do Z-API ou link do produto |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Criar novo produto**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "currency": "BRL",
  "description": "Uma descrição do produto",
  "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
  "isHidden": false,
  "name": "Meu primeiro produto",
  "price": 2000,
  "salePrice": 1800,
  "retailerId": "002",
  "url": "https://z-api.io"
}
```

**Atualizar produto existente** (usando o mesmo `retailerId`):

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "currency": "BRL",
  "description": "Descrição atualizada do produto",
  "images": ["https://novo-link-da-imagem.com/produto.jpg"],
  "isHidden": false,
  "name": "Produto atualizado",
  "price": 2500,
  "salePrice": 2200,
  "retailerId": "002",
  "url": "https://z-api.io/produto/002"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar ou atualizar produto
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      currency: 'BRL',
      description: 'Uma descrição do produto',
      images: ['https://avatars.githubusercontent.com/u/60630101?s=200&v=4'],
      isHidden: false,
      name: 'Meu primeiro produto',
      price: 2000, // R$ 20,00 (em centavos)
      salePrice: 1800, // R$ 18,00 (em centavos)
      retailerId: '002', // ID único do produto
      url: 'https://z-api.io',
    }),
  }
);

const data = await response.json();
console.log('Produto criado/atualizado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar ou atualizar produto
payload = {
    "currency": "BRL",
    "description": "Uma descrição do produto",
    "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
    "isHidden": False,
    "name": "Meu primeiro produto",
    "price": 2000,  # R$ 20,00 (em centavos)
    "salePrice": 1800,  # R$ 18,00 (em centavos)
    "retailerId": "002",  # ID único do produto
    "url": "https://z-api.io"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Produto criado/atualizado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "currency": "BRL",
    "description": "Uma descrição do produto",
    "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
    "isHidden": false,
    "name": "Meu primeiro produto",
    "price": 2000,
    "salePrice": 1800,
    "retailerId": "002",
    "url": "https://z-api.io"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "id": "4741575945866725"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID do produto no catálogo do WhatsApp |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se todos os atributos obrigatórios foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Criar ou atualizar**: O mesmo endpoint é usado para criar e atualizar. Se o `retailerId` não existir, cria um novo produto. Se existir, atualiza o produto existente
- **Preço em centavos**: Os valores de `price` e `salePrice` devem ser informados em centavos (ou menor unidade da moeda). Ex: R$ 20,00 = `2000`
- **Múltiplas imagens**: O campo `images` aceita um array de URLs. Você pode enviar várias imagens do produto
- **Produto oculto**: Use `isHidden: true` para esconder o produto no catálogo sem deletá-lo
- **retailerId único**: O `retailerId` é o identificador único do produto. Use o mesmo `retailerId` para atualizar um produto existente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Pegar Produtos](/docs/whatsapp-business/pegar-produtos) - Listar produtos do catálogo
- [Pegar Produto por ID](/docs/whatsapp-business/pegar-produto-id) - Obter detalhes de um produto específico
- [Deletar Produto](/docs/whatsapp-business/deletar-produto) - Remover um produto do catálogo
- [Editar Produto](/docs/whatsapp-business/editar-produto) - Documentação adicional sobre edição
