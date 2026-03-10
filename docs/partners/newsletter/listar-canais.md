---
id: listar-canais
title: Listar Canais
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> Listar Canais

Liste todos os canais de newsletter próprios e seguidos pela sua instância.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna uma lista com o metadata dos canais próprios e seguidos com todas as informações do canal e de sua visualização. Inclui canais que você criou (proprietário) e canais que você está seguindo (seguidor).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Canais encontrados:', data.length);
data.forEach(channel => {
  console.log(`- ${channel.name} (${channel.role === 'OWNER' ? 'Proprietário' : 'Seguidor'})`);
});
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(f"Canais encontrados: {len(data)}")
for channel in data:
    role = "Proprietário" if channel['viewMetadata']['role'] == 'OWNER' else "Seguidor"
    print(f"- {channel['name']} ({role})")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
[
  {
    "id": "999999999999999999@newsletter",
    "creationTime": "1695643504",
    "state": "ACTIVE",
    "name": "Z-API",
    "description": "Canal oficial Z-API",
    "subscribersCount": "123",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a",
    "verification": "VERIFIED",
    "picture": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?ccb=11-4&oh=01_AdS-Wk3RSfXmtEqDA4-LTFaZQILXZSprywV8EwNoZPOaGw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "preview": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdRltWYOZftf0cnm-GNw5RRGoxQ53nJR9zzxxot_N7JQCw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "viewMetadata": {
      "mute": "OFF",
      "role": "OWNER"
    }
  },
  {
    "id": "888888888888888888@newsletter",
    "creationTime": "1695237295",
    "state": "ACTIVE",
    "name": "Canal Exemplo",
    "description": "Exemplo",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a123",
    "verification": "UNVERIFIED",
    "picture": null,
    "preview": null,
    "viewMetadata": {
      "mute": "ON",
      "role": "SUBSCRIBER"
    }
  }
]
```

### Campos da Resposta

A resposta é um array de objetos, onde cada objeto representa um canal. Cada objeto contém:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID do canal (sempre termina com `@newsletter`) |
| `creationTime` | timestamp | Timestamp da data de criação do canal |
| `state` | string | Estado do canal. Valores: `"ACTIVE"` (ativo), `"NON_EXISTING"` (não existe) |
| `name` | string | Nome do canal |
| `description` | string | Descrição do canal |
| `subscribersCount` | string | Contagem do número de seguidores do canal |
| `inviteLink` | string | Link de convite do canal |
| `verification` | string | Indica se o canal é verificado. Valores: `"VERIFIED"` (verificado), `"UNVERIFIED"` (não verificado) |
| `picture` | string ou null | URL da imagem do canal (tamanho completo) |
| `preview` | string ou null | URL de preview da imagem do canal (tamanho reduzido) |
| `viewMetadata` | object | Objeto com informações de visualização do canal |
| `viewMetadata.mute` | string | Indica se o canal está mutado. Valores: `"ON"` (mutado), `"OFF"` (não mutado) |
| `viewMetadata.role` | string | Indica seu papel no canal. Valores: `"OWNER"` (proprietário), `"SUBSCRIBER"` (seguidor) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Canais próprios e seguidos**: A lista inclui tanto canais que você criou quanto canais que você está seguindo
- **Role**: Use o campo `viewMetadata.role` para identificar se você é proprietário (`OWNER`) ou seguidor (`SUBSCRIBER`) do canal
- **Estado do canal**: Canais com estado `NON_EXISTING` podem ter sido deletados ou não existem mais
- **Link de convite**: Use o `inviteLink` para compartilhar o canal com outras pessoas

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Canal](/docs/partners/newsletter/criar-canal) - Criar um novo canal
- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações detalhadas de um canal específico
- [Encontrar Canais](/docs/partners/newsletter/encontrar-canais) - Buscar canais disponíveis
- [Seguir Canal](/docs/partners/newsletter/seguir-canal) - Seguir um canal encontrado
