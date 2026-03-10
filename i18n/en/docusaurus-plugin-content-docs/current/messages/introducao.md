---
id: introducao
sidebar_position: 1
title: Overview of Messages
---
# Overview of Messages

This section is dedicated to understanding how to send messages through the Z-API. Here you will learn the fundamental concepts, request structure, and standards that apply to all types of messages available on the platform.

## What You Will Learn in This Section

This section is structured to be progressive and educational:

- **Fundamentals**: How sending messages via REST APIs works
- **Request Structure**: Common patterns that apply to all message types
- **Message Types**: Detailed guides for each format available (text, media, interactive, commercial)
- **Practical Examples**: Functional code and real use cases
- **Best Practices**: Recommendations for robust and efficient implementations

**Important**: This page establishes the fundamentals. We recommend reading this introduction before exploring specific message types, as the concepts presented here apply universally.

---

## Anatomy of a Send Request

### Conceptual Fundamental

When you send a message through the Z-API, you are making an **HTTP POST request** to a specific endpoint on the REST API. This request contains all the necessary information for the Z-API to process and send your message via the connected WhatsApp to your instance.

**Why understanding the structure is important:**

Understanding the request structure allows:
- Correct implementation from the start
- Debugging issues when something doesn't work as expected
- Adapting requests for different types of messages
- Efficient integration with no-code tools

### Basic Universal Structure

All send message requests in the Z-API follow a common base structure, regardless of the type of message:

```json
{
  "phone": "5511999999999",
  "message": "Conteúdo da mensagem ou estrutura específica do tipo"
}
```

**Required fields:**

- <Icon name="Phone" size="xs" /> **`phone`** (string, required): The recipient's number in full international format without spaces, hyphens, or special characters. The format is: country code + DDD + number, all concatenated.

  **Practical example:**
  - Country: Brazil (+55)
  - DDD: 11 (São Paulo)
  - Number: 999999999
  - **Result**: `5511999999999`

  **Incorrect format**: `+55 11 99999-9999` or `(11) 99999-9999`

- <Icon name="Text" size="xs" /> **`message`** (string or object, required): The content of the message. This field varies significantly depending on the type of message you are sending:
  - **Simple text message**: String with the text
  - **Image message**: Object with URL or Base64 of the image and optional caption
  - **Interactive message**: Complex object with buttons, lists, or carousels
  - **Commercial message**: Object with product information or catalog

Each type of message documented in this section includes detailed examples of how to structure the `message` field correctly.

:::info Number Format: Universal Rule
This rule applies to **all** endpoints in the Z-API that require phone numbers: always use the full international format without spaces, hyphens, parentheses, or other special characters. This standardization ensures consistent processing and avoids validation errors.
:::

### Understanding the API Response

After sending your request, the Z-API processes initial validation and responds immediately - usually within 100ms - with a confirmation that your message was received and added to the processing queue.

**Why is the response immediate?**

The Z-API uses an asynchronous queuing system. This means:
1. Your request is validated and accepted immediately
2. The message is added to a processing queue
3. Actual processing and sending occur asynchronously
4. You receive notifications about status through webhooks

This architecture allows high performance and scalability, even with large volumes of sends.

**Response structure:**

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

**Response fields:**

- <Icon name="IdCard" size="xs" /> **`messageId`** (string): A unique and immutable identifier for your message. This ID is crucial for:
  - Tracking the status of the message through webhooks
  - Correlating events (send, delivery, read) with the original message
  - Implementing retry and error handling systems
  - Auditing and logging sent messages

  **Important**: Always store this value. You cannot retrieve it later without it.

:::warning Storage of messageId is Critical
The `messageId` is your only means to track a message after sending. Without it, you cannot correlate webhook status events with the original message. Implement always a storage system (database, cache, etc.) to maintain the association between `messageId` and your internal data.
:::

---

## Choosing the Message Type

The Z-API offers a wide variety of message formats, each optimized for different purposes. Choosing the right type improves the recipient's experience and increases engagement rates.

**Main categories:**
- **Text**: Simple notifications, quick replies, transactional messages
- **Media**: Images, videos, audio, documents for greater visual engagement
- **Interactive**: Buttons, lists, carousels to guide users
- **Commercial**: Products, catalogs, shopping cart for e-commerce
- **Specialized**: Contacts, location, surveys for specific cases

:::info Complete Guide
For a detailed guide on how to choose the ideal message type based on objectives, context, and use cases, see the article: [Complete Guide: Choosing the Right Message Type in Z-API](/blog/escolhendo-tipo-mensagem-ideal).
:::

---

## Organizing the Messaging Documentation

This section is organized hierarchically to facilitate navigation and progressive learning. Each type of message has its own page with:

- **Detailed description**: What it is, when to use it, and why it matters
- **Request structure**: Required and optional fields explained
- **Practical examples**: Functional code in multiple languages
- **Use cases**: Real implementation examples
- **Error handling**: Common error codes and how to resolve them
- **Best practices**: Specific recommendations for each type

### Categories of Messages

The documentation is organized into the following main categories:

#### Text Messages

Complete documentation for sending text messages:
- Simple and formatted text
- Messages with links and Markdown formatting
- Limitations and specific characteristics

#### Media

Detailed guides for all types of media:
- Images (JPG, PNG, WEBP)
- Videos (MP4, 3GP)
- Audio and voice messages
- Documents (PDF, DOCX, XLSX, etc.)
- Stickers and GIFs

#### Interactive Messages

Documentation to create interactive experiences:
- Quick action buttons
- Option lists and menus
- Content carousels
- Multi-section messages

#### Commercial Resources

Guides for WhatsApp Business functionalities:
- Individual products
- Product catalogs
- Order management and shopping cart
- Payment system integration

#### Specialized Formats

Documentation for specific use cases:
- Contact sharing
- Location sending
- Survey creation
- Message reactions

### How to Navigate

**For beginners:**
1. Read this entire page to understand the fundamentals
2. Start with [Simple Text](./texto-simples) to send your first message
3. Explore other types as needed

**For developers:**
1. Use this page as a quick reference for structure
2. Navigate directly to the required message type
3. Consult code examples and implement

**For no-code users:**
1. Understand the request structure on this page
2. Use payload examples as references in your tool
3. Adapt JSON examples to nodes of your platform

:::info Explanatory Article
To better understand how to choose the right message format and increase engagement, especially useful for automators who want to maximize results, see the article: [WhatsApp Messages: Choose the Right Format and Increase Engagement](/blog/mensagens-whatsapp-escolha-formato-certo-aumente-engajamento). The article explains simply when to use each type of message and why the format matters so much.
:::

---

## Next Steps

Now that you understand the fundamentals of sending messages through the Z-API:

1. **Choose a message type** based on your use case
2. **Navigate to specific documentation** in the sidebar
3. **Implement following provided examples**
4. **Configure webhooks** for status notifications
5. **Test and iterate** based on results

Each page of message types includes complete and functional examples. Start simple and add complexity as needed.

---