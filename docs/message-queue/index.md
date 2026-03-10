---
title: Fila de Mensagens
sidebar_position: 0
description: "Gerencie a fila de mensagens da sua instância: visualize pendentes, remova mensagens específicas ou esvazie toda a fila."
---

import styles from './index.module.css';

## <Icon name="List" size="lg" /> Fila de Mensagens

<div className={styles.heroSection}>

Gerencie a fila de mensagens da sua instância do Z-API. Visualize mensagens pendentes, remova mensagens específicas ou esvazie toda a fila quando necessário.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Fila de Mensagens</h3>
  </div>
  <div className={styles.cardDescription}>
    Entenda como funciona a fila de mensagens e como gerenciá-la através da API do Z-API.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/introducao" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="ClipboardList" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Fila</h3>
  </div>
  <div className={styles.cardDescription}>
    Visualize todas as mensagens pendentes na fila da sua instância, incluindo status e informações detalhadas.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/fila" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Apagar Fila</h3>
  </div>
  <div className={styles.cardDescription}>
    Esvazie completamente a fila de mensagens, removendo todas as mensagens pendentes de uma vez.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/apagar-fila" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="XSquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Apagar Mensagem</h3>
  </div>
  <div className={styles.cardDescription}>
    Remova uma mensagem específica da fila usando seu ID, sem afetar outras mensagens pendentes.
  </div>
  <a href="/Z-API-Central-Dev/docs/message-queue/apagar-mensagem" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

</div>

---

:::tip Gerenciamento Eficiente

Use a API de fila de mensagens para monitorar e gerenciar mensagens pendentes, garantindo que sua instância processe mensagens de forma eficiente!

:::
