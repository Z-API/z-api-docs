---
id: criar-etiqueta
title: Criar Etiqueta
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Tag" size="lg" /> Criar Etiqueta

Crie uma nova etiqueta para organizar e categorizar conversas no WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite criar uma nova etiqueta (tag) no seu WhatsApp Business. Quando você cria uma etiqueta, ela fica disponível para ser utilizada ao atribuí-la em um chat, permitindo organizar e categorizar suas conversas de forma eficiente.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

**Casos de uso**:
- Organizar conversas por categoria (ex: "Cliente VIP", "Aguardando Resposta")
- Marcar conversas por status (ex: "Em Negociação", "Fechado")
- Criar filtros personalizados para gerenciar melhor seus contatos

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/create-tag
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
| `name` | string | Nome da etiqueta a ser criada |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `color` | number | Chave (índice) da cor desejada. Este valor deve ser definido de acordo com as cores disponíveis, as quais podem ser encontradas na [API de Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Criar etiqueta sem cor**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta"
}
```

**Criar etiqueta com cor**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta",
  "color": 1
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar etiqueta sem cor
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome da etiqueta',
      // color: 1  // Opcional: adicione a cor se desejar
    }),
  }
);

const data = await response.json();
console.log('ID da etiqueta criada:', data.id);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar etiqueta sem cor
payload = {
    "name": "Nome da etiqueta"
    # "color": 1  # Opcional: adicione a cor se desejar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"ID da etiqueta criada: {data['id']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Criar etiqueta sem cor**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta"
  }'
```

**Criar etiqueta com cor**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta",
    "color": 1
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "id": "10"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID da etiqueta que foi criada. Use este ID para editar, deletar ou atribuir a etiqueta a chats |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos | Verifique se o `name` foi fornecido e se `color` (se fornecido) é um número válido |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **Cores disponíveis**: Use a [API de Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) para ver quais cores estão disponíveis
- **ID da etiqueta**: Guarde o ID retornado para usar em operações futuras (editar, deletar, atribuir)
- **Nomes únicos**: Evite criar etiquetas com nomes duplicados para facilitar a organização

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Buscar Etiquetas](/docs/whatsapp-business/buscar-etiquetas) - Listar todas as etiquetas criadas
- [Editar Etiqueta](/docs/whatsapp-business/editar-etiqueta) - Atualizar nome ou cor de uma etiqueta
- [Deletar Etiqueta](/docs/whatsapp-business/deletar-etiqueta) - Remover uma etiqueta
- [Cores de Etiquetas](/docs/whatsapp-business/cores-etiquetas) - Ver cores disponíveis para etiquetas
- [Atribuir Etiquetas](/docs/whatsapp-business/atribuir-etiquetas) - Adicionar etiquetas a chats
