---
id: atualizar-foto
title: Atualizar Foto do Grupo
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Atualizar Foto do Grupo

Altere a imagem de um grupo já existente através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por alterar a imagem de um grupo já existente. Você pode enviar a imagem como URL ou em formato Base64.

:::caution Atenção

No dia 4 de novembro de 2021 o WhatsApp alterou o formato da criação de novos grupos:

- **Antes**: `"phone": "5511999999999-1623281429"`
- **Agora**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-group-photo
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
| `groupId` | string | ID/Fone do grupo (formato antigo: `5511999999999-1623281429` ou formato novo: `120363019502650977-group`) |
| `groupPhoto` | string | URL ou Base64 da imagem |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Com URL**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "120363019502650977-group",
  "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

**Com Base64**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "120363019502650977-group",
  "groupPhoto": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Com URL
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      groupId: '120363019502650977-group',
      groupPhoto: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Foto do grupo atualizada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Com URL
payload = {
    "groupId": "120363019502650977-group",
    "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Foto do grupo atualizada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Com URL**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "groupId": "120363019502650977-group",
    "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
  }'
```

</TabItem>
</Tabs>

:::tip Enviar imagem Base64

Se você tem dúvidas em como enviar uma imagem Base64, acesse o tópico [Enviar Imagem](/docs/messages/imagem), lá você vai encontrar tudo que precisa saber sobre envio neste formato.

:::

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
| `400` | Dados inválidos | Verifique se `groupId` e `groupPhoto` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do grupo**: Use o formato novo (`120363019502650977-group`) ou antigo (`5511999999999-1623281429`)
- **URL ou Base64**: Você pode enviar a imagem como URL ou em formato Base64
- **Base64**: Se usar Base64, inclua o prefixo `data:image/png;base64,` ou `data:image/jpeg;base64,` conforme o tipo da imagem
- **Permissões**: Apenas administradores podem alterar a foto do grupo

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Atualizar Nome do Grupo](/docs/groups/atualizar-nome) - Alterar o nome do grupo
- [Atualizar Descrição do Grupo](/docs/groups/atualizar-descricao) - Alterar a descrição do grupo
- [Configurações do Grupo](/docs/groups/configuracoes) - Alterar configurações do grupo
- [Enviar Imagem](/docs/messages/imagem) - Guia sobre envio de imagens em Base64
