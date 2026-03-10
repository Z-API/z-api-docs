---
id: desvincular-grupos
title: Desvincular Grupos
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Unlink" size="lg" /> Desvincular Grupos

Remova grupos de uma comunidade.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Com essa API você consegue remover grupos de uma comunidade. Para isso, você vai precisar do ID da sua comunidade e os telefones dos grupos que deseja remover.

:::warning Atenção
Uma comunidade deve ter no mínimo 1 grupo vinculado a ela, isso sem contar com o grupo de avisos. Então, caso sua comunidade só possua um grupo comum vinculado, **não será possível removê-lo**.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/unlink
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
| `communityId` | string | ID da comunidade que terá os grupos desvinculados |
| `groupsPhones` | array[string] | Array com os números dos grupos a serem desvinculados (formato: `{id}-group`) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      communityId: '98372465382764532938',
      groupsPhones: ['1345353454354354-group'],
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Grupos desvinculados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "communityId": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Grupos desvinculados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "communityId": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group"]
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
| `400` | Dados inválidos ou tentativa de remover o último grupo | Verifique se `communityId` e `groupsPhones` foram fornecidos corretamente. Lembre-se: uma comunidade deve ter no mínimo 1 grupo comum vinculado |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do telefone**: Use o formato `{id}-group` para os telefones dos grupos (ex: `1345353454354354-group`)
- **Mínimo de grupos**: Uma comunidade deve ter no mínimo 1 grupo comum vinculado (além do grupo de avisos)
- **Grupo de avisos**: O grupo de avisos não pode ser desvinculado da comunidade
- **Permissões**: Apenas administradores da comunidade podem desvincular grupos
- **Grupos independentes**: Após a desvinculação, os grupos continuam existindo como grupos independentes

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Vincular Grupos](/docs/communities/vincular-grupos) - Adicionar grupos à comunidade
- [Metadata da Comunidade](/docs/communities/metadata) - Ver grupos vinculados à comunidade
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
