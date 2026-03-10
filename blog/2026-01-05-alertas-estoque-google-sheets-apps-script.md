---
slug: alertas-estoque-google-sheets-apps-script
title: "Crie um 'Servidor' de Alertas de Estoque com Google Sheets, Apps Script e Z-API"
authors: [zapi-central]
tags: [tutorial, google-sheets, apps-script, automacao, hands-on, estoque, intermediario]
featured: false
date: 2026-01-05
summary: "Aprenda a construir um sistema de monitoramento robusto e de baixo custo que envia alertas via WhatsApp automaticamente quando seu estoque atingir um nível crítico."
description: "Tutorial completo de automação: sistema de alertas de estoque usando Google Sheets como banco de dados, Apps Script como servidor e Z-API para notificações via WhatsApp."
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---

**Um produto 'carro-chefe' esgota e cada minuto com o anúncio pausado é uma venda perdida.** Este tutorial guia você, passo a passo, na criação de um sistema de alerta automático de estoque usando Google Sheets, Apps Script e Z-API. Construa um "servidor" de monitoramento em menos de uma hora, usando ferramentas que você já tem.

Você vai aprender a criar um sistema completo que monitora níveis de estoque, envia alertas automáticos via WhatsApp quando atingir níveis críticos e se rearma automaticamente quando o estoque é reposto. Tudo isso sem precisar de infraestrutura complexa ou semanas de desenvolvimento.

<!-- truncate -->

## Principais conclusões

* * Arquitetura "semi low-code" simplifica implementação sem infraestrutura complexa
* * Google Sheets como banco de dados permite gestão visual e fácil atualização
* * Apps Script como servidor serverless elimina necessidade de hospedagem
* * Alertas automáticos via WhatsApp em tempo quase real (verificação a cada 10 minutos)
* * Sistema resiliente com lógica de re-arme automático quando estoque é reposto

## O Problema (e a Solução Inesperada)

### A Dor

O cenário de qualquer gerente de e-commerce ou operações: um produto "carro-chefe" esgota. Cada minuto com o anúncio pausado é uma venda perdida. O problema não é o estoque zerar, mas a demora em saber disso.

### A Solução Comum (Cara)

Desenvolver um microserviço, com banco de dados, API, webhooks e um painel de monitoramento. Custo: semanas de desenvolvimento.

### A Solução "Satélite" (Rápida)

E se pudéssemos construir um "servidor" de monitoramento em menos de uma hora, usando ferramentas que já temos (Planilhas Google) e conectando-as diretamente ao WhatsApp da sua equipe (via Z-API)?

## A "Tradução" da Arquitetura: Por que "Semi Low-Code"?

Esta seção explica a diferença entre uma arquitetura de software tradicional e a solução que vamos implementar.

### A Arquitetura de Software Tradicional

* **Banco de Dados:** (ex: MySQL, PostgreSQL) - Armazena os dados.
* **Back-end (API):** (ex: Node.js, Python) - Contém a lógica de negócios.
* **Agendador (Cron Job):** (ex: Kubernetes, Cloud Scheduler) - Executa tarefas em intervalos.
* **Front-end:** (ex: React) - Interface para o usuário.

### Nossa Abordagem "Semi Low-Code" (A Tradução)

* **Banco de Dados -> Google Sheets:** A planilha atua como nosso banco de dados e gerenciador de estado.
* **Back-end (API) -> Google Apps Script:** O código `.gs` (JavaScript) é nossa lógica de negócios serverless.
* **Agendador (Cron Job) -> Acionadores (Triggers):** O "gatilho" de tempo do Apps Script que roda nossa lógica.
* **Front-end -> A própria Planilha:** Onde o usuário de negócios (o gerente) configura as regras.

**A Vantagem:** Não é "No-Code" (pois usamos JavaScript), mas é "Semi Low-Code" porque 90% da infraestrutura (servidores, escalabilidade, segurança) é gerenciada pelo Google. Focamos apenas na lógica do problema.

## O Cenário: A "ImportaTech" e o Estoque Crítico

**A Empresa:** "ImportaTech", um e-commerce que usa um sistema (ex: WooCommerce/Shopify) para gerenciar suas vendas.

**A Arquitetura de Dados:**

* O Banco de Dados de Produção (MySQL) é a "fonte da verdade" do estoque, usado pelo site.
* O Back-end do e-commerce já tem uma rotina que sincroniza o estoque de produção com uma Planilha Google usada pelo time de Compras.

**O Problema (Onde Entramos):** O time de Compras precisa de um alerta imediato no WhatsApp do gerente (via Z-API) quando um item monitorado atingir o nível crítico.

## Um Mergulho no "Servidor": O que é o Google Apps Script?

Antes de codar, vamos entender a ferramenta. O Google Apps Script é a "cola" secreta do ecossistema Google Workspace.

* **O que é?** É uma plataforma de desenvolvimento baseada em JavaScript (com sintaxe moderna) que roda 100% na nuvem do Google. Ela permite que você automatize tarefas, crie funções personalizadas em planilhas e, o mais importante, conecte os serviços do Google (Sheets, Docs, Forms) entre si e a qualquer API externa na internet (como o Z-API).

* **Como funciona o ambiente?** Ao clicar em `Extensões > Apps Script`, você abre um editor de código (IDE) no seu navegador.

* **Arquivos `.gs`:** O código é organizado em arquivos com a extensão `.gs` (Google Script). Você pode criar quantos arquivos quiser para organizar seu projeto (ex: `main.gs`, `constantes.gs`, `config.gs`).

* **Escopo Global (Sem `import`/`export`):** Esta é a regra mais importante: todos os arquivos `.gs` dentro do mesmo projeto compartilham o mesmo escopo global.
  * Isso significa que uma função `enviarAlertaZAPI()` definida no arquivo `main.gs` pode ser chamada diretamente de uma função no `z-api config.gs` (e vice-versa).
  * Uma constante `NOME_ABA` definida em `constantes.gs` está automaticamente disponível em `main.gs`.
  * Isso simplifica o código (sem `require` ou `import`), mas exige que você não repita nomes de funções ou constantes globais.

* **Executando Funções Separadas:** O editor do Apps Script possui um menu suspenso na barra de ferramentas. A partir dele, você pode selecionar qualquer função específica (ex: `salvarCredenciais`) e clicar em **Executar**. Isso é fundamental para o setup e para testar partes do seu código isoladamente, sem ter que rodar o script inteiro.

## O Passo a Passo: Construindo seu "Servidor" de Alertas

Agora, vamos à prática.

### Parte 1: O "Banco de Dados" (Configurando o Google Sheet)

1. **Criação:** Crie uma nova Planilha Google. Renomeie-a para `[ImportaTech] Controle de Alertas de Estoque`.
2. **Aba:** Renomeie a aba principal (página) para `Monitoramento Estoque`.
3. **Cabeçalhos:** Na Linha 1, crie os 7 cabeçalhos exatamente como abaixo:
   * `A1`: SKU
   * `B1`: Produto
   * `C1`: Estoque_Atual
   * `D1`: Estoque_Critico
   * `E1`: Monitorar?
   * `F1`: Alerta_Enviado
   * `G1`: Telefone_Alerta

4. **Preenchimento (Exemplo):** Adicione 2-3 linhas de dados de exemplo para teste.

| SKU | Produto | Estoque_Atual | Estoque_Critico | Monitorar? | Alerta_Enviado | Telefone_Alerta |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1001 | Placa de Vídeo RTX 4090 | 2 | 3 | SIM | NÃO | 5521999998888 |
| 1002 | Processador Ryzen 9 | 15 | 5 | SIM | NÃO | 5521999998888 |
| 1004 | Placa Mãe B650 | 3 | 3 | SIM | NÃO | 5521999997777 |

5. **O Papel de Cada Coluna:**
   * **Estoque_Atual:** Atualizado pelo Sistema (Back-end E-commerce). É o dado "vivo".
   * **Estoque_Critico:** Atualizado pelo Usuário (Gerente). É a regra de negócio (o "gatilho").
   * **Monitorar?:** Atualizado pelo Usuário. É o "liga/desliga" do alerta. (Valores: `SIM` ou `NÃO`).
   * **Alerta_Enviado:** Controlado 100% pelo NOSSO SCRIPT. É o "controle de estado". (Valores: `SIM` ou `NÃO`).
   * **Telefone_Alerta:** Atualizado pelo Usuário. Para quem o alerta deve ir (ex: `5521999998888`).

### Parte 2: O "Servidor" (Configurando o Apps Script)

1. No menu da sua planilha, clique em `Extensões > Apps Script`.
2. **Nome do Projeto:** Renomeie o projeto de "Projeto sem título" para `Alertas de Estoque Z-API`.
3. **Organização:** Por padrão, você tem um arquivo `Code.gs`. Vamos criar mais dois para organizar:
   * Clique no **+** ao lado de "Arquivos" e escolha **Script**. Nomeie-o como `constantes`.
   * Clique no **+** novamente e escolha **Script**. Nomeie-o como `z-api config`.
   * Renomeie o `Code.gs` original para `main`.
4. Ao final, você terá 3 arquivos: `main.gs`, `constantes.gs`, e `z-api config.gs`.

### Parte 3: O Código (A Lógica da Automação)

Copie e cole os blocos de código abaixo nos seus arquivos correspondentes.

#### Arquivo: `constantes.gs`

*Propósito: Mapear nossa planilha. Se um dia você mudar uma coluna de lugar, só precisa alterar aqui.*

```javascript
// --- CONFIGURAÇÕES DA PLANILHA ---
const NOME_ABA = 'Monitoramento Estoque';

// Mapeamento das colunas (A=1, B=2, etc.)
const COL_SKU = 1;
const COL_PRODUTO = 2;
const COL_ESTOQUE_ATUAL = 3;
const COL_ESTOQUE_CRITICO = 4;
const COL_MONITORAR = 5;
const COL_ALERTA_ENVIADO = 6;
const COL_TELEFONE_ALERTA = 7;

// --- CONFIGURAÇÕES DE VALORES (para checagem) ---
const VALOR_SIM = 'SIM';
const VALOR_NAO = 'NÃO';
```

#### Arquivo: `z-api config.gs`

*Propósito: Lidar com a configuração, credenciais seguras e os gatilhos de automação.*

```javascript
/**
 * @OnlyCurrentDoc
 * RODE ESTA FUNÇÃO UMA VEZ para salvar suas credenciais do Z-API.
 * Substitua os valores de placeholder pelos seus.
 */
function salvarCredenciais() {
  // O PropertiesService é o local seguro do Google para armazenar "segredos"
  // como chaves de API, sem deixá-las visíveis no código.
  // Documentação: https://developers.google.com/apps-script/reference/properties/properties-service
  const properties = PropertiesService.getScriptProperties();
  
  properties.setProperties({
    'ZAPI_INSTANCE_ID': '<INSTANCE ID>',
    'ZAPI_INSTANCE_TOKEN': '<INSTANCE TOKEN>',
    'ZAPI_CLIENT_TOKEN': '<CLIENT TOKEN>'
  });
  
  Logger.log('Credenciais do Z-API salvas com sucesso!');
}

/**
 * RODE ESTA FUNÇÃO UMA VEZ para criar o gatilho de tempo.
 * Ele vai rodar a função 'verificarEstoque' a cada 10 minutos.
 */
function criarTrigger() {
  deletarTrigger();

  // Cria o novo gatilho
  ScriptApp.newTrigger('verificarEstoque')
    .timeBased()
    .everyMinutes(10)
    .create();
    
  Logger.log('Gatilho de 10 minutos criado com sucesso!');
}

/**
 * RODE ESTA FUNÇÃO UMA VEZ para deletar o gatilho de tempo existente.
 */
function deletarTrigger() {
  // Deleta gatilhos de verificação de estoque antigos para evitar duplicação
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'verificarEstoque') {
      ScriptApp.deleteTrigger(trigger);
      Logger.log(`Gatilho ${trigger} deletado com sucesso`)
    }
  });
}
```

#### Arquivo: `main.gs`

*Propósito: O cérebro da operação. Contém a lógica de verificação e a função de envio para o Z-API.*

```javascript
/**
 * Esta é a função principal que o Trigger vai executar.
 * Ela lê a planilha e aplica as lógicas de alerta e reset.
 */
function verificarEstoque() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
  // Pega todos os dados da planilha (exceto o cabeçalho)
  const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  const data = range.getValues();

  // Itera por cada linha de produto
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Converte os dados da linha para variáveis legíveis
    const stockAtual = row[COL_ESTOQUE_ATUAL - 1];
    const stockCritico = row[COL_ESTOQUE_CRITICO - 1];
    const monitorar = row[COL_MONITORAR - 1];
    const alertaEnviado = row[COL_ALERTA_ENVIADO - 1];
    const produto = row[COL_PRODUTO - 1];
    const telefone = row[COL_TELEFONE_ALERTA - 1];
    
    // Variável para a linha atual (índice + 2, pois começamos da linha 2)
    const linhaAtual = i + 2;

    // --- LÓGICA 1: DISPARO DO ALERTA ---
    if (stockAtual <= stockCritico && monitorar === VALOR_SIM && alertaEnviado === VALOR_NAO) {
      
      Logger.log(`Disparando alerta para: ${produto}`);
      const mensagem = `🚨 ALERTA DE ESTOQUE CRÍTICO 🚨\n\nProduto: *${produto}*\nEstoque restante: *${stockAtual}* (Crítico: ${stockCritico})\n\nPor favor, acionar o fornecedor.`;
      
      const sucesso = enviarAlertaZAPI(telefone, mensagem);
      
      // SÓ MUDA O STATUS se a API confirmar o envio (HTTP 200)
      if (sucesso) {
        // Atualiza a célula "Alerta_Enviado" para "SIM"
        sheet.getRange(linhaAtual, COL_ALERTA_ENVIADO).setValue(VALOR_SIM);
        Logger.log(`Alerta para ${produto} enviado com SUCESSO.`);
      } else {
        Logger.log(`FALHA ao enviar alerta para ${produto}. Tentará novamente na próxima execução.`);
      }
      
    // --- LÓGICA 2: RESET DO ALERTA ---
    } else if (stockAtual > stockCritico && alertaEnviado === VALOR_SIM) {
      
      Logger.log(`Resetando alerta para: ${produto} (Estoque: ${stockAtual})`);
      // Atualiza a célula "Alerta_Enviado" para "NÃO"
      sheet.getRange(linhaAtual, COL_ALERTA_ENVIADO).setValue(VALOR_NAO);
      
    }
  }
}

/**
 * Envia a mensagem de texto via Z-API.
 * Esta função é a tradução do seu comando cURL para UrlFetchApp.
 * @param {string} telefone O número de destino (ex: 5521999998888)
 * @param {string} mensagem O texto a ser enviado.
 * @return {boolean} true se o envio foi bem-sucedido (HTTP 200), false caso contrário.
 */
function enviarAlertaZAPI(telefone, mensagem) {
  // Pega as credenciais salvas no PropertiesService
  const properties = PropertiesService.getScriptProperties();
  const instanceId = properties.getProperty('ZAPI_INSTANCE_ID');
  const instanceToken = properties.getProperty('ZAPI_INSTANCE_TOKEN');
  const clientToken = properties.getProperty('ZAPI_CLIENT_TOKEN');

  // 1. A URL da API
  const url = `https://api.z-api.io/instances/${instanceId}/token/${instanceToken}/send-text`;

  // 2. O Payload (os dados)
  const payload = {
    phone: telefone,
    message: mensagem
  };

  // 3. Os Headers e Opções
  // Usamos o serviço UrlFetchApp para fazer requisições HTTP para APIs externas.
  // Documentação: https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'client-token': clientToken
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // IMPORTANTE: Não lança erro em HTTP 4xx/5xx, permite ler a resposta
  };

  try {
    // Executa a requisição
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    // Valida se a requisição foi aceita (HTTP 200-299)
    if (responseCode >= 200 && responseCode < 300) {
      Logger.log(`Resposta Z-API: Status ${responseCode} - Mensagem enviada com sucesso`);
      return true; // Sucesso
    } else {
      // Falha (API fora, token errado, número inválido, etc.)
      Logger.log(`Erro Z-API: Status ${responseCode} - ${response.getContentText()}`);
      return false; // Falha
    }
  } catch (e) {
    // Falha de rede ou do próprio UrlFetchApp
    Logger.log(`Erro crítico na chamada HTTP: ${e}`);
    return false; // Falha
  }
}
```

### Parte 4: Execução e "Deploy" (Ativando o Servidor)

Siga esta ordem exata para ativar o sistema.

1. **Credenciais (A "Camada de Secrets"):**
   * Abra o arquivo `z-api config.gs`.
   * Preencha suas credenciais reais do Z-API onde estão os placeholders (`<INSTANCE ID>`, `<INSTANCE TOKEN>`, `<CLIENT TOKEN>`).

2. **Autorização (Apenas na 1ª vez):**
   * No editor de scripts, selecione a função `salvarCredenciais` no menu suspenso (ao lado de "Depurar").
   * Clique em **Executar**.
   * O Google solicitará permissão. Clique em **Revisar permissões**.
   * Escolha sua conta.
   * Clique em **Avançado** e depois em **Acessar "Alertas de Estoque Z-API" (não seguro)**.
   * Clique em **Permitir**.
   * *Explicação: Isso é necessário para permitir que o script leia sua planilha (`@OnlyCurrentDoc`), faça chamadas de API externas (`UrlFetchApp`) e armazene segredos (`PropertiesService`).*

3. **Salvar Credenciais (Passo Obrigatório):**
   * Após autorizar, execute `salvarCredenciais()` novamente (ela deve rodar sem pedir permissão agora).
   * Verifique os **Registros de execução** na parte inferior. Você deve ver "Credenciais do Z-API salvas com sucesso!".
   * *O que fizemos: Acabamos de salvar suas chaves de forma segura no PropertiesService do Google.*

4. **Criar o Gatilho (Passo Obrigatório):**
   * Agora, selecione a função `criarTrigger` no menu suspenso.
   * Clique em **Executar**.
   * Nos registros, você verá que o gatilho antigo foi limpo (se existia) e um novo foi criado.
   * *O que fizemos: Acabamos de dizer ao Google para rodar a função `verificarEstoque()` automaticamente a cada 10 minutos.*

**Parabéns, seu sistema está ativo!**

## A Mágica em Ação: O Ciclo de Vida de um Alerta

É crucial entender o que cada parte faz agora que o sistema está ligado.

* **Responsabilidade do Sistema de E-commerce (Externo):**
  * Atualizar APENAS a coluna C (`Estoque_Atual`) via API do Google Sheets. (Ex: Vendeu um item, muda de 5 para 4. Repôs estoque, muda de 4 para 50).

* **Responsabilidade do Usuário (Gerente de Compras):**
  * Definir as regras de negócio nas colunas D (`Estoque_Critico`), E (`Monitorar?`) e G (`Telefone_Alerta`). O script lê essas regras, mas não as muda.

* **Responsabilidade do Script (Nosso "Servidor"):**
  * O script roda a cada 10 minutos e faz duas checagens em cada linha:
    1. **Lógica de DISPARO:**
       * **SE** (`Estoque_Atual` menor ou igual a `Estoque_Critico`) E (`Monitorar?` == "SIM") E (`Alerta_Enviado` == "NÃO")...
       * **AÇÃO:** Tenta enviar o alerta Z-API. Se conseguir (HTTP 200), muda `Alerta_Enviado` para **SIM**.
    2. **Lógica de RESET (Re-arme):**
       * **SE** (`Estoque_Atual` maior que `Estoque_Critico`) E (`Alerta_Enviado` == "SIM")...
       * **AÇÃO:** O script entende que o estoque foi reposto e muda `Alerta_Enviado` de volta para **NÃO**, preparando o item para o próximo ciclo.

## Boas Práticas de Monitoramento de Estoque

* * **Intervalo de Verificação:** Ajuste o intervalo do trigger conforme sua necessidade (10 minutos é um bom equilíbrio)
* * **Validação de Dados:** Adicione validações para garantir que telefones e estoques sejam números válidos
* * **Logs e Monitoramento:** Acompanhe os logs do Apps Script para identificar problemas
* * **Backup de Dados:** Considere criar uma cópia automática da planilha para histórico
* * **Testes Regulares:** Teste o sistema periodicamente para garantir que está funcionando

## Limitações e Considerações Finais

* **Não é Tempo Real:** O "real-time" é limitado pelo seu trigger (ex: 10 minutos). Não é instantâneo, mas é "quase" em tempo real. Diminuir o trigger (ex: 1 min) aumenta o consumo de cotas.

* **Cotas do Google (Quotas):** O Apps Script tem limites diários (ex: nº de chamadas `UrlFetchApp`, tempo total de execução). Esta solução é perfeita para centenas ou alguns milhares de SKUs, mas não para 1 milhão de SKUs verificados a cada minuto.

* **Dependências:** A solução depende de 3 serviços estarem online: Google (Sheets/Apps Script), o Z-API e o próprio WhatsApp.

* **Manuseio de Erros:** Nosso script é resiliente (se o Z-API falhar, ele não marca como "SIM" e tenta de novo na próxima), mas erros persistentes (ex: token do Z-API expirado) precisarão de verificação manual nos **Registros de execução**.

## Possibilidades de Expansão

* **Múltiplos Níveis de Alerta:** Adicione colunas para "Estoque_Baixo" e "Estoque_Critico" com mensagens diferentes
* **Integração com Fornecedores:** Automatize o envio de pedidos de reposição quando o estoque atingir níveis críticos
* **Dashboard de Métricas:** Crie gráficos na planilha para visualizar tendências de estoque
* **Notificações por Categoria:** Agrupe produtos por categoria e envie alertas segmentados
* **Histórico de Alertas:** Mantenha um log de todos os alertas enviados em uma aba separada

## Conclusão

Você acabou de construir um "servidor" de alertas funcional, robusto e serverless, unindo a flexibilidade do Google Sheets com o poder de notificação do Z-API. Essa abordagem "semi low-code" é uma ferramenta poderosa para resolver problemas de negócios reais rapidamente, sem depender de ciclos de desenvolvimento longos e caros.

**Implemente este sistema de alertas com o Z-API hoje mesmo** e transforme a gestão de estoque em um processo automatizado e eficiente.

## Perguntas Frequentes

* * **Como ajustar o intervalo de verificação?**
  Modifique a função `criarTrigger()` alterando `.everyMinutes(10)` para o intervalo desejado (ex: `.everyMinutes(5)` para 5 minutos).

* * **E se eu quiser verificar apenas produtos específicos?**
  Use a coluna "Monitorar?" para ativar/desativar alertas por produto. Produtos com "NÃO" serão ignorados pelo script.

* * **Como adicionar mais telefones para receber alertas?**
  Adicione uma nova coluna (ex: "Telefone_Alerta_2") e modifique a função `verificarEstoque()` para enviar para múltiplos números.

* * **O sistema funciona para múltiplas planilhas?**
  Sim! Crie um projeto Apps Script separado para cada planilha ou modifique o código para ler de múltiplas planilhas.

* * **Como visualizar o histórico de alertas?**
  Adicione uma função que registra cada alerta enviado em uma aba separada da planilha com timestamp e detalhes do produto.

