---
id: adicionar-participantes
title: Adicionar Participantes
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Adicionar Participantes

Adicione novos participantes a uma comunidade.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por adicionar novos participantes à comunidade. Os participantes adicionados terão acesso à comunidade e aos grupos vinculados.

:::tip Novo atributo
Recentemente, o WhatsApp implementou uma validação para verificar se o número de telefone conectado à API possui o contato do cliente salvo. No entanto, o Z-API desenvolveu uma solução para contornar essa validação, introduzindo um novo recurso chamado **"autoInvite"**.

Agora, quando uma solicitação é enviada para adicionar 10 clientes a um grupo e apenas 5 deles são adicionados com sucesso, a API envia convites privados para os cinco clientes que não foram adicionados. Esses convites permitem que eles entrem na comunidade, mesmo que seus números de telefone não estejam salvos como contatos.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/add-participant
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
| `autoInvite` | boolean | Envia link de convite da comunidade no privado para contatos que não puderam ser adicionados diretamente |
| `phone` | string | ID da comunidade (obtido ao listar ou criar comunidades) |
| `phones` | array[string] | Array com os números dos participantes a serem adicionados (formato internacional, sem espaços) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "autoInvite": true,
  "phone": "120363019502650977",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      autoInvite: true,
      phone: '120363019502650977',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Participantes adicionados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "autoInvite": True,
    "phone": "120363019502650977",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Participantes adicionados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "autoInvite": true,
    "phone": "120363019502650977",
    "phones": ["5544999999999", "5544888888888"]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "value": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `value` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone`, `phones` e `autoInvite` foram fornecidos corretamente |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **autoInvite**: Quando `true`, a API envia convites privados automaticamente para contatos que não puderam ser adicionados diretamente (por exemplo, quando o número não está salvo como contato)
- **Formato do telefone**: Use formato internacional sem espaços (ex: `5544999999999`)
- **Permissões**: Apenas administradores da comunidade podem adicionar participantes
- **Múltiplos participantes**: Você pode adicionar vários participantes de uma vez, enviando um array com os números

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Remover Participantes](/docs/communities/remover-participantes) - Remover participantes da comunidade
- [Promover Admin](/docs/communities/promover-admin) - Promover participantes a administradores
- [Listar Comunidades](/docs/communities/listar) - Obter o ID da comunidade
