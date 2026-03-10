---
description: 'Manage WhatsApp conversations and chats: list chats, control reading,
  archive conversations, and manage notifications.'
sidebar_position: 0
title: Chats
---

import styles from './index.module.css';

## <Icon name="MessageCircle" size="lg" /> Chats

<div className={styles.heroSection}>

Manage WhatsApp chats and conversations through the Z-API. List chats, control read states, archive conversations, and manage notifications.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Get Chats</h3>
  </div>
  <div className={styles.cardDescription}>
    List all chats from your WhatsApp instance, including individual conversations and groups.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/pegar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Info" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Metadata</h3>
  </div>
  <div className={styles.cardDescription}>
    Obtain detailed information about a specific chat, including participants and settings.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/metadata" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CheckCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Read</h3>
  </div>
  <div className={styles.cardDescription}>
    Mark messages from a chat as read to remove "unread" indicators.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/ler" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Archive" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Archive</h3>
  </div>
  <div className={styles.cardDescription}>
    Archive or unarchive chats to organize your conversations and hide less important chats.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/arquivar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Pin" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Pin</h3>
  </div>
  <div className={styles.cardDescription}>
    Pin or unpin chats to the top of the list for quick access to the most important ones.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/fixar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="BellOff" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Mute</h3>
  </div>
  <div className={styles.cardDescription}>
    Silence or enable notifications for specific chats to control interruptions.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/mutar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Eraser" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Clear</h3>
  </div>
  <div className={styles.cardDescription}>
    Clear all messages from a chat without permanently deleting the chat.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/limpar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Delete</h3>
  </div>
  <div className={styles.cardDescription}>
    Permanently delete a chat from your WhatsApp instance.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/deletar" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Timer" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Expiration</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure temporary messages that automatically disappear after a defined period.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/expiracao" className={styles.cardLink}>
    View guide →
  </a>
</div>

</div>

---

:::tip Conversation Organization

The chat API allows you to organize and manage all your conversations programmatically, from listing to archiving and notification control!

:::