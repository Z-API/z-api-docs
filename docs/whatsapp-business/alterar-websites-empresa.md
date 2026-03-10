---
id: alterar-websites-empresa
title: Alterar Websites da Empresa
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Globe" size="lg" /> Alterar Websites da Empresa

Atualize os websites da sua empresa no WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite alterar os websites da empresa/companhia no seu perfil do WhatsApp Business. Os websites são exibidos publicamente no perfil da sua conta Business e permitem direcionar clientes para suas páginas na web.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-websites
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `websites` | array[string] | Array contendo as URLs dos websites da empresa |

:::warning Limite de Websites
A empresa pode ter apenas **2 (dois)** websites registrados. Enviar mais do que dois itens na requisição resultará em erro.
:::

:::important Formato da URL
As URLs devem ser válidas e completas (incluindo `http://` ou `https://`). URLs inválidas resultarão em erro.
:::

:::tip Dica
Para remover todos os websites, basta enviar o atributo `websites` como um array vazio `[]` ou removê-lo do corpo da requisição enviando um objeto vazio (dependendo da implementação exata, mas array vazio é mais explicito).
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-websites
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "websites": [
    "https://www.suaempresa.com",
    "https://loja.suaempresa.com"
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-websites',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      websites: [
        'https://www.suaempresa.com',
        'https://loja.suaempresa.com'
      ],
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-websites"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "websites": [
        "https://www.suaempresa.com",
        "https://loja.suaempresa.com"
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-websites" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "websites": [
      "https://www.suaempresa.com",
      "https://loja.suaempresa.com"
    ]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "success": true
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | `true` caso a operação tenha sido bem-sucedida, `false` em caso de falha |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | URL inválida ou Limite excedido | Verifique se as URLs são válidas e se não enviou mais de 2 websites |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **Websites públicos**: Os websites são exibidos publicamente no perfil da sua conta Business
- **Limite**: Máximo de 2 websites por conta

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Dados da Conta](/docs/whatsapp-business/dados-conta) - Ver todas as informações públicas da conta
- [Alterar Email da Empresa](/docs/whatsapp-business/alterar-email-empresa) - Atualizar email de contato
- [Alterar Endereço da Empresa](/docs/whatsapp-business/alterar-endereco-empresa) - Atualizar endereço
- [Alterar Descrição da Empresa](/docs/whatsapp-business/alterar-descricao-empresa) - Atualizar descrição
