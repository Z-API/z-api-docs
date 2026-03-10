---
id: colecao-postman
sidebar_position: 2
title: Testing the API with Postman
---
# <Icon name="Plug" size="lg" /> Testing the API with Postman Collection

To facilitate your tests and development, Z-API offers a **Postman Collection**. It is a pre-configured file that contains all the endpoints (the "functions") of our API, allowing you to experiment with each one visually without writing a single line of code.

:::tip Essential Tool
The Postman Collection is the fastest and most visual way to test all features of Z-API without having to write any code!
:::

---

## <Icon name="Info" size="md" /> What is Postman?

[Postman](https://www.postman.com/)) is a free tool that helps developers (and non-developers!) interact with APIs. Think of it as an "explorer" for APIs: instead of typing a web address to see a page, you use it to send requests to a server and see the response it returns.

It's the perfect tool for:

- <Icon name="CircleCheck" size="sm" /> **Testing** if your instance is working correctly.
- <Icon name="BookOpen" size="sm" /> **Learning** what each endpoint of Z-API does.
- <Icon name="ShieldCheck" size="sm" /> **Validating** the data you need to send in each request.

---

## <Icon name="Package" size="md" /> Step 1: Get the Collection

The easiest way to start is by using the official collection, which is always up-to-date.

1. <Icon name="Globe" size="xs" /> Access the **[Postman Collection](/docs/tips/colecao-postman)** section in this documentation.
2. <Icon name="MousePointerClick" size="xs" /> Follow the instructions to import the collection into Postman. The collection includes all Z-API endpoints with ready-to-use examples.

:::info Automatic Import
The collection is already pre-configured with all necessary environment variables. You only need to fill in your credentials!
:::

:::tip No Installation Required
If you don't have Postman installed, you can download it for free at [postman.com](https://www.postman.com/downloads/).). The installation is quick and easy!
:::

---

## <Icon name="KeyRound" size="md" /> Step 2: Configure Your Credentials

After importing the collection, you need to inform Postman of your credentials so it can authenticate with your account.

1. <Icon name="Settings" size="xs" /> In Postman, click on the **"Environments"** in the left sidebar.
2. <Icon name="FolderPlus" size="xs" /> You will see a new environment called **"Z-API"**. Click on it to open the variables.
3. <Icon name="Edit3" size="xs" /> Fill in the following fields in **"Current Value"**:
   - <Icon name="IdCard" size="xs" /> `instanceId`: Paste your Z-API instance ID here.
   - <Icon name="KeySquare" size="xs" /> `token`: Paste your access token here.

:::warning Don't Forget to Save
Remember to save your changes by clicking the **"Save"** button after filling in the credentials!
:::

---

## <Icon name="Send" size="md" /> Step 3: Make Your First Request

With everything configured, you are ready to test.

1. <Icon name="Folders" size="xs" /> In the left sidebar, click on **"Collections"** and expand the **"Z-API"** collection.
2. <Icon name="MessageSquare" size="xs" /> Navigate to the **"Messages"** folder and click on the request **"Send Text"**.
3. <Icon name="FileText" size="xs" /> In the main panel, click on the **"Body"** tab. You will see the message structure with fields for `phone` and `message`.
4. <Icon name="Edit3" size="xs" /> Fill in the recipient's phone number and the message you want to send.
5. <Icon name="Send" size="xs" /> Click on the **"Send"** button.

:::success Success!
If everything is correct, you will receive a response with status `200 OK` and the message will be sent to your test phone! Now you can explore and test all other features of Z-API in the same way.
:::

---

## <Icon name="Rocket" size="md" /> Next Steps

Now that you have tested the API with Postman, explore more:

- <Icon name="MessageSquare" size="sm" /> **[Message Types](/docs/messages/introducao)** - Learn to send images, videos, and interactive messages
- <Icon name="Webhook" size="sm" /> **[Setting Up Webhooks](/docs/webhooks/introducao)** - Receive real-time notifications
- <Icon name="ShieldAlert" size="sm" /> **[Best Practices](/docs/quick-start/bloqueios-e-banimentos)** - Avoid blocks and use the API securely