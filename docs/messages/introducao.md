---
id: introducao
title: Visão Geral sobre Mensagens
sidebar_position: 1
---

# <Icon name="MessageSquare" size="lg" /> Visão Geral sobre Mensagens

Esta seção é dedicada a compreender como enviar mensagens através do Z-API. Aqui você aprenderá os conceitos fundamentais, a estrutura de requisições e os padrões que se aplicam a todos os tipos de mensagem disponíveis na plataforma.

## <Icon name="BookOpen" size="md" /> O Que Você Aprenderá Nesta Seção

Esta seção foi estruturada para ser progressiva e educacional:

- **Fundamentos**: Como funciona o envio de mensagens através de APIs REST
- **Estrutura de Requisições**: Padrões comuns que se aplicam a todos os tipos de mensagem
- **Tipos de Mensagem**: Guias detalhados para cada formato disponível (texto, mídia, interativas, comerciais)
- **Exemplos Práticos**: Código funcional e casos de uso reais
- **Boas Práticas**: Recomendações para implementações robustas e eficientes

**Importante**: Esta página estabelece os fundamentos. Recomendamos ler esta introdução antes de explorar tipos específicos de mensagem, pois os conceitos apresentados aqui se aplicam universalmente.

---

## <Icon name="FileText" size="md" /> Anatomia de uma Requisição de Envio

### <Icon name="Target" size="sm" /> Conceito Fundamental

Quando você envia uma mensagem através do Z-API, você está realizando uma **requisição HTTP POST** para um endpoint específico da API REST. Esta requisição contém todas as informações necessárias para que o Z-API processe e envie sua mensagem através do WhatsApp conectado à sua instância.

**Por que entender a estrutura é importante:**

Compreender a estrutura de requisições permite:
- Implementar envios de forma correta desde o início
- Depurar problemas quando algo não funciona como esperado
- Adaptar requisições para diferentes tipos de mensagem
- Integrar com ferramentas no-code de forma eficiente

### <Icon name="Code2" size="sm" /> Estrutura Básica Universal

Todas as requisições de envio de mensagem no Z-API seguem uma estrutura base comum, independentemente do tipo de mensagem:

```json
{
  "phone": "5511999999999",
  "message": "Conteúdo da mensagem ou estrutura específica do tipo"
}
```

**Campos obrigatórios:**

- <Icon name="Phone" size="xs" /> **`phone`** (string, obrigatório): Número do destinatário no formato internacional completo, sem espaços, hífens ou caracteres especiais. O formato é: código do país + DDD + número, tudo concatenado.

  **Exemplo prático:**
  - País: Brasil (+55)
  - DDD: 11 (São Paulo)
  - Número: 999999999
  - **Resultado**: `5511999999999`

  **Formato incorreto**: `+55 11 99999-9999` ou `(11) 99999-9999`

- <Icon name="Text" size="xs" /> **`message`** (string ou objeto, obrigatório): O conteúdo da mensagem. Este campo varia significativamente dependendo do tipo de mensagem que você está enviando:
  - **Mensagem de texto simples**: String com o texto
  - **Mensagem com imagem**: Objeto com URL ou Base64 da imagem e legenda opcional
  - **Mensagem interativa**: Objeto complexo com botões, listas ou carrosséis
  - **Mensagem comercial**: Objeto com informações de produto ou catálogo

Cada tipo de mensagem documentado nesta seção inclui exemplos detalhados de como estruturar o campo `message` corretamente.

:::info Formato de Número: Regra Universal
Esta regra se aplica a **todos** os endpoints do Z-API que requerem números de telefone: sempre use o formato internacional completo, sem espaços, hífens, parênteses ou outros caracteres especiais. Esta padronização garante processamento consistente e evita erros de validação.
:::

### <Icon name="CircleCheck" size="sm" /> Entendendo a Resposta da API

Após enviar sua requisição, o Z-API processa a validação inicial e responde imediatamente - geralmente em menos de 100ms - com uma confirmação de que sua mensagem foi recebida e adicionada à fila de processamento.

**Por que a resposta é imediata?**

O Z-API utiliza um sistema de filas assíncronas. Isso significa que:
1. Sua requisição é validada e aceita imediatamente
2. A mensagem é adicionada a uma fila de processamento
3. O processamento e envio real ocorrem de forma assíncrona
4. Você recebe notificações sobre o status através de webhooks

Esta arquitetura permite alta performance e escalabilidade, mesmo com grandes volumes de envio.

**Estrutura da resposta:**

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

**Campos da resposta:**

- <Icon name="IdCard" size="xs" /> **`messageId`** (string): Identificador único e imutável para sua mensagem. Este ID é fundamental para:
  - Rastrear o status da mensagem através de webhooks
  - Correlacionar eventos (envio, entrega, leitura) com a mensagem original
  - Implementar sistemas de retry e tratamento de erros
  - Auditoria e logs de mensagens enviadas

  **Importante**: Sempre armazene este valor. Você não poderá recuperá-lo posteriormente sem ele.

:::warning Armazenamento do messageId é Crítico
O `messageId` é seu único meio de rastrear uma mensagem após o envio. Sem ele, você não poderá correlacionar webhooks de status com a mensagem original. Implemente sempre um sistema de armazenamento (banco de dados, cache, etc.) para manter a associação entre `messageId` e seus dados internos.
:::

---

## <Icon name="MousePointerClick" size="md" /> Escolhendo o Tipo de Mensagem

O Z-API oferece uma ampla variedade de formatos de mensagem, cada um otimizado para diferentes objetivos. Escolher o tipo correto melhora a experiência do destinatário e aumenta taxas de engajamento.

**Principais categorias:**
- **Texto**: Notificações simples, respostas rápidas, mensagens transacionais
- **Mídia**: Imagens, vídeos, áudios, documentos para maior engajamento visual
- **Interativas**: Botões, listas, carrosséis para guiar o usuário
- **Comerciais**: Produtos, catálogos e carrinho para e-commerce
- **Especializadas**: Contatos, localização, enquetes para casos específicos

:::info Guia Completo
Para um guia detalhado sobre como escolher o tipo ideal de mensagem baseado em objetivos, contexto e casos de uso, consulte o artigo: [Guia Completo: Escolhendo o Tipo de Mensagem Ideal no Z-API](/blog/escolhendo-tipo-mensagem-ideal).
:::

---

## <Icon name="ListTree" size="md" /> Organização da Documentação de Mensagens

Esta seção está organizada de forma hierárquica para facilitar navegação e aprendizado progressivo. Cada tipo de mensagem possui sua própria página com:

- **Descrição detalhada**: O que é, quando usar e por que importa
- **Estrutura de requisição**: Campos obrigatórios e opcionais explicados
- **Exemplos práticos**: Código funcional em múltiplas linguagens
- **Casos de uso**: Exemplos reais de implementação
- **Tratamento de erros**: Códigos de erro comuns e como resolvê-los
- **Boas práticas**: Recomendações específicas para cada tipo

### <Icon name="BookOpen" size="sm" /> Categorias de Mensagens

A documentação está organizada nas seguintes categorias principais:

#### <Icon name="Text" size="xs" /> Mensagens de Texto

Documentação completa para envio de mensagens textuais:
- Texto simples e formatado
- Mensagens com links e formatação Markdown
- Limitações e características específicas

#### <Icon name="Image" size="xs" /> Mídia

Guias detalhados para todos os tipos de mídia:
- Imagens (JPG, PNG, WEBP)
- Vídeos (MP4, 3GP)
- Áudios e mensagens de voz
- Documentos (PDF, DOCX, XLSX, etc.)
- Stickers e GIFs

#### <Icon name="MousePointerClick" size="xs" /> Mensagens Interativas

Documentação para criar experiências interativas:
- Botões de ação rápida
- Listas de opções e menus
- Carrosséis de conteúdo
- Mensagens com múltiplas seções

#### <Icon name="Briefcase" size="xs" /> Recursos Comerciais

Guias para funcionalidades do WhatsApp Business:
- Produtos individuais
- Catálogos de produtos
- Gerenciamento de pedidos e carrinho
- Integração com sistemas de pagamento

#### <Icon name="Link" size="xs" /> Formatos Especializados

Documentação para casos de uso específicos:
- Compartilhamento de contatos
- Envio de localização
- Criação de enquetes
- Reações a mensagens

### <Icon name="Rocket" size="sm" /> Como Navegar

**Para iniciantes:**
1. Leia esta página completa para entender os fundamentos
2. Comece com [Texto Simples](./texto-simples) para enviar sua primeira mensagem
3. Explore outros tipos conforme sua necessidade

**Para pessoas desenvolvedoras:**
1. Use esta página como referência rápida de estrutura
2. Navegue diretamente para o tipo de mensagem necessário
3. Consulte exemplos de código e implemente

**Para usuários no-code:**
1. Compreenda a estrutura de requisições nesta página
2. Use os exemplos de payload como referência na sua ferramenta
3. Adapte os exemplos JSON para os nós da sua plataforma

:::info Artigo Explicativo
Para entender melhor como escolher o formato certo de mensagem e aumentar seu engajamento, especialmente útil para automatizadores que querem maximizar resultados, consulte o artigo: [Mensagens no WhatsApp: Escolha o Formato Certo e Aumente Seu Engajamento](/blog/mensagens-whatsapp-escolha-formato-certo-aumente-engajamento). O artigo explica de forma simples quando usar cada tipo de mensagem e por que o formato importa tanto.
:::

---

## <Icon name="CheckCircle" size="md" /> Próximos Passos

Agora que você compreende os fundamentos de envio de mensagens através do Z-API:

1. **Escolha um tipo de mensagem** baseado no seu caso de uso
2. **Navegue para a documentação específica** na barra lateral
3. **Implemente seguindo os exemplos** fornecidos
4. **Configure webhooks** para receber notificações de status
5. **Teste e itere** baseado nos resultados

Cada página de tipo de mensagem inclui exemplos completos e funcionais. Comece simples e vá adicionando complexidade conforme necessário.

