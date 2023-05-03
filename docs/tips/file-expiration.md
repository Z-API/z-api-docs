---
id: file-expiration
title: Prazo de expiração dos arquivos
---

## Como funciona

:::caution Qual o prazo de validade dos arquivos do z-api?

Todos os arquivos de midia recebidos do z-api através do seu webhook tem o prazo de expiração de **30 dias**. Após esse período todos os arquivos, seja audio, pdf, imagem, etc, serão excluídos do storage.

:::

O z-api oferece a funcionalidade de webhooks para receber textos e arquivos diretamente em sua aplicação, sem a necessidade de armazenar essas informações em nossos servidores. Isso significa que sua aplicação tem total controle sobre os dados recebidos, o que é especialmente importante para cumprir as exigências da Lei Geral de Proteção de Dados (LGPD).

Caso o cliente deseje armazenar todas as mídias recebidas, é importante que ele implemente um sistema de armazenamento interno em sua própria aplicação, para que possa gerenciar esses dados de acordo com suas próprias políticas de privacidade e segurança. Dessa forma, nossa solução de webhooks ajuda a garantir a segurança dos dados dos seus clientes, ao mesmo tempo em que simplifica o processo de recebimento de informações em sua aplicação.

---

Para fazer esse armazenamento ele pode implementar um sistema de armazenamento interno em sua aplicação. Isso pode ser feito por meio de diversas tecnologias disponíveis no mercado, como serviços de armazenamento em nuvem, bancos de dados, sistemas de gerenciamento de arquivos. Existem diversas ferramentas e serviços que podem ser utilizados para isso, incluindo:

- Amazon S3
- Google Cloud Storage
