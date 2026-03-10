---
id: introducao
sidebar_position: 1
title: Communities
---
# <Icon name="LayoutGrid" size="lg" /> Communities

Manage WhatsApp communities through the Z-API API. Create communities, link groups, and organize related conversations in a hierarchical structure.

:::tip Hierarchical Organization
Communities allow organizing multiple related groups into a hierarchical structure, facilitating management and large-scale communication!
:::

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

WhatsApp now offers the Communities feature, which allows users to group groups around a common topic or interest. It's an easy way to connect with others who share the same goals and ideas.

To illustrate how the community structure works, see the image below:

<img src="https://raw.githubusercontent.com/Z-API/z-api-docs/main/img/communities.png" alt="Estrutura de Comunidades" />

**Notes:**

1. <Icon name="PlusCircle" size="xs" /> When creating a community, a default group (announcement group) with the same name as the community is created.
2. <Icon name="MessageSquare" size="xs" /> This group represents your entire community and is used to send messages to all members.
3. <Icon name="Users" size="xs" /> Every new group linked to the community, all participants will be part of the default group (announcement group).
4. <Icon name="UserMinus" size="xs" /> When unlinking a group, all its participants are removed from the default group (announcement group).

As seen above, every community has a **"Announcement Group"**. In this group, only administrators can send messages. Use it whenever you want to send something to the entire community.

:::info Community Capacity
Each community can have up to 50 groups, and the community administrator(s) can send messages to up to 5,000 people at once through the announcement group.
:::

---

## <Icon name="ListChecks" size="md" /> Available Operations {#operacoes}

### <Icon name="LayoutGrid" size="sm" /> Community Management

- <Icon name="PlusCircle" size="xs" /> **[Create Community](/docs/communities/criar)** - Create a new WhatsApp community
- <Icon name="List" size="xs" /> **[List Communities](/docs/communities/listar)** - List all communities from your instance
- <Icon name="FileText" size="xs" /> **[Community Metadata](/docs/communities/metadata)** - Get detailed information about a community
- <Icon name="XSquare" size="xs" /> **[Deactivate Community](/docs/communities/desativar)** - Deactivate an existing community

### <Icon name="Settings" size="sm" /> Settings

- <Icon name="Settings" size="xs" /> **[Community Settings](/docs/communities/configuracoes)** - Change settings such as who can add groups
- <Icon name="Edit3" size="xs" /> **[Change Description](/docs/communities/alterar-descricao)** - Change the community description
- <Icon name="Link" size="xs" /> **[Reset Invite Link](/docs/communities/redefinir-link)** - Generate a new invite link

### <Icon name="Folders" size="sm" /> Group Management

- <Icon name="Link" size="xs" /> **[Link Groups](/docs/communities/vincular-grupos)** - Add existing groups to a community
- <Icon name="Unlink" size="xs" /> **[Unlink Groups](/docs/communities/desvincular-grupos)** - Remove groups from a community

### <Icon name="Users" size="sm" /> Participant Management

- <Icon name="UserPlus" size="xs" /> **[Add Participants](/docs/communities/adicionar-participantes)** - Add new participants to the community
- <Icon name="UserMinus" size="xs" /> **[Remove Participants](/docs/communities/remover-participantes)** - Remove participants from the community
- <Icon name="UserRoundCog" size="xs" /> **[Promote Admin](/docs/communities/promover-admin)** - Promote participants to administrators
- <Icon name="UserX" size="xs" /> **[Remove Admin](/docs/communities/remover-admin)** - Remove administrators from the community

---

## <Icon name="BookOpen" size="md" /> Important Concepts {#conceitos}

### <Icon name="LayoutGrid" size="sm" /> Community

A community is an organizational structure that groups multiple related groups. Administrators can manage the community and linked groups, while participants can interact within the groups.

### <Icon name="BellRing" size="sm" /> Announcement Group

Every community has an automatically created announcement group. This group:
- <Icon name="Tag" size="xs" /> Has the same name as the community
- <Icon name="MessageSquare" size="xs" /> Allows administrators to send messages to all participants
- <Icon name="Users" size="xs" /> All participants of linked groups are automatically added to this group

:::tip Announcement Group
The announcement group is created automatically and allows administrators to send messages to the entire community at once!
:::

### <Icon name="Folders" size="sm" /> Linked Groups

Groups can be linked to a community for organization. Linked groups maintain their independent functionality but are organized under the community structure.

---

## <Icon name="HelpCircle" size="md" /> Frequently Asked Questions {#faq}

### How do I create a new community?

First, it's important to check if your WhatsApp app on your phone is already compatible with communities. If not, wait for the app update for your account. Now, if you already have access to communities, see the documentation on how to [create a community via API](/docs/communities/criar).

### Can I list the communities I belong to?

Yes, Z-API provides methods for you to know which communities you are part of. See the documentation on how to [list your communities](/docs/communities/listar).

### Can I link and unlink groups to a community?

Absolutely! Z-API gives you two other APIs to manage the groups of a community. See how to [link groups](/docs/communities/vincular-grupos) or [unlink groups](/docs/communities/desvincular-grupos) from a community.

### How do I send a message to the entire community?

As mentioned above, the community itself is only for grouping your groups and giving users an experience and view of all the groups in the community. **You can indeed send messages to the entire community**, but for this purpose, the **Announcement Group** is used. Since the announcement group is just like any other group, you simply need to have the **phone number** of the group and use the message sending APIs normally, just like with other regular groups.

### How do I get the announcement group?

There are three ways to get the announcement group:
- The first is during [community creation](/docs/communities/criar), which already returns the information of the announcement group when you create the community.
- The second is through the API of [listing chats](/docs/chats/pegar-chats), in which you can differentiate normal groups from announcement groups. The **isGroup** attribute will be true for normal groups, and the **isGroupAnnouncement** attribute will be true when it's an announcement group.
- The third and last option is through the API of [community metadata](/docs/communities/metadata), which returns information about the community based on its ID, returning details such as the community name and its linked groups.

### Can I deactivate a community?

Yes, you can [deactivate a Community](/docs/communities/desativar) on WhatsApp, which will result in the disconnection of all related groups. It's important to note that deactivating the community won't delete your groups, but rather remove them from the community in question.

### How do I add or remove people from the community?

As mentioned earlier, the community itself is just what groups are grouped under. What is actually used are the announcement groups. Therefore, if you want to generate an invite link, add and remove people, promote as administrators, etc., everything will be done through the announcement group using the APIs you already know.

---

## <Icon name="AlertTriangle" size="md" /> Limitations {#limitacoes}

Be aware of these limitations when using communities:

- <Icon name="List" size="sm" /> **Maximum of 50 groups** per community
- <Icon name="Shield" size="sm" /> **Only administrators** can manage communities
- <Icon name="PlusCircle" size="sm" /> **Groups must be created** before being linked to a community
- <Icon name="Lock" size="sm" /> **Announcement group** cannot be unlinked from the community
- <Icon name="CheckSquare" size="sm" /> **Minimum of 1 common group** linked (in addition to the announcement group)

:::warning Important Limitations
Respect community limits to ensure proper functionality. Remember: maximum of 50 groups per community!
:::

---

## <Icon name="Rocket" size="md" /> Next Steps {#proximos-passos}

- <Icon name="PlusCircle" size="sm" /> [Create your first community](/docs/communities/criar)
- <Icon name="Link" size="sm" /> [Link groups](/docs/communities/vincular-grupos)
- <Icon name="UserRoundCog" size="sm" /> [Manage administrators](/docs/communities/promover-admin)
- <Icon name="Settings" size="sm" /> [Configure the community](/docs/communities/configuracoes)