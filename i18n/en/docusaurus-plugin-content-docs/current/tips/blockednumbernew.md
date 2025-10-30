---
id: blockednumbernew
title: Blocks and bans (2025)
---

## Introduction

The discussion about WhatsApp bans involving IPs, ASNs, and phone numbers is complex and involves multiple variables. Over the past four years, we have conducted various tests using both WhatsApp Web (QR Code generator) and the device connected to this QR Code.

What we have learned during this period is that, while IP and ASN have some relevance, they are not the main factors determining a ban. We have implemented an IP rotation strategy in 15, 30, 45, and 60-day cycles, and this isolated action has not shown a significant impact in reducing blocks.

## Key Factors Influencing Bans

### 1. Global Events and Fake News Volume
High-profile media events, such as elections, political crises, and the spread of fake news, directly impact the ban rate. Whenever there is a major media event, we observe a percentage increase in the number of banned accounts, regardless of IP, ASN, or connection method. This suggests that WhatsApp intensifies moderation during these periods.

### 2. Message Content and Sensitive Keywords
WhatsApp has an advanced algorithm that analyzes content patterns. Messages with content of exclusive interest to the sender (i.e., those that do not generate natural interactions) are subject to scrutiny.

Financial topics carry a higher risk of blocking, especially when they include keywords such as "boleto," "PIX," "card," and others associated with financial scams. The recurrence of these words can trigger automatic verification mechanisms, increasing the risk of restrictions.

### 3. Use of Recent Numbers and Bulk Messaging
New numbers sending messages to many different recipients in a short period are easily flagged as suspicious. This behavior can be simulated directly within the WhatsApp app, without the need for APIs or external platforms. Several reports indicate that newly activated numbers are being banned quickly, even without using automated tools.

### 4. Number Recycling and Usage History
The high turnover of recycled numbers can be either beneficial or harmful, depending on the number's history. If the number was previously used for suspicious activities, it may be banned shortly after scanning the QR Code or after sending a small volume of messages.

### 5. Message Volume vs. Number of Recipients
The most relevant factor in determining a ban is the number of unique recipients, rather than just the total number of messages sent. The more different contacts a number tries to reach in a short period, the higher the likelihood of being classified as spam.

### 6. Reusing Patterns in Replacement Numbers
A common practice after a ban is setting up a new number in exactly the same way as the previous one. WhatsApp can detect this, especially if the new number retains the same name, photo, description, and messaging patterns.

To mitigate this risk, it is recommended to:

- ✅ Change the profile picture before activating the number.
- ✅ Modify the description and contact name before starting usage.
- ✅ Make slight adjustments to the initial sending behavior to avoid repetitive patterns.
These actions can help prevent WhatsApp from associating the new number with the previously banned one, reducing the risk of an immediate block.

## Tests and Comparison with Previous Years
We have conducted tests using both the official WhatsApp API and the web version. Surprisingly, in many cases, simply connecting a new number to the platform can trigger a ban. Additionally, there are instances where a block occurs after sending just 10 messages to different recipients.

Compared to previous years, the ban rate remains relatively stable, but the impact varies among clients. Some industries are experiencing higher bans than others, which may be directly linked to message content and recipient profiles.

## Conclusion: What Really Matters?
WhatsApp's algorithm changes constantly, making it impossible to rely on a single foolproof strategy to avoid bans. In the past, it was easier to claim that "passive accounts are not banned" and that "highly active accounts are," but today, this distinction is no longer as clear.

The two main factors that determine bans are:

- ✅ The number of different recipients a number tries to reach.
- ✅ Message content (keywords, context, and sending pattern).
Secondary factors, such as number history, IP/ASN, and connection method (Web or Official), still have an impact but are less decisive than the factors above.

There is no 100% effective best practice for avoiding bans. WhatsApp's algorithm is becoming increasingly dynamic, and the only viable approach is to monitor, continuously adapt strategies, and operate within the platform's acceptable limits.