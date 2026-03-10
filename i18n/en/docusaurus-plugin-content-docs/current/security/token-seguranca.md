---
id: token-seguranca
sidebar_position: 4
title: Account Security Token
---
# Security Token

### Security Token

This security method of the Z-API uses token validation, providing an additional layer of protection for your instances, ensuring that only authorized requests have access to your resources.

## Enabling the Feature

To enable the token validation feature, follow these simple steps:

1. Log in to your Z-API account.
2. Go to the "Security" tab and locate the "Account Security Token" module.
3. Click on the "Configure Now" option. This will generate a token that is initially disabled to prevent disruptions to your application's operation.

![Token Configuration Screen](https://developer.z-api.io/assets/images/security-token-267398c65288c02f157b4d07b51a692f.jpeg)

## Basic Operation

The basic operation of the token security method is straightforward:

1. After generating the token, it must be included in the header of all your HTTP requests.
2. The token should be passed as follows:
    - Attribute: `Client-Token`
    - Value: `[token]`
3. After configuring your environment to send the token in requests, you can click on "Activate Token".
4. From this point onwards, all instances of your application will only accept requests that contain the token in the header.

## Behavior of Unregistered Tokens

If a request is made without the configured token, the API will respond with an error, as shown in the example below:

```json
{
  "error": "null not allowed"
}
```

This ensures that only authorized requests with the token are processed.

## Benefits of Token Validation

Token validation offers numerous benefits for your application's security:

1. **Advanced Protection**: The token adds an additional layer of authentication, protecting your application against unauthorized access.
2. **Total Control**: You have total control over who can access your instances, ensuring that only legitimate requests are served.

With token validation enabled, your Z-API application will be more secure and protected against cyber threats, ensuring the integrity and confidentiality of your data. Make sure to configure and activate this feature in all relevant instances to maintain your application's security.

---