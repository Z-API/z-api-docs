---
id: introducao
sidebar_position: 1
title: Partner API
---

# <Icon name="Handshake" size="lg" /> Partner API

Manage instances through the Z-API Partner API. Create, subscribe and cancel instances programmatically for your clients or users.

:::tip For Partners
The Partner API is exclusive for Z-API partners who need to manage multiple instances for different clients or users!
:::

---

## <Icon name="Info" size="md" /> Overview

The Partner API section provides functionalities to manage multiple instances through a dedicated API for partners. Use these operations to create instances for your clients, manage subscriptions and control the lifecycle of instances.

:::info Important

**Responsibility and Billing**

- All responsibility for using the token is with the client. Remember that your company is financially responsible for all instances created, so avoid using the token in test mode.
- When creating an instance, it comes with a default trial period of **2 days**. After this period, the instance will stop and be automatically deleted. If you want to keep the instance, you need to call the subscription method. There is no need to call the cancellation method in this case as the instance is still on trial.
- The Integrator Model at this moment is **post-paid**. We will have a pre-paid option soon.

:::

---

## <Icon name="ListChecks" size="md" /> Main Operations

Manage partner instances with these operations:

- <Icon name="PlusCircle" size="xs" /> [Create Instance](/docs/partners/criar-instancia) - Create a new instance for a client
- <Icon name="List" size="xs" /> [List Instances](/docs/partners/listar-instancias) - List all managed instances
- <Icon name="CheckSquare" size="xs" /> [Subscribe Instance](/docs/partners/assinar-instancia) - Activate a subscription for an instance
- <Icon name="XSquare" size="xs" /> [Cancel Instance](/docs/partners/cancelar-instancia) - Cancel an instance subscription

---

## <Icon name="BookOpen" size="md" /> Important Concepts

### <Icon name="Smartphone" size="sm" /> Partner Instance

A partner instance is a Z-API instance created and managed through the Partner API. Use this API when you need to manage multiple instances for different clients or users.

### <Icon name="CreditCard" size="sm" /> Subscription

Each instance can have an active subscription that determines the available resources and limits. Manage subscriptions to control access and functionalities of each instance.

### <Icon name="Code2" size="sm" /> Nomenclature and Routes `/integrator`

In the documentation, we use the term **Partner API**, but publicly exposed HTTP endpoints use the route prefix `/integrator` (for example, when creating on-demand instances). These routes are **exclusive for Z-API partners** and are not available to common accounts.

:::info Exclusive Routes
The Partner API endpoints use the prefix `/integrator` and are exclusive for Z-API partners. Common accounts do not have access to these routes.
:::

According to official product responses, all operations of creating, subscribing, canceling, and listing partner instances are **in production** and there are no other public Partner API routes beyond those documented in this section.

### <Icon name="FileText" size="sm" /> Billing

Our billing cycle works as follows:

- Any subscribed instance between the 1st and 31st will be grouped and available for a single payment with due date on the 5th of the following month.

**Example:**

| Date | Number of Instances |
| :--- | :--- |
| 01/04 | 40 instances |
| 01/05 | 1 new instance |
| 10/05 | 2 new instances |
| 15/05 | 5 new instances |
| 20/05 | 3 new instances |
| **Total on 05/06** | **51 instances** |

- Cancelled instances will remain active for 30 days after the cancellation date, meaning that if you cancel today, they will still be billed in your next invoice and available for use until their expiration.

**Example of Cancellation:**

| Date | Invoice for Instances |
| :--- | :--- |
| 05/06 | Invoice with all your instances. |
| 10/06 | Cancelled 10 instances. |

After the cancellation process, the 10 instances will be in **Cancellation** status until the 10/07.

This means that when you receive your invoice for July, these 10 instances will still be billed. This process happens because after cancellation, they remain available for use for 30 days.

:::warning Migrate Instances
During plan subscription, the integrator company can opt to migrate all active pre-paid instances to the new post-paid model, but this desire must be expressed at the time of subscription.
:::

:::success How to Bill Your Client
We recommend our clients to use the pre-paid model in their solutions as we do not work with pro rata.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

- <Icon name="PlusCircle" size="sm" /> [Create Your First Instance](/docs/partners/criar-instancia)
- <Icon name="CheckSquare" size="sm" /> [Manage Subscriptions](/docs/partners/assinar-instancia)
- <Icon name="List" size="sm" /> [List Instances](/docs/partners/listar-instancias)