---
id: solicitar-codigo
title: Solicitar Código de Confirmação
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MessageSquare" size="lg" /> Solicitar Código de Confirmação

Solicite o envio do código de confirmação para registrar um número em uma instância mobile.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para solicitar o envio do código de confirmação. Para executar esse método, é necessário que antes você [verifique se o número está disponível](/docs/mobile/verificar-disponibilidade) para ser registrado. Sem antes fazer essa verificação, não será possível solicitar o código.

:::tip Atenção
Não se esqueça que o número de telefone que você deve enviar nesta requisição é o mesmo que você verificou na [API anterior](/docs/mobile/verificar-disponibilidade). Pois lembrando, verificar se o número está disponível é obrigatório para poder solicitar o código de confirmação.
:::

**Métodos de envio disponíveis**:
- **SMS** (`sms`): Código enviado via mensagem de texto
- **Voz** (`voice`): Código enviado via chamada de voz
- **Pop-up no aplicativo** (`wa_old`): Código exibido em pop-up no aplicativo WhatsApp (requer acesso físico ao celular)

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/request-registration-code
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
| `ddi` | string | DDI do número (código do país, ex: `"55"` para Brasil) |
| `phone` | string | Número de telefone que você deseja registrar. Deve incluir apenas o **número com DDD** (Ex: `4499999999`), sem formatação ou máscara |
| `method` | string | Define o método de envio do código. Valores possíveis: `"sms"` (SMS), `"voice"` (chamada de voz), `"wa_old"` (pop-up no aplicativo do WhatsApp) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Solicitar código via SMS**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999",
  "method": "sms"
}
```

**Solicitar código via chamada de voz**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999",
  "method": "voice"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Solicitar código via SMS
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      ddi: '55',
      phone: '4499999999', // Mesmo número usado em verificar-disponibilidade
      method: 'sms', // ou 'voice' ou 'wa_old'
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.captcha) {
    console.log('Captcha necessário! Use a API de responder-captcha.');
    // data.captcha contém a imagem Base64 do captcha
  } else {
    console.log('Código solicitado com sucesso! Aguarde o recebimento.');
  }
} else if (data.blocked) {
  console.log('Número banido. Use o appealToken para solicitar desbanimento.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Solicitar código via SMS
payload = {
    "ddi": "55",
    "phone": "4499999999",  # Mesmo número usado em verificar-disponibilidade
    "method": "sms"  # ou "voice" ou "wa_old"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if 'captcha' in data:
        print('Captcha necessário! Use a API de responder-captcha.')
        # data['captcha'] contém a imagem Base64 do captcha
    else:
        print('Código solicitado com sucesso! Aguarde o recebimento.')
elif data.get('blocked'):
    print('Número banido. Use o appealToken para solicitar desbanimento.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "ddi": "55",
    "phone": "4499999999",
    "method": "sms"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso de sucesso**:

```json
{
  "success": true,
  "retryAfter": "165",
  "smsWaitSeconds": 125,
  "voiceWaitSeconds": 125,
  "waOldWaitSeconds": 125,
  "method": "sms"
}
```

**Caso com captcha necessário**:

```json
{
  "success": false,
  "captcha": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Caso de número banido**:

```json
{
  "success": false,
  "blocked": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Retorna `true` caso a solicitação do código tenha sido enviada com sucesso. Confira se recebeu o código e utilize-o na API de [Confirmar Código](/docs/mobile/confirmar-codigo) |
| `captcha` | string | Base64 de imagem com código captcha. No caso de receber esse atributo, você precisará confirmar esse código na API de [Responder Captcha](/docs/mobile/responder-captcha) para que o código seja de fato enviado. Após confirmação do captcha, não é necessário solicitar o código novamente, apenas aguardar o seu recebimento |
| `blocked` | boolean | Define se o número está banido ou não |
| `retryAfter` | string | Tempo em segundos que deve ser aguardado para nova solicitação do código |
| `smsWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **SMS**. Caso o valor seja `0`, significa que a solicitação já pode ser enviada para este método |
| `voiceWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **chamada de voz**. Mesmo objetivo do `smsWaitSeconds` |
| `waOldWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **pop-up no aplicativo do celular**. Mesmo objetivo do `smsWaitSeconds` |
| `method` | string | Método de envio do código utilizado |

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
- **Verificação obrigatória**: Você deve verificar a disponibilidade do número antes de solicitar o código
- **Número consistente**: Use o mesmo número que foi verificado na API de verificar disponibilidade
- **Captcha**: Se receber `captcha` na resposta, use a API de [Responder Captcha](/docs/mobile/responder-captcha) antes de aguardar o código
- **Tempos de espera**: Respeite os tempos de espera (`smsWaitSeconds`, `voiceWaitSeconds`) antes de solicitar novo código
- **Pop-up no celular**: O método `wa_old` só funciona se você tem acesso físico ao celular onde o número está vinculado

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Verificar se o número está disponível (obrigatório antes)
- [Responder Captcha](/docs/mobile/responder-captcha) - Responder captcha se necessário
- [Confirmar Código](/docs/mobile/confirmar-codigo) - Confirmar código recebido
- [Solicitar Desbanimento](/docs/mobile/solicitar-desbanimento) - Solicitar desbanimento se número estiver banido
