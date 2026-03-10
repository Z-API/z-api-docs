---
id: introducao
title: Mobile
sidebar_position: 1
---

# <Icon name="Smartphone" size="lg" /> Mobile

Use a API do Z-API para registrar e gerenciar números móveis no WhatsApp. Verifique disponibilidade, confirme números e configure segurança adicional com email e código PIN.

:::tip Registro de Números
A API Mobile permite registrar novos números no WhatsApp programaticamente, automatizando todo o processo de verificação e configuração!
:::

---

## <Icon name="Info" size="md" /> Visão geral

A seção Mobile fornece funcionalidades para registro e gerenciamento de números de telefone móveis no WhatsApp. Use estas operações para verificar se um número está disponível, confirmar números através de códigos SMS e configurar métodos de recuperação de conta.

---

## <Icon name="ListChecks" size="md" /> Operações principais

Gerencie números móveis com estas operações:

- <Icon name="CircleCheck" size="xs" /> [Verificar disponibilidade](/docs/mobile/verificar-disponibilidade) - Verifique se um número está disponível no WhatsApp
- <Icon name="MessageSquare" size="xs" /> [Solicitar código](/docs/mobile/solicitar-codigo) - Solicite um código de confirmação por SMS
- <Icon name="KeyRound" size="xs" /> [Confirmar código](/docs/mobile/confirmar-codigo) - Confirme o código recebido para validar o número
- <Icon name="MailPlus" size="xs" /> [Cadastrar email](/docs/mobile/cadastrar-email) - Associe um email à conta para recuperação
- <Icon name="Lock" size="xs" /> [Cadastrar código PIN](/docs/mobile/cadastrar-codigo-pin) - Configure um código PIN para segurança adicional

## <Icon name="ListTree" size="md" /> Fluxo de registro

Siga estas etapas para registrar um novo número:

1. <Icon name="CircleCheck" size="xs" /> **Verificar disponibilidade** - Confirme que o número está disponível no WhatsApp
2. <Icon name="MessageSquare" size="xs" /> **Solicitar código** - Solicite um código de confirmação por SMS
3. <Icon name="Shield" size="xs" /> **Responder captcha** (quando exigido) - Envie a resposta do captcha retornado pela API
4. <Icon name="KeyRound" size="xs" /> **Confirmar código** - Digite o código recebido para validar o número
5. <Icon name="Settings" size="xs" /> **Configurar segurança** (opcional) - Cadastre email e código PIN para recuperação

:::info Fluxo Canônico
O fluxo recomendado é exatamente o descrito acima. Siga a ordem correta para garantir o sucesso do registro!
:::

---

## <Icon name="RotateCcw" size="md" /> Recuperação de conta

Se você perder acesso à sua conta, use estas opções de recuperação:

- <Icon name="Lock" size="sm" /> Use a recuperação de código PIN se você configurou um PIN
- <Icon name="MailPlus" size="sm" /> Use o email cadastrado para recuperar acesso
- <Icon name="ShieldBan" size="sm" /> Solicite desbanimento se sua conta foi bloqueada

---

## <Icon name="AlertTriangle" size="md" /> Limitações e requisitos

- <Icon name="CircleCheck" size="sm" /> **Disponibilidade dos endpoints**: conforme respostas oficiais, os **endpoints de Mobile API estão 100% operantes** em produção.
- <Icon name="ListTree" size="sm" /> **Fluxo canônico**: o fluxo recomendado é exatamente o descrito acima (verificar disponibilidade → solicitar código → responder captcha, quando houver → confirmar código). Não há fluxos alternativos suportados.
- <Icon name="Timer" size="sm" /> **Rate limiting**: não há, até o momento, limites adicionais específicos para Mobile API além das políticas gerais da plataforma.

:::warning Importante
Os endpoints sob `/security/*` descritos na documentação oficial são **rotas de segurança do painel Z-API** e **não fazem parte da Mobile API**. Use-os apenas no contexto do painel, não como parte do fluxo de registro de número via API Mobile.
:::

---

## <Icon name="Rocket" size="md" /> Próximos passos

- <Icon name="CircleCheck" size="sm" /> [Verificar disponibilidade de número](/docs/mobile/verificar-disponibilidade)
- <Icon name="MessageSquare" size="sm" /> [Registrar novo número](/docs/mobile/solicitar-codigo)
- <Icon name="Lock" size="sm" /> [Configurar segurança](/docs/mobile/cadastrar-codigo-pin)
