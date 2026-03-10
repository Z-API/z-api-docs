---
id: verificar-email
title: Verificar Email da Conta
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailCheck" size="lg" /> Verificar Email da Conta

Verifique o email cadastrado na sua conta usando o código de verificação recebido.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para realizar verificação do email da conta. Você pode cadastrar um email na sua conta do WhatsApp através da API de [Cadastrar Email](/docs/mobile/cadastrar-email). Após cadastrar, você receberá um código de verificação no email cadastrado. Use este método para verificar o email com o código recebido.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

**Fluxo completo**:
1. [Cadastrar Email](/docs/mobile/cadastrar-email) - Cadastrar email na conta
2. Receber código de verificação no email
3. **Verificar Email** (este método) - Verificar email com o código recebido

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/verify-email
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
| `verificationCode` | string | Código de verificação enviado para o email que foi cadastrado na conta |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "verificationCode": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após receber o código de verificação no email
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      verificationCode: '123456', // Código recebido no email
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Email verificado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após receber o código de verificação no email
payload = {
    "verificationCode": "123456"  # Código recebido no email
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Email verificado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "verificationCode": "123456"
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
| `success` | boolean | Define se a requisição foi executada com sucesso |

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
- **Código de verificação**: O código é enviado para o email cadastrado após usar a API de [Cadastrar Email](/docs/mobile/cadastrar-email)
- **Validade do código**: O código de verificação tem validade limitada. Se expirar, você precisará cadastrar o email novamente
- **Email verificado**: Após verificar o email, você poderá usá-lo para recuperação do código PIN usando a API de [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Cadastrar Email](/docs/mobile/cadastrar-email) - Cadastrar email na conta
- [Buscar Email](/docs/mobile/buscar-email) - Ver email cadastrado e status de verificação
- [Remover Email](/docs/mobile/remover-email) - Remover email da conta
- [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) - Usar email verificado para recuperar código PIN
