---
id: editar-etiqueta
title: Editar Etiqueta
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagEdit" size="lg" /> Editar Etiqueta

Atualize o nome ou a cor de uma etiqueta existente no seu WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite editar uma etiqueta existente, alterando seu nome e/ou cor. Útil para ajustar a organização das suas etiquetas conforme suas necessidades mudam.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{ID_DA_ETIQUETA}}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `tagId` | string | ID da etiqueta a ser editada | `10` |

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
| `name` | string | Novo nome da etiqueta |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `color` | number | Chave (índice) da nova cor desejada. Este valor deve ser definido de acordo com as cores disponíveis, as quais podem ser encontradas na [API de Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Editar apenas o nome**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta"
}
```

**Editar nome e cor**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta",
  "color": 2
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const tagId = '10';

// Editar apenas o nome
const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/${tagId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome da etiqueta',
      // color: 2  // Opcional: adicione a cor se desejar alterar
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

tag_id = '10'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/{tag_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Editar apenas o nome
payload = {
    "name": "Nome da etiqueta"
    # "color": 2  # Opcional: adicione a cor se desejar alterar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Editar apenas o nome**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta"
  }'
```

**Editar nome e cor**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta",
    "color": 2
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

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
| `400` | Dados inválidos | Verifique se o `name` foi fornecido e se `color` (se fornecido) é um número válido |
| `404` | Etiqueta não encontrada | Verifique se o `tagId` existe |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **ID da etiqueta**: Use o ID retornado ao criar a etiqueta ou obtenha-o através da [API de Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas)
- **Cores disponíveis**: Use a [API de Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) para ver quais cores estão disponíveis
- **Atualização parcial**: Você pode atualizar apenas o nome ou apenas a cor, não é necessário fornecer ambos

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Etiqueta](/docs/whatsapp-business/criar-etiqueta) - Criar uma nova etiqueta
- [Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas) - Listar todas as etiquetas
- [Deletar Etiqueta](/docs/whatsapp-business/deletar-etiqueta) - Remover uma etiqueta
- [Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) - Ver cores disponíveis
