---
id: desativar
title: Desativar Comunidade
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="XCircle" size="lg" /> Desativar Comunidade

Desative uma comunidade existente. Isso removerá todos os grupos da comunidade, mas não excluirá os grupos.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por desativar uma comunidade. Quando uma comunidade é desativada, resultará na desconexão de todos os grupos relacionados a ela.

:::important Importante
É importante ressaltar que desativar a Comunidade **não excluirá** seus grupos, mas sim os **removerá da Comunidade** em questão. Os grupos continuarão existindo como grupos independentes.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE /instances/{instanceId}/token/{token}/communities/{idDaComunidade}
```

### Parâmetros de URL

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `idDaComunidade` | string | Sim | ID da comunidade a ser desativada |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/98372465382764532938
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const communityId = '98372465382764532938';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/${communityId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

if (response.ok) {
  console.log('Comunidade desativada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

community_id = "98372465382764532938"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/{community_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.delete(url, headers=headers)

if response.status_code == 200:
    print('Comunidade desativada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/98372465382764532938" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

A resposta de sucesso não retorna um corpo JSON. O código de status HTTP 200 indica que a operação foi bem-sucedida.

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `DELETE` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `404` | Comunidade não encontrada | Verifique se o `idDaComunidade` está correto |
| `403` | Sem permissão | Apenas administradores podem desativar a comunidade |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Grupos preservados**: Os grupos não são excluídos, apenas desvinculados da comunidade
- **Grupos independentes**: Após a desativação, os grupos continuam existindo como grupos independentes
- **Permissões**: Apenas administradores da comunidade podem desativá-la
- **Irreversível**: A desativação é permanente. Se precisar da comunidade novamente, será necessário criá-la novamente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Criar Comunidade](/docs/communities/criar) - Criar uma nova comunidade
- [Listar Comunidades](/docs/communities/listar) - Listar todas as comunidades
- [Metadata da Comunidade](/docs/communities/metadata) - Obter informações sobre a comunidade
