---
slug: mensagens-programadas-calendly-n8n
title: "Guia Técnico: Automatizando Lembretes no WhatsApp para Agendamentos do Calendly com n8n"
authors: [zapi-central]
tags: [tutorial, n8n, automacao, hands-on, calendly, whatsapp, intermediario]
featured: false
date: 2026-01-05
summary: "Aprenda a criar uma automação completa que conecta Calendly ao WhatsApp via Z-API para enviar lembretes personalizados e reduzir no-shows em consultas e agendamentos."
description: "Tutorial completo de automação: integração Calendly + n8n + Z-API para enviar lembretes automáticos de agendamentos via WhatsApp, organizar contatos em Google Sheets e reduzir faltas."
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---
import { Icon } from '@site/src/components/shared/MdxIcon';


**O não comparecimento ("no-show") a primeiras consultas é um desafio significativo em consultórios e serviços.** Este guia técnico mostra como construir uma automação robusta usando n8n como orquestrador para conectar o Calendly ao WhatsApp (via Z-API), organizar agendamentos em Google Sheets e enviar lembretes personalizados de forma proativa.

Você vai aprender a criar dois fluxos de trabalho complementares: um que **organiza e categoriza** cada novo agendamento em tempo real, e outro que **realiza varreduras diárias** para notificar pacientes sobre suas consultas do dia seguinte. A solução reduz no-shows e libera tempo valioso para focar no atendimento.

<!-- truncate -->

## <Icon name="CheckCircle" size="md" /> Principais conclusões

* * Automação em dois fluxos: organização em tempo real e alertas programados via cron job
* * Integração completa: Calendly → n8n → Google Sheets → Z-API (WhatsApp)
* * Mensagens personalizadas para novos clientes vs. clientes regulares
* * Varreduras automáticas diárias para lembretes de 24 horas antes da consulta
* * Sistema idempotente que evita duplicação de mensagens e dados

## <Icon name="Lightbulb" size="md" /> Por que Automatizar Lembretes de Agendamento?

Em consultórios de psicoterapia, assim como em muitas outras áreas de serviço, cada horário agendado e não utilizado representa uma vaga que poderia ter sido oferecida a outra pessoa. A automação resolve este problema de forma proativa:

### Redução de No-Shows

Lembretes automáticos enviados 24 horas antes da consulta reduzem significativamente as faltas, melhorando a ocupação da agenda e a receita do consultório.

### Comunicação Personalizada

O sistema diferencia novos clientes de regulares, enviando mensagens de boas-vindas para primeiros agendamentos e lembretes para clientes recorrentes.

### Organização Automática

Todos os agendamentos são automaticamente categorizados e armazenados em uma planilha Google Sheets, facilitando gestão e análise posterior.

## <Icon name="Checklist" size="md" /> Pré-requisitos e Configuração

Antes de construir os fluxos, é fundamental configurar o ambiente e centralizar informações sensíveis em variáveis globais no n8n.

### Pré-requisitos

- **Conta n8n:** Versão Cloud (recomendado) ou Self-hosted com planos que incluem Variáveis Globais
- **Conta Calendly:** Com acesso para configurar webhooks
- **Conta Z-API:** Ativa com credenciais (Instance ID, Token e Client Token)
- **Google Sheets:** Conta Google para criar e gerenciar a planilha

### Configuração de Variáveis Globais

No painel do n8n, acesse a seção **Variables** e adicione as seguintes chaves:

| Key | Value | Descrição |
| :--- | :--- | :--- |
| `SHEET_GID_CALENDLY_ZAPI` | `0` | O GID da aba específica na sua planilha. `0` é o padrão para a primeira aba. |
| `SPREADSHEET_ID_CALENDLY_ZAPI` | `<ID_DO_SEU_DOCUMENTO>` | O ID do seu arquivo Google Sheets, extraído da URL. |
| `ZAPI_ID_INSTANCIA` | `<ID_DA_SUA_INSTANCIA>` | ID da sua instância ativa, encontrado no painel do Z-API. |
| `ZAPI_TOKEN_INSTANCIA` | `<TOKEN_DA_SUA_INSTANCIA>` | Token da sua instância, encontrado no painel do Z-API. |
| `ZAPI_CLIENT_TOKEN` | `<SEU_CLIENT_TOKEN>` | Token de segurança gerado no painel do Z-API. Guarde-o com segurança. |

### Estrutura da Planilha Google Sheets

Crie os seguintes campos na primeira linha da sua planilha, na ordem exata:

| Nome da Coluna | Descrição |
| :--- | :--- |
| `nome_cliente` | Nome que o cliente cadastrou no formulário de agendamento. |
| `email_cliente` | Email que o cliente cadastrou no formulário de agendamento. |
| `primeiro_atendimento` | Campo indicador de primeiro agendamento. "Sim" ou "Não" |
| `celular_cliente` | Nº de Celular que o cliente cadastrou no formulário de agendamento. Será usado pra envio do Whatsapp |
| `data_evento` | Data do evento agendado através do link do Calendly |

## <Icon name="Workflow" size="md" /> Fluxo de Trabalho 1: Organização de Agendamentos

O objetivo deste fluxo é criar uma automação onde todo evento criado via Calendly seja imediatamente processado e organizado (como "novo" ou "regular") em uma planilha, baseado na resposta de um formulário preenchido durante o agendamento.

### Etapa 1: Gatilho do Calendly (Trigger)

O processo inicia quando um novo evento é criado.

- **Nó:** `Calendly Trigger`
- **Autenticação:** Configure o acesso à sua conta Calendly utilizando o método `OAuth2 API`. Isso guiará você por um processo de autorização seguro.
- **Evento:** Selecione `invitee.created` para que o fluxo dispare a cada novo agendamento.

### Etapa 2: Manipulação de Dados (Edit Fields)

Recebido o payload do Calendly, o próximo passo é limpá-lo e estruturá-lo, mantendo apenas as informações essenciais e formatando dados como telefones e datas.

- **Nó:** `Edit Fields` (ou `Set`)
- **Configuração:** Crie um novo conjunto de dados estruturado. Mapeie os campos do payload do Calendly para um novo JSON, aplicando as seguintes expressões:

```json
{
  "nome_cliente": "{{ $json.payload.name }}",
  "email_cliente": "{{ $json.payload.email }}",
  "primeiro_atendimento": "{{ $json.payload.questions_and_answers[0].answer }}",
  "celular_cliente": "{{ $json.payload.questions_and_answers[1].answer.replaceAll('+', '').replaceAll(' ', '').replaceAll('-','') }}",
  "data_evento": "{{ DateTime.fromISO($json.payload.scheduled_event.start_time).setZone('America/Sao_Paulo') }}"
}
```

**Notas Técnicas:**

- **`celular_cliente`:** A função `.replaceAll()` é utilizada para remover caracteres como `+`, `-` e espaços, garantindo que o número de telefone esteja em um formato limpo para a API de mensagens.
- **`data_evento`:** O Calendly envia datas no fuso horário UTC. A função `.setZone('America/Sao_Paulo')` (utilizando a biblioteca Luxon, nativa do n8n) converte a data para o fuso horário local do consultório, evitando erros de agendamento. Ajuste o fuso conforme sua necessidade.

### Etapa 3: Roteamento Condicional (Switch)

Com os dados formatados, o fluxo precisa ser dividido com base no tipo de cliente.

- **Nó:** `Switch`
- **Configuração:** O nó `Switch` é ideal para criar ramificações claras no fluxo.
  - **Routing Rules:** Crie duas saídas (outputs): "Novos" e "Regulares".
  - **Condição:** A validação é feita sobre o campo `{{ $json.primeiro_atendimento }}`.
    - Para a saída "Novos", a condição é `Equals` a `Sim`.
    - Para a saída "Regulares", a condição é `Equals` a `Não`.
  - **Opção:** Ative `Convert types when required` para maior robustez na comparação de dados.

### Etapa 4: Ações Finais

#### Saída "Novos":

1. **Nó `HTTP Request` (Enviar Mensagem de Boas-Vindas):** O cliente novo recebe imediatamente um material de apoio.
   - **Method:** `POST`
   - **URL:** `https://api.z-api.io/instances/{{ $vars.ZAPI_ID_INSTANCIA }}/token/{{ $vars.ZAPI_TOKEN_INSTANCIA }}/send-text`
   - **Headers:** Inclua o `Client-Token` utilizando a variável global:
     - `Name`: `Client-Token`
     - `Value`: `{{ $vars.ZAPI_CLIENT_TOKEN }}`
   - **Body:**
     - `phone`: `{{ $json.celular_cliente }}`
     - `message`: `"Olá, {{ $json.nome_cliente }}! Vimos que este é seu primeiro agendamento conosco. Seja muito bem-vindo(a)! 😊 Para te ajudar a se preparar, preparamos um material especial sobre como funcionam nossas consultas. Confira aqui: [SEU LINK]"`

2. **Nó `Google Sheets` (Adicionar Linha):** Após o envio da mensagem, os dados são salvos na planilha com uma identificação especial.

#### Saída "Regulares":

1. **Nó `Google Sheets` (Adicionar Linha):** Clientes regulares são direcionados diretamente para a planilha, finalizando o fluxo para eles.

## <Icon name="Clock" size="md" /> Fluxo de Trabalho 2: Alerta de Lembrete via Cron Job

Este fluxo é proativo. Ele roda em horários programados para varrer a planilha em busca de clientes que precisam ser lembrados de suas consultas no dia seguinte.

### Etapa 1: Gatilho Agendado (Schedule Trigger)

O fluxo é iniciado em horários pré-definidos.

- **Nó:** `Schedule Trigger`
- **Configuração:**
  - **Trigger Interval:** `Custom (Cron)`
  - **Expression:** `0 12,20 * * *` (Esta expressão Cron executa o fluxo todos os dias, pontualmente às 12:00 e às 20:00).

### Etapa 2: Leitura de Dados (Google Sheets)

O primeiro passo é buscar todos os agendamentos pendentes da planilha.

- **Nó:** `Google Sheets`
- **Operação:** `Read Sheet`

### Etapa 3: Filtragem Inteligente (Code)

Com a lista de agendamentos, um nó de código filtra apenas aqueles que ocorrerão no dia seguinte.

- **Nó:** `Code`
- **Código JavaScript:**

```javascript
const agendamentosFiltrados = [];
const items = $input.all();
const fusoHorario = 'America/Sao_Paulo';

// Define as datas de hoje e amanhã baseadas no fuso horário correto
const hoje = $now.setZone(fusoHorario);
const amanha = hoje.plus({ days: 1 });

for (const item of items) {
  const agendamento = item.json;

  // Ignora linhas sem data para evitar erros
  if (!agendamento.data_evento) {
    continue;
  }

  // Converte a data do evento para um objeto Luxon
  const dataEvento = DateTime.fromISO(agendamento.data_evento, { setZone: true });

  // Se a data for válida e for no mesmo dia que "amanhã", adiciona à lista
  if (dataEvento.isValid && dataEvento.hasSame(amanha, 'day')) {
    agendamentosFiltrados.push(item);
  }
}

return agendamentosFiltrados;
```

### Etapa 4: Processamento em Lote (Loop Over Items)

O fluxo agora processa cada cliente qualificado para o lembrete, um por um.

- **Nó:** `Loop Over Items`
- **Batch Size:** `1`.
- **Dentro do Loop:** Adicione um nó `HTTP Request` configurado para enviar a mensagem de lembrete de 24 horas.

### Etapa 5: Preparação para Exclusão (Code)

Após o loop ser concluído (na saída **"done"**), este nó coleta os `row_number` de todos os clientes que foram notificados e prepara o payload para a exclusão em lote.

- **Nó:** `Code` (Conectado à saída "done" do loop)
- **Código JavaScript:**

```javascript
// $items() aqui recebe a lista de todos os itens que foram processados pelo loop
const items = $items(); 

// Extrai o número da linha de cada item
const rowsToDelete = items.map(item => item.json.row_number);

// CRÍTICO: Ordena os índices em ordem decrescente para evitar erros de reindexação na exclusão
rowsToDelete.sort((a, b) => b - a);

const sheetId = $vars.SHEET_GID_CALENDLY_ZAPI;

// Monta o array de requisições no formato exigido pela API do Google Sheets
const requests = rowsToDelete.map(rowIndex => ({
  deleteDimension: {
    range: {
      sheetId: sheetId,
      dimension: 'ROWS',
      startIndex: rowIndex - 1, // API é 0-indexed
      endIndex: rowIndex
    }
  }
}));

return {
  requests: requests
};
```

### Etapa 6: Exclusão em Lote (HTTP Request)

O último passo é executar a exclusão, limpando a planilha para evitar envios duplicados em execuções futuras.

- **Nó:** `HTTP Request`
- **Method:** `POST`
- **URL:** `https://sheets.googleapis.com/v4/spreadsheets/{{ $vars.SPREADSHEET_ID_CALENDLY_ZAPI }}:batchUpdate`
- **Autenticação:** `Predefined Credential Type` -> `Google Sheets OAuth2 API`. Selecione sua credencial salva.
- **Body:**
  - **Body Content Type:** `JSON`
  - **Specify Body:** `Using Expression`
  - **Expression:** `{{ $('NomeDoSeuCodeNodeAnterior').json }}` (Use o nome do seu nó que prepara o payload. Ex: `$('Prepara_Exclusao_Lote').json`)

## <Icon name="Shield" size="md" /> Boas Práticas de Automação de Agendamentos

* * **Fuso Horário:** Sempre configure o fuso horário correto para evitar erros de agendamento
* * **Validação de Dados:** Valide telefones e emails antes de enviar mensagens
* * **Tratamento de Erros:** Implemente retry logic para falhas temporárias de API
* * **Personalização:** Adapte mensagens conforme o tipo de serviço e público-alvo
* * **Monitoramento:** Acompanhe logs para identificar problemas e melhorar o fluxo

## <Icon name="Rocket" size="md" /> Próximas Etapas e Expansões

Com estes dois fluxos de trabalho, você possui um sistema de automação completo. Possibilidades de expansão:

### Integração com CRM

Sincronize agendamentos automaticamente com seu CRM (HubSpot, Salesforce) para enriquecer a base de dados de clientes.

### Mensagens de Confirmação

Adicione um fluxo que envia confirmação imediata após o agendamento, além do lembrete de 24 horas.

### Pesquisa Pós-Consulta

Automatize o envio de pesquisas de satisfação após a consulta para coletar feedback e melhorar o serviço.

### Relatórios Automáticos

Crie dashboards no Google Sheets com métricas de no-shows, taxa de ocupação e satisfação dos clientes.

## <Icon name="CheckCircle2" size="md" /> Conclusão

Com estes dois fluxos de trabalho, o consultório de psicoterapia (ou qualquer serviço com agendamentos) agora possui um sistema de automação completo que não apenas organiza novos agendamentos de forma inteligente, mas também combate ativamente o problema de "no-shows" através de comunicação proativa e personalizada, liberando tempo valioso para focar no que realmente importa: o atendimento aos pacientes.

**Implemente esta automação com o Z-API hoje mesmo** e transforme a gestão de agendamentos em um processo eficiente e automatizado.

## <Icon name="HelpCircle" size="md" /> Perguntas Frequentes

* * **Como ajustar os horários dos lembretes?**
  Modifique a expressão Cron no `Schedule Trigger`. `0 12,20 * * *` significa 12:00 e 20:00 todos os dias. Use [crontab.guru](https://crontab.guru/) para criar expressões personalizadas.

* * **E se o cliente não tiver WhatsApp?**
  Adicione uma validação antes do envio usando o endpoint `/contacts/get-iswhatsapp-batch` do Z-API para verificar se o número possui WhatsApp.

* * **Como personalizar as mensagens?**
  Edite os campos `message` nos nós `HTTP Request` para adaptar o texto conforme sua necessidade e tom de voz da marca.

* * **O sistema funciona para múltiplos profissionais?**
  Sim! Adicione uma coluna `profissional` na planilha e filtre os lembretes por profissional antes do envio.

* * **Como evitar spam de mensagens?**
  O sistema já previne duplicação através da exclusão de linhas após envio. Para maior controle, adicione uma coluna `lembrete_enviado` e verifique antes de enviar.

