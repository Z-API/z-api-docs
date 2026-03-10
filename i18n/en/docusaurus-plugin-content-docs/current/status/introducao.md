---
id: introducao
sidebar_position: 1
title: Status
---
# <Icon name="CircleDashed" size="lg" /> Status Management

This section documents the Z-API status API, which allows for programmatic creation and management of WhatsApp statuses. Here you will learn to publish text, image, and video statuses, as well as respond to other users' statuses through RESTful endpoints.

## <Icon name="BookOpen" size="md" /> What You Will Learn in This Section

This section is structured to provide comprehensive knowledge on status management:

- **Fundamental Concepts**: Understanding what statuses are and how they work
- **Types of Statuses**: Text, image, and video
- **Programmatic Publishing**: Creating and publishing statuses through the API
- **Interacting with Statuses**: Responding to other users' statuses
- **Limitations and Best Practices**: Understanding restrictions and recommendations

## <Icon name="Target" size="md" /> Overview and Context

### <Icon name="Info" size="sm" /> What Are Statuses

Statuses are temporary messages on WhatsApp that disappear automatically after 24 hours. They function similarly to the Stories feature of other social media platforms, allowing for quick updates, visual content, and temporary information sharing with contacts.

**Key Features:**

- **Temporary**: Disappear automatically after 24 hours
- **Visibility**: Visible to all your contacts (or a custom list)
- **Multiple Formats**: Support text, image, and video
- **Engagement**: Allow interaction through responses
- **Real-time**: Ideal for sharing immediate updates

**Why Use Programmatic Statuses?**

- **Automated Marketing**: Publish promotions and offers automatically
- **Business Updates**: Share new information and important details
- **Engagement**: Keep contacts informed about activities
- **Visual Content**: Share images and videos temporarily
- **System Integration**: Publish statuses based on external system events

---

## <Icon name="ListChecks" size="md" /> Available Operations

The status API offers the following endpoints, each documented in its own page:

### <Icon name="Send" size="sm" /> Publishing Operations

- **[Send Text Status](/docs/status/enviando-texto)**: Publish a status with just formatted text. Ideal for short and direct messages.

- **[Send Image Status](/docs/status/enviando-imagem)**: Publish a status with an image and optional caption. Perfect for visual content and marketing.

- **[Send Video Status](/docs/status/enviando-video)**: Publish a status with a video and optional caption. Ideal for demonstrations and dynamic content.

### <Icon name="Reply" size="sm" /> Interaction Operations

- **[Respond to Status](/docs/status/responder-texto)**: Respond to another user's status. Allows interaction and engagement with contacts' statuses.

---

## <Icon name="BookOpen" size="md" /> Fundamental Concepts

### <Icon name="CircleDashed" size="sm" /> Lifecycle of a Status

**Publishing:**

When you publish a status, it becomes immediately visible to your contacts (or a custom list if configured).

**Visibility:**

Statuses are visible for 24 hours from the time of publication. During this period, contacts can view and interact with the status.

**Expiration:**

After 24 hours, the status is automatically removed by WhatsApp. This removal is permanent and cannot be reversed.

**Important:**

Once a status expires, it cannot be recovered. If you need to keep the content, make sure to have a copy before expiration.

### <Icon name="List" size="sm" /> Available Types of Statuses

WhatsApp supports three main types of statuses, each with specific characteristics:

**Text Status:**

Statuses containing only formatted text. Ideal for short messages, quotes, or quick updates.

**Characteristics:**
- Supports basic formatting (bold, italic)
- No specific character limit (but recommend keeping concise)
- Instant loading
- Compatible with all devices

**Image Status:**

Statuses containing an image with optional caption. Perfect for visual content, promotions, and graphical information.

**Characteristics:**
- Supported formats: JPG, JPEG, PNG, WEBP
- Maximum size: 16MB (recommended: < 5MB para melhor performance)
- Legenda opcional para contexto adicional
- Alta taxa de engajamento

**Status de Vídeo:**

Status contendo um vídeo com legenda opcional. Ideal para demonstrações, tutoriais e conteúdo dinâmico.

**Características:**
- Formatos suportados: MP4, 3GP
- Duração máxima: 16 segundos
- Tamanho máximo: 16MB
- Legenda opcional para contexto
- Alto potencial de engajamento

---

## <Icon name="AlertTriangle" size="md" /> Limitations and Restrictions

It is crucial to understand the limitations of the status system to implement robust solutions and avoid issues.

### <Icon name="Timer" size="sm" /> Temporal Limits

**Automatic Expiration:**

Statuses expire automatically exactly 24 hours after the time of publication. This is a limitation imposed by WhatsApp and cannot be changed.

**Daily Limit:**

You can publish a maximum of **30 statuses per day**. This limit applies to each WhatsApp account and cannot be increased.

**Practical Implications:**

- Plan your publishing strategy considering the daily limit
- Prioritize more important content if you need to publish multiple statuses
- Implement queue systems if you need to publish more than 30 statuses
- Monitor the number of published statuses to avoid hitting the limit

### <Icon name="Video" size="sm" /> Media Limits

**Videos:**

- **Maximum Duration**: 16 seconds
- **Maximum Size**: 16MB
- **Supported Formats**: MP4, 3GP

**Images:**

- **Maximum Size**: 16MB
- **Supported Formats**: JPG, JPEG, PNG, WEBP
- **Recommendation**: Use images smaller than 5MB for better performance

**Best Practices:**

- Optimize media before publishing to reduce size
- Use video compression to maintain quality within the 16-second limit
- Test formats and sizes before publishing in production
- Implement size and duration validation before sending

:::warning Respect Limits
Respecting status limits is essential to avoid errors and blocks. Always validate content before publishing: a maximum of 30 statuses per day, videos up to 16 seconds, and media within the size limits. Implement validations and queue systems to manage publications within these constraints.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you understand the fundamental concepts of the status API, follow these learning paths:

### <Icon name="PlayCircle" size="sm" /> For Beginners

1. **[Send Your First Status](/docs/status/enviando-texto)**: Learn to publish text statuses
2. **[Create Media Statuses](/docs/status/enviando-imagem)**: Understand how to publish images and videos
3. **[Interact with Statuses](/docs/status/responder-texto)**: Learn to respond to other users' statuses

### <Icon name="Code2" size="sm" /> For Developers

1. **Automated Publishing**: Implement systems that publish statuses automatically
2. **Content Validation**: Create validations to ensure content is within limits
3. **Queue Systems**: Implement queues to manage publications within the daily limit

### <Icon name="Target" size="sm" /> Common Use Cases

- **Automated Marketing**: Publish promotions and offers automatically
- **Business Updates**: Share new information and important details
- **Visual Content**: Share images and videos temporarily
- **Engagement**: Keep contacts informed about activities

Each operation page includes complete code examples, request structures/resposta and practical use cases. Start with simple operations and expand as your needs grow.