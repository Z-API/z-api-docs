---
id: vincular-grupos
title: Vincular Grupos
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Link" size="lg" /> Vincular Grupos

Adicione grupos existentes a uma comunidade.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Com essa API você consegue adicionar outros grupos a uma comunidade. Para isso, você vai precisar do ID da sua comunidade e os telefones dos grupos que deseja adicionar.

:::warning Atenção
É importante lembrar que **não é possível vincular o mesmo grupo em mais de uma comunidade**. Caso você informe 3 grupos para adicionar onde 1 já esteja em uma comunidade, 2 serão adicionados e o outro retornará na resposta que já faz parte de outra comunidade.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/link
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
| `phone` | string | ID da comunidade que terá os grupos adicionados |
| `groupsPhones` | array[string] | Array com os números dos grupos a serem vinculados (formato: `{id}-group`) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '98372465382764532938',
      groupsPhones: ['1345353454354354-group', '1203634230225498-group'],
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Grupos vinculados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Grupos vinculados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
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
| `400` | Dados inválidos | Verifique se `phone` e `groupsPhones` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do telefone**: Use o formato `{id}-group` para os telefones dos grupos (ex: `1345353454354354-group`)
- **Grupos já vinculados**: Se um grupo já estiver vinculado a outra comunidade, ele não será vinculado e a API retornará sucesso apenas para os grupos que puderam ser vinculados
- **Limite de grupos**: Uma comunidade pode ter até 50 grupos vinculados
- **Permissões**: Apenas administradores da comunidade podem vincular grupos

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Desvincular Grupos](/docs/communities/desvincular-grupos) - Remover grupos da comunidade
- [Metadata da Comunidade](/docs/communities/metadata) - Ver grupos vinculados à comunidade
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
