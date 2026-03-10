---
id: convite-admin-canal
title: Enviar Convite de Admin do Canal
sidebar_position: 34
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Enviar Convite de Admin do Canal

Envie mensagens convidando pessoas para serem administradoras dos seus canais no WhatsApp através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Neste método você poderá enviar mensagens convidando pessoas para serem administradoras dos seus canais no WhatsApp. O destinatário receberá uma mensagem especial com um botão para aceitar ou recusar o convite.

**Fluxo do convite**:
1. Você envia o convite através desta API
2. O destinatário recebe uma mensagem com o convite
3. O destinatário pode aceitar ou recusar o convite
4. Você receberá notificações via webhook sobre a resposta do convite

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-newsletter-admin-invite
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
| `phone` | string | Telefone do destinatário no formato DDI DDD NÚMERO. **IMPORTANTE**: Envie somente números, sem formatação ou máscara. Ex: `551199999999` |
| `adminInviteMessage` | object | Objeto com os dados necessários para o envio da mensagem de convite |

### adminInviteMessage (Objeto)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `newsletterId` | string | ID do canal o qual pertence o convite. Ex: `999999999999999999@newsletter` |
| `caption` | string | Texto da mensagem de convite |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "adminInviteMessage": {
    "newsletterId": "120363166555745933@newsletter",
    "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
  }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      adminInviteMessage: {
        newsletterId: '120363166555745933@newsletter',
        caption: 'Quero convidar você para ser admin do meu canal no WhatsApp.',
      },
    }),
  }
);

const data = await response.json();
console.log('Convite enviado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999",
    "adminInviteMessage": {
        "newsletterId": "120363166555745933@newsletter",
        "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
    }
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Convite enviado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "adminInviteMessage": {
      "newsletterId": "120363166555745933@newsletter",
      "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
    }
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
| `id` | string | Adicionado para compatibilidade com Zapier, ele tem o mesmo valor do `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone` e `adminInviteMessage` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **newsletterId**: Use o ID do canal no formato `999999999999999999@newsletter`
- **Formato do telefone**: Use formato DDI DDD NÚMERO sem formatação (ex: `5511999999999`)
- **Caption**: O texto do convite será exibido na mensagem enviada ao destinatário
- **Notificações**: Você receberá notificações via webhook quando o convite for aceito, recusado ou quando o admin for promovido/removido
- **Permissões**: Apenas o dono do canal pode enviar convites de admin

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Webhook - Convite Admin de Canal](/docs/webhooks/ao-receber#exemplo-de-retorno-de-convite-admin-de-canal) - Receber notificações de convites de admin
- [Webhook - Admin Promovido](/docs/webhooks/ao-receber#exemplo-de-admin-promovido-a-um-canal) - Receber notificações de admin promovido
- [Webhook - Admin Removido](/docs/webhooks/ao-receber#exemplo-de-admin-removido-de-um-canal) - Receber notificações de admin removido
- [Promover Admin](/docs/partners/newsletter/promover-admin) - Promover um admin diretamente
- [Aceitar Convite Admin](/docs/partners/newsletter/aceitar-convite-admin) - Aceitar um convite de admin
