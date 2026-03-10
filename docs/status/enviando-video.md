---
id: enviando-video
title: Enviar Status de Vídeo
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Video" size="lg" /> Enviar Status de Vídeo

Envie um vídeo para seu status. Lembre-se que os status somem após 24 horas.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método é responsável por enviar um vídeo para seu status. Os status são mensagens temporárias que desaparecem após 24 horas, similar ao recurso Stories de outras plataformas.

:::caution Atenção
O tamanho máximo para vídeos nos status é de **10MB**.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
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
| `video` | string | Link do vídeo ou seu Base64 |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `caption` | string | Legenda que irá junto com o vídeo para o status |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Sem legenda**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
}
```

**Com legenda**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
  "caption": "texto da legenda"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Sem legenda
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      video: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      // caption: 'texto da legenda' // Opcional
    }),
  }
);

const data = await response.json();
console.log('Status enviado:', data.messageId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Sem legenda
payload = {
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
    # "caption": "texto da legenda"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print(f"Status enviado: {data.get('messageId')}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Sem legenda**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
  }'
```

**Com legenda**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
    "caption": "texto da legenda"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID no Z-API |
| `messageId` | string | ID no WhatsApp |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `POST` conforme especificado |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `400` | Dados inválidos ou vídeo muito grande | Verifique se `video` foi fornecido corretamente. Lembre-se: o tamanho máximo é 10MB |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Tamanho máximo**: O tamanho máximo para vídeos nos status é de 10MB
- **Formato do vídeo**: Você pode enviar um link (URL) ou Base64 do vídeo
- **Legenda opcional**: A legenda (`caption`) é opcional e aparece junto com o vídeo no status
- **Expiração**: Os status desaparecem automaticamente após 24 horas
- **Base64**: Se você tem dúvidas em como enviar um vídeo Base64, acesse o tópico mensagens "Enviar Vídeo", lá você vai encontrar tudo que precisa saber sobre envio neste formato

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Enviar Status de Texto](/docs/status/enviando-texto) - Enviar um status de texto
- [Enviar Status de Imagem](/docs/status/enviando-imagem) - Enviar um status de imagem
- [Responder Status](/docs/status/responder-texto) - Responder a um status
