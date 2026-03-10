---
id: imagem
title: Send Image
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CreditCard" size="lg" /> Send Image

Send images to your contacts via WhatsApp, making your communications more visual, informative, and engaging. 

**Why send images?**

Messages with images have **up to 2.3x more engagement** than text-only messages. Images capture attention immediately, convey complex information quickly, and create a stronger emotional connection with your contacts.

**What you can do:**

This feature allows you to include an optional caption to provide additional context to the image, improving understanding and the impact of your message. You can send:

- **Product photos** for e-commerce and sales
- **Screenshots** for technical support and tutorials
- **QR Codes** for payments, check-ins, and authentication
- **Infographics** for marketing and visual communication
- **Visual documents** like digital business cards
- **Promotions and offers** with attractive images

**Supported formats:**

WhatsApp accepts the following image formats: **JPG, JPEG, PNG, and WEBP**. The maximum allowed size is **16MB**, but we recommend using images smaller than 5MB for faster and more efficient sending.

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Visual Confirmation:** Send a photo of a product the customer just bought.
- **Technical Support:** Send a screenshot to illustrate a step-by-step process.
- **Marketing:** Promote a new product or offer with an attractive image.
- **Sending Visual Documents:** Send a QR Code for payment or a digital business card.

---

## <Icon name="HelpCircle" size="md" /> URL vs. Base64: Which Format to Use?

You can send images using two different formats. Understanding when to use each one is essential to optimize performance, reduce costs, and ensure successful sending.

### 1. URL (Recommended and Preferred) ⭐

**What is it?**

A direct HTTP/HTTPS link to an image hosted publicly on the internet. Example: `https://meusite.com/produto.jpg` or `https://cdn.exemplo.com/imagens/promo.jpg`.

**How it works:**

1. You provide the image URL in the request
2. Z-API downloads the image from the provided URL
3. Z-API processes and sends the image via WhatsApp
4. The image is delivered to the recipient

**When to use?**

Use this format in the **vast majority of cases** (95%+). It is significantly more efficient, faster, and consumes fewer resources.

**Requirements:**

- The image must be **publicly accessible** (no authentication, login, or tokens)
- The URL must use **HTTP or HTTPS** (not `file://` or other protocols)
- The server must allow **direct download** of the image
- The image must be **available on the internet** (not just on your local network)

**Advantages:**

- ✅ **Faster processing**: Z-API downloads the image directly, without processing large data in the request
- ✅ **Lower memory consumption**: The image does not need to be Base64 encoded before sending
- ✅ **Better for large images**: URLs work well even with images of several MB
- ✅ **Smaller requests**: The HTTP request contains only the URL (a few bytes), not the entire image
- ✅ **Efficient caching**: Z-API can cache images by URL, improving performance on resends

**Usage example:**

```json
{
  "phone": "5511999999999",
  "image": "https://cdn.meusite.com/produtos/produto-123.jpg",
  "caption": "Confira nosso novo produto!"
}
```

### 2. Base64 (Alternative) ⚠️

**What is it?**

An encoding of the image binary file into an alphanumeric text string. The full format is: `data:image/type;base64,encoded_data...`

**Example:**
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=
```

**How it works:**

1. You convert the binary image to Base64
2. You include the complete Base64 string in the request
3. Z-API decodes the Base64 and processes the image
4. Z-API sends the image via WhatsApp

**When to use?**

**Only when the image is not available at a public URL.** Specific cases:

- ✅ Images **dynamically generated** by your system (charts, reports, generated QR codes)
- ✅ Images **processed in memory** that have not yet been saved to a server
- ✅ Images from **internal systems** that cannot be exposed publicly
- ✅ **Prototypes and tests** without hosting infrastructure

**Disadvantages:**

- ❌ **Much larger requests**: A 1MB image becomes ~1.3MB in Base64 (33% larger)
- ❌ **Slower processing**: Requires additional encoding/decoding
- ❌ **Higher resource consumption**: More memory and CPU required
- ❌ **Size limits**: HTTP requests have size limits (usually 5-10MB)
- ❌ **Not scalable**: Not recommended for high-volume production

**Usage example:**

```json
{
  "phone": "5511999999999",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "caption": "QR Code gerado dinamicamente"
}
```

### Quick Comparison

| Aspect | URL | Base64 |
|---------|-----|--------|
| **Request size** | Small (short URL) | Large (encoded image) |
| **Performance** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Regular |
| **Memory usage** | Low | High |
| **When to use** | 95% of cases | Specific cases |
| **Recommendation** | ✅ Whenever possible | ⚠️ Only when necessary |

### Final Recommendation

**Always prefer URL.** If you don't have a public URL, consider:

1. **Host the image** on a CDN service (Cloudflare, AWS S3, etc.)
2. **Use a temporary hosting** service (Imgur, Cloudinary, etc.)
3. **Create an endpoint** on your server that returns the image publicly

Base64 should be used only as a **last resort** when there is no alternative for public hosting.

:::tip Performance Tip
Always prefer using **URL**, as processing is much faster and consumes fewer resources.
:::

![Example message with image](/img/send-message-image.jpeg)

---

## <Icon name="Wand2" size="md" /> For No-Code Users

In your automation tool, you will find the following fields to fill in:

### Required Fields

1. **`phone`**: The contact number that will receive the image. Use the full format: Country Code + Area Code + Number (e.g., `5511999999999`).
2. **`image`**: The main field. Here you will paste the **public URL** of your image. The URL must be publicly accessible on the internet.

### Optional Fields

3. **`caption`**: The text that will appear as a caption below the image. You can use formatting (bold with `*text*`, italic with `_text_`) here.

4. **`messageId`**: If you want to reply to a specific message, paste the `messageId` of the original message here. This creates a threaded conversation in WhatsApp.

5. **`delayMessage`**: If you are going to send multiple images in sequence, use this field to space out the sending (between 1 and 15 seconds). This helps avoid blocks and makes communication more natural.

6. **`viewOnce`**: Set to `true` if you want the image to disappear after being viewed (disappearing photo). Useful for sensitive or temporary images.

**Tip:** In most cases, you only need to fill in `phone` and `image`. The other fields are optional and can be left blank.

---

## <Icon name="Code" size="md" /> How It Works: Understanding the Process

Before looking at the code, let's understand **how** image sending works and **what** happens behind the scenes.

### The Complete Sending Flow

When you send an image through Z-API, the following process occurs:

1. **You make the request**: Send the data (recipient number, image URL, optional caption) to the Z-API endpoint
2. **Z-API processes**: Z-API downloads the image from the URL (if URL) or decodes the Base64 (if Base64)
3. **Z-API validates**: Checks if the image is in a valid format and within size limits
4. **Z-API sends**: Forwards the image through the WhatsApp connected to your instance
5. **WhatsApp delivers**: The image arrives in the recipient's WhatsApp
6. **You receive confirmation**: Z-API returns a `messageId` for tracking

### Understanding the Parameters

Before building your request, understand each field:

**`phone` (required)**
- **What is it?** The recipient's phone number in the full international format
- **Correct format:** Country Code + Area Code + Number, all together, no spaces or special characters
- **Example:** `5511999999999` (Brazil: +55, Area Code: 11, Number: 999999999)
- **Why this format?** WhatsApp requires numbers in international format to ensure correct delivery in any country

**`image` (required)**
- **What is it?** The image you want to send, as a public URL or Base64 string
- **URL:** A direct HTTP/HTTPS link to the image (e.g., `https://meusite.com/foto.jpg`)
- **Base64:** The image encoded as text (e.g., `data:image/jpeg;base64,...`)
- **Why two formats?** URLs are more efficient, but Base64 allows sending dynamically generated images without hosting

**`caption` (optional)**
- **What is it?** Text that appears as a caption below the image in WhatsApp
- **Limit:** Maximum 1024 characters
- **Formatting:** Supports bold (`*text*`), italic (`_text_`) and other WhatsApp formatting
- **When to use?** When you want to add context, explanation, or call-to-action along with the image

**`messageId` (optional)**
- **What is it?** Allows you to reply to an existing message in the chat, creating a threaded conversation
- **How it works?** Use the `messageId` of the message you want to reply to. The image will be sent as a reply to that message
- **When to use?** When you want to keep the conversation context, replying to a specific question or comment
- **Example:** If the customer asked "do you have a photo of this product?", you can reply with the image using their message's `messageId`
- **Important:** See more about [how to reply to messages](./responder)

**`delayMessage` (optional)**
- **What is it?** Controls the wait time (in seconds) before sending the next message
- **Values:** Between 1 and 15 seconds
- **Default:** If not provided, the system uses an automatic delay of 1 to 3 seconds
- **When to use?** Useful when sending multiple messages in sequence to avoid blocks and make communication more natural
- **Example:** If you are going to send 5 images in a row, use `delayMessage: 3` to space them out

**`viewOnce` (optional)**
- **What is it?** Defines whether the image will be a view-once message (disappearing photo after being viewed)
- **Type:** Boolean (`true` or `false`)
- **Default:** `false` (normal image, remains in chat)
- **When to use?** To send sensitive or temporary images that should disappear after viewing
- **Important:** Once viewed, the image cannot be seen again by the recipient

### Endpoint and HTTP Method

The endpoint to send images is:

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-image
```

**Why POST?** Because you are **sending data** (the image) to the server, not just querying information. POST requests allow you to send data in the request body.

**What are `{instanceId}` and `{token}`?** They are unique identifiers for your Z-API instance. They ensure the message is sent by the correct instance and with the proper permissions.

### Request Structure

A typical request has this structure:

**Headers:**
- `Content-Type: application/json` - Informs that you are sending JSON data
- `Client-Token: your-token` - Authentication token for your Z-API account

**Body:**
- A JSON object with the three fields: `phone`, `image` and optionally `caption`

**Minimal example (URL only):**

```json
{
  "phone": "5511999999999",
  "image": "https://i.imgur.com/example.jpg"
}
```

**Complete example (with caption):**

```json
{
  "phone": "5511999999999",
  "image": "https://i.imgur.com/example.jpg",
  "caption": "Confira nosso novo produto! *Promoção limitada*"
}
```

### What to Expect in the Response

If everything goes well, you will receive a response like this:

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

**What if there's an error?** The API will return an HTTP error code (like 400, 401, 404) with a message explaining the problem. Always check the response to ensure the message was accepted.

---

## <Icon name="Shield" size="md" /> Best Practices and Limits

- **Maximum Size:** WhatsApp limits media sending to **16MB**.
- **Supported Formats:** JPG, JPEG, PNG, WEBP.
- **Optimization:** For faster sending, use images smaller than 5MB.
- **Public URLs:** Ensure the image link is publicly accessible, without requiring login.

---

## <Icon name="GraduationCap" size="md" /> Step by Step: Your First Send

Let's learn by sending an image step by step. This tutorial assumes you already have a connected instance and your credentials at hand.

### Step 1: Prepare Your Image

First, you need an image hosted publicly on the internet.

**Hosting options:**

1. **Your own server**: If you have a website, host the image there
2. **CDN/Hosting services**: Use services like Imgur, Cloudinary, AWS S3, or any CDN
3. **Quick test**: For testing, you can use a public example image

**Important:** The URL must be directly accessible. Test by opening the URL in your browser - if you can see the image, it's ready to use.

### Step 2: Build Your Request

You need three pieces of information:

1. **Recipient number**: In international format (e.g., `5511999999999`)
2. **Image URL**: The complete link to the image (e.g., `https://exemplo.com/imagem.jpg`)
3. **Caption (optional)**: Text to appear below the image

### Step 3: Make the Request

Use any tool that allows making HTTP POST requests:

- **Postman**: Visual tool, perfect for beginners
- **cURL**: Command line, quick for testing
- **Code**: JavaScript, Python, PHP, etc. - for integration into applications

### Step 4: Check the Response

If you receive a `messageId`, your message was accepted and is in the queue. In a few seconds, it will arrive in the recipient's WhatsApp.

---

## <Icon name="FileCode" size="md" /> Practical Code Examples

Below are practical and simplified examples in different languages. These examples focus on **teaching** the concept, not on showing complex code.


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

**Compilation:**

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

**Compilation:**

```bash
# Requer libcurl-dev
gcc -o send_image send_image.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="Shield" size="md" /> Best Practices and Limits

### Technical Limits

- **Maximum Size:** WhatsApp limits media sending to **16MB**
- **Supported Formats:** JPG, JPEG, PNG, WEBP
- **Optimization:** For faster sending, use images smaller than 5MB
- **Public URLs:** Ensure the image link is publicly accessible, without requiring login

### Best Practices

**1. Always use URLs when possible**
- URLs are more efficient and faster
- Reduce request size
- Better for large images

**2. Validate data before sending**
- Check if the phone number is in the correct format
- Confirm the image URL is accessible
- Limit caption to 1024 characters

**3. Handle errors appropriately**
- Always check the API response
- Implement retry for temporary failures
- Log errors for debugging (without exposing tokens)

**4. Use environment variables for credentials**
- Never commit tokens in source code
- Use `.env` files or system environment variables
- Rotate tokens regularly

**5. Monitor message status**
- Use the returned `messageId` to track delivery
- Configure webhooks to receive status updates
- Implement alerts for delivery failures

---

## <Icon name="CheckCircle" size="md" /> API Response

When you send an image, the API returns a response indicating whether the request was accepted.

### Success Response (200 OK)

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

| Attributes | Type | Description |
|:--- |:--- |:--- |
| `zaapId` | string | id in z-api. |
| `messageId` | string | id in whatsapp. |
| `id` | string | Added for Zapier compatibility, it has the same value as messageId. |

**What each field means:**

- **`zaapId`**: Unique message ID in the Z-API system (for internal tracking)
- **`messageId`**: Unique identifier for your message in WhatsApp. **Save this ID!** You can use it to:
  - Track delivery status via webhooks
  - Manually query status via API
  - Correlate sent messages with received events
- **`id`**: ID for compatibility with Zapier and legacy systems. Has the same value as `messageId`

### Possible Errors

If something goes wrong, the API will return an HTTP error code with an explanatory message:

- **400 Bad Request**: Invalid data (wrong number, inaccessible URL, invalid format)
- **401 Unauthorized**: Invalid or expired authentication token
- **404 Not Found**: Instance not found or incorrect endpoint
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Internal server error (try again)

**Important:**

- `messageId` is the main identifier you should use to track the message
- `zaapId` is used internally by Z-API for processing
- `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered, read, or if there was any error, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber).