---
id: alterar-horario-funcionamento
title: Alterar Horário de Funcionamento
sidebar_position: 15
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Alterar Horário de Funcionamento

Configure o horário de funcionamento da sua empresa no WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método permite alterar o horário de funcionamento da empresa/companhia no seu perfil do WhatsApp Business. Você pode configurar horários específicos para cada dia da semana, definir como aberto 24 horas ou apenas com agendamento.

:::important Importante
Este método está disponível apenas para contas Business do WhatsApp.
:::

**Modos de funcionamento**:
- `specificHours`: Horários específicos para cada dia da semana
- `open24h`: Aberto 24 horas todos os dias
- `appointmentOnly`: Apenas com agendamento

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/hours
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
| `timezone` | string | Local do fuso horário (ex: `"America/Sao_Paulo"`, `"America/New_York"`) |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `mode` | string | Modo de funcionamento. Valores possíveis: `"specificHours"`, `"open24h"`, `"appointmentOnly"` |
| `days` | array[object] | Array com os dias da semana em que a empresa funciona |

### Objeto `days`

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `dayOfWeek` | string | Dia da semana. Valores: `"SUNDAY"`, `"MONDAY"`, `"TUESDAY"`, `"WEDNESDAY"`, `"THURSDAY"`, `"FRIDAY"`, `"SATURDAY"` |
| `openTime` | string | Hora de abertura no formato `hh:mm` (ex: `"08:00"`) |
| `closeTime` | string | Hora de fechamento no formato `hh:mm` (ex: `"18:00"`) |

:::tip Dica
Para definir todos os dias como "fechado", basta enviar o atributo `days` como array vazio (`[]`).
:::

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Horários específicos**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/hours
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "timezone": "America/Sao_Paulo",
  "mode": "specificHours",
  "days": [
    {
      "dayOfWeek": "MONDAY",
      "openTime": "08:00",
      "closeTime": "12:00"
    },
    {
      "dayOfWeek": "MONDAY",
      "openTime": "14:00",
      "closeTime": "18:00"
    },
    {
      "dayOfWeek": "TUESDAY",
      "openTime": "08:00",
      "closeTime": "18:00"
    }
  ]
}
```

**Aberto 24 horas**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/hours
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "timezone": "America/Sao_Paulo",
  "mode": "open24h"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Horários específicos
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/hours',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      timezone: 'America/Sao_Paulo',
      mode: 'specificHours',
      days: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '08:00',
          closeTime: '12:00',
        },
        {
          dayOfWeek: 'MONDAY',
          openTime: '14:00',
          closeTime: '18:00',
        },
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/hours"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Horários específicos
payload = {
    "timezone": "America/Sao_Paulo",
    "mode": "specificHours",
    "days": [
        {
            "dayOfWeek": "MONDAY",
            "openTime": "08:00",
            "closeTime": "12:00"
        },
        {
            "dayOfWeek": "MONDAY",
            "openTime": "14:00",
            "closeTime": "18:00"
        }
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/hours" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "timezone": "America/Sao_Paulo",
    "mode": "specificHours",
    "days": [
      {
        "dayOfWeek": "MONDAY",
        "openTime": "08:00",
        "closeTime": "12:00"
      },
      {
        "dayOfWeek": "MONDAY",
        "openTime": "14:00",
        "closeTime": "18:00"
      }
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
| `400` | Dados inválidos | Verifique se `timezone` foi fornecido e se os horários estão no formato correto (`hh:mm`) |
| `403` | Conta não Business | Verifique se sua conta é uma conta WhatsApp Business |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **WhatsApp Business obrigatório**: Este método requer uma conta WhatsApp Business configurada
- **Multi-Devices**: Funciona apenas com instâncias conectadas à versão Multi-Devices
- **Fuso horário**: Use o formato IANA timezone (ex: `"America/Sao_Paulo"`, `"America/New_York"`)
- **Múltiplos horários**: Você pode definir múltiplos períodos para o mesmo dia (ex: manhã e tarde)
- **Formato de hora**: Use formato `hh:mm` em 24 horas (ex: `"08:00"`, `"18:30"`)
- **Dias fechados**: Envie `days` como array vazio para marcar todos os dias como fechados

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Dados da Conta](/docs/whatsapp-business/dados-conta) - Ver todas as informações públicas da conta
- [Alterar Endereço da Empresa](/docs/whatsapp-business/alterar-endereco-empresa) - Atualizar endereço
- [Alterar Descrição da Empresa](/docs/whatsapp-business/alterar-descricao-empresa) - Atualizar descrição
