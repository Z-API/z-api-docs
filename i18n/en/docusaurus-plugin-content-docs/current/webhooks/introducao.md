---
id: introducao
title: Understanding Webhooks
sidebar_position: 1
---

# <Icon name="Webhook" size="lg" /> Understanding Webhooks

Webhooks are the fundamental mechanism that allows Z-API to automatically notify your system in real-time whenever an important event occurs in your WhatsApp account. This section explains the concept, the importance, and how to implement webhooks efficiently.

## <Icon name="BookOpen" size="md" /> What You Will Learn in This Section

This section has been structured to provide a complete understanding of webhooks:

- **Fundamental concepts**: What are webhooks and why are they essential
- **Comparison with polling**: Understanding the difference and when to use each approach
- **Practical implementation**: How to configure and receive webhooks
- **Security**: Validation and protection of endpoints
- **Event types**: All available events and when they are triggered
- **Best practices**: Recommendations for robust and scalable implementations

## <Icon name="Target" size="md" /> The Problem Webhooks Solve

### <Icon name="QuestionCircle" size="sm" /> The Challenge of Real-Time Communication

Imagine you need to know when you receive a new message on WhatsApp to process it automatically. Without webhooks, you would have two options:

### Option 1: Polling (Periodic Query)

Your application would make constant requests to the Z-API asking "are there new messages?" every few seconds. This approach, known as **polling**, presents significant problems:

- **Inefficient resources**: Many requests without results (when there are no new messages)
- **Detection delays**: It can take up to 30 seconds or more to detect an event
- **Server overload**: Increases unnecessary load on both your server and the API server
- **Bandwidth consumption**: Constant requests consume network resources

### Option 2: Webhooks (Proactive Notifications)

With webhooks, Z-API automatically sends a notification to your server at the exact moment an event occurs. You don't need to ask - Z-API notifies you. This approach transforms your application from **reactive** (you query the API) to **proactive** (the API notifies you).

### <Icon name="CheckCircle" size="sm" /> Why Webhooks Are Essential

Webhooks are fundamental for efficient automations for several reasons:

- <Icon name="Clock" size="xs" /> **Real-time**: Instant response to events, without polling delays. Your automations can react immediately when something happens.

- <Icon name="Cpu" size="xs" /> **Efficiency**: Drastically reduces the number of API requests. You only receive notifications when there are actual events, no need for constant queries.

- <Icon name="TrendingUp" size="xs" /> **Scalability**: Allows processing thousands of events without overloading the system. Load is naturally distributed as events occur.

- <Icon name="Zap" size="xs" /> **Foundation for Automation**: Fundamental for chatbots, support systems, CRMs and complex integrations. Without webhooks, creating reactive automations would be practically unfeasible.

:::tip Fundamental Concept
**Webhooks = Proactive Automation**: Instead of your application doing constant polling (repeatedly asking "is there something new?"), webhooks deliver events instantly when they happen. This is the fundamental difference between basic automation and truly intelligent and efficient automation.
:::

---

:::info Explanatory Articles
For didactic explanations about webhooks using practical and accessible analogies:

- **[Webhooks vs Polling: Why Waiting is More Efficient Than Asking](/blog/webhooks-vs-polling-por-que-esperar-e-mais-eficiente)**: Understand why webhooks are much more efficient than polling, with a simple and practical explanation
- **[Webhooks Explained: The Waiter Metaphor for Real-Time Automations](/blog/webhooks-metáfora-garçom)**: Didactic explanation using the restaurant waiter analogy
:::

---

## <Icon name="Code2" size="md" /> How Webhooks Work Technically

### <Icon name="Network" size="sm" /> Communication Architecture

Webhooks implement a **push-based** communication pattern, where the server (Z-API) initiates communication by sending data to the client (your system), instead of the client having to request information.

**Basic flow:**

1. **Initial setup**: You register a public URL on your server in the Z-API panel

2. **Event occurs**: Something happens in your WhatsApp instance (new message, status change, etc.)

3. **Z-API detects**: Z-API identifies the event and prepares the data

4. **Notification sent**: Z-API makes an HTTP POST request to your URL with the event data

5. **Your system processes**: Your server receives, validates, and processes the notification

6. **Confirmation**: Your server responds with HTTP status 200 to confirm receipt

### <Icon name="Shield" size="sm" /> Important Technical Characteristics

**HTTP Protocol:**

- Webhooks use standard HTTP POST requests
- Support HTTPS for secure communication (highly recommended)
- Follow RESTful communication standards

**Data format:**

- Payloads are sent in JSON format
- Consistent structure across different event types
- Include metadata such as timestamp, instanceId, and event type

**Reliability:**

- Z-API attempts to resend failed webhooks (automatic retry)
- Configurable timeout for responses
- Delivery attempt logs available

**Security:**

- Validation via token in the `x-token` header
- Support for HTTPS for encryption in transit
- Origin validation recommended

---

## <Icon name="Puzzle" size="md" /> Implementation for No-Code Platforms

Webhooks are essential for creating reactive automations in no-code platforms like n8n, Make, Zapier, and others. They work as triggers that start workflows automatically when events happen.

**Basic process:**

1. Create a webhook node in your tool (generates public URL)

2. Configure the URL in the Z-API panel

3. Build a workflow processing the received data

:::info Complete Tutorial
For a complete step-by-step guide on configuring webhooks in no-code platforms, including practical examples and flow diagrams, see the article: [Configuring Z-API Webhooks in No-Code Platforms: A Complete Guide](/blog/webhooks-no-code-completo).
:::

---

## <Icon name="Code2" size="md" /> Implementation for Developers

To receive webhooks, you need to expose a public HTTP endpoint on your server that can receive POST requests. This section explains the technical aspects of implementation.

### <Icon name="Server" size="sm" /> Endpoint Requirements

Your webhook endpoint must meet the following requirements:

- **Public accessibility**: The URL must be accessible via the internet (cannot be localhost or private network)

- **HTTPS protocol**: Highly recommended for security (some services require it)

- **HTTP POST method**: Webhooks exclusively use POST requests

- **Fast response**: Must respond with HTTP status 200 within a few seconds (recommended: < 3 seconds)

- **Token validation**: Must validate the `x-token` header for security

### <Icon name="ListTree" size="sm" /> Detailed Technical Flow

The complete webhook process follows these steps:

1. <Icon name="MessageSquare" size="xs" /> **Event Occurs**: A new message is received in your WhatsApp instance, or another event happens (status change, connection, etc.)

2. <Icon name="Webhook" size="xs" /> **Z-API Processes**: Z-API detects the event, collects all relevant data, and assembles a structured JSON payload

3. <Icon name="Send" size="xs" /> **HTTP POST Request**: Z-API makes a POST request to the URL you configured in the panel, including:
   - HTTP headers (including `x-token` for validation)
   - JSON body with event data
   - Configurable timeout (usually 30 seconds)

4. <Icon name="Terminal" size="xs" /> **Your Server Processes**: Your server must perform these actions in order:

   - <Icon name="ShieldCheck" size="xs" /> **Validate the request**: Check the `x-token` header to ensure authenticity
   - <Icon name="Database" size="xs" /> **Process the data**: Execute your business logic (save to database, trigger other APIs, process commands, etc.)
   - <Icon name="CircleCheck" size="xs" /> **Respond quickly**: Return HTTP status 200 OK as soon as possible

:::warning Fast Response is Critical
Your endpoint must respond with `200 OK` within a few seconds (recommended: < 3 seconds). If Z-API does not receive a success response within the timeout, it will assume delivery failed and attempt to resend the webhook. This can cause duplicate processing.

**Solution for time-consuming operations:**

- Use asynchronous processing (queues, background workers)

- Respond with 200 OK immediately after validation

- Process data in background after responding

- Use queue systems like RabbitMQ, Redis Queue, AWS SQS, etc.
:::

### <Icon name="FileText" size="sm" /> Standard Webhook Structure

Every webhook sent by Z-API follows a consistent JSON structure, facilitating processing and validation in your system.

**Base structure:**

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    // Event-specific data
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Structure fields:**

- **`event`** (string): Type of event that occurred. Common values include:
  - `message`: New message received
  - `message.status`: Status change of a sent message
  - `instance.connected`: Instance connected
  - `instance.disconnected`: Instance disconnected
  - And other specific types documented in each section

- **`instanceId`** (string): Unique identifier for the WhatsApp instance where the event occurred. Useful when managing multiple instances.

- **`data`** (object): Contains the event-specific data. The structure varies according to event type:
  - For message events: message data (text, sender, media, etc.)
  - For status events: status information (messageId, previous status, new status)
  - For connection events: information about connection state

- **`timestamp`** (ISO 8601 string): UTC date and time when the event occurred, in ISO 8601 format. Example: `2024-01-01T12:00:00Z`

**Complete example (received message):**

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "message": "Hello, I need help",
    "timestamp": "2024-01-01T12:00:00Z",
    "isGroup": false
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

:::info Structure Consistency
All webhooks follow this consistent base structure, regardless of event type. This facilitates creating generic processors that can handle multiple event types in a unified way.
:::

### <Icon name="Shield" size="sm" /> Security: `x-token` Validation

**Why validation is essential:**

Anyone with knowledge of your webhook URL can send requests to it. Without validation, your URL is vulnerable to:

- Malicious requests with false data

- Denial of service (DoS) attacks

- Injection of invalid data into your system

- Improper consumption of server resources

**How Z-API protects:**

Z-API sends a **security token** in each webhook request, in the HTTP header `x-token`. This token is unique to your instance and is configured in the Z-API panel.

**Validation implementation:**

Your code should **always** check that the received token matches the configured token:

```javascript
// Example in Node.js/Express
app.post('/webhook', (req, res) => {
  const receivedToken = req.headers['x-token'];
  const expectedToken = process.env.ZAPI_WEBHOOK_TOKEN;
  
  if (receivedToken !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Process webhook only if token is valid
  // ... your logic here
});
```

**What to do if the token does not match:**

- Return HTTP status 401 (Unauthorized)
- Do not process the received data
- Log the unauthorized access attempt (for auditing)
- Optionally, block the source IP after multiple attempts

:::warning Critical Security
Never process webhooks without validating the `x-token`. This is the only way to ensure requests actually came from Z-API. Without this validation, your URL is completely vulnerable to malicious requests that could compromise your system.
:::

---

## <Icon name="ListTree" size="md" /> Available Webhook Types

Z-API offers webhooks for various event types. Each type has its own detailed documentation with specific data structure, examples, and use cases.

### <Icon name="MessageSquare" size="sm" /> Message Events

- **[On Message Received](./ao-receber)**: Triggered whenever a new message is received in your instance. This is the most common and fundamental webhook for chatbots and support systems.

- **[Message Status](./status-mensagem)**: Notifies changes in the status of messages you have sent. Allows tracking when messages are sent, delivered, read, or fail.

### <Icon name="Smartphone" size="sm" /> Instance Events

- **[Connection Status](./ao-conectar)**: Notifies when your instance connects to WhatsApp. Essential for monitoring and handling connections.

- **[Disconnection Status](./ao-desconectar)**: Notifies when your instance disconnects from WhatsApp. Useful for implementing auto-reconnection systems.

:::info Groups and Communities
For information on group and community events, see the [Groups](/docs/groups/introducao) and [Communities](/docs/communities/introducao) sections.
:::

### <Icon name="Settings" size="sm" /> Other Events

Explore the sidebar to see all available webhook types, each with complete documentation including:

- Exact payload structure
- Code examples for processing
- Practical use cases
- Specific error handling

---

## <Icon name="CheckCircle" size="md" /> Next Steps

Now that you understand the fundamental concepts of webhooks:

1. **Choose the event type** you want to monitor
2. **Configure your URL** in the Z-API panel
3. **Implement the endpoint** on your server or no-code platform
4. **Validate the `x-token`** for security
5. **Process the received data** according to your needs
6. **Test and iterate** based on the results

Each webhook type page includes complete and functional examples. Start with simple events (like receiving messages) and expand as your needs grow.