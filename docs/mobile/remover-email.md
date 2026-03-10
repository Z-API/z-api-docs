---
id: remover-email
title: Remover Email da Conta
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailMinus" size="lg" /> Remover Email da Conta

Remova o email configurado na sua conta do WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para remover o email configurado na sua conta do WhatsApp. Após a remoção, você não poderá mais usar esse email para recuperação do código PIN.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/email/remove
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Email removido com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Email removido com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "message": "REMOVED"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Define se a requisição foi executada com sucesso |
| `message` | string | Em caso de falha, retorna uma mensagem a respeito do erro. Em caso de sucesso, pode retornar uma confirmação como `"REMOVED"` |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `400` | Requisição inválida | Verifique se os dados que você está enviando estão de acordo com o documentado acima |
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Instâncias Mobile**: Esta API está disponível apenas para instâncias mobile
- **Recuperação de PIN**: Após remover o email, você não poderá mais usar esse email para recuperação do código PIN
- **Re-cadastro**: Você pode cadastrar um novo email usando a API de [Cadastrar Email](/docs/mobile/cadastrar-email)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Cadastrar Email](/docs/mobile/cadastrar-email) - Cadastrar email na conta
- [Buscar Email](/docs/mobile/buscar-email) - Ver email cadastrado na conta
- [Verificar Email](/docs/mobile/verificar-email) - Verificar email da conta
