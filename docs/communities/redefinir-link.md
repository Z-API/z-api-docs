---
id: redefinir-link
title: Redefinir Link de Convite
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="RefreshCw" size="lg" /> Redefinir Link de Convite

Redefina o link de convite de uma comunidade.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite que você redefina o link de convite de uma comunidade. Quando você redefine o link, o link anterior deixa de funcionar e um novo link é gerado.

:::important Importante
Após redefinir o link, o link anterior deixa de funcionar. Certifique-se de compartilhar o novo link com os participantes que deseja adicionar à comunidade.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/redefine-invitation-link/{idDaComunidade}
```

### Parâmetros de URL

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `idDaComunidade` | string | Sim | ID/Fone da comunidade (obtido ao listar ou criar comunidades) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/120363019502650977
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const idDaComunidade = '120363019502650977';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/${idDaComunidade}`,
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.invitationLink) {
  console.log('Novo link de convite:', data.invitationLink);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

id_da_comunidade = "120363019502650977"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/{id_da_comunidade}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('invitationLink'):
    print(f"Novo link de convite: {data['invitationLink']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/120363019502650977" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "invitationLink": "https://chat.whatsapp.com/C1adgkdEGki7554BWDdMkd"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `invitationLink` | string | Novo link de convite da comunidade |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Comunidade não encontrada | Verifique se o `idDaComunidade` está correto |
| `403` | Sem permissão | Apenas administradores podem redefinir o link de convite |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Link anterior**: O link anterior deixa de funcionar após a redefinição
- **Novo link**: O novo link é retornado na resposta e deve ser compartilhado com os participantes
- **Permissões**: Apenas administradores da comunidade podem redefinir o link de convite
- **Formato do link**: O link retornado segue o formato `https://chat.whatsapp.com/{codigo}`

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Adicionar Participantes](/docs/communities/adicionar-participantes) - Adicionar participantes usando o link de convite
- [Metadata da Comunidade](/docs/communities/metadata) - Obter informações sobre a comunidade
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
