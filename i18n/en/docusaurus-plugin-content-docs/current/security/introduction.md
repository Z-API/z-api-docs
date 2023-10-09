---
id: introduction
title: ID and Token
---

## What Is It and What Is It For?

It's not hard to imagine that for communication between APIs, we need to establish a security protocol between the parties, i.e., between Z-API and your application. All interactions with our API need to be authenticated by an ID and a token.

Once you obtain your ID and Token, you can start sending messages. To do this, you need to compose the URL with your information.

For example: https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-text

Notice that the ID and Token information make up the integration URL.

---

## How Do I Obtain My ID and Token?

Right after you create your account on Z-API, you will need to create an instance, and this instance has an ID and a token to identify it. These two pieces of information together will ensure the security of communication between your application and ours. To view the ID and token of your instance, simply access the instance in the admin panel and click on "edit." There, you will find all the data related to the instance. Remember that you can have multiple instances, but each one has its own ID and token.

---

:::warning

Never share your ID and token with anyone; anyone with this information can send messages on your behalf. We also recommend that the call to our API **NEVER** be made from the frontend but rather from the server to avoid exposing your information.
