---
id: buscar-email
title: Buscar Email da Conta
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Mail" size="lg" /> Buscar Email da Conta

Recupere o email configurado na conta do WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para buscar o email configurado na conta do WhatsApp. Útil para verificar qual email está vinculado à conta e se ele foi verificado.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/security/email
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
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  if (data.hasEmail) {
    console.log(`Email: ${data.email}`);
    console.log(`Verificado: ${data.verified ? 'Sim' : 'Não'}`);
  } else {
    console.log('Nenhum email configurado na conta.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()

if data.get('success'):
    if data.get('hasEmail'):
        print(f"Email: {data['email']}")
        print(f"Verificado: {'Sim' if data['verified'] else 'Não'}")
    else:
        print('Nenhum email configurado na conta.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso com email configurado e verificado**:

```json
{
  "success": true,
  "hasEmail": true,
  "email": "example@email.com",
  "verified": true
}
```

**Caso com email configurado mas não verificado**:

```json
{
  "success": true,
  "hasEmail": true,
  "email": "example@email.com",
  "verified": false
}
```

**Caso sem email configurado**:

```json
{
  "success": true,
  "hasEmail": false
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Define se a requisição foi executada com sucesso |
| `hasEmail` | boolean | Define se a conta tem um email configurado |
| `email` | string | Email configurado na conta (apenas se `hasEmail` for `true`) |
| `verified` | boolean | Define se o email foi verificado (apenas se `hasEmail` for `true`) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Instâncias Mobile**: Esta API está disponível apenas para instâncias mobile
- **Email não verificado**: Se o email não estiver verificado, você pode usar o método [Verificar Email](/docs/mobile/verificar-email) para verificar
- **Sem email**: Se não houver email configurado, você pode usar o método [Cadastrar Email](/docs/mobile/cadastrar-email) para configurar

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Cadastrar Email](/docs/mobile/cadastrar-email) - Configurar email na conta
- [Verificar Email](/docs/mobile/verificar-email) - Verificar email da conta
- [Remover Email](/docs/mobile/remover-email) - Remover email da conta
