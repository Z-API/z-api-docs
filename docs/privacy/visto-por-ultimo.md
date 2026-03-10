---
id: visto-por-ultimo
title: Visto por Último
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Eye" size="lg" /> Visto por Último

Configure quem pode ver seu "visto por último".

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível configurar quem pode ver seu "visto por último". O "visto por último" mostra a última vez que você esteve online no WhatsApp.

**Opções disponíveis**:
- **Todos** (`ALL`): Qualquer pessoa pode ver quando você esteve online pela última vez
- **Ninguém** (`NONE`): Ninguém pode ver quando você esteve online pela última vez
- **Apenas meus contatos** (`CONTACTS`): Apenas pessoas que estão na sua lista de contatos podem ver
- **Apenas meus contatos, exceto...** (`CONTACT_BLACKLIST`): Apenas seus contatos podem ver, exceto os que você adicionar à blacklist

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/last-seen
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
| `visualizationType` | string | Escopo de visualização | `ALL` (Todos podem ver), `NONE` (Ninguém pode ver), `CONTACTS` (Apenas meus contatos), `CONTACT_BLACKLIST` (Apenas meus contatos, exceto...) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `contactsBlacklist` | array[object] | Contatos a serem adicionados ou removidos da blacklist. Deve ser enviado quando o `visualizationType` for `CONTACT_BLACKLIST` |

### Objeto `contactsBlacklist`

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `action` | string | Ação a ser realizada para o contato | `add` (adicionar), `remove` (remover) |
| `phone` | string | Número do contato (formato internacional, sem espaços) | Ex: `554411111111` |

:::important Importante
É importante destacar que a blacklist (lista de contatos não permitidos) é diferente para cada configuração de privacidade, isto é, a blacklist de "visto por último" não é a mesma da "foto do perfil", e assim para todas as configurações que aceitam a blacklist.
:::

:::tip Dica
**Não** é necessário reenviar o atributo `contactsBlacklist` com os contatos já adicionados. Esse parâmetro é somente para **alterações na blacklist**.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Todos podem ver**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "ALL"
}
```

**Apenas contatos, exceto alguns**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "CONTACT_BLACKLIST",
  "contactsBlacklist": [
    { "action": "add", "phone": "554411111111" },
    { "action": "remove", "phone": "554422222222" }
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem ver o visto por último
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      visualizationType: 'ALL', // ou 'NONE', 'CONTACTS', 'CONTACT_BLACKLIST'
      // contactsBlacklist: [  // Opcional, apenas se visualizationType for 'CONTACT_BLACKLIST'
      //   { action: 'add', phone: '554411111111' },
      //   { action: 'remove', phone: '554422222222' }
      // ]
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de visto por último atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Todos podem ver o visto por último
payload = {
    "visualizationType": "ALL"  # ou "NONE", "CONTACTS", "CONTACT_BLACKLIST"
    # "contactsBlacklist": [  # Opcional, apenas se visualizationType for "CONTACT_BLACKLIST"
    #     {"action": "add", "phone": "554411111111"},
    #     {"action": "remove", "phone": "554422222222"}
    # ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de visto por último atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Todos podem ver**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "ALL"
  }'
```

**Apenas contatos, exceto alguns**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "CONTACT_BLACKLIST",
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
| `400` | Dados inválidos | Verifique se `visualizationType` foi fornecido e se o valor é válido |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Blacklist independente**: A blacklist de visto por último é independente das outras configurações de privacidade
- **Alterações na blacklist**: Você só precisa enviar `contactsBlacklist` quando quiser fazer alterações (adicionar ou remover contatos)
- **Formato do telefone**: Use formato internacional sem espaços (ex: `554411111111`)
- **Ações**: Use `add` para adicionar um contato à blacklist e `remove` para removê-lo
- **Visualização online**: A configuração de "visualização online" pode usar a mesma configuração de visto por último (`SAME_LAST_SEEN`)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Visualização Online](/docs/privacy/visualizacao-online) - Configurar visibilidade online
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
- [Visualização de Recado](/docs/privacy/visualizacao-recado) - Configurar privacidade de recado
- [Contatos Não Permitidos](/docs/privacy/contatos-nao-permitidos) - Listar contatos na blacklist
