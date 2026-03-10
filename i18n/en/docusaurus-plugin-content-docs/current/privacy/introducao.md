---
id: introducao
sidebar_position: 1
title: Privacy
---

# <Icon name="Lock" size="lg" /> Privacy

Manage WhatsApp privacy settings through the Z-API. Control who can see your information, status, and messages.

:::tip Full Control
The Privacy API allows you to programmatically control all privacy settings of WhatsApp, from profile visibility to read receipts!
:::

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

In this topic you will learn about all the available methods for privacy settings.

The **privacy settings** of WhatsApp are a set of options and features that allow users to control who can access their personal information and interact with them in the messaging app. These settings aim to protect user privacy and offer control over the sharing of information. The main elements of privacy settings include the ability to define who can see your **profile picture**, **last seen** and **read receipts**.

---

## <Icon name="ListChecks" size="md" /> Available Operations {#operacoes}

Manage your privacy settings with these operations:

### <Icon name="Eye" size="sm" /> Viewing Settings

- <Icon name="CheckCheck" size="xs" /> **[Read Receipts](/docs/privacy/confirmacoes-leitura)** - Configure read receipts
- <Icon name="Circle" size="xs" /> **[Online Status](/docs/privacy/visualizacao-online)** - Configure who can see when you are online
- <Icon name="Clock" size="xs" /> **[Last Seen](/docs/privacy/visto-por-ultimo)** - Configure who can see your "last seen"
- <Icon name="Image" size="xs" /> **[Profile Picture View](/docs/privacy/visualizacao-foto-perfil)** - Configure who can see your profile picture
- <Icon name="TextQuote" size="xs" /> **[Message View](/docs/privacy/visualizacao-recado)** - Configure who can see your profile message

### <Icon name="MessageSquare" size="sm" /> Message and Group Settings

- <Icon name="Timer" size="xs" /> **[Message Duration](/docs/privacy/duracao-mensagens)** - Configure temporary messages for new conversations
- <Icon name="Users" size="xs" /> **[Add to Groups Permission](/docs/privacy/permissao-adicionar-grupos)** - Configure who can add you to groups

### <Icon name="Settings" size="sm" /> Management

- <Icon name="List" size="xs" /> **[List Unpermitted Contacts](/docs/privacy/contatos-nao-permitidos)** - List contacts in the blacklist for each privacy setting

---

## <Icon name="BookOpen" size="md" /> Important Concepts {#conceitos}

### <Icon name="Shield" size="sm" /> Privacy Levels

WhatsApp offers different privacy levels for each type of information:

- <Icon name="Globe" size="xs" /> **Everyone** (`ALL`) - Anyone can see the information
- <Icon name="Contact" size="xs" /> **My Contacts** (`CONTACTS`) - Only your contacts can see
- <Icon name="Lock" size="xs" /> **No One** (`NONE`) - No one can see the information
- <Icon name="Ban" size="xs" /> **My Contacts, Except...** (`CONTACT_BLACKLIST`) - Only your contacts can see, except those you add to the blacklist

:::info Control Levels
Each privacy level offers a different degree of control over who can view your information. Choose the level that best suits your needs!
:::

### <Icon name="Ban" size="sm" /> Blacklist

The blacklist (list of not permitted contacts) allows you to exclude specific contacts from certain privacy settings. **Important**: Each privacy setting has its own independent blacklist.

### <Icon name="CheckCheck" size="sm" /> Read Receipts

Read receipts (two blue ticks) can be controlled through the privacy settings. You can choose to send and receive read receipts.

---

## <Icon name="CircleCheck" size="md" /> Status and Limitations {#status}

- <Icon name="CircleCheck" size="sm" /> **Availability**: According to official product responses, **all 8 privacy endpoints are in production and operational**
- <Icon name="ShieldCheck" size="sm" /> **Stability**: There are no Privacy API endpoints marked as beta or experimental at this time
- <Icon name="KeyRound" size="sm" /> **Authentication**: The endpoints follow the Z-API authentication standard (use of instance token via header)
- <Icon name="Timer" size="sm" /> **Rate Limiting**: There are no additional specific Privacy API rate limits beyond the general platform usage policies

:::success Complete API
All privacy endpoints are in production and ready for use, offering full control over your privacy settings!
:::

---

## <Icon name="Rocket" size="md" /> Next Steps {#proximos-passos}

- <Icon name="CheckCheck" size="sm" /> [Configure Read Receipts](/docs/privacy/confirmacoes-leitura) - Control read receipts
- <Icon name="Circle" size="sm" /> [Configure Online Status](/docs/privacy/visualizacao-online) - Control online visibility
- <Icon name="Clock" size="sm" /> [Configure Last Seen](/docs/privacy/visto-por-ultimo) - Control last seen privacy
- <Icon name="Image" size="sm" /> [Configure Profile Picture View](/docs/privacy/visualizacao-foto-perfil) - Control profile picture privacy