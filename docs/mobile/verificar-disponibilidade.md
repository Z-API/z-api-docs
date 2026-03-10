---
id: verificar-disponibilidade
title: Verificar Disponibilidade de Registro
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Verificar Disponibilidade de Registro

Verifique se um número está disponível para registro em uma instância mobile e obtenha informações sobre métodos de confirmação.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é utilizado para verificar disponibilidade de registro de um número. Este método é obrigatoriamente **precedente** ao método de solicitar o envio do código, pois além de buscar as informações sobre a disponibilidade, também realiza um setup de onboarding do número no WhatsApp. Através dessa API você também pode ver os métodos disponíveis para solicitação do código de confirmação, além de saber se o número está banido ou não.

**Fluxo de registro**:
1. **Verificar Disponibilidade** (este método) - Verificar se o número está disponível
2. [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código de confirmação
3. Receber código (SMS, voz ou pop-up)
4. [Confirmar Código](/docs/mobile/confirmar-codigo) - Confirmar código recebido
5. Se necessário, [Confirmar Código PIN](/docs/mobile/confirmar-codigo-pin) - Confirmar código PIN

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/registration-available
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
| `ddi` | string | DDI do número (código do país, ex: `"55"` para Brasil) |
| `phone` | string | Número de telefone que você deseja registrar. Deve incluir apenas o **número com DDD** (Ex: `4499999999`), sem formatação ou máscara |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      ddi: '55', // Código do país
      phone: '4499999999', // Número com DDD, sem formatação
    }),
  }
);

const data = await response.json();
if (data.available) {
  console.log('Número disponível para registro!');
  console.log(`SMS disponível em: ${data.smsWaitSeconds}s`);
  console.log(`Voz disponível em: ${data.voiceWaitSeconds}s`);
} else if (data.blocked) {
  console.log('Número banido. Token de desbanimento:', data.appealToken);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "ddi": "55",  # Código do país
    "phone": "4499999999"  # Número com DDD, sem formatação
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('available'):
    print('Número disponível para registro!')
    print(f"SMS disponível em: {data['smsWaitSeconds']}s")
    print(f"Voz disponível em: {data['voiceWaitSeconds']}s")
elif data.get('blocked'):
    print(f'Número banido. Token de desbanimento: {data["appealToken"]}')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "ddi": "55",
    "phone": "4499999999"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Caso de número disponível**:

```json
{
  "available": true,
  "smsWaitSeconds": 0,
  "voiceWaitSeconds": 0,
  "waOldWaitSeconds": 0,
  "waOldEligible": true
}
```

**Caso de número banido**:

```json
{
  "available": false,
  "blocked": true,
  "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `available` | boolean | Retorna `true` caso o número esteja disponível para registro. Se a resposta for `false`, não será possível avançar para a próxima etapa do registro |
| `blocked` | boolean | Define se o número está banido ou bloqueado por algum outro motivo. Se esse for o seu caso, utilize o atributo `appealToken` para [solicitar desbanimento](/docs/mobile/solicitar-desbanimento) |
| `appealToken` | string | No caso do número estar banido, esse atributo será retornado contendo um token para solicitação de desbanimento |
| `smsWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **SMS**. Caso o valor seja `0`, significa que a solicitação já pode ser enviada para este método |
| `voiceWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **chamada de voz**. Mesmo objetivo do `smsWaitSeconds` |
| `waOldWaitSeconds` | number | Tempo que deve ser aguardado para solicitação de **pop-up no aplicativo do celular**. Mesmo objetivo do `smsWaitSeconds` |
| `waOldEligible` | boolean | Define se o método de solicitação do código via **pop-up no aplicativo do celular** está disponível |
| `reason` | string | Em caso de erro, esse atributo diz a razão pela qual o erro aconteceu |

:::warning Atenção
Existem alguns cenários onde o número é impedido de ser conectado até mesmo no aplicativo oficial do WhatsApp. Nesse caso, a API de verificar disponibilidade do número não é capaz de identificar isso, e acaba sendo retornado que o número está bloqueado somente no momento de solicitar o código. Infelizmente, até o momento não há nada que possamos fazer a esse respeito, pois, diferente do banimento padrão, não é disponibilizado um token (`appealToken`) para realizar uma solicitação de desbanimento.
:::

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
- **Formato do número**: O número deve incluir apenas DDD + número, sem formatação (ex: `4499999999`, não `(44) 99999-9999`)
- **Métodos de confirmação**: Use os tempos de espera (`smsWaitSeconds`, `voiceWaitSeconds`) para saber quando pode solicitar código por cada método
- **Pop-up no celular**: O método `waOld` (pop-up no aplicativo) só funciona se você tem acesso físico ao celular onde o número está vinculado
- **Número banido**: Se o número estiver banido, use o `appealToken` para solicitar desbanimento

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Solicitar Código](/docs/mobile/solicitar-codigo) - Solicitar código de confirmação
- [Confirmar Código](/docs/mobile/confirmar-codigo) - Confirmar código recebido
- [Solicitar Desbanimento](/docs/mobile/solicitar-desbanimento) - Solicitar desbanimento de número banido
