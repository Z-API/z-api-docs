---
slug: guia-rapido-envio-mensagens
title: "Guia Rápido: Enviando sua Primeira Mensagem com Z-API"
authors: [zapi-central]
tags: [tutorial, mensagens, quick-start]
featured: false
summary: Neste tutorial, você aprenderá como enviar sua primeira mensagem usando o Z-API em menos de 5 minutos!
description: "Guia prático para enviar sua primeira mensagem com Z-API em poucos minutos, com exemplos em HTTP, cURL, JavaScript e Python."
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---

Neste tutorial, você aprenderá como enviar sua primeira mensagem usando o Z-API em menos de 5 minutos! A ideia é reduzir atrito: cada passo conecta naturalmente ao próximo, com exemplos que você pode copiar e colar, e pequenas verificações para evitar erros comuns.

<!-- truncate -->

## Pré-requisitos {#pre-requisitos}

Antes de começar, você precisa:

1. Uma conta no Z-API (crie em [developer.z-api.io](https://developer.z-api.io))
2. Uma instância criada e conectada
3. Seu `instanceId` e `token`

## Passo 1: Obter Credenciais {#passo-1-obter-credenciais}

Primeiro, você precisa das suas credenciais. Este é o ponto de partida para qualquer chamada autenticada: tenha-os à mão para não interromper o fluxo nos próximos passos.

- **Instance ID**: ID da sua instância
- **Token**: Token de autenticação (Client-Token)

Você pode encontrar essas informações no painel do Z-API.

## Passo 2: Conectar sua Instância {#passo-2-conectar-sua-instancia}

Se ainda não conectou sua instância, conecte antes de enviar mensagens. A leitura do QR Code estabelece a sessão WhatsApp da sua instância:

1. Acesse o endpoint de QR Code
2. Escaneie o QR Code com seu WhatsApp
3. Aguarde a conexão ser estabelecida

```http
GET https://api.z-api.io/instances/{instanceId}/qrcode
Headers:
 Client-Token: seu-token-aqui
```

## Passo 3: Enviar Mensagem de Texto {#passo-3-enviar-mensagem-de-texto}

Agora vamos enviar uma mensagem simples. Repare nos elementos essenciais do request: método (POST), URL com `instanceId`, headers de autenticação e o corpo JSON com `phone` (E.164) e `message`.

```http
POST https://api.z-api.io/instances/{instanceId}/send-text
Headers:
 Client-Token: seu-token-aqui
 Content-Type: application/json

Body:
{
 "phone": "5511999999999",
 "message": "Olá! Esta é minha primeira mensagem via Z-API! "
}
```

### Exemplo com cURL {#exemplo-com-curl}

```bash
curl -X POST \
 https://api.z-api.io/instances/SEU_INSTANCE_ID/send-text \
 -H 'Client-Token: SEU_TOKEN' \
 -H 'Content-Type: application/json' \
 -d '{
 "phone": "5511999999999",
 "message": "Olá! Esta é minha primeira mensagem via Z-API!"
 }'
```

### Exemplo com JavaScript (Node.js) {#exemplo-com-javascript-nodejs}

```javascript
const axios = require('axios');

async function enviarMensagem() {
 try {
 const response = await axios.post(
 'https://api.z-api.io/instances/SEU_INSTANCE_ID/send-text',
 {
 phone: '5511999999999',
 message: 'Olá! Esta é minha primeira mensagem via Z-API! '
 },
 {
 headers: {
 'Client-Token': 'SEU_TOKEN',
 'Content-Type': 'application/json'
 }
 }
 );
 
 console.log('Mensagem enviada!', response.data);
 } catch (error) {
 console.error('Erro ao enviar mensagem:', error.response.data);
 }
}

enviarMensagem();
```

### Exemplo com Python {#exemplo-com-python}

```python
import requests

def enviar_mensagem():
 url = "https://api.z-api.io/instances/SEU_INSTANCE_ID/send-text"
 
 headers = {
 "Client-Token": "SEU_TOKEN",
 "Content-Type": "application/json"
 }
 
 payload = {
 "phone": "5511999999999",
 "message": "Olá! Esta é minha primeira mensagem via Z-API! "
 }
 
 response = requests.post(url, json=payload, headers=headers)
 
 if response.status_code == 200:
 print("Mensagem enviada!", response.json())
 else:
 print("Erro:", response.json())

enviar_mensagem()
```

## Resposta da API {#resposta-da-api}

Quando a mensagem é enviada com sucesso, você receberá uma resposta como a seguir. Use o `messageId` para correlacionar com webhooks de status e acompanhar o ciclo de vida (PENDING → SENT → DELIVERED → READ):

```json
{
 "messageId": "3EB0C767F26BXXXXXX",
 "status": "PENDING"
}
```

## Próximos Passos {#proximos-passos}

Agora que você sabe enviar mensagens de texto, avance para experiências mais ricas e monitore seus envios com webhooks:

- [Enviar Imagens](/docs/messages/imagem)
- [Enviar Documentos](/docs/messages/documentos)
- [Enviar Botões Interativos](/docs/messages/botoes)
- [Configurar Webhooks](/docs/webhooks/introducao)

## Dicas Importantes {#dicas-importantes}

 **Formato do Telefone**: Use o formato internacional sem espaços ou caracteres especiais (ex: 5511999999999)

 **Rate Limiting**: Respeite os limites do WhatsApp para evitar bloqueios

 **Privacidade**: Nunca compartilhe seu token publicamente

## Conclusão {#conclusao}

Parabéns! Você enviou sua primeira mensagem usando Z-API! 🎉 Se notar erros intermitentes (rede/latência), implemente retry com backoff exponencial no cliente e acompanhe webhooks para confirmação de entrega.

Para aprofundar, consulte a [documentação completa](/docs/messages/introducao) e o guia de [webhooks](/docs/webhooks/introducao) para fechar o ciclo com observabilidade.
