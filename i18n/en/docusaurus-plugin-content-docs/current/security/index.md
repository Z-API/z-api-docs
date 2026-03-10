---
description: Protect your account, credentials, and integrations with authentication,
  tokens, and access restrictions.
sidebar_position: 0
title: Security
---

import styles from './index.module.css';

## <Icon name="Shield" size="lg" /> Security

<div className={styles.heroSection}>

Security is fundamental when using the Z-API. Protect your account, credentials, and integrations with multiple layers of security.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="KeyRound" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>ID and Token</h3>
  </div>
  <div className={styles.cardDescription}>
    Learn how to use ID and Token for secure authentication of your requests to the Z-API.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/id-e-token" className={styles.cardLink}>
    See guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="ShieldCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Security Token</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure additional security tokens to further protect your integrations and endpoints.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/token-seguranca" className={styles.cardLink}>
    See guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="GlobeLock" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>IP Restriction</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure IP restrictions to limit access to your API only to authorized IP addresses.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/restricao-ip" className={styles.cardLink}>
    See guide →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="KeySquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>2FA Authentication</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure two-factor authentication (2FA) to add an extra layer of security to your account.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/autenticacao-2fa" className={styles.cardLink}>
    See guide →
  </a>
</div>

</div>

---

:::warning Maximum Priority

Security is not optional. Protecting your credentials and integrations is essential to keep your account and data secure!

:::