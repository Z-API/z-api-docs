---
id: introducao
sidebar_position: 1
title: Contacts
---
## <Icon name="ListChecks" size="md" /> Available Operations

The contact API offers the following endpoints, each documented on its own page:

### <Icon name="List" size="sm" /> Query Operations

- **[Get Contacts](/docs/contacts/pegar-contatos)**: List all contacts from your WhatsApp instance. Useful for synchronization, backup, or analysis of your contact list.

- **[Get Metadata](/docs/contacts/metadata)**: Retrieve detailed information about a specific contact, including name, status, last seen, and other available metadata.

- **[Get Profile Photo](/docs/contacts/imagem)**: Retrieve the profile photo of a contact. Useful for enriching interfaces or visual identification systems.

### <Icon name="UserPlus" size="sm" /> Modification Operations

- **[Add Contact](/docs/contacts/adicionar)**: Add a new contact to your WhatsApp agenda. Essential for importing contacts from external systems or creating them programmatically.

- **[Remove Contact](/docs/contacts/remover)**: Remove a contact from your list. Useful for periodic cleaning or removal of inactive contacts.

### <Icon name="CircleCheck" size="sm" /> Validation Operations

- **[Validate Number](/docs/contacts/numero-whatsapp)**: Check if a phone number is registered in WhatsApp. Essential for improving delivery rates and avoiding errors.

- **[Batch Validate Numbers](/docs/contacts/validar-lote)**: Validate multiple numbers simultaneously. Ideal for processing large lists before sending campaigns.

### <Icon name="Shield" size="sm" /> Security and Moderation Operations

- **[Block Contact](/docs/contacts/bloquear)**: Block a contact to avoid receiving messages from them. Essential for moderation systems and spam control.

- **[Report Contact](/docs/contacts/denunciar)**: Report a contact for inappropriate behavior to WhatsApp. Useful for automated reporting systems.

---

## <Icon name="BookOpen" size="md" /> Fundamental Concepts

### <Icon name="Phone" size="sm" /> Phone Number Format

**Universal Rule:**

All contact API endpoints (and Z-API in general) require phone numbers in the **full international format**, without spaces, hyphens, parentheses, or other special characters.

**Format Structure:**

The correct format is: `[código do país][DDD][número]`, all concatenated together.

**Practical Examples:**

| Country | Code | DDD | Number | Correct Format | Incorrect Format |
|---------|------|-----|--------|----------------|------------------|
| Brazil  | +55 | 11 | 999999999 | __PROTECTED_2b4ad22d-1f49-419c-89c3-4e2277d4d8a6 | __PROTECTED_2dd3ea36-eae2-430c-9ab4-78952efa3b98 |
| Brazil  | +55 | 21 | 987654321 | __PROTECTED_ae51918d-45e6-4179-a213-d7d77a10db9e | __PROTECTED_aef59623-6bce-4fff-a973-a8935e9588ee |
| USA     | +1  | 415 | 5551234 | __PROTECTED_304ea952-598e-4b79-8357-828a2ed2b426 | __PROTECTED_8c4968ff-dfdb-42a2-a4a2-c014f772ec2f |

**Why this format is mandatory:**

- **Consistency**: Facilitates processing and validation
- **Internationalization**: Supports numbers from any country
- **Efficiency**: Reduces the need for parsing and normalization
- **Compatibility**: Aligned with WhatsApp standards

**How to convert numbers to the correct format:**

If you receive numbers in various formats, implement a normalization function:

```javascript
function normalizarNumero(numero) {
  // Remove todos os caracteres não numéricos
  return numero.replace(/\D/g, '');
}

// Exemplos
normalizarNumero('+55 11 99999-9999'); // '5511999999999'
normalizarNumero('(11) 99999-9999');   // '11999999999' (falta código do país)
```

:::warning Attention to Country Code
Always include the country code. Numbers without a country code will be interpreted incorrectly. For example, `11999999999` (without +55) will be treated as an American number, not a Brazilian one.
:::

### <Icon name="ShieldCheck" size="sm" /> Number Validation

**Why validating numbers is important:**

Before sending messages or adding contacts, it's crucial to verify if the number is registered in WhatsApp. Validation offers several benefits:

- **Improves delivery rate**: Avoids attempts to send to invalid numbers
- **Reduces errors**: Prevents failures and exceptions in your code
- **Saves resources**: Does not waste requests with invalid numbers
- **Averts blocks**: Reduces the risk of being blocked due to suspicious usage patterns
- **Enhances experience**: Users receive messages only from valid numbers

**When to validate:**

- **Before campaigns**: Validate full lists before mass sends
- **Before adding contacts**: Verify if a number exists before adding it
- **In forms**: Validate numbers provided by users before processing them
- **During synchronizations**: Validate imported numbers from external systems

**Validation Strategies:**

1. **Individual validation**: Use the single number validation endpoint for specific numbers
2. **Batch validation**: Use the batch validation endpoint to process large lists
3. **Validation caching**: Store validation results to avoid unnecessary revalidations
4. **Periodic revalidation**: Numbers can be deactivated; periodically revalidate important lists

:::tip Good Practice: Batch Validation
For sending campaigns, always validate numbers in batches before starting. This significantly improves delivery rates, reduces errors, and helps avoid blocks. Process the validation in the background and use only confirmed valid numbers for sending.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you understand the fundamental concepts of the contact API, follow these learning paths:

### <Icon name="PlayCircle" size="sm" /> For Beginners

1. **[Add Your First Contact](/docs/contacts/adicionar)**: Learn to add contacts programmatically
2. **[Validate Numbers](/docs/contacts/numero-whatsapp)**: Understand how to check if numbers are registered in WhatsApp
3. **[Get Contact Information](/docs/contacts/metadata)**: Learn to retrieve data about contacts

### <Icon name="Code2" size="sm" /> For Developers

1. **[Batch Validation](/docs/contacts/validar-lote)**: Implement efficient validation for large lists
2. **[Block Management](/docs/contacts/bloquear)**: Create automated moderation systems
3. **[Contact Synchronization](/docs/contacts/pegar-contatos)**: Implement synchronization with external systems

### <Icon name="Target" size="sm" /> Common Use Cases

- **CRM Imports**: Synchronize contacts from relationship management systems
- **Pre-campaign Validation**: Validate lists before mass sends
- **Moderation Systems**: Implement automated blocking based on rules
- **Data Enrichment**: Obtain photos and metadata to enrich databases

Each operation page includes complete code examples, request structures/resposta.