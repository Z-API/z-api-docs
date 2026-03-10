---
id: introducao
sidebar_position: 1
title: Groups
---
# <Icon name="Users" size="lg" /> Group Management

This section documents the Z-API's group API, which allows complete and programmatic management of WhatsApp groups. Here you will learn how to create groups, manage participants, configure administrators, and control all group-related functionalities through RESTful endpoints.

## <Icon name="BookOpen" size="md" /> What You Will Learn in This Section

This section is structured to provide comprehensive knowledge about group management:

- **Fundamental Concepts**: Understanding WhatsApp group structure and unique identifiers
- **Creation and Configuration**: Creating groups and setting initial configurations
- **Participant Management**: Adding, removing, and approving members
- **Administration**: Promoting and managing administrators
- **Advanced Configuration**: Customizing group name, image, and settings
- **Best Practices**: Recommendations for efficient and secure group management

## <Icon name="Target" size="md" /> Overview and Context

### <Icon name="Info" size="sm" /> What is the Group API

The Z-API's group API provides full programmatic control over WhatsApp groups. Through RESTful endpoints, you can perform operations that would normally be done manually through the app interface.

**Why manage groups programmatically?**

- **Process Automation**: Create groups en masse for events, campaigns, or organizations
- **Member Management**: Automatically add or remove participants based on business rules
- **Automated Moderation**: Implement approval and moderation systems for participants
- **Synchronization**: Keep groups synchronized with external systems (CRMs, management platforms)
- **Bulk Configuration**: Update settings for multiple groups simultaneously
- **Workflow Integration**: Incorporate group management into automated workflows

### <Icon name="ListChecks" size="sm" /> API Capabilities

The group API allows you to perform the following essential operations:

- **Creation**: Create new custom groups with names and initial participants
- **Search**: Find groups by name or specific criteria
- **Configuration**: Update group name, image, and other settings
- **Participants**: Add, remove, approve, and reject members
- **Administration**: Promote and remove administrators
- **Metadata**: Retrieve detailed information about groups
- **Advanced Settings**: Control options such as who can send messages, modify settings, etc.

---

## <Icon name="ListChecks" size="md" /> Available Operations

The group API offers the following endpoints, each documented on its own page:

### <Icon name="Search" size="sm" /> Query Operations

- **[Search Groups](/docs/groups/buscar)**: Find groups by name or specific criteria. Useful for locating existing groups before performing operations.

- **[Get Metadata](/docs/groups/metadata)**: Retrieve detailed information about a specific group, including participants, administrators, settings, and other metadata.

### <Icon name="PlusCircle" size="sm" /> Creation and Modification Operations

- **[Create Group](/docs/groups/criar)**: Create a new WhatsApp group with a name and initial participants. Essential for automating group creation.

- **[Update Name](/docs/groups/atualizar-nome)**: Change the name of an existing group. Useful for renaming groups based on events or updates.

- **[Update Image](/docs/groups/atualizar-imagem)**: Change the group's image. Ideal for visual customization and branding.

### <Icon name="Users" size="sm" /> Participant Operations

- **[Add Participants](/docs/groups/adicionar-participantes)**: Add members to a group. Essential for bulk member management.

- **[Remove Participants](/docs/groups/remover-participantes)**: Remove members from a group. Useful for periodic cleanup or rule-based removal.

- **[Approve Participants](/docs/groups/aprovar-participantes)**: Approve participation requests in groups requiring approval. Essential for moderation.

- **[Reject Participants](/docs/groups/rejeitar-participantes)**: Reject participation requests. Essential for automated moderation systems.

### <Icon name="UserRoundCog" size="sm" /> Administration Operations

- **[Promote Admin](/docs/groups/promover-admin)**: Make a member an administrator of the group. Necessary for delegating moderation responsibilities.

- **[Remove Admin](/docs/groups/remover-admin)**: Remove administrator privileges from a member. Useful for permission management.

### <Icon name="Settings" size="sm" /> Configuration Operations

- **[Group Settings](/docs/groups/configuracoes)**: Configure advanced group options, such as who can send messages, modify settings, etc.

---

## <Icon name="BookOpen" size="md" /> Fundamental Concepts

### <Icon name="IdCard" size="sm" /> Group Identifier (ID)

**ID Format:**

Each group has a unique identifier in the format `120363019502650977-group` or similar. This ID is essential for all API operations related to specific groups.

**ID Structure:**

- **General Format**: `[número]-group`
- **Example**: `120363019502650977-group`
- **Usage**: Always use this ID to reference groups in API requests

**How to obtain a group's ID:**

- Through the group search endpoint
- Through the group metadata endpoint
- Through webhooks when group events occur
- Through chat listings (groups appear as group-type chats)

**Important:**

The group ID is immutable and unique. Store this identifier if you need to reference the group later, as it does not change even if the group's name is altered.

:::note GROUP ID
To emphasize, think of the group's ID as the creator's number concatenated with a timestamp similar to `551199999999-1623275280`.
:::

:::warning ATTENTION
On November 4, 2021, WhatsApp changed the format for creating new groups. Before: `"phone": "551199999999-1623281429"`. Now: `"phone": "120363019502650977-group"`.
:::

:::info Unique and Immutable Identifier
Each group has a unique ID that must be used in all API operations related to that specific group. This ID remains constant even if the group's name or other settings are changed.
:::

### <Icon name="Users" size="sm" /> Participant Management

**Participant Concept:**

Participants are the members of a group. Each participant can have different permission levels, from regular member to administrator.

**Available Operations:**

- **Add Members**: Include new participants in the group (requires you to be an administrator)
- **Remove Members**: Exclude participants from the group (requires you to be an administrator)
- **Approve Requests**: In groups requiring approval, approve entry requests
- **Reject Requests**: Deny participation requests in groups requiring approval

**Important Limitations:**

- Groups can have up to 1024 participants (WhatsApp limit)
- Only administrators can add or remove members
- The group creator always retains special privileges

### <Icon name="Shield" size="sm" /> Administration System

**Permission Hierarchy:**

WhatsApp groups have a permission hierarchy:

1. **Group Creator**: Maximum permissions, cannot be removed
2. **Administrators**: Elevated permissions to manage the group
3. **Members**: Basic participation permissions

**Administrator Permissions:**

Administrators have access to special features:

- **Participant Management**: Add and remove members
- **Group Settings**: Change name, image, and other settings
- **Moderation**: Approve or reject participation requests
- **Admin Management**: Promote other members to administrators (with limitations)
- **Remove Administrators**: Remove privileges from other administrators (except the creator)

**Best Practices:**

- Limit the number of administrators to what is necessary
- Use automated moderation systems carefully
- Implement administrative action logs for auditing
- Establish clear policies on when to promote administrators

:::warning Administrator Responsibility
Administrators have significant control over groups. Use these permissions responsibly and implement audit systems to track important administrative actions.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you understand the fundamental concepts of the group API, follow these learning paths:

### <Icon name="PlayCircle" size="sm" /> For Beginners

1. **[Create Your First Group](/docs/groups/criar)**: Learn to create groups programmatically
2. **[Manage Participants](/docs/groups/adicionar-participantes)**: Understand how to add and remove members
3. **[Get Group Information](/docs/groups/metadata)**: Learn to retrieve data about groups

### <Icon name="Code2" size="sm" /> For Developers

1. **[Configure Administrators](/docs/groups/promover-admin)**: Implement permission management systems
2. **[Automated Moderation](/docs/groups/aprovar-participantes)**: Create participant approval systems
3. **[Advanced Settings](/docs/groups/configuracoes)**: Control detailed group options

### <Icon name="Target" size="sm" /> Common Use Cases

- **Event Group Creation**: Automate group creation for webinars, courses, or events
- **Community Management**: Keep community groups organized and moderated
- **CRM Synchronization**: Sync groups with relationship management systems
- **Moderation Systems**: Implement rule-based automatic approval

Each operation page includes complete code examples, request structures/resposta and practical use cases. Start with simple operations and expand as your needs grow.