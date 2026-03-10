---
id: index
title: Newsletter
slug: /newsletter
sidebar_position: 0
description: Complete management of WhatsApp Channels (Newsletters)
---

import styles from './index.module.css';

## <Icon name="Newspaper" size="lg" /> Newsletter

<div className={styles.heroSection}>

Manage WhatsApp Channels (Newsletters) through the Z-API. Create, follow, manage and interact with channels programmatically.

> **Note**: A channel ID always ends with the suffix `@newsletter`.

</div>

---

## <Icon name="List" size="md" /> Available Methods

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="FileText" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Introduction</h3>
  </div>
  <div className={styles.cardDescription}>
    Understand what WhatsApp Channels are and how they work with Z-API.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/introducao" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="PlusCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Creating channels</h3>
  </div>
  <div className={styles.cardDescription}>
    Create new channels directly via API (initially without an image).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/criar-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Image" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update channel image</h3>
  </div>
  <div className={styles.cardDescription}>
    Set or update the channel's profile picture.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-imagem" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Edit" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update channel name</h3>
  </div>
  <div className={styles.cardDescription}>
    Modify your channel's display name.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-nome" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="FileText" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update channel description</h3>
  </div>
  <div className={styles.cardDescription}>
    Change the channel's public description.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-descricao" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserPlus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Follow channel</h3>
  </div>
  <div className={styles.cardDescription}>
    Follow third-party channels to receive updates.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/seguir-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserMinus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Unfollow channel</h3>
  </div>
  <div className={styles.cardDescription}>
    Stop following a specific channel (Unfollow).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/deixar-seguir" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="VolumeX" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Mute channel</h3>
  </div>
  <div className={styles.cardDescription}>
    Mute notifications from a channel.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/silenciar-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Volume2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Unmute channel</h3>
  </div>
  <div className={styles.cardDescription}>
    Start receiving notifications from a channel again (Unmute).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/reativar-som" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Delete channel</h3>
  </div>
  <div className={styles.cardDescription}>
    Permanently delete a channel you administer.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/deletar-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Info" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Channel metadata</h3>
  </div>
  <div className={styles.cardDescription}>
    Get detailed information about a specific channel via ID.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/metadata-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>List channels</h3>
  </div>
  <div className={styles.cardDescription}>
    List all channels the instance follows or administers.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/listar-canais" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Search" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Find channels</h3>
  </div>
  <div className={styles.cardDescription}>
    Search channels by country, relevance, or search term.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/buscar-canais" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Settings" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Update channel settings</h3>
  </div>
  <div className={styles.cardDescription}>
    Change channel settings, such as reaction permissions.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/configuracoes-canal" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CheckSquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Accept channel admin invite</h3>
  </div>
  <div className={styles.cardDescription}>
    Accept received invites to become an admin.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/aceitar-admin" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserMinus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Remove channel admin</h3>
  </div>
  <div className={styles.cardDescription}>
    Remove administrator privileges from a user.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/remover-admin" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="XCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Revoke channel admin invite</h3>
  </div>
  <div className={styles.cardDescription}>
    Cancel previously sent admin invites.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/revogar-convite-admin" className={styles.cardLink}>
    View guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Transfer channel ownership</h3>
  </div>
  <div className={styles.cardDescription}>
    Transfer full channel ownership to another admin.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/transferir-propriedade" className={styles.cardLink}>
    View guide →
  </a>
</div>

</div>