---
id: desativar
title: Disable Community
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="XCircle" size="lg" /> Disable Community

Disable an existing community. This will remove all groups from the community, but not delete them.

---

## <Icon name="Info" size="md" /> Conception {#conceituacao}

This method is responsible for disabling a community. When a community is disabled, it will result in the disconnection of all related groups.

:::important Important
It is important to note that disabling the Community **will not delete** its groups, but rather remove them from the **Community** in question. The groups will continue to exist as independent groups.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE /instances/{instanceId}/token/{token}/communities/{idDaComunidade}
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| `idDaComunidade` | string | Yes | ID of the community to be disabled |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/98372465382764532938
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const communityId = '98372465382764532938';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/${communityId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

if (response.ok) {
  console.log('Comunidade desativada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

community_id = "98372465382764532938"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/{community_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.delete(url, headers=headers)

if response.status_code == 200:
    print('Comunidade desativada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/98372465382764532938" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

The successful response does not return a JSON body. The HTTP status code 200 indicates that the operation was successful.

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `DELETE` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Community not found | Check if the `idDaComunidade` is correct |
| `403` | No permission | Only administrators can disable the community |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Groups preserved**: Groups are not deleted, only unlinked from the community
- **Independent groups**: After disabling, groups continue to exist as independent groups
- **Permissions**: Only administrators of the community can disable it
- **Irreversible**: Disabling is permanent. If you need the community again, you will have to create it again

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Community](/docs/communities/criar) - Create a new community
- [List Communities](/docs/communities/listar) - List all communities
- [Community Metadata](/docs/communities/metadata) - Get information about the community