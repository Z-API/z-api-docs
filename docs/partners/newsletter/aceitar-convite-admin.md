---
id: aceitar-convite-admin
title: Aceitar Convite de Admin
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Aceitar Convite de Admin

Aceite um convite para ser administrador de um canal de newsletter.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por aceitar um convite para ser administrador de um canal. Esse convite é uma mensagem que você pode [enviar](/docs/messages/convite-admin-canal) ou receber através do [webhook de mensagem recebida](/docs/webhooks/ao-receber#exemplo-de-retorno-de-convite-admin-de-canal).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/accept-admin-invite/{newsletterId}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `newsletterId` | string | ID do canal ao qual pertence o convite (deve conter o sufixo `@newsletter`) | `120363166555745933@newsletter` |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '120363166555745933@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

if (response.status === 201) {
  console.log('Convite aceito com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '120363166555745933@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/{newsletter_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
if response.status_code == 201:
    print("Convite aceito com sucesso!")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

A resposta de sucesso não retorna um body, apenas o status code `201`.

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Canal não encontrado ou convite inválido | Verifique se o ID do canal está correto, se contém o sufixo `@newsletter` e se você recebeu um convite válido |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Convite válido**: Você só pode aceitar convites que foram enviados para você
- **Webhook**: Quando você recebe um convite, ele vem através do [webhook de mensagem recebida](/docs/webhooks/ao-receber#exemplo-de-retorno-de-convite-admin-de-canal)
- **Permissões**: Após aceitar, você terá permissões de administrador no canal

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Enviar Convite de Admin](/docs/messages/convite-admin-canal) - Enviar convite para ser administrador
- [Anular Convite de Admin](/docs/partners/newsletter/anular-convite-admin) - Anular convite pendente
- [Promover Administrador](/docs/partners/newsletter/promover-admin) - Promover usuário a administrador diretamente
- [Remover Administrador](/docs/partners/newsletter/remover-admin) - Remover administrador do canal
- [Webhook - Mensagem Recebida](/docs/webhooks/ao-receber) - Ver exemplos de convites recebidos
