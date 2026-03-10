---
id: expiracao-arquivos
sidebar_position: 6
title: Expiration Deadline for Files
---
# <Icon name="Clock" size="lg" /> File Expiration

Understand the validity period of media files received through Z-API webhooks.

---

:::caution What is the expiration period for Z-API files?

All media files received from Z-API via your webhook have an **expiration period of 30 days**. After this period, all files, whether audio, PDF, image, etc., will be deleted from storage.

:::

---

## How It Works

Z-API provides webhook functionality to receive texts and files directly into your application without the need to store these information on our servers. This means that your application has full control over the received data, which is especially important for complying with the General Data Protection Law (LGPD).

If the client wishes to store all received media, it is important to implement an internal storage system in their own application so they can manage these data according to their own privacy and security policies. In this way, our webhook solution helps ensure the security of your clients' data while simplifying the process of receiving information into your application.

---

## Storage Solutions

To perform this storage, you can implement an internal storage system in your application. This can be done through various technologies available on the market, such as cloud storage services, databases, file management systems. There are many tools and services that can be used for this, including:

- **Amazon S3**: AWS Cloud Storage Service
- **Google Cloud Storage**: Google Cloud Solution
- **Azure Blob Storage**: Object Storage from Microsoft Azure
- **Databases**: Store metadata and references to files
- **Local File Systems**: For on-premise applications

---

## Best Practices

- **Download files immediately**: When receiving a webhook with a file, download and store it immediately
- **Validate URLs**: Check if the file URLs are accessible before processing
- **Backup**: Maintain backups of important files
- **LGPD**: Implement data retention policies according to LGPD

---

## Next Steps

- [Webhooks - Upon Receipt](/docs/webhooks/ao-receber) - Understand how to receive files via webhook
- [Security](/docs/security/introducao) - Learn about security and data protection