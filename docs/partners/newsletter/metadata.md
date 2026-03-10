---
id: metadata
title: Metadata do Canal
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Info" size="lg" /> Metadata do Canal

Obtenha informações completas sobre um canal de newsletter, incluindo dados do canal e informações de visualização.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna o metadata do canal com todas as informações do canal e de sua visualização. Inclui dados como nome, descrição, número de seguidores, link de convite, status de verificação e informações sobre como você visualiza o canal (se está mutado, seu papel, etc.).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/newsletter/metadata/{newsletterId}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `newsletterId` | string | ID do canal (deve conter o sufixo `@newsletter`) | `999999999999999999@newsletter` |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/${newsletterId}`,
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log(data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletter_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
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
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID do canal (sempre termina com `@newsletter`) |
| `creationTime` | timestamp | Timestamp da data de criação do canal |
| `state` | string | Estado do canal. Valores possíveis: `"ACTIVE"` (ativo), `"NON_EXISTING"` (não existe) |
| `name` | string | Nome do canal |
| `description` | string | Descrição do canal |
| `subscribersCount` | string | Contagem do número de seguidores do canal |
| `inviteLink` | string | Link de convite do canal |
| `verification` | string | Indica se o canal é verificado ou não. Valores: `"VERIFIED"` (verificado), `"UNVERIFIED"` (não verificado) |
| `picture` | string | URL da imagem do canal (tamanho completo) |
| `preview` | string | URL de preview da imagem do canal (tamanho reduzido) |
| `viewMetadata` | object | Objeto com informações de visualização do canal |
| `viewMetadata.mute` | string | Indica se o canal está mutado ou não. Valores: `"ON"` (mutado), `"OFF"` (não mutado) |
| `viewMetadata.role` | string | Indica se é o proprietário ou seguidor do canal. Valores: `"OWNER"` (proprietário), `"SUBSCRIBER"` (seguidor) |

---

### Estados do Canal

| Estado | Descrição |
|--------|-----------|
| `ACTIVE` | Canal está ativo e funcionando |
| `NON_EXISTING` | Canal não existe ou foi deletado |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto e se contém o sufixo `@newsletter` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Informações de visualização**: O campo `viewMetadata` mostra como você (a instância) visualiza o canal, não informações gerais
- **Link de convite**: Use o `inviteLink` para compartilhar o canal com outras pessoas
- **Verificação**: Canais verificados têm o badge de verificação do WhatsApp

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Listar Canais](/docs/partners/newsletter/listar-canais) - Listar todos os canais da instância
- [Criar Canal](/docs/partners/newsletter/criar-canal) - Criar um novo canal
- [Atualizar Nome](/docs/partners/newsletter/atualizar-nome) - Alterar nome do canal
- [Atualizar Descrição](/docs/partners/newsletter/atualizar-descricao) - Alterar descrição do canal
