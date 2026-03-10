---
title: Segurança
sidebar_position: 0
description: Proteja sua conta, credenciais e integrações com autenticação, tokens e restrições de acesso.
---

import styles from './index.module.css';

## <Icon name="Shield" size="lg" /> Segurança

<div className={styles.heroSection}>

A segurança é fundamental ao usar o Z-API. Proteja sua conta, suas credenciais e suas integrações com múltiplas camadas de segurança.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="KeyRound" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>ID e Token</h3>
  </div>
  <div className={styles.cardDescription}>
    Aprenda a usar ID e Token para autenticar suas requisições à API do Z-API de forma segura.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/id-e-token" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="ShieldCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Token de Segurança</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure tokens de segurança adicionais para proteger ainda mais suas integrações e endpoints.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/token-seguranca" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="GlobeLock" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Restrição de IP</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure restrições de IP para limitar o acesso à sua API apenas a endereços IP autorizados.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/restricao-ip" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="KeySquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Autenticação 2FA</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure autenticação de dois fatores (2FA) para adicionar uma camada extra de segurança à sua conta.
  </div>
  <a href="/Z-API-Central-Dev/docs/security/autenticacao-2fa" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

</div>

---

:::warning Prioridade Máxima

A segurança não é opcional. Proteger suas credenciais e integrações é essencial para manter sua conta e dados seguros!

:::
