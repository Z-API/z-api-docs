---
id: confirmacoes-leitura
title: Confirmações de Leitura
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Confirmações de Leitura

Configure as confirmações de leitura de mensagens (não aplicável a grupos).

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível configurar as confirmações de leitura de mensagens. As confirmações de leitura são as duas marcas azuis (✓✓) que aparecem quando uma mensagem é lida.

:::important Importante
Ao **desabilitar as confirmações de leitura**, você também não pode ver se suas mensagens foram lidas.
:::

**Nota**: Esta configuração não se aplica a grupos, apenas a conversas individuais.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/privacy/read-receipts?value={VALOR_DA_CONFIGURAÇÃO}
```

### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição | Valores Aceitos |
|-----------|------|-------------|-----------|-----------------|
| `value` | string | Sim | Habilitar ou desabilitar as confirmações de leitura | `enable` (habilitar), `disable` (desabilitar) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Habilitar confirmações de leitura**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable
Client-Token: seu-token-de-seguranca
```

**Desabilitar confirmações de leitura**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Habilitar confirmações de leitura
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Confirmações de leitura habilitadas!');
}

// Desabilitar confirmações de leitura
const responseDisable = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

# Habilitar confirmações de leitura
url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {
    "value": "enable"  # ou "disable" para desabilitar
}

response = requests.post(url, headers=headers, params=params)
data = response.json()

if data.get('success'):
    print('Confirmações de leitura configuradas com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Habilitar confirmações de leitura**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Desabilitar confirmações de leitura**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Valores aceitos**: Use `enable` para habilitar ou `disable` para desabilitar as confirmações de leitura
- **Efeito recíproco**: Ao desabilitar as confirmações de leitura, você também não poderá ver se suas mensagens foram lidas
- **Aplicação**: Esta configuração se aplica apenas a conversas individuais, não a grupos
- **Persistência**: A configuração é mantida até que seja alterada novamente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Visualização Online](/docs/privacy/visualizacao-online) - Configurar visibilidade online
- [Visto por Último](/docs/privacy/visto-por-ultimo) - Configurar privacidade de visto por último
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
