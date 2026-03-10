---
id: transferir-propriedade
title: Transferir Propriedade do Canal
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Shuffle" size="lg" /> Transferir Propriedade do Canal

Transfira a propriedade de um canal para outro administrador.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por transferir a propriedade de um canal a outro usuário, o qual deve ser administrador desse canal. Após a transferência, o novo proprietário terá controle total sobre o canal.

:::warning Atenção
A transferência de propriedade é uma operação permanente. Certifique-se de que o usuário destinatário é confiável e está preparado para gerenciar o canal.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/transfer-ownership/{newsletterId}
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
| `phone` | string | Telefone do usuário que será promovido a dono do canal (formato internacional, sem espaços) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `quitAdmin` | boolean | Define se você deixará de ser administrador do canal após transferir a propriedade. Padrão: `false` |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Transferir e permanecer como admin**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
}
```

**Transferir e sair como admin**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "quitAdmin": true
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

// Transferir e permanecer como admin
const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      // quitAdmin: true  // Opcional: sair como admin após transferir
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
if (data.message) {
  console.log('Mensagem:', data.message);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Transferir e permanecer como admin
payload = {
    "phone": "5511999999999"
    # "quitAdmin": True  # Opcional: sair como admin após transferir
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
if 'message' in data:
    print(f"Mensagem: {data['message']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "quitAdmin": true
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
| `value` | boolean | `true` em caso de sucesso, `false` em caso de falha |
| `message` | string | Em caso de erro, pode retornar uma mensagem com informações sobre o erro |

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
- **Administrador obrigatório**: O usuário destinatário deve ser administrador do canal antes da transferência
- **Formato do telefone**: Use formato internacional sem espaços ou caracteres especiais (ex: `5511999999999`)
- **Permanecer como admin**: Por padrão, você permanecerá como administrador após a transferência. Use `quitAdmin: true` para sair completamente
- **Operação permanente**: A transferência de propriedade não pode ser revertida facilmente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Promover Administrador](/docs/partners/newsletter/promover-admin) - Promover usuário a administrador
- [Remover Administrador](/docs/partners/newsletter/remover-admin) - Remover administrador do canal
- [Enviar Convite de Admin](/docs/messages/convite-admin-canal) - Enviar convite para ser administrador
- [Aceitar Convite de Admin](/docs/partners/newsletter/aceitar-convite-admin) - Aceitar convite de administrador
