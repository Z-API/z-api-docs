---
id: responder-captcha
title: Responder Captcha
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Shield" size="lg" /> Responder Captcha

Responda ao captcha necessário para envio do código de confirmação durante o registro de número.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para responder ao captcha necessário para envio do código de confirmação. Esse método somente se faz necessário se a API de [Solicitar Código](/docs/mobile/solicitar-codigo) responder com o atributo `captcha`, que por sua vez, contém o base64 da imagem com o captcha.

**Fluxo típico**:
1. Verificar disponibilidade do número
2. Solicitar código de confirmação
3. Se retornar `captcha`, responder ao captcha usando este método
4. Aguardar recebimento do código
5. Confirmar código recebido

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/respond-captcha
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
| `captcha` | string | Código captcha para confirmação. Esse captcha é exibido na imagem retornada na solicitação do código de confirmação |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "captcha": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após solicitar código e receber captcha na resposta
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      captcha: '123456', // Código extraído da imagem captcha
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Captcha respondido com sucesso! Aguarde o código de confirmação.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após solicitar código e receber captcha na resposta
payload = {
    "captcha": "123456"  # Código extraído da imagem captcha
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Captcha respondido com sucesso! Aguarde o código de confirmação.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "captcha": "123456"
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
| `success` | boolean | Retorna `true` caso o captcha tenha sido respondido corretamente. Sendo assim, aguarde o recebimento do código de confirmação e utilize-o na API de [Confirmar Código](/docs/mobile/confirmar-codigo) |

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
- **Captcha opcional**: Este método só é necessário se a API de [Solicitar Código](/docs/mobile/solicitar-codigo) retornar o atributo `captcha`
- **Imagem Base64**: O captcha é retornado como uma imagem em Base64 na resposta de solicitar código
- **Próximo passo**: Após responder o captcha com sucesso, aguarde o recebimento do código de confirmação e use o método [Confirmar Código](/docs/mobile/confirmar-codigo)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código de confirmação
- [Confirmar Código](/docs/mobile/confirmar-codigo) - Confirmar código recebido
- [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Verificar se o número está disponível para registro
