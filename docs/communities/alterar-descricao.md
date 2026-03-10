---
id: alterar-descricao
title: Alterar Descrição
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Alterar Descrição

Altere a descrição de uma comunidade existente.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite você alterar a descrição da comunidade. A descrição aparece no perfil da comunidade e ajuda os participantes a entenderem o propósito da comunidade.

:::caution Atenção
Atenção: somente administradores podem alterar as preferências da comunidade.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-community-description
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
| `communityDescription` | string | Nova descrição da comunidade |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977",
  "communityDescription": "Nova descrição da comunidade"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363019502650977',
      communityDescription: 'Nova descrição da comunidade',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Descrição da comunidade atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363019502650977",
    "communityDescription": "Nova descrição da comunidade"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Descrição da comunidade atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363019502650977",
    "communityDescription": "Nova descrição da comunidade"
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
| `403` | Sem permissão | Apenas administradores podem alterar a descrição da comunidade |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Permissões**: Apenas administradores da comunidade podem alterar a descrição
- **ID da comunidade**: Use o ID obtido ao listar ou criar comunidades
- **Descrição**: A descrição aparece no perfil da comunidade e ajuda os participantes a entenderem o propósito

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Metadata da Comunidade](/docs/communities/metadata) - Ver a descrição atual da comunidade
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
- [Configurações da Comunidade](/docs/communities/configuracoes) - Alterar outras configurações
