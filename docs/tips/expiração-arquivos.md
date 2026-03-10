---
id: expiracao-arquivos
title: Prazo de Expiração dos Arquivos
sidebar_position: 6
---

# <Icon name="Clock" size="lg" /> Prazo de Expiração dos Arquivos

Entenda o prazo de validade dos arquivos de mídia recebidos através dos webhooks do Z-API.

---

:::caution Qual o prazo de validade dos arquivos do Z-API?

Todos os arquivos de mídia recebidos do Z-API através do seu webhook têm o prazo de expiração de **30 dias**. Após esse período todos os arquivos, seja áudio, PDF, imagem, etc, serão excluídos do storage.

:::

---

## Como Funciona

O Z-API oferece a funcionalidade de webhooks para receber textos e arquivos diretamente em sua aplicação, sem a necessidade de armazenar essas informações em nossos servidores. Isso significa que sua aplicação tem total controle sobre os dados recebidos, o que é especialmente importante para cumprir as exigências da Lei Geral de Proteção de Dados (LGPD).

Caso o cliente deseje armazenar todas as mídias recebidas, é importante que ele implemente um sistema de armazenamento interno em sua própria aplicação, para que possa gerenciar esses dados de acordo com suas próprias políticas de privacidade e segurança. Dessa forma, nossa solução de webhooks ajuda a garantir a segurança dos dados dos seus clientes, ao mesmo tempo em que simplifica o processo de recebimento de informações em sua aplicação.

---

## Soluções de Armazenamento

Para fazer esse armazenamento você pode implementar um sistema de armazenamento interno em sua aplicação. Isso pode ser feito por meio de diversas tecnologias disponíveis no mercado, como serviços de armazenamento em nuvem, bancos de dados, sistemas de gerenciamento de arquivos. Existem diversas ferramentas e serviços que podem ser utilizados para isso, incluindo:

- **Amazon S3**: Serviço de armazenamento em nuvem da AWS
- **Google Cloud Storage**: Solução de armazenamento do Google Cloud
- **Azure Blob Storage**: Armazenamento de objetos da Microsoft Azure
- **Bancos de dados**: Armazenar metadados e referências aos arquivos
- **Sistemas de arquivos locais**: Para aplicações on-premise

---

## Boas Práticas

- **Baixar arquivos imediatamente**: Quando receber um webhook com arquivo, baixe e armazene imediatamente
- **Validar URLs**: Verifique se as URLs dos arquivos estão acessíveis antes de processar
- **Backup**: Mantenha backups dos arquivos importantes
- **LGPD**: Implemente políticas de retenção de dados conforme LGPD

---

## Próximos Passos

- [Webhooks - Ao Receber](/docs/webhooks/ao-receber) - Entenda como receber arquivos via webhook
- [Segurança](/docs/security/introducao) - Aprenda sobre segurança e proteção de dados

