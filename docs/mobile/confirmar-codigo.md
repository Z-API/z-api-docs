---
id: confirmar-codigo
title: Confirmar Código
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Confirmar Código

Confirme o código de confirmação recebido para conectar o número à instância mobile.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para confirmar o código que você recebeu. Para utilizar esse método, você precisa concluir as etapas de registro anteriores, que envolvem verificar a disponibilidade de registro do número e solicitar o código de confirmação. Após recebido o código, você pode utilizar essa rota para realizar a confirmação e conexão do número à instância mobile.

**Fluxo completo**:
1. [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Verificar se o número está disponível
2. [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código de confirmação (SMS, voz ou pop-up)
3. Receber código no telefone
4. **Confirmar Código** (este método) - Confirmar o código recebido
5. Se necessário, [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN de verificação em duas etapas

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/confirm-registration-code
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
| `code` | string | Código de confirmação recebido (geralmente 6 dígitos) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após receber o código de confirmação
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código recebido via SMS, voz ou pop-up
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.confirmSecurityCode) {
    console.log('Código confirmado! Agora confirme o código PIN de verificação em duas etapas.');
  } else {
    console.log('Código confirmado! Instância conectada com sucesso!');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após receber o código de confirmação
payload = {
    "code": "123456"  # Código recebido via SMS, voz ou pop-up
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('confirmSecurityCode'):
        print('Código confirmado! Agora confirme o código PIN de verificação em duas etapas.')
    else:
        print('Código confirmado! Instância conectada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "code": "123456"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso 1: Código confirmado e instância conectada**:

```json
{
  "success": true
}
```

**Caso 2: Código confirmado, mas requer confirmação de PIN**:

```json
{
  "success": false,
  "confirmSecurityCode": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Retorna `true` caso o código tenha sido confirmado corretamente. Feito isso, a instância estará conectada |
| `confirmSecurityCode` | boolean | Retorna `true` se for necessário a confirmação do código de verificação em duas etapas. Neste caso, use o método [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) |

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
- **Código PIN**: Se a resposta contiver `confirmSecurityCode: true`, você precisará confirmar o código PIN usando o método [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin)
- **Conexão**: Após confirmar o código (e o PIN, se necessário), a instância estará conectada e pronta para uso
- **Código expirado**: Os códigos de confirmação têm validade limitada. Se o código expirar, solicite um novo código

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Verificar se o número está disponível para registro
- [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código de confirmação
- [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN de verificação em duas etapas
- [Responder Captcha](/docs/mobile/responder-captcha) - Responder captcha se necessário
