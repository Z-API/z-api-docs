---
id: introduction
title: Introdução
---

## Parceiro Integrador

### Modelo de Integrador

Ao aderir ao programa de integrador sua empresa receberá um token de integrador e a documentação para criação/assinatura/cancelamento de instâncias tudo isso via api sem a necessidade de acesso a nossa interface admin.

---

### Token integrador

Os tokens contém um número limite de utilização, mas durante nossa parceria este limite passa por algumas mudanças conforme abaixo.

#### Primeiro token

    - Permite criar 25 instâncias, ao atingir este número o integrador deve solicitar o seu novo token.

#### Segundo token

    - Permite criar +25 instâncias, com valor da segunda faixa tarifária.

#### Terceiro token

    - Permite criar +50 instâncias, com valor da terceira e última faixa tarifária.

#### Token definitivo

    - Com este token o céu é o límite ;)

---

### IMPORTANTE

- Toda responsabilidade de uso do token é do cliente, lembre-se que sua empresa é responsável financeiramente por todas instâncias criadas, portanto evite o uso em modo teste.
- Ao criar a instância ela vem com o default de 2 dias para trial, após este período a instância vai parar e um job nosso irá excluir a instância, caso queira manter a instância é preciso chamar o método de assinatura. Não é necessário chamar o método de cancelamento neste caso pois a instância ainda é trial.
- O Modelo de integrador neste momento é feito pós pago, em breve nós teremos pré-pago.

---

### FATURAMENTO

Nosso ciclo de faturamento funciona da seguinte forma:

- Toda instância assinada entre os dias 01 ao dia 31 será agrupada e disponibilizada em um único pagamento com vencimento no dia 05 do próximo mês subsequente.

- Instâncias canceladas ficarão ativas até seu vencimento, ou seja em caso de cancelamento hoje a mesma ainda será cobrada na próxima fatura e estará disponível para uso até seu vencimento original.

- Todas instâncias tem data de expiração no dia 10 que será o prazo máximo para o funcionamento do serviço em casos de não pagamento, no dia 15 nosso DevOps excluirá todas instâncias da conta.

Durante a adesão do plano a empresa integradora pode optar pela migração a todas as instâncias ativas no modelo pré-pago para o novo modelo pós pago, porém este desejo precisa ser manifestado no ato da adesão. Não é possível migrar posteriormente :(

:::tip Como cobrar de seu cliente

Recomendamos a nossos clientes a prática do modelo pré-pago em suas soluções pois não trabalhamos com pro rata.

:::

:::caution Atenção

Após aderir ao plano de parceria você deverá criar instâncias unica e exclusivamente via API, as instâncias criadas no painel admin não serão ativadas.

:::

## Métodos

[Criar Instância]

[Assinar Instância]

[Cancelar Instância]

[criar instância]: https://developer.z-api.io/partner/create-instance
[assinar instância]: https://developer.z-api.io/partner/sign-instance
[cancelar instância]: https://developer.z-api.io/partner/unsubscribes-instance
