---
slug: pesquisa-satisfacao-typeform-zapi
title: "Guia Técnico: Resposta VIP Imediata - Integrando Typeform, n8n e Z-API para Alertas de CS"
authors: [zapi-central]
tags: [tutorial, n8n, automacao, hands-on, typeform, customer-success, intermediario]
featured: false
date: 2026-01-05
summary: "Aprenda a criar um sistema de alerta proativo que filtra clientes VIP de pesquisas de satisfação do Typeform e notifica sua equipe de Customer Success em segundos via WhatsApp."
description: "Tutorial completo de automação: integração Typeform + n8n + Z-API para alertar equipe de CS sobre feedback de clientes VIP em tempo real, reduzindo tempo de reação de dias para segundos."
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---
import { Icon } from '@site/src/components/shared/MdxIcon';


**O cenário clássico: você envia uma pesquisa de satisfação e um cliente estratégico (VIP) responde que está insatisfeito. O problema? Você só descobre dias depois.** Este guia técnico mostra como usar um fluxo "semi low-code" no n8n para interceptar feedback VIP em tempo real e alertar sua equipe de Customer Success em segundos via WhatsApp.

Você vai aprender a construir um "vigia" proativo que transforma feedback de clientes VIP de "dado frio" em "ação imediata", reduzindo o tempo de reação de dias para segundos. A solução une Typeform, Google Sheets, Z-API e n8n em uma arquitetura simples e poderosa.

<!-- truncate -->

## <Icon name="CheckCircle" size="md" /> Principais conclusões

* * Sistema de alerta em tempo real reduz tempo de reação de dias para segundos
* * Arquitetura "semi low-code" simplifica implementação sem depender de desenvolvimento complexo
* * Filtragem inteligente diferencia clientes VIP Promotores de Detratores
* * Google Sheets como "banco de dados" permite atualização sem desenvolvedor
* * Alertas personalizados via WhatsApp para equipe de Customer Success

## <Icon name="AlertTriangle" size="md" /> O Problema: O Silêncio Pós-Pesquisa

### A Dor

O cenário clássico de qualquer time de Customer Success (CS) ou Vendas: você envia uma pesquisa de satisfação (NPS/CSAT) para sua base de clientes. Um cliente estratégico (VIP) responde que está insatisfeito. O problema? Você só descobre isso *dias depois*, quando alguém finalmente exporta e analisa a planilha de resultados. O *timing* para reverter a situação já passou.

### A Solução Comum (Lenta)

Esperar o time de BI (Business Intelligence) compilar os dados, ou depender de um gerente que precisa ler manualmente *todos* os feedbacks, um por um, para identificar os "incêndios".

### A Solução "Satélite" (Rápida)

E se pudéssemos interceptar esse feedback *no exato segundo* em que ele é enviado? E se pudéssemos, em tempo real, verificar se o autor é um cliente VIP e, em caso afirmativo, disparar um alerta detalhado diretamente no grupo de WhatsApp da equipe de CS?

## <Icon name="Network" size="md" /> A "Tradução" da Arquitetura: O Poder do "Semi Low-Code"

Esta abordagem simplifica drasticamente a implementação de uma solução prática e de alto valor.

### A Arquitetura Tradicional (Complexa)

- **Banco de Dados:** (ex: MySQL) para armazenar os VIPs.
- **Back-end (API):** (ex: Node.js) para receber o webhook do Typeform.
- **Lógica de Negócio:** Código customizado para cruzar os dados.
- **Serviço de Fila:** (ex: RabbitMQ) para gerenciar os alertas.
- **Custo:** Semanas de desenvolvimento e alta manutenção.

### Nossa Abordagem "Semi Low-Code" (A Tradução)

- **Coleta de Dados → Typeform:** A interface amigável para o cliente.
- **Banco de Dados (VIPs) → Google Sheets:** Uma planilha simples que o time de CS pode atualizar a qualquer momento, sem precisar de um desenvolvedor.
- **Back-end & Lógica → n8n:** A plataforma visual que orquestra todo o fluxo, desde o recebimento do webhook até a lógica de decisão.
- **Canal de Alerta → Z-API:** A ponte direta para o WhatsApp, o canal de maior engajamento.

A vantagem é clara: permitimos que os setores que geram receita e cuidam da retenção (Customer Success, Vendas, Gente & Gestão) criem e mantenham suas próprias soluções de automação, sem depender de longos ciclos de desenvolvimento.

## <Icon name="Checklist" size="md" /> Pré-Requisitos Técnicos

Este tutorial assume que você já possui:

1. Uma conta [n8n](https://n8n.io/) (Cloud ou Self-hosted).
2. Uma conta [Typeform](https://www.typeform.com/) e acesso ao portal [Typeform Developers](https://developer.typeform.com/). Mesmo que vinculada à sua conta principal, é por lá que você irá gerar um **Personal Access Token** (Token de Acesso Pessoal) necessário para a credencial do n8n.
3. Uma conta [Z-API](https://www.z-api.io/) ativa e com credenciais.
4. Uma conta Google (para o Google Sheets).

### Configurando as Variáveis Globais (n8n)

Para manter suas chaves de API (Z-API) e IDs de instância seguros e fáceis de gerenciar, vamos usar as Variáveis Globais.

**Nota Importante:**

Este recurso (Variáveis Globais) está disponível nos planos pagos do n8n Cloud (como o Pro) ou na versão auto-hospedada paga (plano **Business**). Ele é essencial para a segurança da aplicação, pois evita que seus "segredos" (tokens) fiquem expostos diretamente nos nós do fluxo.

**Passos para configuração:**

1. No seu painel do n8n, vá em **Settings > Variables**.
2. Crie as seguintes variáveis:
   - `ZAPI_ID_INSTANCIA`: Seu ID de Instância do Z-API.
   - `ZAPI_TOKEN_INSTANCIA`: Seu Token de Instância do Z-API.
   - `ZAPI_CLIENT_TOKEN`: Seu Client Token do Z-API.
   - `CONTATO_SETOR_CS`: O número de WhatsApp (com DDI+DDD, ex: `5521999998888`) para onde os alertas serão enviados.

### Configurando o Google Sheets (O "Banco de Dados" VIP)

1. Crie uma nova Planilha Google.
2. Na primeira aba (ex: `Página1`), crie uma única coluna na `A1` com o cabeçalho: `Cliente/Empresa`.
3. Abaixo, liste os *termos-chave* de seus clientes VIP.
4. **Importante:** Use termos em minúsculo e simplificados (ex: "google", "magalu", "itaú"). Nosso código fará uma verificação de "contém", então "itaú" identificará "Banco Itaú S/A" ou "Itaú Unibanco".

## <Icon name="Settings" size="md" /> Configurando o Typeform (O "Funil")

### Criando a Pesquisa

1. Crie sua pesquisa no Typeform.
2. **Relação Typeform e n8n:** O nó `Typeform Trigger` no n8n recebe os dados da pesquisa usando o *texto da pergunta* como a "chave" (key) do JSON.
3. Para que este tutorial funcione, seu formulário deve ter perguntas que correspondam *exatamente* às chaves usadas no nó `Formata os dados da pesquisa`.

### Mapeamento de Perguntas

| Pergunta no Typeform | Chave no n8n (`$json["..."]`) |
| :--- | :--- |
| First name | `First name` |
| Last name | `Last name` |
| Phone number | `Phone number` |
| Email | `Email` |
| Company | `Company` |
| Qua nota você daria para nosso produto/serviço ? | `Qua nota você daria para nosso produto/serviço ?` |
| Baseado na sua nota, forneça mais detalhes... | `Baseado na sua nota, forneça mais detalhes...` |

**Atenção:**

Se você criar um formulário diferente (o que é o esperado), o fluxo **vai quebrar**. É uma etapa *obrigatória* deste tutorial que você edite o nó `Formata os dados da pesquisa` (Nó 2) para que as expressões `={{ $json["Sua Pergunta Aqui"] }}` correspondam exatamente às suas novas perguntas. O texto da pergunta é a "chave" que o n8n usa para encontrar o valor.

## <Icon name="Workflow" size="md" /> Construindo o Fluxo no n8n

Aqui está a explicação técnica detalhada de cada nó, conforme o JSON que analisamos.

### Nó 1: `Gatilho da Pesquisa via Typeform` (Typeform Trigger)

- **Propósito:** Iniciar o fluxo de trabalho assim que uma pesquisa é enviada.
- **Configuração:**
  - **Credentials:** Autentique sua conta Typeform usando o **Personal Access Token** gerado no portal de desenvolvedores.
  - **Form:** Selecione o formulário (ex: `dAd341BH`) que você criou.
- **Como funciona:** O n8n registra um webhook no Typeform. Quando um usuário envia, o Typeform "avisa" o n8n e envia todos os dados da resposta em formato JSON.

### Nó 2: `Formata os dados da pesquisa` (Set)

- **Propósito:** Limpar os dados brutos do Typeform e criar variáveis fáceis de usar.
- **Configuração (Assignments):**
  - `nome` = `={{ $json["First name"] }}`
  - `sobrenome` = `={{ $json["Last name"] }}`
  - `contato` = `={{ $json["Phone number"] }}`
  - `email` = `={{ $json.Email }}`
  - `empresa` = `={{ $json.Company.toSentenceCase() }}` (Expressão bônus para formatar a primeira letra como maiúscula)
  - `feedback` = `={{ $json["Baseado na sua nota, forneça mais detalhes sobre sua opinião."] }}`
  - `nota` = `={{ $json["Qua nota você daria para nosso produto/serviço ?"] }}` (Definido como tipo `Number`)
  - `data_hora_criacao` = `={{ $now.format('HH:mm:ss - dd/MM/yyyy') }}` (Enriquece o dado com um timestamp)

### Nó 3: `Busca os Clientes VIP na planilha` (Google Sheets)

- **Propósito:** Ler a lista de termos-chave de clientes VIP.
- **Configuração:**
  - **Credentials:** Autentique sua conta Google.
  - **Operation:** `Read`
  - **Document ID:** O ID da sua planilha (ex: `1ibLh...`).
  - **Sheet Name:** O nome da aba (ex: `Página1` ou `Clientes VIP`).
  - **Range:** `A:A` (Para ler toda a coluna A, onde estão os termos).

### Nó 4: `Formata os dados da planilha` (Set)

- **Propósito:** Simplificar a saída da planilha para o próximo nó.
- **Configuração (Assignments):**
  - `cliente` = `={{ $json["Cliente/Empresa"] }}` (O nome da coluna que você criou na Planilha).
- **Resultado:** Em vez de `[ { "Cliente/Empresa": "google" } ]`, teremos `[ { "cliente": "google" } ]`, o que facilita o código.

### Nó 5: `Code in JavaScript` (Code)

- **Propósito:** O cérebro. Comparar o nome da empresa vindo do Typeform com a lista vinda da planilha.
- **Configuração (Code):**

```javascript
// --- 1. Preparar a Lista VIP ---

// Pega todos os itens da entrada (que vêm do nó "Formata os dados da planilha")
const vipListItems = $input.all();

// Converte esse array de itens do n8n em um array simples de strings:
// Usamos .toLowerCase() para garantir, caso alguém edite a planilha com maiúsculas.
const vipTerms = vipListItems.map(item => item.json.cliente);

// --- 2. Preparar os Dados do Typeform ---
// Puxa os dados originais do nó "Formata os dados da pesquisa"
const typeformItem = $('Formata os dados da pesquisa').item.json;
const nomeEmpresaCliente = typeformItem.empresa;
const notaPesquisa = typeformItem.nota;

let isVip;

// --- 3. Lógica de Verificação ---
// Se o campo 'nome_empresa' não existir ou estiver vazio, marque como 'false'
if (!nomeEmpresaCliente) {
  isVip = false;
  return [{ json: { isVip } }];
}

// Normaliza o nome da empresa vindo do Typeform para garantir a comparação
// Ex: "   Google Brasil   " -> "google brasil"
const nomeEmpresaNormalizado = nomeEmpresaCliente.toLowerCase().trim();

// Verifica se o nome da empresa (normalizado) *contém* ALGUM dos termos da lista VIP.
isVip = vipTerms.some(termoVip =>
  nomeEmpresaNormalizado.includes(termoVip)
);

// Retorna o item modificado para o próximo nó (o IF)
return [{ json: { isVip, notaPesquisa } }];
```

**Lógica do Código (Análise):**

1. **Linha 5 (`$input.all()`):** Pega a lista de clientes VIP que veio do nó anterior (`Formata os dados da planilha`).
2. **Linha 9 (`vipTerms.map(...)`):** Transforma a lista de objetos em um array simples de strings (ex: `["google", "magalu"]`).
3. **Linha 12 (`$('Formata os dados...').item.json`):** **Ponto Crucial:** Puxa os dados originais (limpos) lá do Nó 2 (`Formata os dados da pesquisa`). Isso é necessário porque a entrada principal deste nó (`$input.all()`) contém apenas a lista de VIPs, não os dados do Typeform.
4. **Linha 13 e 14:** Você armazena `nomeEmpresaCliente` e `notaPesquisa` para usar na lógica.
5. **Linha 24 (`.some(...)`):** A lógica principal. Ele normaliza o nome da empresa (`.toLowerCase().trim()`) e verifica se ele **contém** (`includes`) **algum** (`some`) dos termos da `vipTerms` (ex: "banco itaú s/a" contém "itaú").
6. **Linha 29 (`return [...]`):** Você retorna um *novo* objeto JSON contendo apenas o que os próximos nós precisam: `isVip` (true/false) e a `notaPesquisa`.

### Nó 6: `Validação Condicional Cliente VIP` (IF)

- **Propósito:** O "porteiro". Deixa o fluxo continuar apenas se o cliente for VIP.
- **Configuração (Conditions):**
  - **Value 1:** `={{ $json.isVip }}`
  - **Operation:** `Boolean` -> `is true`
- **Saídas:** `true` (continua) e `false` (vai para o `NoOp` e termina).

### Nó 7: `Identificação do tipo de Cliente VIP` (Switch)

- **Propósito:** Segmentar os VIPs entre Promotores (feedback positivo/neutro) e Detratores (feedback negativo).
- **Configuração (Rules):**
  - **Saída 0 (Promotor):** `Value 1` = `={{ $json.notaPesquisa }}` | `Operation` = `Number` -> `Greater Than or Equal` (maior ou igual) | `Value 2` = `7`
  - **Saída 1 (Detrator):** `Value 1` = `={{ $json.notaPesquisa }}` | `Operation` = `Number` -> `Less Than` (menor que) | `Value 2` = `7`

### Nó 8: `Resposta Cliente Vip Promotor...` e `...Detrator via Z-Api` (HTTP Request)

- **Propósito:** Enviar o alerta formatado para o Z-API.

**Configuração (Promotor):**

- **Method:** `POST`
- **URL:** `https://api.z-api.io/instances/{{ $vars.ZAPI_ID_INSTANCIA }}/token/{{ $vars.ZAPI_TOKEN_INSTANCIA }}/send-text` (Usando as Variáveis Globais)
- **Headers:** `Client-Token` = `{{ $vars.ZAPI_CLIENT_TOKEN }}`
- **Body (JSON):**
  - `phone`: `{{ $vars.CONTATO_SETOR_CS }}`
  - `message`: (O texto de alerta "🚀 OPORTUNIDADE (PROMOTOR VIP) 🚀" que criamos).

**Configuração (Detrator):**

- Idêntica, mas o `message` é o texto "🔥 ALERTA MÁXIMO (DETRATOR VIP) 🔥".

**Ponto Crucial (Expressions no Body):** A mágica aqui é como o corpo da mensagem busca os dados:
`{{ $('Formata os dados da pesquisa').first().json.empresa }}`
Esta expressão `$` ignora o fluxo atual (que agora só tem `isVip` e `notaPesquisa`) e "puxa" os dados originais lá do nó `Formata os dados da pesquisa`, permitindo que você monte um alerta completo.

## <Icon name="Shield" size="md" /> Boas Práticas de Alertas de CS

* * **Atualização de Lista VIP:** Mantenha a planilha Google Sheets atualizada com novos clientes estratégicos
* * **Personalização de Mensagens:** Adapte os textos de alerta conforme o tom de voz da sua empresa
* * **Segmentação:** Considere criar diferentes níveis de VIP (Tier 1, Tier 2) para priorização
* * **Monitoramento:** Acompanhe logs para identificar padrões e melhorar o sistema
* * **Resposta Rápida:** Estabeleça SLAs de resposta para alertas de Detratores VIP

## <Icon name="Rocket" size="md" /> Possibilidades de Expansão do Fluxo

O que você construiu é uma base poderosa. Aqui estão 6 ideias para expandir e melhorar ainda mais este fluxo:

1. **Roteamento Dinâmico de Alertas:** Em vez de enviar para um grupo genérico de CS, adicione uma coluna `Telefone_CSM` na sua planilha Google Sheets. No fluxo, puxe esse número e envie o alerta *diretamente* para o Gerente de Conta responsável por aquele cliente.

2. **Criação de Tarefas (Ticketing):** Se um VIP for "Detrator" (Nota menor que 7), além do alerta no Z-API, adicione um nó para criar automaticamente um "Hot Task" ou "Incêndio" em sua ferramenta de gestão (Asana, ClickUp, Jira, Trello) e já atribua ao Gerente da Conta.

3. **Registro Centralizado (Histórico):** Adicione um nó `Google Sheets (Append)` no final do fluxo (antes do `NoOp`) para salvar *todos* os feedbacks recebidos (VIPs e não-VIPs) em uma segunda planilha, criando um histórico centralizado e automático.

4. **Resposta Automática ao Cliente VIP:** Adicione um nó Z-API extra que envia uma mensagem de *confirmação* para o *próprio cliente* que respondeu (se ele for VIP):
   > "Olá `[Nome]`, vimos seu feedback sobre a `[Empresa]`. Sua opinião é prioridade para nós e um especialista do nosso time de sucesso já foi acionado para analisar seu caso. Obrigado!"

5. **Refinamento de Filtros (Subcategorias):** No nó `Code`, crie mais categorias além de `is_vip`. Você pode ter `is_vip_tier_1`, `is_vip_tier_2`, etc., com base em diferentes listas ou regras de negócio, e enviar alertas com prioridades diferentes.

6. **Alerta para Vendas (Oportunidade de Upsell):** Se um cliente VIP for "Promotor" (Nota 9 ou 10) e deixar um feedback muito positivo, crie um alerta separado para o time de *Vendas* ou *Marketing* com a mensagem:
   > "🚀 OPORTUNIDADE DE CASE! 🚀 O cliente `[Nome]` da `[Empresa]` nos deu nota 10! Ótima chance para pedir um depoimento ou mapear um upsell."

## <Icon name="CheckCircle2" size="md" /> Conclusão

Você acaba de construir um "vigia" proativo para suas contas mais importantes. O objetivo final deste fluxo é **reduzir o tempo de reação** de dias para segundos, transformando o feedback de um cliente VIP (especialmente um detrator) de um "dado frio" em uma "ação imediata" para a equipe de Customer Success.

Esta abordagem "semi low-code" une o melhor de várias ferramentas: a simplicidade de coleta do **Typeform**, a flexibilidade de gerenciamento do **Google Sheets**, o poder de notificação da **Z-API** e a inteligência de orquestração do **n8n**.

**Implemente este sistema de alertas com o Z-API hoje mesmo** e transforme feedback de clientes VIP em ações imediatas.

## <Icon name="HelpCircle" size="md" /> Perguntas Frequentes

* * **Como atualizar a lista de clientes VIP?**
  Simplesmente edite a planilha Google Sheets adicionando ou removendo termos. O sistema usa a lista atualizada automaticamente na próxima execução.

* * **E se o cliente não estiver na lista VIP?**
  O fluxo simplesmente não envia alerta. Você pode adicionar um nó para registrar todos os feedbacks em uma planilha separada para análise posterior.

* * **Como personalizar as mensagens de alerta?**
  Edite os campos `message` nos nós `HTTP Request` (Nó 8) para adaptar o texto conforme sua necessidade. Use expressões n8n para incluir dados dinâmicos.

* * **O sistema funciona para múltiplas pesquisas?**
  Sim! Configure um trigger Typeform para cada pesquisa e ajuste o mapeamento de perguntas no Nó 2 conforme necessário.

* * **Como adicionar mais níveis de prioridade?**
  Expanda o Nó 7 (Switch) para incluir mais saídas baseadas em diferentes faixas de nota (ex: 0-3, 4-6, 7-8, 9-10) e envie alertas com diferentes níveis de urgência.

