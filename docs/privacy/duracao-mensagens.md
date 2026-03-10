---
id: duracao-mensagens
title: Duração das Mensagens
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Duração das Mensagens

Configure mensagens temporárias para novas conversas individuais, definindo uma duração.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível configurar mensagens temporárias para **novas conversas individuais**, definindo uma duração. Não afeta conversas já existentes.

**Durações disponíveis**:
- **90 dias** (`days90`): Mensagens expiram após 90 dias
- **7 dias** (`days7`): Mensagens expiram após 7 dias
- **24 horas** (`hours24`): Mensagens expiram após 24 horas
- **Desativado** (`disable`): Desativa a expiração das mensagens (mensagens permanecem indefinidamente)

:::important Importante
Esta configuração se aplica apenas a **novas conversas individuais**. Conversas já existentes não são afetadas.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/messages-duration?value={{VALOR_DA_DURAÇÃO}}
```

### Parâmetros de Query

| Parâmetro | Tipo | Obrigatório | Descrição | Valores Aceitos |
|-----------|------|-------------|-----------|-----------------|
| `value` | string | Sim | Tempo da duração das mensagens | `days90` (90 dias), `days7` (7 dias), `hours24` (24 horas), `disable` (desativar) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**90 dias**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90
Client-Token: seu-token-de-seguranca
```

**7 dias**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days7
Client-Token: seu-token-de-seguranca
```

**24 horas**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=hours24
Client-Token: seu-token-de-seguranca
```

**Desativar**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=disable
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Configurar duração para 90 dias
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Duração das mensagens configurada!');
}

// Outros valores: 'days7', 'hours24', 'disable'
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Configurar duração para 90 dias
params = {
    "value": "days90"  # ou "days7", "hours24", "disable"
}

response = requests.post(url, headers=headers, params=params)
data = response.json()

if data.get('success'):
    print('Duração das mensagens configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**90 dias**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90" \
  -H "Client-Token: seu-token-de-seguranca"
```

**7 dias**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days7" \
  -H "Client-Token: seu-token-de-seguranca"
```

**24 horas**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=hours24" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Desativar**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=disable" \
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
| `400` | Valor inválido | Verifique se o valor do parâmetro `value` é um dos aceitos: `days90`, `days7`, `hours24`, ou `disable` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Novas conversas**: Esta configuração se aplica apenas a novas conversas individuais criadas após a configuração
- **Conversas existentes**: Conversas já existentes não são afetadas por esta configuração
- **Valores aceitos**: Use `days90` para 90 dias, `days7` para 7 dias, `hours24` para 24 horas, ou `disable` para desativar a expiração
- **Grupos**: Esta configuração não se aplica a grupos

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Confirmações de Leitura](/docs/privacy/confirmacoes-leitura) - Configurar confirmações de leitura
- [Visto por Último](/docs/privacy/visto-por-ultimo) - Configurar privacidade de visto por último
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
