---
id: adicionar-produtos-colecao
title: Adicionar Produtos à Coleção
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackagePlus" size="lg" /> Adicionar Produtos à Coleção

Adicione produtos a uma coleção existente do seu catálogo do WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você adicione produtos a uma coleção existente do seu catálogo. Você pode adicionar múltiplos produtos de uma vez, especificando seus IDs.

:::warning Atenção
Ao adicionar ou remover produtos de uma **coleção**, o ID da mesma é alterado pelo WhatsApp. Isso significa que, ao adicionar um produto na coleção e tentar fazer qualquer outra operação utilizando o **ID** "antigo", resultará em um não funcionamento da rota. Lembre-se então de utilizar o ID retornado por essa mesma rota, o qual já é o ID atualizado para as operações seguintes.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/add-product
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
| `collectionId` | string | ID da coleção à qual os produtos serão adicionados |
| `productIds` | array[string] | Array com os IDs dos produtos que farão parte da coleção. Ex: `["6643149779134830", "6988917394481455"]` |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/add-product
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "collectionId": "658387616418640",
  "productIds": ["6643149779134830", "6988917394481455"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/add-product',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      collectionId: '658387616418640',
      productIds: ['6643149779134830', '6988917394481455'],
    }),
  }
);

const data = await response.json();
console.log(data);

// IMPORTANTE: Use o collectionId retornado para próximas operações
if (data.success) {
  console.log('Novo ID da coleção:', data.collectionId);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/add-product"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "collectionId": "658387616418640",
    "productIds": ["6643149779134830", "6988917394481455"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(data)

# IMPORTANTE: Use o collectionId retornado para próximas operações
if data.get('success'):
    print(f"Novo ID da coleção: {data['collectionId']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/add-product" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "collectionId": "658387616418640",
    "productIds": ["6643149779134830", "6988917394481455"]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "collectionId": "1798362193933497"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |
| `collectionId` | string | **ID atualizado da coleção**. Use este ID para todas as operações futuras com esta coleção |

:::important Importante
O `collectionId` retornado é o **novo ID** da coleção após a adição dos produtos. Sempre use este ID atualizado para operações subsequentes, pois o ID anterior não funcionará mais.
:::

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `collectionId` e `productIds` estão corretos |
| `404` | Coleção não encontrada | Verifique se o `collectionId` existe |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da coleção muda**: O ID da coleção é alterado após adicionar produtos. Sempre use o ID retornado na resposta
- **Múltiplos produtos**: Você pode adicionar vários produtos de uma vez, passando um array com os IDs
- **Produtos existentes**: Se um produto já estiver na coleção, ele não será duplicado

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Coleção](/docs/whatsapp-business/criar-colecao) - Criar uma nova coleção
- [Listar Produtos da Coleção](/docs/whatsapp-business/listar-produtos-colecao) - Ver produtos de uma coleção
- [Remover Produtos da Coleção](/docs/whatsapp-business/remover-produtos-colecao) - Remover produtos de uma coleção
- [Editar Coleção](/docs/whatsapp-business/editar-colecao) - Atualizar informações de uma coleção
