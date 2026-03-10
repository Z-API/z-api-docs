---
description: 'Manage your instance''s message queue: view pending messages, remove
  specific messages, or empty the entire queue.'
sidebar_position: 0
title: Message Queue
---

import styles from './index.module.css';

## <Icon name="List" size="lg" /> Message Queue

<div className={styles.heroSection}>

Manage the message queue of your Z-API instance. View pending messages, remove specific messages or empty the entire queue when necessary.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Message Queue</h3>
  </div>
  <div className={styles.cardDescription}>
    Understand how the message queue works and how to manage it through the Z-API API.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/introducao" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="ClipboardList" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Queue</h3>
  </div>
  <div className={styles.cardDescription}>
    View all pending messages in your instance's queue, including status and detailed information.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/fila" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Empty Queue</h3>
  </div>
  <div className={styles.cardDescription}>
    Empty the entire message queue, removing all pending messages at once.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/apagar-fila" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="XSquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Delete Message</h3>
  </div>
  <div className={styles.cardDescription}>
    Delete a specific message from the queue using its ID, without affecting other pending messages.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/apagar-mensagem" className={styles.cardLink}>
    View guide →
  </a>
</div>

</div>

---

:::tip Efficient Management

Use the message queue API to monitor and manage pending messages, ensuring your instance processes messages efficiently!

:::