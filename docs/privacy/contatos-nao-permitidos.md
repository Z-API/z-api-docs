---
id: contatos-nao-permitidos
title: Listar Contatos Não Permitidos
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserX" size="lg" /> Listar Contatos Não Permitidos

Liste os contatos que estão na lista de não permitidos (blacklist) para certas interações com sua conta.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível listar os contatos que estão na lista de não permitidos (blacklist) para certas interações com sua conta. A blacklist é usada em várias configurações de privacidade para excluir contatos específicos.

**Escopos disponíveis**:
- **Visto por último** (`lastSeen`): Contatos na blacklist de visto por último
- **Visualizar foto do perfil** (`photo`): Contatos na blacklist de visualização de foto
- **Visualizar recado** (`description`): Contatos na blacklist de visualização de recado
- **Permissão de adicionar em grupos** (`groupAdd`): Contatos na blacklist de permissão para adicionar em grupos

:::important Importante
Cada configuração de privacidade tem sua própria blacklist independente. A blacklist de "visto por último" é diferente da blacklist de "foto do perfil", e assim por diante.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/disallowed-contacts?type={{ESCOPO_DO_BLOQUEIO}}
```

### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição | Valores Aceitos |
|-----------|------|-------------|-----------|-----------------|
| `type` | string | Sim | Escopo do bloqueio | `lastSeen` (Visto por último), `photo` (Visualizar foto do perfil), `description` (Visualizar recado), `groupAdd` (Permissão de adicionar em grupos) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Listar contatos na blacklist de visto por último**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen
Client-Token: seu-token-de-seguranca
```

**Listar contatos na blacklist de foto de perfil**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=photo
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Listar contatos na blacklist de visto por último
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Contatos na blacklist:', data.disallowedContacts);

// Outros tipos: 'photo', 'description', 'groupAdd'
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Listar contatos na blacklist de visto por último
params = {
    "type": "lastSeen"  # ou "photo", "description", "groupAdd"
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print(f"Contatos na blacklist: {data.get('disallowedContacts', [])}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Listar contatos na blacklist de visto por último**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Listar contatos na blacklist de foto de perfil**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=photo" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "disallowedContacts": [
    "554411111111",
    "554422222222"
  ]
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `disallowedContacts` | array[string] | Lista de telefones de cada contato da blacklist (formato internacional, sem espaços) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `400` | Tipo inválido | Verifique se o parâmetro `type` foi fornecido e se o valor é um dos aceitos: `lastSeen`, `photo`, `description`, ou `groupAdd` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Blacklists independentes**: Cada tipo de configuração de privacidade tem sua própria blacklist
- **Tipos disponíveis**: Use `lastSeen` para visto por último, `photo` para foto de perfil, `description` para recado, ou `groupAdd` para permissão de adicionar em grupos
- **Formato dos telefones**: Os telefones são retornados no formato internacional, sem espaços (ex: `554411111111`)
- **Lista vazia**: Se não houver contatos na blacklist, o array `disallowedContacts` estará vazio

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Visto por Último](/docs/privacy/visto-por-ultimo) - Configurar privacidade de visto por último
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
- [Visualização de Recado](/docs/privacy/visualizacao-recado) - Configurar privacidade de recado
- [Permissão para Adicionar em Grupos](/docs/privacy/permissao-adicionar-grupos) - Configurar permissão para adicionar em grupos
