---
id: verificar-codigo-pin
title: Verificar se Possui Código PIN
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="ShieldCheck" size="lg" /> Verificar se Possui Código PIN

Verifique se sua conta WhatsApp possui um código PIN de segurança cadastrado.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para buscar se sua conta possui um código PIN de segurança cadastrado. Útil para verificar se você precisará confirmar o código PIN durante o processo de registro.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/security/two-fa-code
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  if (data.hasCode) {
    console.log('A conta possui código PIN cadastrado.');
  } else {
    console.log('A conta não possui código PIN cadastrado.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()

if data.get('success'):
    if data.get('hasCode'):
        print('A conta possui código PIN cadastrado.')
    else:
        print('A conta não possui código PIN cadastrado.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso com código PIN cadastrado**:

```json
{
  "success": true,
  "hasCode": true
}
```

**Caso sem código PIN cadastrado**:

```json
{
  "success": true,
  "hasCode": false
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Define se a requisição foi executada com sucesso |
| `hasCode` | boolean | Define se a conta possui um código PIN cadastrado |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Instâncias Mobile**: Esta API está disponível apenas para instâncias mobile
- **Verificação em duas etapas**: O código PIN é parte da verificação em duas etapas do WhatsApp
- **Durante registro**: Se `hasCode` for `true`, você precisará confirmar o código PIN após confirmar o código de confirmação
- **Cadastrar PIN**: Se não houver código PIN, você pode cadastrar um usando o método [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN durante registro
- [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin) - Cadastrar código PIN na conta
- [Remover Código PIN](/docs/mobile/remover-codigo-pin) - Remover código PIN da conta
- [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) - Solicitar recuperação do código PIN
