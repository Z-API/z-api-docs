---
id: remover-codigo-pin
title: Remover Código PIN
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="KeyRound" size="lg" /> Remover Código PIN

Remova o código PIN de segurança da sua conta do WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para remover o código PIN de segurança da conta. Após a remoção, você não precisará mais confirmar o código PIN durante o processo de registro.

:::caution Atenção
Essa API está disponível apenas para instâncias mobile.
:::

**Importante**:
- Após remover o código PIN, a verificação em duas etapas será desativada
- Você pode cadastrar um novo código PIN usando a API de [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin)
- A remoção do código PIN reduz a segurança da conta

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/two-fa-code/remove
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove',
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
  console.log('Código PIN removido com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Código PIN removido com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove" \
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
| `success` | boolean | Define se a requisição foi executada com sucesso |
| `message` | string | Em caso de falha, retorna uma mensagem a respeito do erro |

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
- **Segurança**: A remoção do código PIN reduz a segurança da conta. Considere manter o código PIN ativado
- **Re-cadastro**: Você pode cadastrar um novo código PIN usando a API de [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin)
- **Durante registro**: Após remover o código PIN, você não precisará mais confirmá-lo durante o processo de registro

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Cadastrar Código PIN](/docs/mobile/cadastrar-codigo-pin) - Cadastrar código PIN na conta
- [Verificar se Possui Código PIN](/docs/mobile/verificar-codigo-pin) - Verificar se a conta possui código PIN
- [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN durante registro
