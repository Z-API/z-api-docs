---
id: criar-canal
title: Criar Canal
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PlusCircle" size="lg" /> Criar Canal

Crie um novo canal de newsletter no WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por criar um canal de newsletter. Infelizmente não é possível criar o canal com imagem, mas você pode logo após a criação utilizar o método [Atualizar Imagem](/docs/partners/newsletter/atualizar-imagem) que está nesta mesma seção.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/create-newsletter
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
| `name` | string | Nome do canal |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `description` | string | Descrição do canal |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Criar canal apenas com nome**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome do canal"
}
```

**Criar canal com nome e descrição**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome do canal",
  "description": "Descrição do canal"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar canal apenas com nome
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome do canal',
      // description: 'Descrição do canal'  // Opcional
    }),
  }
);

const data = await response.json();
console.log('ID do canal criado:', data.id);

// IMPORTANTE: Use o ID retornado para próximas operações
// O ID sempre conterá o sufixo @newsletter
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar canal apenas com nome
payload = {
    "name": "Nome do canal"
    # "description": "Descrição do canal"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"ID do canal criado: {data['id']}")

# IMPORTANTE: Use o ID retornado para próximas operações
# O ID sempre conterá o sufixo @newsletter
```

</TabItem>
<TabItem value="curl" label="cURL">

**Criar canal apenas com nome**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome do canal"
  }'
```

**Criar canal com nome e descrição**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome do canal",
    "description": "Descrição do canal"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "id": "999999999999999999@newsletter"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID do canal criado. Sempre conterá o sufixo `@newsletter` |

:::tip ID do Canal
O ID retornado sempre conterá o sufixo `@newsletter`, padrão utilizado pelo próprio WhatsApp. Ele deve ser utilizado no mesmo formato nas requisições que recebem o ID como parâmetro.
:::

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se `name` foi fornecido |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **ID do canal**: Guarde o ID retornado para usar em operações futuras (atualizar, deletar, gerenciar administradores, etc.)
- **Sufixo obrigatório**: O ID sempre conterá o sufixo `@newsletter`
- **Imagem**: Não é possível criar o canal com imagem. Use o método [Atualizar Imagem](/docs/partners/newsletter/atualizar-imagem) após a criação
- **Descrição opcional**: A descrição pode ser adicionada durante a criação ou atualizada depois

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Atualizar Imagem](/docs/partners/newsletter/atualizar-imagem) - Adicionar imagem ao canal após criação
- [Atualizar Nome](/docs/partners/newsletter/atualizar-nome) - Alterar nome do canal
- [Atualizar Descrição](/docs/partners/newsletter/atualizar-descricao) - Alterar descrição do canal
- [Listar Canais](/docs/partners/newsletter/listar-canais) - Ver todos os canais criados
- [Metadata do Canal](/docs/partners/newsletter/metadata) - Ver informações completas do canal
