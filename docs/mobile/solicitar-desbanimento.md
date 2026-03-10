---
id: solicitar-desbanimento
title: Solicitar Desbanimento
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Unlock" size="lg" /> Solicitar Desbanimento

Solicite o desbanimento de um número que foi banido pelo WhatsApp.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para solicitar desbanimento de um número. Quando um número está banido, você receberá um `appealToken` na resposta da API de [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade). Use esse token para solicitar o desbanimento junto ao WhatsApp.

**Fluxo**:
1. [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Se o número estiver banido, você receberá um `appealToken`
2. **Solicitar Desbanimento** (este método) - Use o `appealToken` para solicitar desbanimento
3. Aguardar análise do WhatsApp

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/request-unbanning
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
| `appealToken` | string | Token para desbanimento de um número em específico. Obtido na resposta da API de [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) quando o número está banido |
| `description` | string | Descrição a ser enviada para análise do WhatsApp. Explique o motivo do banimento e por que você acredita que o número deve ser desbanido |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
  "description": "Estava conversando normalmente e fui banido"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após verificar disponibilidade e receber appealToken
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      appealToken: 'Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s',
      description: 'Estava conversando normalmente e fui banido. Gostaria de solicitar uma revisão do banimento.',
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.status === 'IN_REVIEW') {
    console.log('Solicitação de desbanimento enviada! Aguardando análise do WhatsApp.');
  } else if (data.status === 'UNBANNED') {
    console.log('Número desbanido! Você pode tentar registrar novamente.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após verificar disponibilidade e receber appealToken
payload = {
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
    "description": "Estava conversando normalmente e fui banido. Gostaria de solicitar uma revisão do banimento."
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('status') == 'IN_REVIEW':
        print('Solicitação de desbanimento enviada! Aguardando análise do WhatsApp.')
    elif data.get('status') == 'UNBANNED':
        print('Número desbanido! Você pode tentar registrar novamente.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
    "description": "Estava conversando normalmente e fui banido"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso de sucesso - Em análise**:

```json
{
  "success": true,
  "status": "IN_REVIEW"
}
```

**Caso de sucesso - Desbanido**:

```json
{
  "success": true,
  "status": "UNBANNED"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `success` | boolean | Retorna `true` caso a solicitação tenha ocorrido com sucesso |
| `status` | string | Status da solicitação do desbanimento. Valores possíveis: `"IN_REVIEW"` (em análise), `"UNBANNED"` (desbanido) |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `400` | Requisição inválida | Verifique se os dados que você está enviando estão de acordo com o documentado acima |
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Instâncias Mobile**: Esta API está disponível apenas para instâncias mobile
- **AppealToken**: O `appealToken` é obtido na resposta da API de [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) quando o número está banido
- **Descrição**: Forneça uma descrição clara e honesta sobre o motivo do banimento e por que você acredita que o número deve ser desbanido
- **Análise**: O WhatsApp analisará a solicitação e pode levar algum tempo para responder
- **Status**: Monitore o status da solicitação. Se for `UNBANNED`, você pode tentar registrar o número novamente

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Verificar Disponibilidade](/docs/mobile/verificar-disponibilidade) - Verificar se o número está banido e obter `appealToken`
- [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código após desbanimento
