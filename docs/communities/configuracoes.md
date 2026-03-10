---
id: configuracoes
title: Configurações da Comunidade
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Configurações da Comunidade

Altere as configurações de uma comunidade, como quem pode adicionar novos grupos.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Com essa API você consegue alterar as configurações de uma comunidade. Atualmente, é possível configurar quem pode adicionar novos grupos à comunidade: apenas administradores ou todos os participantes.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/settings
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição | Valores Aceitos |
|----------|------|-----------|-----------------|
| `phone` | string | ID da comunidade que terá as configurações alteradas | ID obtido ao listar ou criar comunidades |
| `whoCanAddNewGroups` | string | Configuração de quem pode adicionar novos grupos à comunidade | `admins` (apenas administradores), `all` (todos os participantes) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Apenas administradores podem adicionar grupos**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "whoCanAddNewGroups": "admins"
}
```

**Todos podem adicionar grupos**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "whoCanAddNewGroups": "all"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Apenas administradores podem adicionar grupos
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '98372465382764532938',
      whoCanAddNewGroups: 'admins', // ou 'all'
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configurações da comunidade atualizadas!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Apenas administradores podem adicionar grupos
payload = {
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "admins"  # ou "all"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configurações da comunidade atualizadas!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Apenas administradores podem adicionar grupos**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "admins"
  }'
```

**Todos podem adicionar grupos**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "all"
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
| `success` | boolean | `true` caso tenha dado certo e `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `phone` e `whoCanAddNewGroups` foram fornecidos e se o valor é `admins` ou `all` |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Valores aceitos**: Use `admins` para permitir que apenas administradores adicionem grupos, ou `all` para permitir que todos os participantes adicionem grupos
- **Permissões**: Apenas administradores da comunidade podem alterar essas configurações
- **Efeito imediato**: As alterações são aplicadas imediatamente após a atualização bem-sucedida

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Metadata da Comunidade](/docs/communities/metadata) - Obter informações sobre a comunidade
- [Vincular Grupos](/docs/communities/vincular-grupos) - Adicionar grupos à comunidade
- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
