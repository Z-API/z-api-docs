---
id: introducao
title: Partner API
sidebar_position: 1
---

# <Icon name="Handshake" size="lg" /> Partner API

Gerencie instâncias através da API de parceiros do Z-API. Crie, assine e cancele instâncias programaticamente para seus clientes ou usuários.

:::tip Para Parceiros
A Partner API é exclusiva para parceiros Z-API que precisam gerenciar múltiplas instâncias para diferentes clientes ou usuários!
:::

---

## <Icon name="Info" size="md" /> Visão geral

A seção Partner API fornece funcionalidades para gerenciar múltiplas instâncias através de uma API exclusiva para parceiros. Use estas operações para criar instâncias para seus clientes, gerenciar assinaturas e controlar o ciclo de vida das instâncias.

:::info Importante

**Responsabilidade e Cobrança**

- Toda responsabilidade do uso do token é do cliente. Lembre-se que sua empresa é responsável financeiramente por todas as instâncias criadas, portanto evite o uso do token em modo teste.
- Ao criar a instância ela vem com o default de **2 dias para trial**. Após este período a instância vai parar e será excluída automaticamente. Caso queira manter a instância é preciso chamar o método de assinatura. Não é necessário chamar o método de cancelamento neste caso pois a instância ainda é trial.
- O Modelo de integrador neste momento é feito **pós-pago**. Em breve teremos opção pré-pago.

:::

---

## <Icon name="ListChecks" size="md" /> Operações principais

Gerencie instâncias de parceiros com estas operações:

- <Icon name="PlusCircle" size="xs" /> [Criar instância](/docs/partners/criar-instancia) - Crie uma nova instância para um cliente
- <Icon name="List" size="xs" /> [Listar instâncias](/docs/partners/listar-instancias) - Liste todas as instâncias gerenciadas
- <Icon name="CheckSquare" size="xs" /> [Assinar instância](/docs/partners/assinar-instancia) - Ative uma assinatura para uma instância
- <Icon name="XSquare" size="xs" /> [Cancelar instância](/docs/partners/cancelar-instancia) - Cancele uma assinatura de instância

---

## <Icon name="BookOpen" size="md" /> Conceitos importantes

### <Icon name="Smartphone" size="sm" /> Instância de parceiro

Uma instância de parceiro é uma instância do Z-API criada e gerenciada através da Partner API. Use esta API quando você precisa gerenciar múltiplas instâncias para diferentes clientes ou usuários.

### <Icon name="CreditCard" size="sm" /> Assinatura

Cada instância pode ter uma assinatura ativa que determina os recursos e limites disponíveis. Gerencie assinaturas para controlar o acesso e funcionalidades de cada instância.

### <Icon name="Code2" size="sm" /> Nomenclatura e rotas `/integrator`

Na documentação usamos o termo **Partner API**, mas os endpoints HTTP expostos publicamente utilizam o prefixo de rota `/integrator` (por exemplo, ao criar instâncias sob demanda). Essas rotas são **exclusivas para parceiros Z-API** e não ficam disponíveis para contas comuns.

:::info Rotas Exclusivas
Os endpoints da Partner API usam o prefixo `/integrator` e são exclusivos para parceiros Z-API. Contas comuns não têm acesso a essas rotas.
:::

De acordo com as respostas oficiais de produto, as operações de criação, assinatura, cancelamento e listagem de instâncias de parceiros estão **todas em produção** e não há outras rotas públicas de Partner API além das documentadas nesta seção.

### <Icon name="FileText" size="sm" /> Faturamento

Nosso ciclo de faturamento funciona da seguinte forma:

- Toda instância assinada entre os dias 01 ao dia 31 será agrupada e disponibilizada em um único pagamento com vencimento no dia 05 do próximo mês subsequente.

**Exemplo:**

| Data | Número de instâncias |
| :--- | :--- |
| 01/04 | 40 instâncias |
| 01/05 | 1 nova instância |
| 10/05 | 2 novas instâncias |
| 15/05 | 5 novas instâncias |
| 20/05 | 3 novas instâncias |
| **Total em 05/06** | **51 instâncias** |

- Instâncias canceladas ficarão ativas durante 30 dias após a data de cancelamento, ou seja, em caso de cancelamento hoje a mesma ainda será cobrada na próxima fatura e estará disponível para uso até seu vencimento.

**Exemplo de Cancelamento:**

| Data | Fatura das instâncias |
| :--- | :--- |
| 05/06 | Fatura com todas as suas instâncias. |
| 10/06 | Cancelou 10 instâncias. |

Após o processo de cancelamento, as 10 instâncias ficaram com o status: **Em cancelamento** até o dia 10/07.

Isso quer dizer que quando você receber a fatura do mês 07, estas 10 instâncias ainda estarão sendo cobradas. Este processo acontece porque ao cancelar, ela ainda permanece 30 dias disponíveis para que o cliente utilize.

:::warning Migrar instâncias
Durante a adesão do plano a empresa integradora pode optar pela migração de todas as instâncias ativas no modelo pré-pago para o novo modelo pós-pago, porém este desejo precisa ser manifestado no ato da adesão.
:::

:::success Como cobrar de seu cliente
Recomendamos a nossos clientes a prática do modelo pré-pago em suas soluções pois não trabalhamos com pro rata.
:::

---

## <Icon name="Rocket" size="md" /> Próximos passos

- <Icon name="PlusCircle" size="sm" /> [Criar sua primeira instância](/docs/partners/criar-instancia)
- <Icon name="CheckSquare" size="sm" /> [Gerenciar assinaturas](/docs/partners/assinar-instancia)
- <Icon name="List" size="sm" /> [Listar instâncias](/docs/partners/listar-instancias)
