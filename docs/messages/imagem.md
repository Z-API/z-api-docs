---
id: imagem
title: Enviar Imagem
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Envie imagens para seus contatos através do WhatsApp, tornando suas comunicações mais visuais, informativas e engajadoras. 

**Por que enviar imagens?**

Mensagens com imagens têm **até 2,3x mais engajamento** do que mensagens apenas de texto. Imagens capturam atenção imediatamente, transmitem informações complexas de forma rápida e criam uma conexão emocional mais forte com seus contatos.

**O que você pode fazer:**

Este recurso permite incluir uma legenda opcional para fornecer contexto adicional à imagem, melhorando a compreensão e o impacto da sua mensagem. Você pode enviar:

- **Fotos de produtos** para e-commerce e vendas
- **Capturas de tela** para suporte técnico e tutoriais
- **QR Codes** para pagamentos, check-ins e autenticação
- **Infográficos** para marketing e comunicação visual
- **Documentos visuais** como cartões de visita digitais
- **Promoções e ofertas** com imagens atrativas

**Formatos suportados:**

O WhatsApp aceita os seguintes formatos de imagem: **JPG, JPEG, PNG e WEBP**. O tamanho máximo permitido é **16MB**, mas recomendamos usar imagens menores que 5MB para um envio mais rápido e eficiente.

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Confirmação Visual:** Enviar a foto de um produto que o cliente acabou de comprar.
- **Suporte Técnico:** Enviar uma captura de tela para ilustrar um passo a passo.
- **Marketing:** Divulgar um novo produto ou promoção com uma imagem atrativa.
- **Envio de Documentos Visuais:** Mandar um QR Code para pagamento ou um cartão de visita digital.

---

## <Icon name="HelpCircle" size="md" /> URL vs. Base64: Qual Formato Usar?

Você pode enviar imagens usando dois formatos diferentes. Compreender quando usar cada um é essencial para otimizar performance, reduzir custos e garantir o sucesso do envio.

### 1. URL (Recomendado e Preferencial) ⭐

**O que é?**

Um link HTTP/HTTPS direto para uma imagem hospedada publicamente na internet. Exemplo: `https://meusite.com/produto.jpg` ou `https://cdn.exemplo.com/imagens/promo.jpg`.

**Como funciona:**

1. Você fornece a URL da imagem na requisição
2. O Z-API baixa a imagem da URL fornecida
3. O Z-API processa e envia a imagem através do WhatsApp
4. A imagem é entregue ao destinatário

**Quando usar?**

Use este formato na **maioria absoluta dos casos** (95%+). É significativamente mais eficiente, rápido e consome menos recursos.

**Requisitos:**

- A imagem deve estar **acessível publicamente** (sem autenticação, login ou tokens)
- A URL deve usar **HTTP ou HTTPS** (não `file://` ou outros protocolos)
- O servidor deve permitir **download direto** da imagem
- A imagem deve estar **disponível na internet** (não apenas na sua rede local)

**Vantagens:**

- ✅ **Processamento mais rápido**: O Z-API baixa a imagem diretamente, sem processar dados grandes na requisição
- ✅ **Menor consumo de memória**: A imagem não precisa ser codificada em Base64 antes do envio
- ✅ **Melhor para imagens grandes**: URLs funcionam bem mesmo com imagens de vários MB
- ✅ **Requisições menores**: A requisição HTTP contém apenas a URL (alguns bytes), não a imagem inteira
- ✅ **Cache eficiente**: O Z-API pode cachear imagens por URL, melhorando performance em reenvios

**Exemplo de uso:**

```json
{
  "phone": "5511999999999",
  "image": "https://cdn.meusite.com/produtos/produto-123.jpg",
  "caption": "Confira nosso novo produto!"
}
```

### 2. Base64 (Alternativa) ⚠️

**O que é?**

Uma codificação do arquivo binário da imagem em uma string de texto alfanumérico. O formato completo é: `data:image/tipo;base64,dados_codificados...`

**Exemplo:**
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=
```

**Como funciona:**

1. Você converte a imagem binária para Base64
2. Você inclui a string Base64 completa na requisição
3. O Z-API decodifica o Base64 e processa a imagem
4. O Z-API envia a imagem através do WhatsApp

**Quando usar?**

**Apenas quando a imagem não está disponível em uma URL pública.** Casos específicos:

- ✅ Imagens **geradas dinamicamente** pelo seu sistema (gráficos, relatórios, QR codes gerados)
- ✅ Imagens **processadas em memória** que ainda não foram salvas em um servidor
- ✅ Imagens de **sistemas internos** que não podem ser expostas publicamente
- ✅ **Protótipos e testes** rápidos sem infraestrutura de hospedagem

**Desvantagens:**

- ❌ **Requisições muito maiores**: Uma imagem de 1MB vira ~1.3MB em Base64 (33% maior)
- ❌ **Processamento mais lento**: Requer codificação/decodificação adicional
- ❌ **Maior consumo de recursos**: Mais memória e CPU necessários
- ❌ **Limites de tamanho**: Requisições HTTP têm limites de tamanho (geralmente 5-10MB)
- ❌ **Não escalável**: Não recomendado para produção com alto volume

**Exemplo de uso:**

```json
{
  "phone": "5511999999999",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "caption": "QR Code gerado dinamicamente"
}
```

### Comparação Rápida

| Aspecto | URL | Base64 |
|---------|-----|--------|
| **Tamanho da requisição** | Pequeno (URL curta) | Grande (imagem codificada) |
| **Performance** | ⭐⭐⭐⭐⭐ Excelente | ⭐⭐ Regular |
| **Uso de memória** | Baixo | Alto |
| **Quando usar** | 95% dos casos | Casos específicos |
| **Recomendação** | ✅ Sempre que possível | ⚠️ Apenas quando necessário |

### Recomendação Final

**Sempre prefira URL.** Se você não tem uma URL pública, considere:

1. **Hospedar a imagem** em um serviço de CDN (Cloudflare, AWS S3, etc.)
2. **Usar um serviço de hospedagem** temporária (Imgur, Cloudinary, etc.)
3. **Criar um endpoint** no seu servidor que retorne a imagem publicamente

Base64 deve ser usado apenas como **última opção** quando não há alternativa de hospedagem pública.

:::tip Dica de Performance
Sempre prefira usar **URL**, pois o processamento é muito mais rápido e consome menos recursos.
:::

![Exemplo de mensagem com imagem](/img/send-message-image.jpeg)

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Em sua ferramenta de automação, você encontrará os seguintes campos para preencher:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá a imagem. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).
2. **`image`**: O campo principal. Aqui você colará a **URL pública** da sua imagem. A URL deve estar acessível publicamente na internet.

### Campos Opcionais

3. **`caption`**: O texto que aparecerá como legenda abaixo da imagem. Você pode usar formatação (negrito com `*texto*`, itálico com `_texto_`) aqui.

4. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

5. **`delayMessage`**: Se você vai enviar várias imagens seguidas, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

6. **`viewOnce`**: Marque como `true` se quiser que a imagem desapareça após ser visualizada (foto que some). Útil para imagens sensíveis ou temporárias.

**Dica:** Na maioria dos casos, você só precisa preencher `phone` e `image`. Os outros campos são opcionais e podem ser deixados em branco.

---

## <Icon name="Code" size="md" /> Como Funciona: Entendendo o Processo

Antes de ver o código, vamos entender **como** o envio de imagens funciona e **o que** acontece por trás dos panos.

### O Fluxo Completo de Envio

Quando você envia uma imagem através do Z-API, acontece o seguinte processo:

1. **Você faz a requisição**: Envia os dados (número do destinatário, URL da imagem, legenda opcional) para o endpoint do Z-API
2. **Z-API processa**: O Z-API baixa a imagem da URL (se for URL) ou decodifica o Base64 (se for Base64)
3. **Z-API valida**: Verifica se a imagem está em formato válido e dentro dos limites de tamanho
4. **Z-API envia**: Encaminha a imagem através do WhatsApp conectado à sua instância
5. **WhatsApp entrega**: A imagem chega no WhatsApp do destinatário
6. **Você recebe confirmação**: O Z-API retorna um `messageId` para rastreamento

### Entendendo os Parâmetros

Antes de construir sua requisição, entenda cada campo:

**`phone` (obrigatório)**
- **O que é?** O número de telefone do destinatário no formato internacional completo
- **Formato correto:** DDI + DDD + Número, tudo junto, sem espaços ou caracteres especiais
- **Exemplo:** `5511999999999` (Brasil: +55, DDD: 11, número: 999999999)
- **Por que este formato?** O WhatsApp requer números no formato internacional para garantir entrega correta em qualquer país

**`image` (obrigatório)**
- **O que é?** A imagem que você quer enviar, como URL pública ou string Base64
- **URL:** Um link HTTP/HTTPS direto para a imagem (ex: `https://meusite.com/foto.jpg`)
- **Base64:** A imagem codificada em texto (ex: `data:image/jpeg;base64,...`)
- **Por que dois formatos?** URLs são mais eficientes, mas Base64 permite enviar imagens geradas dinamicamente sem hospedagem

**`caption` (opcional)**
- **O que é?** Um texto que aparece como legenda abaixo da imagem no WhatsApp
- **Limite:** Máximo de 1024 caracteres
- **Formatação:** Suporta negrito (`*texto*`), itálico (`_texto_`) e outras formatações do WhatsApp
- **Quando usar?** Quando você quer adicionar contexto, explicação ou call-to-action junto com a imagem

**`messageId` (opcional)**
- **O que é?** Permite responder uma mensagem existente no chat, criando uma conversa encadeada
- **Como funciona?** Use o `messageId` da mensagem que você quer responder. A imagem será enviada como resposta àquela mensagem
- **Quando usar?** Quando você quer manter o contexto da conversa, respondendo a uma pergunta ou comentário específico
- **Exemplo:** Se o cliente perguntou "tem foto deste produto?", você pode responder com a imagem usando o `messageId` da mensagem dele
- **Importante:** Veja mais sobre [como responder mensagens](./responder)

**`delayMessage` (opcional)**
- **O que é?** Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem
- **Valores:** Entre 1 e 15 segundos
- **Padrão:** Se não informado, o sistema usa um delay automático de 1 a 3 segundos
- **Quando usar?** Útil ao enviar múltiplas mensagens em sequência para evitar bloqueios e tornar a comunicação mais natural
- **Exemplo:** Se você vai enviar 5 imagens seguidas, use `delayMessage: 3` para espaçar o envio

**`viewOnce` (opcional)**
- **O que é?** Define se a imagem será uma mensagem de visualização única (foto que desaparece após ser vista)
- **Tipo:** Boolean (`true` ou `false`)
- **Padrão:** `false` (imagem normal, permanece no chat)
- **Quando usar?** Para enviar imagens sensíveis ou temporárias que devem desaparecer após visualização
- **Importante:** Uma vez visualizada, a imagem não pode ser vista novamente pelo destinatário

### Endpoint e Método HTTP

O endpoint para enviar imagens é:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image
```

**Por que POST?** Porque você está **enviando dados** (a imagem) para o servidor, não apenas consultando informações. Requisições POST permitem enviar dados no corpo da requisição.

**O que são `{instanceId}` e `{token}`?** São identificadores únicos da sua instância do Z-API. Eles garantem que a mensagem seja enviada pela instância correta e com as permissões adequadas.

### Estrutura da Requisição

Uma requisição típica tem esta estrutura:

**Headers (cabeçalhos):**
- `Content-Type: application/json` - Informa que você está enviando dados JSON
- `Client-Token: seu-token` - Token de autenticação da sua conta Z-API

**Body (corpo):**
- Um objeto JSON com os três campos: `phone`, `image` e opcionalmente `caption`

**Exemplo mínimo (apenas com URL):**

```json
{
  "phone": "5511999999999",
  "image": "https://i.imgur.com/example.jpg"
}
```

**Exemplo completo (com legenda):**

```json
{
  "phone": "5511999999999",
  "image": "https://i.imgur.com/example.jpg",
  "caption": "Confira nosso novo produto! *Promoção limitada*"
}
```

### O Que Esperar na Resposta

Se tudo der certo, você receberá uma resposta como esta:

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

**E se der erro?** A API retornará um código de erro HTTP (como 400, 401, 404) com uma mensagem explicando o problema. Sempre verifique a resposta para garantir que a mensagem foi aceita.

---

## <Icon name="Shield" size="md" /> Boas Práticas e Limites

- **Tamanho Máximo:** O WhatsApp limita o envio de mídias a **16MB**.
- **Formatos Suportados:** JPG, JPEG, PNG, WEBP.
- **Otimização:** Para um envio mais rápido, use imagens com menos de 5MB.
- **URLs Públicas:** Certifique-se de que o link da imagem esteja acessível publicamente, sem necessidade de login.

---

## <Icon name="GraduationCap" size="md" /> Passo a Passo: Seu Primeiro Envio

Vamos aprender enviando uma imagem passo a passo. Este tutorial assume que você já tem uma instância conectada e suas credenciais em mãos.

### Passo 1: Prepare sua Imagem

Antes de tudo, você precisa de uma imagem hospedada publicamente na internet.

**Opções para hospedar:**

1. **Servidor próprio**: Se você tem um site, hospede a imagem lá
2. **CDN/Serviços de hospedagem**: Use serviços como Imgur, Cloudinary, AWS S3, ou qualquer CDN
3. **Teste rápido**: Para testes, você pode usar uma imagem pública de exemplo

**Importante:** A URL deve ser acessível diretamente. Teste abrindo a URL no navegador - se você conseguir ver a imagem, está pronta para usar.

### Passo 2: Monte sua Requisição

Você precisa de três informações:

1. **Número do destinatário**: No formato internacional (ex: `5511999999999`)
2. **URL da imagem**: O link completo para a imagem (ex: `https://exemplo.com/imagem.jpg`)
3. **Legenda (opcional)**: Um texto para aparecer abaixo da imagem

### Passo 3: Faça a Requisição

Use qualquer ferramenta que permita fazer requisições HTTP POST:

- **Postman**: Ferramenta visual, perfeita para iniciantes
- **cURL**: Linha de comando, rápida para testes
- **Código**: JavaScript, Python, PHP, etc. - para integração em aplicações

### Passo 4: Verifique a Resposta

Se receber um `messageId`, sua mensagem foi aceita e está na fila. Em poucos segundos, ela chegará no WhatsApp do destinatário.

---

## <Icon name="FileCode" size="md" /> Exemplos Práticos de Código

Abaixo estão exemplos práticos e simplificados em diferentes linguagens. Estes exemplos focam em **ensinar** o conceito, não em mostrar código complexo.


<Tabs>
<TabItem value="nodejs" label="Node.js (Vanilla)">

```javascript
// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateImage(image) {
  if (!image) {
    throw new Error('Imagem é obrigatória (URL ou Base64)');
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    try {
      const url = new URL(image);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL da imagem inválida');
    }
  } else if (image.startsWith('data:image/')) {
    if (!image.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Imagem deve ser uma URL ou Base64');
  }
  return image;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados da imagem com validação
const imageData = {
  phone: validatePhoneNumber('5511999999999'),
  image: validateImage('https://i.imgur.com/example.jpg'),
  caption: sanitizeCaption('Sua legenda aqui!'),
};

// Remover caption se undefined
if (!imageData.caption) delete imageData.caption;

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-image`);
const postData = JSON.stringify(imageData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Client-Token': clientToken,
    'Content-Length': Buffer.byteLength(postData),
  },
  timeout: 30000,
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      console.log('Imagem enviada. MessageId:', result.messageId);
    } else {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
      console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro na requisição:', error.message);
});

req.on('timeout', () => {
  req.destroy();
  console.error('Timeout na requisição');
});

req.write(postData);
req.end();
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const https = require('https');
const { URL } = require('url');

const app = express();
app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateImage(image) {
  if (!image) {
    throw new Error('Imagem é obrigatória (URL ou Base64)');
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    try {
      const url = new URL(image);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL da imagem inválida');
    }
  } else if (image.startsWith('data:image/')) {
    if (!image.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Imagem deve ser uma URL ou Base64');
  }
  return image;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Rota para enviar imagem
app.post('/send-image', async (req, res) => {
  try {
    // Dados da imagem com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawImage = req.body.image || 'https://i.imgur.com/example.jpg';
    const rawCaption = req.body.caption || '';

    const imageData = {
      phone: validatePhoneNumber(rawPhone),
      image: validateImage(rawImage),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    // Remover caption se undefined
    if (!imageData.caption) delete imageData.caption;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-image`);
    const postData = JSON.stringify(imageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000, // 30 segundos
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao enviar imagem:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor Express rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const https = require('https');
const { URL } = require('url');

const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateImage(image) {
  if (!image) {
    throw new Error('Imagem é obrigatória (URL ou Base64)');
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    try {
      const url = new URL(image);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL da imagem inválida');
    }
  } else if (image.startsWith('data:image/')) {
    if (!image.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Imagem deve ser uma URL ou Base64');
  }
  return image;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Rota para enviar imagem
router.post('/send-image', async (ctx) => {
  try {
    // Dados da imagem com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawImage = ctx.request.body.image || 'https://i.imgur.com/example.jpg';
    const rawCaption = ctx.request.body.caption || '';

    const imageData = {
      phone: validatePhoneNumber(rawPhone),
      image: validateImage(rawImage),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    // Remover caption se undefined
    if (!imageData.caption) delete imageData.caption;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-image`);
    const postData = JSON.stringify(imageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000, // 30 segundos
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao enviar imagem:', err.message);
});

app.listen(3000, () => {
  console.log('Servidor Koa rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class SendImage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static String validateImage(String image) {
        if (image == null || image.trim().isEmpty()) {
            throw new IllegalArgumentException("Imagem é obrigatória (URL ou Base64)");
        }
        if (image.startsWith("http://") || image.startsWith("https://")) {
            try {
                URL url = new URL(image);
                String protocol = url.getProtocol();
                if (!protocol.equals("http") && !protocol.equals("https")) {
                    throw new IllegalArgumentException("URL deve usar HTTP ou HTTPS");
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("URL da imagem inválida");
            }
        } else if (image.startsWith("data:image/")) {
            if (!image.contains(";base64,")) {
                throw new IllegalArgumentException("Formato Base64 inválido");
            }
        } else {
            throw new IllegalArgumentException("Imagem deve ser uma URL ou Base64");
        }
        return image;
    }

    private static String sanitizeCaption(String caption) {
        if (caption == null || caption.trim().isEmpty()) {
            return null;
        }
        String trimmed = caption.trim();
        if (trimmed.length() > 1024) {
            throw new IllegalArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    public static void main(String[] args) {
        try {
            // Dados da imagem com validação
            String phone = validatePhoneNumber("5511999999999");
            String image = validateImage("https://i.imgur.com/example.jpg");
            String caption = sanitizeCaption("Sua legenda aqui!");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-image",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Criar JSON payload
            StringBuilder json = new StringBuilder();
            json.append("{\"phone\":\"").append(phone.replace("\"", "\\\""));
            json.append("\",\"image\":\"").append(image.replace("\"", "\\\""));
            if (caption != null) {
                json.append("\",\"caption\":\"").append(caption.replace("\"", "\\\""));
            }
            json.append("\"}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = json.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Verificar resposta
            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    System.out.println("Imagem enviada. Response: " + response.toString());
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                System.err.println("Erro HTTP " + responseCode + ": Requisição falhou");
            }

        } catch (Exception e) {
            System.err.println("Erro: " + e.getMessage());
        }
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

class SendImage
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string InstanceToken = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_INSTANCE_TOKEN";
    private static readonly string ClientToken = 
        Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static string ValidateImage(string image)
    {
        if (string.IsNullOrWhiteSpace(image))
        {
            throw new ArgumentException("Imagem é obrigatória (URL ou Base64)");
        }
        if (image.StartsWith("http://") || image.StartsWith("https://"))
        {
            if (!Uri.TryCreate(image, UriKind.Absolute, out Uri? uri) || 
                (uri.Scheme != "http" && uri.Scheme != "https"))
            {
                throw new ArgumentException("URL da imagem inválida. Deve usar HTTP ou HTTPS");
            }
        }
        else if (image.StartsWith("data:image/"))
        {
            if (!image.Contains(";base64,"))
            {
                throw new ArgumentException("Formato Base64 inválido. Use: data:image/type;base64,data...");
            }
        }
        else
        {
            throw new ArgumentException("Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)");
        }
        return image;
    }

    private static string? SanitizeCaption(string? caption)
    {
        if (string.IsNullOrWhiteSpace(caption))
        {
            return null;
        }
        string trimmed = caption.Trim();
        if (trimmed.Length > 1024)
        {
            throw new ArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados da imagem com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string image = ValidateImage("https://i.imgur.com/example.jpg");
            string? caption = SanitizeCaption("Sua legenda aqui!");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-image";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    image = image,
                    caption = caption
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Imagem enviada. Response: {result}");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro: {ex.Message}");
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido. Use formato: DDI + DDD + Número")
    }
    return cleaned, nil
}

func validateImage(image string) (string, error) {
    if image == "" {
        return "", fmt.Errorf("imagem é obrigatória (URL ou Base64)")
    }
    // Valida se é URL
    if strings.HasPrefix(image, "http://") || strings.HasPrefix(image, "https://") {
        parsed, err := url.Parse(image)
        if err != nil {
            return "", fmt.Errorf("URL da imagem inválida")
        }
        if parsed.Scheme != "http" && parsed.Scheme != "https" {
            return "", fmt.Errorf("URL deve usar HTTP ou HTTPS")
        }
    } else if strings.HasPrefix(image, "data:image/") {
        // Valida se é Base64
        if !strings.Contains(image, ";base64,") {
            return "", fmt.Errorf("formato Base64 inválido. Use: data:image/type;base64,data...")
        }
    } else {
        return "", fmt.Errorf("imagem deve ser uma URL (http/https) ou Base64 (data:image/...)")
    }
    return image, nil
}

func sanitizeCaption(caption string) (string, error) {
    trimmed := strings.TrimSpace(caption)
    if trimmed == "" {
        return "", nil
    }
    if len(trimmed) > 1024 {
        return "", fmt.Errorf("legenda excede limite de 1024 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados da imagem com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    image, err := validateImage("https://i.imgur.com/example.jpg")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    caption, err := sanitizeCaption("Sua legenda aqui!")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-image",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]interface{}{
        "phone": phone,
        "image": image,
    }
    if caption != "" {
        payload["caption"] = caption
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }

    req, err := http.NewRequest("POST", baseURL, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result map[string]interface{}
        if err := json.NewDecoder(resp.Body).Decode(&result); err == nil {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            fmt.Printf("Imagem enviada. MessageId: %v\n", result["messageId"])
        }
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_INSTANCE_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new InvalidArgumentException('Número de telefone inválido. Use formato: DDI + DDD + Número');
    }
    return $cleaned;
}

function validateImage($image) {
    if (empty($image)) {
        throw new InvalidArgumentException('Imagem é obrigatória (URL ou Base64)');
    }
    // Valida se é URL
    if (strpos($image, 'http://') === 0 || strpos($image, 'https://') === 0) {
        $parsed = parse_url($image);
        if ($parsed === false || !in_array($parsed['scheme'] ?? '', ['http', 'https'])) {
            throw new InvalidArgumentException('URL da imagem inválida. Deve usar HTTP ou HTTPS');
        }
    } 
    // Valida se é Base64
    elseif (strpos($image, 'data:image/') === 0) {
        if (strpos($image, ';base64,') === false) {
            throw new InvalidArgumentException('Formato Base64 inválido. Use: data:image/type;base64,data...');
        }
    } else {
        throw new InvalidArgumentException('Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)');
    }
    return $image;
}

function sanitizeCaption($caption) {
    if (empty(trim($caption))) {
        return null;
    }
    $trimmed = trim($caption);
    if (strlen($trimmed) > 1024) {
        throw new InvalidArgumentException('Legenda excede limite de 1024 caracteres');
    }
    return $trimmed;
}

try {
    // Dados da imagem com validação
    $phone = validatePhoneNumber('5511999999999');
    $image = validateImage('https://i.imgur.com/example.jpg');
    $caption = sanitizeCaption('Sua legenda aqui!');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-image',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'image' => $image,
    ];
    if ($caption !== null) {
        $payload['caption'] = $caption;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true, // ⚠️ SEGURANÇA: Sempre verifique certificados SSL
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erro na requisição: $error");
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Imagem enviada. MessageId: " . $result['messageId'] . "\n";
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        echo "Erro HTTP $httpCode: Requisição falhou\n";
    }

} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'json'
require 'uri'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_INSTANCE_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Use formato: DDI + DDD + Número'
  end
  cleaned
end

def validate_image(image)
  if image.nil? || image.strip.empty?
    raise ArgumentError, 'Imagem é obrigatória (URL ou Base64)'
  end
  # Valida se é URL
  if image.start_with?('http://', 'https://')
    begin
      uri = URI.parse(image)
      unless ['http', 'https'].include?(uri.scheme)
        raise ArgumentError, 'URL deve usar HTTP ou HTTPS'
      end
    rescue URI::InvalidURIError
      raise ArgumentError, 'URL da imagem inválida'
    end
  # Valida se é Base64
  elsif image.start_with?('data:image/')
    unless image.include?(';base64,')
      raise ArgumentError, 'Formato Base64 inválido. Use: data:image/type;base64,data...'
    end
  else
    raise ArgumentError, 'Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)'
  end
  image
end

def sanitize_caption(caption)
  return nil if caption.nil? || caption.strip.empty?
  trimmed = caption.strip
  if trimmed.length > 1024
    raise ArgumentError, 'Legenda excede limite de 1024 caracteres'
  end
  trimmed
end

begin
  # Dados da imagem com validação
  phone = validate_phone_number('5511999999999')
  image = validate_image('https://i.imgur.com/example.jpg')
  caption = sanitize_caption('Sua legenda aqui!')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-image")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  
  payload = {
    phone: phone,
    image: image
  }
  payload[:caption] = caption if caption
  
  request.body = JSON.generate(payload)

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Imagem enviada. MessageId: #{result['messageId']}"
  else
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    puts "Erro HTTP #{response.code}: Requisição falhou"
  end

rescue => e
  puts "Erro: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_INSTANCE_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido. Use formato: DDI + DDD + Número"])
    }
    return cleaned
}

func validateImage(_ image: String) throws -> String {
    if image.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Imagem é obrigatória (URL ou Base64)"])
    }
    if image.hasPrefix("http://") || image.hasPrefix("https://") {
        guard let url = URL(string: image),
              let scheme = url.scheme,
              (scheme == "http" || scheme == "https") else {
            throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "URL da imagem inválida. Deve usar HTTP ou HTTPS"])
        }
    } else if image.hasPrefix("data:image/") {
        if !image.contains(";base64,") {
            throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Formato Base64 inválido. Use: data:image/type;base64,data..."])
        }
    } else {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)"])
    }
    return image
}

func sanitizeCaption(_ caption: String?) throws -> String? {
    guard let caption = caption else { return nil }
    let trimmed = caption.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        return nil
    }
    if trimmed.count > 1024 {
        throw NSError(domain: "ValidationError", code: 6, userInfo: [NSLocalizedDescriptionKey: "Legenda excede limite de 1024 caracteres"])
    }
    return trimmed
}

// Dados da imagem com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let image = try validateImage("https://i.imgur.com/example.jpg")
    let caption = try sanitizeCaption("Sua legenda aqui!")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-image"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    var payload: [String: Any] = [
        "phone": phone,
        "image": image
    ]
    if let caption = caption {
        payload["caption"] = caption
    }
    request.httpBody = try JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro na requisição: \(error.localizedDescription)")
            return
        }

        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                if let data = data,
                   let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let messageId = result["messageId"] as? String {
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Imagem enviada. MessageId: \(messageId)")
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

    // Aguardar conclusão (em produção, use async/await ou completion handlers)
    RunLoop.main.run(until: Date(timeIntervalSinceNow: 35))

} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Use formato: DDI + DDD + Número"
    }
    return $cleaned
}

function Validate-Image {
    param([string]$Image)
    if ([string]::IsNullOrWhiteSpace($Image)) {
        throw "Imagem é obrigatória (URL ou Base64)"
    }
    # Valida se é URL
    if ($Image -match '^https?://') {
        try {
            $uri = [System.Uri]$Image
            if ($uri.Scheme -notin @('http', 'https')) {
                throw "URL deve usar HTTP ou HTTPS"
            }
        } catch {
            throw "URL da imagem inválida"
        }
    }
    # Valida se é Base64
    elseif ($Image -match '^data:image/') {
        if ($Image -notmatch ';base64,') {
            throw "Formato Base64 inválido. Use: data:image/type;base64,data..."
        }
    } else {
        throw "Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)"
    }
    return $Image
}

function Sanitize-Caption {
    param([string]$Caption)
    if ([string]::IsNullOrWhiteSpace($Caption)) {
        return $null
    }
    $trimmed = $Caption.Trim()
    if ($trimmed.Length -gt 1024) {
        throw "Legenda excede limite de 1024 caracteres"
    }
    return $trimmed
}

try {
    # Dados da imagem com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $image = Validate-Image -Image "https://i.imgur.com/example.jpg"
    $caption = Sanitize-Caption -Caption "Sua legenda aqui!"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-image"

    $body = @{
        phone = $phone
        image = $image
    }
    if ($caption) {
        $body.caption = $caption
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Imagem enviada. MessageId: $($response.messageId)"

} catch {
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "Erro HTTP $statusCode : Requisição falhou"
    } else {
        Write-Host "Erro: $($_.Exception.Message)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "image": "https://i.imgur.com/example.jpg",
 "caption": "Sua legenda aqui!"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:

- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA`, `SEU_TOKEN` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `image` (URL válida HTTP/HTTPS ou Base64 válido) e `caption` (máximo 1024 caracteres) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido. Use formato: DDI + DDD + Número");
    }
    return cleaned;
}

std::string validateImage(const std::string& image) {
    if (image.empty()) {
        throw std::invalid_argument("Imagem é obrigatória (URL ou Base64)");
    }
    // Valida se é URL
    std::regex urlPattern("^https?://");
    if (std::regex_search(image, urlPattern)) {
        // URL válida
    }
    // Valida se é Base64
    else if (image.find("data:image/") == 0) {
        if (image.find(";base64,") == std::string::npos) {
            throw std::invalid_argument("Formato Base64 inválido. Use: data:image/type;base64,data...");
        }
    } else {
        throw std::invalid_argument("Imagem deve ser uma URL (http/https) ou Base64 (data:image/...)");
    }
    return image;
}

std::string sanitizeCaption(const std::string& caption) {
    std::string trimmed = caption;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        return "";
    }
    if (trimmed.length() > 1024) {
        throw std::invalid_argument("Legenda excede limite de 1024 caracteres");
    }
    return trimmed;
}

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // ⚠️ SEGURANÇA: Use variáveis de ambiente
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        // Dados da imagem com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string image = validateImage("https://i.imgur.com/example.jpg");
        std::string caption = sanitizeCaption("Sua legenda aqui!");

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-image";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"image\":\"" + image + "\"";
        if (!caption.empty()) {
            jsonPayload += ",\"caption\":\"" + caption + "\"";
        }
        jsonPayload += "}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        // Configurar headers
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        // Configurar cURL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Imagem enviada. Response: " << responseData << std::endl;
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            if (res != CURLE_OK) {
                std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
            }
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

**Compilação:**

```bash
# Requer libcurl-dev
g++ -o send_image send_image.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

// Validação de entrada (segurança)
int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    for (int i = 0; phone[i] != '\0'; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    int len = strlen(cleaned);
    if (len < 10 || len > 15) {
        return 0; // Inválido
    }
    return 1; // Válido
}

int validateImage(const char* image) {
    if (image == NULL || strlen(image) == 0) {
        return 0; // Inválido
    }
    // Valida se é URL
    if (strncmp(image, "http://", 7) == 0 || strncmp(image, "https://", 8) == 0) {
        return 1; // URL válida
    }
    // Valida se é Base64
    if (strncmp(image, "data:image/", 11) == 0) {
        if (strstr(image, ";base64,") == NULL) {
            return -1; // Base64 inválido
        }
        return 1; // Base64 válido
    }
    return 0; // Inválido
}

int sanitizeCaption(const char* caption, char* sanitized) {
    if (caption == NULL || strlen(caption) == 0) {
        sanitized[0] = '\0';
        return 0; // Vazio
    }
    
    int start = 0;
    int end = strlen(caption) - 1;
    
    while (isspace(caption[start]) && caption[start] != '\0') start++;
    while (end > start && isspace(caption[end])) end--;
    
    if (start > end) {
        sanitized[0] = '\0';
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    if (len > 1024) {
        return -1; // Muito longo
    }
    
    strncpy(sanitized, caption + start, len);
    sanitized[len] = '\0';
    return 1; // Válido
}

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    // Dados da imagem com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    const char* image = "https://i.imgur.com/example.jpg";
    int imageResult = validateImage(image);
    if (imageResult == 0) {
        fprintf(stderr, "Erro de validação: Imagem é obrigatória (URL ou Base64)\n");
        return 1;
    } else if (imageResult == -1) {
        fprintf(stderr, "Erro de validação: Formato Base64 inválido\n");
        return 1;
    }

    char caption[1025];
    int captionResult = sanitizeCaption("Sua legenda aqui!", caption);
    if (captionResult == -1) {
        fprintf(stderr, "Erro de validação: Legenda excede limite de 1024 caracteres\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-image", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[4096];
    if (captionResult == 1 && strlen(caption) > 0) {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"image\":\"%s\",\"caption\":\"%s\"}", phone, image, caption);
    } else {
        snprintf(jsonPayload, sizeof(jsonPayload), 
                 "{\"phone\":\"%s\",\"image\":\"%s\"}", phone, image);
    }

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    // Configurar headers
    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    // Configurar cURL
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        printf("Imagem enviada. Response: %s\n", responseData);
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        if (res != CURLE_OK) {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return 0;
}
```

**Compilação:**

```bash
# Requer libcurl-dev
gcc -o send_image send_image.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="Shield" size="md" /> Boas Práticas e Limites

### Limites Técnicos

- **Tamanho Máximo:** O WhatsApp limita o envio de mídias a **16MB**
- **Formatos Suportados:** JPG, JPEG, PNG, WEBP
- **Otimização:** Para um envio mais rápido, use imagens com menos de 5MB
- **URLs Públicas:** Certifique-se de que o link da imagem esteja acessível publicamente, sem necessidade de login

### Boas Práticas

**1. Sempre use URLs quando possível**
- URLs são mais eficientes e rápidas
- Reduzem o tamanho da requisição
- Melhor para imagens grandes

**2. Valide os dados antes de enviar**
- Verifique se o número de telefone está no formato correto
- Confirme que a URL da imagem está acessível
- Limite a legenda a 1024 caracteres

**3. Trate erros adequadamente**
- Sempre verifique a resposta da API
- Implemente retry para falhas temporárias
- Logue erros para debugging (sem expor tokens)

**4. Use variáveis de ambiente para credenciais**
- Nunca commite tokens no código-fonte
- Use arquivos `.env` ou variáveis de ambiente do sistema
- Rotacione tokens regularmente

**5. Monitore o status das mensagens**
- Use o `messageId` retornado para rastrear entrega
- Configure webhooks para receber atualizações de status
- Implemente alertas para falhas de entrega

---

## <Icon name="CheckCircle" size="md" /> Resposta da API

Quando você envia uma imagem, a API retorna uma resposta indicando se a requisição foi aceita.

### Resposta de Sucesso (200 OK)

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

| Atributos | Tipo | Descrição |
|:--- |:--- |:--- |
| `zaapId` | string | id no z-api. |
| `messageId` | string | id no whatsapp. |
| `id` | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId. |

**O que significa cada campo:**

- **`zaapId`**: ID único da mensagem no sistema Z-API (para rastreamento interno)
- **`messageId`**: Identificador único da sua mensagem no WhatsApp. **Guarde este ID!** Você pode usá-lo para:
  - Rastrear o status da entrega através dos webhooks
  - Consultar o status manualmente via API
  - Correlacionar mensagens enviadas com eventos recebidos
- **`id`**: ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId`

### Possíveis Erros

Se algo der errado, a API retornará um código de erro HTTP com uma mensagem explicativa:

- **400 Bad Request**: Dados inválidos (número errado, URL inacessível, formato inválido)
- **401 Unauthorized**: Token de autenticação inválido ou expirado
- **404 Not Found**: Instância não encontrada ou endpoint incorreto
- **429 Too Many Requests**: Limite de requisições excedido (rate limit)
- **500 Internal Server Error**: Erro interno do servidor (tente novamente)

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).
