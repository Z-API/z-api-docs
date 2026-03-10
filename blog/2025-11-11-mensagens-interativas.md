---
slug: mensagens-interativas
title: "Mensagens Interativas: Criando Experiências Ricas no WhatsApp"
authors: [zapi-central]
tags: [mensagens, interatividade, intermediario]
featured: false
summary: Compare mensagens simples vs interativas e aprenda quando usar botões, listas e carrosséis.
description: Guia prático com árvore de decisão, fluxos e exemplos para construir experiências ricas e guiadas com botões, listas e carrosséis no Z-API.
image: "https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png"
---
import { Icon } from '@site/src/components/shared/MdxIcon';


Publicado em 11 nov 2025

<!-- truncate -->

Quer reduzir o atrito do usuário e aumentar a taxa de ação? Mensagens interativas guiam decisões com clareza: botões para ações rápidas, listas para escolhas estruturadas e carrosséis para vitrines. Vamos ao quando, como e por quê — com critérios de escolha e exemplos práticos.

## <Icon name="MousePointerClick" size="md" /> Quando usar cada tipo? (Árvore de decisão)

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'16px', 'fontFamily':'var(--ifm-font-family-base)', 'nodeSpacing':50, 'rankSpacing':60, 'curve':'basis', 'padding':20}}}%%
flowchart TD
 A[Qual é o objetivo?] -->|Ação rápida| B[Botões]
 A -->|Escolher uma opção| C[Listas]
 A -->|Vitrine de itens| D[Carrossel/Catálogo]
 
 classDef question fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100,font-weight:600
 classDef buttons fill:#00a685,stroke:#008f73,stroke-width:2px,color:#ffffff,font-weight:600
 classDef lists fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#0d47a1,font-weight:500
 classDef carousel fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,font-weight:500
 
 class A question
 class B buttons
 class C lists
 class D carousel
```

## <Icon name="Eye" size="md" /> Comparação visual

- Mensagem simples: texto curto e link → baixa orientação 
- Mensagem com botões: CTA claro, reduz fricção de escolha 
- Lista: ótima para 3+ opções com contexto 

## <Icon name="FileCode" size="md" /> Exemplos

### Botões de ação

```json
{
 "phone": "5511999999999",
 "message": {
 "type": "button",
 "text": "Como posso ajudar?",
 "buttons": [
 {"id":"help","text":"Ajuda"},
 {"id":"buy","text":"Comprar"}
 ]
 }
}
```

### Lista de opções

```json
{
 "phone": "5511999999999",
 "message": {
 "type": "list",
 "title": "Escolha uma opção",
 "sections": [
 {
 "title": "Atendimento",
 "rows": [{"id":"1","title":"Suporte"},{"id":"2","title":"Comercial"}]
 }
 ]
 }
}
```

## <Icon name="Route" size="md" /> Jornada do usuário (exemplo)

```mermaid
sequenceDiagram
 participant U as Usuário
 participant A as Sua App
 U->>A: Recebe mensagem com botões
 U->>A: Clica em "Comprar"
 A-->>U: Confirmação e próximo passo
```

Referências: [/docs/messages/botoes](/docs/messages/botoes), [/docs/messages/lista-opcoes](/docs/messages/lista-opcoes), [/docs/messages/carrossel](/docs/messages/carrossel). Ao escolher o tipo, valide também limitações de visualização por dispositivo e tamanho de payload.
