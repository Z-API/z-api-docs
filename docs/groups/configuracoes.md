---
id: configuracoes
title: Configurações do Grupo
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Configurações do Grupo

Altere as preferências e configurações de um grupo através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite você alterar as preferências do grupo. Você pode configurar quem pode enviar mensagens, quem pode alterar configurações, se é necessário aprovação para entrar no grupo, e quem pode adicionar membros.

:::caution Atenção

Somente administradores podem alterar as preferências do grupo.

:::

:::caution Atenção

No dia 4 de novembro de 2021 o WhatsApp alterou o formato da criação de novos grupos:

- **Antes**: `"phone": "5511999999999-1623281429"`
- **Agora**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
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
| `phone` | string | ID/Fone do grupo (formato antigo: `5511999999999-1623281429` ou formato novo: `120363019502650977-group`) |
| `adminOnlyMessage` | boolean | Somente administradores podem enviar mensagens no grupo |
| `adminOnlySettings` | boolean | Atributo para permitir que apenas os admins façam edições no grupo |
| `requireAdminApproval` | boolean | Define se vai ser necessário a aprovação de algum admin para entrar no grupo |
| `adminOnlyAddMember` | boolean | Somente administradores podem adicionar pessoas no grupo |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Formato novo**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
 "phone": "120363019502650977-group",
 "adminOnlyMessage": true,
 "adminOnlySettings": true,
 "requireAdminApproval": false,
 "adminOnlyAddMember": true
}
```

**Formato antigo**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999-1623281429",
  "adminOnlyMessage": true,
  "adminOnlySettings": true,
  "requireAdminApproval": false,
  "adminOnlyAddMember": true
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363019502650977-group', // ou formato antigo: '5511999999999-1623281429'
      adminOnlyMessage: true, // Apenas admins podem enviar mensagens
      adminOnlySettings: true, // Apenas admins podem alterar configurações
      requireAdminApproval: false, // Não requer aprovação para entrar
      adminOnlyAddMember: true, // Apenas admins podem adicionar membros
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Configurações do grupo atualizadas com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363019502650977-group",  # ou formato antigo: "5511999999999-1623281429"
    "adminOnlyMessage": True,  # Apenas admins podem enviar mensagens
    "adminOnlySettings": True,  # Apenas admins podem alterar configurações
    "requireAdminApproval": False,  # Não requer aprovação para entrar
    "adminOnlyAddMember": True  # Apenas admins podem adicionar membros
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Configurações do grupo atualizadas com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Formato novo**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
  "phone": "120363019502650977-group",
  "adminOnlyMessage": true,
  "adminOnlySettings": true,
  "requireAdminApproval": false,
  "adminOnlyAddMember": true
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
| `400` | Dados inválidos | Verifique se todos os atributos obrigatórios foram fornecidos corretamente |
| `403` | Sem permissão | Apenas administradores podem alterar as configurações do grupo |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do grupo**: Use o formato novo (`120363019502650977-group`) ou antigo (`5511999999999-1623281429`)
- **Permissões**: Apenas administradores podem alterar as configurações do grupo
- **Configurações disponíveis**:
  - `adminOnlyMessage`: Se `true`, apenas administradores podem enviar mensagens
  - `adminOnlySettings`: Se `true`, apenas administradores podem alterar configurações
  - `requireAdminApproval`: Se `true`, é necessário aprovação de admin para entrar no grupo
  - `adminOnlyAddMember`: Se `true`, apenas administradores podem adicionar membros
- **Combinações**: Você pode combinar essas configurações conforme suas necessidades

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Atualizar Nome do Grupo](/docs/groups/atualizar-nome) - Alterar o nome do grupo
- [Atualizar Descrição do Grupo](/docs/groups/atualizar-descricao) - Alterar a descrição do grupo
- [Atualizar Foto do Grupo](/docs/groups/atualizar-foto) - Alterar a foto do grupo
- [Metadata do Grupo](/docs/groups/metadata) - Obter informações do grupo
