---
id: recuperacao-codigo-pin
title: Recuperação de Código PIN
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="KeyRound" size="lg" /> Recuperação de Código PIN

Solicite o envio de email para recuperação do código PIN da sua conta WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para solicitar email para recuperação do código PIN da sua conta. Esse será útil caso você tenha configurado a verificação em duas etapas no WhatsApp e não se lembre mais desse código. Dessa forma, o WhatsApp enviará um link para redefinição de código PIN no email que você vinculou à sua conta do WhatsApp.

**Quando usar**:
- Durante o registro de número, se você esqueceu o código PIN
- Quando precisar redefinir o código PIN de verificação em duas etapas
- Se você não tem acesso ao código PIN configurado

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/recovery-pin-code
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Solicitar recuperação do código PIN
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code',
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
  console.log('Email de recuperação enviado! Verifique sua caixa de entrada.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Email de recuperação enviado! Verifique sua caixa de entrada.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code" \
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
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Retorna `true` caso o email para recuperação tenha sido enviado |

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
- **Email vinculado**: O email de recuperação será enviado para o endereço de email vinculado à sua conta WhatsApp
- **Link de redefinição**: O email conterá um link para redefinir o código PIN
- **Verificação de email**: Certifique-se de que você tem acesso ao email vinculado à conta
- **Tempo de processamento**: O email pode levar alguns minutos para chegar

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN durante registro
- [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin) - Cadastrar novo código PIN
- [Remover Código PIN](/docs/mobile/remover-codigo-pin) - Remover código PIN da conta
- [Verificar se Possui Código PIN](/docs/mobile/verificar-codigo-pin) - Verificar se a conta possui código PIN
