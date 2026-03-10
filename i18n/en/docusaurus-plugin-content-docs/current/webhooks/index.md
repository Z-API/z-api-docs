---
title: Webhooks
sidebar_position: 0
description: Learn how to receive real-time notifications to create intelligent automations.
---

import styles from './index.module.css';

## <Icon name="Webhook" size="lg" /> Webhooks

<div className={styles.heroSection}>

Webhooks are the backbone of any intelligent automation. They allow Z-API to notify your system in real-time whenever an important event occurs in your WhatsApp account.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Webhook" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Understanding Webhooks</h3>
  </div>
  <div className={styles.cardDescription}>
    Learn the concept of webhooks and how they transform your automation from reactive to proactive.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/introducao" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Send" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>On Message Received</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure webhooks to receive notifications when messages are received in your instance.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/ao-receber" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CheckCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Message Status</h3>
  </div>
  <div className={styles.cardDescription}>
    Receive updates on the delivery and read status of messages you have sent.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/status-mensagem" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CircleCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>On Connect</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure webhooks to be notified when your instance is successfully connected.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/ao-conectar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CircleDashed" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>On Disconnect</h3>
  </div>
  <div className={styles.cardDescription}>
    Receive notifications when your instance is disconnected to take immediate corrective actions.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/ao-desconectar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="MessageCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Chat Presence</h3>
  </div>
  <div className={styles.cardDescription}>
    Monitor when users are typing, online, or viewing messages in real-time.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/chat-presence" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Send" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>On Send</h3>
  </div>
  <div className={styles.cardDescription}>
    Receive confirmations when messages are successfully sent through your instance.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/ao-enviar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Settings" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update All</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure all webhooks at once using a single endpoint to simplify setup.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/atualizar-todos" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="BellRing" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update Notify Sent</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure specific notifications for sent messages, allowing granular control over events.
  </div>
  <a href="/Z-API-Central-Dev/docs/webhooks/atualizar-notificar-enviadas" className={styles.cardLink}>
    View guide →
  </a>
</div>

</div>

---

:::tip Next Steps

Configure your webhooks and explore the [Messages](/docs/messages/introducao) section to start creating intelligent automations.

:::