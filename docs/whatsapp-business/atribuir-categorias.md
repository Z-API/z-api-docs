---
id: atribuir-categorias
title: Atribuir Categorias
sidebar_position: 16
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderTree" size="lg" /> Atribuir Categorias

Atribua categorias à sua empresa no WhatsApp Business para melhor identificação e classificação.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite atribuir categorias à empresa/companhia no seu perfil do WhatsApp Business. As categorias ajudam os clientes a encontrar e entender melhor o tipo de negócio.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

:::warning Atenção
É possível cadastrar no máximo 3 categorias para a empresa, e é necessário que tenha no mínimo uma.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/categories
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
| `categories` | array[string] | Array com IDs ou labels das categorias a serem atribuídas. Pode ser obtido na API de [Listar Categorias](/docs/whatsapp-business/listar-categorias) |

:::important Importante
Os valores enviados no atributo `categories` devem ser **iguais** aos retornados na requisição de "Listar Categorias", na propriedade `id` ou `label`. A propriedade `id` é útil quando a `label` não for retornada. Somente dessa forma é possível identificar a categoria desejada para ser atribuída.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      categories: ['RESTAURANT', 'FINANCE', '629412378414563'],
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `categories` foi fornecido, se tem pelo menos 1 categoria e no máximo 3, e se os valores correspondem aos IDs/labels retornados pela API de Listar Categorias |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **Mínimo e máximo**: É necessário ter no mínimo 1 categoria e no máximo 3 categorias
- **IDs ou Labels**: Use os valores retornados pela [API de Listar Categorias](/docs/whatsapp-business/listar-categorias) (pode ser `id` ou `label`)
- **Categorias válidas**: Certifique-se de que as categorias existem e estão disponíveis antes de atribuí-las

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Listar Categorias](/docs/whatsapp-business/listar-categorias) - Ver todas as categorias disponíveis
- [Dados da Conta](/docs/whatsapp-business/dados-conta) - Ver todas as informações públicas da conta
- [Alterar Descrição da Empresa](/docs/whatsapp-business/alterar-descricao-empresa) - Atualizar descrição
