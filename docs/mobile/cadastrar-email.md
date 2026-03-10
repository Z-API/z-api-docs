---
id: cadastrar-email
title: Cadastrar Email na Conta
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailPlus" size="lg" /> Cadastrar Email na Conta

Cadastre um email na sua conta do WhatsApp para recuperação do código PIN.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para cadastrar um email na sua conta do WhatsApp. Esse email pode ser utilizado mais tarde para recuperação do código PIN de segurança da sua conta.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

**Fluxo completo**:
1. **Cadastrar Email** (este método) - Cadastrar email na conta
2. Receber código de verificação no email
3. [Verificar Email](/docs/mobile/verificar-email) - Verificar email com o código recebido

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/email
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
| `email` | string | Email a ser cadastrado na sua conta do WhatsApp |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "email": "example@email.com"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      email: 'example@email.com',
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.message === 'VERIFY_EMAIL') {
    console.log('Email cadastrado! Verifique sua caixa de entrada para o código de verificação.');
    // Use o código recebido no email com a API de verificar-email
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "email": "example@email.com"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('message') == 'VERIFY_EMAIL':
        print('Email cadastrado! Verifique sua caixa de entrada para o código de verificação.')
        # Use o código recebido no email com a API de verificar-email
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "email": "example@email.com"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "message": "VERIFY_EMAIL"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Define se a requisição foi executada com sucesso |
| `message` | string | Em caso de sucesso, pode solicitar verificação do email (`VERIFY_EMAIL`). Sendo assim, um email será enviado para o endereço informado na requisição, contendo um código que deve ser usado na API de [Verificar Email](/docs/mobile/verificar-email) para concluir o cadastro. Em caso de falha, retorna uma mensagem a respeito do erro |

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
- **Verificação obrigatória**: Após cadastrar o email, você receberá um código de verificação no email. Use a API de [Verificar Email](/docs/mobile/verificar-email) para concluir o cadastro
- **Recuperação de PIN**: O email cadastrado pode ser usado para recuperação do código PIN usando a API de [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin)
- **Email único**: Cada conta pode ter apenas um email cadastrado

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Verificar Email](/docs/mobile/verificar-email) - Verificar email com código recebido
- [Buscar Email](/docs/mobile/buscar-email) - Ver email cadastrado na conta
- [Remover Email](/docs/mobile/remover-email) - Remover email da conta
- [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) - Usar email para recuperar código PIN
