---
id: anular-convite-admin
title: Anular Convite de Admin
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="XCircle" size="lg" /> Anular Convite de Admin

Revogue um convite de administrador enviado para um usuário antes que ele seja aceito.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por anular um convite de administrador de um canal. Use este método quando você enviou um convite mas mudou de ideia ou enviou para o usuário errado.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/revoke-admin-invite/{newsletterId}
```

### Parâmetros de Path

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `instanceId` | string | ID da sua instância | `3C01A3...` |
| `token` | string | Token da instância | `abc123...` |
| `newsletterId` | string | ID do canal (deve conter o sufixo `@newsletter`) | `999999999999999999@newsletter` |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do usuário em que o convite será anulado (formato internacional, sem espaços) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
    }),
  }
);

const data = await response.json();
console.log('Convite anulado com sucesso');
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999"
}

response = requests.post(url, headers=headers, json=payload)
print("Convite anulado com sucesso")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999"
  }'
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
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone` foi fornecido e se o número está no formato correto |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto e se contém o sufixo `@newsletter` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Formato do telefone**: Use formato internacional sem espaços ou caracteres especiais (ex: `5511999999999`)
- **Convites pendentes**: Este método só funciona para convites que ainda não foram aceitos
- **Permissões**: Apenas proprietários e administradores podem anular convites

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Enviar Convite de Admin](/docs/messages/convite-admin-canal) - Enviar convite para ser administrador
- [Aceitar Convite de Admin](/docs/partners/newsletter/aceitar-convite-admin) - Aceitar convite de administrador
- [Promover Administrador](/docs/partners/newsletter/promover-admin) - Promover usuário a administrador diretamente
- [Remover Administrador](/docs/partners/newsletter/remover-admin) - Remover administrador do canal
