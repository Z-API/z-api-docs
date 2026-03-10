---
id: atualizar-configuracoes
title: Atualizar Configurações do Canal
sidebar_position: 23
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Atualizar Configurações do Canal

Configure as opções de um canal de newsletter, incluindo restrições de reações nas mensagens.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por alterar as configurações de um canal. Atualmente, permite configurar as restrições de reações nas mensagens do canal.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/settings/{newsletterId}
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
| `reactionCodes` | string | Define a restrição de reações nas mensagens. Valores possíveis: `"basic"` (apenas reações básicas) ou `"all"` (qualquer reação) |

### Valores de `reactionCodes`

| Valor | Descrição |
|-------|-----------|
| `basic` | Permite apenas o envio de reações básicas (👍, ❤️, 😂, etc.) |
| `all` | Permite o envio de qualquer reação (incluindo emojis personalizados) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "reactionCodes": "basic"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      reactionCodes: 'basic', // ou 'all'
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "reactionCodes": "basic"  # ou "all"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "reactionCodes": "basic"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "value": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `value` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `reactionCodes` foi fornecido e se o valor é `"basic"` ou `"all"` |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto e se contém o sufixo `@newsletter` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Permissões**: Apenas proprietários e administradores podem alterar as configurações do canal
- **Reações básicas**: O modo `basic` permite apenas reações padrão do WhatsApp
- **Todas as reações**: O modo `all` permite qualquer tipo de reação, incluindo emojis personalizados

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
- [Atualizar Nome](/docs/partners/newsletter/atualizar-nome) - Alterar nome do canal
- [Atualizar Descrição](/docs/partners/newsletter/atualizar-descricao) - Alterar descrição do canal
- [Atualizar Imagem](/docs/partners/newsletter/atualizar-imagem) - Alterar imagem do canal
