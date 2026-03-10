---
id: deletar-canal
title: Deletar Canal
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Deletar Canal

Remova permanentemente um canal de newsletter.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por deletar um canal. Quando um canal é deletado, ele é removido permanentemente e não poderá ser recuperado.

:::warning Atenção
A operação de deletar um canal é permanente e não pode ser desfeita. Certifique-se de que realmente deseja remover o canal antes de executar esta operação.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE /instances/{instanceId}/token/{token}/delete-newsletter
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
| `id` | string | ID do canal (deve conter o sufixo `@newsletter`) |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter',
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter"
}

response = requests.delete(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "value": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `value` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `DELETE` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `id` foi fornecido e se contém o sufixo `@newsletter` |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Permissões**: Apenas o proprietário do canal pode deletá-lo
- **Remoção permanente**: O canal será removido permanentemente e não poderá ser recuperado
- **Seguidores**: Todos os seguidores perderão acesso ao canal após a deleção

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Canal](/docs/partners/newsletter/criar-canal) - Criar um novo canal
- [Listar Canais](/docs/partners/newsletter/listar-canais) - Ver todos os canais
- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
