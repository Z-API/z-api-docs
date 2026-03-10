---
id: leitura-automatica-status
title: Leitura Automática de Status
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Eye" size="lg" /> Leitura Automática de Status

Ative a leitura automática de todas as publicações de status recebidas pela API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Esse método ativa a leitura automática de todas as publicações de status recebidas pela API. Quando habilitado, todos os status recebidos serão marcados como lidos automaticamente.

:::caution Atenção

Para que funcione você deve ter a [Leitura automática](/docs/instance/leitura-automatica) habilitada.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-auto-read-status
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
| `value` | boolean | `true` para ativar a leitura automática de status, `false` para desativar |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Ativar**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": true
}
```

**Desativar**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": false
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Ativar leitura automática de status
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: true, // ou false para desativar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Leitura automática de status ativada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Ativar leitura automática de status
payload = {
    "value": True  # ou False para desativar
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Leitura automática de status ativada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Ativar**:

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": true
  }'
```

**Desativar**:

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": false
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
| `400` | Dados inválidos | Verifique se `value` foi fornecido corretamente (deve ser `true` ou `false`) |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Pré-requisito**: Você deve ter a [Leitura automática](/docs/instance/leitura-automatica) habilitada para que este recurso funcione
- **Ativação**: Use `value: true` para ativar a leitura automática de status
- **Desativação**: Use `value: false` para desativar a leitura automática de status
- **Status recebidos**: Quando ativado, todos os status recebidos serão marcados como lidos automaticamente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Leitura Automática](/docs/instance/leitura-automatica) - Configurar leitura automática geral
- [Status](/docs/status/introducao) - Documentação sobre status/stories
