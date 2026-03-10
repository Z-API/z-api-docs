---
id: bloqueios-e-banimentos-2025
sidebar_position: 2
title: Blocks and Bans (2025)
---
# <Icon name="AlertTriangle" size="lg" /> Locks and Bans (2025)

An updated analysis on the key factors that influence bans in WhatsApp, based on tests and observations over the last four years.

---

## Introduction

The discussion around bans in WhatsApp involving IPs, ASN, and phone numbers is complex and involves multiple variables. Over the past four years, we have conducted various tests both with WhatsApp Web (QR Code generator) and with devices connected to this QR Code.

What we learned during this period is that while IP and ASN do have some relevance, they are not the primary factors determining a ban. In fact, we implemented an IP rotation strategy in cycles of 15, 30, 45, and 60 days, and this action alone did not show significant impact in reducing blockages.

---

## Key Factors Influencing Bans

### 1. Global Events and Volume of Fake News

Moments of high media repercussion, such as elections, political crises, and the spread of fake news, directly impact the ban rate. Whenever there is a major event in the media, we notice an increase in the percentage of accounts banned, regardless of IP, ASN, or connection method. This suggests that WhatsApp intensifies moderation during these periods.

### 2. Message Content and Sensitive Keywords

WhatsApp has an advanced algorithm that analyzes content patterns. Messages whose content is exclusively of interest to the sender (i.e., those that do not generate natural interactions) are targets for analysis.

Financial topics have a higher risk of being blocked, especially when they contain keywords like "boleto," "PIX," "cartão," and others associated with financial scams. The recurrence of these words can trigger automatic verification mechanisms, increasing the risk of restrictions.

### 3. Use of Recent Numbers and Mass Sending

New numbers sending messages to many different recipients in a short period are easily identified as suspicious. This behavior can be simulated directly within the WhatsApp app without needing APIs or external platforms. Multiple reports indicate that recently activated numbers are being banned quickly, even without using automated tools.

### 4. Recycling of Numbers and Usage History

The high rotation of recycled numbers can be beneficial or detrimental, depending on the number's usage history. If a number was previously used for suspicious activities, it may be rapidly banned after reading the QR Code or with a reduced volume of messages sent.

### 5. Volume of Messages x Number of Recipients

The most relevant factor for bans is the number of unique recipients, not just the total number of messages sent. The more different contacts a number tries to reach in a short period, the higher the chance it will be classified as spam.

### 6. Reusing Patterns in Substitute Numbers

A common practice after a ban is to set up a new number exactly the same way as the previous one. WhatsApp can identify this, especially if the new number maintains the same name, photo, description, and message patterns.

To mitigate this risk, it is recommended:

- Change the profile picture before activating the number.
- Modify the contact description and name before starting use.
- Make small changes in initial sending behavior to avoid repetitive patterns.

This can help prevent WhatsApp from associating the new number with the previously banned one, reducing the risk of an immediate block.

---

## Tests and Comparison with Previous Years

We worked both with the official WhatsApp API and the web version for our tests. The most surprising is that in many cases, simply connecting a new number to the platform can already generate bans. Additionally, there are cases where the ban occurs after only 10 messages sent to different recipients.

In comparison to previous years, the rate of bans remains relatively stable, but the impact is unequal among customers. Some segments are suffering more than others, and this may be directly related to message content and recipient profiles.

---

## Conclusion: What Really Matters?

The WhatsApp algorithm constantly changes, making it impossible to have a single and infallible strategy to avoid bans. In the past, it was easier to assert that "passive accounts are not banned" and that "very active accounts are," but today this distinction is not as clear.

The two primary factors that determine bans are:

- **Number of unique recipients** that a number tries to reach.
- **Message content** (keywords, context, and sending pattern).

Secondary factors, such as the number's history, IP/ASN, and connection method (Web or Official), still have an impact but are less decisive than the above factors.

There is no good practice 100% effective to avoid bans. The WhatsApp algorithm is increasingly dynamic, and the only viable approach is to monitor, continuously adapt strategies, and work within acceptable platform limits.

---

## Next Steps

- [Locks and Bans (Original Guide)](/docs/tips/bloqueios-e-banimentos)
- [Stability with Z-API](/docs/tips/estabilidade)