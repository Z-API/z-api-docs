---
id: visualizacao-online
title: Visualização de Online
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Circle" size="lg" /> Visualização de Online

Configure quem pode ver quando você estiver online.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Através deste método, é possível configurar quem pode ver quando você estiver online. O status "online" aparece quando você está usando o WhatsApp no momento.

**Opções disponíveis**:
- **Todos** (`ALL`): Qualquer pessoa pode ver quando você está online
- **Mesma configuração de visto por último** (`SAME_LAST_SEEN`): Usa a mesma configuração que você definiu para "visto por último"

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/online
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `visualizationType` | string | Escopo de visualização | `ALL` (Todos podem ver), `SAME_LAST_SEEN` (Mesma configuração utilizada no "visto por último") |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Todos podem ver**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "ALL"
}
```

**Mesma configuração de visto por último**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "SAME_LAST_SEEN"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem ver quando estiver online
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      visualizationType: 'ALL', // ou 'SAME_LAST_SEEN'
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de visualização online atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "visualizationType": "ALL"  # ou "SAME_LAST_SEEN"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de visualização online atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "ALL"
  }'
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
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `visualizationType` foi fornecido e se o valor é `ALL` ou `SAME_LAST_SEEN` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Valores aceitos**: Use `ALL` para permitir que todos vejam quando você está online, ou `SAME_LAST_SEEN` para usar a mesma configuração de "visto por último"
- **SAME_LAST_SEEN**: Quando usar esta opção, a visualização online seguirá as mesmas regras que você configurou para "visto por último" (incluindo blacklist, se aplicável)
- **Status online**: O status "online" aparece apenas quando você está ativamente usando o WhatsApp

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Visto por Último](/docs/privacy/visto-por-ultimo) - Configurar privacidade de visto por último
- [Visualização de Foto](/docs/privacy/visualizacao-foto-perfil) - Configurar privacidade de foto de perfil
- [Visualização de Recado](/docs/privacy/visualizacao-recado) - Configurar privacidade de recado
