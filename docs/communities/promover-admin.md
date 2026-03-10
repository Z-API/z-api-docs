---
id: promover-admin
title: Promover Admin
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserCog" size="lg" /> Promover Admin

Promova participantes da comunidade a administradores.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por promover participantes da comunidade à administradores. Você pode promover um ou mais participantes à administrador de uma vez.

Administradores têm permissões especiais, como:
- Gerenciar configurações da comunidade
- Adicionar e remover grupos
- Adicionar e remover participantes
- Promover e remover outros administradores

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/add-admin
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
| `phone` | string | ID/Fone da comunidade (obtido ao listar ou criar comunidades) |
| `phones` | array[string] | Array com os números dos participantes a serem promovidos (formato internacional, sem espaços) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363186053925765",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363186053925765',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Participantes promovidos a administradores!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363186053925765",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Participantes promovidos a administradores!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363186053925765",
    "phones": ["5544999999999", "5544888888888"]
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
| `400` | Dados inválidos | Verifique se `phone` e `phones` foram fornecidos corretamente |
| `403` | Sem permissão | Apenas administradores podem promover outros administradores |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Permissões**: Apenas administradores da comunidade podem promover outros administradores
- **Múltiplos participantes**: Você pode promover vários participantes de uma vez, enviando um array com os números
- **Permissões de admin**: Administradores têm acesso a todas as funcionalidades de gerenciamento da comunidade

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Remover Admin](/docs/communities/remover-admin) - Remover administradores da comunidade
- [Adicionar Participantes](/docs/communities/adicionar-participantes) - Adicionar participantes à comunidade
- [Listar Comunidades](/docs/communities/listar) - Obter o ID da comunidade
