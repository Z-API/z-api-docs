---
id: mensagem-ligacao
title: Mensagem de Ligação
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Phone" size="lg" /> Mensagem de Ligação

Defina a mensagem que será enviada após rejeitar uma chamada de voz recebida pela API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através desse método você define a mensagem que será enviada após rejeitar a chamada de voz recebida pela API. Esta mensagem será enviada automaticamente quando uma chamada for rejeitada.

:::important Importante

Para a mensagem ser enviada, o método [Rejeitar Chamadas](/docs/instance/rejeitar-chamadas) precisa estar ativo!

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-call-reject-message
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
| `value` | string | Mensagem de resposta que será enviada após rejeitar a chamada |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "Mensagem de resposta"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'Desculpe, não posso atender no momento. Envie uma mensagem de texto.',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Mensagem de ligação configurada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "Desculpe, não posso atender no momento. Envie uma mensagem de texto."
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Mensagem de ligação configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "Desculpe, não posso atender no momento. Envie uma mensagem de texto."
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
| `value` | boolean | Confirmação da ação (`true` se bem-sucedido) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `PUT` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `value` foi fornecido corretamente (deve ser uma string) |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Pré-requisito**: O método [Rejeitar Chamadas](/docs/instance/rejeitar-chamadas) precisa estar ativo para que a mensagem seja enviada
- **Mensagem personalizada**: Você pode definir qualquer mensagem de texto que será enviada após rejeitar uma chamada
- **Envio automático**: A mensagem será enviada automaticamente quando uma chamada for rejeitada
- **Formato**: A mensagem deve ser uma string de texto simples

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Rejeitar Chamadas](/docs/instance/rejeitar-chamadas) - Configurar rejeição automática de chamadas
- [Configurações da Instância](/docs/instance/introducao) - Outras configurações da instância
