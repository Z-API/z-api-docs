---
id: atualizar-imagem
title: Atualizar Imagem do Canal
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Atualizar Imagem do Canal

Altere a imagem de um canal de newsletter existente.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por alterar a imagem de um canal já existente. A imagem do canal é exibida publicamente e ajuda os seguidores a identificar visualmente o canal.

Você pode enviar a imagem como URL ou como Base64.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-newsletter-picture
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
| `pictureUrl` | string | URL ou Base64 da imagem |

:::warning Atenção
O ID do canal sempre deve conter o sufixo `@newsletter`, pois esse é o padrão utilizado pelo próprio WhatsApp.
:::

:::tip Enviar Imagem Base64
Se você tem dúvidas sobre como enviar uma imagem Base64, acesse o tópico de mensagens [Enviar Imagem](/docs/messages/imagem), lá você vai encontrar tudo que precisa saber sobre envio neste formato.
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Usando URL**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

**Usando Base64**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "pictureUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Usando URL
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
      pictureUrl: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Usando URL
payload = {
    "id": "999999999999999999@newsletter",
    "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter",
    "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
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
| `400` | Dados inválidos | Verifique se `id` e `pictureUrl` foram fornecidos, se o ID contém o sufixo `@newsletter` e se a URL/Base64 é válida |
| `404` | Canal não encontrado | Verifique se o ID do canal está correto |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Sufixo obrigatório**: O ID do canal sempre deve conter o sufixo `@newsletter`
- **Imagem pública**: A imagem é exibida publicamente no perfil do canal
- **Permissões**: Apenas proprietários e administradores podem alterar a imagem do canal
- **Formatos suportados**: URL (http/https) ou Base64 (com prefixo `data:image/tipo;base64,`)
- **Tamanho recomendado**: Use imagens quadradas para melhor visualização

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
- [Atualizar Nome](/docs/partners/newsletter/atualizar-nome) - Alterar nome do canal
- [Atualizar Descrição](/docs/partners/newsletter/atualizar-descricao) - Alterar descrição do canal
- [Enviar Imagem](/docs/messages/imagem) - Guia sobre envio de imagens (Base64)
