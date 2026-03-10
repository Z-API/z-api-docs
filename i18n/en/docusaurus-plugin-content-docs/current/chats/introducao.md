---
id: introducao
sidebar_position: 1
title: Chats
---
# <Icon name="MessageCircle" size="lg" /> Chat Management

This section documents the Z-API chat API, which allows you to manage all your WhatsApp conversations and chats programmatically. Here you will learn how to organize conversations, control read states, archive chats, and manage notifications through RESTful endpoints.

## <Icon name="BookOpen" size="md" /> What You'll Learn in This Section

This section is structured to provide comprehensive knowledge about chat management:

- **Fundamental Concepts**: Understanding chat types and available states
- **Listing and Querying**: Obtain information about chats and conversations
- **Organization**: Archive, pin, and organize chats
- **Read Control**: Mark messages as read
- **Notification Management**: Mute and control alerts
- **Cleaning and Deletion**: Clean history and delete conversations
- **Best Practices**: Recommendations for efficient organization

## <Icon name="Target" size="md" /> Overview and Context

### <Icon name="Info" size="sm" /> What is the Chat API

The Z-API chat API provides complete programmatic control over your WhatsApp conversations. Through RESTful endpoints, you can perform organization and management operations that would otherwise be done manually through the app interface.

**Why manage chats programmatically?**

- **Automated Organization**: Automatically archive old or inactive chats
- **Prioritization**: Pin important chats for quick access
- **Notification Control**: Mute specific chats based on rules
- **Read Management**: Mark messages as read to maintain organization
- **Periodic Cleaning**: Automatically clean or delete old conversations
- **System Integration**: Synchronize chat state with external systems
- **Workflow Automation**: Incorporate chat management into automated workflows

### <Icon name="ListChecks" size="sm" /> API Capabilities

The chat API allows you to perform the following essential operations:

- **Listing**: Get all chats from your instance with filters and pagination
- **Metadata**: Retrieve detailed information about specific chats
- **Read**: Mark messages as read to update status
- **Archiving**: Archive and unarchive conversations for organization
- **Pinning**: Pin important chats at the top of the list
- **Notifications**: Mute or activate notifications for specific chats
- **Cleaning**: Clean message history from a chat
- **Deletion**: Permanently delete conversations
- **Expiration**: Configure temporary messages (disappearing messages)

---

## <Icon name="ListChecks" size="md" /> Available Operations

The chat API offers the following endpoints, each documented on its own page:

### <Icon name="List" size="sm" /> Query Operations

- **[Get chats](/docs/chats/pegar)**: List all chats from your instance with filtering and pagination options. Essential for getting an overview of all conversations.

- **[Get metadata](/docs/chats/metadata)**: Retrieve detailed information about a specific chat, including type, participants, last message and other metadata.

### <Icon name="CheckCheck" size="sm" /> Read Operations

- **[Mark as read](/docs/chats/ler)**: Mark messages from a chat as read. Essential for maintaining organization and indicating that messages have been processed.

### <Icon name="Archive" size="sm" /> Organization Operations

- **[Archive chat](/docs/chats/arquivar)**: Archive or unarchive a chat. Useful for organizing conversations and hiding inactive chats from the main list.

- **[Pin chat](/docs/chats/fixar)**: Pin or unpin a chat at the top of the list. Ideal for keeping access to important conversations.

### <Icon name="BellOff" size="sm" /> Notification Operations

- **[Mute chat](/docs/chats/mutar)**: Mute or unmute notifications for a chat. Essential for controlling interruptions and focusing on priority conversations.

### <Icon name="Trash2" size="sm" /> Cleaning Operations

- **[Clean chat](/docs/chats/limpar)**: Clean all messages from a chat without deleting the conversation. Useful for maintaining privacy and organization.

- **[Delete chat](/docs/chats/deletar)**: Permanently delete a chat. Use with caution, as this action is irreversible.

### <Icon name="Timer" size="sm" /> Configuration Operations

- **[Chat expiration](/docs/chats/expiracao)**: Configure temporary messages (disappearing messages) that are automatically deleted after a period.

---

## <Icon name="BookOpen" size="md" /> Fundamental Concepts

### <Icon name="MessageSquare" size="sm" /> Chat Types

WhatsApp supports different types of conversations, each with specific characteristics:

**Individual Chat:**

Direct conversation with a specific contact. This is the most common type of chat, used for one-on-one communication.

**Characteristics:**
- Private communication between two participants
- Supports all media types
- Standard WhatsApp notifications
- Can be archived, pinned or muted

**Group Chat:**

Conversation with multiple participants. Groups can have up to 1024 members and include administration features.

**Characteristics:**
- Multiple simultaneous participants
- Administrator system
- Specific group settings
- Customizable notifications

**Community Chat:**

Conversation within a WhatsApp community. Communities can contain multiple linked groups.

**Characteristics:**
- Part of a larger community structure
- Can have nested groups
- Community-specific features
- Centralized management

**Channel Chat:**

Broadcast conversation in a channel. Channels are one-way, where only administrators can send messages.

**Characteristics:**
- One-way communication
- Ideal for announcements and news
- Supports large numbers of subscribers
- Broadcast-specific features

:::info Specific Types Require Specific Operations
Each chat type has specific characteristics and limitations. Make sure to use the correct operations for each type and check the specific documentation when needed.
:::

### <Icon name="CircleDashed" size="sm" /> Chat States

Chats can be in different states that affect their visibility, organization and behavior:

**State: Unread**

Chats with unread messages appear highlighted in the list and generate notifications (if not muted).

**Characteristics:**
- Visual indicator of unread messages
- Unread message counter
- Priority in chat list
- Generates notifications by default

**State: Archived**

Archived chats are hidden from the main list but remain accessible through a separate section.

**Characteristics:**
- Do not appear in the main list
- Accessible through an archive section
- Can be unarchived at any time
- Useful for organizing old or inactive conversations

**State: Pinned**

Pinned chats always appear at the top of the list, regardless of recent activity.

**Characteristics:**
- Always visible at the top of the list
- Maximum of 3 pinned chats simultaneously
- Ideal for priority conversations
- Maintains quick access to important chats

**State: Muted**

Muted chats do not generate notifications but continue to appear normally in the list.

**Characteristics:**
- Notifications disabled
- Still appear in the list
- Useful for reducing interruptions
- Can be combined with other states

**Combined States:**

Multiple states can be combined. For example, a chat can be both pinned and muted simultaneously, maintaining quick access without notifications.

:::tip Organization Strategy
Use chat states strategically: archive old or inactive chats, pin priority conversations for quick access, and mute chats that don't require immediate attention. This organization significantly improves efficiency in managing multiple conversations.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you understand the fundamental concepts of the chat API, follow these learning paths:

### <Icon name="PlayCircle" size="sm" /> For Beginners

1. **[List your chats](/docs/chats/pegar)**: Learn to get a list of all conversations
2. **[Manage read status](/docs/chats/ler)**: Understand how to mark messages as read
3. **[Organize chats](/docs/chats/arquivar)**: Learn to archive and pin conversations

### <Icon name="Code2" size="sm" /> For Developers

1. **[Get metadata](/docs/chats/metadata)**: Implement conversation analysis systems
2. **[Automate organization](/docs/chats/fixar)**: Create systems that automatically organize chats
3. **[Notification management](/docs/chats/mutar)**: Implement intelligent notification control

### <Icon name="Target" size="sm" /> Common Use Cases

- **Automated Organization**: Archive inactive chats after a determined period
- **Smart Prioritization**: Pin chats based on business rules
- **Notification Management**: Mute chats during specific times
- **Periodic Cleaning**: Automatically clean or delete old conversations
- **CRM Synchronization**: Keep chat state synchronized with external systems

Each operation page includes complete code examples, request structures/resposta and practical use cases. Start with simple operations and expand as your needs grow.