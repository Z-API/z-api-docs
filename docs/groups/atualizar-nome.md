---
id: atualizar-nome
title: Atualizar Nome do Grupo
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Atualizar Nome do Grupo

Altere o nome de um grupo já existente através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por alterar o nome de um grupo já existente. O nome do grupo é visível para todos os participantes.

:::caution Atenção

No dia 4 de novembro de 2021 o WhatsApp alterou o formato da criação de novos grupos:

- **Antes**: `"phone": "5511999999999-1623281429"`
- **Agora**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
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
| `groupId` | string | ID/Fone do grupo (formato antigo: `5511999999999-1623281429` ou formato novo: `120363019502650977-group`) |
| `groupName` | string | Nome do grupo a ser atualizado |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Formato novo**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
 "groupId": "120363019502650977-group",
  "groupName": "Mudou o nome Meu grupo no Z-API"
}
```

**Formato antigo**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "5511999999999-1623281429",
  "groupName": "Mudou o nome Meu grupo no Z-API"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      groupId: '120363019502650977-group', // ou formato antigo: '5511999999999-1623281429'
      groupName: 'Mudou o nome Meu grupo no Z-API',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Nome do grupo atualizado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "groupId": "120363019502650977-group",  # ou formato antigo: "5511999999999-1623281429"
    "groupName": "Mudou o nome Meu grupo no Z-API"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Nome do grupo atualizado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Formato novo**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
  "groupId": "120363019502650977-group",
    "groupName": "Mudou o nome Meu grupo no Z-API"
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
| `value` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `groupId` e `groupName` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do grupo**: Use o formato novo (`120363019502650977-group`) ou antigo (`5511999999999-1623281429`)
- **Permissões**: Apenas administradores podem alterar o nome do grupo
- **Visibilidade**: O nome do grupo é visível para todos os participantes
- **Limite de caracteres**: O WhatsApp tem um limite de caracteres para o nome do grupo

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Atualizar Foto do Grupo](/docs/groups/atualizar-foto) - Alterar a foto do grupo
- [Atualizar Descrição do Grupo](/docs/groups/atualizar-descricao) - Alterar a descrição do grupo
- [Configurações do Grupo](/docs/groups/configuracoes) - Alterar configurações do grupo
