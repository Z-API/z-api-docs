---
id: responder-sticker
title: Responder Status com Sticker
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Smile" size="lg" /> Responder Status com Sticker

Envie uma resposta com sticker a um status de outro usuário.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por enviar uma resposta com sticker a um status. Quando você responde a um status com sticker, a resposta é enviada como uma mensagem privada para o autor do status.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker
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
| `phone` | string | Número de quem enviou o status (formato internacional, sem espaços) |
| `sticker` | string | Link do sticker ou seu Base64 |
| `statusMessageId` | string | ID da mensagem do status. Pode ser obtido no webhook de mensagem recebida -> [webhook](../webhooks/ao-receber) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5544999999999',
      sticker: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
      statusMessageId: '1F606398F2ECAA4846269F659B6003A9',
    }),
  }
);

const data = await response.json();
console.log('Resposta enviada:', data.messageId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5544999999999",
    "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
    "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print(f"Resposta enviada: {data.get('messageId')}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
    "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID no Z-API |
| `messageId` | string | ID no WhatsApp |
| `id` | string | Adicionado para compatibilidade com Zapier, tem o mesmo valor do `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone`, `sticker` e `statusMessageId` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do sticker**: Você pode enviar um link (URL) ou Base64 do sticker
- **statusMessageId**: O ID da mensagem do status pode ser obtido no webhook quando você recebe uma notificação de status
- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Mensagem privada**: A resposta é enviada como uma mensagem privada para o autor do status
- **Base64**: Se você tem dúvidas em como enviar um sticker Base64, acesse o tópico mensagens "Enviar Sticker", lá você vai encontrar tudo que precisa saber sobre envio neste formato

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Responder Status com Texto](/docs/status/responder-texto) - Responder status com texto
- [Responder Status com GIF](/docs/status/responder-gif) - Responder status com GIF
- [Enviar Status de Texto](/docs/status/enviando-texto) - Enviar um status de texto
- [Webhooks](/docs/webhooks/ao-receber) - Obter o ID da mensagem do status
