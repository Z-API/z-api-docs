---
id: mutar-canal
title: Mutar Canal
sidebar_position: 33
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="VolumeX" size="lg" /> Mutar Canal

Mute um canal de newsletter para parar de receber notificações de novas mensagens.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por mutar um canal. Quando um canal está mutado, você não receberá notificações de novas mensagens, mas ainda poderá visualizar o conteúdo do canal.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/mute-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `id` | string | ID do canal (deve conter o sufixo `@newsletter`) |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter"
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter"
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
| `value` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `PUT` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `id` foi fornecido e se contém o sufixo `@newsletter` |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Notificações**: Quando mutado, você não receberá notificações de novas mensagens
- **Acesso ao conteúdo**: Você ainda poderá visualizar o conteúdo do canal mesmo quando mutado
- **Status**: O status de mute pode ser verificado através do método [Metadata do Canal](/docs/partners/newsletter/metadata) no campo `viewMetadata.mute`

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Desmutar Canal](/docs/partners/newsletter/desmutar-canal) - Reativar notificações do canal
- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
- [Seguir Canal](/docs/partners/newsletter/seguir-canal) - Seguir um canal
- [Deixar de Seguir](/docs/partners/newsletter/deixar-seguir) - Deixar de seguir um canal
