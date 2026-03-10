---
id: atualizar-todos
title: Atualizar Todos os Webhooks
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Webhook" size="lg" /> Atualizar Todos os Webhooks

Altere todos os webhooks para a mesma URL de uma só vez através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Esse endpoint serve para você que deseja alterar todos os webhooks para a mesma URL de uma só vez. Isso é útil quando você quer configurar todos os webhooks da sua instância para apontar para o mesmo endpoint.

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-every-webhooks
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
| `value` | string | Endpoint do webhook (deve ser HTTPS) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `notifySentByMe` | boolean | Ativar webhook de mensagens recebidas e enviadas por mim (padrão: `false`) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Atualizar todos os webhooks**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
  "notifySentByMe": true
}
```

**Atualizar sem notificar mensagens enviadas por mim**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status',
      notifySentByMe: true, // Opcional: ativar webhook de mensagens enviadas por mim
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Todos os webhooks atualizados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
    "notifySentByMe": True  # Opcional: ativar webhook de mensagens enviadas por mim
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Todos os webhooks atualizados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
    "notifySentByMe": true
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
| `value` | boolean | Confirmação da ação (`true` se bem-sucedido, `false` em caso de falha) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `PUT` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `value` foi fornecido corretamente e se a URL é HTTPS |
| `400` | URL inválida | A URL deve ser HTTPS. URLs HTTP não são aceitas |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **HTTPS obrigatório**: O Z-API não aceita webhooks que não sejam HTTPS. Certifique-se de que sua URL comece com `https://`
- **Todos os webhooks**: Este endpoint atualiza todos os webhooks da instância para a mesma URL
- **notifySentByMe**: Se `true`, você receberá webhooks de mensagens recebidas e enviadas por você. Se `false` ou não fornecido, apenas mensagens recebidas serão notificadas
- **Substituição**: Esta operação substitui a URL de todos os webhooks configurados anteriormente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Introdução aos Webhooks](/docs/webhooks/webhooksConf/introduction) - Configuração de webhooks
- [Atualizar Webhook de Recebimento](/docs/webhooks/webhooksConf/update-webhook-receive) - Atualizar webhook de recebimento
- [Atualizar Webhook de Status](/docs/webhooks/webhooksConf/update-webhook-message-status) - Atualizar webhook de status de mensagem
- [Webhooks](/docs/webhooks/introducao) - Documentação completa sobre webhooks
