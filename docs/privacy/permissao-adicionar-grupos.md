---
id: permissao-adicionar-grupos
title: Permissão para Adicionar em Grupos
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Users" size="lg" /> Permissão para Adicionar em Grupos

Configure quem pode te adicionar em grupos.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível configurar quem pode te adicionar em grupos. Esta configuração controla quem tem permissão para adicionar você a grupos do WhatsApp.

**Opções disponíveis**:
- **Todos** (`ALL`): Qualquer pessoa pode adicionar você em grupos
- **Apenas meus contatos** (`CONTACTS`): Apenas pessoas que estão na sua lista de contatos podem adicionar você
- **Apenas meus contatos, exceto...** (`CONTACT_BLACKLIST`): Apenas seus contatos podem adicionar você, exceto os que você adicionar à blacklist

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/group-add
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `type` | string | Escopo da permissão | `ALL` (Todos podem adicionar), `CONTACTS` (Apenas meus contatos), `CONTACT_BLACKLIST` (Apenas meus contatos, exceto...) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `contactsBlacklist` | array[object] | Contatos a serem adicionados ou removidos da blacklist. Deve ser enviado quando o `type` for `CONTACT_BLACKLIST` |

### Objeto `contactsBlacklist`

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `action` | string | Ação a ser realizada para o contato | `add` (adicionar), `remove` (remover) |
| `phone` | string | Número do contato (formato internacional, sem espaços) | Ex: `554411111111` |

:::important Importante
É importante destacar que a blacklist (lista de contatos não permitidos) é diferente para cada configuração de privacidade, isto é, a blacklist de "visto por último" não é a mesma da "permissão para adicionar em grupos", e assim para todas as configurações que aceitam a blacklist.
:::

:::tip Dica
**Não** é necessário reenviar o atributo `contactsBlacklist` com os contatos já adicionados. Esse parâmetro é somente para **alterações na blacklist**.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Todos podem adicionar**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "type": "ALL"
}
```

**Apenas contatos, exceto alguns**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "type": "CONTACT_BLACKLIST",
  "contactsBlacklist": [
    { "action": "add", "phone": "554411111111" },
    { "action": "remove", "phone": "554422222222" }
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem adicionar você em grupos
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      type: 'ALL', // ou 'CONTACTS', 'CONTACT_BLACKLIST'
      // contactsBlacklist: [  // Opcional, apenas se type for 'CONTACT_BLACKLIST'
      //   { action: 'add', phone: '554411111111' },
      //   { action: 'remove', phone: '554422222222' }
      // ]
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de permissão para adicionar em grupos atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Todos podem adicionar você em grupos
payload = {
    "type": "ALL"  # ou "CONTACTS", "CONTACT_BLACKLIST"
    # "contactsBlacklist": [  # Opcional, apenas se type for "CONTACT_BLACKLIST"
    #     {"action": "add", "phone": "554411111111"},
    #     {"action": "remove", "phone": "554422222222"}
    # ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de permissão para adicionar em grupos atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Todos podem adicionar**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "type": "ALL"
  }'
```

**Apenas contatos, exceto alguns**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "type": "CONTACT_BLACKLIST",
    "contactsBlacklist": [
      {"action": "add", "phone": "554411111111"},
      {"action": "remove", "phone": "554422222222"}
    ]
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
| `success` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `type` foi fornecido e se o valor é válido |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Blacklist independente**: A blacklist de permissão para adicionar em grupos é independente das outras configurações de privacidade
- **Alterações na blacklist**: Você só precisa enviar `contactsBlacklist` quando quiser fazer alterações (adicionar ou remover contatos)
- **Formato do telefone**: Use formato internacional sem espaços (ex: `554411111111`)
- **Ações**: Use `add` para adicionar um contato à blacklist e `remove` para removê-lo
- **Proteção**: Esta configuração ajuda a evitar ser adicionado em grupos indesejados

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Visto por Último](/docs/privacy/visto-por-ultimo) - Configurar privacidade de visto por último
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
- [Visualização de Recado](/docs/privacy/visualizacao-recado) - Configurar privacidade de recado
- [Contatos Não Permitidos](/docs/privacy/contatos-nao-permitidos) - Listar contatos na blacklist
