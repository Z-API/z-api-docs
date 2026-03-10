---
id: atualizar-nome
title: Atualizar Nome do Canal
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Atualizar Nome do Canal

Altere o nome de um canal de newsletter existente.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por alterar o nome de um canal já existente. O nome do canal é exibido publicamente e ajuda os seguidores a identificar o canal.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-newsletter-name
```

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
| `id` | string | ID do canal (deve conter o sufixo `@newsletter`) |
| `name` | string | Novo nome do canal |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "name": "Novo nome do canal"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
      name: 'Novo nome do canal',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter",
    "name": "Novo nome do canal"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter",
    "name": "Novo nome do canal"
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
| `400` | Dados inválidos | Verifique se `id` e `name` foram fornecidos e se o ID contém o sufixo `@newsletter` |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Nome público**: O nome é exibido publicamente no perfil do canal
- **Permissões**: Apenas proprietários e administradores podem alterar o nome do canal

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
- [Atualizar Descrição](/docs/partners/newsletter/atualizar-descricao) - Alterar descrição do canal
- [Atualizar Imagem](/docs/partners/newsletter/atualizar-imagem) - Alterar imagem do canal
- [Atualizar Configurações](/docs/partners/newsletter/atualizar-configuracoes) - Configurar opções do canal
