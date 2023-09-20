---
id: file-expiration
title: File expiration period
---

## How it works?

:::caution Qual o prazo de validade dos arquivos do z-api?

All media files received from the Z-API through its webhook have a **30-day** expiration period. After this period, all files, whether they are audio, PDFs, images, etc., will be deleted from the storage.

:::

The Z-API offers webhook functionality to receive text and files directly into your application, without the need to store this information on our servers. This means that your application has complete control over the data received, which is particularly important for compliance with the General Data Protection Law (LGPD).

If the client wishes to store all received media, it is important for them to implement an internal storage system within their own application so that they can manage this data according to their own privacy and security policies. In this way, our webhook solution helps ensure the security of your clients' data while simplifying the process of receiving information in your application.

---

To perform this storage, they can implement an internal storage system within their application. This can be achieved through various technologies available in the market, such as cloud storage services, databases, file management systems. There are numerous tools and services that can be utilized for this purpose, including:

- Amazon S3
- Google Cloud Storage
