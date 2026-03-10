---
id: id-e-token
sidebar_position: 1
title: ID and Token
---
# ID and Token

## What is it and for what purpose?

It's not hard to imagine that for communication between APIs, we will need to establish a security protocol between the parties, or in other words, between Z-API and your application. All interactions with our API must be authenticated by an ID and a token.

Once you obtain your ID and Token, you can start sending messages. To do this, you need to compose the URL with your information.

For example: `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text`

Note that the ID and Token information composes the integration URL.

## How do I get my id and token?

Immediately after you create your account on Z-API, you will need to create an instance which has an ID and a token for identification. These two pieces of information together are responsible for ensuring the security of communication between your application and ours. To view the ID and token of your instance, simply access the instance in the admin panel and click edit; there you can find all the data related to the instance. Remember that you can have multiple instances, but each one has its own ID and token.

:::warning Important

Never share your ID and token with anyone, as any person with this information can send messages on your behalf. We also recommend that calls to our API should never be made from the frontend but rather from the server to avoid exposing your information.

:::