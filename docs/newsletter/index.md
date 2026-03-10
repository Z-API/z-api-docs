---
id: index
title: Newsletter
slug: /newsletter
sidebar_position: 0
description: Gerenciamento completo de Canais do WhatsApp (Newsletters)
---

import styles from './index.module.css';

## <Icon name="Newspaper" size="lg" /> Newsletter

<div className={styles.heroSection}>

Gerencie canais do WhatsApp (Newsletters) através da API do Z-API. Crie, siga, gerencie e interaja com canais de forma programática.

> **Nota**: O ID de um canal sempre termina com o sufixo `@newsletter`.

</div>

---

## <Icon name="List" size="md" /> Métodos Disponíveis

<div className={styles.cardsGrid}>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="FileText" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Introdução</h3>
  </div>
  <div className={styles.cardDescription}>
    Entenda o que são os Canais do WhatsApp e como eles funcionam na Z-API.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/introducao" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="PlusCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Criando canais</h3>
  </div>
  <div className={styles.cardDescription}>
    Crie novos canais diretamente pela API (sem imagem inicial inicialmente).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/criar-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Image" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Atualizar imagem do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Defina ou atualize a foto de perfil do canal.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-imagem" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Edit" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Atualizar nome do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Modifique o nome de exibição do seu canal.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-nome" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="FileText" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Atualizar descrição do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Altere a descrição pública do canal.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/atualizar-descricao" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserPlus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Seguir canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Siga canais de terceiros para receber atualizações.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/seguir-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserMinus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Deixar de seguir canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Pare de seguir um canal específico (Unfollow).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/deixar-seguir" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="VolumeX" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Mutar canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Mute as notificações de um canal.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/silenciar-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Volume2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Desmutar canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Volte a receber notificações de um canal (Unmute).
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/reativar-som" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Trash2" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Deletar canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Exclua permanentemente um canal que você administra.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/deletar-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Info" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Metadata do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Obtenha informações detalhadas sobre um canal específico via ID.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/metadata-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="List" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Listar canais</h3>
  </div>
  <div className={styles.cardDescription}>
    Liste todos os canais que a instância segue ou administra.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/listar-canais" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Search" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Encontrar canais</h3>
  </div>
  <div className={styles.cardDescription}>
    Pesquise canais por país, relevância ou termo de busca.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/buscar-canais" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="Settings" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Atualizar configurações do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Altere configurações do canal, como permissões de reação.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/configuracoes-canal" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="CheckSquare" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Aceitar convite de admin do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Aceite convites recebidos para se tornar admin.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/aceitar-admin" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserMinus" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Remover admin do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Remova privilégios de administrador de um usuário.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/remover-admin" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="XCircle" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Anular convite de admin do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Cancele convites de admin enviados anteriormente.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/revogar-convite-admin" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

<div className={styles.card}>
  <div className={styles.cardHeader}>
    <Icon name="UserCheck" size="md" className={styles.cardIcon} />
    <h3 className={styles.cardTitle}>Transferir propriedade do canal</h3>
  </div>
  <div className={styles.cardDescription}>
    Transfira a propriedade total do canal para outro admin.
  </div>
  <a href="/Z-API-Central-Dev/docs/newsletter/transferir-propriedade" className={styles.cardLink}>
    Ver guia →
  </a>
</div>

</div>
