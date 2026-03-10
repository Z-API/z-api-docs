---
id: cadastrar-codigo-pin
title: Cadastrar Código PIN
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Key" size="lg" /> Cadastrar Código PIN

Cadastre um código PIN de segurança na sua conta do WhatsApp para verificação em duas etapas.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para cadastrar um código PIN de segurança na sua conta do WhatsApp. O código PIN é usado para verificação em duas etapas e aumenta a segurança da sua conta.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

**Importante**:
- O código PIN deve ter pelo menos 6 dígitos
- Escolha um código que você consiga lembrar, mas que seja seguro
- Se você esquecer o código PIN, pode usar a API de [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) se tiver um email cadastrado

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/two-fa-code
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
| `code` | string | Código PIN de segurança a ser cadastrado na conta (geralmente 6 dígitos) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código PIN escolhido
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Código PIN cadastrado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "code": "123456"  # Código PIN escolhido
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Código PIN cadastrado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code" \
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
- **Segurança**: Escolha um código PIN seguro e que você consiga lembrar
- **Durante registro**: Se você já tem código PIN cadastrado, precisará confirmá-lo durante o processo de registro usando a API de [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin)
- **Recuperação**: Se você esquecer o código PIN, pode usar a API de [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) se tiver um email cadastrado
- **Remoção**: Você pode remover o código PIN usando a API de [Remover Código PIN](/docs/mobile/remover-codigo-pin)

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN durante registro
- [Verificar se Possui Código PIN](/docs/mobile/verificar-codigo-pin) - Verificar se a conta possui código PIN
- [Remover Código PIN](/docs/mobile/remover-codigo-pin) - Remover código PIN da conta
- [Recuperação de Código PIN](/docs/mobile/recuperacao-codigo-pin) - Recuperar código PIN esquecido
