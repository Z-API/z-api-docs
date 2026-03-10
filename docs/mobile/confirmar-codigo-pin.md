---
id: confirmar-codigo-pin
title: Confirmar Código PIN
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Lock" size="lg" /> Confirmar Código PIN

Confirme o código PIN de verificação em duas etapas para concluir a conexão do número.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para confirmar código PIN da sua conta. Esse método somente é necessário caso você tenha configurado a verificação em duas etapas no WhatsApp. Se esse for o seu caso, é necessário que esse código PIN seja confirmado, caso contrário, não será possível conectar o número em uma instância mobile.

**Quando usar**:
- Após confirmar o código de confirmação, se a resposta contiver `confirmSecurityCode: true`
- Durante o processo de registro de número em instância mobile
- Se sua conta WhatsApp possui verificação em duas etapas ativada

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/confirm-pin-code
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
| `code` | string | Código PIN da verificação em duas etapas (geralmente 6 dígitos) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após confirmar código e receber confirmSecurityCode: true
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código PIN de verificação em duas etapas
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Código PIN confirmado! Instância conectada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após confirmar código e receber confirmSecurityCode: true
payload = {
    "code": "123456"  # Código PIN de verificação em duas etapas
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Código PIN confirmado! Instância conectada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code" \
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

```json
{
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Retorna `true` caso o código tenha sido confirmado corretamente. Feito isso, a instância estará conectada |

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
- **Verificação em duas etapas**: Este método só é necessário se sua conta WhatsApp possui verificação em duas etapas ativada
- **Código PIN**: O código PIN é o mesmo que você configurou no WhatsApp para verificação em duas etapas
- **Conexão**: Após confirmar o código PIN, a instância estará conectada e pronta para uso
- **Esqueceu o PIN**: Se você esqueceu o código PIN, use o método [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Confirmar Código](/docs/mobile/confirmar-codigo) - Confirmar código de confirmação recebido
- [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) - Solicitar recuperação do código PIN
- [Verificar se Possui Código PIN](/docs/mobile/verificar-codigo-pin) - Verificar se a conta possui código PIN cadastrado
- [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin) - Cadastrar código PIN na conta
