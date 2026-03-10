---
title: Chats
sidebar_position: 0
description: "Gerencie conversas e chats do WhatsApp: liste chats, controle leitura, arquive conversas e gerencie notificações."
---

import styles from './index.module.css';

## <Icon name="MessageCircle" size="lg" /> Chats

<div className={styles.heroSection}>

Gerencie conversas e chats do WhatsApp através da API do Z-API. Liste chats, controle estados de leitura, arquive conversas e gerencie notificações.

</div>

---

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="MessageCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Chats</h3>
  </div>
  <div className={styles.cardDescription}>
    Entenda como gerenciar conversas e chats do WhatsApp através da API do Z-API.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/introducao" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Pegar Chats</h3>
  </div>
  <div className={styles.cardDescription}>
    Liste todos os chats da sua instância do WhatsApp, incluindo conversas individuais e grupos.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/pegar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Info" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Metadata</h3>
  </div>
  <div className={styles.cardDescription}>
    Obtenha informações detalhadas sobre um chat específico, incluindo participantes e configurações.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/metadata" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CheckCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Ler</h3>
  </div>
  <div className={styles.cardDescription}>
    Marque mensagens de um chat como lidas para remover indicadores de "não lido".
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/ler" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Archive" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Arquivar</h3>
  </div>
  <div className={styles.cardDescription}>
    Arquivar ou desarquivar chats para organizar suas conversas e ocultar chats menos importantes.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/arquivar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Pin" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Fixar</h3>
  </div>
  <div className={styles.cardDescription}>
    Fixe ou desafixe chats no topo da lista para acesso rápido aos mais importantes.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/fixar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="BellOff" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Mutar</h3>
  </div>
  <div className={styles.cardDescription}>
    Silencie ou ative notificações de chats específicos para controlar interrupções.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/mutar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Eraser" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Limpar</h3>
  </div>
  <div className={styles.cardDescription}>
    Limpe todas as mensagens de um chat sem deletar o chat permanentemente.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/limpar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Deletar</h3>
  </div>
  <div className={styles.cardDescription}>
    Exclua permanentemente um chat da sua instância do WhatsApp.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/deletar" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Timer" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Expiração</h3>
  </div>
  <div className={styles.cardDescription}>
    Configure mensagens temporárias que desaparecem automaticamente após um período definido.
  </div>
  <a href="/Z-API-Central-Dev/docs/chats/expiracao" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

</div>

---

:::tip Organização de Conversas

A API de chats permite organizar e gerenciar todas suas conversas programaticamente, desde listagem até arquivamento e controle de notificações!

:::
